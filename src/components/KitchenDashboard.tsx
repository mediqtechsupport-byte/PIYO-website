import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import {
  Bell,
  BellOff,
  Check,
  ChefHat,
  Clock,
  Flame,
  Lock,
  Printer,
  QrCode,
  RefreshCw,
  Sparkles,
  Trash2,
  UtensilsCrossed,
  XCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Plus,
  Volume2,
} from "lucide-react";
import {
  clearLocalCompletedOrders,
  createOrder,
  IS_CLOUD_API_ENABLED,
  listOrders,
  ORDER_STATUS_META,
  playKitchenBell,
  subscribeToOrderUpdates,
  updateOrderStatus,
  type KitchenOrder,
  type OrderStatus,
} from "@/services/orderService";

const SESSION_PIN_KEY = "piyo_kitchen_pin_v1";
const STORAGE_PAPER_KEY = "piyo_receipt_paper_mm_v1";
const DEFAULT_LOCAL_PIN = "2025";

type ReceiptPaperMm = 58 | 80;

function formatPeso(amount: number) {
  return `₱${Math.round(amount).toLocaleString("en-US")}`;
}

function formatElapsed(iso: string, nowMs: number) {
  const diffSec = Math.max(0, Math.floor((nowMs - new Date(iso).getTime()) / 1000));
  if (diffSec < 45) return "Just now";
  const mins = Math.floor(diffSec / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  return `${hrs}h ${rem}m ago`;
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function printKitchenChit(order: KitchenOrder, paperMm: ReceiptPaperMm = 80) {
  const win = window.open("", "_blank", "width=420,height=680");
  if (!win) return;

  const isNarrow = paperMm === 58;
  const rows = order.items
    .map(
      (it) =>
        `<tr>
          <td class="item-col">
            <strong>${it.qty}x ${escapeHtml(it.name)}</strong>${
              it.meta ? `<div class="meta">${escapeHtml(it.meta)}</div>` : ""
            }
          </td>
          <td class="price-col">${formatPeso(it.qty * it.price)}</td>
        </tr>`,
    )
    .join("");

  const orderNo = String(order.orderNumber).padStart(4, "0");

  win.document.write(`<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>PIYO Receipt #${orderNo} (${paperMm}mm)</title>
  <style id="dynamic-page-style">
    @page { size: ${paperMm}mm 150mm; margin: 0; }
  </style>
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      background: #e9e4d9;
      color: #111;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 10px 14px;
      background: #08130B;
      color: #FAF6EC;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 12px;
    }
    .toolbar-group { display: flex; align-items: center; gap: 6px; }
    .btn {
      border: 1px solid rgba(223, 185, 111, 0.4);
      background: rgba(255, 255, 255, 0.08);
      color: #FAF6EC;
      border-radius: 999px;
      padding: 5px 11px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
    }
    .btn.active, .btn.primary {
      background: #DFB96F;
      color: #08130B;
      border-color: #DFB96F;
    }
    .stage {
      display: flex;
      justify-content: center;
      padding: 16px 10px 24px;
    }
    .receipt {
      width: ${paperMm}mm;
      background: #fff;
      padding: ${isNarrow ? "3.5mm 3mm 5mm" : "4.5mm 4mm 6mm"};
      font-size: ${isNarrow ? "10.5px" : "12.5px"};
      line-height: 1.42;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.16);
    }
    .center { text-align: center; }
    .brand { font-size: ${isNarrow ? "13px" : "15.5px"}; font-weight: 800; letter-spacing: 0.04em; }
    .sub { font-size: ${isNarrow ? "9.5px" : "11px"}; letter-spacing: 0.08em; }
    hr { border: none; border-top: 1px dashed #222; margin: ${isNarrow ? "6px 0" : "8px 0"}; }
    table { width: 100%; border-collapse: collapse; }
    .item-col { padding: 3px 6px 3px 0; vertical-align: top; word-break: break-word; }
    .price-col { padding: 3px 0; text-align: right; vertical-align: top; white-space: nowrap; font-weight: 700; }
    .meta { font-size: ${isNarrow ? "9px" : "10.5px"}; color: #444; margin-top: 1px; }
    .row { display: flex; justify-content: space-between; gap: 6px; }
    .total { font-size: ${isNarrow ? "13px" : "15px"}; font-weight: 800; }
    .notes { font-size: ${isNarrow ? "10px" : "11.5px"}; background: #f4f4f4; padding: 4px 5px; border-radius: 3px; }
    .foot { font-size: ${isNarrow ? "9.5px" : "10.5px"}; margin-top: 4px; }

    @media print {
      html, body {
        background: #fff !important;
        width: var(--paper-mm, ${paperMm}mm) !important;
        height: auto !important;
        overflow: visible !important;
      }
      .no-print { display: none !important; }
      .stage { display: block; padding: 0; margin: 0; }
      .receipt {
        width: var(--paper-mm, ${paperMm}mm) !important;
        box-shadow: none !important;
        margin: 0 !important;
      }
    }
  </style>
</head>
<body>
  <div class="toolbar no-print">
    <div class="toolbar-group">
      <span>Roll:</span>
      <button type="button" id="btn-58" class="btn ${isNarrow ? "active" : ""}" onclick="setRoll(58)">58mm</button>
      <button type="button" id="btn-80" class="btn ${!isNarrow ? "active" : ""}" onclick="setRoll(80)">80mm</button>
    </div>
    <button type="button" class="btn primary" onclick="fitAndPrint()">Print Receipt</button>
  </div>

  <div class="stage">
    <div id="receipt" class="receipt">
      <div class="center">
        <div class="brand">PIYO GRILL &amp; RESTAURANT</div>
        <div class="sub">KITCHEN ORDER TICKET</div>
      </div>
      <hr />
      <div class="row">
        <strong>ORDER #${orderNo}</strong>
        <strong>${escapeHtml(order.orderType.toUpperCase())}</strong>
      </div>
      ${
        order.customer
          ? `<div>Guest / Table: <strong>${escapeHtml(order.customer)}</strong></div>`
          : ""
      }
      <div style="font-size:${isNarrow ? "9.5px" : "11px"};">${escapeHtml(
        new Date(order.createdAt).toLocaleString("en-PH"),
      )}</div>
      <hr />
      <table>${rows}</table>
      <hr />
      <div class="row total">
        <span>TOTAL</span>
        <span>${formatPeso(order.subtotal)}</span>
      </div>
      ${
        order.notes
          ? `<hr /><div class="notes"><strong>NOTE:</strong> ${escapeHtml(order.notes)}</div>`
          : ""
      }
      <hr />
      <div class="center foot">Km. 64, Tagaytay–Nasugbu Hwy</div>
      <div class="center foot"><strong>SALAMAT PO · PIYO</strong></div>
    </div>
  </div>

  <script>
    var currentMm = ${paperMm};
    function applyExactPageSize() {
      var el = document.getElementById("receipt");
      if (!el) return;
      document.documentElement.style.setProperty("--paper-mm", currentMm + "mm");
      el.style.width = currentMm + "mm";
      el.style.padding = currentMm === 58 ? "3.5mm 3mm 5mm" : "4.5mm 4mm 6mm";
      el.style.fontSize = currentMm === 58 ? "10.5px" : "12.5px";
      var rect = el.getBoundingClientRect();
      // Convert exact CSS pixels (96dpi) to mm + 4mm cut feed allowance
      var heightMm = Math.max(60, Math.ceil(rect.height * 25.4 / 96) + 4);
      var styleEl = document.getElementById("dynamic-page-style");
      if (styleEl) {
        styleEl.textContent = "@page { size: " + currentMm + "mm " + heightMm + "mm; margin: 0; }";
      }
    }
    function setRoll(mm) {
      currentMm = mm;
      document.getElementById("btn-58").classList.toggle("active", mm === 58);
      document.getElementById("btn-80").classList.toggle("active", mm === 80);
      applyExactPageSize();
    }
    function fitAndPrint() {
      applyExactPageSize();
      window.print();
    }
    window.onload = function () {
      applyExactPageSize();
      setTimeout(function () { window.print(); }, 120);
    };
  </script>
</body>
</html>`);
  win.document.close();
}

export function KitchenDashboard({ onExit }: { onExit: () => void }) {
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [activePin, setActivePin] = useState<string>(() => {
    try {
      return window.sessionStorage.getItem(SESSION_PIN_KEY) || "";
    } catch {
      return "";
    }
  });
  const [unlocked, setUnlocked] = useState<boolean>(() => Boolean(activePin));

  const [tab, setTab] = useState<"orders" | "qr">("orders");
  const [filter, setFilter] = useState<"active" | OrderStatus>("active");
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashNewOrder, setFlashNewOrder] = useState<KitchenOrder | null>(null);
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [busyId, setBusyId] = useState<string | null>(null);
  const [paperMm, setPaperMm] = useState<ReceiptPaperMm>(() => {
    try {
      return window.localStorage.getItem(STORAGE_PAPER_KEY) === "58" ? 58 : 80;
    } catch {
      return 80;
    }
  });

  const handlePaperChange = (mm: ReceiptPaperMm) => {
    setPaperMm(mm);
    try {
      window.localStorage.setItem(STORAGE_PAPER_KEY, String(mm));
    } catch {
      // Ignore
    }
  };

  const knownNewIdsRef = useRef<Set<string>>(new Set());
  const initializedRef = useRef(false);
  const filterRailRef = useRef<HTMLDivElement | null>(null);
  const [filterScrollLeft, setFilterScrollLeft] = useState(false);
  const [filterScrollRight, setFilterScrollRight] = useState(true);

  const syncFilterRailArrows = useCallback(() => {
    const el = filterRailRef.current;
    if (!el) return;
    setFilterScrollLeft(el.scrollLeft > 4);
    setFilterScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    if (!unlocked || tab !== "orders") return undefined;
    const raf = window.requestAnimationFrame(syncFilterRailArrows);
    window.addEventListener("resize", syncFilterRailArrows);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", syncFilterRailArrows);
    };
  }, [unlocked, tab, syncFilterRailArrows]);

  // Live minute ticker for elapsed wait times
  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  const fetchOrders = useCallback(
    async (pinToUse: string) => {
      try {
        setLoading(true);
        const list = await listOrders(pinToUse);
        setOrders(list);

        const incomingNew = list.filter((o) => o.status === "new");
        if (!initializedRef.current) {
          knownNewIdsRef.current = new Set(incomingNew.map((o) => o.id));
          initializedRef.current = true;
        } else {
          const brandNew = incomingNew.find(
            (o) => !knownNewIdsRef.current.has(o.id),
          );
          if (brandNew) {
            knownNewIdsRef.current.add(brandNew.id);
            setFlashNewOrder(brandNew);
            if (soundEnabled) playKitchenBell();
            window.setTimeout(() => {
              setFlashNewOrder((cur) => (cur?.id === brandNew.id ? null : cur));
            }, 9000);
          }
        }
      } catch (err) {
        if (err instanceof Error && err.message === "INVALID_PIN") {
          setUnlocked(false);
          setActivePin("");
          setPinError("Incorrect Kitchen PIN. Please sign in again.");
          try {
            window.sessionStorage.removeItem(SESSION_PIN_KEY);
          } catch {
            // Ignore
          }
        }
      } finally {
        setLoading(false);
      }
    },
    [soundEnabled],
  );

  useEffect(() => {
    if (!unlocked) return undefined;
    void fetchOrders(activePin);
    return subscribeToOrderUpdates(() => {
      void fetchOrders(activePin);
    }, 3500);
  }, [unlocked, activePin, fetchOrders]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = pinInput.trim();
    if (!cleaned) return;
    setPinError("");

    if (!IS_CLOUD_API_ENABLED) {
      if (cleaned !== DEFAULT_LOCAL_PIN) {
        setPinError(`Local demo PIN is ${DEFAULT_LOCAL_PIN}.`);
        return;
      }
      try {
        window.sessionStorage.setItem(SESSION_PIN_KEY, cleaned);
      } catch {
        // Ignore
      }
      setActivePin(cleaned);
      setUnlocked(true);
      playKitchenBell();
      return;
    }

    try {
      setLoading(true);
      await listOrders(cleaned);
      window.sessionStorage.setItem(SESSION_PIN_KEY, cleaned);
      setActivePin(cleaned);
      setUnlocked(true);
      playKitchenBell();
    } catch {
      setPinError("Incorrect Kitchen PIN.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdvanceStatus = async (order: KitchenOrder, next: OrderStatus) => {
    setBusyId(order.id);
    try {
      await updateOrderStatus(order.id, next, activePin);
      await fetchOrders(activePin);
    } finally {
      setBusyId(null);
    }
  };

  const handleSendSampleOrder = async () => {
    const sampleTable = String(Math.floor(Math.random() * 10) + 1);
    await createOrder({
      orderType: "Dine-In",
      tableNumber: sampleTable,
      customer: `Table #${sampleTable}`,
      notes: "Extra batwan broth & sili on the side",
      items: [
        { name: "Bacolod Cansi", qty: 1, price: 666, meta: "Signature Sharing Bowl" },
        { name: "Chicken Inasal", qty: 2, price: 366, meta: "Pecho · Garlic Java Rice" },
        { name: "Cucumber Lemonade", qty: 2, price: 145, meta: "Pitcher / Cold" },
      ],
      subtotal: 1688,
    });
    await fetchOrders(activePin);
  };

  const counts = useMemo(() => {
    const map: Record<OrderStatus | "active", number> = {
      active: 0,
      new: 0,
      accepted: 0,
      preparing: 0,
      ready: 0,
      completed: 0,
      cancelled: 0,
    };
    for (const o of orders) {
      map[o.status] += 1;
      if (
        o.status === "new" ||
        o.status === "accepted" ||
        o.status === "preparing" ||
        o.status === "ready"
      ) {
        map.active += 1;
      }
    }
    return map;
  }, [orders]);

  const visibleOrders = useMemo(() => {
    if (filter === "active") {
      return orders.filter(
        (o) =>
          o.status === "new" ||
          o.status === "accepted" ||
          o.status === "preparing" ||
          o.status === "ready",
      );
    }
    return orders.filter((o) => o.status === filter);
  }, [orders, filter]);

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#061009] px-4 py-10 text-[#FAF6EC]">
        <div className="w-full max-w-sm rounded-3xl border border-[#DFB96F]/25 bg-[#0D1C11] p-7 shadow-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#DFB96F]/15 text-[#DFB96F] ring-1 ring-[#DFB96F]/35">
              <ChefHat className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#DFB96F]">
                PIYO Tagaytay · Staff KDS
              </p>
              <h1 className="font-serif text-2xl font-semibold">Kitchen Tablet</h1>
            </div>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label
                htmlFor="piyo-kitchen-pin"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#B7C7BD]"
              >
                Counter / Kitchen PIN
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#DFB96F]/70" />
                <input
                  id="piyo-kitchen-pin"
                  type="password"
                  inputMode="numeric"
                  autoFocus
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter staff PIN"
                  className="w-full rounded-xl border border-[#DFB96F]/25 bg-[#061009] py-3 pr-4 pl-10 text-sm tracking-[0.25em] text-[#FAF6EC] placeholder:tracking-normal placeholder:text-[#6E8275] focus:border-[#DFB96F] focus:outline-none"
                />
              </div>
              {!IS_CLOUD_API_ENABLED && (
                <p className="mt-2 text-[11px] text-[#9BB0A1]">
                  Local Live Demo Mode — enter PIN{" "}
                  <strong className="font-mono text-[#DFB96F]">{DEFAULT_LOCAL_PIN}</strong>
                </p>
              )}
              {pinError && (
                <p className="mt-2 text-xs font-medium text-red-400">{pinError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#DFB96F] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#08130B] transition hover:bg-[#E7C88B] disabled:opacity-60"
            >
              <span>Unlock Kitchen Display</span>
            </button>
          </form>

          <button
            type="button"
            onClick={onExit}
            className="mt-4 flex w-full items-center justify-center gap-1.5 py-2 text-xs font-medium text-[#9BB0A1] transition hover:text-[#FAF6EC]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Customer Website</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#061009] text-[#FAF6EC]">
      {/* Top Staff Header — Slim 2-Row Mobile KDS Bar & Full Desktop Staff Bar */}
      <header className="sticky top-0 z-30 border-b border-[#DFB96F]/20 bg-[#08130B]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-3 py-2.5 sm:px-6 sm:py-3">
          {/* Desktop & Mobile Row 1 */}
          <div className="flex items-center justify-between gap-2 lg:flex-wrap lg:gap-3">
            {/* Brand + Live Status */}
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              {/* Mobile Compact Back-to-Menu Icon */}
              <button
                type="button"
                onClick={onExit}
                aria-label="Back to Customer Menu"
                title="Back to Customer Menu"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#DFB96F]/30 bg-[#0D1C11] text-[#DFB96F] transition hover:bg-[#DFB96F]/15 lg:hidden"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#DFB96F]/15 text-[#DFB96F] ring-1 ring-[#DFB96F]/35 lg:grid">
                <ChefHat className="h-5 w-5" />
              </span>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1 className="whitespace-nowrap font-serif text-[15px] font-semibold leading-tight tracking-wide sm:text-xl">
                    <span className="sm:hidden">PIYO Kitchen</span>
                    <span className="hidden sm:inline">
                      PIYO Live Kitchen &amp; Cashier
                    </span>
                  </h1>
                  <span
                    className={`hidden shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider sm:inline-flex ${
                      IS_CLOUD_API_ENABLED
                        ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30"
                        : "bg-[#DFB96F]/15 text-[#DFB96F] ring-1 ring-[#DFB96F]/35"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        IS_CLOUD_API_ENABLED
                          ? "animate-pulse bg-emerald-400"
                          : "animate-pulse bg-[#DFB96F]"
                      }`}
                    />
                    <span>
                      {IS_CLOUD_API_ENABLED
                        ? "Cloudflare D1 Live"
                        : "Local Live Sync"}
                    </span>
                  </span>
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#DFB96F] sm:hidden">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      IS_CLOUD_API_ENABLED
                        ? "animate-pulse bg-emerald-400"
                        : "animate-pulse bg-[#DFB96F]"
                    }`}
                  />
                  <span>{IS_CLOUD_API_ENABLED ? "Cloud Live" : "Local Live Sync"}</span>
                </p>
                <p className="hidden text-[11px] text-[#9BB0A1] lg:block">
                  Km. 64 Tagaytay Counter · Real-time ticket queue &amp; table QR studio
                </p>
              </div>
            </div>

            {/* Mobile Compact Right Controls (58/80mm + Chime Icon + Test Bell Icon) */}
            <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
              <div
                className="inline-flex items-center rounded-full border border-white/15 bg-[#0D1C11] p-0.5 text-[10px] font-bold"
                title="Receipt thermal roll width"
              >
                {([58, 80] as const).map((mm) => (
                  <button
                    key={mm}
                    type="button"
                    onClick={() => handlePaperChange(mm)}
                    className={`rounded-full px-2 py-0.5 transition ${
                      paperMm === mm
                        ? "bg-[#DFB96F] text-[#08130B]"
                        : "text-[#9BB0A1]"
                    }`}
                  >
                    {mm}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  const next = !soundEnabled;
                  setSoundEnabled(next);
                  if (next) playKitchenBell();
                }}
                aria-label={soundEnabled ? "Mute kitchen chime" : "Enable kitchen chime"}
                title={soundEnabled ? "Chime ON" : "Muted"}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition ${
                  soundEnabled
                    ? "border-emerald-400/35 bg-emerald-500/15 text-emerald-200"
                    : "border-white/15 bg-white/5 text-[#9BB0A1]"
                }`}
              >
                {soundEnabled ? (
                  <Bell className="h-3.5 w-3.5" />
                ) : (
                  <BellOff className="h-3.5 w-3.5" />
                )}
              </button>

              <button
                type="button"
                onClick={playKitchenBell}
                aria-label="Test kitchen bell"
                title="Test kitchen bell"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#FAF6EC] transition hover:bg-white/10"
              >
                <Volume2 className="h-3.5 w-3.5 text-[#DFB96F]" />
              </button>
            </div>

            {/* Desktop Full Control Strip */}
            <div className="hidden flex-wrap items-center gap-2 lg:flex">
              {/* View Tabs */}
              <div className="inline-flex rounded-full border border-white/10 bg-[#0D1C11] p-1">
                <button
                  type="button"
                  onClick={() => setTab("orders")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    tab === "orders"
                      ? "bg-[#DFB96F] text-[#08130B]"
                      : "text-[#B7C7BD] hover:text-white"
                  }`}
                >
                  <UtensilsCrossed className="h-3.5 w-3.5" />
                  <span>Orders</span>
                  {counts.new > 0 && (
                    <span className="rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] text-white">
                      {counts.new}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setTab("qr")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    tab === "qr"
                      ? "bg-[#DFB96F] text-[#08130B]"
                      : "text-[#B7C7BD] hover:text-white"
                  }`}
                >
                  <QrCode className="h-3.5 w-3.5" />
                  <span>Table QR Codes</span>
                </button>
              </div>

              {/* Thermal Paper Width Selector (58mm / 80mm) */}
              <div
                className="inline-flex items-center rounded-full border border-white/15 bg-[#0D1C11] p-0.5 text-[11px] font-bold"
                title="Receipt thermal roll width"
              >
                {([58, 80] as const).map((mm) => (
                  <button
                    key={mm}
                    type="button"
                    onClick={() => handlePaperChange(mm)}
                    className={`rounded-full px-2.5 py-1 transition ${
                      paperMm === mm
                        ? "bg-[#DFB96F] text-[#08130B]"
                        : "text-[#9BB0A1] hover:text-white"
                    }`}
                  >
                    {mm}mm
                  </button>
                ))}
              </div>

              {/* Bell Sound Controls */}
              <button
                type="button"
                onClick={() => {
                  const next = !soundEnabled;
                  setSoundEnabled(next);
                  if (next) playKitchenBell();
                }}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  soundEnabled
                    ? "border-emerald-400/35 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25"
                    : "border-white/15 bg-white/5 text-[#9BB0A1] hover:text-white"
                }`}
              >
                {soundEnabled ? (
                  <Bell className="h-3.5 w-3.5" />
                ) : (
                  <BellOff className="h-3.5 w-3.5" />
                )}
                <span>{soundEnabled ? "Chime ON" : "Muted"}</span>
              </button>

              <button
                type="button"
                onClick={playKitchenBell}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#FAF6EC] transition hover:bg-white/10"
              >
                Test Bell
              </button>

              <button
                type="button"
                onClick={onExit}
                className="inline-flex items-center gap-1 rounded-full border border-[#DFB96F]/30 px-3 py-1.5 text-xs font-semibold text-[#DFB96F] transition hover:bg-[#DFB96F]/10"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Menu</span>
              </button>
            </div>
          </div>

          {/* Mobile Row 2: Full-Width 2-Segment Switcher (Orders | Table QR Codes) */}
          <div className="mt-2 grid grid-cols-2 rounded-full border border-white/10 bg-[#0D1C11] p-0.5 lg:hidden">
            <button
              type="button"
              onClick={() => setTab("orders")}
              className={`inline-flex items-center justify-center gap-1.5 rounded-full py-1.5 text-xs font-bold transition ${
                tab === "orders"
                  ? "bg-[#DFB96F] text-[#08130B]"
                  : "text-[#B7C7BD] hover:text-white"
              }`}
            >
              <UtensilsCrossed className="h-3.5 w-3.5" />
              <span>Orders</span>
              {counts.active > 0 && (
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] tabular-nums ${
                    counts.new > 0
                      ? "bg-red-600 text-white"
                      : tab === "orders"
                        ? "bg-[#08130B]/15 text-[#08130B]"
                        : "bg-white/12 text-[#FAF6EC]"
                  }`}
                >
                  {counts.new > 0 ? counts.new : counts.active}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setTab("qr")}
              className={`inline-flex items-center justify-center gap-1.5 rounded-full py-1.5 text-xs font-bold transition ${
                tab === "qr"
                  ? "bg-[#DFB96F] text-[#08130B]"
                  : "text-[#B7C7BD] hover:text-white"
              }`}
            >
              <QrCode className="h-3.5 w-3.5" />
              <span>Table QR Codes</span>
            </button>
          </div>
        </div>
      </header>

      {/* Incoming New Order Alert Banner */}
      {flashNewOrder && (
        <div className="border-b border-[#DFB96F] bg-[#DFB96F] px-4 py-2.5 text-[#08130B]">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 text-xs font-bold">
            <span className="inline-flex items-center gap-2">
              <Bell className="h-4 w-4 animate-bounce" />
              <span>
                NEW ORDER #{String(flashNewOrder.orderNumber).padStart(4, "0")} ·{" "}
                {flashNewOrder.customer || flashNewOrder.orderType} ·{" "}
                {formatPeso(flashNewOrder.subtotal)}
              </span>
            </span>
            <button
              type="button"
              onClick={() => {
                setTab("orders");
                setFilter("active");
                setFlashNewOrder(null);
              }}
              className="rounded-full bg-[#08130B] px-3 py-1 text-[11px] text-[#FAF6EC]"
            >
              View Ticket
            </button>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-7xl px-3.5 py-3.5 sm:px-6 sm:py-6">
        {tab === "orders" ? (
          <div className="space-y-3.5 sm:space-y-5">
            {/* Filter & Action Strip — Compact Single-Row Scrollable Filters with ‹ › Arrows + Slim Actions on Mobile */}
            <div className="flex flex-col gap-2.5 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-3">
              <div className="flex min-w-0 items-center gap-1 lg:block">
                <button
                  type="button"
                  onClick={() =>
                    filterRailRef.current?.scrollBy({ left: -160, behavior: "smooth" })
                  }
                  disabled={!filterScrollLeft}
                  aria-label="Scroll order filters left"
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#0D1C11] text-[#DFB96F] transition lg:hidden ${
                    filterScrollLeft
                      ? "opacity-100 hover:bg-[#152517]"
                      : "pointer-events-none opacity-30"
                  }`}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>

                <div
                  ref={filterRailRef}
                  onScroll={syncFilterRailArrows}
                  onWheel={(e) => {
                    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                      e.currentTarget.scrollLeft += e.deltaY;
                      syncFilterRailArrows();
                    }
                  }}
                  className="flex min-w-0 flex-1 flex-nowrap items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 touch-pan-x lg:flex-wrap lg:gap-2"
                >
                  {(
                    [
                      { key: "active", label: "Active Queue", short: "Active" },
                      { key: "new", label: "Incoming", short: "New" },
                      { key: "accepted", label: "Accepted", short: "Accepted" },
                      { key: "preparing", label: "Preparing", short: "Preparing" },
                      { key: "ready", label: "Ready", short: "Ready" },
                      { key: "completed", label: "Completed", short: "Done" },
                    ] as const
                  ).map((item) => {
                    const isSelected = filter === item.key;
                    const count = counts[item.key];
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setFilter(item.key)}
                        className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[11px] font-bold transition sm:px-3.5 sm:py-2 sm:text-xs ${
                          isSelected
                            ? "bg-[#DFB96F] text-[#08130B]"
                            : "border border-white/10 bg-[#0D1C11] text-[#CDD9D0] hover:border-[#DFB96F]/40"
                        }`}
                      >
                        <span className="sm:hidden">{item.short}</span>
                        <span className="hidden sm:inline">{item.label}</span>
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${
                            isSelected
                              ? "bg-[#08130B]/15 text-[#08130B]"
                              : "bg-white/10 text-[#FAF6EC]"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    filterRailRef.current?.scrollBy({ left: 160, behavior: "smooth" })
                  }
                  disabled={!filterScrollRight}
                  aria-label="Scroll order filters right"
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#0D1C11] text-[#DFB96F] transition lg:hidden ${
                    filterScrollRight
                      ? "opacity-100 hover:bg-[#152517]"
                      : "pointer-events-none opacity-30"
                  }`}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="flex flex-nowrap items-center justify-between gap-2 lg:flex-wrap lg:justify-end">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => void fetchOrders(activePin)}
                    className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-[#0D1C11] px-3 py-1.5 text-[11.5px] font-semibold text-[#FAF6EC] transition hover:bg-[#152517] sm:py-2 sm:text-xs"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                    <span>Refresh</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleSendSampleOrder()}
                    className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-[#DFB96F]/40 bg-[#DFB96F]/10 px-3 py-1.5 text-[11.5px] font-bold text-[#DFB96F] transition hover:bg-[#DFB96F]/20 sm:gap-1.5 sm:px-3.5 sm:py-2 sm:text-xs"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span className="sm:hidden">Test Ticket</span>
                    <span className="hidden sm:inline">Send Test Ticket</span>
                  </button>
                </div>
                {!IS_CLOUD_API_ENABLED && counts.completed > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setOrders(clearLocalCompletedOrders());
                    }}
                    className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-white/15 px-2.5 py-1.5 text-[11.5px] font-semibold text-[#9BB0A1] transition hover:border-red-400/40 hover:text-red-300 sm:gap-1.5 sm:px-3 sm:py-2 sm:text-xs"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Clear Done</span>
                  </button>
                )}
              </div>
            </div>

            {/* Ticket Grid */}
            {visibleOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#DFB96F]/25 bg-[#0D1C11]/60 px-6 py-16 text-center">
                <div className="mb-3 grid h-14 w-14 place-items-center rounded-full bg-[#DFB96F]/15 text-[#DFB96F]">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#FAF6EC]">
                  Kitchen Queue is Clear
                </h2>
                <p className="mt-1.5 max-w-md text-sm text-[#9BB0A1]">
                  Keep this tablet open at the counter. When a customer places an order from the
                  menu or a Table QR code (e.g.{" "}
                  <a
                    href="?table=5"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[#DFB96F] underline underline-offset-2"
                  >
                    ?table=5
                  </a>
                  ), it will chime and appear here instantly.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => void handleSendSampleOrder()}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#DFB96F] px-5 py-2.5 text-xs font-bold text-[#08130B] transition hover:bg-[#E7C88B]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Send Test Order Ticket</span>
                  </button>
                  <a
                    href="?table=5"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-[#FAF6EC] transition hover:bg-white/10"
                  >
                    <span>Open Customer Tab (Table #5)</span>
                    <ExternalLink className="h-3.5 w-3.5 text-[#DFB96F]" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visibleOrders.map((order) => {
                  const ageMins = Math.floor(
                    (nowMs - new Date(order.createdAt).getTime()) / 60_000,
                  );
                  const isNew = order.status === "new";
                  const isReady = order.status === "ready";
                  const isBusy = busyId === order.id;

                  return (
                    <article
                      key={order.id}
                      className={`flex flex-col overflow-hidden rounded-3xl bg-[#FAF6EC] text-[#1D231E] shadow-xl transition ${
                        isNew
                          ? "ring-2 ring-[#DFB96F] shadow-[0_0_32px_-6px_rgba(223,185,111,0.45)]"
                          : isReady
                            ? "ring-2 ring-emerald-500/70"
                            : "ring-1 ring-[#DFB96F]/25"
                      }`}
                    >
                      {/* Ticket Top Strip */}
                      <div
                        className={`flex items-center justify-between px-4 py-3 ${
                          isNew
                            ? "bg-[#0D1C11] text-[#FAF6EC]"
                            : isReady
                              ? "bg-emerald-950 text-emerald-50"
                              : "bg-[#152517] text-[#FAF6EC]"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-lg font-extrabold tracking-tight text-[#DFB96F]">
                              #{String(order.orderNumber).padStart(4, "0")}
                            </span>
                            <span className="rounded-full bg-white/12 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#FAF6EC]">
                              {order.orderType}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs font-semibold text-[#D5E1D8]">
                            {order.customer ||
                              (order.tableNumber
                                ? `Table #${order.tableNumber}`
                                : "Walk-in Guest")}
                          </p>
                        </div>

                        <div className="text-right">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              isNew
                                ? "animate-pulse bg-[#DFB96F] text-[#08130B]"
                                : isReady
                                  ? "bg-emerald-400 text-emerald-950"
                                  : "bg-white/12 text-[#FAF6EC]"
                            }`}
                          >
                            {ORDER_STATUS_META[order.status].label}
                          </span>
                          <p
                            className={`mt-1 flex items-center justify-end gap-1 text-[11px] font-semibold ${
                              ageMins >= 15 &&
                              order.status !== "completed" &&
                              order.status !== "ready"
                                ? "text-red-300"
                                : "text-[#9BB0A1]"
                            }`}
                          >
                            <Clock className="h-3 w-3" />
                            <span>{formatElapsed(order.createdAt, nowMs)}</span>
                          </p>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="flex-1 space-y-2.5 p-4">
                        <ul className="divide-y divide-[#0D1C11]/10">
                          {order.items.map((it, idx) => (
                            <li
                              key={`${it.name}-${idx}`}
                              className="flex items-start justify-between gap-3 py-2 first:pt-0 last:pb-0"
                            >
                              <div className="flex items-start gap-2.5">
                                <span className="mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-lg bg-[#0D1C11] px-1.5 font-mono text-xs font-bold text-[#DFB96F]">
                                  {it.qty}×
                                </span>
                                <div>
                                  <p className="text-sm font-bold leading-snug text-[#08130B]">
                                    {it.name}
                                  </p>
                                  {it.meta && (
                                    <p className="text-[11px] text-[#4B5E50]">{it.meta}</p>
                                  )}
                                </div>
                              </div>
                              <span className="shrink-0 font-mono text-xs font-bold text-[#0D1C11]">
                                {formatPeso(it.qty * it.price)}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {order.notes && (
                          <div className="rounded-xl border border-amber-700/20 bg-amber-100/80 px-3 py-2 text-xs text-amber-950">
                            <span className="font-bold uppercase tracking-wider text-[10px]">
                              Guest Note:{" "}
                            </span>
                            {order.notes}
                          </div>
                        )}
                      </div>

                      {/* Subtotal + Action Footer */}
                      <div className="space-y-2.5 border-t border-[#0D1C11]/12 bg-[#F2EADA] px-4 py-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5E50]">
                            Total (VAT Inc.)
                          </span>
                          <span className="font-serif text-xl font-bold text-[#08130B]">
                            {formatPeso(order.subtotal)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {order.status === "new" && (
                            <>
                              <button
                                type="button"
                                disabled={isBusy}
                                onClick={() => void handleAdvanceStatus(order, "accepted")}
                                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#0D1C11] px-4 py-2.5 text-xs font-bold text-[#FAF6EC] transition hover:bg-[#152517] disabled:opacity-50"
                              >
                                <Check className="h-4 w-4 text-[#DFB96F]" />
                                <span>Accept Order</span>
                              </button>
                              <button
                                type="button"
                                disabled={isBusy}
                                onClick={() => void handleAdvanceStatus(order, "cancelled")}
                                className="inline-flex items-center justify-center rounded-full border border-red-700/25 bg-white px-3 py-2.5 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50"
                                title="Decline order"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </>
                          )}

                          {order.status === "accepted" && (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => void handleAdvanceStatus(order, "preparing")}
                              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#8A5316] px-4 py-2.5 text-xs font-bold text-[#FAF6EC] transition hover:bg-[#9E6622] disabled:opacity-50"
                            >
                              <Flame className="h-4 w-4 text-[#DFB96F]" />
                              <span>Start Preparing</span>
                            </button>
                          )}

                          {order.status === "preparing" && (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => void handleAdvanceStatus(order, "ready")}
                              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-800 disabled:opacity-50"
                            >
                              <Bell className="h-4 w-4" />
                              <span>Mark Ready to Serve</span>
                            </button>
                          )}

                          {order.status === "ready" && (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => void handleAdvanceStatus(order, "completed")}
                              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#DFB96F] px-4 py-2.5 text-xs font-bold text-[#08130B] transition hover:bg-[#E7C88B] disabled:opacity-50"
                            >
                              <Check className="h-4 w-4" />
                              <span>Served · Complete</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => printKitchenChit(order, paperMm)}
                            className="inline-flex items-center justify-center gap-1 rounded-full border border-[#0D1C11]/20 bg-white px-3 py-2.5 text-xs font-bold text-[#0D1C11] transition hover:bg-[#E5EDE7]"
                            title={`Print ${paperMm}mm thermal receipt`}
                          >
                            <Printer className="h-3.5 w-3.5" />
                            <span>Print ({paperMm}mm)</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <TableQrStudio />
        )}
      </main>
    </div>
  );
}

function TableQrStudio() {
  const defaultOrigin =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : "https://mediqtechsupport-byte.github.io/PIYO-website/";
  const [baseUrl, setBaseUrl] = useState(defaultOrigin);
  const [tableCount, setTableCount] = useState(12);
  const [qrMap, setQrMap] = useState<Record<number, string>>({});

  useEffect(() => {
    let active = true;
    const cleanBase = baseUrl.trim().replace(/\?.*$/, "");
    const generate = async () => {
      const next: Record<number, string> = {};
      for (let t = 1; t <= tableCount; t += 1) {
        const url = `${cleanBase}?table=${t}`;
        try {
          next[t] = await QRCode.toDataURL(url, {
            width: 320,
            margin: 1,
            color: { dark: "#08130B", light: "#FAF6EC" },
          });
        } catch {
          // Ignore malformed URLs while typing
        }
      }
      if (active) setQrMap(next);
    };
    void generate();
    return () => {
      active = false;
    };
  }, [baseUrl, tableCount]);

  const cleanBase = baseUrl.trim().replace(/\?.*$/, "");

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-[#DFB96F]/25 bg-[#0D1C11] p-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4 sm:rounded-3xl sm:p-5">
        <div className="min-w-0 flex-1 space-y-1 sm:min-w-[260px] sm:space-y-2">
          <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#DFB96F] sm:text-[10px] sm:tracking-[0.22em]">
            Dine-In Table Tent Generator
          </p>
          <h2 className="font-serif text-xl font-semibold leading-tight text-[#FAF6EC] sm:text-2xl">
            Unique QR Codes per Table
          </h2>
          <p className="text-[11.5px] leading-relaxed text-[#B7C7BD] sm:text-xs">
            Scanning opens PIYO&apos;s menu with{" "}
            <strong className="text-[#FAF6EC]">Dine-In</strong> &amp;{" "}
            <strong className="text-[#DFB96F]">Table #</strong> auto-filled.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-end sm:gap-3">
          <div className="w-full sm:w-auto">
            <label className="mb-1 block text-[9.5px] font-bold uppercase tracking-wider text-[#9BB0A1] sm:text-[10px]">
              Menu URL
            </label>
            <input
              type="url"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="w-full rounded-xl border border-[#DFB96F]/25 bg-[#061009] px-3 py-2 text-xs text-[#FAF6EC] focus:border-[#DFB96F] focus:outline-none sm:w-72"
            />
          </div>
          <div className="grid grid-cols-2 items-end gap-2 sm:flex sm:gap-3">
            <div className="min-w-0">
              <label className="mb-1 block text-[9.5px] font-bold uppercase tracking-wider text-[#9BB0A1] sm:text-[10px]">
                Tables
              </label>
              <select
                value={tableCount}
                onChange={(e) => setTableCount(Number(e.target.value))}
                className="h-[36px] w-full rounded-xl border border-[#DFB96F]/25 bg-[#061009] px-3 text-xs font-bold text-[#FAF6EC] focus:border-[#DFB96F] focus:outline-none sm:h-auto sm:w-auto sm:py-2"
              >
                {[6, 10, 12, 16, 20].map((n) => (
                  <option key={n} value={n}>
                    Tables 1–{n}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex h-[36px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#DFB96F] px-3.5 text-xs font-bold text-[#08130B] transition hover:bg-[#E7C88B] sm:h-auto sm:px-4 sm:py-2"
            >
              <Printer className="h-3.5 w-3.5 shrink-0" />
              <span>Print QR Cards</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: tableCount }, (_, i) => i + 1).map((tableNum) => {
          const tableUrl = `${cleanBase}?table=${tableNum}`;
          return (
            <div
              key={tableNum}
              className="flex flex-col items-center rounded-2xl border border-[#DFB96F]/30 bg-[#FAF6EC] p-3 text-center text-[#08130B] shadow-lg sm:rounded-3xl sm:p-5"
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8A5316] sm:text-[10px] sm:tracking-[0.22em]">
                PIYO · Tagaytay
              </span>
              <h3 className="mt-0.5 font-serif text-lg font-bold sm:mt-1 sm:text-2xl">
                Table #{tableNum}
              </h3>
              <p className="text-[10px] text-[#4B5E50] sm:text-[11px]">
                Scan to browse &amp; order
              </p>

              <div className="my-2.5 rounded-xl border border-[#08130B]/10 bg-[#FAF6EC] p-1.5 shadow-inner sm:my-4 sm:rounded-2xl sm:p-2">
                {qrMap[tableNum] ? (
                  <img
                    src={qrMap[tableNum]}
                    alt={`QR Code for PIYO Table #${tableNum}`}
                    className="h-28 w-28 object-contain sm:h-40 sm:w-40"
                  />
                ) : (
                  <div className="grid h-28 w-28 place-items-center text-xs text-[#6E8275] sm:h-40 sm:w-40">
                    Generating…
                  </div>
                )}
              </div>

              <a
                href={`?table=${tableNum}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[#08130B] px-3 py-1.5 text-[10.5px] font-bold text-[#FAF6EC] transition hover:bg-[#152517] sm:px-3.5 sm:text-[11px]"
                title={tableUrl}
              >
                <span className="sm:hidden">Test #{tableNum}</span>
                <span className="hidden sm:inline">Test Table #{tableNum}</span>
                <ExternalLink className="h-3 w-3 shrink-0 text-[#DFB96F]" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
