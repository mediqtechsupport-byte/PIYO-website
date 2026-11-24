import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

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
  return (
    <section
      id="history"
      className="relative flex flex-col items-center justify-end overflow-hidden border-y border-[#DFB96F]/15 bg-[#06180E] pb-14 pt-48 text-[#FAF6EC] sm:pb-16 sm:pt-56 lg:min-h-[calc(100svh-var(--nav-h,69px))] lg:pb-12 lg:pt-[285px] xl:pb-14 xl:pt-[310px]"
    >
      {/* Full-Bleed Centered PIYO Facade — Illuminated Roof & PIYO Sign Clearly Visible at Top */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <img
          src="./images/piyo-place-mobile.jpg"
          alt=""
          loading="lazy"
          className="h-full w-full translate-x-[9.6%] -translate-y-[8%] scale-[1.16] object-cover object-[50%_28%] opacity-72 brightness-[0.94] contrast-[1.06] saturate-[0.95]"
        />
        {/* Seamless left & right atmospheric fade into #06180E */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #06180E 0%, rgba(6,24,14,0.42) 15%, rgba(6,24,14,0) 32%, rgba(6,24,14,0) 68%, rgba(6,24,14,0.42) 85%, #06180E 100%)',
          }}
        />
        {/* Keeps top PIYO gable sign bright & unobstructed while smoothly darkening the lower half behind text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(6,24,14,0.72) 0%, rgba(6,24,14,0.12) 16%, rgba(6,24,14,0.06) 33%, rgba(6,24,14,0.68) 52%, rgba(6,24,14,0.90) 74%, #06180E 98%)',
          }}
        />
      </div>

      {/* Centered Ultra-Minimalist Editorial Content Positioned Cleanly Below the Illuminated PIYO Sign */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Quiet Symmetrical Eyebrow */}
          <div className="flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.26em] text-[#DFB96F]">
            <span className="h-px w-8 bg-[#DFB96F]/45" aria-hidden="true" />
            <span>Our Story · {RESTAURANT_INFO.established}</span>
            <span className="h-px w-8 bg-[#DFB96F]/45" aria-hidden="true" />
          </div>

          {/* Serene Centered Display Serif Headline */}
          <h2 className="mt-3.5 font-serif text-[2.25rem] font-normal leading-[1.08] tracking-[-0.02em] text-[#FAF6EC] drop-shadow-[0_4px_24px_rgba(4,16,9,0.85)] sm:text-5xl lg:text-[3.15rem]">
            From Negros Hearth{' '}
            <span className="italic font-medium text-[#E0B96B]">
              to Tagaytay&rsquo;s Ridge.
            </span>
          </h2>

          {/* Single Poetic Breathing Sentence */}
          <p className="mt-3.5 max-w-xl text-sm leading-6 text-[#DDE8E1] sm:text-[15px] sm:leading-7">
            Honest batwan-soured cansi and live outdoor charcoal sinugba —
            served in a quiet, smoke-free sanctuary along Km.&nbsp;64.
          </p>

          {/* Clean Symmetrical 3-Column Minimalist Pillar Strip */}
          <dl className="mt-7 grid w-full max-w-2xl grid-cols-1 divide-y divide-[#FAF6EC]/12 border-y border-[#FAF6EC]/15 bg-[#06180E]/45 backdrop-blur-[2px] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {PILLARS.map((item) => (
              <div key={item.num} className="px-5 py-3.5 sm:py-4">
                <dt className="font-serif text-xs italic text-[#DFB96F]">
                  {item.num}
                </dt>
                <dd className="mt-0.5 font-serif text-base font-medium tracking-wide text-[#FAF6EC]">
                  {item.title}
                </dd>
                <p className="mt-0.5 text-xs text-[#BDD0C4]">{item.note}</p>
              </div>
            ))}
          </dl>

          {/* Centered Minimalist Actions */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onExploreCraft}
              className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full bg-[#DFB96F] px-7 py-2.5 text-xs font-bold tracking-wide text-[#06180E] shadow-lg transition hover:bg-[#E7C88B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] sm:text-sm"
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
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#FAF6EC]/25 bg-[#06180E]/55 px-6 py-2.5 text-xs font-medium tracking-wide text-[#FAF6EC] backdrop-blur-xs transition hover:border-[#DFB96F]/60 hover:text-[#DFB96F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] sm:text-sm"
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
