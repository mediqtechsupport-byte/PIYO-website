import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

const CHAPTERS = [
  {
    num: '01',
    label: 'Negros Roots',
    text: 'Genuine batwan fruit, calamansi, tanglad, and fresh never-frozen cuts prepared every morning — recipes carried from Western Visayas family kitchens without shortcuts.',
  },
  {
    num: '02',
    label: 'Km. 64 Tagaytay Sanctuary',
    text: 'Opened in 2025 in Brgy. Bagong Tubig with stacked stone pillars, warm cove lighting, and a dedicated outdoor charcoal grill keeping the indoor dining room smoke-free.',
  },
  {
    num: '03',
    label: 'Built to Linger',
    text: 'Spacious 6–8 seater tables for Tagaytay road trips, early Friday–Sunday 7:00 AM silog mornings, and steaming complimentary Bacolod Cansi refills.',
  },
];

export function HistorySection({ onExploreCraft, onVisitPlace }) {
  return (
    <section
      id="history"
      className="relative flex flex-col justify-between overflow-hidden border-y border-[#DFB96F]/15 bg-[#06180E] text-[#FAF6EC] lg:min-h-[calc(100svh-var(--nav-h,69px))]"
    >
      {/* Mobile / Tablet Edge-to-Edge Straight-On Architectural Photo Header */}
      <div className="relative h-64 w-full sm:h-80 lg:hidden">
        <img
          src="./images/piyo-place-mobile.jpg"
          alt="PIYO Grill & Restaurant straight-on front exterior along Km. 64 Tagaytay–Nasugbu Highway"
          loading="lazy"
          className="h-full w-full object-cover object-[38%_46%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#06180E]/30 via-transparent to-[#06180E]" />
        <p className="absolute bottom-3 left-5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#DFB96F]/90">
          Km. 64 Tagaytay–Nasugbu Hwy · {RESTAURANT_INFO.established}
        </p>
      </div>

      {/* Desktop Full-Bleed Continuous 100% Architectural Canvas (Text Left, Seamlessly Blended Facade Right) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <img
          src="./images/piyo-place-real.jpg"
          alt="PIYO Grill & Restaurant straight-on architectural facade along Km. 64 Tagaytay–Nasugbu Highway"
          loading="lazy"
          className="h-full w-full object-cover object-[42%_52%]"
        />
        {/* Silky multi-stop left & right atmospheric dissolve into #06180E so facade emerges organically */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(6,24,14,1) 0%, rgba(6,24,14,0.98) 32%, rgba(6,24,14,0.82) 43%, rgba(6,24,14,0.40) 52%, rgba(6,24,14,0.08) 61%, rgba(6,24,14,0.0) 70%, rgba(6,24,14,0.18) 88%, rgba(6,24,14,0.86) 100%)',
          }}
        />
        {/* Warm golden evening hearth glow bridging narrative and illuminated stone pillars */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 46% 52% at 62% 52%, rgba(223,185,111,0.08) 0%, transparent 72%)',
          }}
        />
        {/* Deep top & bottom feather melting roof sky and pale driveway seamlessly into #06180E */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(6,24,14,0.92) 0%, rgba(6,24,14,0.38) 14%, rgba(6,24,14,0.0) 28%, rgba(6,24,14,0.0) 66%, rgba(6,24,14,0.68) 83%, rgba(6,24,14,0.98) 95%, rgba(6,24,14,1) 100%)',
          }}
        />
      </div>

      {/* Center Editorial Content Grid — Uniform max-w-7xl Rail Left, Blended Facade Right */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-10 pt-4 sm:px-8 lg:grid lg:grid-cols-12 lg:py-4 2xl:py-6">
        <div className="w-full max-w-[480px] lg:col-span-6">
          {/* Quiet Tracked Eyebrow */}
          <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-[#DFB96F]">
            <span>Our Story</span>
            <span className="h-px w-10 bg-[#DFB96F]/50" aria-hidden="true" />
            <span className="text-[#B8C8BE]">{RESTAURANT_INFO.established}</span>
          </div>

          {/* Authoritative Editorial Serif Headline */}
          <h2 className="mt-2.5 font-serif text-[2.15rem] font-normal leading-[1.06] tracking-[-0.015em] text-[#FAF6EC] sm:text-4xl lg:text-[2.6rem] 2xl:mt-3.5 2xl:text-[3.3rem]">
            From Negros Hearth{' '}
            <span className="block italic font-medium text-[#E0B96B]">
              to Tagaytay&rsquo;s Ridge.
            </span>
          </h2>

          <p className="mt-2.5 text-xs leading-relaxed text-[#D0DDD5] sm:text-sm sm:leading-6 2xl:mt-3.5 2xl:text-[15px] 2xl:leading-7">
            PIYO Grill &amp; Restaurant began with a simple promise along the
            cool highway mist of Bagong Tubig: serve honest, slow-simmered
            Negrense food and live charcoal sinugba in a calm room where every
            plate brings smiles.
          </p>

          {/* Soft Right-Fading Hairline Numbered Editorial Chapters */}
          <ol className="mt-4 2xl:mt-5">
            {CHAPTERS.map((chapter) => (
              <li key={chapter.num} className="relative">
                <span
                  aria-hidden="true"
                  className="block h-px w-full bg-gradient-to-r from-[#DFB96F]/30 via-[#FAF6EC]/12 to-transparent"
                />
                <div className="grid grid-cols-[2.2rem_1fr] items-baseline gap-x-3 py-2.5 2xl:py-3.5">
                  <span className="font-serif text-sm italic text-[#DFB96F]">
                    {chapter.num}
                  </span>
                  <div>
                    <h3 className="font-serif text-base font-medium tracking-wide text-[#FAF6EC] 2xl:text-lg">
                      {chapter.label}
                    </h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#BCCBC1] 2xl:mt-1 2xl:text-[13px]">
                      {chapter.text}
                    </p>
                  </div>
                </div>
              </li>
            ))}
            <span
              aria-hidden="true"
              className="block h-px w-full bg-gradient-to-r from-[#DFB96F]/30 via-[#FAF6EC]/12 to-transparent"
            />
          </ol>

          {/* Understated Editorial Actions */}
          <div className="mt-4 flex flex-wrap items-center gap-6 2xl:mt-6">
            <button
              type="button"
              onClick={onExploreCraft}
              className="group inline-flex min-h-[42px] items-center gap-2.5 rounded-full bg-[#DFB96F] px-6 py-2 text-xs font-bold tracking-wide text-[#06180E] transition hover:bg-[#E7C88B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] sm:text-sm"
            >
              <span>See #1 House Cansi</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={onVisitPlace}
              className="group inline-flex min-h-[42px] items-center gap-2 border-b border-[#DFB96F]/45 pb-0.5 text-xs font-medium tracking-wide text-[#E2ECE5] transition hover:border-[#DFB96F] hover:text-[#DFB96F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] sm:text-sm"
            >
              <MapPin className="h-3.5 w-3.5 text-[#DFB96F]" aria-hidden="true" />
              <span>Directions · Km. 64</span>
            </button>
          </div>
        </div>
      </div>

      {/* Unified Full-Width Architectural Horizon Bar Connecting Photo Left to Narrative Right */}
      <div className="relative z-10 hidden w-full lg:block">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between border-t border-[#FAF6EC]/12 px-5 py-3.5 text-[11px] sm:px-8 2xl:py-4">
          <div className="flex items-center gap-4">
            <span className="font-semibold uppercase tracking-[0.22em] text-[#DFB96F]">
              The House · {RESTAURANT_INFO.established}
            </span>
            <span className="h-px w-8 bg-[#FAF6EC]/20" aria-hidden="true" />
            <span className="font-serif text-sm text-[#FAF6EC]/85">
              Km. 64 Tagaytay–Nasugbu Highway, Brgy. Bagong Tubig
            </span>
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#FAF6EC]/55">
            14.08° N · Tagaytay Ridge · Smoke-Free Dining Hall
          </span>
        </div>
      </div>
    </section>
  );
}
