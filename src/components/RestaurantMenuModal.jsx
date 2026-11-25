import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  ShoppingBag,
  SlidersHorizontal,
} from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, RESTAURANT_INFO } from '../data/menuData';
import { formatPeso } from '../utils/hours';
import { SushiConveyorMenu } from './ui/sushi-conveyor-menu';

// Authentic Filipino Solihiya (octagonal rattan cane weave) pattern in warm beige on deep forest green
const SOLIHIYA_BG = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64' fill='none' stroke='#EDE2CB' stroke-width='0.85' stroke-opacity='0.09'><path d='M0 16L64 16M0 48L64 48M16 0L16 64M48 0L48 64'/><path d='M0 0L64 64M64 0L0 64' stroke-opacity='0.06'/><polygon points='24,16 40,16 48,24 48,40 40,48 24,48 16,40 16,24' stroke-opacity='0.14'/></svg>`
)}")`;

// Delicate Filipino Banig diamond woven border divider
const BANIG_STRIP_BG = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='10' viewBox='0 0 24 10' fill='none'><path d='M0 5L6 1L12 5L6 9Z M12 5L18 1L24 5L18 9Z' stroke='#0D1C11' stroke-opacity='0.24' stroke-width='0.9'/><circle cx='6' cy='5' r='1.1' fill='#8A673D' fill-opacity='0.5'/><circle cx='18' cy='5' r='1.1' fill='#8A673D' fill-opacity='0.5'/></svg>`
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

const BESTSELLER_CONVEYOR_IDS = [
  { id: 'bacolod-cansi', tier: 4 },
  { id: 'tagaytay-bulalo', tier: 4 },
  { id: 'bacolod-chicken-inasal', tier: 2 },
  { id: 'crispy-pata', tier: 5 },
  { id: 'sizzling-bulalo-steak', tier: 5 },
  { id: 'sizzling-pork-sisig', tier: 3 },
  { id: 'pork-adobo-pizza', tier: 4 },
  { id: 'mango-dragon-swirl', tier: 1 },
];

const BESTSELLER_LEGEND = {
  1: '₱197',
  2: '₱366',
  3: '₱436',
  4: '₱666+',
  5: '₱953+',
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
  selectedCat = 'bestsellers',
  onSelectCat,
  trayItems = [],
  onQuickAdd,
  onUpdateTrayQty,
  onSelectDish,
  onCustomizeDish,
  onOpenTray,
}) {
  const lockedScrollRef = useRef(null);
  const catRailRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isLockedCategory = selectedCat !== 'bestsellers';

  const syncCatRailArrows = () => {
    const el = catRailRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  // Reset locked-category scroll container to top & keep active category pill scrolled into view
  useEffect(() => {
    if (!isLockedCategory) return;
    if (lockedScrollRef.current) {
      lockedScrollRef.current.scrollTop = 0;
    }
    const raf = window.requestAnimationFrame(() => {
      const rail = catRailRef.current;
      if (!rail) return;
      const activeTab = rail.querySelector('[aria-selected="true"]');
      if (activeTab && typeof activeTab.scrollIntoView === 'function') {
        activeTab.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
      syncCatRailArrows();
    });
    window.addEventListener('resize', syncCatRailArrows);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', syncCatRailArrows);
    };
  }, [selectedCat, isLockedCategory]);

  const scrollCatRailBy = (deltaPx) => {
    const el = catRailRef.current;
    if (!el) return;
    el.scrollBy({ left: deltaPx, behavior: 'smooth' });
  };

  const handleSelectCategory = (catId) => {
    if (onSelectCat) onSelectCat(catId);
  };

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

  const conveyorItems = useMemo(
    () =>
      BESTSELLER_CONVEYOR_IDS.map(({ id, tier }) => {
        const dish = MENU_ITEMS.find((item) => item.id === id);
        if (!dish) return null;
        return {
          id: dish.id,
          name: dish.name,
          description: dish.shortDesc,
          price: formatPeso(dish.price),
          tier,
          image: dish.image,
          details: [
            dish.badge,
            dish.serving,
            dish.prepTime ? `Prep ${dish.prepTime}` : null,
          ].filter(Boolean),
        };
      }).filter(Boolean),
    []
  );

  const visibleItems = useMemo(() => {
    if (selectedCat === 'bestsellers') return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === selectedCat);
  }, [selectedCat]);

  const activeCategoryMeta =
    MENU_CATEGORIES.find((c) => c.id === selectedCat) || MENU_CATEGORIES[0];

  const trayCount = trayItems.reduce((sum, entry) => sum + entry.quantity, 0);
  const trayTotal = trayItems.reduce(
    (sum, entry) => sum + entry.unitPrice * entry.quantity,
    0
  );

  const handleConveyorAdd = (conveyorItem) => {
    const realDish = MENU_ITEMS.find((item) => item.id === conveyorItem.id);
    if (realDish && onQuickAdd) onQuickAdd(realDish);
  };

  const handleConveyorCustomize = (conveyorItem) => {
    const realDish = MENU_ITEMS.find((item) => item.id === conveyorItem.id);
    if (realDish && onCustomizeDish) onCustomizeDish(realDish);
  };

  const renderDishCards = (items) => (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-x-6 gap-y-6 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 xl:grid-cols-4 xl:gap-y-7">
      {items.map((dish) => {
        const stats = trayStatsByDishId[dish.id] || {
          totalQty: 0,
          latestEntry: null,
        };
        const arcText = (
          dish.badge ||
          CATEGORY_ARC_FALLBACK[dish.category] ||
          'LUTONG BAHAY'
        ).toUpperCase();
        const arcPathId = `piyo-arc-locked-${dish.id}`;

        return (
          <article
            key={dish.id}
            className="group relative flex flex-col items-center pt-0"
          >
            {/* Overlapping Ceramic-Rimmed Dish Medallion + Curved Heritage Arc Caption */}
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined' && window.innerWidth < 768) {
                  if (onSelectDish) onSelectDish(dish);
                } else if (onCustomizeDish) {
                  onCustomizeDish(dish);
                }
              }}
              aria-label={`View ${dish.name}`}
              className="relative z-20 -mb-[74px] flex h-[148px] w-[148px] items-center justify-center transition-transform duration-300 group-hover:-translate-y-1"
            >
              <span className="block h-[132px] w-[132px] overflow-hidden rounded-full bg-[#F5EFE2] p-[5px] shadow-[0_14px_28px_-8px_rgba(5,13,7,0.75)] ring-2 ring-[#DFD0B2]">
                <span className="block h-full w-full overflow-hidden rounded-full ring-1 ring-[#0D1C11]/25">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </span>
              </span>

              <svg
                viewBox="0 0 192 192"
                className="pointer-events-none absolute -inset-4 h-[180px] w-[180px]"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id={arcPathId}
                    d="M 10,96 A 86,86 0 0,0 182,96"
                    fill="none"
                  />
                </defs>
                <text
                  fill="#182A1B"
                  fontSize="8.6"
                  fontWeight="700"
                  letterSpacing="2.1"
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
            <div className="relative z-10 flex w-full flex-1 flex-col justify-between rounded-[18px] border border-[#DFD0B2] bg-[#F5EFE2] px-4 pb-4 pt-[96px] text-center shadow-[0_18px_38px_-16px_rgba(0,0,0,0.72)] transition-colors group-hover:border-[#FAF6EC] group-hover:bg-[#F8F3E8]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-2 rounded-[12px] border border-[#0D1C11]/16"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 left-3 h-1.5 w-1.5 rotate-45 bg-[#0D1C11]/25"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 right-3 h-1.5 w-1.5 rotate-45 bg-[#0D1C11]/25"
              />

              <div className="relative z-10">
                <h3 className="font-serif text-[20px] font-bold leading-snug tracking-tight text-[#0D1C11]">
                  {dish.name}
                </h3>
                <p className="mt-1.5 line-clamp-3 text-[11.5px] leading-relaxed text-[#3E5346]">
                  {dish.shortDesc}
                </p>
              </div>

              <div className="relative z-10 mt-3.5 flex items-center justify-between gap-3 border-t border-[#0D1C11]/14 pt-3 md:block md:border-t-0 md:pt-0">
                <div className="min-w-0 text-left md:flex md:items-baseline md:justify-center md:gap-2 md:text-center">
                  <p className="font-sans text-lg font-extrabold leading-tight tracking-tight text-[#0D1C11]">
                    {formatPeso(dish.price)}
                  </p>
                  {dish.serving && (
                    <span className="mt-0.5 block truncate text-[10.5px] font-medium text-[#755C3B] md:mt-0 md:inline">
                      <span className="hidden md:inline">· </span>
                      {dish.serving}
                    </span>
                  )}
                </div>

                <div className="flex shrink-0 items-center justify-end gap-2 md:mt-3 md:justify-center md:border-t md:border-[#0D1C11]/14 md:pt-3">
                  <button
                    type="button"
                    onClick={() => onCustomizeDish && onCustomizeDish(dish)}
                    className="hidden min-h-[32px] items-center gap-1 rounded-full border border-[#0D1C11]/28 bg-[#EAE0CA] px-3 py-1 text-[11px] font-semibold text-[#0D1C11] transition hover:border-[#0D1C11] hover:bg-[#DFD2B6] md:inline-flex"
                  >
                    <SlidersHorizontal
                      className="h-3 w-3"
                      aria-hidden="true"
                    />
                    <span>Customize</span>
                  </button>

                  {stats.totalQty > 0 && stats.latestEntry ? (
                    <div className="inline-flex h-[34px] items-center gap-1.5 rounded-full bg-[#0D1C11] px-2.5 text-xs font-extrabold text-[#F5EFE2] md:h-auto md:min-h-[32px] md:px-2 md:py-0.5">
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
                      className="inline-flex h-[34px] items-center gap-1 whitespace-nowrap rounded-full bg-[#0D1C11] px-4 text-xs font-bold text-[#F5EFE2] transition hover:bg-[#182A1B] active:scale-95 md:h-auto md:min-h-[32px] md:px-3.5 md:py-1 md:text-[11px]"
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
  );

  return (
    <>
      {/* Inline Whole-Page Menu Landing ("Best Sellers" Highlight Conveyor — allows scrolling freely to other sections) */}
      <div className="flex min-h-[var(--stage-h)] w-full flex-col justify-between bg-[#0B190F] text-[#0D1C11]">
        {/* Full-Bleed Warm Sunlit Beige Editorial Title Banner with Tropical Palm Frond Shadows */}
        <div className="relative z-10 shrink-0 overflow-hidden bg-gradient-to-b from-[#F7F2E6] via-[#F5EFE2] to-[#F1E8D5] pb-2.5 pt-2.5 lg:pb-3 lg:pt-3">
          <PalmFrondSvg className="pointer-events-none absolute -right-4 -top-3 h-36 w-52 text-[#0D1C11] sm:h-40 sm:w-60" />
          <PalmFrondSvg className="pointer-events-none absolute -left-8 -top-2 h-32 w-48 -scale-x-100 text-[#0D1C11] opacity-75 sm:h-36 sm:w-52" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 text-center sm:px-8">
            <p className="font-script text-[38px] leading-[1.02] text-[#7E5A30] sm:text-[48px]">
              Hapag ng PIYO
            </p>
            <div className="mt-0.5 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#0D1C11]/45 sm:w-16"
              />
              <h2 className="font-serif text-lg font-bold uppercase tracking-[0.28em] text-[#0D1C11] sm:text-2xl">
                Filipino Menu
              </h2>
              <span
                aria-hidden="true"
                className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#0D1C11]/45 sm:w-16"
              />
            </div>
            <p className="mx-auto mt-1 max-w-xl text-xs leading-relaxed text-[#384D40] sm:text-[13px]">
              Hindi lamang pagkain — kundi hapag para sa kwento, lutong Negros, at init ng pamilya.
            </p>
          </div>
        </div>

        {/* Sticky Category Navigation + Cart Bar (Desktop/Tablet) + Woven Banig Strip */}
        <div className="sticky top-[var(--nav-h,64px)] z-30 w-full shrink-0 shadow-[0_12px_28px_-14px_rgba(5,13,7,0.68)]">
          <div className="hidden bg-[#EFE6D2]/96 py-2.5 backdrop-blur-md md:block">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
              <div
                className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-1.5 py-0.5"
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
                      onClick={() => handleSelectCategory(cat.id)}
                      className={`min-h-[34px] shrink-0 rounded-full px-3.5 py-1 text-xs font-bold tracking-wide transition ${
                        active
                          ? 'bg-[#0D1C11] text-[#F5EFE2] shadow-sm'
                          : 'border border-[#0D1C11]/20 bg-[#FAF6EC]/90 text-[#1A2D1D] hover:border-[#0D1C11]/50 hover:bg-[#E6DAC2]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={onOpenTray}
                className="inline-flex min-h-[34px] shrink-0 items-center gap-2 rounded-full bg-[#0D1C11] px-4 py-1.5 text-xs font-bold text-[#F5EFE2] shadow-sm transition hover:bg-[#162719]"
              >
                <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                <span>
                  {trayCount > 0 ? `${trayCount} · ${formatPeso(trayTotal)}` : 'Cart'}
                </span>
              </button>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="h-[9px] w-full border-y border-[#0D1C11]/25 bg-[#E6D9BE] sm:h-[11px]"
            style={{
              backgroundImage: BANIG_STRIP_BG,
              backgroundRepeat: 'repeat-x',
              backgroundPosition: 'center',
            }}
          />
        </div>

        {/* Full-Bleed Deep Forest Green Solihiya-Woven Best Sellers Conveyor Highlight */}
        <div
          className="relative z-10 flex flex-1 items-center bg-[#0B190F]"
          style={{
            backgroundImage: SOLIHIYA_BG,
            backgroundSize: '64px 64px',
          }}
        >
          <SushiConveyorMenu
            items={conveyorItems}
            legend={[]}
            eyebrow="House Highlights · Best Sellers"
            heading="PIYO Favorites, From Hearth to Table."
            caption="Hover or tap any plate to pause, flick to spin the belt, or select a dish to order or customize."
            autoplay={false}
            speed={28}
            onAdd={handleConveyorAdd}
            onCustomize={handleConveyorCustomize}
            labels={{
              add: 'Add to order',
              customize: 'Customize',
              close: 'Close',
              previous: 'Previous bestseller',
              next: 'Next bestseller',
              pause: 'Pause conveyor belt',
            }}
            action={
              <button
                type="button"
                onClick={() => handleSelectCategory('soups')}
                className="inline-flex h-[40px] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#DFD0B2]/60 bg-[#F5EFE2] px-5 text-[11.5px] font-bold tracking-wide text-[#0D1C11] shadow-md transition hover:-translate-y-px hover:bg-[#EAE0CA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] sm:h-auto sm:min-h-[46px] sm:gap-2.5 sm:px-7 sm:py-3 sm:text-sm"
              >
                <span>Browse Soups &amp; Full Categories</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
              </button>
            }
          />
        </div>

        {/* Full-Bleed Bottom Warm Beige Filipino Heritage Banner Strip */}
        <div
          aria-hidden="true"
          className="relative z-10 w-full shrink-0 border-t border-[#0D1C11]/20 bg-[#ECE2CC]"
        >
          <div
            className="h-[11px] w-full border-b border-[#0D1C11]/20 bg-[#E6D9BE]"
            style={{
              backgroundImage: BANIG_STRIP_BG,
              backgroundRepeat: 'repeat-x',
              backgroundPosition: 'center',
            }}
          />
          <div className="h-6 w-full bg-[#ECE2CC]" />
        </div>
      </div>

      {/* Dedicated Locked Full-Screen Category Portal (locked until clicking Best Sellers) */}
      {isLockedCategory &&
        createPortal(
          <div
            className="fixed inset-0 z-[44] flex h-[100dvh] flex-col overflow-hidden bg-[#0B190F] text-[#0D1C11]"
            onWheel={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`PIYO Filipino Menu — ${activeCategoryMeta.label}`}
          >
            {/* Pinned Slim Warm Sunlit Beige App Nav Header + Single-Row Scrollable Category Bar */}
            <div className="relative z-20 shrink-0 overflow-hidden bg-gradient-to-b from-[#F7F2E6] via-[#F5EFE2] to-[#ECE2CC] pb-2 pt-2 sm:pb-3.5 sm:pt-4">
              <PalmFrondSvg className="pointer-events-none absolute -right-4 -top-4 h-24 w-36 text-[#0D1C11] opacity-80 sm:-top-3 sm:h-44 sm:w-64 sm:opacity-100" />
              <PalmFrondSvg className="pointer-events-none absolute -left-8 -top-3 h-20 w-32 -scale-x-100 text-[#0D1C11] opacity-65 sm:-top-2 sm:h-40 sm:w-60 sm:opacity-75" />

              <div className="relative z-10 mx-auto w-full max-w-7xl px-3 sm:px-8">
                {/* Mobile: Ultra-Slim 1-Row App Header ([←] | Hapag ng PIYO · Category | [Bag]) · Desktop: Full Back & Cart Pills */}
                <div className="relative flex items-center justify-between gap-2 sm:flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleSelectCategory('bestsellers')}
                    aria-label="Back to Best Sellers"
                    title="Back to Best Sellers"
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#0D1C11]/25 bg-[#FAF6EC]/95 text-[#0D1C11] shadow-xs transition hover:border-[#0D1C11] hover:bg-[#0D1C11] hover:text-[#F5EFE2] sm:h-auto sm:min-h-[34px] sm:w-auto sm:gap-1.5 sm:px-3.5 sm:py-1 sm:text-xs sm:font-bold"
                  >
                    <ArrowLeft className="h-4 w-4 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">Best Sellers</span>
                  </button>

                  {/* Mobile Compact Centered Title Inline Between Back & Cart Icons */}
                  <div className="min-w-0 flex-1 text-center sm:hidden">
                    <p className="font-script text-[22px] leading-none text-[#7E5A30]">
                      Hapag ng PIYO
                    </p>
                    <div className="mt-0.5 flex items-center justify-center gap-1.5">
                      <span
                        aria-hidden="true"
                        className="h-[1px] w-5 bg-gradient-to-r from-transparent to-[#0D1C11]/45"
                      />
                      <h2 className="truncate font-serif text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#0D1C11]">
                        {activeCategoryMeta.label}
                      </h2>
                      <span
                        aria-hidden="true"
                        className="h-[1px] w-5 bg-gradient-to-l from-transparent to-[#0D1C11]/45"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenTray}
                    aria-label={
                      trayCount > 0
                        ? `Open order cart (${trayCount} items, ${formatPeso(trayTotal)})`
                        : 'Open order cart'
                    }
                    title="Open order cart"
                    className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0D1C11] text-[#F5EFE2] shadow-sm transition hover:bg-[#162719] sm:h-auto sm:min-h-[34px] sm:w-auto sm:gap-2 sm:px-4 sm:py-1.5 sm:text-xs sm:font-bold"
                  >
                    <ShoppingBag className="h-4 w-4 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                    {trayCount > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#DFB96F] px-1 text-[10px] font-extrabold text-[#08130B] ring-2 ring-[#F5EFE2] sm:hidden">
                        {trayCount}
                      </span>
                    )}
                    <span className="hidden sm:inline">
                      {trayCount > 0 ? `${trayCount} · ${formatPeso(trayTotal)}` : 'Cart'}
                    </span>
                  </button>
                </div>

                {/* Desktop / Tablet Editorial Title Below Top Row */}
                <div className="mt-0.5 hidden text-center sm:block">
                  <p className="font-script text-[46px] leading-[1.02] text-[#7E5A30]">
                    Hapag ng PIYO
                  </p>
                  <div className="mt-0.5 flex items-center justify-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#0D1C11]/45"
                    />
                    <h2 className="font-serif text-xl font-bold uppercase tracking-[0.26em] text-[#0D1C11]">
                      {activeCategoryMeta.label}
                    </h2>
                    <span
                      aria-hidden="true"
                      className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#0D1C11]/45"
                    />
                  </div>
                </div>

                {/* Slim Single-Row Category Pill Rail with ‹ › Scroll Buttons (Mobile) & Centered Row (Desktop) */}
                <div className="mt-1.5 flex items-center gap-1 sm:mt-3 sm:justify-center">
                  <button
                    type="button"
                    onClick={() => scrollCatRailBy(-170)}
                    disabled={!canScrollLeft}
                    aria-label="Scroll categories left"
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#0D1C11]/20 bg-[#FAF6EC]/95 text-[#0D1C11] shadow-xs transition lg:hidden ${
                      canScrollLeft
                        ? 'opacity-100 hover:bg-[#0D1C11] hover:text-[#F5EFE2]'
                        : 'pointer-events-none opacity-30'
                    }`}
                  >
                    <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>

                  <div
                    ref={catRailRef}
                    onScroll={syncCatRailArrows}
                    onWheel={(e) => {
                      const el = catRailRef.current;
                      if (!el || el.scrollWidth <= el.clientWidth) return;
                      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                        el.scrollLeft += e.deltaY;
                        syncCatRailArrows();
                      }
                    }}
                    className="flex min-w-0 flex-1 items-center justify-start gap-1.5 overflow-x-auto no-scrollbar py-0.5 touch-pan-x lg:flex-initial lg:justify-center"
                    role="tablist"
                    aria-label="Filipino menu categories"
                  >
                    {MENU_CATEGORIES.filter((cat) => cat.id !== 'bestsellers').map(
                      (cat) => {
                        const active = selectedCat === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            onClick={() => handleSelectCategory(cat.id)}
                            className={`min-h-[28px] shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide sm:min-h-[34px] sm:px-3.5 sm:py-1 sm:text-xs ${
                              active
                                ? 'bg-[#0D1C11] text-[#F5EFE2] shadow-sm'
                                : 'border border-[#0D1C11]/20 bg-[#FAF6EC]/90 text-[#1A2D1D] hover:border-[#0D1C11]/50 hover:bg-[#E6DAC2]'
                            }`}
                          >
                            {cat.label}
                          </button>
                        );
                      }
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => scrollCatRailBy(170)}
                    disabled={!canScrollRight}
                    aria-label="Scroll categories right"
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#0D1C11]/20 bg-[#FAF6EC]/95 text-[#0D1C11] shadow-xs transition lg:hidden ${
                      canScrollRight
                        ? 'opacity-100 hover:bg-[#0D1C11] hover:text-[#F5EFE2]'
                        : 'pointer-events-none opacity-30'
                    }`}
                  >
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Pinned Woven Banig Strip */}
            <div
              aria-hidden="true"
              className="h-[7px] w-full shrink-0 border-y border-[#0D1C11]/25 bg-[#E6D9BE] sm:h-[11px]"
              style={{
                backgroundImage: BANIG_STRIP_BG,
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'center',
              }}
            />

            {/* Independently Scrollable Solihiya Grid */}
            <div
              ref={lockedScrollRef}
              className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#0B190F] py-6 lg:py-7"
              style={{
                backgroundImage: SOLIHIYA_BG,
                backgroundSize: '64px 64px',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {renderDishCards(visibleItems)}
            </div>

            {/* Pinned Bottom Warm Beige Heritage Banner Strip */}
            <div
              aria-hidden="true"
              className="relative z-10 w-full shrink-0 border-t border-[#0D1C11]/20 bg-[#ECE2CC]"
            >
              <div
                className="h-[11px] w-full border-b border-[#0D1C11]/20 bg-[#E6D9BE]"
                style={{
                  backgroundImage: BANIG_STRIP_BG,
                  backgroundRepeat: 'repeat-x',
                  backgroundPosition: 'center',
                }}
              />
              <div className="h-6 w-full bg-[#ECE2CC]" />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
