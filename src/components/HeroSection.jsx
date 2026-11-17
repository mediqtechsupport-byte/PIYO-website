import React from 'react';
import {
  UtensilsCrossed,
  MapPin,
  Clock,
  Star,
  Phone,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export function HeroSection({ onExploreMenu, onBookTable, openStatus }) {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#06180E] text-[#FAF6EC]"
    >
      {/* Facade Background Photo with Deep Heritage Forest Green Overlay */}
      <div className="absolute inset-0">
        <img
          src="./images/hero-facade.jpg"
          alt="PIYO Grill & Restaurant warm Tagaytay facade"
          className="h-full w-full object-cover object-center opacity-40 scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06180E]/85 via-[#0B2718]/80 to-[#06180E]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,179,106,0.18),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-7 sm:px-6 sm:pb-16 sm:pt-12 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Hero Column */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D8B36A]/45 bg-[#0B2718]/90 px-3 py-1 text-xs font-semibold tracking-wide text-[#D8B36A]">
                <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Tagaytay City · Negros Heritage &amp; Sinugba
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-[#FAF6EC]">
                <Star className="h-3.5 w-3.5 shrink-0 fill-[#D8B36A] text-[#D8B36A]" aria-hidden="true" />
                {RESTAURANT_INFO.rating.score} ★ Guest Favorite
              </span>
            </div>

            <h1 className="font-serif text-4xl font-semibold leading-[1.06] tracking-tight text-[#FAF6EC] sm:text-5xl xl:text-6xl">
              Bringing smiles{' '}
              <span className="block italic font-medium text-[#D8B36A]">
                to every plate.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#E2ECE5] sm:text-base lg:text-lg">
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

            {/* Primary Accessible CTAs */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#D8B36A] px-6 py-3 text-sm font-bold text-[#06180E] shadow-lg shadow-black/25 transition hover:bg-[#E5C685] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF6EC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06180E] active:scale-[0.99] sm:w-auto"
              >
                <UtensilsCrossed className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Explore Digital Menu</span>
                <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onBookTable}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#FAF6EC]/35 bg-[#113421]/90 px-6 py-3 text-sm font-semibold text-[#FAF6EC] backdrop-blur-sm transition hover:bg-[#16402A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B36A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06180E] sm:w-auto"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#D8B36A]" aria-hidden="true" />
                <span>Book a Table · {RESTAURANT_INFO.mobile}</span>
              </button>
            </div>

            {/* Key Facts Row */}
            <div className="mt-7 grid grid-cols-1 gap-4 border-t border-white/15 pt-5 sm:grid-cols-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D8B36A]" aria-hidden="true" />
                <div className="text-xs leading-relaxed text-[#E2ECE5] sm:text-sm">
                  <p className="font-semibold text-[#FAF6EC]">
                    Km. 64 Tagaytay–Nasugbu Hwy
                  </p>
                  <p className="text-xs text-[#CDD9D0]">
                    Brgy. Bagong Tubig, Tagaytay City, Cavite
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#D8B36A]" aria-hidden="true" />
                <div className="text-xs leading-relaxed text-[#E2ECE5] sm:text-sm">
                  <p className="font-semibold text-[#FAF6EC]">
                    {openStatus.statusText}
                  </p>
                  <p className="text-xs text-[#CDD9D0]">
                    Mon–Thu 11AM–8PM · Fri–Sun 7AM–10PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Signature Visual Card */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-[#D8B36A]/35 bg-[#0B2718]/92 p-4 shadow-2xl backdrop-blur-md sm:p-5 lg:ml-auto">
              {/* Circular Emblem Header */}
              <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src="./logo.svg"
                    alt="PIYO Emblem"
                    className="h-11 w-11 shrink-0 rounded-full ring-2 ring-[#D8B36A]/50 sm:h-12 sm:w-12"
                  />
                  <div>
                    <p className="font-serif text-lg font-semibold leading-tight text-[#FAF6EC] sm:text-xl">
                      Tonight&apos;s Signature Pair
                    </p>
                    <p className="text-xs text-[#D8B36A]">
                      Negros Comfort in Tagaytay
                    </p>
                  </div>
                </div>
                <span className="shrink-0 whitespace-nowrap rounded-full bg-[#06180E] px-2.5 py-1 text-[11px] font-semibold text-[#D8B36A]">
                  Dine-In · Takeout
                </span>
              </div>

              {/* Dual Dish Preview Grid */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={onExploreMenu}
                  aria-label="View Bacolod Cansi in the digital menu"
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#06180E]/75 text-left transition hover:border-[#D8B36A]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B36A]"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#113421]">
                    <img
                      src="./images/dish-kansi.jpg"
                      alt="Bacolod Cansi"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-2.5 sm:p-3">
                    <p className="text-xs font-bold text-[#FAF6EC] sm:text-sm">
                      Bacolod Cansi
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#D8B36A] sm:text-xs">
                      ₱666 · Free Soup Refill
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={onExploreMenu}
                  aria-label="View Bacolod Chicken Inasal in the digital menu"
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#06180E]/75 text-left transition hover:border-[#D8B36A]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B36A]"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#113421]">
                    <img
                      src="./images/dish-inasal.jpg"
                      alt="Bacolod Chicken Inasal"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-2.5 sm:p-3">
                    <p className="text-xs font-bold text-[#FAF6EC] sm:text-sm">
                      Chicken Inasal
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#D8B36A] sm:text-xs">
                      ₱401 · Banana Leaf Grill
                    </p>
                  </div>
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#06180E]/80 px-3.5 py-2.5 text-xs text-[#E5EDE7]">
                <span>Family 6–8 Seater Tables Available</span>
                <button
                  type="button"
                  onClick={onBookTable}
                  className="inline-flex min-h-[32px] shrink-0 items-center whitespace-nowrap font-bold text-[#D8B36A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B36A] rounded-md px-1"
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
