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
      className="relative flex flex-col justify-center overflow-hidden bg-[#06180E] text-[#FAF6EC] lg:min-h-[calc(100svh-var(--nav-h,69px))]"
    >
      {/* Sweeping Warm Cream-Beige Curved Organic Diagonal Shape with Subtle Filipino Solihiya Weave & Botanical Shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[28%] -right-[14%] h-[490px] w-[700px] -rotate-[34deg] overflow-hidden rounded-[9999px] bg-[#EDE5D0] shadow-[inset_0_2px_28px_rgba(6,24,14,0.10)] sm:-bottom-[24%] sm:-right-[12%] sm:h-[580px] sm:w-[860px] lg:-bottom-[22%] lg:-right-[10%] lg:h-[630px] lg:w-[960px] xl:-bottom-[20%] xl:-right-[8%] xl:h-[680px] xl:w-[1040px]"
      >
        {/* Subtle Woven Solihiya Linen Texture Inside Warm Beige Curve */}
        <div
          className="absolute inset-0 opacity-[0.075]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='56' height='56' viewBox='0 0 56 56' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%230B2718' stroke-width='1'%3E%3Cpath d='M0 28H56M28 0V56M0 0L56 56M56 0L0 56' opacity='0.45'/%3E%3Crect x='14' y='14' width='28' height='28' rx='4'/%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: '48px 48px',
          }}
        />
        {/* Soft Warm Botanical Palm Frond Accent Along Outer Right Edge of Beige Curve */}
        <svg
          viewBox="0 0 360 360"
          fill="none"
          className="absolute -bottom-8 right-10 h-72 w-72 rotate-[26deg] text-[#0B2718]/[0.08] sm:h-88 sm:w-88"
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
            'radial-gradient(ellipse 52% 65% at 16% 42%, rgba(20,66,40,0.22) 0%, transparent 70%)',
        }}
      />

      {/* Main Two-Column Hero Stage — Uniform max-w-7xl Rail */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-12 pt-8 sm:px-8 sm:pb-14 sm:pt-10 lg:py-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Editorial Column (Verdeo Minimalist Script + Serif + 2 Pills + 3 Dots) */}
          <div className="relative z-10 w-full max-w-[500px] lg:col-span-6">
            {/* Calligraphic Script Eyebrow */}
            <p
              className="text-[1.85rem] leading-none text-[#DFB96F] sm:text-[2.2rem]"
              style={{ fontFamily: "'Allura', cursive" }}
            >
              Good Food, Tagaytay Mood
            </p>

            {/* Bold Editorial Serif Headline + Flowing Script Focal Word */}
            <h1 className="mt-2 font-serif text-[2.75rem] font-semibold leading-[1.06] tracking-[-0.02em] text-[#FAF6EC] sm:text-[3.5rem] lg:text-[3.75rem] xl:text-[4.15rem]">
              Experience Food
              <span className="block">That Feels Like</span>
              <span
                className="-mt-1 block font-normal leading-[0.95] text-[#DFB96F] text-[3.85rem] sm:text-[4.75rem] xl:text-[5.25rem]"
                style={{ fontFamily: "'Allura', cursive" }}
              >
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
                className="group inline-flex min-h-[46px] items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-[#DFB96F] px-6 py-2.5 text-xs font-bold tracking-wide text-[#06180E] shadow-lg shadow-black/25 transition hover:bg-[#E8C988] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF6EC] sm:px-7 sm:text-sm"
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

          {/* Right Overhead Circular Matte-Stoneware Dish Showcase */}
          <div className="relative flex items-center justify-center lg:col-span-6 lg:justify-end">
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative flex aspect-square w-[315px] items-center justify-center sm:w-[435px] lg:mr-8 lg:w-[515px] xl:mr-14 xl:w-[575px]"
            >
              {/* Authentic PIYO Toyo-Calamansi-Sili Sawsawan Dipping Bowl Resting on Upper-Right Warm Beige */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-5 top-[4%] z-20 h-22 w-22 sm:-right-12 sm:top-[6%] sm:h-28 sm:w-28 lg:-right-16 xl:-right-22 xl:h-32 xl:w-32"
              >
                <div className="absolute inset-2 translate-x-1.5 translate-y-2.5 rounded-full bg-black/32 blur-md" />
                <img
                  src="./images/hero-side-sawsawan.png"
                  alt=""
                  className="relative h-full w-full select-none rounded-full object-contain drop-shadow-[0_12px_18px_rgba(6,24,14,0.34)]"
                  draggable={false}
                />
              </div>

              {/* Authentic PIYO House Pickled Papaya Atchara Bowl Resting on Lower-Right Warm Beige */}
              <button
                type="button"
                onClick={() => onSelectDishById('atchara')}
                aria-label="Inspect PIYO House Atchara — ₱33"
                className="group absolute -bottom-3 -right-4 z-20 h-24 w-24 cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#06180E] sm:-bottom-5 sm:-right-10 sm:h-30 sm:w-30 lg:-right-14 xl:-bottom-6 xl:-right-20 xl:h-34 xl:w-34"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2 translate-x-1.5 translate-y-2.5 rounded-full bg-black/30 blur-md"
                />
                <img
                  src="./images/hero-side-atchara.png"
                  alt="PIYO House Pickled Papaya Atchara in matte black stoneware ramekin"
                  className="relative h-full w-full select-none rounded-full object-contain drop-shadow-[0_12px_18px_rgba(6,24,14,0.34)] transition-transform duration-300 group-hover:scale-105"
                  draggable={false}
                />
              </button>

              {/* Realistic Soft Overhead Contact Shadow Under the Main Circular Plate */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[4%] translate-x-3 translate-y-5 rounded-full bg-black/42 blur-2xl"
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
                      className={`absolute inset-0 h-full w-full select-none rounded-full object-contain drop-shadow-[0_24px_34px_rgba(0,0,0,0.48)] transition-all duration-700 ease-out ${
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
