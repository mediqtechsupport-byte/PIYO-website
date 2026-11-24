import React, { useEffect, useMemo, useState } from 'react';
import {
  Search,
  X,
  Plus,
  Minus,
  UtensilsCrossed,
  Soup,
  Flame,
  Pizza,
  Sparkles,
  CupSoda,
  CircleDot,
  ShoppingBag,
  SlidersHorizontal,
  Check,
  Tag,
  Info,
  ChevronRight,
} from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, QUICK_FILTERS } from '../data/menuData';
import { formatPeso } from '../utils/hours';

const CATEGORY_ICONS = {
  UtensilsCrossed,
  Soup,
  Flame,
  Pizza,
  Sparkles,
  CupSoda,
  Bowl: CircleDot,
};

const TOP_CATEGORY_TABS = [
  { id: 'soups', label: 'Soups', icon: 'Soup' },
  { id: 'grill', label: 'Grill & Specials', icon: 'Flame' },
  { id: 'pasta-pizza', label: 'Silog & Pasta', icon: 'Pizza' },
  { id: 'appetizers', label: 'Appetizers', icon: 'Sparkles' },
  { id: 'drinks', label: 'Drinks', icon: 'CupSoda' },
  { id: 'sides', label: 'Sides', icon: 'Bowl' },
  { id: 'all', label: 'All (29)', icon: 'UtensilsCrossed' },
];

const ADDON_IMAGES = {
  'garlic-rice': './images/addon-garlic-rice-3d.jpg',
  'plain-rice': './images/addon-steamed-rice-3d.jpg',
  'extra-marrow': './images/ing-marrow-3d.jpg',
  atchara: './images/addon-atchara-3d.jpg',
  'calamansi-patis': './images/ing-calamansi-3d.jpg',
  'calamansi-chili': './images/ing-calamansi-3d.jpg',
  'chili-oil': './images/ing-chili-3d.jpg',
  'garlic-bread': './images/ing-garlic-3d.jpg',
  'mashed-potato': './images/dish-mashed-atchara.jpg',
  'extra-egg': './images/dish-silog.jpg',
};

const UNIVERSAL_ADDONS = [
  { id: 'garlic-rice', label: 'Garlic Rice', price: 45 },
  { id: 'atchara', label: 'Side Atchara', price: 45 },
  { id: 'calamansi-chili', label: 'Calamansi & Chili', price: 0 },
];

const PROMO_CATALOG = {
  PIYO10: { code: 'PIYO10', type: 'percent', value: 10, label: '-10%' },
  TAGAYTAY: { code: 'TAGAYTAY', type: 'flat', value: 100, label: '-₱100' },
};

function getAddonImage(addonId) {
  return ADDON_IMAGES[addonId] || './images/ing-calamansi-3d.jpg';
}

function getShortAddonLabel(label) {
  return label
    .replace(/^Add\s+/i, '')
    .replace(/^Extra\s+/i, 'Extra ')
    .replace(/^Side\s+/i, '')
    .replace(/^Platter of\s+/i, '')
    .replace(/\s*\([^)]*\)/g, '')
    .trim();
}

function getDishBuildOptions(dish) {
  const existing = (dish?.addons || []).map((a) => ({
    ...a,
    shortLabel: getShortAddonLabel(a.label),
  }));
  const seen = new Set(existing.map((a) => a.id));
  const merged = [...existing];
  for (const fallback of UNIVERSAL_ADDONS) {
    if (merged.length >= 3) break;
    if (!seen.has(fallback.id)) {
      merged.push({ ...fallback, shortLabel: fallback.label });
      seen.add(fallback.id);
    }
  }
  return merged.slice(0, 3);
}

