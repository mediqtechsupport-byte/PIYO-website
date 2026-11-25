import React, { useState, useEffect, useRef } from 'react';
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
import { DishDetailModal } from './components/DishDetailModal';
import { OrderTrayDrawer } from './components/OrderTrayDrawer';
import { HeritageAndReviews } from './components/HeritageAndReviews';
import { VisitAndReserveSection } from './components/VisitAndReserveSection';
import { KitchenDashboard } from './components/KitchenDashboard';

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
  const lastStatusMapRef = useRef({});
  const snapLockUntilRef = useRef(0);

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

  // Full-page boundary-aware scroll snap across every section on BOTH mobile & desktop:
  // 1. Desktop wheel smoothly steps across landing chapters (#home <-> #history <-> #craft <-> #spotlight <-> #menu)
  // 2. Touch, momentum, scrollbar, and wheel settle snapping guarantees you ALWAYS land cleanly on each page
  //    (e.g. #menu with zero #spotlight "198 likes" lapse above it), while letting #spotlight's 5-dish orbit
  //    and multi-screen sections scroll naturally inside themselves.
  useEffect(() => {
    const CHAPTER_IDS = ['home', 'history', 'craft', 'spotlight'];
    let lastScrollY = window.scrollY;
    let lastDir = 0;
    let isTouching = false;
    let settleTimer = null;
    let flushTimer = null;

    const getStickyOffset = () => {
      const header = document.querySelector('header');
      return header ? Math.ceil(header.getBoundingClientRect().bottom) : 69;
    };

    const getBottomNavHeight = () => {
      const bottomNav = document.querySelector(
        'nav[aria-label="Mobile bottom navigation"]'
      );
      return bottomNav ? Math.ceil(bottomNav.getBoundingClientRect().height) : 0;
    };

    const getPageMetrics = () => {
      const stickyOffset = getStickyOffset();
      const bottomNavH = getBottomNavHeight();
      const stageH = Math.max(280, window.innerHeight - stickyOffset - bottomNavH);
      const isDesktop = window.innerWidth >= 1024;
      const ids = isDesktop
        ? ['home', 'history', 'craft', 'spotlight', 'menu', 'heritage', 'reviews', 'visit']
        : ['home', 'history', 'craft', 'spotlight', 'menu', 'heritage', 'reviews', 'book-table', 'visit-info'];
      const y = window.scrollY;
      const pages = [];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const startY = Math.max(0, Math.round(rect.top + y - stickyOffset));
        const height = Math.round(rect.height);
        const isSinglePage = id !== 'spotlight' && height <= stageH + 36;
        const internalEndY = isSinglePage
          ? startY
          : startY + Math.max(0, height - stageH);
        pages.push({
          id,
          el,
          startY,
          endY: startY + height,
          height,
          internalEndY,
        });
      }
      return { pages, stickyOffset, bottomNavH, stageH };
    };

    const isInteractionBlocked = () => {
      if (selectedDish || isTrayOpen || isKitchenView) return true;
      if (
        document.body.style.overflow === 'hidden' ||
        document.documentElement.style.overflow === 'hidden'
      ) {
        return true;
      }
      const active = document.activeElement;
      if (
        active &&
        (active.tagName === 'INPUT' ||
          active.tagName === 'TEXTAREA' ||
          active.tagName === 'SELECT')
      ) {
        return true;
      }
      return false;
    };

    const glideFlushTo = (targetY, lockMs = 560) => {
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const clamped = Math.max(0, Math.min(Math.round(targetY), maxScroll));
      if (Math.abs(clamped - window.scrollY) <= 1) return;

      const now = Date.now();
      snapLockUntilRef.current = now + lockMs;
      window.__piyoNavLockUntil = now + lockMs + 140;
      ScrollTrigger.getAll().forEach((st) => {
        st.getTween?.()?.kill();
      });

      window.scrollTo({ top: clamped, behavior: 'smooth' });

      if (flushTimer) window.clearTimeout(flushTimer);
      flushTimer = window.setTimeout(() => {
        if (isTouching || isInteractionBlocked()) return;
        const delta = Math.abs(window.scrollY - clamped);
        if (delta > 1 && delta <= 44) {
          ScrollTrigger.getAll().forEach((st) => {
            st.getTween?.()?.kill();
          });
          window.scrollTo({ top: clamped, behavior: 'instant' });
        }
      }, lockMs - 60);
    };

    const settleToCleanPage = () => {
      if (isTouching || isInteractionBlocked()) return;
      const now = Date.now();
      if (now < snapLockUntilRef.current || now < (window.__piyoNavLockUntil || 0)) {
        return;
      }

      const y = window.scrollY;
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      if (y <= 1 || maxScroll - y <= 16) return;

      const { pages } = getPageMetrics();
      if (pages.length < 2) return;

      for (let i = 0; i < pages.length; i += 1) {
        const curr = pages[i];
        const next = pages[i + 1];

        // Inside a page's clean self-contained scroll range (including #spotlight's 5-dish orbit):
        // zero neighboring section is visible, so leave scroll untouched!
        if (y >= curr.startY - 2 && y <= curr.internalEndY + 2) {
          return;
        }

        // In the boundary seam between page `curr` and page `next` (a "page lapse" zone):
        // snap cleanly to `next.startY` or back to `curr.internalEndY` so zero sliver peeks!
        if (next && y > curr.internalEndY + 2 && y < next.startY - 2) {
          const span = Math.max(1, next.startY - curr.internalEndY);
          const progress = (y - curr.internalEndY) / span;
          const goNext =
            lastDir > 0
              ? progress >= 0.14
              : lastDir < 0
              ? progress > 0.86
              : progress >= 0.5;
          glideFlushTo(goNext ? next.startY : curr.internalEndY, 540);
          return;
        }
      }
    };

    const scheduleSettle = (delayMs = 135) => {
      if (settleTimer) window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settleToCleanPage, delayMs);
    };

    const handleScroll = () => {
      const currY = window.scrollY;
      const diff = currY - lastScrollY;
      if (Math.abs(diff) >= 1) {
        lastDir = diff > 0 ? 1 : -1;
        lastScrollY = currY;
      }
      if (
        isTouching ||
        isInteractionBlocked() ||
        Date.now() < snapLockUntilRef.current ||
        Date.now() < (window.__piyoNavLockUntil || 0)
      ) {
        return;
      }
      scheduleSettle(140);
    };

    const handleScrollEnd = () => {
      if (settleTimer) window.clearTimeout(settleTimer);
      settleToCleanPage();
    };

    const handleTouchStart = () => {
      isTouching = true;
      if (settleTimer) window.clearTimeout(settleTimer);
      if (flushTimer) window.clearTimeout(flushTimer);
    };

    const handleTouchEnd = () => {
      isTouching = false;
      scheduleSettle(160);
    };

    const handleWheel = (e) => {
      if (window.innerWidth < 1024 || isInteractionBlocked()) return;
      if (Math.abs(e.deltaY) < 16 || e.ctrlKey) return;

      const STICKY_OFFSET = getStickyOffset();
      const spotlightEl = document.getElementById('spotlight');
      const menuEl = document.getElementById('menu');
      const goingDown = e.deltaY > 0;

      // Once inside #menu or lower, handle smooth upward return to #spotlight Dish #5
      // when scrolling up from the top of #menu, and let settle snap keep every lower boundary flush
      if (menuEl) {
        const menuTop = menuEl.getBoundingClientRect().top;
        if (goingDown && menuTop <= STICKY_OFFSET + 16) return;
        if (!goingDown && menuTop < STICKY_OFFSET - 12) return;
        if (!goingDown && menuTop >= STICKY_OFFSET - 12 && menuTop <= STICKY_OFFSET + 20 && spotlightEl) {
          const now = Date.now();
          if (now < snapLockUntilRef.current) {
            e.preventDefault();
            return;
          }
          const stageH = Math.max(280, window.innerHeight - STICKY_OFFSET);
          const sRect = spotlightEl.getBoundingClientRect();
          const sStart = Math.max(0, Math.round(sRect.top + window.scrollY - STICKY_OFFSET));
          const sEnd = sStart + Math.max(0, Math.round(sRect.height) - stageH);
          e.preventDefault();
          glideFlushTo(sEnd, 460);
          return;
        }
      }

      // Inside #spotlight (GSAP ScrollTrigger Dish Orbit Carousel):
      // Let native scroll drive the orbiting plates between Dish #1 and Dish #5!
      if (spotlightEl) {
        const sRect = spotlightEl.getBoundingClientRect();
        const inSpotlightZone = sRect.top <= STICKY_OFFSET + 12 && sRect.bottom > STICKY_OFFSET + 40;

        if (inSpotlightZone) {
          // Only step back UP to #craft if we're right at the top of #spotlight scrolling up
          if (!goingDown && sRect.top >= STICKY_OFFSET - 14) {
            const craftEl = document.getElementById('craft');
            if (craftEl) {
              const now = Date.now();
              if (now < snapLockUntilRef.current) {
                e.preventDefault();
                return;
              }
              const targetY = Math.max(
                0,
                Math.round(craftEl.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET)
              );
              e.preventDefault();
              glideFlushTo(targetY, 440);
            }
            return;
          }

          // Only step smoothly into #menu once we've reached the end (Dish #5) of #spotlight
          if (goingDown && sRect.bottom <= window.innerHeight + 16 && menuEl) {
            const now = Date.now();
            if (now < snapLockUntilRef.current) {
              e.preventDefault();
              return;
            }
            const targetY = Math.max(
              0,
              Math.round(menuEl.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET)
            );
            e.preventDefault();
            glideFlushTo(targetY, 460);
            return;
          }

          // Otherwise inside #spotlight's 5-dish orbit track -> DO NOT intercept wheel!
          return;
        }
      }

      const now = Date.now();
      if (now < snapLockUntilRef.current) {
        e.preventDefault();
        return;
      }

      const elements = CHAPTER_IDS.map((id) => document.getElementById(id)).filter(Boolean);
      if (elements.length < 2) return;

      let currentIdx = 0;
      for (let i = 0; i < elements.length; i += 1) {
        const rect = elements[i].getBoundingClientRect();
        if (rect.top <= STICKY_OFFSET + 90) {
          currentIdx = i;
        }
      }

      const targetIdx = goingDown
        ? Math.min(currentIdx + 1, elements.length - 1)
        : Math.max(currentIdx - 1, 0);

      if (targetIdx === currentIdx) return;

      const targetEl = elements[targetIdx];
      const targetY = Math.max(
        0,
        Math.round(targetEl.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET)
      );

      if (!goingDown && currentIdx === 0 && window.scrollY <= 4) return;
      if (Math.abs(window.scrollY - targetY) < 8) return;

      e.preventDefault();
      glideFlushTo(targetY, 440);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scrollend', handleScrollEnd, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    return () => {
      if (settleTimer) window.clearTimeout(settleTimer);
      if (flushTimer) window.clearTimeout(flushTimer);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scrollend', handleScrollEnd);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [selectedDish, isTrayOpen, isKitchenView]);

  // Track active section while scrolling
  useEffect(() => {
    const ids = ['home', 'history', 'craft', 'menu', 'heritage', 'reviews', 'visit'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-30% 0px -55% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (!el) return;

    // Prevent GSAP #spotlight ScrollTrigger snap from fighting navigation jumps
    window.__piyoNavLockUntil = Date.now() + 1100;
    ScrollTrigger.getAll().forEach((st) => {
      st.getTween?.()?.kill();
    });

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

    const alignFlush = () => {
      ScrollTrigger.getAll().forEach((st) => {
        st.getTween?.()?.kill();
      });
      const settledY = getTargetY();
      if (Math.abs(settledY - window.scrollY) > 1) {
        window.scrollTo({ top: settledY, behavior: 'instant' });
      }
    };

    const targetY = getTargetY();
    const isLargeJump =
      Math.abs(targetY - window.scrollY) > window.innerHeight * 0.9 ||
      id === 'menu' ||
      id === 'visit' ||
      id === 'home';

    window.scrollTo({
      top: targetY,
      behavior: isLargeJump ? 'instant' : 'smooth',
    });

    // Double-check flush alignment after GSAP / mobile sticky chrome settles
    window.setTimeout(alignFlush, isLargeJump ? 40 : 420);
    window.setTimeout(alignFlush, isLargeJump ? 220 : 720);
  };

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
    window.location.hash = 'kitchen';
    setIsKitchenView(true);
  };

  const exitKitchenView = () => {
    if (window.location.pathname.toLowerCase().endsWith('/kitchen')) {
      window.history.replaceState(null, '', '/');
    } else {
      window.location.hash = '';
    }
    setIsKitchenView(false);
  };

  if (isKitchenView) {
    return <KitchenDashboard onExit={exitKitchenView} />;
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
    <div
      className={`min-h-screen bg-[#F5EFE2] ${
        trayCount > 0 && !isTrayOpen ? 'pb-36 md:pb-20' : 'pb-20 md:pb-0'
      }`}
    >
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
        <div className="border-b border-[#DFB96F]/30 bg-[#08130B] px-4 py-2 text-center text-xs text-[#FAF6EC]">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2">
            <QrCode className="h-3.5 w-3.5 text-[#DFB96F]" />
            <span>
              Dine-In QR active for <strong className="text-[#DFB96F]">Table #{activeTable}</strong> —
              your table number is auto-filled in your order tray.
            </span>
          </div>
        </div>
      )}

      <main>
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
      <footer className="border-t border-[#D8B36A]/25 bg-[#08130B] py-10 text-[#FAF6EC]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 text-center sm:flex-row sm:px-8 sm:text-left">
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

      {/* Dish Detail Sheet/Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToTray={addToTray}
      />

      {/* Order & Table Tray Drawer */}
      <OrderTrayDrawer
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
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
            <div className="pointer-events-none fixed bottom-[78px] left-4 right-4 z-[36] flex justify-start md:bottom-6 md:left-6 md:right-auto">
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
                className="fixed inset-0 z-[60] flex items-center justify-center bg-[#061009]/75 p-4 backdrop-blur-sm"
                onClick={() => setIsTrackerExpanded(false)}
                role="dialog"
                aria-modal="true"
                aria-label="Live order status"
              >
                <div
                  className="flex max-h-[86dvh] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-[#DFB96F]/35 bg-[#FAF6EC] text-[#08130B] shadow-2xl"
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

      {/* Floating Side Tray Pill (Bottom-Right on Desktop, hidden on Desktop #menu where My Order sidebar is live) */}
      {trayCount > 0 && !isTrayOpen && (
        <div
          className={`pointer-events-none fixed inset-x-0 bottom-[78px] z-[35] flex justify-center px-4 md:inset-x-auto md:bottom-6 md:right-6 md:justify-end md:px-0 ${
            activeSection === 'menu' ? 'lg:hidden' : ''
          }`}
        >
          <button
            type="button"
            onClick={() => setIsTrayOpen(true)}
            aria-label={`View your tray (${trayCount} items, ${formatPeso(traySubtotal)})`}
            className="pointer-events-auto flex w-full max-w-sm items-center justify-between gap-4 rounded-full border border-[#0D1C11]/20 bg-[#DFB96F] px-3.5 py-2.5 text-sm font-bold text-[#08130B] shadow-[0_18px_36px_-8px_rgba(8,19,11,0.45)] transition hover:bg-[#E7C88B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D1C11] active:scale-[0.99] md:w-auto md:min-w-[248px]"
          >
            <span className="inline-flex items-center gap-2.5">
              <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[#08130B] px-2 text-xs font-bold text-[#DFB96F]">
                {trayCount}
              </span>
              <span>View your tray</span>
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
        <div className="fixed bottom-[138px] left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#0D1C11] px-4 py-2 text-xs font-semibold text-[#FAF6EC] shadow-lg ring-1 ring-[#D8B36A]/50 md:bottom-[84px]">
          {toastText}
        </div>
      )}
    </div>
  );
}
