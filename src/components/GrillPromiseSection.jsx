import React from 'react';
import { Fish, Flame, UtensilsCrossed, ArrowUpRight } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Fish,
    title: 'Daily Fresh Bangus & Heritage Ingredients',
    description:
      'Whole boneless milkfish, crisp Tagaytay pechay, sweet corn, and real Negrense batwan prepared fresh each morning.',
    tileClass: 'bg-[#ECEBFD] text-[#28336B]',
  },
  {
    icon: Flame,
    title: 'Your Tagaytay Charcoal Sinugba Specialist',
    description:
      'Live charcoal grates set outside our indoor dining hall give every inasal, liempo, and stuffed bangus authentic smoky char.',
    tileClass: 'bg-[#FDF0DC] text-[#8F4D12]',
  },
  {
    icon: UtensilsCrossed,
    title: 'Served Hot for Dine-In & Family Feasts',
    description:
      'Built for Tagaytay road trips with 6–8 seater family tables, takeout platters, and free Bacolod Cansi soup refills.',
    tileClass: 'bg-[#E3F5EB] text-[#115836]',
  },
];

export function GrillPromiseSection({ onInspectFishDish, onExploreGrill }) {
  return (
    <section
      id="craft"
      className="relative overflow-hidden border-b border-[#0B2718]/10 bg-white py-14 text-[#0B2718] sm:py-20 lg:py-24"
    >
      {/* Top-Left Open Flame Accent */}
      <img
        src="./images/flame-corner.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-2 -top-2 h-28 w-36 object-cover object-left-top opacity-95 mix-blend-multiply sm:h-40 sm:w-52 lg:h-52 lg:w-64"
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
                <span className="relative z-10">Fresh off the Grill</span>
                <svg
                  viewBox="0 0 320 20"
                  fill="none"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -bottom-1 left-0 h-3.5 w-full sm:h-4"
                >
                  <path
                    d="M4 11.5C82 4 218 4 316 10.5"
                    stroke="#E85234"
                    strokeWidth="6.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14 15.5C96 10 220 9.5 304 13"
                    stroke="#DFB96F"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.75"
                  />
                </svg>
              </span>{' '}
              &amp; Straight to Your Table
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#48564B] sm:text-[15px] sm:leading-7">
              Born from a love for Negros heritage recipes and live open flames. We
              prepare stuffed boneless bangus, charcoal chicken inasal, and
              slow-simmered batwan soups daily — kissed cleanly by smoke.
            </p>

            {/* 3 Tinted Line-Icon Highlights */}
            <div className="mt-8 space-y-5">
              {HIGHLIGHTS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div
                      className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl shadow-xs ring-1 ring-black/5 sm:h-14 sm:w-14 ${item.tileClass}`}
                    >
                      <Icon className="h-6 w-6 stroke-[1.75]" aria-hidden="true" />
                    </div>
                    <div className="pt-0.5">
                      <h3 className="font-serif text-lg font-semibold leading-snug text-[#0B2718] sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#526155] sm:text-sm">
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
                onClick={onInspectFishDish}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#0B2718]/20 bg-white px-5 py-2.5 text-xs font-semibold text-[#0B2718] transition hover:border-[#0B2718]/45 hover:bg-[#F5EFE2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2718] sm:text-sm"
              >
                <span>Inspect Stuffed Bangus · ₱410</span>
              </button>
            </div>
          </div>

          {/* Right Patterned Banner & Floating Oval Platter */}
          <div className="relative mx-auto w-full max-w-[520px] lg:col-span-6 lg:max-w-none">
            <div className="relative mx-auto flex items-center justify-center py-4 sm:py-6">
              {/* Pillowy Curved Botanical Patterned Ember Banner */}
              <svg
                viewBox="0 0 540 420"
                aria-hidden="true"
                className="w-full max-w-[540px] drop-shadow-[0_18px_36px_rgba(232,82,52,0.18)]"
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
                      stroke="rgba(255,255,255,0.22)"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="32"
                      cy="82"
                      r="14"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M32 68 L32 96 M18 82 L46 82 M22 72 L42 92 M42 72 L22 92"
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M84 62 C92 50, 102 52, 98 66 C94 78, 80 78, 84 62 Z M84 62 C80 74, 72 86, 68 96"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </pattern>
                </defs>
                <path
                  d="M 16 18 Q 270 68 524 18 Q 486 210 524 402 Q 270 352 16 402 Q 54 210 16 18 Z"
                  fill="#EA4E33"
                />
                <path
                  d="M 16 18 Q 270 68 524 18 Q 486 210 524 402 Q 270 352 16 402 Q 54 210 16 18 Z"
                  fill="url(#piyo-culinary-sketch)"
                />
              </svg>

              {/* Interactive Tilted White Oval Porcelain Platter */}
              <button
                type="button"
                onClick={onInspectFishDish}
                aria-label="Inspect Stuffed Grilled Bangus — ₱410"
                className="group absolute inset-0 m-auto flex aspect-[1.32/1] w-[86%] -rotate-3 items-center justify-center overflow-hidden rounded-[50%] border-[8px] border-white bg-white shadow-[0_28px_56px_-14px_rgba(11,39,24,0.38)] transition duration-500 hover:rotate-0 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0B2718] sm:w-[88%] sm:border-[12px]"
              >
                <img
                  src="./images/dish-bangus-oval-platter.jpg"
                  alt="Whole charcoal-grilled Filipino Stuffed Bangus served on an oval white porcelain plate with citrus and herbs"
                  className="h-full w-full scale-[1.28] rotate-[10deg] object-cover object-center transition duration-700 group-hover:scale-[1.32]"
                />
              </button>

              {/* Clean Floating Dish Tag */}
              <button
                type="button"
                onClick={onInspectFishDish}
                className="absolute bottom-2 right-2 z-10 inline-flex items-center gap-2 rounded-full border border-[#0B2718]/15 bg-white/95 px-4 py-2 text-xs font-bold text-[#0B2718] shadow-lg backdrop-blur-sm transition hover:bg-[#FAF6EC] sm:bottom-3 sm:right-4"
              >
                <span className="h-2 w-2 rounded-full bg-[#E85234]" aria-hidden="true" />
                <span>Stuffed Grilled Bangus · ₱410</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#E85234]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
