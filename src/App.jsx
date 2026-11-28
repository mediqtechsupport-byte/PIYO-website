import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Instagram, Globe, Heart, ArrowRight, ChefHat, QrCode, Bell, X, Check } from 'lucide-react';
import { RESTAURANT_INFO, MENU_ITEMS } from './data/menuData';
import { getTagaytayOpenStatus, formatPeso } from './utils/hours';
import {
  getActiveTableFromUrl,
  getOrderById,
  getSavedCustomerOrderIds,
  addSavedCustomerOrderId,
  removeSavedCustomerOrderId,
  saveCustomerOrderId,
  subscribeToOrderUpdates,
  playCustomerReadyChime,
  ORDER_STATUS_META,
} from '@/services/orderService';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HistorySection } from './components/HistorySection';
import { GrillPromiseSection } from './components/GrillPromiseSection';
import { SignatureOrbitSection } from './components/SignatureOrbitSection';
import { MenuSection } from './components/MenuSection';
import { HeritageAndReviews } from './components/HeritageAndReviews';
import { VisitAndReserveSection } from './components/VisitAndReserveSection';
import { useSectionReveal } from './hooks/useSectionReveal';

// Code-split heavy overlays & staff KDS so initial customer page load parses <40% of the JS bundle
const DishDetailModal = lazy(() =>
  import('./components/DishDetailModal').then((m) => ({ default: m.DishDetailModal }))
);
const OrderTrayDrawer = lazy(() =>
  import('./components/OrderTrayDrawer').then((m) => ({ default: m.OrderTrayDrawer }))
);
const KitchenDashboard = lazy(() =>
  import('./components/KitchenDashboard').then((m) => ({ default: m.KitchenDashboard }))
);

function isKitchenLocation() {
  if (typeof window === 'undefined') return false;
  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  return (
    hash === '#kitchen' ||
    hash.startsWith('#kitchen/') ||
    path.endsWith('/kitchen') ||
    path.endsWith('/kitchen/')
  );
}

