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
      className="relative overflow-hidden border-b border-[#0B2718]/12 bg-[#F5EFE2] py-14 text-[#0B2718] sm:py-16 lg:flex lg:min-h-[calc(100svh-var(--nav-h,69px))] lg:items-center lg:py-10 xl:py-12"
    >
      {/* Top-Left Open Flame Accent blended cleanly into warm beige */}
      <img
        src="./images/flame-corner.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-2 -top-2 h-28 w-36 object-cover object-left-top opacity-90 mix-blend-multiply sm:h-40 sm:w-52 lg:h-52 lg:w-68"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />

      {/* Individual 3D Cansi & Grill Ingredients scattered separately across open warm beige background */}
      <img
        src="./images/ing-calamansi-3d.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[45%] top-2 z-0 hidden h-24 w-24 -rotate-12 object-contain brightness-[1.06] contrast-[1.06] mix-blend-multiply [mask-image:radial-gradient(closest-side,black_62%,transparent_98%)] md:block xl:left-[45%] xl:top-3 xl:h-28 xl:w-28"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <img
        src="./images/ing-beef-3d.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[23%] top-1 z-0 hidden h-28 w-28 -rotate-[8deg] object-contain brightness-[1.04] contrast-[1.04] mix-blend-multiply [mask-image:radial-gradient(closest-side,black_76%,transparent_99%)] md:block xl:right-[22%] xl:top-2 xl:h-32 xl:w-32"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <img
        src="./images/ing-chili-3d.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[5%] top-2 z-0 h-20 w-20 rotate-[14deg] object-contain brightness-[1.06] contrast-[1.06] mix-blend-multiply [mask-image:radial-gradient(closest-side,black_62%,transparent_98%)] sm:h-24 sm:w-24 xl:right-[6%] xl:top-3 xl:h-28 xl:w-28"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <img
        src="./images/ing-garlic-3d.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 left-[2%] z-0 hidden h-20 w-20 -rotate-12 object-contain brightness-[1.06] contrast-[1.06] mix-blend-multiply [mask-image:radial-gradient(closest-side,black_62%,transparent_98%)] sm:block xl:bottom-4 xl:left-[4%] xl:h-24 xl:w-24"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <img
        src="./images/ing-lemongrass-3d.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 left-[40%] z-0 hidden h-24 w-24 rotate-[18deg] object-contain brightness-[1.06] contrast-[1.06] mix-blend-multiply [mask-image:radial-gradient(closest-side,black_62%,transparent_98%)] md:block xl:bottom-4 xl:left-[41%] xl:h-28 xl:w-28"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <img
        src="./images/ing-marrow-3d.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 right-[9%] z-0 h-24 w-24 rotate-[8deg] object-contain brightness-[1.06] contrast-[1.06] mix-blend-multiply [mask-image:radial-gradient(closest-side,black_62%,transparent_98%)] sm:h-28 sm:w-28 xl:bottom-4 xl:right-[11%] xl:h-32 xl:w-32"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <img
        src="./images/ing-salt-3d.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 right-[26%] z-0 hidden h-20 w-24 rotate-[-6deg] object-contain drop-shadow-[0_6px_12px_rgba(11,39,24,0.12)] md:block xl:bottom-4 xl:right-[27%] xl:h-24 xl:w-28 2xl:right-[28%]"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <img
        src="./images/ing-pepper-3d.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[35%] top-1 z-0 hidden h-20 w-20 rotate-[12deg] object-contain brightness-[1.05] contrast-[1.06] mix-blend-multiply [mask-image:radial-gradient(closest-side,black_76%,transparent_99%)] lg:block xl:right-[36%] xl:top-2 xl:h-24 xl:w-24"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <img
        src="./images/ing-salt-3d.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[3%] top-[44%] z-0 hidden h-20 w-24 rotate-[10deg] object-contain opacity-95 drop-shadow-[0_6px_12px_rgba(11,39,24,0.12)] 2xl:block"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <img
        src="./images/ing-pepper-3d.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[4.5%] top-[62%] z-0 hidden h-20 w-20 -rotate-[14deg] object-contain brightness-[1.05] contrast-[1.06] mix-blend-multiply [mask-image:radial-gradient(closest-side,black_76%,transparent_99%)] 2xl:block"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Left Editorial Column */}
          <div className="relative z-10 pb-2 lg:col-span-6 lg:pb-2">
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
            <div className="mt-6 space-y-4">
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

            <div className="mt-7 flex flex-wrap items-center gap-3">
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

          {/* Right Stretched Clean Forest-Green Tapestry & Centered Bacolod Cansi Oval Platter */}
          <div className="relative lg:col-span-6">
            <div className="relative -mx-5 flex h-[330px] items-center justify-center py-4 sm:-mx-8 sm:h-[420px] sm:py-6 lg:mx-0 lg:mr-[calc(-1*max(2rem,50vw-40rem+2rem))] lg:h-[460px] xl:h-[500px]">
              {/* Stretched Deep Forest Green Shape bounded cleanly to viewport right edge */}
              <svg
                viewBox="0 0 800 460"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-[0_18px_36px_rgba(11,39,24,0.22)]"
              >
                <defs>
                  <clipPath id="piyo-cansi-banner-clip">
                    <path d="M 18 14 Q 380 62 800 10 L 800 450 Q 380 398 18 446 Q 58 230 18 14 Z" />
                  </clipPath>
                </defs>
                <path
                  d="M 18 14 Q 380 62 800 10 L 800 450 Q 380 398 18 446 Q 58 230 18 14 Z"
                  fill="#113421"
                />
              </svg>

              {/* Unstretched Delicate Culinary Line-Art Pattern inside clipped silhouette */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-90"
                style={{
                  clipPath: 'polygon(2% 3%, 48% 12%, 100% 2%, 100% 98%, 48% 88%, 2% 97%, 6% 50%)',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='130' height='130' viewBox='0 0 130 130'%3E%3Ccircle cx='34' cy='34' r='14' fill='none' stroke='rgba(250,246,236,0.13)' stroke-width='1.3'/%3E%3Cpath d='M34 20v28M20 34h28M24 24l20 20M44 24L24 44' stroke='rgba(223,185,111,0.16)' stroke-width='1.1'/%3E%3Cpath d='M86 38c8-10 22-12 30-8-6 10-16 18-30 14z' fill='none' stroke='rgba(223,185,111,0.16)' stroke-width='1.3'/%3E%3Cpath d='M22 98c10-10 28-10 38 0-8 10-26 10-38 0z' fill='none' stroke='rgba(250,246,236,0.12)' stroke-width='1.3'/%3E%3Cellipse cx='41' cy='98' rx='7' ry='5' fill='none' stroke='rgba(223,185,111,0.15)' stroke-width='1.1'/%3E%3Cpath d='M82 110l28-32M90 112l26-30' stroke='rgba(250,246,236,0.12)' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundSize: '130px 130px',
                }}
              />

              {/* Interactive Tilted Cream-White Oval Platter centered neatly inside the visible green banner */}
              <div className="pointer-events-none relative z-10 flex w-full items-center justify-center px-6 sm:px-10">
                <div className="relative flex w-[78%] max-w-[330px] items-center justify-center sm:w-[70%] sm:max-w-[420px] lg:w-[76%] lg:max-w-[450px]">
                  <button
                    type="button"
                    onClick={onInspectDish}
                    aria-label="Inspect Bacolod Cansi — ₱666"
                    className="pointer-events-auto group relative flex aspect-[1.32/1] w-full -rotate-2 items-center justify-center overflow-hidden rounded-[50%] border-[8px] border-[#FAF6EC] bg-[#FAF6EC] shadow-[0_28px_56px_-14px_rgba(6,24,14,0.58)] transition duration-500 hover:rotate-0 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0B2718] sm:border-[12px]"
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
                    className="pointer-events-auto absolute -bottom-3 right-2 z-10 inline-flex items-center gap-2 rounded-full border border-[#0B2718]/15 bg-[#FAF6EC]/95 px-4 py-2 text-xs font-bold text-[#0B2718] shadow-lg backdrop-blur-sm transition hover:bg-white sm:bottom-0 sm:right-4"
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
