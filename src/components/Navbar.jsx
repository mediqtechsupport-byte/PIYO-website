import React from 'react';
import {
  Home,
  UtensilsCrossed,
  ShoppingBag,
  MapPin,
  Phone,
  CalendarDays,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'heritage', label: 'Story' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'visit', label: 'Visit' },
];

export function Navbar({
  activeSection,
  onNavigate,
  trayCount,
  onOpenTray,
  openStatus,
}) {
  return (
    <>
      {/* Top Header (Desktop Full Nav + Mobile App Header) */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B2718]/95 text-[#FAF6EC] backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
          {/* Brand Crest */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex shrink-0 items-center gap-2.5 text-left focus:outline-none group sm:gap-3"
          >
            <img
              src="./logo.svg"
              alt="PIYO Grill & Restaurant Logo"
              className="h-10 w-10 shrink-0 rounded-full shadow-md ring-1 ring-[#D8B36A]/50 transition-transform group-hover:scale-105 sm:h-11 sm:w-11"
            />
            <div className="min-w-0">
              <span className="block whitespace-nowrap font-serif text-xl font-semibold tracking-wider text-[#FAF6EC] sm:text-2xl">
                PIYO
              </span>
              <p className="whitespace-nowrap text-[11px] tracking-wide text-[#CDD9D0] sm:text-xs">
                Grill &amp; Restaurant
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden items-center gap-5 md:flex lg:gap-7"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onNavigate(link.id)}
                  className={`relative shrink-0 whitespace-nowrap py-1 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#D8B36A]'
                      : 'text-[#FAF6EC]/85 hover:text-[#FAF6EC]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[#D8B36A]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Cluster */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            {/* Quick Call on Mobile */}
            <a
              href={`tel:${RESTAURANT_INFO.mobileTel}`}
              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-[#FAF6EC] transition hover:bg-white/20 md:hidden"
              aria-label="Call PIYO Grill"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-[#D8B36A]" />
              <span>Call</span>
            </a>

            {/* Reserve CTA (Desktop) */}
            <button
              type="button"
              onClick={() => onNavigate('visit')}
              className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#D8B36A]/60 bg-[#D8B36A] px-3.5 py-1.5 text-xs font-bold text-[#06180E] transition hover:bg-[#E5C685] md:inline-flex"
            >
              <CalendarDays className="h-3.5 w-3.5 shrink-0" />
              <span>Reserve Table</span>
            </button>

            {/* Tray Button */}
            <button
              type="button"
              onClick={onOpenTray}
              className="relative inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#06180E] px-3 py-1.5 text-xs font-semibold text-[#FAF6EC] ring-1 ring-white/15 transition hover:bg-[#113421] sm:px-3.5 sm:text-sm"
              aria-label={`Open order tray with ${trayCount} items`}
            >
              <ShoppingBag className="h-4 w-4 shrink-0 text-[#D8B36A]" />
              <span className="hidden sm:inline">My Tray</span>
              {trayCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D8B36A] px-1.5 text-[11px] font-bold text-[#06180E]">
                  {trayCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Sub-bar Open Status on Mobile */}
        <div className="flex items-center justify-between border-t border-white/10 bg-[#06180E]/80 px-4 py-1 text-[11px] text-[#CDD9D0] md:hidden">
          <span className="inline-flex items-center gap-1.5 truncate">
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                openStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            {openStatus.statusText}
          </span>
          <span className="shrink-0 font-medium text-[#D8B36A]">
            Km. 64 · Tagaytay
          </span>
        </div>
      </header>

      {/* Native-Style Mobile Bottom Navigation Bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[#0B2718]/15 bg-[#FAF6EC]/95 backdrop-blur-lg shadow-[0_-4px_20px_rgba(12,38,24,0.1)] md:hidden pb-safe"
        aria-label="Mobile bottom navigation"
      >
        <div className="mx-auto grid max-w-md grid-cols-4 px-2 pt-1.5">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
            { id: 'tray', label: 'Tray', icon: ShoppingBag, badge: trayCount },
            { id: 'visit', label: 'Visit', icon: MapPin },
          ].map((item) => {
            const Icon = item.icon;
            const isActive =
              item.id !== 'tray' &&
              (activeSection === item.id ||
                (item.id === 'home' &&
                  (activeSection === 'heritage' || activeSection === 'reviews')));

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  item.id === 'tray' ? onOpenTray() : onNavigate(item.id)
                }
                className={`relative flex flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-[11px] font-semibold transition-all ${
                  isActive
                    ? 'text-[#0B2718]'
                    : 'text-[#4B584E] hover:text-[#0B2718]'
                }`}
              >
                <span
                  className={`relative flex h-7 w-11 items-center justify-center rounded-full transition-colors ${
                    isActive ? 'bg-[#0B2718] text-[#FAF6EC]' : 'bg-transparent'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.badge > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C29645] px-1 text-[10px] font-bold text-[#FAF6EC] ring-2 ring-[#FAF6EC]">
                      {item.badge}
                    </span>
                  )}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
