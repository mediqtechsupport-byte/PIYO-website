import React, { useState } from 'react';
import { Flame, Soup, UtensilsCrossed, ArrowUpRight } from 'lucide-react';

const BROTH_DROPLETS = [
  { left: '14%', top: '20%', size: 6, delay: '0s', duration: '3.4s' },
  { left: '22%', top: '72%', size: 5, delay: '0.8s', duration: '4.1s' },
  { left: '30%', top: '12%', size: 4, delay: '1.4s', duration: '3.7s' },
  { left: '78%', top: '18%', size: 6, delay: '0.4s', duration: '3.9s' },
  { left: '84%', top: '56%', size: 5, delay: '1.1s', duration: '4.3s' },
  { left: '72%', top: '78%', size: 4, delay: '1.8s', duration: '3.5s' },
  { left: '18%', top: '46%', size: 4, delay: '2.1s', duration: '4.0s' },
  { left: '82%', top: '34%', size: 5, delay: '0.6s', duration: '3.6s' },
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

          {/* Right Interactive 3D Animated Mid-Air Exploded Bacolod Cansi Floating Cleanly on Warm Beige */}
          <div className="relative lg:col-span-6">
            <div
              onPointerMove={handleStageMove}
              onPointerLeave={handleStageLeave}
              className="group relative flex h-[430px] items-center justify-center py-2 sm:h-[540px] lg:h-[600px] xl:h-[650px]"
            >
              {/* Interactive 3D Parallax Exploded Bacolod Cansi Showcase */}
              <div className="relative z-10 flex h-full w-full items-center justify-center">
                <button
                  type="button"
                  onClick={onInspectDish}
                  aria-label="Inspect Bacolod Cansi — ₱666"
                  className="relative flex h-[420px] w-full max-w-[540px] cursor-pointer items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#0B2718] sm:h-[530px] sm:max-w-[660px] lg:h-[590px] lg:max-w-[740px] xl:h-[640px] xl:max-w-[800px]"
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
                      className="pointer-events-none absolute -top-4 left-1/2 z-20 h-52 w-64 -translate-x-1/2 opacity-75 sm:h-60 sm:w-72"
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
                          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.62" />
                          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Levitating Hyper-Realistic Mid-Air Exploded Bacolod Cansi Centerpiece */}
                    <div className="cansi-hero-levitate relative z-10 flex h-full w-full items-center justify-center">
                      <img
                        src="./images/cansi-exploded-hero.jpg"
                        alt="Hyper-realistic mid-air exploded Bacolod Cansi showing stoneware bowl, splashing golden batwan broth, beef shank bone marrow, langka jackfruit, lemongrass, calamansi, chilies, and toasted garlic"
                        className="h-full w-full scale-[1.24] object-contain sm:scale-[1.28] lg:scale-[1.32] [mask-image:radial-gradient(ellipse_49%_49%_at_50%_50%,black_68%,transparent_99%)]"
                      />
                    </div>

                    {/* Mid-Air Shimmering Golden Broth Droplets */}
                    {BROTH_DROPLETS.map((drop, idx) => (
                      <span
                        key={idx}
                        aria-hidden="true"
                        className="cansi-droplet pointer-events-none absolute z-20 rounded-full bg-gradient-to-br from-[#F8D078] via-[#D9932C] to-[#9E5610] shadow-[0_2px_8px_rgba(180,105,22,0.45)]"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
