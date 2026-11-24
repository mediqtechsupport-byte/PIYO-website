import React, { useMemo, useState } from 'react';
import { Plus, Minus, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, RESTAURANT_INFO } from '../data/menuData';
import { formatPeso } from '../utils/hours';

// Authentic Filipino Solihiya (octagonal rattan cane weave) pattern in warm beige on deep forest green
const SOLIHIYA_BG = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64' fill='none' stroke='#EDE2CB' stroke-width='0.85' stroke-opacity='0.09'><path d='M0 16L64 16M0 48L64 48M16 0L16 64M48 0L48 64'/><path d='M0 0L64 64M64 0L0 64' stroke-opacity='0.06'/><polygon points='24,16 40,16 48,24 48,40 40,48 24,48 16,40 16,24' stroke-opacity='0.14'/></svg>`
)}")`;

// Delicate Filipino Banig diamond woven border divider
const BANIG_STRIP_BG = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='10' viewBox='0 0 24 10' fill='none'><path d='M0 5L6 1L12 5L6 9Z M12 5L18 1L24 5L18 9Z' stroke='#0B2718' stroke-opacity='0.24' stroke-width='0.9'/><circle cx='6' cy='5' r='1.1' fill='#8A673D' fill-opacity='0.5'/><circle cx='18' cy='5' r='1.1' fill='#8A673D' fill-opacity='0.5'/></svg>`
)}")`;

const CATEGORY_ARC_FALLBACK = {
  soups: 'LUTONG NEGROS',
  grill: 'CHARCOAL SINUGBA',
  'pasta-pizza': 'PASTA & 10" PIZZA',
  appetizers: 'PULUTAN & SHARE',
  drinks: 'TROPICAL COOLER',
  coffee: 'FRESHLY BREWED',
  sides: 'HAPAG PAIRING',
};

function PalmFrondSvg({ className }) {
  return (
    <svg
      viewBox="0 0 220 150"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M214 6C166 28 118 60 64 114"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.34"
      />
      <path
        d="M204 12C176 4 148 5 120 16C150 20 176 22 204 12Z"
        fill="currentColor"
        opacity="0.16"
      />
      <path
        d="M188 22C154 14 118 20 86 38C122 39 156 36 188 22Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M168 38C130 34 94 46 60 72C99 68 134 58 168 38Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M144 58C108 60 74 78 44 108C82 99 116 84 144 58Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M196 22C206 54 202 86 184 116C180 86 182 54 196 22Z"
        fill="currentColor"
        opacity="0.16"
      />
      <path
        d="M174 40C178 74 166 108 140 136C144 104 154 72 174 40Z"
        fill="currentColor"
        opacity="0.19"
      />
      <path
        d="M148 62C146 94 130 122 104 144C112 115 126 88 148 62Z"
        fill="currentColor"
        opacity="0.14"
      />
    </svg>
  );
}

