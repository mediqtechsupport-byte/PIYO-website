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
      className="relative flex min-h-[var(--stage-h)] flex-col justify-end overflow-hidden border-y border-[#DFB96F]/15 bg-[#08130B]/30 pb-6 pt-[clamp(210px,33svh,290px)] text-[#FAF6EC] sm:pb-12 sm:pt-[clamp(290px,45svh,440px)] lg:justify-center lg:py-10 2xl:py-14"
    >
      {/* Mobile / Tablet Top-Framed Transparent PIYO House Directly Over the Live Tagaytay Pine Forest */}
      <div
        aria-hidden="true"
        data-revealed={revealed ? 'true' : 'false'}
        className="piyo-reveal-zoom pointer-events-none absolute inset-x-0 top-3 mx-auto flex h-[clamp(215px,36svh,305px)] w-full max-w-[680px] items-center justify-center px-2 sm:top-5 sm:h-[clamp(300px,46svh,440px)] lg:hidden"
      >
        <picture className="block h-full w-full">
          <source srcSet="./images/piyo-house-cutout.webp" type="image/webp" />
          <img
            src="./images/piyo-house-cutout.png"
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full translate-x-[3%] object-contain object-center drop-shadow-[0_24px_38px_rgba(4,12,7,0.85)]"
          />
        </picture>
      </div>

      {/* Atmospheric Contrast Scrim — Keeps Both Left Editorial Copy & Right House Crisp Over Pine Forest */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, transparent 40%, rgba(8,19,11,0.45) 60%, rgba(8,19,11,0.76) 82%, rgba(8,19,11,0.88) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(8,19,11,0.72) 0%, rgba(8,19,11,0.52) 42%, rgba(8,19,11,0.18) 68%, rgba(8,19,11,0.28) 100%)',
        }}
      />

      {/* Subtle warm golden hearth glow bridging the story column and illuminated house */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 46% 48% at 72% 52%, rgba(223,185,111,0.10) 0%, transparent 72%)',
        }}
      />

      {/* Split Editorial Stage: Story Copy on Left · PIYO Tagaytay House on Right — Both Over Pine Forest */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6 xl:gap-10">
          {/* Left Column (Desktop) / Bottom Stack (Mobile): Story Copy, 3 Pillars & CTAs */}
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center lg:col-span-5 lg:mx-0 lg:max-w-none lg:items-start lg:text-left">
            {/* Symmetrical / Left-Anchored Eyebrow */}
            <div
              data-revealed={revealed ? 'true' : 'false'}
              style={{ transitionDelay: '0ms' }}
              className="piyo-reveal flex items-center justify-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.24em] text-[#DFB96F] sm:gap-3 sm:text-[11px] sm:tracking-[0.26em] lg:justify-start"
            >
              <span className="h-px w-6 bg-[#DFB96F]/55 sm:w-8" aria-hidden="true" />
              <span>Our Story · {RESTAURANT_INFO.established}</span>
              <span className="h-px w-6 bg-[#DFB96F]/45 sm:w-8 lg:hidden" aria-hidden="true" />
            </div>

            {/* Serene Display Serif Headline */}
            <h2
              data-revealed={revealed ? 'true' : 'false'}
              style={{ transitionDelay: '70ms' }}
              className="piyo-reveal mt-2 font-serif text-[1.8rem] font-normal leading-[1.08] tracking-[-0.02em] text-[#FAF6EC] drop-shadow-[0_4px_24px_rgba(5,13,7,0.85)] sm:mt-3.5 sm:text-4xl lg:mt-3.5 lg:text-[2.55rem] lg:leading-[1.06] xl:text-[2.95rem]"
            >
              From Negros Hearth{' '}
              <span className="italic font-medium text-[#E0B96B] lg:block">
                to Tagaytay&rsquo;s Ridge.
              </span>
            </h2>

            {/* Single Poetic Breathing Sentence */}
            <p
              data-revealed={revealed ? 'true' : 'false'}
              style={{ transitionDelay: '130ms' }}
              className="piyo-reveal mt-2.5 max-w-xl text-[13px] leading-[1.52] text-[#E1ECE5] sm:mt-3.5 sm:text-[15px] sm:leading-7 lg:mt-4 lg:max-w-[44ch] lg:text-[14.5px] lg:leading-7"
            >
              Honest batwan-soured cansi and live outdoor charcoal sinugba —
              served in a quiet, smoke-free sanctuary along Km.&nbsp;64.
            </p>

            {/* Clean 3-Column Minimalist Pillar Strip Over Pine Forest */}
            <dl
              data-revealed={revealed ? 'true' : 'false'}
              style={{ transitionDelay: '190ms' }}
              className="piyo-reveal-scale mt-5 grid w-full max-w-2xl grid-cols-3 divide-x divide-[#FAF6EC]/12 rounded-2xl border border-[#DFB96F]/18 bg-[#08130B]/55 backdrop-blur-[3px] sm:mt-7 lg:mt-6 lg:max-w-none"
            >
              {PILLARS.map((item) => (
                <div key={item.num} className="px-2 py-2.5 sm:px-4 sm:py-4 lg:px-3.5 lg:py-3.5">
                  <dt className="font-serif text-[11px] italic text-[#DFB96F] sm:text-xs">
                    {item.num}
                  </dt>
                  <dd className="mt-0.5 font-serif text-[13px] font-medium leading-tight tracking-wide text-[#FAF6EC] sm:text-[15px]">
                    {item.title}
                  </dd>
                  <p className="mt-1 text-[10.5px] leading-snug text-[#C4D6CB] sm:text-[11.5px]">
                    {item.note}
                  </p>
                </div>
              ))}
            </dl>

            {/* Minimalist Actions */}
            <div
              data-revealed={revealed ? 'true' : 'false'}
              style={{ transitionDelay: '260ms' }}
              className="piyo-reveal mt-5 grid w-full max-w-[330px] grid-cols-2 gap-2.5 sm:mt-7 sm:flex sm:w-auto sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-3.5 lg:mt-6 lg:justify-start"
            >
              <button
                type="button"
                onClick={onExploreCraft}
                className="group inline-flex h-[40px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#DFB96F] px-3 text-[11.5px] font-bold tracking-wide text-[#08130B] shadow-lg transition hover:bg-[#E7C88B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] sm:h-auto sm:min-h-[44px] sm:w-auto sm:gap-2.5 sm:px-6 sm:py-2.5 sm:text-sm"
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
                className="group inline-flex h-[40px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#FAF6EC]/28 bg-[#08130B]/60 px-3 text-[11.5px] font-medium tracking-wide text-[#FAF6EC] backdrop-blur-xs transition hover:border-[#DFB96F]/65 hover:text-[#DFB96F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] sm:h-auto sm:min-h-[44px] sm:w-auto sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
              >
                <MapPin
                  className="h-3.5 w-3.5 shrink-0 text-[#DFB96F]"
                  aria-hidden="true"
                />
                <span>Directions · Km. 64</span>
              </button>
            </div>
          </div>

          {/* Right Column (Desktop): True Alpha-Transparent PIYO Tagaytay House Directly Inside the Live Pine Forest */}
          <div
            data-revealed={revealed ? 'true' : 'false'}
            style={{ transitionDelay: '110ms' }}
            className="piyo-reveal-zoom relative hidden lg:col-span-7 lg:flex lg:items-center lg:justify-end"
          >
            <div className="relative w-full lg:-mr-4 xl:-mr-8">
              {/* Soft grounded forest shadow directly beneath the house foundation */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-3 inset-x-[6%] h-10 rounded-full bg-[#040B06]/85 blur-xl"
              />
              <picture className="relative block w-full">
                <source srcSet="./images/piyo-house-cutout.webp" type="image/webp" />
                <img
                  src="./images/piyo-house-cutout.png"
                  alt="PIYO Grill & Restaurant Tagaytay illuminated gable house nestled among pine trees at twilight"
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full select-none object-contain drop-shadow-[0_26px_44px_rgba(3,10,6,0.82)]"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