function getRecommendedPairings(dish) {
  const byCategory = {
    soups: ['garlic-rice-side', 'mashed-potato-atchara', 'mango-dragon-swirl'],
    grill: ['bacolod-cansi', 'garlic-rice-side', 'guyabano-breeze'],
    'pasta-pizza': ['piyo-savory-wings', 'cheesy-lumpia', 'berry-avocado-shakes'],
    appetizers: ['bacolod-chicken-inasal', 'garlic-rice-side', 'mango-dragon-swirl'],
    drinks: ['bacolod-cansi', 'bacolod-chicken-inasal', 'cheesy-lumpia'],
    sides: ['bacolod-cansi', 'bacolod-chicken-inasal', 'mango-dragon-swirl'],
  };
  const preferredIds = byCategory[dish?.category] || [
    'garlic-rice-side',
    'mango-dragon-swirl',
    'cheesy-lumpia',
  ];
  const picks = preferredIds
    .map((id) => MENU_ITEMS.find((m) => m.id === id))
    .filter((m) => m && m.id !== dish?.id);

  for (const candidate of MENU_ITEMS) {
    if (picks.length >= 3) break;
    if (candidate.id !== dish?.id && !picks.some((p) => p.id === candidate.id)) {
      picks.push(candidate);
    }
  }
  return picks.slice(0, 3);
}

