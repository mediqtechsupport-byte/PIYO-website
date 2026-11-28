import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useSectionReveal } from '../hooks/useSectionReveal';

const HERO_PLATES = [
  {
    id: 'bacolod-chicken-inasal',
    name: 'Chicken Inasal',
    price: '₱366',
    webp: './images/hero-plate-inasal.webp',
    image: './images/hero-plate-inasal.png',
    alt: 'Overhead matte black stoneware plate of PIYO charcoal-grilled Bacolod Chicken Inasal with garlic java rice, banana leaf, charred calamansi, and chili',
  },
  {
    id: 'bacolod-cansi',
    name: 'Bacolod Cansi',
    price: '₱666',
    webp: './images/hero-plate-cansi.webp',
    image: './images/hero-plate-cansi.png',
    alt: 'Overhead matte black stoneware bowl of PIYO authentic Bacolod Cansi beef bone marrow soup with langka, sili haba, lemongrass, and toasted garlic',
  },
  {
    id: 'pork-liempo-grilled',
    name: 'Grilled Pork Liempo',
    price: '₱401',
    webp: './images/hero-plate-liempo.webp',
    image: './images/hero-plate-liempo.png',
    alt: 'Overhead matte black stoneware plate of PIYO charcoal-grilled marinated Pork Liempo with garlic rice and charred calamansi',
  },
];

