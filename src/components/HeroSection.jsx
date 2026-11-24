import React from 'react';
import {
  ArrowUpRight,
  Phone,
  Star,
  MapPin,
  Clock,
  Flame,
  Soup,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export function HeroSection({
  onExploreMenu,
  onSelectDishById,
  openStatus,
}) {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-between overflow-hidden bg-[#06180E] text-[#FAF6EC] lg:min-h-[calc(100svh-var(--nav-h,69px))]"
    >
      {/* Warm Illuminated Restaurant Facade & Dining Room Backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="./images/hero-facade.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full scale-[1.03] object-cover object-left opacity-45"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06180E]/92 via-[#082114]/76 to-[#06180E]/58" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06180E]/80 via-transparent to-[#05140C]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_44%,rgba(223,185,111,0.20),transparent_48%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_36%,rgba(223,185,111,0.10),transparent_42%)]" />
      </div>

      {/* Main Two-Column Hero Stage */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-10 lg:py-5">
        <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Left Editorial Column — Unified Flush Left/Right Editorial Measure */}
          <div className="w-full max-w-[496px] lg:col-span-6 xl:col-span-6">
            {/* Editorial Eyebrow with Gold Dot & Full-Width Hairline */}
            <div className="flex w-full items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#B7C7BD] sm:text-xs">
              <span className="inline-flex shrink-0 items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#DFB96F]"
                  aria-hidden="true"
                />
                Tagaytay City
              </span>
              <span
                className="h-px flex-1 bg-[#DFB96F]/45"
                aria-hidden="true"
              />
              <span className="shrink-0">Negros Heritage &amp; Sinugba</span>
            </div>

            {/* Display Serif Headline */}
            <h1 className="mt-5 font-serif text-[2.85rem] font-normal leading-[1.03] tracking-[-0.015em] text-[#FAF6EC] sm:text-6xl xl:text-[4.35rem]">
              Bringing smiles{' '}
              <span className="italic font-medium text-[#E0B96B]">to</span>
              <span className="block italic font-medium text-[#E0B96B]">
                every plate.
              </span>
            </h1>

            {/* Accent-Bordered Editorial Copy */}
            <p className="mt-6 w-full border-l-2 border-[#DFB96F]/55 pl-4 text-sm leading-relaxed text-[#D0DDD4] sm:text-[15px] sm:leading-7">
              Bacolod cansi with free soup refills, charcoal chicken inasal,
              sizzling plates and fresh coolers — served in the cool Tagaytay
              breeze.
            </p>

            {/* Quick Signature Highlights — Equal Side-by-Side Alignment */}
            <div className="mt-5 grid w-full grid-cols-3 gap-2.5">
              {['Charcoal Sinugba', 'Free Soup Refills', 'Dine-In · Takeout'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="flex items-center justify-center whitespace-nowrap rounded-full border border-white/15 bg-[#0B2718]/75 px-2.5 py-1.5 text-center text-[10.5px] font-medium tracking-wide text-[#D5E1D9] backdrop-blur-sm sm:text-[11px]"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            {/* Primary CTA & Direct Frosted Phone Button — Equal 50/50 Side-by-Side */}
            <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#DFB96F] px-6 py-3 text-sm font-semibold text-[#06180E] shadow-lg shadow-black/30 transition hover:bg-[#E7C88B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF6EC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06180E] active:scale-[0.99]"
              >
                <span>See the menu</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>

              <a
                href={`tel:${RESTAURANT_INFO.mobileTel}`}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-white/25 bg-[#0D2B1B]/75 px-5 py-3 text-sm font-medium tracking-wide text-[#FAF6EC] backdrop-blur-sm transition hover:border-[#DFB96F]/65 hover:bg-[#133A25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F]"
              >
                <Phone
                  className="h-4 w-4 shrink-0 text-[#DFB96F]"
                  aria-hidden="true"
                />
                <span>{RESTAURANT_INFO.mobile}</span>
              </a>
            </div>

            {/* Guest Favorite Rating Row — Aligned Across Full Measure */}
            <div className="mt-6 flex w-full flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-5 sm:mt-7">
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center gap-1"
                  aria-label={`Rated ${RESTAURANT_INFO.rating.score} out of 5 stars`}
                >
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-[#DFB96F] text-[#DFB96F]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <strong className="text-sm font-semibold text-[#FAF6EC]">
                  {RESTAURANT_INFO.rating.score}
                </strong>
              </div>
              <p className="text-xs text-[#C0CEC5] sm:text-sm">
                Guest favorite along Tagaytay–Nasugbu Hwy
              </p>
            </div>
          </div>

          {/* Right Layered Arched Showcase & Interactive Cards */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative mx-auto w-full max-w-[330px] pb-7 pt-2 sm:max-w-[395px] lg:ml-auto lg:mr-6 xl:max-w-[420px]">
              {/* Decorative Gold Architectural Double-Arch Halo */}
              <div
                className="pointer-events-none absolute -bottom-0 left-3 right-0 top-0 translate-x-2 -translate-y-1.5 rounded-t-[9999px] border border-[#DFB96F]/30 sm:translate-x-3"
                aria-hidden="true"
              />

              {/* Primary Tall Roman Arch Dish Frame */}
              <button
                type="button"
                onClick={() => onSelectDishById('bacolod-chicken-inasal')}
                aria-label="Inspect Chicken Inasal — Tonight's Pick"
                className="group relative block aspect-[3/4] w-full overflow-hidden rounded-t-[9999px] rounded-b-sm bg-[#0B2718] shadow-[0_28px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-[#DFB96F]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F]"
              >
                <img
                  src="./images/hero-inasal-arch.jpg"
                  alt="Charcoal Chicken Inasal served on banana leaf overlooking misty Tagaytay hills"
                  className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06180E]/45 via-transparent to-transparent" />
              </button>

              {/* Bottom-Left Overlapping Pick Card */}
              <button
                type="button"
                onClick={() => onSelectDishById('bacolod-chicken-inasal')}
                className="group absolute bottom-0 left-2 z-10 flex items-center gap-3 rounded-xl border border-[#DFB96F]/30 bg-[#0F291A]/95 px-4 py-3 text-left shadow-[0_18px_36px_-10px_rgba(0,0,0,0.65)] backdrop-blur-md transition hover:border-[#DFB96F]/75 hover:bg-[#143522] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] sm:-left-10 sm:rounded-2xl sm:px-5 sm:py-3.5"
              >
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#DFB96F] sm:text-[11px]">
                    Tonight&apos;s Pick
                  </span>
                  <span className="mt-0.5 block whitespace-nowrap font-serif text-lg font-semibold leading-tight text-[#FAF6EC] transition-colors group-hover:text-[#DFB96F] sm:text-[1.35rem]">
                    Chicken Inasal · ₱366
                  </span>
                  <span className="mt-0.5 block text-[11px] text-[#B7C7BD]">
                    Banana Leaf · Annatto Grill
                  </span>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-[#DFB96F] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Anchoring Atmospheric Info Strip */}
      <div className="relative border-t border-white/10 bg-[#05140C]/80 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-3.5 px-5 py-4 sm:px-8 lg:grid-cols-4">
          <div className="flex items-start gap-2.5 sm:items-center">
            <MapPin
              className="mt-0.5 h-4 w-4 shrink-0 text-[#DFB96F] sm:mt-0"
              aria-hidden="true"
            />
            <div className="min-w-0 text-xs leading-snug">
              <p className="font-semibold text-[#FAF6EC]">
                Km. 64 Tagaytay–Nasugbu Hwy
              </p>
              <p className="mt-0.5 text-[11px] text-[#9EB2A6]">
                Brgy. Bagong Tubig, Cavite
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 sm:items-center">
            <Clock
              className="mt-0.5 h-4 w-4 shrink-0 text-[#DFB96F] sm:mt-0"
              aria-hidden="true"
            />
            <div className="min-w-0 text-xs leading-snug">
              <p className="font-semibold text-[#FAF6EC]">
                {openStatus.statusText}
              </p>
              <p className="mt-0.5 text-[11px] text-[#9EB2A6]">
                Mon–Thu 11AM–8PM · Fri–Sun 7AM–10PM
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 sm:items-center">
            <Soup
              className="mt-0.5 h-4 w-4 shrink-0 text-[#DFB96F] sm:mt-0"
              aria-hidden="true"
            />
            <div className="min-w-0 text-xs leading-snug">
              <p className="font-semibold text-[#FAF6EC]">
                Free Soup Refills
              </p>
              <p className="mt-0.5 text-[11px] text-[#9EB2A6]">
                Authentic Ilonggo Batwan Cansi
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 sm:items-center">
            <Flame
              className="mt-0.5 h-4 w-4 shrink-0 text-[#DFB96F] sm:mt-0"
              aria-hidden="true"
            />
            <div className="min-w-0 text-xs leading-snug">
              <p className="font-semibold text-[#FAF6EC]">
                Smoke-Free Dining Hall
              </p>
              <p className="mt-0.5 text-[11px] text-[#9EB2A6]">
                Family 6–8 Seater Tables Ready
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
