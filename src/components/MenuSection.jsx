import React, { useMemo, useState } from 'react';
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
  Info,
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

function CardQtyAction({ dish, trayStats, onQuickAdd, onUpdateTrayQty, onSelectDish }) {
  const { totalQty, latestEntry } = trayStats;
  const hasExtras = (dish.variants?.length || 0) > 1 || (dish.addons?.length || 0) > 0;

  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        onClick={() => onSelectDish(dish)}
        className="inline-flex min-h-[36px] items-center rounded-full border border-[#0B2718]/25 px-3 py-1.5 text-xs font-semibold text-[#0B2718] transition hover:bg-[#E5EDE7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2718] sm:min-h-[34px]"
      >
        {hasExtras ? 'Details & sides' : 'Details'}
      </button>

      {totalQty > 0 && latestEntry ? (
        <div className="inline-flex min-h-[36px] items-center gap-1 rounded-full bg-[#DFB96F] px-1.5 py-0.5 text-xs font-bold text-[#06180E] shadow-xs sm:min-h-[34px]">
          <button
            type="button"
            onClick={() => onUpdateTrayQty(latestEntry.key, latestEntry.quantity - 1)}
            aria-label={`Decrease ${dish.name} quantity`}
            className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-[#06180E]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06180E]"
          >
            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <span className="min-w-[18px] text-center text-xs font-extrabold">
            {totalQty}
          </span>
          <button
            type="button"
            onClick={() => onQuickAdd(dish)}
            aria-label={`Add one more ${dish.name}`}
            className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-[#06180E]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06180E]"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onQuickAdd(dish)}
          className="inline-flex min-h-[36px] items-center gap-1 rounded-full bg-[#0B2718] px-3.5 py-1.5 text-xs font-bold text-[#FAF6EC] transition hover:bg-[#113421] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B36A] active:scale-95 sm:min-h-[34px]"
          aria-label={`Add ${dish.name} to tray`}
        >
          <Plus className="h-3.5 w-3.5 text-[#D8B36A]" aria-hidden="true" />
          <span>Add</span>
        </button>
      )}
    </div>
  );
}

export function MenuSection({
  onSelectDish,
  onQuickAdd,
  trayItems = [],
  onUpdateTrayQty,
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  const categoryCounts = useMemo(() => {
    const counts = { all: MENU_ITEMS.length };
    for (const item of MENU_ITEMS) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, []);

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

  const groupedSections = useMemo(() => {
    const categoryOrder = MENU_CATEGORIES.filter((c) => c.id !== 'all');
    return categoryOrder
      .map((cat, idx) => ({
        ...cat,
        sectionNumber: String(idx + 1).padStart(2, '0'),
        items: filteredItems.filter((item) => item.category === cat.id),
      }))
      .filter((section) => section.items.length > 0);
  }, [filteredItems]);

  const resetFilters = () => {
    setActiveCategory('all');
    setActiveFilter('all');
    setSearchQuery('');
  };

  return (
    <section id="menu" className="bg-[#F5EFE2] py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-block rounded-full bg-[#0B2718]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0B2718]">
              Digital Menu · {MENU_ITEMS.length} Dishes
            </span>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#0B2718] sm:text-4xl">
              Heritage Soups, Charcoal Grill &amp; House Classics
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-[#425246]">
              Tap any dish to inspect ingredients, serving sizes, and optional sides — or add straight to your Table / Takeout Tray.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4B5E50]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Cansi, Inasal, Sisig..."
              aria-label="Search menu dishes"
              className="w-full rounded-full border border-[#0B2718]/20 bg-[#FAF6EC] py-2.5 pl-10 pr-9 text-sm text-[#1D231E] placeholder-[#6A7B6E] shadow-xs focus:border-[#0B2718] focus:outline-none focus:ring-2 focus:ring-[#0B2718]/15"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-[#5A6C5E] hover:bg-[#0B2718]/10"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Sticky Category & Filter Bar */}
        <div className="sticky top-[91px] z-30 -mx-4 mt-6 border-y border-[#0B2718]/10 bg-[#F5EFE2]/95 px-4 py-3 backdrop-blur-md md:top-[73px] sm:-mx-6 sm:px-6">
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:gap-2">
            {MENU_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.icon] || UtensilsCrossed;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-all sm:px-3 sm:text-[13px] ${
                    isActive
                      ? 'bg-[#0B2718] text-[#FAF6EC] shadow-sm ring-1 ring-[#D8B36A]/40'
                      : 'border border-[#0B2718]/15 bg-[#FAF6EC] text-[#283B2E] hover:border-[#0B2718]/40 hover:bg-[#E5EDE7]'
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 ${
                      isActive ? 'text-[#D8B36A]' : 'text-[#16402A]'
                    }`}
                    aria-hidden="true"
                  />
                  <span>{cat.label}</span>
                  <span
                    className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] leading-none ${
                      isActive
                        ? 'bg-[#06180E] text-[#D8B36A]'
                        : 'bg-[#0B2718]/8 text-[#425246]'
                    }`}
                  >
                    {categoryCounts[cat.id] || 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Tag Chips */}
          <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="mr-1 shrink-0 text-[10px] font-bold uppercase tracking-widest text-[#56685B]">
              Filter
            </span>
            {QUICK_FILTERS.map((tag) => {
              const active = activeFilter === tag.id;
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => setActiveFilter(tag.id)}
                  className={`min-h-[30px] shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                    active
                      ? 'bg-[#16402A] text-[#FAF6EC]'
                      : 'bg-[#E8DEC8]/75 text-[#3B4C40] hover:bg-[#E8DEC8]'
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State or Numbered Category Sections */}
        {groupedSections.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-[#0B2718]/15 bg-[#FAF6EC] p-8 text-center">
            <p className="font-serif text-2xl font-semibold text-[#0B2718]">
              No matching dishes found
            </p>
            <p className="mt-1 text-sm text-[#4B5E50]">
              Try clearing your search or switching back to All Menu.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 rounded-full bg-[#0B2718] px-5 py-2 text-xs font-bold text-[#FAF6EC]"
            >
              Show All {MENU_ITEMS.length} Dishes
            </button>
          </div>
        ) : (
          <div className="mt-8 space-y-12">
            {groupedSections.map((section) => {
              const hasLeadFeature = section.items.length >= 4;
              return (
                <div key={section.id} className="space-y-5">
                  {/* Numbered Editorial Section Header */}
                  <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#0B2718]/15 pb-3">
                    <div className="flex items-baseline gap-3.5">
                      <span className="font-serif text-4xl font-semibold leading-none text-[#C29645] sm:text-5xl">
                        {section.sectionNumber}
                      </span>
                      <div>
                        <h3 className="font-serif text-2xl font-semibold leading-tight text-[#0B2718] sm:text-3xl">
                          {section.label}
                        </h3>
                        <p className="mt-0.5 text-xs text-[#47574B] sm:text-sm">
                          {section.subtitle}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#56685B]">
                      {section.items.length}{' '}
                      {section.items.length === 1 ? 'dish' : 'dishes'}
                    </span>
                  </div>

                  {/* Section Dish Cards Grid */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                    {section.items.map((dish, idx) => {
                      const isFeatured = hasLeadFeature && idx === 0;
                      const trayStats = trayStatsByDishId[dish.id] || {
                        totalQty: 0,
                        latestEntry: null,
                      };

                      if (isFeatured) {
                        return (
                          <article
                            key={dish.id}
                            className="group flex flex-col overflow-hidden rounded-3xl border border-[#0B2718]/15 bg-[#FAF6EC] shadow-xs transition hover:-translate-y-0.5 hover:border-[#0B2718]/35 hover:shadow-md sm:col-span-2 sm:grid sm:grid-cols-12"
                          >
                            <button
                              type="button"
                              onClick={() => onSelectDish(dish)}
                              className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B2718] text-left focus:outline-none sm:col-span-6 sm:aspect-auto sm:h-full sm:min-h-[260px]"
                            >
                              <img
                                src={dish.image}
                                alt={dish.name}
                                loading="lazy"
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                              />
                              {dish.badge && (
                                <span className="absolute left-3 top-3 rounded-full bg-[#0B2718]/90 px-2.5 py-1 text-[11px] font-bold text-[#D8B36A] backdrop-blur-xs">
                                  {dish.badge}
                                </span>
                              )}
                            </button>

                            <div className="flex min-w-0 flex-col justify-between p-4 sm:col-span-6 sm:p-6">
                              <div>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-[#16402A]">
                                  {dish.serving}
                                </p>
                                <div className="mt-1 flex items-start justify-between gap-2">
                                  <button
                                    type="button"
                                    onClick={() => onSelectDish(dish)}
                                    className="text-left focus:outline-none"
                                  >
                                    <h4 className="font-serif text-2xl font-semibold leading-snug text-[#0B2718] group-hover:text-[#16402A] sm:text-3xl">
                                      {dish.name}
                                    </h4>
                                  </button>
                                  <span className="shrink-0 font-serif text-xl font-bold text-[#0B2718] sm:text-2xl">
                                    {formatPeso(dish.price)}
                                  </span>
                                </div>

                                <p className="mt-2 text-xs leading-relaxed text-[#47574B] sm:text-sm">
                                  {dish.shortDesc}
                                </p>

                                {dish.ingredients?.length > 0 && (
                                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                                    {dish.ingredients.map((ing) => (
                                      <span
                                        key={ing}
                                        className="rounded-full border border-[#0B2718]/12 bg-[#F5EFE2] px-2.5 py-0.5 text-[11px] font-medium text-[#2A3F30]"
                                      >
                                        {ing}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#0B2718]/10 pt-3">
                                <span className="text-[11px] font-medium text-[#56685B]">
                                  {dish.prepTime}
                                </span>
                                <CardQtyAction
                                  dish={dish}
                                  trayStats={trayStats}
                                  onQuickAdd={onQuickAdd}
                                  onUpdateTrayQty={onUpdateTrayQty}
                                  onSelectDish={onSelectDish}
                                />
                              </div>
                            </div>
                          </article>
                        );
                      }

                      return (
                        <article
                          key={dish.id}
                          className="group flex flex-col overflow-hidden rounded-3xl border border-[#0B2718]/12 bg-[#FAF6EC] shadow-xs transition hover:-translate-y-0.5 hover:border-[#0B2718]/35 hover:shadow-md"
                        >
                          <button
                            type="button"
                            onClick={() => onSelectDish(dish)}
                            className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#0B2718] text-left focus:outline-none"
                          >
                            <img
                              src={dish.image}
                              alt={dish.name}
                              loading="lazy"
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                            {dish.badge && (
                              <span className="absolute left-3 top-3 rounded-full bg-[#0B2718]/90 px-2.5 py-1 text-[11px] font-bold text-[#D8B36A] backdrop-blur-xs">
                                {dish.badge}
                              </span>
                            )}
                          </button>

                          <div className="flex min-w-0 flex-1 flex-col justify-between p-4 sm:p-5">
                            <div>
                              <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-[#16402A]">
                                {dish.serving}
                              </p>
                              <div className="mt-1 flex items-start justify-between gap-2">
                                <button
                                  type="button"
                                  onClick={() => onSelectDish(dish)}
                                  className="text-left focus:outline-none"
                                >
                                  <h4 className="font-serif text-xl font-semibold leading-snug text-[#0B2718] group-hover:text-[#16402A]">
                                    {dish.name}
                                  </h4>
                                </button>
                                <span className="shrink-0 font-serif text-lg font-bold text-[#0B2718]">
                                  {formatPeso(dish.price)}
                                </span>
                              </div>

                              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#47574B] sm:text-sm">
                                {dish.shortDesc}
                              </p>
                            </div>

                            <div className="mt-4 flex items-center justify-end border-t border-[#0B2718]/10 pt-3">
                              <CardQtyAction
                                dish={dish}
                                trayStats={trayStats}
                                onQuickAdd={onQuickAdd}
                                onUpdateTrayQty={onUpdateTrayQty}
                                onSelectDish={onSelectDish}
                              />
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Transparent Menu Pricing Note */}
        <div className="mt-10 flex items-start gap-2.5 rounded-2xl border border-[#0B2718]/15 bg-[#E5EDE7]/70 p-4 text-xs leading-relaxed text-[#25402E]">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#0B2718]" aria-hidden="true" />
          <p>
            <strong>Menu &amp; Refill Note:</strong> Listed prices reflect publicly posted delivery/menu rates and may vary slightly for dine-in. Dining in with Bacolod Cansi? Ask our team for complimentary warm soup refills!
          </p>
        </div>
      </div>
    </section>
  );
}
