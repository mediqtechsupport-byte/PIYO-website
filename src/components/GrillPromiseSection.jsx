import React from 'react';
import { Flame, Soup, UtensilsCrossed, ArrowUpRight } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Flame,
    title: 'Daily Fresh Prep & Negros Heritage',
    description:
      'Chicken inasal marinated in calamansi, tanglad & annatto oil, paired with crisp Tagaytay produce and real Negrense batwan every morning.',
    tileClass: 'bg-[#E5EDE7] text-[#0B2718]',
  },
  {
    icon: UtensilsCrossed,
    title: 'Outdoor Charcoal Grill, Smoke-Free Hall',
    description:
      'Our dedicated live charcoal station chars every inasal, liempo, and bangus outside so our indoor dining room stays fresh and cozy.',
    tileClass: 'bg-[#EDE3CE] text-[#7D5817]',
  },
  {
    icon: Soup,
    title: 'Free Cansi Refills for Dine-In & Groups',
    description:
      'Spacious 6–8 seater family tables, takeout bilao spreads, and steaming complimentary broth refills on every Bacolod Cansi.',
    tileClass: 'bg-[#DDE8E0] text-[#113421]',
  },
];

export function GrillPromiseSection({ onInspectDish, onExploreGrill }) {
  return (
    <section
      id="craft"
      className="relative overflow-hidden border-b border-[#0B2718]/12 bg-[#F5EFE2] py-14 text-[#0B2718] sm:py-20 lg:py-24"
    >
      {/* Top-Left Open Flame Accent blended cleanly into warm beige */}
      <img
        src="./images/flame-corner.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-2 -top-2 h-28 w-36 object-cover object-left-top opacity-90 mix-blend-multiply sm:h-40 sm:w-52 lg:h-52 lg:w-64"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6">
            <h2 className="font-serif text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-[#0B2718] sm:text-5xl xl:text-[3.15rem]">
              <span className="relative inline-block">
                <span className="relative z-10">PIYO&apos;s #1 House Favorite</span>
                <svg
                  viewBox="0 0 320 20"
                  fill="none"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -bottom-1 left-0 h-3.5 w-full sm:h-4"
                >
                  <path
                    d="M4 11.5C82 4 218 4 316 10.5"
                    stroke="#C29645"
                    strokeWidth="6.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14 15.5C96 10 220 9.5 304 13"
                    stroke="#0B2718"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    opacity="0.35"
                  />
                </svg>
              </span>{' '}
              — Authentic Bacolod Cansi
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#425246] sm:text-[15px] sm:leading-7">
              Loved by Tagaytay families and repeat visitors for our real
              batwan-soured beef shank &amp; bone marrow broth — served piping
              hot on banana leaf alongside outdoor charcoal-grilled favorites.
            </p>

            {/* 3 Tinted Line-Icon Highlights */}
            <div className="mt-8 space-y-5">
              {HIGHLIGHTS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div
                      className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl shadow-xs ring-1 ring-[#0B2718]/10 sm:h-14 sm:w-14 ${item.tileClass}`}
                    >
                      <Icon className="h-6 w-6 stroke-[1.75]" aria-hidden="true" />
                    </div>
                    <div className="pt-0.5">
                      <h3 className="font-serif text-lg font-semibold leading-snug text-[#0B2718] sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#47574B] sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExploreGrill}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#0B2718] px-6 py-2.5 text-xs font-bold text-[#FAF6EC] shadow-md transition hover:bg-[#133A25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2718] sm:text-sm"
              >
                <span>Browse Grill &amp; Specials</span>
                <ArrowUpRight className="h-4 w-4 text-[#DFB96F]" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onInspectDish}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#0B2718]/25 bg-[#FAF6EC] px-5 py-2.5 text-xs font-semibold text-[#0B2718] transition hover:border-[#0B2718]/45 hover:bg-[#E5EDE7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2718] sm:text-sm"
              >
                <span>Inspect Bacolod Cansi · ₱666</span>
              </button>
            </div>
          </div>

          {/* Right Forest-Green Botanical Banner & Floating PIYO Oval Platter */}
          <div className="relative mx-auto w-full max-w-[520px] lg:col-span-6 lg:max-w-none">
            <div className="relative mx-auto flex items-center justify-center py-4 sm:py-6">
              {/* Pillowy Curved PIYO Forest-Green & Gold Culinary Sketch Banner */}
              <svg
                viewBox="0 0 540 420"
                aria-hidden="true"
                className="w-full max-w-[540px] drop-shadow-[0_18px_36px_rgba(11,39,24,0.24)]"
              >
                <defs>
                  <pattern
                    id="piyo-culinary-sketch"
                    width="110"
                    height="110"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M16 32 C28 18, 52 18, 66 32 C52 46, 28 46, 16 32 Z M66 32 L78 24 L76 40 Z"
                      fill="none"
                      stroke="rgba(223,185,111,0.26)"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="32"
                      cy="82"
                      r="14"
                      fill="none"
                      stroke="rgba(250,246,236,0.18)"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M32 68 L32 96 M18 82 L46 82 M22 72 L42 92 M42 72 L22 92"
                      stroke="rgba(250,246,236,0.16)"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M84 62 C92 50, 102 52, 98 66 C94 78, 80 78, 84 62 Z M84 62 C80 74, 72 86, 68 96"
                      fill="none"
                      stroke="rgba(223,185,111,0.22)"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </pattern>
                </defs>
                <path
                  d="M 16 18 Q 270 68 524 18 Q 486 210 524 402 Q 270 352 16 402 Q 54 210 16 18 Z"
                  fill="#113421"
                />
                <path
                  d="M 16 18 Q 270 68 524 18 Q 486 210 524 402 Q 270 352 16 402 Q 54 210 16 18 Z"
                  fill="url(#piyo-culinary-sketch)"
                />
              </svg>

              {/* Interactive Tilted Cream-White Oval Platter */}
              <button
                type="button"
                onClick={onInspectDish}
                aria-label="Inspect Bacolod Cansi — ₱666"
                className="group absolute inset-0 m-auto flex aspect-[1.32/1] w-[86%] -rotate-3 items-center justify-center overflow-hidden rounded-[50%] border-[8px] border-[#FAF6EC] bg-[#FAF6EC] shadow-[0_28px_56px_-14px_rgba(6,24,14,0.48)] transition duration-500 hover:rotate-0 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0B2718] sm:w-[88%] sm:border-[12px]"
              >
                <img
                  src="./images/dish-cansi-oval-platter.jpg"
                  alt="PIYO Bacolod Cansi beef shank and bone marrow soup with batwan, jackfruit, and lemongrass on an oval platter"
                  className="h-full w-full scale-[1.22] rotate-[1deg] object-cover object-center transition duration-700 group-hover:scale-[1.26]"
                />
              </button>

              {/* Clean Floating Dish Tag */}
              <button
                type="button"
                onClick={onInspectDish}
                className="absolute bottom-2 right-2 z-10 inline-flex items-center gap-2 rounded-full border border-[#0B2718]/15 bg-[#FAF6EC]/95 px-4 py-2 text-xs font-bold text-[#0B2718] shadow-lg backdrop-blur-sm transition hover:bg-white sm:bottom-3 sm:right-4"
              >
                <span className="h-2 w-2 rounded-full bg-[#C29645]" aria-hidden="true" />
                <span>Bacolod Cansi · ₱666</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#C29645]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
