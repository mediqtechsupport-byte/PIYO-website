import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Home,
  UtensilsCrossed,
  ShoppingBag,
  MapPin,
  Phone,
  Calendar,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'history', label: 'Our Story' },
  { id: 'menu', label: 'Menu' },
  { id: 'heritage', label: 'Heritage' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'visit', label: 'Visit' },
];

export function Navbar({
  activeSection,
  onNavigate,
  trayCount,
  onOpenTray,
  openStatus,
  activeOrderStatus = null,
  activeOrdersCount = 0,
}) {
  const headerRef = useRef(null);
  const bottomNavRef = useRef(null);

  useEffect(() => {
    const headerEl = headerRef.current;
    const bottomEl = bottomNavRef.current;
    if (!headerEl) return;
    let refreshTimer = null;

    let lastNavH = 0;
    let lastBottomH = -1;
    let lastWidth = window.innerWidth;

    const syncChromeMetrics = () => {
      const navH = Math.ceil(headerEl.getBoundingClientRect().height);
      const bottomH = bottomEl
        ? Math.ceil(bottomEl.getBoundingClientRect().height)
        : 0;
      const width = window.innerWidth;
      const root = document.documentElement;
      if (navH > 0) {
        root.style.setProperty('--nav-h', `${navH}px`);
      }
      root.style.setProperty('--bottom-nav-h', `${bottomH}px`);
      root.style.setProperty(
        '--stage-h',
        `calc(100svh - ${navH > 0 ? navH : 69}px - ${bottomH}px)`
      );

      // Only refresh ScrollTrigger when layout width or chrome bar heights actually change
      // (avoids iOS Safari toolbar collapse/expand triggering mid-scroll jumps!)
      if (navH !== lastNavH || bottomH !== lastBottomH || Math.abs(width - lastWidth) > 2) {
        lastNavH = navH;
        lastBottomH = bottomH;
        lastWidth = width;
        if (refreshTimer) window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => {
          ScrollTrigger.refresh();
        }, 80);
      }
    };

    syncChromeMetrics();
    const ro = new ResizeObserver(syncChromeMetrics);
    ro.observe(headerEl);
    if (bottomEl) ro.observe(bottomEl);
    window.addEventListener('resize', syncChromeMetrics);
    return () => {
      if (refreshTimer) window.clearTimeout(refreshTimer);
      ro.disconnect();
      window.removeEventListener('resize', syncChromeMetrics);
    };
  }, []);

  return (
    <>
      {/* Top Header (Seamless Editorial Desktop Nav + Mobile App Header) */}
      <header
        ref={headerRef}
        className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#08130B]/92 pt-[env(safe-area-inset-top)] text-[#FAF6EC] backdrop-blur-md"
      >
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
              className="h-10 w-10 shrink-0 rounded-full border border-[#C8A15A] bg-[#0D1C11] p-[1.5px] transition-transform duration-300 group-hover:scale-105"
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

          {/* Desktop Centered Navigation Links with Active Gold Underline */}
          <nav
            className="hidden items-center gap-7 md:flex lg:gap-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onNavigate(link.id)}
                  className={`relative shrink-0 whitespace-nowrap py-1.5 text-[13px] font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] rounded ${
                    isActive
                      ? 'text-[#DFB96F]'
                      : 'text-[#D0DCD4] hover:text-[#FAF6EC]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 h-[1.5px] rounded-full bg-[#DFB96F]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster — Minimal Equal-Size Circular Icons on Mobile, Full Pills on Desktop */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            {/* Quick Call Icon on Mobile */}
            <a
              href={`tel:${RESTAURANT_INFO.mobileTel}`}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.05] text-[#FAF6EC] transition hover:border-[#DFB96F]/50 hover:bg-white/10 md:hidden"
              aria-label="Call PIYO Grill"
              title="Call PIYO Grill"
            >
              <Phone className="h-4 w-4 text-[#DFB96F]" />
            </a>

            {/* Tray Button — Same 36x36 Minimal Circle on Mobile, Full Badge Pill on Desktop */}
            <button
              type="button"
              onClick={onOpenTray}
              className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.05] text-[#FAF6EC] transition hover:border-[#DFB96F]/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] md:h-auto md:min-h-[38px] md:w-auto md:gap-1.5 md:rounded-lg md:border-white/15 md:bg-white/[0.04] md:px-3 md:py-1.5 md:text-xs md:font-medium md:hover:border-white/30"
              aria-label={`Open order tray with ${trayCount} items`}
              title="Open order tray"
            >
              <ShoppingBag className="h-4 w-4 shrink-0 text-[#DFB96F] md:h-3.5 md:w-3.5" />

              {/* Mobile Minimal Corner Badge (never expands button width) */}
              {trayCount > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#DFB96F] px-1 text-[10px] font-extrabold text-[#08130B] ring-2 ring-[#08130B] md:static md:right-auto md:top-auto md:ring-0">
                  {trayCount}
                </span>
              ) : activeOrderStatus &&
                activeOrderStatus !== 'completed' &&
                activeOrderStatus !== 'cancelled' ? (
                <>
                  {/* Mobile Live Status Dot */}
                  <span
                    className={`absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full ring-2 ring-[#08130B] md:hidden ${
                      activeOrderStatus === 'ready'
                        ? 'bg-emerald-400'
                        : 'bg-[#DFB96F]'
                    }`}
                  >
                    <span
                      className={`h-full w-full animate-ping rounded-full opacity-75 ${
                        activeOrderStatus === 'ready'
                          ? 'bg-emerald-300'
                          : 'bg-[#DFB96F]'
                      }`}
                    />
                  </span>

                  {/* Desktop Status Pill */}
                  <span
                    className={`hidden items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold md:inline-flex ${
                      activeOrderStatus === 'ready'
                        ? 'bg-emerald-400 text-emerald-950'
                        : 'bg-[#DFB96F]/20 text-[#DFB96F]'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        activeOrderStatus === 'ready'
                          ? 'bg-emerald-900'
                          : 'animate-pulse bg-[#DFB96F]'
                      }`}
                    />
                    <span>
                      {activeOrderStatus === 'ready'
                        ? activeOrdersCount > 1
                          ? `${activeOrdersCount} · Ready!`
                          : 'Ready!'
                        : activeOrdersCount > 1
                        ? `${activeOrdersCount} Live`
                        : activeOrderStatus === 'preparing'
                        ? 'Cooking'
                        : activeOrderStatus === 'accepted'
                        ? 'Accepted'
                        : 'Live'}
                    </span>
                  </span>
                </>
              ) : null}
            </button>

            {/* Verdeo-Style Warm Gold Book a Table CTA (Desktop) */}
            <button
              type="button"
              onClick={() => onNavigate('visit')}
              className="hidden min-h-[38px] shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#DFB96F] px-4 py-2 text-xs font-bold tracking-wide text-[#08130B] shadow-sm transition hover:bg-[#E8C988] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF6EC] md:inline-flex"
            >
              <span>Book a Table</span>
              <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Slim Live Status Sub-bar on Mobile */}
        <div className="flex items-center justify-between border-t border-white/[0.06] bg-[#050E08]/85 px-5 py-1 text-[11px] text-[#B8C7BD] md:hidden">
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
        ref={bottomNavRef}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[#0D1C11]/15 bg-[#FAF6EC]/95 backdrop-blur-lg shadow-[0_-4px_20px_rgba(13,28,17,0.1)] md:hidden pb-safe"
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
                className={`relative flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl py-1 text-[11px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D1C11] ${
                  isActive
                    ? 'text-[#0D1C11]'
                    : 'text-[#4B584E] hover:text-[#0D1C11]'
                }`}
              >
                <span
                  className={`relative flex h-7 w-11 items-center justify-center rounded-full transition-colors ${
                    isActive ? 'bg-[#0D1C11] text-[#FAF6EC]' : 'bg-transparent'
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
