import React from 'react';
import { Flame, Landmark, MapPin, Users, ArrowDownRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

const HISTORY_MILESTONES = [
  {
    icon: Flame,
    tag: 'Culinary Roots',
    title: 'Negrense & Ilonggo Hearth Recipes',
    description:
      'Genuine batwan fruit, calamansi, tanglad & annatto oil paired with fresh, never-frozen meats prepared daily.',
  },
  {
    icon: Landmark,
    tag: 'Est. 2025 · Km. 64',
    title: 'Opened in Brgy. Bagong Tubig, Tagaytay',
    description:
      'Stone-and-timber dining hall separated from our outdoor charcoal pit so guests dine smoky-flavor rich yet smoke-free.',
  },
  {
    icon: Users,
    tag: 'More Than a Meal',
    title: 'Bringing Smiles to Every Plate',
    description:
      '6–8 seater family tables, Fri–Sun 7:00 AM silog mornings, and complimentary steaming Bacolod Cansi soup refills.',
  },
];

export function HistorySection({ onExploreCraft, onVisitPlace }) {
  return (
    <section
      id="history"
      className="relative flex flex-col justify-center overflow-hidden border-y border-[#DFB96F]/20 bg-[#06180E] py-10 text-[#FAF6EC] sm:py-12 lg:min-h-[calc(100svh-74px)] lg:py-4"
    >
      {/* Full-Bleed Architectural Background of PIYO's Real Tagaytay Place */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="./images/piyo-place-real.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full scale-105 object-cover object-center opacity-50 blur-[1.5px]"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06180E]/92 via-[#071D12]/76 to-[#06180E]/54" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06180E]/72 via-transparent to-[#06180E]/82" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_38%,rgba(223,185,111,0.14),transparent_52%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Editorial History Column */}
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#DFB96F] sm:text-xs">
              <span className="inline-flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#DFB96F]"
                  aria-hidden="true"
                />
                Our History &amp; Place
              </span>
              <span
                className="h-px w-8 shrink-0 bg-[#DFB96F]/45 sm:w-10"
                aria-hidden="true"
              />
              <span className="text-[#C8D6CD]">{RESTAURANT_INFO.established}</span>
            </div>

            <h2 className="mt-2.5 font-serif text-[2rem] font-semibold leading-[1.08] tracking-tight text-[#FAF6EC] sm:text-4xl xl:text-[2.75rem]">
              From Negros Hearth to{' '}
              <span className="italic font-medium text-[#E0B96B]">
                Tagaytay&rsquo;s Cool Ridge.
              </span>
            </h2>

            <p className="mt-2.5 max-w-xl border-l-2 border-[#DFB96F]/55 pl-3.5 text-xs leading-relaxed text-[#D7E3DB] sm:text-sm sm:leading-6">
              Founded in 2025 along Km. 64 of the Tagaytay–Nasugbu Highway in
              Brgy. Bagong Tubig, PIYO pairs Western Visayas heirloom dishes
              with live charcoal cooking in a breezy mountain dining hall.
            </p>

            {/* 3 Grounded Heritage Milestones */}
            <div className="mt-3.5 space-y-2">
              {HISTORY_MILESTONES.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#06180E]/68 px-3.5 py-2 backdrop-blur-md"
                  >
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#DFB96F]/30 bg-[#0F2F1D] text-[#DFB96F]">
                      <Icon className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#DFB96F]">
                        {item.tag}
                      </span>
                      <h3 className="font-serif text-[15px] font-semibold leading-snug text-[#FAF6EC] sm:text-base">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs leading-snug text-[#C9D7CE]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExploreCraft}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#DFB96F] px-5 py-2 text-xs font-bold text-[#06180E] shadow-lg transition hover:bg-[#E7C88B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] sm:text-sm"
              >
                <span>See Our #1 House Cansi</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onVisitPlace}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-white/25 bg-[#06180E]/60 px-5 py-2 text-xs font-semibold text-[#FAF6EC] backdrop-blur-sm transition hover:border-[#DFB96F]/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] sm:text-sm"
              >
                <MapPin className="h-3.5 w-3.5 text-[#DFB96F]" aria-hidden="true" />
                <span>Km. 64 · Tagaytay Directions</span>
              </button>
            </div>
          </div>

          {/* Right Column: Exterior Architectural Showcase of Their Real Place */}
          <div className="lg:col-span-6">
            <div className="mx-auto max-w-xl rounded-[26px] border border-[#DFB96F]/35 bg-[#06180E]/78 p-3 shadow-[0_28px_60px_-15px_rgba(0,0,0,0.72)] backdrop-blur-md lg:ml-auto">
              <div className="relative overflow-hidden rounded-[18px]">
                <img
                  src="./images/piyo-place-real.jpg"
                  alt="PIYO Grill & Restaurant stone pillars and glowing green gable facade along Km. 64 Tagaytay"
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover object-[center_42%]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06180E]/85 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3.5 right-3.5 flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DFB96F]/45 bg-[#06180E]/85 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#DFB96F]">
                      {RESTAURANT_INFO.established} · Km. 64 Highway
                    </span>
                    <p className="mt-1 font-serif text-base font-semibold leading-tight text-[#FAF6EC] sm:text-lg">
                      PIYO Grill &amp; Restaurant · Tagaytay City
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-2.5 grid grid-cols-1 gap-2 px-1 pb-0.5 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#DFB96F]">
                    Where You&rsquo;ll Find Us
                  </p>
                  <p className="mt-0.5 text-xs font-medium leading-snug text-[#FAF6EC]">
                    {RESTAURANT_INFO.shortAddress}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#DFB96F]">
                    Built for Groups &amp; Travelers
                  </p>
                  <p className="mt-0.5 text-xs font-medium leading-snug text-[#FAF6EC]">
                    Indoor Smoke-Free Hall · 6–8 Pax Family Tables
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
