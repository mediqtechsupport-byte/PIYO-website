import React, { useEffect, useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Copy,
  Check,
  MessageSquare,
  Phone,
  ShoppingBag,
  Printer,
  QrCode,
  ChefHat,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { formatPeso } from '../utils/hours';
import { ReceiptPrinter } from '@/components/ui/receipt-printer';
import {
  createOrder,
  getOrderById,
  addSavedCustomerOrderId,
  subscribeToOrderUpdates,
  ORDER_STATUS_META,
  IS_CLOUD_API_ENABLED,
} from '@/services/orderService';

export function OrderTrayDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClear,
  activeTable = null,
  onOrderCreated,
  trackedOrders = [],
  onDismissTrackedOrder,
}) {
  const [orderType, setOrderType] = useState('Dine-In');
  const [guestName, setGuestName] = useState(
    activeTable ? `Table #${activeTable}` : ''
  );
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [isPrinterOpen, setIsPrinterOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [liveOrder, setLiveOrder] = useState(null);

  useEffect(() => {
    if (activeTable) {
      setOrderType('Dine-In');
      setGuestName((prev) => (prev.trim() ? prev : `Table #${activeTable}`));
    }
  }, [activeTable]);

  useEffect(() => {
    if (!isOpen) {
      setIsPrinterOpen(false);
      setSubmitError('');
    }
  }, [isOpen]);

  const closeReceiptAndDrawer = () => {
    setIsPrinterOpen(false);
    onClose();
  };

  useEffect(() => {
    if (!isPrinterOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeReceiptAndDrawer();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isPrinterOpen]);

  // Live-track kitchen status updates while the receipt modal is open
  useEffect(() => {
    if (!isPrinterOpen || !liveOrder?.id) return undefined;
    let active = true;
    const refresh = async () => {
      try {
        const latest = await getOrderById(liveOrder.id);
        if (active && latest) {
          setLiveOrder(latest);
        }
      } catch {
        // Keep last known status
      }
    };
    const unsubscribe = subscribeToOrderUpdates(refresh, 3500);
    return () => {
      active = false;
      unsubscribe();
    };
  }, [isPrinterOpen, liveOrder?.id]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, entry) => sum + entry.unitPrice * entry.quantity, 0);

  const receiptItems = items.map((entry) => {
    const metaParts = [];
    if (entry.variantLabel && entry.variantLabel !== 'Standard') {
      metaParts.push(entry.variantLabel);
    }
    if (entry.addons?.length > 0) {
      metaParts.push(`+ ${entry.addons.map((a) => a.label).join(', ')}`);
    }
    return {
      name: entry.dish.name,
      qty: entry.quantity,
      price: entry.unitPrice,
      meta: metaParts.length > 0 ? metaParts.join(' · ') : undefined,
    };
  });

  const handlePlaceOrderAndPrint = async () => {
    if (items.length === 0 || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const created = await createOrder({
        orderType,
        tableNumber:
          activeTable ||
          (guestName.toLowerCase().includes('table') ? guestName.trim() : null),
        customer:
          guestName.trim() || (activeTable ? `Table #${activeTable}` : ''),
        notes: notes.trim(),
        items: receiptItems,
        subtotal,
      });
      setLiveOrder(created);
      addSavedCustomerOrderId(created.id);
      onOrderCreated?.(created);
      onClear();
      setNotes('');
      setIsPrinterOpen(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Could not reach kitchen server. You can still send via SMS.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const printedOrderNo = liveOrder?.orderNumber ?? null;

  const buildOrderSummaryFromSnapshot = (order) => {
    const lines = [
      `PIYO Grill & Restaurant — ${order.orderType} Order`,
      `Order Ref: #${String(order.orderNumber).padStart(4, '0')}`,
      order.customer ? `Name / Table: ${order.customer}` : null,
      '---',
      ...order.items.map(
        (it) =>
          `${it.qty}x ${it.name}${it.meta ? ` (${it.meta})` : ''} — ${formatPeso(
            it.price * it.qty
          )}`
      ),
      '---',
      `Total: ${formatPeso(order.subtotal)}`,
      order.notes ? `Notes: ${order.notes}` : null,
    ].filter(Boolean);

    return lines.join('\n');
  };

  const buildSummaryText = (orderNumber = printedOrderNo) => {
    if (isPrinterOpen && liveOrder) {
      return buildOrderSummaryFromSnapshot(liveOrder);
    }
    const lines = [
      `PIYO Grill & Restaurant — ${orderType} Order`,
      orderNumber ? `Order Ref: #${String(orderNumber).padStart(4, '0')}` : null,
      guestName.trim() ? `Name / Table: ${guestName.trim()}` : null,
      '---',
      ...items.map((entry) => {
        const addonsStr =
          entry.addons?.length > 0
            ? ` (+ ${entry.addons.map((a) => a.label).join(', ')})`
            : '';
        return `${entry.quantity}x ${entry.dish.name} [${entry.variantLabel}]${addonsStr} — ${formatPeso(
          entry.unitPrice * entry.quantity
        )}`;
      }),
      '---',
      `Estimated Total: ${formatPeso(subtotal)}`,
      notes.trim() ? `Notes: ${notes.trim()}` : null,
    ].filter(Boolean);

    return lines.join('\n');
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildSummaryText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const smsHref = `sms:${RESTAURANT_INFO.mobileTel}?body=${encodeURIComponent(
    buildSummaryText()
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#08130B]/65 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Order and table tray"
    >
      <div
        className="flex h-full w-full max-w-md flex-col bg-[#FAF6EC] text-[#1D231E] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#0D1C11]/15 bg-[#0D1C11] px-5 py-4 text-[#FAF6EC]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#D8B36A]" />
            <div>
              <h3 className="font-serif text-xl font-semibold">My Order &amp; Table Tray</h3>
              <p className="text-[11px] text-[#CDD9D0]">
                Plan your dine-in spread or send a takeout inquiry
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-[#FAF6EC]/80 hover:bg-white/10"
            aria-label="Close tray"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* All Active Placed Orders Live Kitchen Status Cards (stays stacked when adding multiple rounds!) */}
          {trackedOrders.length > 0 && (
            <div className="mb-5 space-y-3">
              {trackedOrders.length > 1 && (
                <div className="flex items-center justify-between rounded-xl border border-[#0D1C11]/15 bg-[#EFE6D2] px-3.5 py-2 text-xs">
                  <span className="font-bold uppercase tracking-wider text-[#08130B]">
                    Active Receipts ({trackedOrders.length})
                  </span>
                  <span className="font-serif text-sm font-bold text-[#08130B]">
                    Combined:{' '}
                    {formatPeso(
                      trackedOrders.reduce((sum, o) => sum + (o.subtotal || 0), 0)
                    )}
                  </span>
                </div>
              )}

              {trackedOrders.map((ord) => {
                const statusInfo =
                  ORDER_STATUS_META[ord.status] || ORDER_STATUS_META.new;
                const orderNo = String(ord.orderNumber).padStart(4, '0');
                const isReady = ord.status === 'ready';
                const isCompleted = ord.status === 'completed';
                const isCancelled = ord.status === 'cancelled';
                const steps = [
                  { key: 'new', label: 'Sent' },
                  { key: 'accepted', label: 'Accepted' },
                  { key: 'preparing', label: 'Preparing' },
                  { key: 'ready', label: 'Ready' },
                ];

                return (
                  <div
                    key={ord.id}
                    className={`overflow-hidden rounded-2xl border shadow-md ${
                      isReady
                        ? 'border-emerald-500/60 bg-emerald-950 text-emerald-50'
                        : 'border-[#DFB96F]/40 bg-[#08130B] text-[#FAF6EC]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 px-4 pt-3.5 pb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              isCancelled
                                ? 'bg-red-400'
                                : isReady || isCompleted
                                ? 'bg-emerald-400'
                                : 'animate-pulse bg-[#DFB96F]'
                            }`}
                          />
                          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#DFB96F]">
                            Active Order #{orderNo} · {ord.orderType}
                          </span>
                        </div>
                        <h4 className="mt-1 font-serif text-lg font-semibold leading-tight">
                          {statusInfo.customerLabel}
                        </h4>
                        <p className="mt-0.5 text-[11px] text-[#B7C7BD]">
                          {statusInfo.customerHint}
                        </p>
                      </div>

                      {onDismissTrackedOrder && (
                        <button
                          type="button"
                          onClick={() => onDismissTrackedOrder(ord.id)}
                          className="rounded-full p-1 text-[#9BB0A1] transition hover:bg-white/10 hover:text-white"
                          aria-label={`Dismiss order #${orderNo}`}
                          title="Dismiss this receipt card"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Live 4-Step Progress Bar */}
                    {!isCancelled && (
                      <div className="grid grid-cols-4 gap-1.5 px-4 pb-3">
                        {steps.map((step, i) => {
                          const reached = statusInfo.stepIndex >= i;
                          return (
                            <div key={step.key} className="space-y-1">
                              <div
                                className={`h-1.5 rounded-full transition-colors ${
                                  reached
                                    ? isReady || isCompleted
                                      ? 'bg-emerald-400'
                                      : 'bg-[#DFB96F]'
                                    : 'bg-white/15'
                                }`}
                              />
                              <p
                                className={`text-[9px] font-bold uppercase tracking-wider ${
                                  reached
                                    ? isReady || isCompleted
                                      ? 'text-emerald-300'
                                      : 'text-[#DFB96F]'
                                    : 'text-[#809487]'
                                }`}
                              >
                                {step.label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Ordered Dishes Summary */}
                    <div className="border-t border-white/10 bg-black/20 px-4 py-2.5 text-xs">
                      {ord.customer && (
                        <p className="mb-1.5 text-[11px] font-semibold text-[#DFB96F]">
                          {ord.customer}
                        </p>
                      )}
                      <ul className="space-y-1 text-[#E5ECE7]">
                        {ord.items.map((it, idx) => (
                          <li
                            key={`${it.name}-${idx}`}
                            className="flex items-center justify-between gap-2"
                          >
                            <span className="truncate">
                              <strong className="text-[#DFB96F]">{it.qty}×</strong>{' '}
                              {it.name}
                            </span>
                            <span className="shrink-0 font-mono text-[11px]">
                              {formatPeso(it.qty * it.price)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B7C7BD]">
                          Order Total
                        </span>
                        <span className="font-serif text-base font-bold text-[#FAF6EC]">
                          {formatPeso(ord.subtotal)}
                        </span>
                      </div>
                      <div className="mt-2.5 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setLiveOrder(ord);
                            setIsPrinterOpen(true);
                          }}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#DFB96F] px-3 py-1.5 text-[11px] font-bold text-[#08130B] transition hover:bg-[#E7C88B]"
                        >
                          <Printer className="h-3.5 w-3.5" />
                          <span>View / Reprint Receipt</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {items.length === 0 ? (
            <div
              className={`flex flex-col items-center justify-center text-center ${
                trackedOrders.length > 0
                  ? 'rounded-2xl border border-dashed border-[#0D1C11]/20 bg-white/55 px-4 py-7'
                  : 'h-full'
              }`}
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#E5EDE7] text-[#0D1C11]">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <p className="font-serif text-xl font-semibold text-[#0D1C11]">
                {trackedOrders.length > 0
                  ? 'Want to add another round?'
                  : 'Your tray is empty'}
              </p>
              <p className="mt-1 max-w-xs text-xs text-[#4B5E50]">
                {trackedOrders.length > 0
                  ? 'All your active receipts stay tracked above. Browse the menu anytime to add extra rice, drinks, or desserts.'
                  : 'Browse the menu and tap + Add on Bacolod Cansi, Chicken Inasal, or your Tagaytay favorites.'}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 rounded-full bg-[#0D1C11] px-5 py-2.5 text-xs font-bold text-[#FAF6EC] transition hover:bg-[#152517]"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* QR Table Banner (when opened via ?table=5) */}
              {activeTable && (
                <div className="flex items-center justify-between gap-2 rounded-2xl border border-[#DFB96F]/55 bg-[#08130B] px-3.5 py-2.5 text-xs text-[#FAF6EC]">
                  <span className="inline-flex items-center gap-2 font-semibold">
                    <QrCode className="h-4 w-4 text-[#DFB96F]" />
                    <span>
                      Checked in at <strong className="text-[#DFB96F]">Table #{activeTable}</strong>
                    </span>
                  </span>
                  <span className="rounded-full bg-[#DFB96F]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#DFB96F]">
                    Auto-filled
                  </span>
                </div>
              )}
              {/* Order Mode Toggle */}
              <div className="grid grid-cols-3 gap-1.5 rounded-2xl bg-[#E8DEC8]/70 p-1">
                {['Dine-In', 'Takeout', 'Pickup'].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setOrderType(mode)}
                    className={`rounded-xl py-2 text-xs font-bold transition ${
                      orderType === mode
                        ? 'bg-[#0D1C11] text-[#FAF6EC] shadow-xs'
                        : 'text-[#394A3E] hover:text-[#0D1C11]'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              {/* Line Items */}
              <div className="space-y-2.5">
                {items.map((entry) => (
                  <div
                    key={entry.key}
                    className="flex gap-3 rounded-2xl border border-[#0D1C11]/12 bg-white/80 p-3"
                  >
                    <img
                      src={entry.dish.image}
                      alt={entry.dish.name}
                      className="h-16 w-16 shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-[#0D1C11]">
                            {entry.dish.name}
                          </h4>
                          <p className="text-[11px] text-[#4B5E50]">
                            {entry.variantLabel}
                            {entry.addons?.length > 0 &&
                              ` · + ${entry.addons.map((a) => a.label).join(', ')}`}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(entry.key)}
                          className="text-[#7A887E] hover:text-red-700"
                          aria-label={`Remove ${entry.dish.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-[#0D1C11]/20 bg-[#FAF6EC] px-1 py-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(entry.key, entry.quantity - 1)}
                            className="rounded-full p-1 text-[#0D1C11] hover:bg-[#E5EDE7]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#0D1C11]">
                            {entry.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(entry.key, entry.quantity + 1)}
                            className="rounded-full p-1 text-[#0D1C11] hover:bg-[#E5EDE7]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-[#0D1C11]">
                          {formatPeso(entry.unitPrice * entry.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guest / Table Note */}
              <div className="space-y-2.5 rounded-2xl border border-[#0D1C11]/12 bg-white/75 p-3.5">
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Your Name or Table # (optional)"
                  className="w-full rounded-xl border border-[#0D1C11]/15 bg-[#FAF6EC] px-3 py-2 text-xs text-[#1D231E] placeholder-[#718275] focus:border-[#0D1C11] focus:outline-none"
                />
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Requests (e.g. 6–8 seater table, extra chili, pickup time)"
                  className="w-full rounded-xl border border-[#0D1C11]/15 bg-[#FAF6EC] px-3 py-2 text-xs text-[#1D231E] placeholder-[#718275] focus:border-[#0D1C11] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClear}
                  className="inline-flex min-h-[38px] items-center rounded-full border border-[#0D1C11]/20 px-4 text-xs font-semibold text-[#5B6D5F] transition hover:border-red-700/40 hover:text-red-700"
                >
                  Clear tray
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-[38px] items-center rounded-full bg-[#DFB96F] px-5 text-xs font-bold text-[#08130B] transition hover:bg-[#E7C88B]"
                >
                  Keep browsing
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="space-y-2.5 border-t border-[#0D1C11]/15 bg-[#FAF6EC] px-5 py-4 pb-safe">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5E50]">
                Estimated Subtotal
              </span>
              <span className="font-serif text-2xl font-bold text-[#0D1C11]">
                {formatPeso(subtotal)}
              </span>
            </div>

            {submitError && (
              <p className="rounded-xl bg-red-900/10 px-3 py-2 text-[11px] font-medium text-red-800">
                {submitError}
              </p>
            )}

            <button
              type="button"
              onClick={handlePlaceOrderAndPrint}
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0D1C11] px-4 py-3 text-xs font-bold tracking-wide text-[#FAF6EC] shadow-[0_12px_24px_-8px_rgba(8,19,11,0.55)] ring-1 ring-[#DFB96F]/35 transition hover:-translate-y-0.5 hover:bg-[#152517] active:scale-[0.99] disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-[#DFB96F]" />
                  <span>Sending to PIYO Kitchen…</span>
                </>
              ) : (
                <>
                  <Printer className="h-4 w-4 text-[#DFB96F]" />
                  <span>Place Order / Print Receipt</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#0D1C11]/25 bg-white px-4 py-2.5 text-xs font-bold text-[#0D1C11] transition hover:bg-[#E5EDE7]"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-700" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Summary</span>
                  </>
                )}
              </button>

              <a
                href={smsHref}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#0D1C11]/25 bg-[#EDE5D0] px-4 py-2.5 text-xs font-bold text-[#0D1C11] transition hover:bg-[#E3D8BC]"
              >
                <MessageSquare className="h-4 w-4 text-[#8A5316]" />
                <span>Send via SMS</span>
              </a>
            </div>

            <a
              href={`tel:${RESTAURANT_INFO.mobileTel}`}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D8B36A] px-4 py-2.5 text-xs font-bold text-[#08130B] transition hover:bg-[#E5C685]"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Call {RESTAURANT_INFO.mobile} to Confirm</span>
            </a>
          </div>
        )}
      </div>

      {/* Centered Thermal Receipt Printer Modal */}
      {isPrinterOpen && liveOrder && (() => {
        const currentStatus = liveOrder.status || 'new';
        const statusInfo = ORDER_STATUS_META[currentStatus] || ORDER_STATUS_META.new;
        const steps = [
          { key: 'new', label: 'Sent' },
          { key: 'accepted', label: 'Accepted' },
          { key: 'preparing', label: 'Preparing' },
          { key: 'ready', label: 'Ready' },
        ];
        return (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#061009]/80 p-3 backdrop-blur-sm sm:p-6"
            onClick={(e) => {
              e.stopPropagation();
              closeReceiptAndDrawer();
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Order receipt printer"
          >
            <div
              className="flex h-[min(94dvh,900px)] w-full max-w-[520px] flex-col overflow-hidden rounded-3xl border border-[#DFB96F]/30 bg-[#FAF6EC] shadow-[0_32px_90px_-12px_rgba(0,0,0,0.75)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-[#DFB96F]/20 bg-[#08130B] px-5 py-3 text-[#FAF6EC]">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#DFB96F]/15 text-[#DFB96F] ring-1 ring-[#DFB96F]/35">
                    <Printer className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#DFB96F]">
                      {liveOrder.orderType} Ticket · #
                      {String(liveOrder.orderNumber).padStart(4, '0')}
                    </p>
                    <h4 className="font-serif text-lg font-semibold leading-tight">
                      PIYO Order Receipt
                    </h4>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeReceiptAndDrawer}
                  className="rounded-full p-1.5 text-[#FAF6EC]/80 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close receipt printer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Live Kitchen Status Strip */}
              <div className="shrink-0 border-b border-[#DFB96F]/20 bg-[#0D1C11] px-4 py-2.5 text-[#FAF6EC]">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        currentStatus === 'cancelled'
                          ? 'bg-red-400'
                          : currentStatus === 'ready' || currentStatus === 'completed'
                          ? 'bg-emerald-400'
                          : 'animate-pulse bg-[#DFB96F]'
                      }`}
                    />
                    <span className="text-xs font-bold text-[#FAF6EC]">
                      {statusInfo.customerLabel}
                    </span>
                  </div>
                  <a
                    href="#kitchen"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-[#DFB96F]/30 bg-[#DFB96F]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#DFB96F] transition hover:bg-[#DFB96F]/20"
                    title="Open PIYO Kitchen Tablet view in a new tab"
                  >
                    <ChefHat className="h-3 w-3" />
                    <span>{IS_CLOUD_API_ENABLED ? 'Live Sync' : 'Kitchen View'}</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </div>
                <p className="mt-0.5 text-[11px] text-[#B7C7BD]">
                  {statusInfo.customerHint}
                </p>
                {currentStatus !== 'cancelled' && (
                  <div className="mt-2 grid grid-cols-4 gap-1.5">
                    {steps.map((step, i) => {
                      const reached = statusInfo.stepIndex >= i;
                      return (
                        <div key={step.key} className="space-y-1">
                          <div
                            className={`h-1 rounded-full transition-colors ${
                              reached ? 'bg-[#DFB96F]' : 'bg-white/15'
                            }`}
                          />
                          <p
                            className={`text-[9px] font-bold uppercase tracking-wider ${
                              reached ? 'text-[#DFB96F]' : 'text-[#809487]'
                            }`}
                          >
                            {step.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Live Thermal Receipt Printer Stage */}
              <div className="relative min-h-0 flex-1">
                <ReceiptPrinter
                  key={liveOrder.id}
                  embedded
                  autoPrint
                  orderNumber={liveOrder.orderNumber}
                  store="PIYO Grill & Restaurant"
                  address="Km. 64, Tagaytay–Nasugbu Hwy, Cavite"
                  items={liveOrder.items}
                  currency="₱"
                  taxRate={0}
                  orderType={liveOrder.orderType}
                  customer={liveOrder.customer}
                  notes={liveOrder.notes}
                  makerMark="PIYO"
                  footerNote="SALAMAT PO · PIYO"
                  unitFormula="min((min(92vw, 520px) - 32px) / 440, (min(94dvh, 900px) - 224px) / 930)"
                />
              </div>

              {/* Bottom Confirmation Actions */}
              <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-[#DFB96F]/20 bg-[#08130B] px-4 py-3 text-[#FAF6EC]">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3.5 py-2 text-xs font-semibold text-[#FAF6EC] transition hover:bg-white/15"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#DFB96F]" />
                      <span>Slip Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#DFB96F]" />
                      <span>Copy Slip</span>
                    </>
                  )}
                </button>

                <a
                  href={smsHref}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#DFB96F] px-3.5 py-2 text-xs font-bold text-[#08130B] transition hover:bg-[#E7C88B]"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Send Order via SMS</span>
                </a>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
