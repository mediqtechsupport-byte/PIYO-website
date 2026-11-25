import React, { useEffect, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';

const HERO_PLATES = [
  {
    id: 'bacolod-chicken-inasal',
    name: 'Chicken Inasal',
    price: '₱366',
    image: './images/hero-plate-inasal.png',
    alt: 'Overhead matte black stoneware plate of PIYO charcoal-grilled Bacolod Chicken Inasal with garlic java rice, banana leaf, charred calamansi, and chili',
  },
  {
    id: 'bacolod-cansi',
    name: 'Bacolod Cansi',
    price: '₱666',
    image: './images/hero-plate-cansi.png',
    alt: 'Overhead matte black stoneware bowl of PIYO authentic Bacolod Cansi beef bone marrow soup with langka, sili haba, lemongrass, and toasted garlic',
  },
  {
    id: 'pork-liempo-grilled',
    name: 'Grilled Pork Liempo',
    price: '₱401',
    image: './images/hero-plate-liempo.png',
    alt: 'Overhead matte black stoneware plate of PIYO charcoal-grilled marinated Pork Liempo',
  },
];

export function HeroSection({
  onExploreMenu,
  onExploreStory,
  onSelectDishById,
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_PLATES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const activePlate = HERO_PLATES[activeIdx];

  return (
    <section
      id="home"
      className="relative flex flex-col justify-center overflow-hidden bg-[#08130B] text-[#FAF6EC] lg:min-h-[calc(100svh-var(--nav-h,69px))]"
    >
      {/* Sweeping Warm Cream-Beige Curved Organic Diagonal Shape Hugging the Main Plate */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[32%] -right-[18%] h-[460px] w-[620px] -rotate-[34deg] overflow-hidden rounded-[9999px] bg-[#EDE5D0] shadow-[inset_0_2px_28px_rgba(8,19,11,0.10)] sm:-bottom-[28%] sm:-right-[16%] sm:h-[540px] sm:w-[760px] lg:-bottom-[28%] lg:-right-[14%] lg:h-[590px] lg:w-[840px] xl:-bottom-[26%] xl:-right-[12%] xl:h-[650px] xl:w-[940px] 2xl:-bottom-[24%] 2xl:-right-[10%] 2xl:h-[710px] 2xl:w-[1020px]"
      >
        {/* Subtle Woven Solihiya Linen Texture Inside Warm Beige Curve */}
        <div
          className="absolute inset-0 opacity-[0.075]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='56' height='56' viewBox='0 0 56 56' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%230D1C11' stroke-width='1'%3E%3Cpath d='M0 28H56M28 0V56M0 0L56 56M56 0L0 56' opacity='0.45'/%3E%3Crect x='14' y='14' width='28' height='28' rx='4'/%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: '48px 48px',
          }}
        />
        {/* Soft Warm Botanical Palm Frond Accent Along Outer Right Edge of Beige Curve */}
        <svg
          viewBox="0 0 360 360"
          fill="none"
          className="absolute -bottom-8 right-10 h-72 w-72 rotate-[26deg] text-[#0D1C11]/[0.08] sm:h-88 sm:w-88"
        >
          <path
            d="M40 320C115 240 205 155 320 40"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M110 250C90 190 120 130 165 95M145 215C140 160 175 112 222 80M185 175C192 128 228 92 272 68M128 232C185 245 245 225 288 188M168 192C220 200 268 180 306 146M208 152C250 156 290 138 322 108"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
        {/* Soft Inner Radial Warmth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 68% 68% at 38% 44%, rgba(255,252,244,0.45) 0%, transparent 72%)',
          }}
        />
      </div>

      {/* Subtle Ambient Pine Vignette on Left Side for Pure Minimalist Depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 52% 65% at 16% 42%, rgba(19,35,22,0.22) 0%, transparent 70%)',
        }}
      />

      {/* Main Two-Column Hero Stage — Uniform max-w-7xl Rail */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-12 pt-8 sm:px-8 sm:pb-14 sm:pt-10 lg:py-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Editorial Column (Verdeo Minimalist Script + Serif + 2 Pills + 3 Dots) */}
          <div className="relative z-10 w-full max-w-[510px] lg:col-span-6">
            {/* Organic Handwritten Script Eyebrow */}
            <p className="font-script text-[1.6rem] font-medium leading-none tracking-[0.01em] text-[#DFB96F] sm:text-[1.9rem]">
              Good Food, Tagaytay Mood
            </p>

            {/* Bold Sculptural Editorial Serif Headline + Handwritten Script Focal Word */}
            <h1 className="mt-2.5 font-serif text-[2.65rem] font-medium leading-[1.06] tracking-[-0.025em] text-[#FAF6EC] sm:text-[3.35rem] lg:text-[3.6rem] xl:text-[3.95rem]">
              Experience Food
              <span className="block">That Feels Like</span>
              <span className="font-script mt-0.5 block text-[3.55rem] font-medium leading-[0.92] tracking-[0.01em] text-[#DFB96F] sm:text-[4.35rem] xl:text-[4.85rem]">
                Home
              </span>
            </h1>

            {/* Delicate Botanical Leaf Flourish */}
            <div className="mt-1 pl-20 sm:pl-28" aria-hidden="true">
              <svg
                viewBox="0 0 36 22"
                fill="none"
                className="h-4 w-7 text-[#DFB96F]/85"
              >
                <path
                  d="M4 18C9 9 20 3 32 4C28 14 18 20 4 18Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 18C12 13 20 9 29 5.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Concise Warm Hospitality Description */}
            <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-[#D0DDD4] sm:text-[15px] sm:leading-7">
              From slow-simmered Bacolod cansi to charcoal-grilled chicken
              inasal, we serve honest Negrense meals that warm your heart and
              bring smiles to every plate.
            </p>

            {/* Dual Pill CTAs — Solid Warm Gold + Crisp Outline */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <button
                type="button"
                onClick={onExploreMenu}
                className="group inline-flex min-h-[46px] items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-[#DFB96F] px-6 py-2.5 text-xs font-bold tracking-wide text-[#08130B] shadow-lg shadow-black/25 transition hover:bg-[#E8C988] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF6EC] sm:px-7 sm:text-sm"
              >
                <span>Explore Our Menu</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={onExploreStory}
                className="group inline-flex min-h-[46px] items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-white/35 bg-transparent px-6 py-2.5 text-xs font-medium tracking-wide text-[#FAF6EC] transition hover:border-[#DFB96F] hover:text-[#DFB96F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] sm:px-7 sm:text-sm"
              >
                <span>Our Story</span>
                <Play
                  className="h-3 w-3 fill-current transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Interactive 3-Dot Dish Showcase Switcher (Bottom Left — Verdeo Signature) */}
            <div
              className="mt-10 flex items-center gap-3 lg:mt-14"
              role="tablist"
              aria-label="Featured PIYO signature plates"
            >
              {HERO_PLATES.map((plate, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={plate.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Show ${plate.name} (${plate.price})`}
                    onClick={() => setActiveIdx(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F] ${
                      isActive
                        ? 'w-2.5 bg-[#DFB96F] ring-4 ring-[#DFB96F]/25'
                        : 'w-2.5 bg-[#FAF6EC]/40 hover:bg-[#FAF6EC]/75'
                    }`}
                  />
                );
              })}
              <span className="ml-2 text-[11px] font-medium tracking-wide text-[#A9BEB1]">
                {activePlate.name} ·{' '}
                <span className="text-[#DFB96F]">{activePlate.price}</span>
              </span>
            </div>
          </div>

          {/* Right Overhead Circular Matte-Stoneware Dish Showcase Centered Over Warm Beige Curve */}
          <div className="relative flex items-center justify-center lg:col-span-6 lg:justify-end">
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative flex aspect-square w-[340px] items-center justify-center sm:w-[465px] lg:w-[565px] lg:translate-x-10 xl:w-[645px] xl:translate-x-20 2xl:w-[690px] 2xl:translate-x-32"
            >
              {/* Realistic Soft Overhead Contact Shadow Under the Main Circular Plate */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[4%] translate-x-3 translate-y-5 rounded-full bg-black/45 blur-2xl"
              />

              {/* Cross-Fading Circular Overhead Matte-Stoneware PIYO Menu Plates */}
              <button
                type="button"
                onClick={() => onSelectDishById(activePlate.id)}
                aria-label={`Inspect ${activePlate.name} — ${activePlate.price}`}
                className="group relative z-10 h-full w-full cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F]"
              >
                {HERO_PLATES.map((plate, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <img
                      key={plate.id}
                      src={plate.image}
                      alt={plate.alt}
                      draggable={false}
                      className={`absolute inset-0 h-full w-full select-none rounded-full object-contain drop-shadow-[0_26px_38px_rgba(0,0,0,0.52)] transition-all duration-700 ease-out ${
                        isActive
                          ? 'scale-100 rotate-0 opacity-100 group-hover:scale-[1.025]'
                          : 'pointer-events-none scale-95 -rotate-6 opacity-0'
                      }`}
                    />
                  );
                })}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
