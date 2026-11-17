import React, { useState } from 'react';
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
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { formatPeso } from '../utils/hours';

export function OrderTrayDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClear,
}) {
  const [orderType, setOrderType] = useState('Dine-In');
  const [guestName, setGuestName] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, entry) => sum + entry.unitPrice * entry.quantity, 0);

  const buildSummaryText = () => {
    const lines = [
      `PIYO Grill & Restaurant — ${orderType} Order`,
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
      className="fixed inset-0 z-50 flex justify-end bg-[#0C2618]/65 backdrop-blur-xs"
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
        <div className="flex items-center justify-between border-b border-[#143D28]/15 bg-[#143D28] px-5 py-4 text-[#FAF6EC]">
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
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#E5EDE7] text-[#143D28]">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <p className="font-serif text-2xl font-semibold text-[#143D28]">
                Your tray is empty
              </p>
              <p className="mt-1 max-w-xs text-sm text-[#4B5E50]">
                Browse the menu and tap <strong>+ Add</strong> on Bacolod Cansi, Chicken Inasal, or your Tagaytay favorites.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-5 rounded-full bg-[#143D28] px-5 py-2.5 text-xs font-bold text-[#FAF6EC]"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Order Mode Toggle */}
              <div className="grid grid-cols-3 gap-1.5 rounded-2xl bg-[#E8DEC8]/70 p-1">
                {['Dine-In', 'Takeout', 'Pickup'].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setOrderType(mode)}
                    className={`rounded-xl py-2 text-xs font-bold transition ${
                      orderType === mode
                        ? 'bg-[#143D28] text-[#FAF6EC] shadow-xs'
                        : 'text-[#394A3E] hover:text-[#143D28]'
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
                    className="flex gap-3 rounded-2xl border border-[#143D28]/12 bg-white/80 p-3"
                  >
                    <img
                      src={entry.dish.image}
                      alt={entry.dish.name}
                      className="h-16 w-16 shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-[#143D28]">
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
                        <div className="inline-flex items-center rounded-full border border-[#143D28]/20 bg-[#FAF6EC] px-1 py-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(entry.key, entry.quantity - 1)}
                            className="rounded-full p-1 text-[#143D28] hover:bg-[#E5EDE7]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#143D28]">
                            {entry.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(entry.key, entry.quantity + 1)}
                            className="rounded-full p-1 text-[#143D28] hover:bg-[#E5EDE7]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-[#143D28]">
                          {formatPeso(entry.unitPrice * entry.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guest / Table Note */}
              <div className="space-y-2.5 rounded-2xl border border-[#143D28]/12 bg-white/75 p-3.5">
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Your Name or Table # (optional)"
                  className="w-full rounded-xl border border-[#143D28]/15 bg-[#FAF6EC] px-3 py-2 text-xs text-[#1D231E] placeholder-[#718275] focus:border-[#143D28] focus:outline-none"
                />
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Requests (e.g. 6–8 seater table, extra chili, pickup time)"
                  className="w-full rounded-xl border border-[#143D28]/15 bg-[#FAF6EC] px-3 py-2 text-xs text-[#1D231E] placeholder-[#718275] focus:border-[#143D28] focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={onClear}
                className="text-xs font-semibold text-[#5B6D5F] hover:text-red-700"
              >
                Clear all items
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="space-y-3 border-t border-[#143D28]/15 bg-[#FAF6EC] px-5 py-4 pb-safe">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5E50]">
                Estimated Subtotal
              </span>
              <span className="font-serif text-2xl font-bold text-[#143D28]">
                {formatPeso(subtotal)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#143D28]/25 bg-white px-4 py-2.5 text-xs font-bold text-[#143D28] transition hover:bg-[#E5EDE7]"
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
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#143D28] px-4 py-2.5 text-xs font-bold text-[#FAF6EC] transition hover:bg-[#1B4E33]"
              >
                <MessageSquare className="h-4 w-4 text-[#D8B36A]" />
                <span>Send via SMS</span>
              </a>
            </div>

            <a
              href={`tel:${RESTAURANT_INFO.mobileTel}`}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D8B36A] px-4 py-2.5 text-xs font-bold text-[#0C2618] transition hover:bg-[#E5C685]"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Call {RESTAURANT_INFO.mobile} to Confirm</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
