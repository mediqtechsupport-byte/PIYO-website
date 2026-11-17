import React from 'react';
import {
  Home,
  UtensilsCrossed,
  ShoppingBag,
  MapPin,
  Phone,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

const NAV_LINKS = [
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
      {/* Top Header (Seamless Editorial Desktop Nav + Mobile App Header) */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#06180E]/92 text-[#FAF6EC] backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 md:py-3.5">
          {/* Editorial Serif Brand Crest & Wordmark */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            aria-label="PIYO Grill & Restaurant Home"
            className="group flex shrink-0 items-center gap-2.5 rounded-md px-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F]"
          >
            <img
              src="./logo.svg"
              alt="PIYO Est. 2025 Crest"
              className="h-10 w-10 shrink-0 rounded-full border border-[#C8A15A] bg-[#0B2718] p-[1.5px] transition-transform duration-300 group-hover:scale-105"
            />
            <div>
              <span className="block whitespace-nowrap font-serif text-[1.6rem] font-semibold leading-none tracking-tight text-[#FAF6EC] sm:text-[1.75rem]">
                Piyo<span className="text-[#DFB96F]">.</span>
              </span>
              <span className="mt-0.5 block whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.16em] text-[#A9BAB0]">
                Grill &amp; Resto
              </span>
            </div>
          </button>

          {/* Desktop Centered Navigation Links */}
          <nav
            className="hidden items-center gap-7 md:flex lg:gap-9"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onNavigate(link.id)}
                  className={`relative shrink-0 whitespace-nowrap py-1 text-[13px] font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] rounded ${
                    isActive
                      ? 'text-[#DFB96F]'
                      : 'text-[#C8D4CC] hover:text-[#FAF6EC]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            {/* Quick Call on Mobile */}
            <a
              href={`tel:${RESTAURANT_INFO.mobileTel}`}
              className="inline-flex min-h-[36px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-[#FAF6EC] transition hover:bg-white/10 md:hidden"
              aria-label="Call PIYO Grill"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-[#DFB96F]" />
              <span>Call</span>
            </a>

            {/* Tray Button */}
            <button
              type="button"
              onClick={onOpenTray}
              className="relative inline-flex min-h-[36px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-[#FAF6EC] transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F]"
              aria-label={`Open order tray with ${trayCount} items`}
            >
              <ShoppingBag className="h-3.5 w-3.5 shrink-0 text-[#DFB96F]" />
              <span className="md:hidden">Tray</span>
              {trayCount > 0 && (
                <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#DFB96F] px-1 text-[10px] font-bold text-[#06180E]">
                  {trayCount}
                </span>
              )}
            </button>

            {/* Editorial Outlined Reserve CTA (Desktop) */}
            <button
              type="button"
              onClick={() => onNavigate('visit')}
              className="hidden min-h-[38px] shrink-0 items-center whitespace-nowrap rounded-full border border-white/30 bg-white/[0.03] px-5 py-1.5 text-xs font-medium tracking-wide text-[#FAF6EC] transition hover:border-[#DFB96F]/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] md:inline-flex"
            >
              Book a table
            </button>
          </div>
        </div>

        {/* Slim Live Status Sub-bar on Mobile */}
        <div className="flex items-center justify-between border-t border-white/[0.06] bg-[#04120A]/85 px-5 py-1 text-[11px] text-[#B8C7BD] md:hidden">
          <span className="inline-flex items-center gap-1.5 truncate">
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                openStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            {openStatus.statusText}
          </span>
          <span className="shrink-0 font-medium text-[#DFB96F]">
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
                aria-current={isActive ? 'page' : undefined}
                aria-label={item.id === 'tray' ? `My Tray (${trayCount} items)` : item.label}
                onClick={() =>
                  item.id === 'tray' ? onOpenTray() : onNavigate(item.id)
                }
                className={`relative flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl py-1 text-[11px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2718] ${
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
