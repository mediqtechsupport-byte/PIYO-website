import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { useSectionReveal } from '../hooks/useSectionReveal';

const PILLARS = [
  {
    num: '01',
    title: 'Negros Roots',
    note: 'Real batwan & daily prep',
  },
  {
    num: '02',
    title: 'Smoke-Free Hall',
    note: 'Outdoor charcoal sinugba',
  },
  {
    num: '03',
    title: 'Built to Linger',
    note: 'Family tables & free refills',
  },
];

export function HistorySection({ onExploreCraft, onVisitPlace }) {
  const [revealRef, revealed] = useSectionReveal(0.08);
  return (
    <section
      ref={revealRef}
      id="history"
      className="relative flex min-h-[var(--stage-h)] flex-col items-center justify-end overflow-hidden border-y border-[#DFB96F]/15 bg-[#08130B] pb-5 pt-[clamp(146px,25svh,215px)] text-[#FAF6EC] sm:pb-12 sm:pt-[clamp(260px,42svh,440px)] lg:pb-6 lg:pt-[clamp(165px,30svh,280px)] 2xl:pb-12 2xl:pt-[clamp(200px,33svh,320px)]"
    >
      {/* Mobile / Fold / Tablet Top-Framed PIYO Facade — Full Illuminated Gable & PIYO Sign Centered Above Text */}
      <div
        aria-hidden="true"
        data-revealed={revealed ? 'true' : 'false'}
        className="piyo-reveal-zoom pointer-events-none absolute inset-x-0 top-0 h-[clamp(220px,37svh,315px)] overflow-hidden sm:h-[clamp(360px,58svh,580px)] lg:hidden"
      >
        <img
          src="./images/piyo-place-mobile.jpg"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-[15%_18%] opacity-90 brightness-[0.96] contrast-[1.06] saturate-[0.98] sm:translate-x-[10.5%] sm:scale-[1.2] sm:object-[50%_20%]"
        />
        {/* Subtle side vignette so roof eaves melt naturally into #08130B */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(8,19,11,0.55) 0%, rgba(8,19,11,0) 14%, rgba(8,19,11,0) 86%, rgba(8,19,11,0.55) 100%)',
          }}
        />
        {/* Crisp unobstructed sign at top, dissolving smoothly into solid #08130B behind the story copy */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(8,19,11,0.35) 0%, rgba(8,19,11,0.04) 22%, rgba(8,19,11,0.08) 54%, rgba(8,19,11,0.74) 78%, #08130B 97%)',
          }}
        />
      </div>

      {/* Desktop Full-Bleed Centered PIYO Facade — Illuminated Roof & PIYO Sign Clearly Visible at Top */}
      <div
        aria-hidden="true"
        data-revealed={revealed ? 'true' : 'false'}
        className="piyo-reveal-zoom pointer-events-none absolute inset-0 hidden lg:block"
      >
        <img
          src="./images/piyo-place-mobile.jpg"
          alt=""
          loading="lazy"
          className="h-full w-full translate-x-[12.2%] -translate-y-[3%] scale-[1.24] object-cover object-[50%_28%] opacity-72 brightness-[0.94] contrast-[1.06] saturate-[0.95]"
        />
        {/* Seamless left & right atmospheric fade into #08130B */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #08130B 0%, rgba(8,19,11,0.42) 15%, rgba(8,19,11,0) 32%, rgba(8,19,11,0) 68%, rgba(8,19,11,0.42) 85%, #08130B 100%)',
          }}
        />
        {/* Keeps top PIYO gable sign bright & unobstructed while smoothly darkening the lower half behind text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(8,19,11,0.72) 0%, rgba(8,19,11,0.12) 16%, rgba(8,19,11,0.06) 33%, rgba(8,19,11,0.68) 52%, rgba(8,19,11,0.90) 74%, #08130B 98%)',
          }}
        />
      </div>

      {/* Centered Ultra-Minimalist Editorial Content Positioned Cleanly Below the Illuminated PIYO Sign */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Quiet Symmetrical Eyebrow */}
          <div
            data-revealed={revealed ? 'true' : 'false'}
            style={{ transitionDelay: '0ms' }}
            className="piyo-reveal flex items-center justify-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.24em] text-[#DFB96F] sm:gap-3 sm:text-[11px] sm:tracking-[0.26em]"
          >
            <span className="h-px w-6 bg-[#DFB96F]/45 sm:w-8" aria-hidden="true" />
            <span>Our Story · {RESTAURANT_INFO.established}</span>
            <span className="h-px w-6 bg-[#DFB96F]/45 sm:w-8" aria-hidden="true" />
          </div>

          {/* Serene Centered Display Serif Headline */}
          <h2
            data-revealed={revealed ? 'true' : 'false'}
            style={{ transitionDelay: '70ms' }}
            className="piyo-reveal mt-2 font-serif text-[1.8rem] font-normal leading-[1.08] tracking-[-0.02em] text-[#FAF6EC] drop-shadow-[0_4px_24px_rgba(5,13,7,0.85)] sm:mt-3.5 sm:text-4xl lg:mt-2.5 lg:text-[2.25rem] 2xl:mt-3.5 2xl:text-[2.85rem]"
          >
            From Negros Hearth{' '}
            <span className="italic font-medium text-[#E0B96B]">
              to Tagaytay&rsquo;s Ridge.
            </span>
          </h2>

          {/* Single Poetic Breathing Sentence */}
          <p
            data-revealed={revealed ? 'true' : 'false'}
            style={{ transitionDelay: '130ms' }}
            className="piyo-reveal mt-2.5 max-w-xl text-[13px] leading-[1.52] text-[#DDE8E1] sm:mt-3.5 sm:text-[15px] sm:leading-7 lg:mt-2.5 lg:text-sm lg:leading-6 2xl:mt-3.5 2xl:text-[15px] 2xl:leading-7"
          >
            Honest batwan-soured cansi and live outdoor charcoal sinugba —
            served in a quiet, smoke-free sanctuary along Km.&nbsp;64.
          </p>

          {/* Clean Symmetrical 3-Column Minimalist Pillar Strip */}
          <dl
            data-revealed={revealed ? 'true' : 'false'}
            style={{ transitionDelay: '190ms' }}
            className="piyo-reveal-scale mt-5 grid w-full max-w-2xl grid-cols-3 divide-x divide-[#FAF6EC]/12 border-y border-[#FAF6EC]/15 bg-[#08130B]/45 backdrop-blur-[2px] sm:mt-7 lg:mt-4 2xl:mt-7"
          >
            {PILLARS.map((item) => (
              <div key={item.num} className="px-2 py-2.5 sm:px-5 sm:py-4 lg:py-2.5 2xl:py-4">
                <dt className="font-serif text-[11px] italic text-[#DFB96F] sm:text-xs">
                  {item.num}
                </dt>
                <dd className="mt-0.5 font-serif text-[13px] font-medium leading-tight tracking-wide text-[#FAF6EC] sm:text-base">
                  {item.title}
                </dd>
                <p className="mt-0.5 text-[10.5px] leading-snug text-[#BDD0C4] sm:text-xs">
                  {item.note}
                </p>
              </div>
            ))}
          </dl>

          {/* Centered Minimalist Actions — Equal-Size Minimal Pills on Mobile */}
          <div
            data-revealed={revealed ? 'true' : 'false'}
            style={{ transitionDelay: '260ms' }}
            className="piyo-reveal mt-5 grid w-full max-w-[330px] grid-cols-2 gap-2.5 sm:mt-7 sm:flex sm:w-auto sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 lg:mt-4 2xl:mt-7"
          >
            <button
              type="button"
              onClick={onExploreCraft}
              className="group inline-flex h-[40px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#DFB96F] px-3 text-[11.5px] font-bold tracking-wide text-[#08130B] shadow-lg transition hover:bg-[#E7C88B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] sm:h-auto sm:min-h-[44px] sm:w-auto sm:gap-2.5 sm:px-7 sm:py-2.5 sm:text-sm"
            >
              <span className="sm:hidden">#1 House Cansi</span>
              <span className="hidden sm:inline">See #1 House Cansi</span>
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-4 sm:w-4"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={onVisitPlace}
              className="group inline-flex h-[40px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#FAF6EC]/25 bg-[#08130B]/55 px-3 text-[11.5px] font-medium tracking-wide text-[#FAF6EC] backdrop-blur-xs transition hover:border-[#DFB96F]/60 hover:text-[#DFB96F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] sm:h-auto sm:min-h-[44px] sm:w-auto sm:gap-2 sm:px-6 sm:py-2.5 sm:text-sm"
            >
              <MapPin
                className="h-3.5 w-3.5 shrink-0 text-[#DFB96F]"
                aria-hidden="true"
              />
              <span>Directions · Km. 64</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
