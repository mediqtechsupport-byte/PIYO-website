export type OrderStatus =
  | "new"
  | "accepted"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export type OrderMode = "Dine-In" | "Takeout" | "Pickup";

export type KitchenOrderItem = {
  name: string;
  qty: number;
  price: number;
  meta?: string;
};

export type KitchenOrder = {
  id: string;
  orderNumber: number;
  orderType: OrderMode;
  tableNumber: string | null;
  customer: string;
  notes: string;
  items: KitchenOrderItem[];
  subtotal: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateOrderPayload = {
  orderType: OrderMode;
  tableNumber?: string | null;
  customer?: string;
  notes?: string;
  items: KitchenOrderItem[];
  subtotal: number;
};

const STORAGE_ORDERS_KEY = "piyo_live_orders_v1";
const STORAGE_SEQ_KEY = "piyo_order_seq_v1";
const STORAGE_TABLE_KEY = "piyo_active_table_v1";
const STORAGE_CUSTOMER_ORDER_KEY = "piyo_customer_active_order_v1";
const STORAGE_CUSTOMER_ORDERS_KEY = "piyo_customer_orders_v1";
const CHANNEL_NAME = "piyo-kitchen-live-v1";

/**
 * Optional Cloudflare Worker + D1 endpoint (e.g. https://piyo-kitchen-api.your-subdomain.workers.dev).
 * When unset, the app seamlessly uses instant browser-synced local mode (BroadcastChannel + localStorage)
 * so you can test Customer (?table=5) and Kitchen Tablet (#kitchen) live across tabs with zero setup.
 */
export const ORDER_API_URL = (
  import.meta.env.VITE_ORDER_API_URL || ""
).replace(/\/+$/, "");

export const IS_CLOUD_API_ENABLED = ORDER_API_URL.length > 0;

export const ORDER_STATUS_META: Record<
  OrderStatus,
  {
    label: string;
    customerLabel: string;
    customerHint: string;
    stepIndex: number;
  }
> = {
  new: {
    label: "Incoming",
    customerLabel: "Order Sent to Kitchen",
    customerHint: "Waiting for the PIYO counter to accept your ticket",
    stepIndex: 0,
  },
  accepted: {
    label: "Accepted",
    customerLabel: "Accepted by Cashier",
    customerHint: "Your ticket is queued for our Negrense grill & soup station",
    stepIndex: 1,
  },
  preparing: {
    label: "Preparing",
    customerLabel: "Grilling & Simmering",
    customerHint: "Our kitchen is actively firing your order fresh",
    stepIndex: 2,
  },
  ready: {
    label: "Ready",
    customerLabel: "Ready to Serve!",
    customerHint: "Headed to your table or ready at the Tagaytay counter",
    stepIndex: 3,
  },
  completed: {
    label: "Completed",
    customerLabel: "Served · Salamat po!",
    customerHint: "Thank you for dining with PIYO Grill & Restaurant",
    stepIndex: 4,
  },
  cancelled: {
    label: "Declined",
    customerLabel: "Order Cancelled",
    customerHint: "Please check with our staff or call 0939 637 4163",
    stepIndex: -1,
  },
};

function readLocalOrders(): KitchenOrder[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalOrders(orders: KitchenOrder[]) {
  try {
    window.localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(orders));
  } catch {
    // Ignore quota errors
  }
}

function nextLocalOrderNumber(): number {
  try {
    const raw = window.localStorage.getItem(STORAGE_SEQ_KEY);
    const current = raw ? parseInt(raw, 10) : 426;
    const next = Number.isFinite(current) ? current + 1 : 427;
    window.localStorage.setItem(STORAGE_SEQ_KEY, String(next));
    return next;
  } catch {
    return Math.floor(427 + (Date.now() % 500));
  }
}

function notifyTabs(eventType: "orders-updated", orderId?: string) {
  try {
    if ("BroadcastChannel" in window) {
      const ch = new BroadcastChannel(CHANNEL_NAME);
      ch.postMessage({ type: eventType, orderId, ts: Date.now() });
      ch.close();
    }
  } catch {
    // Ignore unsupported BroadcastChannel environments
  }
}

/**
 * Reads ?table=5 from the URL (or sessionStorage if they navigated around the page).
 */
export function getActiveTableFromUrl(): string | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("table")?.trim();
    if (raw) {
      const cleaned = raw.replace(/[^a-zA-Z0-9\-\s]/g, "").slice(0, 16);
      if (cleaned) {
        window.sessionStorage.setItem(STORAGE_TABLE_KEY, cleaned);
        return cleaned;
      }
    }
    return window.sessionStorage.getItem(STORAGE_TABLE_KEY);
  } catch {
    return null;
  }
}

