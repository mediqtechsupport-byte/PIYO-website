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
      className="relative flex flex-col justify-center overflow-hidden border-y border-[#DFB96F]/15 bg-[#06180E] text-[#FAF6EC] lg:min-h-[calc(100svh-var(--nav-h,69px))]"
    >
      {/* Mobile / Tablet Edge-to-Edge Architectural Photo Header (No Card Box) */}
      <div className="relative h-64 w-full sm:h-80 lg:hidden">
        <img
          src="./images/piyo-place-real.jpg"
          alt="PIYO Grill & Restaurant nighttime exterior along Km. 64 Tagaytay–Nasugbu Highway"
          loading="lazy"
          className="h-full w-full object-cover object-[42%_42%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#06180E]/30 via-transparent to-[#06180E]" />
        <p className="absolute bottom-3 left-5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#DFB96F]/90">
          Km. 64 Tagaytay–Nasugbu Hwy · {RESTAURANT_INFO.established}
        </p>
      </div>

      {/* Desktop Seamless Full-Bleed Architectural Photo Layer (Sharp, Unboxed, Melting into Pine Right Canvas) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[60%] lg:block">
        <img
          src="./images/piyo-place-real.jpg"
          alt="PIYO Grill & Restaurant nighttime exterior along Km. 64 Tagaytay–Nasugbu Highway"
          loading="lazy"
          className="h-full w-full object-cover object-[42%_44%]"
        />
        {/* Seamless organic fade into deep forest green right edge + subtle top/bottom architectural framing */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(6,24,14,0.18) 0%, rgba(6,24,14,0.06) 46%, rgba(6,24,14,0.72) 78%, #06180E 98%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(6,24,14,0.48) 0%, transparent 22%, transparent 72%, rgba(6,24,14,0.88) 100%)',
          }}
        />

        {/* Quiet Editorial Architectural Caption (No Card / No Pill Border) */}
        <div className="absolute bottom-7 left-8 right-12 flex items-end justify-between border-t border-[#FAF6EC]/15 pt-3.5 xl:left-12">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#DFB96F]">
              The House · {RESTAURANT_INFO.established}
            </p>
            <p className="mt-1 font-serif text-base text-[#FAF6EC]/90">
              Km. 64 Tagaytay–Nasugbu Highway, Brgy. Bagong Tubig
            </p>
          </div>
          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-[#FAF6EC]/55 xl:inline">
            14.08° N · Tagaytay Ridge
          </span>
        </div>
      </div>

      {/* Editorial Narrative Column (Pure Typography + Hairlines — Zero AI Cards) */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-12 pt-4 sm:px-8 lg:grid lg:grid-cols-12 lg:items-center lg:px-10 lg:py-5 2xl:px-14 2xl:py-8">
        <div className="lg:col-span-6 lg:col-start-7 lg:pl-8 2xl:pl-14">
          {/* Quiet Tracked Eyebrow */}
          <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-[#DFB96F]">
            <span>Our Story</span>
            <span className="h-px w-10 bg-[#DFB96F]/45" aria-hidden="true" />
            <span className="text-[#A8B9AE]">{RESTAURANT_INFO.established}</span>
          </div>

          {/* Authoritative Editorial Serif Headline */}
          <h2 className="mt-2.5 font-serif text-[2.15rem] font-normal leading-[1.06] tracking-[-0.015em] text-[#FAF6EC] sm:text-4xl lg:text-[2.6rem] 2xl:mt-4 2xl:text-[3.25rem]">
            From Negros Hearth{' '}
            <span className="block italic font-medium text-[#E0B96B]">
              to Tagaytay&rsquo;s Ridge.
            </span>
          </h2>

          <p className="mt-2.5 max-w-lg text-xs leading-relaxed text-[#C9D6CE] sm:text-sm sm:leading-6 2xl:mt-4 2xl:text-[15px] 2xl:leading-7">
            PIYO Grill &amp; Restaurant began with a simple promise along the
            cool highway mist of Bagong Tubig: serve honest, slow-simmered
            Negrense food and live charcoal sinugba in a calm room where every
            plate brings smiles.
          </p>

          {/* Hairline-Ruled Numbered Editorial Chapters (Zero Rounded Boxes) */}
          <ol className="mt-4 divide-y divide-[#FAF6EC]/12 border-y border-[#FAF6EC]/12 2xl:mt-6">
            {CHAPTERS.map((chapter) => (
              <li
                key={chapter.num}
                className="grid grid-cols-[2.2rem_1fr] items-baseline gap-x-3 py-2.5 2xl:py-3.5"
              >
                <span className="font-serif text-sm italic text-[#DFB96F]">
                  {chapter.num}
                </span>
                <div>
                  <h3 className="font-serif text-base font-medium tracking-wide text-[#FAF6EC] 2xl:text-lg">
                    {chapter.label}
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#B6C5BB] 2xl:mt-1 2xl:text-[13px]">
                    {chapter.text}
                  </p>
                </div>
              </li>
            ))}
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
    </section>
  );
}