export function HeroSection({
  onExploreMenu,
  onExploreStory,
  onSelectDishById,
}) {
  const [heroRef, heroRevealed] = useSectionReveal({ threshold: 0.04 });
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isPaused) return undefined;
    const prefersReduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setActiveIdx((prev) => (prev + 1) % HERO_PLATES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const activePlate = HERO_PLATES[activeIdx];

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-[var(--stage-h)] flex-col justify-center overflow-hidden bg-[#F5EFE2] text-[#08130B]"
    >
      {/* Atmospheric Overhead Culinary Tabletop Background — Strictly Inside the Warm Cream-Beige Area Only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <img
          src="./images/hero-beige-table-bg.jpg"
          alt=""
          draggable={false}
          className="h-full w-full select-none object-cover object-left opacity-[0.28] saturate-[0.55] contrast-[0.9] sm:opacity-[0.31] lg:opacity-[0.33]"
        />
        {/* Soft Warm Cream-Beige Veil Behind the Text Column so Typography Stays Effortlessly Crisp */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 38% 46% at 36% 47%, rgba(245,239,226,0.84) 0%, rgba(245,239,226,0.52) 52%, rgba(245,239,226,0.10) 100%)',
          }}
        />
      </div>

      {/* Dramatic Organic Flowing Deep Obsidian-Pine S-Wave with Tagaytay Pine Forest Inside */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full lg:block"
      >
        <defs>
          <linearGradient id="piyo-hero-wave-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0D1C11" />
            <stop offset="52%" stopColor="#08130B" />
            <stop offset="100%" stopColor="#061009" />
          </linearGradient>
          <clipPath id="piyo-hero-wave-clip">
            <path d="M 1190 0 C 1110 115, 965 135, 915 265 C 865 395, 905 510, 825 655 C 760 770, 750 845, 785 900 L 1440 900 L 1440 0 Z" />
          </clipPath>
        </defs>
        <path
          d="M 1190 0 C 1110 115, 965 135, 915 265 C 865 395, 905 510, 825 655 C 760 770, 750 845, 785 900 L 1440 900 L 1440 0 Z"
          fill="url(#piyo-hero-wave-grad)"
        />
        <g clipPath="url(#piyo-hero-wave-clip)">
          <image
            href="./images/piyo-pine-forest-bg.jpg"
            x="640"
            y="0"
            width="860"
            height="900"
            preserveAspectRatio="xMidYMid slice"
            opacity="0.62"
          />
          <rect
            x="720"
            y="0"
            width="720"
            height="900"
            fill="url(#piyo-hero-wave-grad)"
            opacity="0.34"
          />
        </g>
      </svg>

      {/* Mobile / Tablet Curved Top Dark Obsidian-Pine Wave with Tagaytay Pine Silhouettes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[min(215px,28svh)] overflow-hidden rounded-b-[46%] bg-gradient-to-b from-[#08130B] to-[#0D1C11] sm:h-[275px] lg:hidden"
      >
        <picture>
          <source srcSet="./images/piyo-pine-forest-bg.webp" type="image/webp" />
          <img
            src="./images/piyo-pine-forest-bg.jpg"
            alt=""
            decoding="async"
            className="h-full w-full object-cover object-top opacity-[0.65]"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-[#08130B]/35 via-transparent to-[#08130B]/65" />
      </div>

      {/* Framing Warm Filipino Aromatics — Top-Left Corner (Cinnamon Bark, Dried Laurel Leaf & Star Anise) */}
      <img
        src="./images/hero-spice-cinnamon.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-1 -top-6 z-20 hidden h-34 w-auto rotate-[34deg] select-none object-contain drop-shadow-[0_14px_20px_rgba(38,22,10,0.22)] lg:left-2 lg:-top-5 lg:block lg:h-44"
        draggable={false}
      />
      <img
        src="./images/hero-spice-laurel.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 top-14 z-20 hidden h-28 w-auto -rotate-[20deg] select-none object-contain drop-shadow-[0_14px_20px_rgba(24,28,16,0.20)] lg:-left-2 lg:top-20 lg:block lg:h-42"
        draggable={false}
      />
      <img
        src="./images/hero-spice-anise.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-14 top-5 z-20 hidden h-14 w-auto rotate-[16deg] select-none object-contain drop-shadow-[0_12px_18px_rgba(38,22,10,0.26)] lg:left-24 lg:top-7 lg:block lg:h-20"
        draggable={false}
      />

      {/* Framing Warm Filipino Aromatics — Bottom-Right Corner Over Dark S-Wave */}
      <img
        src="./images/hero-spice-laurel.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 right-16 z-20 hidden h-36 w-auto rotate-[20deg] select-none object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.65)] lg:block xl:right-24 xl:h-44"
        draggable={false}
      />
      <img
        src="./images/hero-spice-cinnamon.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 -right-2 z-20 hidden h-34 w-auto -rotate-[26deg] select-none object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.65)] lg:block xl:right-3 xl:h-42"
        draggable={false}
      />
      <img
        src="./images/hero-spice-anise.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-28 z-20 hidden h-16 w-auto -rotate-[18deg] select-none object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.70)] lg:block xl:right-40 xl:h-20"
        draggable={false}
      />

      {/* Main Two-Column Hero Stage — Uniform max-w-7xl Rail */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-10 pt-5 sm:px-8 sm:pb-12 sm:pt-7 lg:py-8">
        <div className="grid w-full items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Editorial Text Column — Below Plate on Mobile, Left on Desktop */}
          <div className="relative z-10 order-2 mx-auto w-full max-w-[490px] text-center lg:order-1 lg:col-span-5 lg:mx-0 lg:text-left">
            {/* Punchy Warm Terracotta-Gold Eyebrow */}
            <p
              data-revealed={heroRevealed ? 'true' : 'false'}
              style={{ transitionDelay: '0ms', animationDelay: '0ms' }}
              className="piyo-hero-in piyo-reveal text-[11px] font-bold uppercase tracking-[0.22em] text-[#8A5316] sm:text-xs"
            >
              Chef&apos;s Special · Tagaytay
            </p>

            {/* Bold Ultra-Clean 2-Line Display Headline */}
            <h1
              data-revealed={heroRevealed ? 'true' : 'false'}
              style={{ transitionDelay: '70ms', animationDelay: '70ms' }}
              className="piyo-hero-in piyo-reveal mt-2.5 font-serif text-[2.35rem] font-semibold leading-[1.06] tracking-[-0.028em] text-[#08130B] sm:mt-3.5 sm:text-[3.3rem] lg:text-[3.75rem] xl:text-[4.2rem]"
            >
              Bringing smiles
              <span className="block">to every plate.</span>
            </h1>

            {/* Crisp Minimalist 2-Line Description */}
            <p
              data-revealed={heroRevealed ? 'true' : 'false'}
              style={{ transitionDelay: '130ms', animationDelay: '130ms' }}
              className="piyo-hero-in piyo-reveal mx-auto mt-3.5 max-w-[36ch] text-sm font-medium leading-6 text-[#18291D] sm:mt-5 sm:text-[15px] sm:leading-7 lg:mx-0 lg:max-w-[38ch]"
            >
              Slow-simmered Bacolod Cansi with free refills, charcoal chicken
              inasal, and sizzling Negrense favorites along Km.&nbsp;64.
            </p>

            {/* Minimal Equal-Size Pill CTA Pair on Mobile, Editorial Pair on Desktop */}
            <div
              data-revealed={heroRevealed ? 'true' : 'false'}
              style={{ transitionDelay: '190ms', animationDelay: '190ms' }}
              className="piyo-hero-in piyo-reveal mx-auto mt-6 grid w-full max-w-[330px] grid-cols-2 gap-2.5 sm:mt-8 sm:max-w-[380px] sm:gap-3 lg:mx-0 lg:flex lg:w-auto lg:max-w-none lg:flex-wrap lg:items-center lg:justify-start lg:gap-4"
            >
              <button
                type="button"
                onClick={onExploreMenu}
                className="group inline-flex h-[40px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#08130B] px-3 text-[11.5px] font-bold tracking-wide text-[#FAF6EC] shadow-[0_14px_28px_-10px_rgba(8,19,11,0.48)] transition hover:-translate-y-0.5 hover:bg-[#152517] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08130B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5EFE2] sm:h-[44px] sm:px-5 sm:text-xs lg:h-auto lg:min-h-[50px] lg:w-auto lg:gap-2.5 lg:px-8 lg:py-3 lg:text-sm"
              >
                <span>Explore menu</span>
                <ArrowRight
                  className="h-3.5 w-3.5 shrink-0 text-[#DFB96F] transition-transform duration-300 group-hover:translate-x-0.5 lg:h-4 lg:w-4"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={onExploreStory}
                className="inline-flex h-[40px] w-full items-center justify-center whitespace-nowrap rounded-full border border-[#08130B]/25 bg-[#F5EFE2]/75 px-3 text-[11.5px] font-semibold tracking-wide text-[#08130B] backdrop-blur-[2px] transition hover:border-[#08130B]/55 hover:bg-[#F5EFE2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08130B] sm:h-[44px] sm:px-5 sm:text-xs lg:h-auto lg:min-h-[50px] lg:w-auto lg:px-6 lg:py-3 lg:text-sm"
              >
                Our story
              </button>
            </div>

            {/* Clean Interactive 3-Dot Signature Dish Switcher (Desktop Position) */}
            <div
              className="mt-10 hidden items-center gap-2.5 lg:mt-14 lg:flex"
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
                    className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08130B] ${
                      isActive
                        ? 'w-6 bg-[#08130B]'
                        : 'w-2.5 bg-[#08130B]/25 hover:bg-[#08130B]/55'
                    }`}
                  />
                );
              })}
              <span className="ml-2 text-xs font-semibold tracking-wide text-[#3D4E42]">
                {activePlate.name} ·{' '}
                <span className="text-[#9E6622]">{activePlate.price}</span>
              </span>
            </div>
          </div>

          {/* Overhead Circular Matte-Stoneware Plate Carousel — TOP on Mobile, Right Straddling S-Wave on Desktop */}
          <div
            data-revealed={heroRevealed ? 'true' : 'false'}
            style={{ transitionDelay: '90ms', animationDelay: '90ms' }}
            className="piyo-hero-in piyo-reveal-scale relative order-1 flex flex-col items-center justify-center lg:order-2 lg:col-span-7"
          >
            <div
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') {
                  setIsPaused(true);
                  setIsHovered(true);
                }
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === 'mouse') {
                  setIsPaused(false);
                  setIsHovered(false);
                }
              }}
              className="relative flex aspect-square w-[min(250px,calc(var(--vh-full,100vh)*0.33))] items-center justify-center sm:w-[340px] lg:w-[min(520px,calc(var(--stage-h)-68px))] lg:translate-x-8 xl:w-[min(585px,calc(var(--stage-h)-68px))] xl:translate-x-12"
            >
              {/* Realistic Soft Overhead Contact Shadow Under the Circular Plate */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[5%] translate-x-3 translate-y-5 rounded-full bg-[#08130B]/40 blur-2xl lg:translate-x-4 lg:translate-y-6"
              />

              {/* Cross-Fading Circular Overhead Matte-Stoneware PIYO Plates */}
              <button
                type="button"
                onClick={() => onSelectDishById(activePlate.id)}
                aria-label={`Inspect ${activePlate.name} — ${activePlate.price}`}
                className="group relative z-10 h-full w-full cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#DFB96F]"
              >
                {HERO_PLATES.map((plate, idx) => {
                  const isActive = idx === activeIdx;
                  const scale = isActive ? (isHovered ? 1.025 : 1) : 0.95;
                  const rot = isActive ? 0 : -6;
                  return (
                    <picture key={plate.id}>
                      <source srcSet={plate.webp} type="image/webp" />
                      <img
                        src={plate.image}
                        alt={plate.alt}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        fetchPriority={idx === 0 ? 'high' : 'low'}
                        decoding="async"
                        draggable={false}
                        style={{
                          transform: `translate3d(0px, 0px, 0px) scale(${scale}) rotate(${rot}deg)`,
                          opacity: isActive ? 1 : 0,
                        }}
                        className={`hero-plate-slide absolute inset-0 h-full w-full select-none rounded-full object-contain drop-shadow-[0_24px_34px_rgba(8,19,11,0.42)] lg:drop-shadow-[0_28px_40px_rgba(8,19,11,0.42)] ${
                          isActive ? '' : 'pointer-events-none'
                        }`}
                      />
                    </picture>
                  );
                })}
              </button>
            </div>

            {/* Compact Interactive 3-Dot Dish Switcher Directly Under Plate on Mobile/Tablet */}
            <div
              className="mt-4 flex items-center justify-center gap-2 lg:hidden"
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
                    className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08130B] ${
                      isActive
                        ? 'w-5 bg-[#08130B]'
                        : 'w-2 bg-[#08130B]/25 hover:bg-[#08130B]/55'
                    }`}
                  />
                );
              })}
              <span className="ml-1.5 text-xs font-semibold tracking-wide text-[#2E3F33]">
                {activePlate.name} ·{' '}
                <span className="text-[#8A5316]">{activePlate.price}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
