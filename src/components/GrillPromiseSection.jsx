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
      className="relative overflow-hidden border-b border-[#0B2718]/12 bg-[#F5EFE2] py-14 text-[#0B2718] sm:py-20 lg:flex lg:min-h-[calc(100svh-74px)] lg:items-center lg:py-16"
    >
      {/* Top-Left Open Flame Accent blended cleanly into warm beige */}
      <img
        src="./images/flame-corner.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-2 -top-2 h-28 w-36 object-cover object-left-top opacity-90 mix-blend-multiply sm:h-40 sm:w-52 lg:h-56 lg:w-72"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />

      {/* Subtle Bottom-Left & Bottom-Right Fresh Cansi Ingredients Accent */}
      <img
        src="./images/cansi-ingredients-corner.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 hidden h-36 w-48 object-cover object-left-bottom opacity-90 mix-blend-multiply md:block lg:h-44 lg:w-56"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <img
        src="./images/cansi-ingredients-corner.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 hidden h-36 w-48 -scale-x-100 object-cover object-left-bottom opacity-85 mix-blend-multiply md:block lg:h-44 lg:w-56"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Editorial Column */}
          <div className="relative z-10 lg:col-span-6">
            <h2 className="font-serif text-[2.15rem] font-semibold leading-[1.12] tracking-tight text-[#0B2718] sm:text-5xl xl:text-[3.25rem]">
              PIYO&apos;s{' '}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10">#1 House Favorite</span>
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

          {/* Right Stretched Forest-Green Cansi Ingredients Tapestry & Oval Platter */}
          <div className="relative lg:col-span-6">
            <div className="relative -mx-5 flex items-center justify-center py-5 sm:-mx-8 sm:py-6 lg:mx-0 lg:mr-[calc(50%-50vw)] lg:justify-start lg:pl-6 xl:pl-10">
              {/* Stretched Deep Forest Green Tapestry extending flush to the right viewport edge */}
              <svg
                viewBox="0 0 960 440"
                preserveAspectRatio="xMinYMid slice"
                aria-hidden="true"
                className="pointer-events-none h-[300px] w-full drop-shadow-[0_18px_36px_rgba(11,39,24,0.22)] sm:h-[390px] lg:h-[430px] xl:h-[460px]"
              >
                <defs>
                  {/* Bacolod Cansi Ingredient Sketches: Marrow Bone, Calamansi, Siling Haba Chili, Lemongrass & Langka */}
                  <pattern
                    id="piyo-cansi-ingredients"
                    width="150"
                    height="150"
                    patternUnits="userSpaceOnUse"
                  >
                    {/* Beef Bone Marrow cross-section */}
                    <path
                      d="M24 38 C20 22, 42 16, 54 28 C64 38, 56 54, 40 54 C28 54, 26 46, 24 38 Z"
                      fill="none"
                      stroke="rgba(223,185,111,0.24)"
                      strokeWidth="1.4"
                    />
                    <ellipse
                      cx="40"
                      cy="37"
                      rx="8"
                      ry="6.5"
                      fill="none"
                      stroke="rgba(250,246,236,0.18)"
                      strokeWidth="1.2"
                    />

                    {/* Halved Calamansi Citrus Wheel */}
                    <circle
                      cx="114"
                      cy="38"
                      r="16"
                      fill="none"
                      stroke="rgba(250,246,236,0.2)"
                      strokeWidth="1.35"
                    />
                    <path
                      d="M114 22 L114 54 M98 38 L130 38 M102.7 26.7 L125.3 49.3 M125.3 26.7 L102.7 49.3"
                      stroke="rgba(223,185,111,0.22)"
                      strokeWidth="1.15"
                    />

                    {/* Siling Haba Green Finger Chili Pod */}
                    <path
                      d="M22 114 C34 102, 54 96, 66 98 C56 108, 42 120, 22 114 Z M66 98 C72 95, 76 91, 79 87"
                      fill="none"
                      stroke="rgba(223,185,111,0.24)"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Lemongrass (Tanglad) Bundle + Langka Wedge */}
                    <path
                      d="M94 128 L128 88 M102 132 L134 94 M110 134 L138 102"
                      stroke="rgba(250,246,236,0.18)"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M66 126 C72 112, 86 112, 90 126 Z"
                      fill="none"
                      stroke="rgba(223,185,111,0.2)"
                      strokeWidth="1.3"
                      strokeLinejoin="round"
                    />
                  </pattern>
                </defs>
                <path
                  d="M 18 14 Q 440 72 960 10 L 960 430 Q 440 368 18 426 Q 68 220 18 14 Z"
                  fill="#113421"
                />
                <path
                  d="M 18 14 Q 440 72 960 10 L 960 430 Q 440 368 18 426 Q 68 220 18 14 Z"
                  fill="url(#piyo-cansi-ingredients)"
                />
              </svg>

              {/* Interactive Tilted Cream-White Oval Platter centered cleanly over left-mid of stretched green canvas */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center lg:justify-start lg:pl-14 xl:pl-20">
                <div className="relative flex w-[84%] max-w-[460px] items-center justify-center sm:w-[76%] sm:max-w-[500px] lg:w-[88%] lg:max-w-[520px]">
                  <button
                    type="button"
                    onClick={onInspectDish}
                    aria-label="Inspect Bacolod Cansi — ₱666"
                    className="pointer-events-auto group relative flex aspect-[1.32/1] w-full -rotate-2 items-center justify-center overflow-hidden rounded-[50%] border-[8px] border-[#FAF6EC] bg-[#FAF6EC] shadow-[0_28px_56px_-14px_rgba(6,24,14,0.52)] transition duration-500 hover:rotate-0 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0B2718] sm:border-[12px]"
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
                    className="pointer-events-auto absolute -bottom-3 right-2 z-10 inline-flex items-center gap-2 rounded-full border border-[#0B2718]/15 bg-[#FAF6EC]/95 px-4 py-2 text-xs font-bold text-[#0B2718] shadow-lg backdrop-blur-sm transition hover:bg-white sm:bottom-1 sm:right-4"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#C29645]" aria-hidden="true" />
                    <span>Bacolod Cansi · ₱666</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#C29645]" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
