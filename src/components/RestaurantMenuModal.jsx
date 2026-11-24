import React, { useEffect, useMemo, useState } from 'react';
import { X, Plus, Minus, ShoppingBag, SlidersHorizontal, Sparkles } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, RESTAURANT_INFO } from '../data/menuData';
import { formatPeso } from '../utils/hours';

// Subtle faint culinary doodle pattern matching classic printed restaurant menu boards
const MENU_SKETCH_BG = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180' fill='none' stroke='#DFB96F' stroke-width='1.1' stroke-opacity='0.085'><circle cx='42' cy='42' r='20'/><path d='M42 22v40M22 42h40M28 28l28 28M56 28L28 56'/><path d='M122 30c18-10 34 2 28 22-8 14-26 14-34 2 2-10 2-18 6-24z'/><path d='M28 134c8-18 28-24 44-10-8 16-26 24-44 10z'/><path d='M116 116l32 32M148 116l-32 32' stroke-linecap='round'/><circle cx='132' cy='132' r='22' stroke-dasharray='4 4'/></svg>`
)}")`;

export function RestaurantMenuModal({
  isOpen,
  onClose,
  trayItems = [],
  onQuickAdd,
  onUpdateTrayQty,
  onCustomizeDish,
  onOpenTray,
}) {
  const [selectedCat, setSelectedCat] = useState('all');

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  const trayStatsByDishId = useMemo(() => {
    const map = {};
    for (const entry of trayItems) {
      const id = entry.dish.id;
      if (!map[id]) {
        map[id] = { totalQty: 0, latestEntry: entry };
      }
      map[id].totalQty += entry.quantity;
      map[id].latestEntry = entry;
    }
    return map;
  }, [trayItems]);

  const visibleItems = useMemo(() => {
    if (selectedCat === 'all') return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === selectedCat);
  }, [selectedCat]);

  const trayCount = trayItems.reduce((sum, entry) => sum + entry.quantity, 0);
  const trayTotal = trayItems.reduce(
    (sum, entry) => sum + entry.unitPrice * entry.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030C07]/82 p-3 backdrop-blur-md sm:p-5"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-label="PIYO Grill & Restaurant Full Menu Board"
    >
      {/* Tall Rectangular Physical-Style Printed Menu Sheet */}
      <div
        className="relative flex max-h-[92vh] w-full max-w-[920px] flex-col overflow-hidden rounded-[22px] border-2 border-[#DFB96F]/55 bg-[#081A10] text-[#FAF6EC] shadow-[0_36px_90px_-16px_rgba(0,0,0,0.88)]"
        style={{
          backgroundImage: MENU_SKETCH_BG,
          backgroundSize: '180px 180px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Inner Double Gold Hairline Print Frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2.5 rounded-[14px] border border-[#DFB96F]/22"
        />

        {/* Top Decorative Header & Controls */}
        <div className="relative z-10 shrink-0 border-b border-[#DFB96F]/20 bg-[#06150D]/90 px-5 pb-4 pt-5 backdrop-blur-sm sm:px-8 sm:pt-6">
          {/* Top-Left / Top-Right Utility Controls */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DFB96F]/30 bg-[#0C2618] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#DFB96F]">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              {RESTAURANT_INFO.established} · Tagaytay City
            </span>

            <div className="flex items-center gap-2">
              {trayCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenTray) onOpenTray();
                  }}
                  className="inline-flex min-h-[34px] items-center gap-2 rounded-full bg-[#DFB96F] px-3.5 py-1 text-xs font-bold text-[#06180E] shadow-sm transition hover:bg-[#E7C88B]"
                >
                  <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>
                    {trayCount} · {formatPeso(trayTotal)}
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                aria-label="Close restaurant menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DFB96F]/30 bg-[#0C2618] text-[#FAF6EC] transition hover:border-[#DFB96F] hover:bg-[#DFB96F] hover:text-[#06180E]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Centered Classic Printed "Restaurant MENU" Emblem */}
          <div className="mt-2 text-center">
            <p className="font-serif text-2xl italic font-medium tracking-wide text-[#FAF6EC] sm:text-3xl">
              Piyo Restaurant
            </p>
            <div className="mt-0.5 flex items-center justify-center gap-3">
              {/* Left Ornamental Brush Flourish */}
              <svg
                viewBox="0 0 42 26"
                className="h-5 w-8 text-[#FAF6EC] sm:h-6 sm:w-10"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M38 7C26 5 14 2 4 3c9 4 20 6 34 8zM39 14c-11 0-22 2-32 7 11-1 22-3 32-3z" />
              </svg>
              <h2 className="font-serif text-4xl font-extrabold uppercase tracking-[0.12em] text-[#E6AE43] drop-shadow-[0_2px_10px_rgba(230,174,67,0.28)] sm:text-5xl">
                MENU
              </h2>
              {/* Right Ornamental Brush Flourish */}
              <svg
                viewBox="0 0 42 26"
                className="h-5 w-8 -scale-x-100 text-[#FAF6EC] sm:h-6 sm:w-10"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M38 7C26 5 14 2 4 3c9 4 20 6 34 8zM39 14c-11 0-22 2-32 7 11-1 22-3 32-3z" />
              </svg>
            </div>
          </div>

          {/* Category Filter Strip inside the Printed Menu */}
          <div className="mt-4 flex items-center justify-start gap-1.5 overflow-x-auto no-scrollbar pb-0.5 sm:justify-center">
            {MENU_CATEGORIES.map((cat) => {
              const active = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCat(cat.id)}
                  className={`min-h-[32px] shrink-0 rounded-full px-3.5 py-1 text-[11px] font-bold tracking-wide transition ${
                    active
                      ? 'bg-[#E6AE43] text-[#06180E] shadow-xs'
                      : 'border border-[#DFB96F]/25 bg-[#0C2618]/80 text-[#D0DDD5] hover:border-[#DFB96F]/60 hover:text-[#FAF6EC]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Rectangular Menu Grid (Oval Food Medallion + Tall Vertical Gold-Bordered Card) */}
        <div className="relative z-10 flex-1 overflow-y-auto px-5 py-7 sm:px-8 sm:py-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((dish) => {
              const stats = trayStatsByDishId[dish.id] || {
                totalQty: 0,
                latestEntry: null,
              };
              return (
                <article
                  key={dish.id}
                  className="group relative flex flex-col items-center pt-16"
                >
                  {/* Top Overlapping Oval Gold-Ring Dish Photo Medallion */}
                  <button
                    type="button"
                    onClick={() => {
                      if (onCustomizeDish) onCustomizeDish(dish);
                      onClose();
                    }}
                    aria-label={`Customize ${dish.name}`}
                    className="relative z-20 -mb-16 h-34 w-32 overflow-hidden rounded-[999px] bg-gradient-to-b from-[#E58A28] via-[#E6AE43] to-[#C8882B] p-[6px] shadow-[0_14px_28px_-8px_rgba(0,0,0,0.75)] transition-transform duration-300 group-hover:-translate-y-1"
                  >
                    <div className="h-full w-full overflow-hidden rounded-[999px] bg-[#06180E]">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </button>

                  {/* Tall Vertical Rectangular Gold-Outlined Menu Card */}
                  <div className="relative z-10 flex w-full flex-1 flex-col justify-between rounded-[18px] border-[1.75px] border-[#E6AE43]/80 bg-[#07180F]/92 px-4 pb-4 pt-20 text-center shadow-[0_16px_36px_-18px_rgba(0,0,0,0.8)] transition-colors group-hover:border-[#F0C76A]">
                    <div>
                      <h3 className="font-sans text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#E6AE43]">
                        {dish.name}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-[11.5px] leading-relaxed text-[#CBD8CF]">
                        {dish.shortDesc}
                      </p>
                    </div>

                    <div className="mt-4">
                      <p className="font-sans text-lg font-extrabold tracking-wide text-[#E6AE43]">
                        {formatPeso(dish.price)}
                      </p>

                      {/* Inline Customize + Add Controls */}
                      <div className="mt-3 flex items-center justify-center gap-2 border-t border-[#DFB96F]/15 pt-3">
                        <button
                          type="button"
                          onClick={() => {
                            if (onCustomizeDish) onCustomizeDish(dish);
                            onClose();
                          }}
                          className="inline-flex min-h-[32px] items-center gap-1 rounded-full border border-[#DFB96F]/30 bg-[#0C2618] px-3 py-1 text-[11px] font-semibold text-[#FAF6EC] transition hover:border-[#E6AE43] hover:text-[#E6AE43]"
                        >
                          <SlidersHorizontal
                            className="h-3 w-3"
                            aria-hidden="true"
                          />
                          <span>Customize</span>
                        </button>

                        {stats.totalQty > 0 && stats.latestEntry ? (
                          <div className="inline-flex min-h-[32px] items-center gap-1.5 rounded-full bg-[#E6AE43] px-2 py-0.5 text-xs font-extrabold text-[#06180E]">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateTrayQty &&
                                onUpdateTrayQty(
                                  stats.latestEntry.key,
                                  stats.latestEntry.quantity - 1
                                )
                              }
                              aria-label={`Remove one ${dish.name}`}
                              className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-[#06180E]/15"
                            >
                              <Minus className="h-3 w-3" aria-hidden="true" />
                            </button>
                            <span className="min-w-[14px] text-center">
                              {stats.totalQty}
                            </span>
                            <button
                              type="button"
                              onClick={() => onQuickAdd && onQuickAdd(dish)}
                              aria-label={`Add one more ${dish.name}`}
                              className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-[#06180E]/15"
                            >
                              <Plus className="h-3 w-3" aria-hidden="true" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onQuickAdd && onQuickAdd(dish)}
                            className="inline-flex min-h-[32px] items-center gap-1 rounded-full bg-[#E6AE43] px-3.5 py-1 text-[11px] font-extrabold text-[#06180E] transition hover:bg-[#F2C361] active:scale-95"
                          >
                            <Plus
                              className="h-3.5 w-3.5 stroke-[2.5]"
                              aria-hidden="true"
                            />
                            <span>Add</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom Printed Menu Footer Strip */}
        <div className="relative z-10 flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-[#DFB96F]/20 bg-[#06150D]/95 px-5 py-3 text-[11px] text-[#A9BEB0] sm:px-8">
          <span>
            {RESTAURANT_INFO.shortAddress} · Free Bacolod Cansi Soup Refills
          </span>
          <span className="font-semibold text-[#E6AE43]">
            Showing {visibleItems.length} of {MENU_ITEMS.length} dishes
          </span>
        </div>
      </div>
    </div>
  );
}