export function clearActiveTable() {
  try {
    window.sessionStorage.removeItem(STORAGE_TABLE_KEY);
  } catch {
    // Ignore
  }
}

export function getSavedCustomerOrderIds(): string[] {
  try {
    const ids: string[] = [];
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("order")?.trim();
    if (fromUrl) ids.push(fromUrl);

    const rawList = window.localStorage.getItem(STORAGE_CUSTOMER_ORDERS_KEY);
    if (rawList) {
      const parsed = JSON.parse(rawList);
      if (Array.isArray(parsed)) {
        for (const id of parsed) {
          if (typeof id === "string" && id && !ids.includes(id)) {
            ids.push(id);
          }
        }
      }
    }

    // Backwards-compatibility migration from legacy single-order key
    const legacy = window.localStorage.getItem(STORAGE_CUSTOMER_ORDER_KEY);
    if (legacy && !ids.includes(legacy)) {
      ids.push(legacy);
    }

    if (ids.length > 0) {
      window.localStorage.setItem(
        STORAGE_CUSTOMER_ORDERS_KEY,
        JSON.stringify(ids.slice(0, 12)),
      );
    }
    return ids.slice(0, 12);
  } catch {
    return [];
  }
}

export function addSavedCustomerOrderId(id: string): string[] {
  try {
    const existing = getSavedCustomerOrderIds().filter((x) => x !== id);
    const next = [id, ...existing].slice(0, 12);
    window.localStorage.setItem(
      STORAGE_CUSTOMER_ORDERS_KEY,
      JSON.stringify(next),
    );
    window.localStorage.setItem(STORAGE_CUSTOMER_ORDER_KEY, id);
    return next;
  } catch {
    return [id];
  }
}

export function removeSavedCustomerOrderId(id: string): string[] {
  try {
    const next = getSavedCustomerOrderIds().filter((x) => x !== id);
    window.localStorage.setItem(
      STORAGE_CUSTOMER_ORDERS_KEY,
      JSON.stringify(next),
    );
    if (next.length === 0) {
      window.localStorage.removeItem(STORAGE_CUSTOMER_ORDER_KEY);
    } else {
      window.localStorage.setItem(STORAGE_CUSTOMER_ORDER_KEY, next[0]);
    }
    return next;
  } catch {
    return [];
  }
}

export function getSavedCustomerOrderId(): string | null {
  return getSavedCustomerOrderIds()[0] ?? null;
}

export function saveCustomerOrderId(id: string | null) {
  if (!id) {
    try {
      window.localStorage.removeItem(STORAGE_CUSTOMER_ORDER_KEY);
      window.localStorage.removeItem(STORAGE_CUSTOMER_ORDERS_KEY);
    } catch {
      // Ignore
    }
    return;
  }
  addSavedCustomerOrderId(id);
}

/**
 * Gentle two-note chime for the customer's phone when their order moves to Preparing or Ready.
 */
export function playCustomerReadyChime(isReady = false) {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioCtx();
    void ctx.resume().catch(() => {});

    const freqs = isReady ? [880, 1174.66, 1760] : [783.99, 1046.5];
    freqs.forEach((freq, idx) => {
      const t = ctx.currentTime + idx * 0.12;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(isReady ? 0.16 : 0.1, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      osc.connect(g).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.5);
    });

    window.setTimeout(() => {
      void ctx.close().catch(() => {});
    }, 1200);
  } catch {
    // Ignore audio restrictions before user gesture
  }
}

