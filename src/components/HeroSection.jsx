import React from 'react';
import {
  UtensilsCrossed,
  MapPin,
  Clock,
  Star,
  Phone,
  Sparkles,
  Download,
  ChevronRight,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export function HeroSection({ onExploreMenu, onBookTable, openStatus, onOpenInstall }) {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#0C2618] text-[#FAF6EC]"
    >
      {/* Facade Background Photo with Deep Heritage Forest Green Overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-facade.jpg"
          alt="PIYO Grill & Restaurant warm Tagaytay facade"
          className="h-full w-full object-cover object-center opacity-45 scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C2618]/85 via-[#143D28]/80 to-[#0C2618]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,179,106,0.18),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-14 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Hero Column */}
          <div className="lg:col-span-7">
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D8B36A]/45 bg-[#143D28]/90 px-3 py-1 text-xs font-semibold tracking-wide text-[#D8B36A]">
                <Sparkles className="h-3.5 w-3.5" />
                Tagaytay City · Negros Heritage &amp; Sinugba
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-[#FAF6EC]/90">
                <Star className="h-3.5 w-3.5 fill-[#D8B36A] text-[#D8B36A]" />
                {RESTAURANT_INFO.rating.score} ★ Guest Favorite
              </span>
            </div>

            <h1 className="font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-[#FAF6EC] sm:text-5xl lg:text-6xl">
              Bringing smiles{' '}
              <span className="italic font-medium text-[#D8B36A]">
                to every plate.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#D8E3DB] sm:text-base lg:text-lg">
              {RESTAURANT_INFO.heroSubheadline} Warm up with authentic{' '}
              <strong className="font-semibold text-[#FAF6EC]">
                Bacolod Cansi
              </strong>{' '}
              (with free soup refills!), charcoal{' '}
              <strong className="font-semibold text-[#FAF6EC]">
                Chicken Inasal
              </strong>
              , sizzling plates, and fresh coolers along Km. 64 Tagaytay–Nasugbu Highway.
            </p>

            {/* Primary CTAs */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D8B36A] px-6 py-3.5 text-sm font-bold text-[#0C2618] shadow-lg shadow-black/25 transition hover:bg-[#E5C685] active:scale-[0.99]"
              >
                <UtensilsCrossed className="h-4 w-4" />
                <span>Explore Digital Menu</span>
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onBookTable}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#FAF6EC]/30 bg-[#1B4E33]/85 px-6 py-3.5 text-sm font-semibold text-[#FAF6EC] backdrop-blur-sm transition hover:bg-[#255E40]"
              >
                <Phone className="h-4 w-4 text-[#D8B36A]" />
                <span>Book a Table · {RESTAURANT_INFO.mobile}</span>
              </button>

              <button
                type="button"
                onClick={onOpenInstall}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-xs font-medium text-[#E5EDE7] transition hover:bg-white/15 sm:py-3.5"
              >
                <Download className="h-3.5 w-3.5 text-[#D8B36A]" />
                <span>Install Mobile App</span>
              </button>
            </div>

            {/* Key Facts Row */}
            <div className="mt-7 grid grid-cols-1 gap-3 border-t border-white/15 pt-6 sm:grid-cols-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D8B36A]" />
                <div className="text-xs leading-relaxed text-[#D8E3DB]">
                  <p className="font-semibold text-[#FAF6EC]">
                    Km. 64 Tagaytay–Nasugbu Hwy
                  </p>
                  <p>Brgy. Bagong Tubig, Tagaytay City, Cavite</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#D8B36A]" />
                <div className="text-xs leading-relaxed text-[#D8E3DB]">
                  <p className="font-semibold text-[#FAF6EC]">
                    {openStatus.statusText}
                  </p>
                  <p>Mon–Thu 11AM–8PM · Fri–Sun 7AM–10PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Signature Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl border border-[#D8B36A]/35 bg-[#143D28]/90 p-4 shadow-2xl backdrop-blur-md sm:p-5">
              {/* Circular Emblem Header */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.svg"
                    alt="PIYO Emblem"
                    className="h-12 w-12 rounded-full ring-2 ring-[#D8B36A]/50"
                  />
                  <div>
                    <p className="font-serif text-lg font-semibold text-[#FAF6EC]">
                      Tonight&apos;s Signature Pair
                    </p>
                    <p className="text-xs text-[#D8B36A]">
                      Negros Comfort in Tagaytay
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-[#0C2618] px-2.5 py-1 text-[11px] font-semibold text-[#D8B36A]">
                  Dine-In · Takeout
                </span>
              </div>

              {/* Dual Dish Preview Grid */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={onExploreMenu}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0C2618]/70 text-left transition hover:border-[#D8B36A]/50"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#1B4E33]">
                    <img
                      src="/images/dish-kansi.jpg"
                      alt="Bacolod Cansi"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-bold text-[#FAF6EC]">
                      Bacolod Cansi
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#D8B36A]">
                      ₱666 · Free Soup Refill
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={onExploreMenu}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0C2618]/70 text-left transition hover:border-[#D8B36A]/50"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#1B4E33]">
                    <img
                      src="/images/dish-inasal.jpg"
                      alt="Bacolod Chicken Inasal"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-bold text-[#FAF6EC]">
                      Chicken Inasal
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#D8B36A]">
                      ₱401 · Banana Leaf Grill
                    </p>
                  </div>
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2 rounded-2xl bg-[#0C2618]/75 px-3.5 py-2.5 text-xs text-[#E5EDE7]">
                <span className="min-w-0 truncate">Family 6–8 Seater Tables Available</span>
                <button
                  type="button"
                  onClick={onBookTable}
                  className="shrink-0 whitespace-nowrap font-bold text-[#D8B36A] hover:underline"
                >
                  Inquire →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
