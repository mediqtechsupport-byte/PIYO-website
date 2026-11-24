import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Globe, Heart, ArrowRight } from 'lucide-react';
import { RESTAURANT_INFO, MENU_ITEMS } from './data/menuData';
import { getTagaytayOpenStatus, formatPeso } from './utils/hours';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GrillPromiseSection } from './components/GrillPromiseSection';
import { SignatureOrbitSection } from './components/SignatureOrbitSection';
import { MenuSection } from './components/MenuSection';
import { DishDetailModal } from './components/DishDetailModal';
import { OrderTrayDrawer } from './components/OrderTrayDrawer';
import { HeritageAndReviews } from './components/HeritageAndReviews';
import { VisitAndReserveSection } from './components/VisitAndReserveSection';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedDish, setSelectedDish] = useState(null);
  const [trayItems, setTrayItems] = useState([]);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [toastText, setToastText] = useState('');
  const [openStatus, setOpenStatus] = useState(() => getTagaytayOpenStatus());

  // Refresh open status every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setOpenStatus(getTagaytayOpenStatus());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Track active section while scrolling
  useEffect(() => {
    const ids = ['home', 'menu', 'heritage', 'reviews', 'visit'];
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
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      />

      <main>
        <HeroSection
          onExploreMenu={() => scrollToSection('menu')}
          openStatus={openStatus}
          onSelectDishById={(id) =>
            setSelectedDish(
              MENU_ITEMS.find((item) => item.id === id) ||
                MENU_ITEMS[0] ||
                null
            )
          }
        />

        <GrillPromiseSection
          onExploreGrill={() => scrollToSection('menu')}
          onInspectFishDish={() =>
            setSelectedDish(
              MENU_ITEMS.find((item) => item.id === 'grilled-bangus') || null
            )
          }
        />

        <SignatureOrbitSection onSelectMenuDish={setSelectedDish} />

        <MenuSection
          onSelectDish={setSelectedDish}
          onQuickAdd={quickAddDish}
          trayItems={trayItems}
          onUpdateTrayQty={updateTrayQty}
        />

        <HeritageAndReviews />

        <VisitAndReserveSection openStatus={openStatus} />
      </main>

      {/* Heritage Forest Green Footer */}
      <footer className="border-t border-[#D8B36A]/25 bg-[#06180E] py-10 text-[#FAF6EC]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
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

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={RESTAURANT_INFO.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3.5 py-2 text-xs font-semibold text-[#FAF6EC] transition hover:bg-white/15"
            >
              <Facebook className="h-3.5 w-3.5 text-[#D8B36A]" />
              <span>Facebook</span>
            </a>
            <a
              href={RESTAURANT_INFO.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3.5 py-2 text-xs font-semibold text-[#FAF6EC] transition hover:bg-white/15"
            >
              <Instagram className="h-3.5 w-3.5 text-[#D8B36A]" />
              <span>Instagram</span>
            </a>
            <a
              href={RESTAURANT_INFO.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3.5 py-2 text-xs font-semibold text-[#FAF6EC] transition hover:bg-white/15"
            >
              <Globe className="h-3.5 w-3.5 text-[#D8B36A]" />
              <span>piyogrill.com</span>
            </a>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-7xl border-t border-white/10 px-4 pt-5 text-center text-[11px] text-[#9BB0A1] sm:px-6">
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
      />

      {/* Floating Bottom Tray Bar */}
      {trayCount > 0 && !isTrayOpen && (
        <div className="pointer-events-none fixed inset-x-0 bottom-[78px] z-[35] flex justify-center px-4 md:bottom-6">
          <button
            type="button"
            onClick={() => setIsTrayOpen(true)}
            aria-label={`View your tray (${trayCount} items, ${formatPeso(traySubtotal)})`}
            className="pointer-events-auto flex w-full max-w-sm items-center justify-between gap-4 rounded-full border border-[#0B2718]/20 bg-[#DFB96F] px-3.5 py-2.5 text-sm font-bold text-[#06180E] shadow-[0_18px_36px_-8px_rgba(6,24,14,0.45)] transition hover:bg-[#E7C88B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2718] active:scale-[0.99]"
          >
            <span className="inline-flex items-center gap-2.5">
              <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[#06180E] px-2 text-xs font-bold text-[#DFB96F]">
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
        <div className="fixed bottom-[138px] left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#0B2718] px-4 py-2 text-xs font-semibold text-[#FAF6EC] shadow-lg ring-1 ring-[#D8B36A]/50 md:bottom-[84px]">
          {toastText}
        </div>
      )}
    </div>
  );
}
