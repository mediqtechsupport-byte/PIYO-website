import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

const PILLARS = [
  {
    num: '01',
    title: 'Negros Roots',
    note: 'Real batwan & daily morning prep',
  },
  {
    num: '02',
    title: 'Smoke-Free Hall',
    note: 'Dedicated outdoor charcoal sinugba',
  },
  {
    num: '03',
    title: 'Built to Linger',
    note: 'Family tables & free cansi refills',
  },
];

export function HistorySection({ onExploreCraft, onVisitPlace }) {
  return (
    <section
      id="history"
      className="relative flex flex-col justify-center overflow-hidden border-y border-[#DFB96F]/12 bg-[#06180E] py-14 text-[#FAF6EC] sm:py-16 lg:min-h-[calc(100svh-var(--nav-h,69px))] lg:py-12"
    >
      {/* Subtle Architectural Evening Glow Behind the Facade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 48% 55% at 72% 52%, rgba(223,185,111,0.06) 0%, rgba(10,34,21,0.28) 45%, transparent 78%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Left 5 Columns: Minimalist Editorial Story (Zero Clutter, Generous Breathing Room) */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-[#DFB96F]">
              <span>Our Story</span>
              <span className="h-px w-8 bg-[#DFB96F]/45" aria-hidden="true" />
              <span className="text-[#9CB2A4]">{RESTAURANT_INFO.established}</span>
            </div>

            <h2 className="mt-4 font-serif text-[2.25rem] font-normal leading-[1.08] tracking-[-0.02em] text-[#FAF6EC] sm:text-4xl lg:text-[2.85rem] xl:text-[3.2rem]">
              From Negros Hearth
              <span className="mt-0.5 block italic font-medium text-[#E0B96B]">
                to Tagaytay&rsquo;s Ridge.
              </span>
            </h2>

            <p className="mt-5 max-w-[38ch] text-sm leading-7 text-[#C5D5CB] sm:text-[15px]">
              Honest batwan-soured cansi and live outdoor charcoal sinugba —
              served in a quiet, smoke-free sanctuary along Km.&nbsp;64.
            </p>

            {/* Ultra-Clean 3-Row Minimalist Pillars */}
            <dl className="mt-8 divide-y divide-[#FAF6EC]/10 border-y border-[#FAF6EC]/10">
              {PILLARS.map((item) => (
                <div
                  key={item.num}
                  className="flex items-baseline justify-between gap-4 py-3.5"
                >
                  <div className="flex items-baseline gap-3.5">
                    <dt className="font-serif text-xs italic text-[#DFB96F]/90">
                      {item.num}
                    </dt>
                    <dd className="font-serif text-[15px] font-medium tracking-wide text-[#FAF6EC]">
                      {item.title}
                    </dd>
                  </div>
                  <span className="text-right text-xs text-[#9AB0A2]">
                    {item.note}
                  </span>
                </div>
              ))}
            </dl>

            {/* Minimalist Action Row */}
            <div className="mt-8 flex flex-wrap items-center gap-5">
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
                className="group inline-flex min-h-[44px] items-center gap-2 border-b border-[#DFB96F]/40 pb-0.5 text-xs font-medium tracking-wide text-[#DCE7DF] transition hover:border-[#DFB96F] hover:text-[#DFB96F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] sm:text-sm"
              >
                <MapPin className="h-3.5 w-3.5 text-[#DFB96F]" aria-hidden="true" />
                <span>Directions · Km. 64</span>
              </button>
            </div>
          </div>

          {/* Right 7 Columns: Unclipped Full PIYO Facade Melted Seamlessly into #06180E */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="relative mx-auto w-full max-w-[740px]">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src="./images/piyo-place-mobile.jpg"
                  alt="PIYO Grill & Restaurant illuminated architectural facade along Km. 64 Tagaytay–Nasugbu Highway"
                  loading="lazy"
                  className="h-full w-full object-cover object-[44%_45%] brightness-[0.95] contrast-[1.06] saturate-[0.94]"
                />

                {/* Precision 4-Edge Atmospheric Feather (Keeps Full Building Crisp, Dissolves Perimeter Smoothly into #06180E) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, #06180E 0%, rgba(6,24,14,0.45) 11%, rgba(6,24,14,0) 26%, rgba(6,24,14,0) 68%, rgba(6,24,14,0.78) 86%, #06180E 98%)',
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(90deg, #06180E 0%, rgba(6,24,14,0.65) 6%, rgba(6,24,14,0) 17%, rgba(6,24,14,0) 80%, rgba(6,24,14,0.68) 92%, #06180E 100%)',
                  }}
                />
              </div>

              {/* Quiet Minimalist Architectural Caption */}
              <div className="mt-2 flex items-center justify-between px-1 text-[10px] font-medium uppercase tracking-[0.22em] text-[#9CB2A4]/70">
                <span>Km. 64 Tagaytay–Nasugbu Hwy</span>
                <span>Brgy. Bagong Tubig · Cavite</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
