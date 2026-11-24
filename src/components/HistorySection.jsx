import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

const CHAPTERS = [
  {
    num: '01',
    label: 'Negros Roots',
    text: 'Genuine batwan fruit, calamansi, tanglad, and fresh never-frozen cuts prepared every morning — carried from Western Visayas family kitchens without shortcuts.',
  },
  {
    num: '02',
    label: 'Km. 64 Tagaytay Sanctuary',
    text: 'Opened in 2025 in Brgy. Bagong Tubig with stacked stone pillars, warm cove lighting, and an outdoor charcoal grill keeping the indoor dining room smoke-free.',
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
      {/* Subtle Ambient Tagaytay Evening Glow Behind Section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 52% 58% at 74% 48%, rgba(223,185,111,0.07) 0%, rgba(11,39,24,0.22) 45%, transparent 78%)',
        }}
      />

      {/* Mobile / Tablet Edge-to-Edge Straight-On Architectural Photo Header */}
      <div className="relative h-64 w-full sm:h-80 lg:hidden">
        <img
          src="./images/piyo-place-mobile.jpg"
          alt="PIYO Grill & Restaurant straight-on front exterior along Km. 64 Tagaytay–Nasugbu Highway"
          loading="lazy"
          className="h-full w-full object-cover object-[42%_46%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#06180E]/35 via-transparent to-[#06180E]" />
        <p className="absolute bottom-3 left-5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#DFB96F]/90">
          Km. 64 Tagaytay–Nasugbu Hwy · {RESTAURANT_INFO.established}
        </p>
      </div>

      {/* Balanced 12-Column Editorial Grid — Narrative Left, Seamlessly Blended Compact Facade Right */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-10 pt-5 sm:px-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-10 xl:gap-12">
        {/* Left 6 Columns: Crisp Well-Formatted Story */}
        <div className="w-full max-w-[530px] lg:col-span-6">
          <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-[#DFB96F]">
            <span>Our Story</span>
            <span className="h-px w-10 bg-[#DFB96F]/50" aria-hidden="true" />
            <span className="text-[#B8C8BE]">{RESTAURANT_INFO.established}</span>
          </div>

          <h2 className="mt-3 font-serif text-[2.15rem] font-normal leading-[1.08] tracking-[-0.015em] text-[#FAF6EC] sm:text-4xl lg:text-[2.75rem] xl:text-[3.1rem]">
            From Negros Hearth{' '}
            <span className="block italic font-medium text-[#E0B96B]">
              to Tagaytay&rsquo;s Ridge.
            </span>
          </h2>

          <p className="mt-3.5 text-xs leading-relaxed text-[#D0DDD5] sm:text-sm sm:leading-6 lg:text-[14.5px] lg:leading-7">
            PIYO Grill &amp; Restaurant began with a simple promise along the
            cool highway mist of Bagong Tubig: serve honest, slow-simmered
            Negrense food and live charcoal sinugba in a calm room where every
            plate brings smiles.
          </p>

          {/* Soft Right-Fading Hairline Numbered Editorial Chapters */}
          <ol className="mt-5">
            {CHAPTERS.map((chapter) => (
              <li key={chapter.num} className="relative">
                <span
                  aria-hidden="true"
                  className="block h-px w-full bg-gradient-to-r from-[#DFB96F]/30 via-[#FAF6EC]/12 to-transparent"
                />
                <div className="grid grid-cols-[2.1rem_1fr] items-baseline gap-x-3 py-3">
                  <span className="font-serif text-sm italic text-[#DFB96F]">
                    {chapter.num}
                  </span>
                  <div>
                    <h3 className="font-serif text-base font-medium tracking-wide text-[#FAF6EC] lg:text-[17px]">
                      {chapter.label}
                    </h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#BCCBC1] lg:text-[13px]">
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
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={onExploreCraft}
              className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full bg-[#DFB96F] px-6 py-2.5 text-xs font-bold tracking-wide text-[#06180E] shadow-md transition hover:bg-[#E7C88B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] sm:text-sm"
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
              className="group inline-flex min-h-[44px] items-center gap-2 border-b border-[#DFB96F]/45 pb-0.5 text-xs font-medium tracking-wide text-[#E2ECE5] transition hover:border-[#DFB96F] hover:text-[#DFB96F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] sm:text-sm"
            >
              <MapPin className="h-3.5 w-3.5 text-[#DFB96F]" aria-hidden="true" />
              <span>Directions · Km. 64</span>
            </button>
          </div>
        </div>

        {/* Right 6 Columns: Compact, Proportionally Scaled PIYO Facade Melted Seamlessly into #06180E */}
        <div className="relative hidden lg:col-span-6 lg:flex lg:items-center lg:justify-center">
          <div className="relative aspect-[16/11] w-full max-w-[600px]">
            {/* Warm subtle hearth aura behind illuminated stone entrance */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-full opacity-80 blur-2xl"
              style={{
                background:
                  'radial-gradient(ellipse 56% 52% at 48% 54%, rgba(223,185,111,0.16) 0%, rgba(16,52,32,0.22) 52%, transparent 78%)',
              }}
            />

            {/* Feathered Architectural Image with Soft 4-Side Radial Dissolve (Zero Box Edges) */}
            <div
              className="relative h-full w-full overflow-hidden"
              style={{
                WebkitMaskImage:
                  'radial-gradient(ellipse 68% 66% at 49% 49%, #000 42%, rgba(0,0,0,0.72) 64%, rgba(0,0,0,0.18) 82%, transparent 96%)',
                maskImage:
                  'radial-gradient(ellipse 68% 66% at 49% 49%, #000 42%, rgba(0,0,0,0.72) 64%, rgba(0,0,0,0.18) 82%, transparent 96%)',
              }}
            >
              <img
                src="./images/piyo-place-mobile.jpg"
                alt="PIYO Grill & Restaurant straight-on architectural facade along Km. 64 Tagaytay–Nasugbu Highway"
                loading="lazy"
                className="h-full w-full scale-[1.06] object-cover object-[42%_46%]"
              />
              {/* Bottom driveway + perimeter dark emerald mist blend */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(6,24,14,0.65) 0%, rgba(6,24,14,0.06) 20%, rgba(6,24,14,0) 58%, rgba(6,24,14,0.72) 84%, rgba(6,24,14,1) 98%)',
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(6,24,14,0.92) 0%, rgba(6,24,14,0.16) 18%, rgba(6,24,14,0) 45%, rgba(6,24,14,0) 72%, rgba(6,24,14,0.88) 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
