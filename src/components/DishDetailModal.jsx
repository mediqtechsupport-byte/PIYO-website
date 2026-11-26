import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Minus, Clock, Flame, Users, Check, ShoppingBag } from 'lucide-react';
import { formatPeso } from '../utils/hours';

export function DishDetailModal({ dish, onClose, onAddToTray }) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedAddonIds, setSelectedAddonIds] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedVariantIdx(0);
    setSelectedAddonIds([]);
    setQuantity(1);
  }, [dish?.id]);

  useEffect(() => {
    if (!dish) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dish, onClose]);

  if (!dish) return null;

  const variants = dish.variants?.length ? dish.variants : [{ label: 'Standard', priceDelta: 0 }];
  const activeVariant = variants[selectedVariantIdx] || variants[0];
  const addons = dish.addons || [];

  const addonsTotal = addons
    .filter((a) => selectedAddonIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  const unitPrice = Math.max(0, dish.price + (activeVariant.priceDelta || 0) + addonsTotal);
  const totalPrice = unitPrice * quantity;

  const toggleAddon = (id) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    const chosenAddons = addons.filter((a) => selectedAddonIds.includes(a.id));
    onAddToTray({
      dish,
      variantLabel: activeVariant.label,
      addons: chosenAddons,
      unitPrice,
      quantity,
    });
    onClose();
  };

  return createPortal(
    <div
      className="piyo-backdrop-in fixed inset-0 z-[54] flex items-end justify-center bg-[#08130B]/70 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${dish.name} details`}
    >
      <div
        className="piyo-sheet-in relative flex max-h-[calc(var(--dvh-full,100vh)*0.9)] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-[#FAF6EC] text-[#1D231E] shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Photo */}
        <div className="relative h-52 shrink-0 bg-[#0D1C11] sm:h-60">
          <img
            src={dish.image}
            alt={dish.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08130B]/80 via-transparent to-black/25" />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-3.5 top-3.5 flex h-11 w-11 items-center justify-center rounded-full bg-[#08130B]/80 text-[#FAF6EC] backdrop-blur-md transition hover:bg-[#0D1C11] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B36A]"
            aria-label="Close dish details"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-3">
            <div>
              {dish.badge && (
                <span className="mb-1.5 inline-block rounded-full bg-[#D8B36A] px-2.5 py-0.5 text-[11px] font-bold text-[#08130B]">
                  {dish.badge}
                </span>
              )}
              <h3 className="font-serif text-2xl font-semibold leading-tight text-[#FAF6EC] sm:text-3xl">
                {dish.name}
              </h3>
            </div>
            <span className="shrink-0 rounded-full bg-[#0D1C11]/95 px-3 py-1 text-base font-bold text-[#D8B36A] ring-1 ring-[#D8B36A]/40">
              {formatPeso(unitPrice)}
            </span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Quick Metadata Chips */}
          <div className="flex flex-wrap gap-2 text-xs text-[#182A1B]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5EDE7] px-3 py-1 font-medium">
              <Users className="h-3.5 w-3.5" />
              {dish.serving}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5EDE7] px-3 py-1 font-medium">
              <Clock className="h-3.5 w-3.5" />
              {dish.prepTime}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5EDE7] px-3 py-1 font-medium">
              <Flame className="h-3.5 w-3.5" />
              {dish.spiceLevel}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-[#344037]">
            {dish.fullDesc}
          </p>

          {/* What's Inside Ingredients */}
          {dish.ingredients?.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#0D1C11]">
                What&apos;s Inside
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {dish.ingredients.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#0D1C11]/15 bg-white/80 px-2.5 py-1 text-xs font-medium text-[#182A1B]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Variant Selector */}
          {variants.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#0D1C11]">
                Choose Option
              </h4>
              <div className="space-y-2">
                {variants.map((v, idx) => {
                  const active = idx === selectedVariantIdx;
                  const priceForOption = dish.price + (v.priceDelta || 0);
                  return (
                    <button
                      key={v.label}
                      type="button"
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-3.5 py-2.5 text-left text-sm transition ${
                        active
                          ? 'border-[#0D1C11] bg-[#0D1C11]/8 font-semibold text-[#0D1C11]'
                          : 'border-[#0D1C11]/15 bg-white/70 text-[#344037] hover:border-[#0D1C11]/40'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                            active
                              ? 'border-[#0D1C11] bg-[#0D1C11]'
                              : 'border-[#8CA091]'
                          }`}
                        >
                          {active && <span className="h-1.5 w-1.5 rounded-full bg-[#FAF6EC]" />}
                        </span>
                        {v.label}
                      </span>
                      <span className="text-xs font-bold text-[#0D1C11]">
                        {formatPeso(priceForOption)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Optional Add-ons */}
          {addons.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#0D1C11]">
                Optional Sides &amp; Extras
              </h4>
              <div className="space-y-2">
                {addons.map((addon) => {
                  const checked = selectedAddonIds.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-3.5 py-2.5 text-left text-sm transition ${
                        checked
                          ? 'border-[#0D1C11] bg-[#E5EDE7]/70 font-semibold text-[#0D1C11]'
                          : 'border-[#0D1C11]/15 bg-white/70 text-[#344037] hover:border-[#0D1C11]/40'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded border ${
                            checked
                              ? 'border-[#0D1C11] bg-[#0D1C11] text-[#FAF6EC]'
                              : 'border-[#8CA091] bg-white'
                          }`}
                        >
                          {checked && <Check className="h-3 w-3" />}
                        </span>
                        {addon.label}
                      </span>
                      <span className="text-xs font-semibold text-[#182A1B]">
                        {addon.price > 0 ? `+${formatPeso(addon.price)}` : 'Free'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Footer Bar */}
        <div className="flex items-center gap-3 border-t border-[#0D1C11]/15 bg-[#FAF6EC] px-5 py-3.5 pb-safe">
          <div className="flex items-center rounded-full border border-[#0D1C11]/25 bg-white p-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#0D1C11] transition hover:bg-[#E5EDE7]"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-[#0D1C11]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#0D1C11] transition hover:bg-[#E5EDE7]"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0D1C11] px-5 py-3 text-sm font-bold text-[#FAF6EC] shadow-md transition hover:bg-[#152517] active:scale-[0.99]"
          >
            <ShoppingBag className="h-4 w-4 text-[#D8B36A]" />
            <span>Add to Tray · {formatPeso(totalPrice)}</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
