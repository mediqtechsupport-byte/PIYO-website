import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Globe, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from './data/menuData';
import { getTagaytayOpenStatus } from './utils/hours';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { DishDetailModal } from './components/DishDetailModal';
import { OrderTrayDrawer } from './components/OrderTrayDrawer';
import { HeritageAndReviews } from './components/HeritageAndReviews';
import { VisitAndReserveSection } from './components/VisitAndReserveSection';
import { InstallAppModal } from './components/InstallAppModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedDish, setSelectedDish] = useState(null);
  const [trayItems, setTrayItems] = useState([]);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [toastText, setToastText] = useState('');
  const [openStatus, setOpenStatus] = useState(() => getTagaytayOpenStatus());
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallOpen, setIsInstallOpen] = useState(false);

  // Refresh open status every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setOpenStatus(getTagaytayOpenStatus());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Capture browser PWA install prompt when available
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
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

  return (
    <div className="min-h-screen bg-[#F5EFE2] pb-20 md:pb-0">
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        trayCount={trayCount}
        onOpenTray={() => setIsTrayOpen(true)}
        openStatus={openStatus}
        canInstall={Boolean(deferredPrompt)}
        onOpenInstall={() => setIsInstallOpen(true)}
      />

      <main>
        <HeroSection
          onExploreMenu={() => scrollToSection('menu')}
          onBookTable={() => scrollToSection('visit')}
          openStatus={openStatus}
          onOpenInstall={() => setIsInstallOpen(true)}
        />

        <MenuSection
          onSelectDish={setSelectedDish}
          onQuickAdd={quickAddDish}
        />

        <HeritageAndReviews />

        <VisitAndReserveSection openStatus={openStatus} />
      </main>

      {/* Heritage Forest Green Footer */}
      <footer className="border-t border-[#D8B36A]/25 bg-[#0C2618] py-10 text-[#FAF6EC]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
          <div className="flex items-center gap-3.5">
            <img
              src="/logo.svg"
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

        <div className="mx-auto mt-6 max-w-6xl border-t border-white/10 px-4 pt-5 text-center text-[11px] text-[#9BB0A1] sm:px-6">
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

      {/* PWA Mobile Install Guide Modal */}
      <InstallAppModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
        deferredPrompt={deferredPrompt}
        onPromptHandled={() => setDeferredPrompt(null)}
      />

      {/* Floating Add-to-Tray Toast */}
      {toastText && (
        <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#143D28] px-4 py-2 text-xs font-semibold text-[#FAF6EC] shadow-lg ring-1 ring-[#D8B36A]/50 md:bottom-6">
          {toastText}
        </div>
      )}
    </div>
  );
}