export async function createOrder(
  payload: CreateOrderPayload,
): Promise<KitchenOrder> {
  if (IS_CLOUD_API_ENABLED) {
    const res = await fetch(`${ORDER_API_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`Order API error (${res.status})`);
    }
    const data = (await res.json()) as { order: KitchenOrder };
    return data.order;
  }

  const now = new Date().toISOString();
  const orderNumber = nextLocalOrderNumber();
  const order: KitchenOrder = {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `ord_${Date.now()}_${orderNumber}`,
    orderNumber,
    orderType: payload.orderType,
    tableNumber: payload.tableNumber?.trim() || null,
    customer: payload.customer?.trim() || "",
    notes: payload.notes?.trim() || "",
    items: payload.items,
    subtotal: payload.subtotal,
    status: "new",
    createdAt: now,
    updatedAt: now,
  };

  const existing = readLocalOrders();
  writeLocalOrders([order, ...existing].slice(0, 120));
  notifyTabs("orders-updated", order.id);
  return order;
}

export async function listOrders(pin?: string): Promise<KitchenOrder[]> {
  if (IS_CLOUD_API_ENABLED) {
    const res = await fetch(`${ORDER_API_URL}/api/orders`, {
      headers: pin ? { "X-Kitchen-Pin": pin } : undefined,
    });
    if (res.status === 401) {
      throw new Error("INVALID_PIN");
    }
    if (!res.ok) {
      throw new Error(`Order API error (${res.status})`);
    }
    const data = (await res.json()) as { orders: KitchenOrder[] };
    return data.orders;
  }

  return readLocalOrders();
}

export async function getOrderById(id: string): Promise<KitchenOrder | null> {
  if (IS_CLOUD_API_ENABLED) {
    const res = await fetch(
      `${ORDER_API_URL}/api/orders/${encodeURIComponent(id)}`,
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { order: KitchenOrder };
    return data.order;
  }

  return readLocalOrders().find((o) => o.id === id) ?? null;
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  pin?: string,
): Promise<KitchenOrder | null> {
  if (IS_CLOUD_API_ENABLED) {
    const res = await fetch(
      `${ORDER_API_URL}/api/orders/${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(pin ? { "X-Kitchen-Pin": pin } : {}),
        },
        body: JSON.stringify({ status }),
      },
    );
    if (res.status === 401) {
      throw new Error("INVALID_PIN");
    }
    if (!res.ok) {
      throw new Error(`Order API error (${res.status})`);
    }
    const data = (await res.json()) as { order: KitchenOrder };
    return data.order;
  }

  const orders = readLocalOrders();
  let updated: KitchenOrder | null = null;
  const next = orders.map((o) => {
    if (o.id !== id) return o;
    updated = { ...o, status, updatedAt: new Date().toISOString() };
    return updated;
  });
  writeLocalOrders(next);
  notifyTabs("orders-updated", id);
  return updated;
}

export function clearLocalCompletedOrders(): KitchenOrder[] {
  const remaining = readLocalOrders().filter(
    (o) => o.status !== "completed" && o.status !== "cancelled",
  );
  writeLocalOrders(remaining);
  notifyTabs("orders-updated");
  return remaining;
}

/**
 * Subscribes to live order updates across browser tabs (local mode) or polls the cloud API.
 */
export function subscribeToOrderUpdates(
  onChange: () => void,
  pollMs = 4000,
): () => void {
  const cleanups: Array<() => void> = [];

  if (!IS_CLOUD_API_ENABLED) {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_ORDERS_KEY) onChange();
    };
    window.addEventListener("storage", onStorage);
    cleanups.push(() => window.removeEventListener("storage", onStorage));

    try {
      if ("BroadcastChannel" in window) {
        const ch = new BroadcastChannel(CHANNEL_NAME);
        ch.onmessage = () => onChange();
        cleanups.push(() => ch.close());
      }
    } catch {
      // Ignore
    }
  }

  const timer = window.setInterval(onChange, pollMs);
  cleanups.push(() => window.clearInterval(timer));

  return () => {
    cleanups.forEach((fn) => fn());
  };
}

/**
 * Plays a crisp, unmistakable 3-note brass kitchen service bell via WebAudio.
 */
export function playKitchenBell() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioCtx();
    void ctx.resume().catch(() => {});

    const notes = [
      { freq: 1046.5, delay: 0, dur: 0.45, gain: 0.22 }, // C6
      { freq: 1318.5, delay: 0.14, dur: 0.5, gain: 0.22 }, // E6
      { freq: 1567.98, delay: 0.28, dur: 0.85, gain: 0.26 }, // G6
    ];

    for (const n of notes) {
      const t = ctx.currentTime + n.delay;
      const osc = ctx.createOscillator();
      const overtone = ctx.createOscillator();
      const g = ctx.createGain();
      const gOver = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(n.freq, t);

      overtone.type = "sine";
      overtone.frequency.setValueAtTime(n.freq * 2.0, t);

      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(n.gain, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + n.dur);

      gOver.gain.setValueAtTime(0.0001, t);
      gOver.gain.exponentialRampToValueAtTime(n.gain * 0.3, t + 0.008);
      gOver.gain.exponentialRampToValueAtTime(0.0001, t + n.dur * 0.65);

      osc.connect(g).connect(ctx.destination);
      overtone.connect(gOver).connect(ctx.destination);

      osc.start(t);
      overtone.start(t);
      osc.stop(t + n.dur + 0.05);
      overtone.stop(t + n.dur + 0.05);
    }

    window.setTimeout(() => {
      void ctx.close().catch(() => {});
    }, 1500);
  } catch {
    // Ignore audio context blocks prior to user interaction
  }
}