export default function App() {
  const [isKitchenView, setIsKitchenView] = useState(() => isKitchenLocation());
  const [activeTable] = useState(() => getActiveTableFromUrl());
  const [activeSection, setActiveSection] = useState('home');
  const [selectedDish, setSelectedDish] = useState(null);
  const [trayItems, setTrayItems] = useState([]);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [toastText, setToastText] = useState('');
  const [openStatus, setOpenStatus] = useState(() => getTagaytayOpenStatus());
  const [trackedOrderIds, setTrackedOrderIds] = useState(() =>
    getSavedCustomerOrderIds()
  );
  const [trackedOrders, setTrackedOrders] = useState([]);
  const [isTrackerExpanded, setIsTrackerExpanded] = useState(false);
  const [footerRef, footerRevealed] = useSectionReveal({ threshold: 0.05 });
  const lastStatusMapRef = useRef({});
  const snapLockUntilRef = useRef(0);
  const glideRafRef = useRef(0);

  const cancelActiveGlide = () => {
    if (glideRafRef.current) {
      window.cancelAnimationFrame(glideRafRef.current);
      glideRafRef.current = 0;
    }
  };

  const animateScrollTo = (targetY, durationMs = 500, onDone, easeMode = 'inOut') => {
    cancelActiveGlide();
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const clamped = Math.max(0, Math.min(Math.round(targetY), maxScroll));
    const startY = window.scrollY;
    const dist = clamped - startY;

    ScrollTrigger.getAll().forEach((st) => {
      st.getTween?.()?.kill();
    });

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (Math.abs(dist) <= 1 || prefersReduced || durationMs <= 0) {
      const now = Date.now();
      snapLockUntilRef.current = now + 220;
      window.__piyoNavLockUntil = now + 260;
      window.scrollTo({ top: clamped, behavior: 'auto' });
      window.dispatchEvent(new CustomEvent('piyo:nav-settled'));
      onDone?.();
      return;
    }

    const now = Date.now();
    snapLockUntilRef.current = now + durationMs + 140;
    window.__piyoNavLockUntil = now + durationMs + 120;

    const t0 = performance.now();
    const step = (ts) => {
      const p = Math.min(1, (ts - t0) / durationMs);
      // easeOutQuart for wheel & touch-seam settle (immediate response, silky deceleration);
      // easeInOutCubic for button/nav clicks (graceful start and cushioned flush arrival)
      const eased =
        easeMode === 'out'
          ? 1 - Math.pow(1 - p, 4)
          : p < 0.5
          ? 4 * p * p * p
          : 1 - Math.pow(-2 * p + 2, 3) / 2;
      window.scrollTo({ top: Math.round(startY + dist * eased), behavior: 'auto' });
      if (p < 1) {
        glideRafRef.current = window.requestAnimationFrame(step);
      } else {
        glideRafRef.current = 0;
        window.scrollTo({ top: clamped, behavior: 'auto' });
        window.__piyoNavLockUntil = 0;
        window.dispatchEvent(new CustomEvent('piyo:nav-settled'));
        onDone?.();
      }
    };
    glideRafRef.current = window.requestAnimationFrame(step);
  };

  // Live-subscribe to ALL active customer orders even across multiple rounds or page reloads
  useEffect(() => {
    if (trackedOrderIds.length === 0 || isKitchenView) {
      setTrackedOrders([]);
      return undefined;
    }
    let active = true;
    const syncOrders = async () => {
      try {
        const fetched = await Promise.all(
          trackedOrderIds.map((id) => getOrderById(id).catch(() => null))
        );
        if (!active) return;
        const valid = fetched.filter(Boolean);
        setTrackedOrders(valid);

        let latestAlert = null;
        let hasReadyAlert = false;
        for (const ord of valid) {
          const prevStatus = lastStatusMapRef.current[ord.id];
          if (prevStatus && prevStatus !== ord.status) {
            const meta = ORDER_STATUS_META[ord.status] || ORDER_STATUS_META.new;
            const num = String(ord.orderNumber).padStart(4, '0');
            if (
              ord.status === 'accepted' ||
              ord.status === 'preparing' ||
              ord.status === 'ready'
            ) {
              if (ord.status === 'ready') hasReadyAlert = true;
              latestAlert = `Order #${num} · ${meta.customerLabel}`;
            }
          }
          lastStatusMapRef.current[ord.id] = ord.status;
        }
        if (latestAlert) {
          playCustomerReadyChime(hasReadyAlert);
          setToastText(latestAlert);
          window.setTimeout(() => setToastText(''), 4800);
        }
      } catch {
        // Keep last known order states
      }
    };

    void syncOrders();
    const unsub = subscribeToOrderUpdates(() => {
      void syncOrders();
    }, 3500);
    return () => {
      active = false;
      unsub();
    };
  }, [trackedOrderIds, isKitchenView]);

  // Sync #kitchen / /kitchen route changes
  useEffect(() => {
    const syncRoute = () => setIsKitchenView(isKitchenLocation());
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  // Refresh open status every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setOpenStatus(getTagaytayOpenStatus());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  // 100% Native Compositor-Thread Scrolling + Zero-Reflow Active Nav Tracking:
  // - ZERO non-passive `wheel` listeners and ZERO scroll-end auto-yanking/snapping (scroll glides freely with native 60/120Hz inertia)
  // - Cached section offsets (recomputed ONLY on resize/load/fonts, NEVER calling getBoundingClientRect() during scroll!)
  useEffect(() => {
    if (isKitchenView) return undefined;
    let activeRaf = 0;

    let cachedMetrics = {
      navPages: [],
      stageH: 600,
    };

    const rebuildMetrics = () => {
      const header = document.querySelector('header');
      const stickyOffset = header ? Math.ceil(header.getBoundingClientRect().bottom) : 69;
      const bottomNav = document.querySelector(
        'nav[aria-label="Mobile bottom navigation"]'
      );
      const bottomNavH = bottomNav ? Math.ceil(bottomNav.getBoundingClientRect().height) : 0;
      const stageH = Math.max(280, window.innerHeight - stickyOffset - bottomNavH);
      const y = window.scrollY;
      const navIds = ['home', 'history', 'craft', 'spotlight', 'menu', 'heritage', 'reviews', 'visit'];

      const navPages = [];
      for (const id of navIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        navPages.push({
          id,
          startY: Math.max(0, Math.round(rect.top + y - stickyOffset)),
        });
      }

      cachedMetrics = { navPages, stageH };
    };

    const updateActiveFromCache = () => {
      activeRaf = 0;
      const { navPages, stageH } = cachedMetrics;
      if (navPages.length === 0) return;
      const probeY = window.scrollY + Math.max(80, stageH * 0.28);
      let current = 'home';
      for (let i = 0; i < navPages.length; i += 1) {
        if (navPages[i].startY <= probeY) {
          current = navPages[i].id;
        }
      }
      setActiveSection((prev) => (prev === current ? prev : current));
    };

    const handleScroll = () => {
      if (!activeRaf) {
        activeRaf = window.requestAnimationFrame(updateActiveFromCache);
      }
    };

    const handleUserScrollInterrupt = () => {
      // Cancel any programmatic button-click nav glide immediately if the user scrolls manually
      if (glideRafRef.current) cancelActiveGlide();
    };

    const handleMetricsRefresh = () => {
      rebuildMetrics();
      updateActiveFromCache();
    };

    rebuildMetrics();
    updateActiveFromCache();

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(handleMetricsRefresh)
        : null;
    ro?.observe(document.body);

    window.addEventListener('wheel', handleUserScrollInterrupt, { passive: true });
    window.addEventListener('touchstart', handleUserScrollInterrupt, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleMetricsRefresh, { passive: true });
    window.addEventListener('load', handleMetricsRefresh);
    window.addEventListener('piyo:nav-settled', updateActiveFromCache);
    let fontsCancelled = false;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!fontsCancelled) handleMetricsRefresh();
      });
    }
    return () => {
      fontsCancelled = true;
      cancelActiveGlide();
      if (activeRaf) window.cancelAnimationFrame(activeRaf);
      ro?.disconnect();
      window.removeEventListener('wheel', handleUserScrollInterrupt);
      window.removeEventListener('touchstart', handleUserScrollInterrupt);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleMetricsRefresh);
      window.removeEventListener('load', handleMetricsRefresh);
      window.removeEventListener('piyo:nav-settled', updateActiveFromCache);
    };
  }, [isKitchenView]);

  const scrollToSection = (id) => {
    // Close any open modal/drawer/menu portal so navigation always reveals the destination cleanly
    setSelectedDish(null);
    setIsTrayOpen(false);
    setIsTrackerExpanded(false);
    window.dispatchEvent(new CustomEvent('piyo:close-menu-portals'));

    const normalizedActive =
      id === 'book-table' || id === 'visit-info' ? 'visit' : id;
    setActiveSection(normalizedActive);

    const runGlide = () => {
      const el = document.getElementById(id);
      if (!el) return;

      const getTargetY = () => {
        const header = document.querySelector('header');
        const offset = header
          ? Math.ceil(header.getBoundingClientRect().bottom)
          : 69;
        return Math.max(
          0,
          Math.round(el.getBoundingClientRect().top + window.scrollY - offset)
        );
      };

      const targetY = getTargetY();
      const distance = Math.abs(targetY - window.scrollY);
      // Snappy yet silky cubic glide: 380ms for neighbor, up to 560ms for full-page jump
      const durationMs = Math.round(
        Math.min(560, Math.max(380, 320 + distance * 0.05))
      );

      // Prime the destination section's entrance transition slightly before arrival so it blooms as you land
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent('piyo:nav-target', { detail: { id } }));
      }, Math.round(durationMs * 0.45));

      animateScrollTo(targetY, durationMs, () => {
        // Re-verify flush alignment after sticky chrome or images settle
        window.setTimeout(() => {
          const settledY = getTargetY();
          if (Math.abs(settledY - window.scrollY) > 2) {
            window.scrollTo({ top: settledY, behavior: 'auto' });
            window.dispatchEvent(new CustomEvent('piyo:nav-settled'));
          }
        }, 60);
      });
    };

    // Wait one frame if a locked portal/overlay was just dismissed so body overflow unlocks first
    if (
      document.body.style.overflow === 'hidden' ||
      document.documentElement.style.overflow === 'hidden'
    ) {
      window.requestAnimationFrame(() => window.requestAnimationFrame(runGlide));
    } else {
      runGlide();
    }
  };

  // Always start cleanly at Home (#home, scrollY=0) on page refresh unless an explicit deep-link hash is present
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (isKitchenView) return undefined;
    const rawHash = window.location.hash.replace(/^#/, '').toLowerCase();
    const validHashes = new Set([
      'home',
      'history',
      'craft',
      'spotlight',
      'menu',
      'heritage',
      'reviews',
      'visit',
      'book-table',
      'visit-info',
    ]);
    if (!rawHash || !validHashes.has(rawHash)) {
      if (window.location.href.endsWith('#')) {
        window.history.replaceState(
          null,
          '',
          `${window.location.pathname}${window.location.search}`
        );
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
      setActiveSection('home');
      const raf = window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      });
      return () => window.cancelAnimationFrame(raf);
    }
    const t = window.setTimeout(() => {
      scrollToSection(rawHash);
    }, 120);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isKitchenView]);

  const showToast = (msg) => {
    setToastText(msg);
    setTimeout(() => setToastText(''), 2400);
  };

  const addToTray = ({ dish, variantLabel, addons, unitPrice, quantity }) => {
    const addonKey = addons.map((a) => a.id).sort().join(',');
    const key = `${dish.id}::${variantLabel}::${addonKey}`;

    setTrayItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { key, dish, variantLabel, addons, unitPrice, quantity }];
    });

    showToast(`Added ${quantity}× ${dish.name} to your tray`);
  };

  const quickAddDish = (dish) => {
    const defaultVariant = dish.variants?.[0]?.label || 'Standard';
    addToTray({
      dish,
      variantLabel: defaultVariant,
      addons: [],
      unitPrice: dish.price,
      quantity: 1,
    });
  };

  const updateTrayQty = (key, nextQty) => {
    if (nextQty <= 0) {
      setTrayItems((prev) => prev.filter((i) => i.key !== key));
      return;
    }
    setTrayItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, quantity: nextQty } : i))
    );
  };

  const removeTrayItem = (key) => {
    setTrayItems((prev) => prev.filter((i) => i.key !== key));
  };

  const trayCount = trayItems.reduce((sum, item) => sum + item.quantity, 0);
  const traySubtotal = trayItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const openKitchenView = () => {
    cancelActiveGlide();
    window.location.hash = 'kitchen';
    window.scrollTo({ top: 0, behavior: 'auto' });
    setIsKitchenView(true);
  };

  const exitKitchenView = () => {
    cancelActiveGlide();
    if (/\/kitchen\/?$/i.test(window.location.pathname)) {
      const basePath = window.location.pathname.replace(/\/kitchen\/?$/i, '/');
      window.history.replaceState(null, '', basePath || '/');
    } else if (window.location.hash) {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}`
      );
    }
    setIsKitchenView(false);
    setActiveSection('home');
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      window.setTimeout(() => ScrollTrigger.refresh(), 100);
    });
  };

  if (isKitchenView) {
    return (
      <div className="piyo-page-fade min-h-screen bg-[#08130B]">
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-[#08130B] text-sm font-semibold tracking-wider text-[#DFB96F]">
              Loading PIYO Kitchen…
            </div>
          }
        >
          <KitchenDashboard onExit={exitKitchenView} />
        </Suspense>
      </div>
    );
  }

  const activeTrackedOrders = trackedOrders.filter(
    (o) => o.status !== 'completed' && o.status !== 'cancelled'
  );
  const headlineTrackedOrder =
    activeTrackedOrders.find((o) => o.status === 'ready') ||
    activeTrackedOrders[0] ||
    trackedOrders[0] ||
    null;

  return (
    <div className="relative min-h-screen bg-[#08130B]">
      {/* Global Tagaytay Twilight Pine Forest Backdrop — Single GPU-Composited Layer Behind All Dark Sections */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#08130B]"
        style={{ transform: 'translateZ(0)' }}
      >
        <picture>
          <source srcSet="./images/piyo-pine-forest-bg.webp" type="image/webp" />
          <img
            src="./images/piyo-pine-forest-bg.jpg"
            alt=""
            decoding="async"
            className="h-full w-full object-cover object-center opacity-[0.72] brightness-[0.95] contrast-[1.06] saturate-[0.96]"
          />
        </picture>
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 24%, rgba(10,30,22,0.08) 0%, rgba(8,19,11,0.48) 70%, rgba(6,15,9,0.78) 100%)',
          }}
        />
      </div>

      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        trayCount={trayCount}
        onOpenTray={() => setIsTrayOpen(true)}
        openStatus={openStatus}
        activeOrderStatus={headlineTrackedOrder?.status || null}
        activeOrdersCount={activeTrackedOrders.length}
      />

      {/* Active Table QR Check-In Strip (shown automatically when opened via ?table=5) */}
      {activeTable && (
        <div className="relative z-10 border-b border-[#DFB96F]/30 bg-[#08130B]/85 px-4 py-2 text-center text-xs text-[#FAF6EC] backdrop-blur-xs">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2">
            <QrCode className="h-3.5 w-3.5 text-[#DFB96F]" />
            <span>
              Dine-In QR active for <strong className="text-[#DFB96F]">Table #{activeTable}</strong> —
              your table number is auto-filled in your order tray.
            </span>
          </div>
        </div>
      )}

      <main className="relative z-10">
        <HeroSection
          onExploreMenu={() => scrollToSection('menu')}
          onExploreStory={() => scrollToSection('history')}
          openStatus={openStatus}
          onSelectDishById={(id) =>
            setSelectedDish(
              MENU_ITEMS.find((item) => item.id === id) ||
                MENU_ITEMS[0] ||
                null
            )
          }
        />

        <HistorySection
          onExploreCraft={() => scrollToSection('craft')}
          onVisitPlace={() =>
            scrollToSection(window.innerWidth < 1024 ? 'visit-info' : 'visit')
          }
        />

        <GrillPromiseSection
          onExploreGrill={() => scrollToSection('menu')}
          onInspectDish={() =>
            setSelectedDish(
              MENU_ITEMS.find((item) => item.id === 'bacolod-cansi') || null
            )
          }
        />

        <SignatureOrbitSection onSelectMenuDish={setSelectedDish} />

        <MenuSection
          onSelectDish={setSelectedDish}
          onQuickAdd={quickAddDish}
          onAddToTray={addToTray}
          onOpenTray={() => setIsTrayOpen(true)}
          trayItems={trayItems}
          onUpdateTrayQty={updateTrayQty}
        />

        <HeritageAndReviews />

        <VisitAndReserveSection openStatus={openStatus} />
      </main>

      {/* Heritage Forest Green Footer */}
      <footer
        ref={footerRef}
        className={`relative z-10 border-t border-[#D8B36A]/25 bg-[#08130B]/82 pt-10 text-[#FAF6EC] ${
          trayCount > 0 && !isTrayOpen
            ? 'pb-40 md:pb-24'
            : 'pb-28 md:pb-10'
        }`}
      >
        <div
          data-revealed={footerRevealed ? 'true' : 'false'}
          className="piyo-reveal mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 text-center sm:flex-row sm:px-8 sm:text-left"
        >
          <div className="flex items-center gap-3.5">
            <img
              src="./logo.svg"
              alt="PIYO Grill & Restaurant"
              className="h-12 w-12 rounded-full ring-1 ring-[#D8B36A]/45"
            />
            <div>
              <p className="font-serif text-xl font-semibold tracking-wide">
                PIYO Grill &amp; Restaurant
              </p>
              <p className="text-xs text-[#CDD9D0]">
                {RESTAURANT_INFO.tagline} · Tagaytay City, Cavite
              </p>
            </div>
          </div>

          <div className="grid w-full max-w-[330px] grid-cols-2 gap-2 sm:flex sm:w-auto sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
            <a
              href={RESTAURANT_INFO.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[38px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/8 px-3 text-[11.5px] font-semibold text-[#FAF6EC] transition hover:bg-white/15 sm:h-auto sm:w-auto sm:px-3.5 sm:py-2 sm:text-xs"
            >
              <Facebook className="h-3.5 w-3.5 shrink-0 text-[#D8B36A]" />
              <span>Facebook</span>
            </a>
            <a
              href={RESTAURANT_INFO.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[38px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/8 px-3 text-[11.5px] font-semibold text-[#FAF6EC] transition hover:bg-white/15 sm:h-auto sm:w-auto sm:px-3.5 sm:py-2 sm:text-xs"
            >
              <Instagram className="h-3.5 w-3.5 shrink-0 text-[#D8B36A]" />
              <span>Instagram</span>
            </a>
            <a
              href={RESTAURANT_INFO.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[38px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/8 px-3 text-[11.5px] font-semibold text-[#FAF6EC] transition hover:bg-white/15 sm:h-auto sm:w-auto sm:px-3.5 sm:py-2 sm:text-xs"
            >
              <Globe className="h-3.5 w-3.5 shrink-0 text-[#D8B36A]" />
              <span>piyogrill.com</span>
            </a>
            <button
              type="button"
              onClick={openKitchenView}
              className="inline-flex h-[38px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#DFB96F]/35 bg-[#DFB96F]/10 px-3 text-[11.5px] font-semibold text-[#DFB96F] transition hover:bg-[#DFB96F]/20 sm:h-auto sm:w-auto sm:px-3.5 sm:py-2 sm:text-xs"
            >
              <ChefHat className="h-3.5 w-3.5 shrink-0" />
              <span>Kitchen Tablet</span>
            </button>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-7xl border-t border-white/10 px-5 pt-5 text-center text-[11px] text-[#9BB0A1] sm:px-8">
          <p className="inline-flex items-center gap-1">
            PIYO Grill &amp; Restaurant · Est. 2025 · Crafted with{' '}
            <Heart className="h-3 w-3 fill-[#D8B36A] text-[#D8B36A]" /> for mobile &amp; desktop diners
          </p>
        </div>
      </footer>

      {/* Lazy-Loaded Dish Detail Sheet/Modal */}
      {selectedDish && (
        <Suspense fallback={null}>
          <DishDetailModal
            dish={selectedDish}
            onClose={() => setSelectedDish(null)}
            onAddToTray={addToTray}
          />
        </Suspense>
      )}

      {/* Lazy-Loaded Order & Table Tray Drawer */}
      {isTrayOpen && (
        <Suspense fallback={null}>
          <OrderTrayDrawer
            isOpen={isTrayOpen}
            onClose={() => setIsTrayOpen(false)}
            onBrowseMenu={() => scrollToSection('menu')}
            items={trayItems}
            onUpdateQty={updateTrayQty}
            onRemoveItem={removeTrayItem}
            onClear={() => setTrayItems([])}
            activeTable={activeTable}
            trackedOrders={trackedOrders}
            onDismissTrackedOrder={(orderId) => {
              const nextIds = removeSavedCustomerOrderId(orderId);
              setTrackedOrderIds(nextIds);
              setTrackedOrders((prev) => prev.filter((o) => o.id !== orderId));
              if (nextIds.length === 0) setIsTrackerExpanded(false);
            }}
            onOrderCreated={(created) => {
              lastStatusMapRef.current[created.id] = created.status;
              const nextIds = addSavedCustomerOrderId(created.id);
              setTrackedOrderIds(nextIds);
              setTrackedOrders((prev) => [
                created,
                ...prev.filter((o) => o.id !== created.id),
              ]);
            }}
          />
        </Suspense>
      )}

      {/* Persistent Customer Live Order Status Pill (supports 1 or multiple active receipts!) */}
      {headlineTrackedOrder && !isTrayOpen && (() => {
        const primary = headlineTrackedOrder;
        const statusInfo =
          ORDER_STATUS_META[primary.status] || ORDER_STATUS_META.new;
        const orderNo = String(primary.orderNumber).padStart(4, '0');
        const isReady = primary.status === 'ready';
        const isCancelled = primary.status === 'cancelled';
        const steps = ['Sent', 'Accepted', 'Preparing', 'Ready'];
        const extraCount = trackedOrders.length - 1;
        return (
          <>
            <div className="pointer-events-none fixed bottom-[78px] left-4 right-4 z-[45] flex justify-start md:bottom-6 md:left-6 md:right-auto">
              <div
                className={`pointer-events-auto flex w-full max-w-[350px] items-center gap-3 rounded-2xl border px-3.5 py-2.5 text-[#FAF6EC] shadow-[0_20px_44px_-10px_rgba(0,0,0,0.65)] backdrop-blur-md transition ${
                  isReady
                    ? 'border-emerald-400/70 bg-emerald-950/95 ring-2 ring-emerald-400/35'
                    : 'border-[#DFB96F]/45 bg-[#08130B]/95'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setIsTrackerExpanded(true)}
                  className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                      isReady
                        ? 'bg-emerald-400 text-emerald-950'
                        : isCancelled
                        ? 'bg-red-500/20 text-red-300'
                        : 'bg-[#DFB96F]/15 text-[#DFB96F]'
                    }`}
                  >
                    {isReady ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Bell className="h-4 w-4 animate-pulse" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[10px] font-bold uppercase tracking-[0.16em] text-[#DFB96F]">
                        Order #{orderNo}
                        {extraCount > 0 ? ` (+${extraCount} more)` : ''}
                      </span>
                    </div>
                    <p className="truncate text-xs font-bold text-[#FAF6EC]">
                      {statusInfo.customerLabel}
                    </p>
                    {!isCancelled && (
                      <div className="mt-1.5 grid grid-cols-4 gap-1">
                        {steps.map((label, idx) => (
                          <span
                            key={label}
                            className={`h-1 rounded-full ${
                              statusInfo.stepIndex >= idx
                                ? isReady
                                  ? 'bg-emerald-400'
                                  : 'bg-[#DFB96F]'
                                : 'bg-white/15'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    saveCustomerOrderId(null);
                    setTrackedOrderIds([]);
                    setTrackedOrders([]);
                    setIsTrackerExpanded(false);
                  }}
                  className="rounded-full p-1 text-[#9BB0A1] transition hover:bg-white/10 hover:text-white"
                  aria-label="Dismiss all order trackers"
                  title="Dismiss all order trackers"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {isTrackerExpanded && (
              <div
                className="piyo-backdrop-in fixed inset-0 z-[60] flex items-center justify-center bg-[#061009]/75 p-4 backdrop-blur-sm"
                onClick={() => setIsTrackerExpanded(false)}
                role="dialog"
                aria-modal="true"
                aria-label="Live order status"
              >
                <div
                  className="piyo-sheet-in flex max-h-[calc(var(--dvh-full,100vh)*0.86)] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-[#DFB96F]/35 bg-[#FAF6EC] text-[#08130B] shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex shrink-0 items-center justify-between bg-[#08130B] px-5 py-4 text-[#FAF6EC]">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#DFB96F]">
                        Live Kitchen Tracker ({trackedOrders.length}{' '}
                        {trackedOrders.length === 1 ? 'Receipt' : 'Receipts'})
                      </p>
                      <h4 className="font-serif text-xl font-semibold">
                        Your Active Orders
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsTrackerExpanded(false)}
                      className="rounded-full p-1.5 text-[#FAF6EC]/80 hover:bg-white/10"
                      aria-label="Close live tracker"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex-1 space-y-4 overflow-y-auto p-5">
                    {trackedOrders.map((ord) => {
                      const oMeta =
                        ORDER_STATUS_META[ord.status] || ORDER_STATUS_META.new;
                      const oNo = String(ord.orderNumber).padStart(4, '0');
                      const oReady = ord.status === 'ready';
                      const oCancelled = ord.status === 'cancelled';
                      return (
                        <div
                          key={ord.id}
                          className={`rounded-2xl border p-4 text-xs ${
                            oReady
                              ? 'border-emerald-600/35 bg-emerald-50/70'
                              : 'border-[#0D1C11]/12 bg-white/85'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A5316]">
                                Order #{oNo} · {ord.orderType}
                                {ord.customer ? ` · ${ord.customer}` : ''}
                              </p>
                              <h5 className="mt-0.5 font-serif text-lg font-semibold text-[#08130B]">
                                {oMeta.customerLabel}
                              </h5>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const nextIds = removeSavedCustomerOrderId(ord.id);
                                setTrackedOrderIds(nextIds);
                                setTrackedOrders((prev) =>
                                  prev.filter((x) => x.id !== ord.id)
                                );
                                if (nextIds.length === 0) {
                                  setIsTrackerExpanded(false);
                                }
                              }}
                              className="rounded-full p-1 text-[#7A887E] hover:bg-black/5 hover:text-[#08130B]"
                              aria-label={`Dismiss order #${oNo}`}
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <p className="mt-1 text-[11px] text-[#394A3E]">
                            {oMeta.customerHint}
                          </p>

                          {!oCancelled && (
                            <div className="mt-3 grid grid-cols-4 gap-1.5">
                              {steps.map((label, idx) => {
                                const reached = oMeta.stepIndex >= idx;
                                return (
                                  <div key={label} className="space-y-1 text-center">
                                    <div
                                      className={`h-1.5 rounded-full ${
                                        reached
                                          ? oReady
                                            ? 'bg-emerald-600'
                                            : 'bg-[#0D1C11]'
                                          : 'bg-[#0D1C11]/15'
                                      }`}
                                    />
                                    <p
                                      className={`text-[9px] font-bold uppercase tracking-wider ${
                                        reached ? 'text-[#08130B]' : 'text-[#7A887E]'
                                      }`}
                                    >
                                      {label}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          <ul className="mt-3 space-y-1 border-t border-dashed border-[#0D1C11]/15 pt-2.5">
                            {ord.items.map((it, idx) => (
                              <li
                                key={`${it.name}-${idx}`}
                                className="flex items-center justify-between gap-2"
                              >
                                <span>
                                  <strong>{it.qty}×</strong> {it.name}
                                </span>
                                <span className="font-mono font-bold">
                                  {formatPeso(it.qty * it.price)}
                                </span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-2.5 flex items-center justify-between border-t border-dashed border-[#0D1C11]/15 pt-2 font-bold">
                            <span>Order Total</span>
                            <span className="font-serif text-base">
                              {formatPeso(ord.subtotal)}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    {trackedOrders.length > 1 && (
                      <div className="flex items-center justify-between rounded-2xl bg-[#08130B] px-4 py-3 text-xs text-[#FAF6EC]">
                        <span className="font-bold uppercase tracking-wider text-[#DFB96F]">
                          Combined Table Total
                        </span>
                        <span className="font-serif text-lg font-bold">
                          {formatPeso(
                            trackedOrders.reduce(
                              (sum, o) => sum + (o.subtotal || 0),
                              0
                            )
                          )}
                        </span>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setIsTrackerExpanded(false)}
                      className="w-full rounded-full bg-[#08130B] py-2.5 text-xs font-bold text-[#FAF6EC] transition hover:bg-[#152517]"
                    >
                      Continue Browsing
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      })()}

      {/* Floating Cart Pill — Always visible on #menu & inside Category Portals (sits above z-[44] portal, below z-[46] Customizer & z-[55] Tray Drawer) */}
      {trayCount > 0 && !isTrayOpen && (
        <div className="pointer-events-none fixed inset-x-0 bottom-[78px] z-[45] flex justify-center px-4 md:inset-x-auto md:bottom-6 md:right-6 md:justify-end md:px-0">
          <button
            type="button"
            onClick={() => setIsTrayOpen(true)}
            aria-label={`View your cart (${trayCount} items, ${formatPeso(traySubtotal)})`}
            className="pointer-events-auto flex w-full max-w-sm items-center justify-between gap-4 rounded-full border border-[#0D1C11]/25 bg-[#DFB96F] px-3.5 py-2.5 text-sm font-bold text-[#08130B] shadow-[0_18px_36px_-8px_rgba(8,19,11,0.55)] transition hover:bg-[#E7C88B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D1C11] active:scale-[0.99] md:w-auto md:min-w-[258px]"
          >
            <span className="inline-flex items-center gap-2.5">
              <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[#08130B] px-2 text-xs font-bold text-[#DFB96F]">
                {trayCount}
              </span>
              <span>View Cart</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-serif text-lg font-bold">
              {formatPeso(traySubtotal)}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>
        </div>
      )}

      {/* Floating Add-to-Tray Toast */}
      {toastText && (
        <div className="pointer-events-none fixed inset-x-0 bottom-[138px] z-[52] flex justify-center px-4 md:bottom-[84px]">
          <div className="piyo-toast-in rounded-full bg-[#0D1C11] px-4 py-2 text-xs font-semibold text-[#FAF6EC] shadow-lg ring-1 ring-[#D8B36A]/50">
            {toastText}
          </div>
        </div>
      )}
    </div>
  );
}
