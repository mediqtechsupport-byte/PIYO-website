type OrderStatus =
  | "new"
  | "accepted"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

type OrderItem = {
  name: string;
  qty: number;
  price: number;
  meta?: string;
};

type OrderRow = {
  id: string;
  order_number: number;
  order_type: string;
  table_number: string | null;
  customer: string;
  notes: string;
  items_json: string;
  subtotal: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
};

const VALID_STATUSES = new Set<OrderStatus>([
  "new",
  "accepted",
  "preparing",
  "ready",
  "completed",
  "cancelled",
]);

const VALID_MODES = new Set(["Dine-In", "Takeout", "Pickup"]);

function corsHeaders(request: Request, env: Env): HeadersInit {
  const origin = request.headers.get("Origin") || "";
  const allowed = (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const allowOrigin =
    allowed.length === 0 || allowed.includes(origin) ? origin || "*" : allowed[0];

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Kitchen-Pin",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function jsonResponse(
  body: unknown,
  status: number,
  request: Request,
  env: Env,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(request, env),
    },
  });
}

async function verifyKitchenPin(request: Request, env: Env): Promise<boolean> {
  const expected = env.KITCHEN_PIN;
  if (!expected) return false;
  const provided = request.headers.get("X-Kitchen-Pin") || "";

  const enc = new TextEncoder();
  const [aHash, bHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(provided)),
    crypto.subtle.digest("SHA-256", enc.encode(expected)),
  ]);

  return crypto.subtle.timingSafeEqual(aHash, bHash);
}

