import React, { useMemo, useState } from 'react';
import {
  Search,
  X,
  Plus,
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

export function MenuSection({ onSelectDish, onQuickAdd }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const matchesTag = activeFilter === 'all' || item.tags.includes(activeFilter);
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.shortDesc.toLowerCase().includes(q) ||
        item.fullDesc.toLowerCase().includes(q) ||
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

  const resetFilters = () => {
    setActiveCategory('all');
    setActiveFilter('all');
    setSearchQuery('');
  };

  return (
    <section id="menu" className="bg-[#F5EFE2] py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-block rounded-full bg-[#143D28]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#143D28]">
              Digital Menu
            </span>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#143D28] sm:text-4xl">
              Heritage Soups, Charcoal Grill &amp; House Classics
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-[#425246]">
              Tap any dish to inspect ingredients, serving sizes, and optional sides — or add straight to your Table / Takeout Tray.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4B5E50]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Cansi, Inasal, Sisig..."
              aria-label="Search menu dishes"
              className="w-full rounded-full border border-[#143D28]/20 bg-[#FAF6EC] py-2.5 pl-10 pr-9 text-sm text-[#1D231E] placeholder-[#6A7B6E] shadow-xs focus:border-[#143D28] focus:outline-none focus:ring-2 focus:ring-[#143D28]/15"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-[#5A6C5E] hover:bg-[#143D28]/10"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Sticky Category Bar (mobile & desktop friendly) */}
        <div className="sticky top-[85px] z-30 -mx-4 mt-6 border-y border-[#143D28]/10 bg-[#F5EFE2]/95 px-4 py-3 backdrop-blur-md md:top-[65px] sm:-mx-6 sm:px-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {MENU_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.icon] || UtensilsCrossed;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all sm:text-sm ${
                    isActive
                      ? 'bg-[#143D28] text-[#FAF6EC] shadow-sm ring-1 ring-[#D8B36A]/40'
                      : 'border border-[#143D28]/15 bg-[#FAF6EC] text-[#283B2E] hover:border-[#143D28]/40 hover:bg-[#E5EDE7]'
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 ${
                      isActive ? 'text-[#D8B36A]' : 'text-[#255E40]'
                    }`}
                  />
                  <span>{cat.label}</span>
                  <span
                    className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[10px] ${
                      isActive
                        ? 'bg-[#0C2618] text-[#D8B36A]'
                        : 'bg-[#143D28]/8 text-[#425246]'
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
            {QUICK_FILTERS.map((tag) => {
              const active = activeFilter === tag.id;
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => setActiveFilter(tag.id)}
                  className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                    active
                      ? 'bg-[#255E40] text-[#FAF6EC]'
                      : 'bg-[#E8DEC8]/70 text-[#3B4C40] hover:bg-[#E8DEC8]'
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-[#143D28]/15 bg-[#FAF6EC] p-8 text-center">
            <p className="font-serif text-2xl font-semibold text-[#143D28]">
              No matching dishes found
            </p>
            <p className="mt-1 text-sm text-[#4B5E50]">
              Try clearing your search or switching back to All Menu.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 rounded-full bg-[#143D28] px-5 py-2 text-xs font-bold text-[#FAF6EC]"
            >
              Show All {MENU_ITEMS.length} Dishes
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {filteredItems.map((dish) => (
              <article
                key={dish.id}
                className="group flex flex-row overflow-hidden rounded-2xl border border-[#143D28]/12 bg-[#FAF6EC] shadow-xs transition hover:-translate-y-0.5 hover:border-[#143D28]/35 hover:shadow-md sm:flex-col sm:rounded-3xl"
              >
                {/* Dish Thumbnail (Compact Left Square on Mobile, Top Card Image on Tablet/Desktop) */}
                <button
                  type="button"
                  onClick={() => onSelectDish(dish)}
                  className="relative w-28 shrink-0 overflow-hidden bg-[#143D28] text-left focus:outline-none sm:aspect-[16/10] sm:w-full"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {dish.badge && (
                    <span className="absolute left-2 top-2 rounded-full bg-[#143D28]/90 px-2 py-0.5 text-[10px] font-bold text-[#D8B36A] backdrop-blur-xs sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[11px]">
                      {dish.badge}
                    </span>
                  )}
                </button>

                {/* Card Body */}
                <div className="flex min-w-0 flex-1 flex-col justify-between p-3.5 sm:p-5">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectDish(dish)}
                        className="text-left focus:outline-none"
                      >
                        <h3 className="font-serif text-lg font-semibold leading-snug text-[#143D28] group-hover:text-[#255E40] sm:text-xl">
                          {dish.name}
                        </h3>
                      </button>
                      <span className="shrink-0 text-sm font-bold text-[#143D28] sm:text-base">
                        {formatPeso(dish.price)}
                      </span>
                    </div>

                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#47574B] sm:text-sm">
                      {dish.shortDesc}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#143D28]/10 pt-2.5">
                    <span className="truncate text-[11px] font-medium text-[#255E40]">
                      {dish.serving}
                    </span>

                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onSelectDish(dish)}
                        className="rounded-full border border-[#143D28]/20 px-2.5 py-1 text-[11px] font-semibold text-[#143D28] transition hover:bg-[#E5EDE7]"
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        onClick={() => onQuickAdd(dish)}
                        className="inline-flex items-center gap-1 rounded-full bg-[#143D28] px-2.5 py-1 text-[11px] font-bold text-[#FAF6EC] transition hover:bg-[#1B4E33] active:scale-95"
                        aria-label={`Add ${dish.name} to tray`}
                      >
                        <Plus className="h-3.5 w-3.5 text-[#D8B36A]" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Transparent Menu Pricing Note */}
        <div className="mt-8 flex items-start gap-2.5 rounded-2xl border border-[#143D28]/15 bg-[#E5EDE7]/70 p-4 text-xs leading-relaxed text-[#25402E]">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#143D28]" />
          <p>
            <strong>Menu &amp; Refill Note:</strong> Listed prices reflect publicly posted delivery/menu rates and may vary slightly for dine-in. Dining in with Bacolod Cansi? Ask our team for complimentary warm soup refills!
          </p>
        </div>
      </div>
    </section>
  );
}