export function MenuSection({
  onSelectDish,
  onQuickAdd,
  onAddToTray,
  onOpenTray,
  trayItems = [],
  onUpdateTrayQty,
}) {
  const [activeCategory, setActiveCategory] = useState('soups');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [showFullGrid, setShowFullGrid] = useState(false);

  const [featuredDishId, setFeaturedDishId] = useState('bacolod-cansi');
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedAddonIds, setSelectedAddonIds] = useState(['garlic-rice']);
  const [quantity, setQuantity] = useState(1);

  const [appliedPromoCode, setAppliedPromoCode] = useState('PIYO10');
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      const matchesCat =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesTag =
        activeFilter === 'all' || item.tags.includes(activeFilter);
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.shortDesc.toLowerCase().includes(q) ||
        item.fullDesc.toLowerCase().includes(q) ||
        (item.ingredients &&
          item.ingredients.some((ing) => ing.toLowerCase().includes(q))) ||
        (item.badge && item.badge.toLowerCase().includes(q));
      return matchesCat && matchesTag && matchesSearch;
    });
  }, [activeCategory, activeFilter, searchQuery]);

  useEffect(() => {
    if (filteredItems.length === 0) return;
    if (!filteredItems.some((item) => item.id === featuredDishId)) {
      setFeaturedDishId(filteredItems[0].id);
    }
  }, [filteredItems, featuredDishId]);

  const featuredDish = useMemo(
    () =>
      filteredItems.find((item) => item.id === featuredDishId) ||
      filteredItems[0] ||
      MENU_ITEMS[0],
    [filteredItems, featuredDishId]
  );

  useEffect(() => {
    setSelectedVariantIdx(0);
    const defaultAddons = getDishBuildOptions(featuredDish);
    setSelectedAddonIds(defaultAddons[0] ? [defaultAddons[0].id] : []);
    setQuantity(1);
  }, [featuredDish?.id]);

  const variants = featuredDish?.variants?.length
    ? featuredDish.variants
    : [{ label: featuredDish?.serving || 'Standard', priceDelta: 0 }];
  const activeVariant = variants[selectedVariantIdx] || variants[0];
  const buildAddons = useMemo(
    () => getDishBuildOptions(featuredDish),
    [featuredDish]
  );
  const recommendedPairings = useMemo(
    () => getRecommendedPairings(featuredDish),
    [featuredDish]
  );

  const selectedAddonsTotal = buildAddons
    .filter((a) => selectedAddonIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  const unitPrice = Math.max(
    0,
    (featuredDish?.price || 0) +
      (activeVariant?.priceDelta || 0) +
      selectedAddonsTotal
  );
  const builderLineTotal = unitPrice * quantity;

  const trayCount = trayItems.reduce((sum, entry) => sum + entry.quantity, 0);
  const orderSubtotal = trayItems.reduce(
    (sum, entry) => sum + entry.unitPrice * entry.quantity,
    0
  );

  const promoObj = appliedPromoCode ? PROMO_CATALOG[appliedPromoCode] : null;
  const discountAmount = useMemo(() => {
    if (!promoObj || orderSubtotal <= 0) return 0;
    if (promoObj.type === 'percent') {
      return Math.round((orderSubtotal * promoObj.value) / 100);
    }
    return Math.min(orderSubtotal, promoObj.value);
  }, [promoObj, orderSubtotal]);
  const orderFinalTotal = Math.max(0, orderSubtotal - discountAmount);

  const toggleAddon = (id) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddFeaturedToOrder = () => {
    if (!featuredDish) return;
    const chosenAddons = buildAddons.filter((a) =>
      selectedAddonIds.includes(a.id)
    );
    if (onAddToTray) {
      onAddToTray({
        dish: featuredDish,
        variantLabel: activeVariant.label,
        addons: chosenAddons,
        unitPrice,
        quantity,
      });
    } else if (onQuickAdd) {
      onQuickAdd(featuredDish);
    }
    setQuantity(1);
  };

  const handleLoadPopularCombo = () => {
    const starterIds = [
      'bacolod-cansi',
      'bacolod-chicken-inasal',
      'mango-dragon-swirl',
    ];
    starterIds.forEach((id) => {
      const dish = MENU_ITEMS.find((item) => item.id === id);
      if (dish && onQuickAdd) onQuickAdd(dish);
    });
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const cleaned = promoInput.trim().toUpperCase();
    if (!cleaned) return;
    if (PROMO_CATALOG[cleaned]) {
      setAppliedPromoCode(cleaned);
      setPromoInput('');
      setPromoError('');
    } else {
      setPromoError('Try PIYO10 (10% off) or TAGAYTAY (₱100 off)');
    }
  };

  const handleSelectFromGrid = (dish) => {
    setFeaturedDishId(dish.id);
    if (activeCategory !== 'all' && activeCategory !== dish.category) {
      setActiveCategory(dish.category);
    }
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeCategoryMeta =
    MENU_CATEGORIES.find((c) => c.id === activeCategory) || MENU_CATEGORIES[0];

  return (
    <section
      id="menu"
      className="relative flex flex-col justify-center overflow-hidden border-t border-[#DFB96F]/15 bg-[#06180E] py-6 text-[#FAF6EC] sm:py-8 lg:min-h-[calc(100svh-74px)] lg:py-6"
    >
      {/* Subtle Dark Forest Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(22,64,42,0.55),transparent_50%),radial-gradient(circle_at_85%_82%,rgba(223,185,111,0.08),transparent_48%)]"
      />

      {/* Full-Page Edge-to-Edge Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        {/* Top Full-Width Category & Cart Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-[#DFB96F]/20 bg-[#0B2718]/95 px-4 py-2.5 shadow-[0_14px_36px_-18px_rgba(0,0,0,0.65)] backdrop-blur-md sm:px-5">
          {/* Left Brand Mark */}
          <div className="flex items-center gap-2.5">
            <span className="font-serif text-xl font-bold tracking-tight text-[#FAF6EC] sm:text-2xl">
              PIYO<span className="text-[#DFB96F]">.</span>
            </span>
            <span className="hidden rounded-full border border-[#DFB96F]/25 bg-[#06180E]/75 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#DFB96F] xl:inline-block">
              {MENU_ITEMS.length} Dishes
            </span>
          </div>

          {/* Center Icon Category Tabs */}
          <div
            className="order-3 flex w-full items-center gap-1 overflow-x-auto no-scrollbar pb-0.5 pt-1 lg:order-2 lg:w-auto lg:py-0"
            role="tablist"
            aria-label="Menu categories"
          >
            {TOP_CATEGORY_TABS.map((tab) => {
              const Icon = CATEGORY_ICONS[tab.icon] || UtensilsCrossed;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveCategory(tab.id);
                    setActiveFilter('all');
                  }}
                  className={`inline-flex min-h-[36px] shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all sm:text-[13px] ${
                    isActive
                      ? 'bg-[#16402A] text-[#DFB96F] shadow-sm ring-1 ring-[#DFB96F]/45'
                      : 'text-[#C6D5CB] hover:bg-white/[0.06] hover:text-[#FAF6EC]'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      isActive ? 'text-[#DFB96F]' : 'text-[#9BB0A1]'
                    }`}
                    aria-hidden="true"
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Search + Cart Pill */}
          <div className="order-2 flex items-center gap-2 lg:order-3">
            {showSearchInput ? (
              <div className="relative flex items-center">
                <Search
                  className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-[#DFB96F]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dish..."
                  aria-label="Search menu dishes"
                  autoFocus
                  className="w-40 rounded-full border border-[#DFB96F]/35 bg-[#06180E] py-1.5 pl-8 pr-7 text-xs text-[#FAF6EC] placeholder-[#89A091] focus:border-[#DFB96F] focus:outline-none sm:w-48"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearchInput(false);
                  }}
                  aria-label="Close menu search"
                  className="absolute right-2 rounded-full p-0.5 text-[#9EB2A6] hover:bg-white/10"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowSearchInput(true)}
                aria-label="Search dishes"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#06180E]/80 text-[#FAF6EC] transition hover:border-[#DFB96F]/50 hover:text-[#DFB96F]"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
              </button>
            )}

            <button
              type="button"
              onClick={onOpenTray}
              className="inline-flex min-h-[36px] items-center gap-2 rounded-full bg-[#DFB96F] px-4 py-1.5 text-xs font-bold text-[#06180E] shadow-sm transition hover:bg-[#E7C88B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F]"
            >
              <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Cart</span>
              {trayCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#06180E] px-1.5 text-[10px] font-extrabold text-[#DFB96F]">
                  {trayCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Main Full-Page 2-Column Dark Forest Green Ordering Workbench */}
        <div className="mt-4 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
          {/* LEFT 8-COL: Meal Category + Featured Dish Builder + Recommended Pairings */}
          <div className="flex flex-col justify-between rounded-[26px] border border-[#DFB96F]/20 bg-[#0B2718]/95 p-5 shadow-[0_24px_54px_-22px_rgba(0,0,0,0.72)] sm:p-6 lg:col-span-8">
            <div>
              {/* Meal Category Header + Filter Toggle */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold tracking-tight text-[#FAF6EC] sm:text-lg">
                    Meal Category
                  </h2>
                  <p className="text-xs text-[#A3B6A9]">
                    {activeCategoryMeta.label} · {filteredItems.length}{' '}
                    {filteredItems.length === 1 ? 'dish' : 'dishes'} available
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowFullGrid((prev) => !prev)}
                    className="inline-flex min-h-[34px] items-center gap-1 rounded-full border border-[#DFB96F]/25 bg-[#06180E]/75 px-3 py-1 text-[11px] font-semibold text-[#FAF6EC] transition hover:border-[#DFB96F]/60 hover:text-[#DFB96F]"
                  >
                    <span>
                      {showFullGrid ? 'Hide Full List' : `All ${MENU_ITEMS.length} Dishes`}
                    </span>
                    <ChevronRight
                      className={`h-3.5 w-3.5 transition-transform ${
                        showFullGrid ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFilterRow((prev) => !prev)}
                    aria-label="Toggle quick tag filters"
                    aria-expanded={showFilterRow}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                      showFilterRow || activeFilter !== 'all'
                        ? 'border-[#DFB96F]/60 bg-[#DFB96F]/18 text-[#DFB96F]'
                        : 'border-white/15 bg-[#06180E]/75 text-[#DFB96F] hover:border-[#DFB96F]/50'
                    }`}
                  >
                    <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Optional Quick Filter Tag Row */}
              {showFilterRow && (
                <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {QUICK_FILTERS.map((tag) => {
                    const active = activeFilter === tag.id;
                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => setActiveFilter(tag.id)}
                        className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                          active
                            ? 'bg-[#DFB96F] text-[#06180E]'
                            : 'bg-[#06180E]/70 text-[#C8D6CD] hover:bg-[#143D27]'
                        }`}
                      >
                        {tag.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Horizontal Pill Strip to Switch Featured Dish */}
              <div className="mt-3.5 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => {
                    const isSelected = featuredDish?.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setFeaturedDishId(item.id)}
                        className={`min-h-[34px] shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-[#DFB96F] text-[#06180E] shadow-sm'
                            : 'border border-white/10 bg-[#06180E]/75 text-[#D2DFD6] hover:border-[#DFB96F]/40 hover:text-[#FAF6EC]'
                        }`}
                      >
                        {item.name}
                      </button>
                    );
                  })
                ) : (
                  <div className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#06180E]/65 px-4 py-3 text-xs text-[#C6D5CB]">
                    <span>No dishes match &ldquo;{searchQuery}&rdquo;.</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('all');
                        setActiveFilter('all');
                      }}
                      className="font-bold text-[#DFB96F] underline"
                    >
                      Reset filters
                    </button>
                  </div>
                )}
              </div>

              {/* Center Featured Dish Spotlight & Customizer */}
              {featuredDish && (
                <div className="mt-5 grid grid-cols-1 items-center gap-6 md:grid-cols-12">
                  {/* Circular Overhead Dish Showcase with Subtle Emerald Botanical Sprigs */}
                  <div className="relative flex flex-col items-center justify-center md:col-span-5">
                    <div className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64 xl:h-72 xl:w-72">
                      <svg
                        viewBox="0 0 320 320"
                        fill="none"
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-3 h-[calc(100%+24px)] w-[calc(100%+24px)] opacity-85"
                      >
                        <path
                          d="M52 96C26 70 28 38 64 36C74 62 72 82 52 96Z"
                          fill="#2D6A44"
                        />
                        <path
                          d="M84 62C68 30 82 14 108 26C106 46 96 58 84 62Z"
                          fill="#478C5D"
                        />
                        <path
                          d="M36 122C12 110 8 84 36 78C46 94 46 110 36 122Z"
                          fill="#205234"
                        />
                        <path
                          d="M258 242C284 252 292 278 264 288C246 274 246 256 258 242Z"
                          fill="#2D6A44"
                        />
                        <path
                          d="M226 266C240 294 224 312 200 296C202 278 212 268 226 266Z"
                          fill="#478C5D"
                        />
                        <path
                          d="M274 210C298 208 310 232 288 248C272 238 268 224 274 210Z"
                          fill="#205234"
                        />
                      </svg>

                      <div className="relative h-52 w-52 overflow-hidden rounded-full border-[4px] border-[#DFB96F]/55 bg-[#06180E] shadow-[0_24px_48px_-14px_rgba(0,0,0,0.65)] sm:h-60 sm:w-60 xl:h-64 xl:w-64">
                        <img
                          key={featuredDish.id}
                          src={featuredDish.image}
                          alt={featuredDish.name}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      {featuredDish.badge && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#DFB96F]/45 bg-[#06180E] px-3 py-1 text-[10px] font-bold tracking-wide text-[#DFB96F] shadow-md">
                          {featuredDish.badge}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectDish && onSelectDish(featuredDish)}
                      className="mt-3.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#A9BEB0] transition hover:text-[#DFB96F]"
                    >
                      <Info className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Ingredients &amp; prep ({featuredDish.prepTime})</span>
                    </button>
                  </div>

                  {/* Right Builder Controls: Title, Description, SIZE, BUILD YOUR MEAL, Qty + Split Add CTA */}
                  <div className="md:col-span-7">
                    <h3 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-[#FAF6EC] sm:text-[2.25rem]">
                      {featuredDish.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#C9D7CE] sm:text-[13px] sm:leading-6">
                      {featuredDish.fullDesc || featuredDish.shortDesc}
                    </p>

                    {/* SIZE / Portion Pills */}
                    <div className="mt-3.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9EB2A6]">
                        Size / Serving
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        {variants.map((variant, idx) => {
                          const active = idx === selectedVariantIdx;
                          return (
                            <button
                              key={variant.label}
                              type="button"
                              onClick={() => setSelectedVariantIdx(idx)}
                              className={`min-h-[34px] rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                                active
                                  ? 'bg-[#DFB96F] text-[#06180E] shadow-xs'
                                  : 'border border-dashed border-[#DFB96F]/30 bg-[#06180E]/60 text-[#D7E3DB] hover:border-[#DFB96F]/60'
                              }`}
                            >
                              {variant.label}
                              {variant.priceDelta > 0
                                ? ` (+${formatPeso(variant.priceDelta)})`
                                : ''}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* BUILD YOUR MEAL — 3 Square Dashed 3D Add-on Tiles */}
                    <div className="mt-3.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9EB2A6]">
                        Build Your Meal
                      </p>
                      <div className="mt-2 grid grid-cols-3 gap-2.5 sm:gap-3">
                        {buildAddons.map((addon) => {
                          const checked = selectedAddonIds.includes(addon.id);
                          return (
                            <button
                              key={addon.id}
                              type="button"
                              onClick={() => toggleAddon(addon.id)}
                              aria-pressed={checked}
                              className={`group relative flex flex-col items-center rounded-2xl border border-dashed px-2 pb-4 pt-2.5 text-center transition-all ${
                                checked
                                  ? 'border-[#DFB96F]/70 bg-[#123924] shadow-sm'
                                  : 'border-white/18 bg-[#06180E]/65 hover:border-[#DFB96F]/40'
                              }`}
                            >
                              {/* Crisp Warm-Cream Medallion so 3D studio renders stay ultra-crisp on dark green */}
                              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-[#FAF6EC] p-1 shadow-xs">
                                <img
                                  src={getAddonImage(addon.id)}
                                  alt={addon.shortLabel}
                                  className="h-10 w-10 object-contain brightness-[1.03] contrast-[1.04] mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                                />
                              </div>
                              <span className="mt-1.5 line-clamp-1 text-[11px] font-semibold text-[#FAF6EC]">
                                {addon.shortLabel}
                              </span>
                              <span className="text-[10px] font-bold text-[#DFB96F]">
                                {addon.price > 0
                                  ? `+${formatPeso(addon.price)}`
                                  : 'Free'}
                              </span>

                              {/* Overlapping Bottom Circular Checkmark Badge */}
                              <span
                                aria-hidden="true"
                                className={`absolute -bottom-2.5 left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border transition-all ${
                                  checked
                                    ? 'border-[#DFB96F] bg-[#DFB96F] text-[#06180E]'
                                    : 'border-white/25 bg-[#06180E] text-[#9EB2A6]'
                                }`}
                              >
                                {checked ? (
                                  <Check className="h-3 w-3 stroke-[3]" />
                                ) : (
                                  <Plus className="h-3 w-3 stroke-[2.5]" />
                                )}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Stepper + Split "₱Price | Add to order" Gold Pill CTA */}
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#06180E]/80 px-2 py-1.5">
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          aria-label="Decrease quantity"
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-[#133A25] text-[#FAF6EC] transition hover:bg-[#DFB96F] hover:text-[#06180E]"
                        >
                          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <span className="min-w-[20px] text-center text-sm font-bold text-[#FAF6EC]">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => q + 1)}
                          aria-label="Increase quantity"
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-[#133A25] text-[#FAF6EC] transition hover:bg-[#DFB96F] hover:text-[#06180E]"
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddFeaturedToOrder}
                        className="flex min-h-[44px] flex-1 items-center justify-center gap-4 rounded-full bg-[#DFB96F] px-6 py-2.5 text-sm font-bold text-[#06180E] shadow-lg transition hover:bg-[#E7C88B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] active:scale-[0.99]"
                      >
                        <span className="tabular-nums">
                          {formatPeso(builderLineTotal)}
                        </span>
                        <span
                          className="h-4 w-px bg-[#06180E]/25"
                          aria-hidden="true"
                        />
                        <span>Add to order</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RECOMMENDED PAIRINGS Strip (Bottom of Left Card) */}
            <div className="mt-5 border-t border-dashed border-[#DFB96F]/20 pt-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9EB2A6]">
                Recommended Pairings
              </p>
              <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {recommendedPairings.map((pairing) => (
                  <div
                    key={pairing.id}
                    className="relative flex items-center gap-3 rounded-2xl border border-dashed border-[#DFB96F]/25 bg-[#06180E]/65 p-2.5 transition hover:border-[#DFB96F]/55"
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectFromGrid(pairing)}
                      className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-[#DFB96F]/40 shadow-sm"
                      aria-label={`Inspect ${pairing.name}`}
                    >
                      <img
                        src={pairing.image}
                        alt={pairing.name}
                        className="h-full w-full object-cover"
                      />
                    </button>
                    <div className="min-w-0 flex-1 pr-6">
                      <button
                        type="button"
                        onClick={() => handleSelectFromGrid(pairing)}
                        className="block truncate text-left text-xs font-bold text-[#FAF6EC] hover:text-[#DFB96F]"
                      >
                        {pairing.name}
                      </button>
                      <p className="truncate text-[10px] text-[#9BB0A1]">
                        {pairing.serving}
                      </p>
                      <p className="mt-0.5 text-xs font-extrabold text-[#DFB96F]">
                        {formatPeso(pairing.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onQuickAdd && onQuickAdd(pairing)}
                      aria-label={`Quick add ${pairing.name} to order`}
                      className="absolute bottom-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#DFB96F] text-[#06180E] shadow-xs transition hover:bg-[#E7C88B] active:scale-95"
                    >
                      <Plus className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT 4-COL: Dark Forest Green "My Order" Panel */}
          <aside
            aria-label="My Order summary"
            className="flex flex-col justify-between rounded-[26px] border border-[#DFB96F]/20 bg-[#0B2718]/95 p-5 shadow-[0_24px_54px_-22px_rgba(0,0,0,0.72)] sm:p-6 lg:col-span-4"
          >
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-lg font-bold tracking-tight text-[#FAF6EC]">
                  My Order
                </h3>
                <span className="text-xs font-medium text-[#9EB2A6]">
                  {trayItems.length}{' '}
                  {trayItems.length === 1 ? 'position' : 'positions'}
                </span>
              </div>

              {/* Order Items List */}
              {trayItems.length > 0 ? (
                <div className="mt-4 max-h-[300px] space-y-2.5 overflow-y-auto pr-1">
                  {trayItems.map((entry) => {
                    const addonsNote =
                      entry.addons?.length > 0
                        ? ` · +${entry.addons.length} side${
                            entry.addons.length > 1 ? 's' : ''
                          }`
                        : '';
                    return (
                      <div
                        key={entry.key}
                        className="flex items-center gap-3 rounded-2xl border border-dashed border-[#DFB96F]/25 bg-[#06180E]/65 p-3"
                      >
                        <img
                          src={entry.dish.image}
                          alt={entry.dish.name}
                          className="h-13 w-13 shrink-0 rounded-full border-2 border-[#DFB96F]/40 object-cover shadow-xs"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold text-[#FAF6EC] sm:text-sm">
                            {entry.dish.name}
                          </p>
                          <p className="truncate text-[10px] text-[#9BB0A1]">
                            {entry.variantLabel}
                            {addonsNote}
                          </p>
                          <div className="mt-1.5 flex items-center justify-between gap-2">
                            <span className="text-xs font-extrabold text-[#DFB96F] sm:text-sm">
                              {formatPeso(entry.unitPrice * entry.quantity)}
                            </span>

                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateTrayQty &&
                                  onUpdateTrayQty(entry.key, entry.quantity + 1)
                                }
                                aria-label={`Add one more ${entry.dish.name}`}
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#133A25] text-[#FAF6EC] transition hover:bg-[#DFB96F] hover:text-[#06180E]"
                              >
                                <Plus className="h-3 w-3" aria-hidden="true" />
                              </button>
                              <span className="min-w-[14px] text-center text-xs font-bold text-[#FAF6EC]">
                                {entry.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateTrayQty &&
                                  onUpdateTrayQty(entry.key, entry.quantity - 1)
                                }
                                aria-label={`Remove one ${entry.dish.name}`}
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#133A25] text-[#FAF6EC] transition hover:bg-[#DFB96F] hover:text-[#06180E]"
                              >
                                <Minus className="h-3 w-3" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-dashed border-[#DFB96F]/25 bg-[#06180E]/55 px-4 py-7 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#143D27] text-[#DFB96F]">
                    <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-[#FAF6EC]">
                    Your order tray is empty
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#A3B6A9]">
                    Customize any dish on the left and tap{' '}
                    <strong className="text-[#DFB96F]">Add to order</strong>, or
                    start with our Tagaytay favorites:
                  </p>
                  <button
                    type="button"
                    onClick={handleLoadPopularCombo}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#16402A] px-4 py-2 text-xs font-bold text-[#DFB96F] ring-1 ring-[#DFB96F]/40 transition hover:bg-[#DFB96F] hover:text-[#06180E]"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Load PIYO Bestseller Set</span>
                  </button>
                </div>
              )}
            </div>

            <div>
              {/* PROMOCODE Row */}
              <div className="mt-5 border-y border-dashed border-[#DFB96F]/20 py-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#A9BEB0]">
                    Promocode
                  </span>

                  {promoObj ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DFB96F]/35 bg-[#143D27] px-2.5 py-1 text-xs font-bold text-[#DFB96F]">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#DFB96F] text-[9px] text-[#06180E]">
                        <Tag className="h-2.5 w-2.5" aria-hidden="true" />
                      </span>
                      <span>{promoObj.code}</span>
                      <button
                        type="button"
                        onClick={() => setAppliedPromoCode('')}
                        aria-label={`Remove promo code ${promoObj.code}`}
                        className="ml-0.5 rounded-full p-0.5 text-[#FAF6EC]/70 hover:bg-white/10 hover:text-[#FAF6EC]"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ) : (
                    <form
                      onSubmit={handleApplyPromo}
                      className="flex items-center gap-1.5"
                    >
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value);
                          setPromoError('');
                        }}
                        placeholder="PIYO10"
                        aria-label="Enter promo code"
                        className="w-24 rounded-full border border-[#DFB96F]/30 bg-[#06180E] px-2.5 py-1 text-xs font-semibold uppercase text-[#FAF6EC] placeholder-[#7C9384] focus:border-[#DFB96F] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="rounded-full bg-[#DFB96F] px-2.5 py-1 text-[11px] font-bold text-[#06180E] hover:bg-[#E7C88B]"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>
                {promoError && (
                  <p className="mt-1.5 text-[11px] font-medium text-[#DFB96F]">
                    {promoError}
                  </p>
                )}
              </div>

              {/* Totals Breakdown */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#B7C7BD]">
                  <span className="font-semibold uppercase tracking-wide">
                    Discount
                  </span>
                  <span className="font-bold text-[#DFB96F]">
                    {promoObj && orderSubtotal > 0
                      ? `${promoObj.label} (-${formatPeso(discountAmount)})`
                      : promoObj
                      ? promoObj.label
                      : '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#B7C7BD]">
                  <span className="font-semibold uppercase tracking-wide">
                    Kansi Soup Refills
                  </span>
                  <span className="font-bold text-[#6EE7B7]">FREE</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-3 text-sm">
                  <span className="font-extrabold uppercase tracking-wide text-[#FAF6EC]">
                    Total
                  </span>
                  <span className="text-lg font-extrabold tabular-nums text-[#DFB96F]">
                    {formatPeso(orderFinalTotal)}
                  </span>
                </div>
              </div>

              {/* Prominent Gold-on-Forest Confirm Order CTA */}
              <button
                type="button"
                onClick={onOpenTray}
                disabled={trayItems.length === 0}
                className="mt-5 min-h-[46px] w-full rounded-full bg-[#DFB96F] px-6 py-3 text-sm font-bold text-[#06180E] shadow-[0_14px_30px_-10px_rgba(223,185,111,0.45)] transition hover:bg-[#E7C88B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Confirm Order
              </button>
            </div>
          </aside>
        </div>

        {/* Optional Expandable Full Menu Catalog Grid (Browse All 29 Dishes Visually) */}
        {showFullGrid && (
          <div className="mt-5 rounded-[26px] border border-[#DFB96F]/20 bg-[#0B2718]/95 p-5 shadow-lg sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#FAF6EC]">
                  Full PIYO Catalog ({filteredItems.length} dishes)
                </h3>
                <p className="text-xs text-[#A3B6A9]">
                  Click any dish to customize it in the workbench above, or tap + to add immediately.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowFullGrid(false)}
                className="rounded-full border border-[#DFB96F]/30 px-3 py-1 text-xs font-semibold text-[#DFB96F] hover:bg-[#143D27]"
              >
                Collapse
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((dish) => {
                const isSelected = featuredDish?.id === dish.id;
                return (
                  <div
                    key={dish.id}
                    className={`flex items-center gap-3 rounded-2xl border p-3 transition ${
                      isSelected
                        ? 'border-[#DFB96F] bg-[#143D27]'
                        : 'border-dashed border-[#DFB96F]/25 bg-[#06180E]/65 hover:border-[#DFB96F]/55'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectFromGrid(dish)}
                      className="h-15 w-15 shrink-0 overflow-hidden rounded-full border-2 border-[#DFB96F]/40 shadow-xs"
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </button>
                    <div className="min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => handleSelectFromGrid(dish)}
                        className="block truncate text-left text-sm font-bold text-[#FAF6EC] hover:text-[#DFB96F]"
                      >
                        {dish.name}
                      </button>
                      <p className="line-clamp-1 text-[11px] text-[#9BB0A1]">
                        {dish.shortDesc}
                      </p>
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="text-xs font-extrabold text-[#DFB96F]">
                          {formatPeso(dish.price)}
                        </span>
                        <button
                          type="button"
                          onClick={() => onQuickAdd && onQuickAdd(dish)}
                          className="inline-flex items-center gap-1 rounded-full bg-[#DFB96F] px-2.5 py-1 text-[11px] font-bold text-[#06180E] hover:bg-[#E7C88B]"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
