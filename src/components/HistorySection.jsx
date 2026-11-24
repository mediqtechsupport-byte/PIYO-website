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
      className="relative flex flex-col items-center justify-center overflow-hidden border-y border-[#DFB96F]/15 bg-[#06180E] py-20 text-[#FAF6EC] sm:py-24 lg:min-h-[calc(100svh-var(--nav-h,69px))] lg:py-16"
    >
      {/* Full-Bleed Atmospheric PIYO Facade Background Blended Seamlessly into #06180E */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <img
          src="./images/piyo-place-mobile.jpg"
          alt=""
          loading="lazy"
          className="h-full w-full scale-[1.03] object-cover object-[48%_46%] opacity-42 brightness-[0.82] contrast-[1.06] saturate-[0.9]"
        />
        {/* Deep cinematic radial vignette keeping centered typography crisp while letting warm stone glow through */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 68% 66% at 50% 48%, rgba(6,24,14,0.68) 0%, rgba(6,24,14,0.48) 46%, rgba(6,24,14,0.92) 100%)',
          }}
        />
        {/* Seamless top & bottom edge melt into #06180E */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #06180E 0%, rgba(6,24,14,0.38) 16%, rgba(6,24,14,0.12) 50%, rgba(6,24,14,0.52) 84%, #06180E 100%)',
          }}
        />
      </div>

      {/* Centered Ultra-Minimalist Editorial Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Quiet Symmetrical Eyebrow */}
          <div className="flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.26em] text-[#DFB96F]">
            <span className="h-px w-8 bg-[#DFB96F]/45" aria-hidden="true" />
            <span>Our Story · {RESTAURANT_INFO.established}</span>
            <span className="h-px w-8 bg-[#DFB96F]/45" aria-hidden="true" />
          </div>

          {/* Serene Centered Display Serif Headline */}
          <h2 className="mt-5 font-serif text-[2.4rem] font-normal leading-[1.08] tracking-[-0.02em] text-[#FAF6EC] drop-shadow-[0_4px_24px_rgba(4,16,9,0.75)] sm:text-5xl lg:text-[3.45rem]">
            From Negros Hearth
            <span className="mt-1 block italic font-medium text-[#E0B96B]">
              to Tagaytay&rsquo;s Ridge.
            </span>
          </h2>

          {/* Single Poetic Breathing Sentence */}
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#DDE8E1] sm:text-base sm:leading-7">
            Honest batwan-soured cansi and live outdoor charcoal sinugba —
            served in a quiet, smoke-free sanctuary along Km.&nbsp;64.
          </p>

          {/* Clean Symmetrical 3-Column Minimalist Pillar Strip */}
          <dl className="mt-10 grid w-full max-w-2xl grid-cols-1 divide-y divide-[#FAF6EC]/12 border-y border-[#FAF6EC]/15 bg-[#06180E]/35 backdrop-blur-[2px] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {PILLARS.map((item) => (
              <div key={item.num} className="px-5 py-4 sm:py-5">
                <dt className="font-serif text-xs italic text-[#DFB96F]">
                  {item.num}
                </dt>
                <dd className="mt-1 font-serif text-base font-medium tracking-wide text-[#FAF6EC]">
                  {item.title}
                </dd>
                <p className="mt-1 text-xs text-[#BDD0C4]">{item.note}</p>
              </div>
            ))}
          </dl>

          {/* Centered Minimalist Actions */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
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
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#FAF6EC]/25 bg-[#06180E]/45 px-6 py-2.5 text-xs font-medium tracking-wide text-[#FAF6EC] backdrop-blur-xs transition hover:border-[#DFB96F]/60 hover:text-[#DFB96F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] sm:text-sm"
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