function mapRow(row: OrderRow) {
  let items: OrderItem[] = [];
  try {
    items = JSON.parse(row.items_json) as OrderItem[];
  } catch {
    items = [];
  }
  return {
    id: row.id,
    orderNumber: row.order_number,
    orderType: row.order_type,
    tableNumber: row.table_number,
    customer: row.customer,
    notes: row.notes,
    items,
    subtotal: row.subtotal,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function sendTelegramAlert(
  env: Env,
  order: ReturnType<typeof mapRow>,
): Promise<void> {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;

  const lines = [
    `🔔 *NEW PIYO ORDER #${String(order.orderNumber).padStart(4, "0")}*`,
    `Mode: *${order.orderType}*${order.customer ? ` · ${order.customer}` : ""}`,
    "---",
    ...order.items.map(
      (i) =>
        `• ${i.qty}× ${i.name}${i.meta ? ` (${i.meta})` : ""} — ₱${(
          i.qty * i.price
        ).toLocaleString("en-US")}`,
    ),
    "---",
    `*Total: ₱${order.subtotal.toLocaleString("en-US")}*`,
    order.notes ? `📝 Note: ${order.notes}` : "",
  ].filter(Boolean);

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text: lines.join("\n"),
          parse_mode: "Markdown",
        }),
      },
    );
    if (!res.ok) {
      console.error(
        JSON.stringify({
          event: "telegram_alert_failed",
          status: res.status,
          orderId: order.id,
        }),
      );
    }
  } catch (err) {
    console.error(
      JSON.stringify({
        event: "telegram_alert_error",
        orderId: order.id,
        error: err instanceof Error ? err.message : String(err),
      }),
    );
  }
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }

    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, "");

    // Health check
    if (request.method === "GET" && pathname === "/api/health") {
      return jsonResponse({ ok: true, service: "piyo-kitchen-api" }, 200, request, env);
    }

    // POST /api/orders — Customer submits a new order
    if (request.method === "POST" && pathname === "/api/orders") {
      const contentLength = Number(request.headers.get("content-length") || "0");
      if (contentLength > 64_000) {
        return jsonResponse({ error: "Payload too large" }, 413, request, env);
      }

      let body: {
        orderType?: string;
        tableNumber?: string | null;
        customer?: string;
        notes?: string;
        items?: OrderItem[];
        subtotal?: number;
      };
      try {
        body = (await request.json()) as typeof body;
      } catch {
        return jsonResponse({ error: "Invalid JSON" }, 400, request, env);
      }

      if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > 60) {
        return jsonResponse({ error: "Order must include 1–60 items" }, 400, request, env);
      }

      const orderType = VALID_MODES.has(body.orderType || "")
        ? (body.orderType as string)
        : "Dine-In";

      const sanitizedItems: OrderItem[] = body.items.map((it) => ({
        name: String(it.name || "").slice(0, 120),
        qty: Math.max(1, Math.min(99, Math.round(Number(it.qty) || 1))),
        price: Math.max(0, Math.round(Number(it.price) || 0)),
        meta: it.meta ? String(it.meta).slice(0, 160) : undefined,
      }));

      const subtotal = sanitizedItems.reduce((sum, i) => sum + i.qty * i.price, 0);
      const id = crypto.randomUUID();
      const now = new Date().toISOString();

      const counterResult = await env.DB.prepare(
        "UPDATE order_counter SET last_number = last_number + 1 WHERE id = 1 RETURNING last_number",
      ).first<{ last_number: number }>();

      const orderNumber = counterResult?.last_number ?? 427;
      const tableNumber = body.tableNumber ? String(body.tableNumber).slice(0, 24) : null;
      const customer = String(body.customer || "").slice(0, 80);
      const notes = String(body.notes || "").slice(0, 320);

      await env.DB.prepare(
        `INSERT INTO orders (id, order_number, order_type, table_number, customer, notes, items_json, subtotal, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?)`,
      )
        .bind(
          id,
          orderNumber,
          orderType,
          tableNumber,
          customer,
          notes,
          JSON.stringify(sanitizedItems),
          subtotal,
          now,
          now,
        )
        .run();

      const created = mapRow({
        id,
        order_number: orderNumber,
        order_type: orderType,
        table_number: tableNumber,
        customer,
        notes,
        items_json: JSON.stringify(sanitizedItems),
        subtotal,
        status: "new",
        created_at: now,
        updated_at: now,
      });

      console.log(
        JSON.stringify({
          event: "order_created",
          orderId: id,
          orderNumber,
          orderType,
          subtotal,
        }),
      );

      ctx.waitUntil(sendTelegramAlert(env, created));

      return jsonResponse({ order: created }, 201, request, env);
    }

    // GET /api/orders/:id — Public live status check for a specific customer receipt
    const orderMatch = pathname.match(/^\/api\/orders\/([^/]+)$/);
    if (request.method === "GET" && orderMatch) {
      const id = decodeURIComponent(orderMatch[1]);
      const row = await env.DB.prepare("SELECT * FROM orders WHERE id = ?")
        .bind(id)
        .first<OrderRow>();
      if (!row) {
        return jsonResponse({ error: "Order not found" }, 404, request, env);
      }
      return jsonResponse({ order: mapRow(row) }, 200, request, env);
    }

    // GET /api/orders — Staff Kitchen Dashboard queue (PIN protected)
    if (request.method === "GET" && pathname === "/api/orders") {
      if (!(await verifyKitchenPin(request, env))) {
        return jsonResponse({ error: "Unauthorized" }, 401, request, env);
      }
      const { results } = await env.DB.prepare(
        "SELECT * FROM orders ORDER BY created_at DESC LIMIT 100",
      ).all<OrderRow>();
      return jsonResponse({ orders: results.map(mapRow) }, 200, request, env);
    }

    // PATCH /api/orders/:id — Staff Kitchen status transition (PIN protected)
    if (request.method === "PATCH" && orderMatch) {
      if (!(await verifyKitchenPin(request, env))) {
        return jsonResponse({ error: "Unauthorized" }, 401, request, env);
      }

      const id = decodeURIComponent(orderMatch[1]);
      let body: { status?: OrderStatus };
      try {
        body = (await request.json()) as { status?: OrderStatus };
      } catch {
        return jsonResponse({ error: "Invalid JSON" }, 400, request, env);
      }

      if (!body.status || !VALID_STATUSES.has(body.status)) {
        return jsonResponse({ error: "Invalid status" }, 400, request, env);
      }

      const now = new Date().toISOString();
      await env.DB.prepare("UPDATE orders SET status = ?, updated_at = ? WHERE id = ?")
        .bind(body.status, now, id)
        .run();

      const updated = await env.DB.prepare("SELECT * FROM orders WHERE id = ?")
        .bind(id)
        .first<OrderRow>();
      if (!updated) {
        return jsonResponse({ error: "Order not found" }, 404, request, env);
      }

      console.log(
        JSON.stringify({
          event: "order_status_updated",
          orderId: id,
          status: body.status,
        }),
      );

      return jsonResponse({ order: mapRow(updated) }, 200, request, env);
    }

    return jsonResponse({ error: "Not found" }, 404, request, env);
  },
} satisfies ExportedHandler<Env>;
