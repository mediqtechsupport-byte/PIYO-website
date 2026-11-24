import React, { useState } from 'react';
import { Flame, Soup, UtensilsCrossed, ArrowUpRight } from 'lucide-react';

const BROTH_DROPLETS = [
  { left: '20%', top: '24%', size: 6, delay: '0s', duration: '3.4s' },
  { left: '28%', top: '68%', size: 5, delay: '0.8s', duration: '4.1s' },
  { left: '34%', top: '16%', size: 4, delay: '1.4s', duration: '3.7s' },
  { left: '72%', top: '22%', size: 6, delay: '0.4s', duration: '3.9s' },
  { left: '78%', top: '54%', size: 5, delay: '1.1s', duration: '4.3s' },
  { left: '66%', top: '74%', size: 4, delay: '1.8s', duration: '3.5s' },
  { left: '24%', top: '46%', size: 4, delay: '2.1s', duration: '4.0s' },
  { left: '76%', top: '34%', size: 5, delay: '0.6s', duration: '3.6s' },
];

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
  const [tilt, setTilt] = useState({ x: 0, y: 0, hovered: false });

  const handleStageMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: nx, y: ny, hovered: true });
  };

  const handleStageLeave = () => {
    setTilt({ x: 0, y: 0, hovered: false });
  };

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

          {/* Right Stretched Deep Forest-Green Tapestry & Interactive 3D Animated Mid-Air Exploded Bacolod Cansi */}
          <div className="relative lg:col-span-6">
            <div
              onPointerMove={handleStageMove}
              onPointerLeave={handleStageLeave}
              className="group relative -mx-5 flex h-[360px] items-center justify-center py-4 sm:-mx-8 sm:h-[440px] sm:py-6 lg:mx-0 lg:mr-[calc(-1*max(2rem,50vw-40rem+2rem))] lg:h-[490px] xl:h-[530px]"
            >
              {/* Stretched Deep Emerald Tapestry matched directly to exploded Cansi corner tone (#092516) */}
              <svg
                viewBox="0 0 800 460"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-[0_22px_42px_rgba(6,24,14,0.28)]"
              >
                <path
                  d="M 18 14 Q 380 62 800 10 L 800 450 Q 380 398 18 446 Q 58 230 18 14 Z"
                  fill="#092516"
                />
              </svg>

              {/* Subtle Culinary Line-Art Pattern inside clipped silhouette */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-65"
                style={{
                  clipPath:
                    'polygon(2% 3%, 48% 12%, 100% 2%, 100% 98%, 48% 88%, 2% 97%, 6% 50%)',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='130' height='130' viewBox='0 0 130 130'%3E%3Ccircle cx='34' cy='34' r='14' fill='none' stroke='rgba(250,246,236,0.12)' stroke-width='1.2'/%3E%3Cpath d='M34 20v28M20 34h28M24 24l20 20M44 24L24 44' stroke='rgba(223,185,111,0.14)' stroke-width='1'/%3E%3Cpath d='M86 38c8-10 22-12 30-8-6 10-16 18-30 14z' fill='none' stroke='rgba(223,185,111,0.14)' stroke-width='1.2'/%3E%3Cpath d='M22 98c10-10 28-10 38 0-8 10-26 10-38 0z' fill='none' stroke='rgba(250,246,236,0.1)' stroke-width='1.2'/%3E%3C/svg%3E")`,
                  backgroundSize: '130px 130px',
                }}
              />

              {/* Breathing Golden-Amber Hearth Halo Behind the Floating Exploded Cansi */}
              <div
                aria-hidden="true"
                className="cansi-halo pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[380px] sm:w-[380px]"
                style={{
                  background:
                    'radial-gradient(circle, rgba(232,158,52,0.34) 0%, rgba(216,136,36,0.14) 44%, rgba(9,37,22,0) 74%)',
                }}
              />

              {/* Interactive 3D Parallax Exploded Bacolod Cansi Showcase */}
              <div className="relative z-10 flex h-full w-full items-center justify-center px-4 sm:px-8">
                <button
                  type="button"
                  onClick={onInspectDish}
                  aria-label="Inspect Bacolod Cansi — ₱666"
                  className="relative flex h-[340px] w-full max-w-[440px] cursor-pointer items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] sm:h-[420px] sm:max-w-[540px] lg:h-[465px] lg:max-w-[590px]"
                  style={{
                    perspective: '960px',
                  }}
                >
                  {/* 3D Tilting Container */}
                  <div
                    className="relative flex h-full w-full items-center justify-center transition-transform duration-300 ease-out"
                    style={{
                      transform: `rotateY(${(tilt.x * 7).toFixed(2)}deg) rotateX(${(-tilt.y * 5.5).toFixed(2)}deg) scale(${tilt.hovered ? 1.03 : 1})`,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Rising Translucent Cansi Broth Steam Ribbons */}
                    <svg
                      viewBox="0 0 260 220"
                      fill="none"
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-2 left-1/2 z-20 h-44 w-56 -translate-x-1/2 opacity-80 sm:h-52 sm:w-64"
                    >
                      <path
                        d="M95 190 C78 148, 114 114, 92 66 C80 42, 96 22, 106 8"
                        stroke="url(#piyo-steam-grad)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className="cansi-steam"
                        style={{ animationDelay: '0s', filter: 'blur(5px)' }}
                      />
                      <path
                        d="M134 195 C152 152, 116 112, 140 62 C150 38, 134 18, 126 6"
                        stroke="url(#piyo-steam-grad)"
                        strokeWidth="9"
                        strokeLinecap="round"
                        className="cansi-steam"
                        style={{ animationDelay: '1.5s', filter: 'blur(6px)' }}
                      />
                      <path
                        d="M170 184 C154 146, 182 110, 162 70 C154 52, 166 30, 174 16"
                        stroke="url(#piyo-steam-grad)"
                        strokeWidth="7"
                        strokeLinecap="round"
                        className="cansi-steam"
                        style={{ animationDelay: '3.0s', filter: 'blur(5px)' }}
                      />
                      <defs>
                        <linearGradient id="piyo-steam-grad" x1="0" y1="1" x2="0" y2="0">
                          <stop offset="0%" stopColor="#FAF6EC" stopOpacity="0" />
                          <stop offset="40%" stopColor="#F5E4BE" stopOpacity="0.48" />
                          <stop offset="100%" stopColor="#FAF6EC" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Levitating Hyper-Realistic Mid-Air Exploded Bacolod Cansi Centerpiece */}
                    <div className="cansi-hero-levitate relative z-10 flex h-full w-full items-center justify-center">
                      <img
                        src="./images/cansi-exploded-hero.jpg"
                        alt="Hyper-realistic mid-air exploded Bacolod Cansi showing stoneware bowl, splashing golden batwan broth, beef shank bone marrow, langka jackfruit, lemongrass, calamansi, chilies, and toasted garlic"
                        className="h-full w-full object-contain [mask-image:radial-gradient(ellipse_49%_49%_at_50%_50%,black_66%,transparent_99%)]"
                      />
                    </div>

                    {/* Floating 3D Parallax Satellite Ingredients Caught in Dynamic Gust */}
                    <img
                      src="./images/cansi-float-calamansi.png"
                      alt=""
                      aria-hidden="true"
                      className="cansi-orbit-a pointer-events-none absolute left-[10%] top-[14%] z-20 h-11 w-11 object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.55)] transition-transform duration-500 sm:left-[12%] sm:h-14 sm:w-14"
                      style={{
                        marginLeft: `${(tilt.x * -14).toFixed(1)}px`,
                        marginTop: `${(tilt.y * -10).toFixed(1)}px`,
                      }}
                    />
                    <img
                      src="./images/cansi-float-chili.png"
                      alt=""
                      aria-hidden="true"
                      className="cansi-orbit-b pointer-events-none absolute right-[10%] top-[18%] z-20 h-11 w-12 object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.55)] transition-transform duration-500 sm:right-[11%] sm:h-14 sm:w-16"
                      style={{
                        marginRight: `${(tilt.x * 14).toFixed(1)}px`,
                        marginTop: `${(tilt.y * -12).toFixed(1)}px`,
                      }}
                    />
                    <img
                      src="./images/cansi-float-garlic.png"
                      alt=""
                      aria-hidden="true"
                      className="cansi-orbit-c pointer-events-none absolute bottom-[22%] left-[11%] z-20 h-9 w-9 object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.55)] transition-transform duration-500 sm:left-[13%] sm:h-11 sm:w-11"
                      style={{
                        marginLeft: `${(tilt.x * -16).toFixed(1)}px`,
                        marginBottom: `${(tilt.y * 10).toFixed(1)}px`,
                      }}
                    />
                    <img
                      src="./images/cansi-float-lemongrass.png"
                      alt=""
                      aria-hidden="true"
                      className="cansi-orbit-a pointer-events-none absolute bottom-[24%] right-[9%] z-20 h-14 w-14 rotate-12 object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.55)] transition-transform duration-500 sm:right-[10%] sm:h-16 sm:w-16"
                      style={{
                        marginRight: `${(tilt.x * 16).toFixed(1)}px`,
                        marginBottom: `${(tilt.y * 12).toFixed(1)}px`,
                      }}
                    />

                    {/* Mid-Air Shimmering Golden Broth Droplets */}
                    {BROTH_DROPLETS.map((drop, idx) => (
                      <span
                        key={idx}
                        aria-hidden="true"
                        className="cansi-droplet pointer-events-none absolute z-20 rounded-full bg-gradient-to-br from-[#FFE49E] via-[#E5A33A] to-[#B56918] shadow-[0_0_10px_rgba(232,163,58,0.8)]"
                        style={{
                          left: drop.left,
                          top: drop.top,
                          width: `${drop.size}px`,
                          height: `${drop.size}px`,
                          animationDelay: drop.delay,
                          animationDuration: drop.duration,
                        }}
                      />
                    ))}
                  </div>
                </button>

                {/* Clean Floating Dish Tag */}
                <button
                  type="button"
                  onClick={onInspectDish}
                  className="pointer-events-auto absolute bottom-3 right-6 z-30 inline-flex items-center gap-2 rounded-full border border-[#0B2718]/15 bg-[#FAF6EC]/95 px-4 py-2 text-xs font-bold text-[#0B2718] shadow-lg backdrop-blur-sm transition hover:bg-white sm:bottom-5 sm:right-10"
                >
                  <span
                    className="h-2 w-2 rounded-full bg-[#C29645]"
                    aria-hidden="true"
                  />
                  <span>Bacolod Cansi · ₱666</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-[#C29645]"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