export function RestaurantMenuBoard({
  trayItems = [],
  onQuickAdd,
  onUpdateTrayQty,
  onCustomizeDish,
  onOpenTray,
}) {
  const [selectedCat, setSelectedCat] = useState('all');

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

  return (
    <div className="flex min-h-[calc(100svh-var(--nav-h,69px))] w-full flex-col bg-[#0A2215] text-[#0B2718]">
      {/* Full-Bleed Warm Sunlit Beige Editorial Header with Tropical Palm Frond Shadows */}
      <div className="relative z-10 shrink-0 overflow-hidden bg-gradient-to-b from-[#F7F2E6] via-[#F5EFE2] to-[#ECE2CC] px-3 pb-4 pt-4 sm:px-5 lg:px-6 lg:pb-5 lg:pt-5">
        {/* Corner Tropical Palm Frond Silhouettes */}
        <PalmFrondSvg className="pointer-events-none absolute -right-4 -top-3 h-36 w-52 text-[#0B2718] sm:h-44 sm:w-64" />
        <PalmFrondSvg className="pointer-events-none absolute -left-8 -top-2 h-32 w-48 -scale-x-100 text-[#0B2718] opacity-75 sm:h-40 sm:w-60" />

        <div className="relative z-10 mx-auto w-full max-w-[1880px]">
          {/* Top-Left / Top-Right Utility Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0B2718]/20 bg-[#FAF6EC]/85 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B2718]">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rotate-45 bg-[#8A673D]"
              />
              {RESTAURANT_INFO.established} · Tagaytay City
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenTray}
                className="inline-flex min-h-[36px] items-center gap-2 rounded-full bg-[#0B2718] px-4 py-1.5 text-xs font-bold text-[#F5EFE2] shadow-sm transition hover:bg-[#143D28]"
              >
                <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                <span>
                  {trayCount > 0 ? `${trayCount} · ${formatPeso(trayTotal)}` : 'Cart'}
                </span>
              </button>
            </div>
          </div>

          {/* Centered Filipino Heritage Script Title & Poetic Manifesto */}
          <div className="mt-1 text-center">
            <p className="font-script text-[42px] leading-[1.05] text-[#7E5A30] sm:text-[54px]">
              Hapag ng PIYO
            </p>
            <div className="mt-0.5 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#0B2718]/45 sm:w-16"
              />
              <h2 className="font-serif text-lg font-bold uppercase tracking-[0.28em] text-[#0B2718] sm:text-2xl">
                Filipino Menu
              </h2>
              <span
                aria-hidden="true"
                className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#0B2718]/45 sm:w-16"
              />
            </div>
            <p className="mx-auto mt-1.5 max-w-xl text-xs leading-relaxed text-[#384D40] sm:text-[13px]">
              Hindi lamang pagkain — kundi hapag para sa kwento, lutong Negros, at init ng pamilya.
            </p>
          </div>

          {/* Category Filter Pills (Dark Forest Green & Warm Parchment) */}
          <div
            className="mt-4 flex items-center justify-start gap-2 overflow-x-auto no-scrollbar pb-0.5 sm:justify-center"
            role="tablist"
            aria-label="Filipino menu categories"
          >
            {MENU_CATEGORIES.map((cat) => {
              const active = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`min-h-[34px] shrink-0 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide transition ${
                    active
                      ? 'bg-[#0B2718] text-[#F5EFE2] shadow-sm'
                      : 'border border-[#0B2718]/20 bg-[#FAF6EC]/85 text-[#1B3A29] hover:border-[#0B2718]/50 hover:bg-[#E6DAC2]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full-Bleed Woven Filipino Banig Border Strip */}
      <div
        aria-hidden="true"
        className="h-[12px] w-full shrink-0 border-y border-[#0B2718]/25 bg-[#E6D9BE]"
        style={{
          backgroundImage: BANIG_STRIP_BG,
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'center',
        }}
      />

      {/* Full-Bleed Deep Forest Green Solihiya-Woven Whole-Page Menu Grid */}
      <div
        className="relative z-10 flex-1 bg-[#0A2215] px-3 py-6 sm:px-5 lg:px-6 lg:py-7"
        style={{
          backgroundImage: SOLIHIYA_BG,
          backgroundSize: '64px 64px',
        }}
      >
        <div className="mx-auto grid w-full max-w-[1880px] grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-5 xl:gap-y-6">
          {visibleItems.map((dish) => {
            const stats = trayStatsByDishId[dish.id] || {
              totalQty: 0,
              latestEntry: null,
            };
            const arcText = (
              dish.badge ||
              CATEGORY_ARC_FALLBACK[dish.category] ||
              'LUTONG BAHAY'
            ).toUpperCase();
            const arcPathId = `piyo-arc-${dish.id}`;

            return (
              <article
                key={dish.id}
                className="group relative flex flex-col items-center pt-[58px]"
              >
                {/* Overlapping Ceramic-Rimmed Dish Medallion + Curved Heritage Arc Caption */}
                <button
                  type="button"
                  onClick={() => onCustomizeDish && onCustomizeDish(dish)}
                  aria-label={`Customize ${dish.name}`}
                  className="relative z-20 -mb-[68px] flex h-[136px] w-[136px] items-center justify-center transition-transform duration-300 group-hover:-translate-y-1"
                >
                  {/* Ceramic Stoneware Warm Beige Plate Rim */}
                  <span className="block h-[124px] w-[124px] overflow-hidden rounded-full bg-[#F5EFE2] p-[4.5px] shadow-[0_14px_28px_-8px_rgba(4,16,9,0.75)] ring-2 ring-[#DFD0B2]">
                    <span className="block h-full w-full overflow-hidden rounded-full ring-1 ring-[#0B2718]/25">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </span>
                  </span>

                  {/* Curved Dish Caption Hugging the Bottom Rim of the Ceramic Plate */}
                  <svg
                    viewBox="0 0 184 184"
                    className="pointer-events-none absolute -inset-4 h-[168px] w-[168px]"
                    aria-hidden="true"
                  >
                    <defs>
                      <path
                        id={arcPathId}
                        d="M 10,92 A 82,82 0 0,0 174,92"
                        fill="none"
                      />
                    </defs>
                    <text
                      fill="#173D28"
                      fontSize="8.4"
                      fontWeight="700"
                      letterSpacing="2"
                    >
                      <textPath
                        href={`#${arcPathId}`}
                        startOffset="50%"
                        textAnchor="middle"
                      >
                        · {arcText} ·
                      </textPath>
                    </text>
                  </svg>
                </button>

                {/* Tall Vertical Rectangular Warm Beige Heritage Menu Card */}
                <div className="relative z-10 flex w-full flex-1 flex-col justify-between rounded-[16px] border border-[#DFD0B2] bg-[#F5EFE2] px-3.5 pb-3.5 pt-[84px] text-center shadow-[0_16px_34px_-16px_rgba(0,0,0,0.72)] transition-colors group-hover:border-[#FAF6EC] group-hover:bg-[#F8F3E8]">
                  {/* Inner Fine Dark-Green Heritage Frame */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-2 rounded-[12px] border border-[#0B2718]/16"
                  />
                  {/* Tiny Woven Corner Diamonds */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-3 left-3 h-1.5 w-1.5 rotate-45 bg-[#0B2718]/25"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-3 right-3 h-1.5 w-1.5 rotate-45 bg-[#0B2718]/25"
                  />

                  <div className="relative z-10">
                    <h3 className="font-serif text-[20px] font-bold leading-snug tracking-tight text-[#0B2718]">
                      {dish.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-3 text-[11.5px] leading-relaxed text-[#3E5346]">
                      {dish.shortDesc}
                    </p>
                  </div>

                  <div className="relative z-10 mt-3.5">
                    <div className="flex items-baseline justify-center gap-2">
                      <p className="font-sans text-lg font-extrabold tracking-tight text-[#0B2718]">
                        {formatPeso(dish.price)}
                      </p>
                      {dish.serving && (
                        <span className="text-[10.5px] font-medium text-[#755C3B]">
                          · {dish.serving}
                        </span>
                      )}
                    </div>

                    {/* Inline Customize + Add Controls (Dark Green on Warm Beige) */}
                    <div className="mt-3 flex items-center justify-center gap-2 border-t border-[#0B2718]/14 pt-3">
                      <button
                        type="button"
                        onClick={() => onCustomizeDish && onCustomizeDish(dish)}
                        className="inline-flex min-h-[32px] items-center gap-1 rounded-full border border-[#0B2718]/28 bg-[#EAE0CA] px-3 py-1 text-[11px] font-semibold text-[#0B2718] transition hover:border-[#0B2718] hover:bg-[#DFD2B6]"
                      >
                        <SlidersHorizontal
                          className="h-3 w-3"
                          aria-hidden="true"
                        />
                        <span>Customize</span>
                      </button>

                      {stats.totalQty > 0 && stats.latestEntry ? (
                        <div className="inline-flex min-h-[32px] items-center gap-1.5 rounded-full bg-[#0B2718] px-2 py-0.5 text-xs font-extrabold text-[#F5EFE2]">
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
                            className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-[#F5EFE2]/15"
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
                            className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-[#F5EFE2]/15"
                          >
                            <Plus className="h-3 w-3" aria-hidden="true" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onQuickAdd && onQuickAdd(dish)}
                          className="inline-flex min-h-[32px] items-center gap-1 rounded-full bg-[#0B2718] px-3.5 py-1 text-[11px] font-bold text-[#F5EFE2] transition hover:bg-[#16402A] active:scale-95"
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

      {/* Full-Bleed Bottom Warm Beige Filipino Heritage Footer Strip */}
      <div className="relative z-10 shrink-0 border-t border-[#0B2718]/20 bg-[#ECE2CC] px-3 py-3 text-xs text-[#2F4537] sm:px-5 lg:px-6">
        <div className="mx-auto flex w-full max-w-[1880px] flex-wrap items-center justify-between gap-2">
          <span>
            {RESTAURANT_INFO.shortAddress} · Libreng Sabaw Refill sa Bacolod Cansi
          </span>
          <span className="font-bold text-[#0B2718]">
            Showing {visibleItems.length} of {MENU_ITEMS.length} dishes
          </span>
        </div>
      </div>
    </div>
  );
}
