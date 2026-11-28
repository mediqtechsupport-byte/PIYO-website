import React, { useEffect, useRef, useState } from 'react';
import { Flame, Soup, UtensilsCrossed, ArrowUpRight } from 'lucide-react';
import { CANSI_LAYERS, CANSI_STAGE_ASPECT } from '../data/cansiLayers';
import { useSectionReveal } from '../hooks/useSectionReveal';

// Organic scatter coordinates (relative to each ingredient's final assembled spot in the bowl)
// Spread wide into the open warm-beige areas around #craft (far left, top sky, center gap, bottom strip, far right)
// so visitors first see scattered ingredients across the page + the steaming bowl, then watch them slowly build into the bowl.
const LAYER_CHOREOGRAPHY = {
  bowl: {
    isBowl: true,
    depth: 0.45,
    idleY: '-5px',
    idleX: '0px',
    idleRot: '0deg',
    idleDur: '5.8s',
    idleDelay: '0s',
  },
  'beef-center': {
    sx: '-190px',
    sy: '-240px',
    srot: '-24deg',
    sscale: 0.88,
    delay: '0ms',
    dur: '1600ms',
    depth: 0.95,
    idleY: '-9px',
    idleX: '2px',
    idleRot: '1.5deg',
    idleDur: '4.9s',
    idleDelay: '0.2s',
  },
  'beef-left': {
    sx: '-230px',
    sy: '205px',
    srot: '-32deg',
    sscale: 0.9,
    delay: '120ms',
    dur: '1650ms',
    depth: 1.05,
    idleY: '-8px',
    idleX: '-3px',
    idleRot: '-2deg',
    idleDur: '5.3s',
    idleDelay: '0.5s',
  },
  'beef-right': {
    sx: '235px',
    sy: '115px',
    srot: '26deg',
    sscale: 0.9,
    delay: '220ms',
    dur: '1680ms',
    depth: 1.0,
    idleY: '-10px',
    idleX: '3px',
    idleRot: '2deg',
    idleDur: '5.1s',
    idleDelay: '0.8s',
  },
  shank: {
    sx: '-245px',
    sy: '-190px',
    srot: '-26deg',
    sscale: 0.84,
    delay: '360ms',
    dur: '1900ms',
    depth: 1.25,
    idleY: '-11px',
    idleX: '1px',
    idleRot: '1.2deg',
    idleDur: '5.6s',
    idleDelay: '0.1s',
  },
  langka: {
    sx: '210px',
    sy: '-165px',
    srot: '30deg',
    sscale: 0.9,
    delay: '540ms',
    dur: '1750ms',
    depth: 1.15,
    idleY: '-10px',
    idleX: '4px',
    idleRot: '2.4deg',
    idleDur: '5.4s',
    idleDelay: '0.7s',
  },
  lemongrass: {
    sx: '-510px',
    sy: '-275px',
    srot: '-38deg',
    sscale: 0.9,
    delay: '640ms',
    dur: '1850ms',
    depth: 1.1,
    idleY: '-9px',
    idleX: '-4px',
    idleRot: '-1.8deg',
    idleDur: '6.0s',
    idleDelay: '0.4s',
  },
  'calamansi-top': {
    sx: '-425px',
    sy: '-165px',
    srot: '-65deg',
    sscale: 0.92,
    delay: '780ms',
    dur: '1700ms',
    depth: 1.35,
    idleY: '-12px',
    idleX: '-2px',
    idleRot: '-3deg',
    idleDur: '4.8s',
    idleDelay: '0.9s',
  },
  'batwan-upper': {
    sx: '-985px',
    sy: '110px',
    srot: '42deg',
    sscale: 0.94,
    delay: '860ms',
    dur: '1800ms',
    depth: 1.3,
    idleY: '-11px',
    idleX: '-3px',
    idleRot: '2.5deg',
    idleDur: '5.2s',
    idleDelay: '0.3s',
  },
  'batwan-mid': {
    sx: '-920px',
    sy: '265px',
    srot: '-44deg',
    sscale: 0.94,
    delay: '940ms',
    dur: '1820ms',
    depth: 1.35,
    idleY: '-10px',
    idleX: '-4px',
    idleRot: '-2.2deg',
    idleDur: '5.5s',
    idleDelay: '1.1s',
  },
  'calamansi-low': {
    sx: '-315px',
    sy: '320px',
    srot: '55deg',
    sscale: 0.92,
    delay: '1020ms',
    dur: '1750ms',
    depth: 1.28,
    idleY: '-9px',
    idleX: '-3px',
    idleRot: '3deg',
    idleDur: '4.9s',
    idleDelay: '0.6s',
  },
  'sili-green': {
    sx: '215px',
    sy: '-45px',
    srot: '38deg',
    sscale: 0.92,
    delay: '1100ms',
    dur: '1650ms',
    depth: 1.4,
    idleY: '-12px',
    idleX: '4px',
    idleRot: '2.8deg',
    idleDur: '4.7s',
    idleDelay: '0.5s',
  },
  'sili-red': {
    sx: '190px',
    sy: '205px',
    srot: '-42deg',
    sscale: 0.94,
    delay: '1180ms',
    dur: '1620ms',
    depth: 1.45,
    idleY: '-11px',
    idleX: '5px',
    idleRot: '-3deg',
    idleDur: '4.6s',
    idleDelay: '1.0s',
  },
  garlic: {
    sx: '-125px',
    sy: '-150px',
    srot: '24deg',
    sscale: 0.94,
    delay: '1260ms',
    dur: '1600ms',
    depth: 1.5,
    idleY: '-13px',
    idleX: '2px',
    idleRot: '1.6deg',
    idleDur: '5.0s',
    idleDelay: '0.2s',
  },
  scallions: {
    sx: '165px',
    sy: '-135px',
    srot: '-28deg',
    sscale: 0.94,
    delay: '1340ms',
    dur: '1580ms',
    depth: 1.55,
    idleY: '-12px',
    idleX: '3px',
    idleRot: '-2deg',
    idleDur: '4.8s',
    idleDelay: '0.7s',
  },
  droplets: {
    sx: '0px',
    sy: '-40px',
    srot: '0deg',
    sscale: 1.18,
    sopacity: 0,
    delay: '1420ms',
    dur: '1350ms',
    depth: 1.6,
    idleY: '-10px',
    idleX: '2px',
    idleRot: '0.8deg',
    idleDur: '5.3s',
    idleDelay: '0.4s',
  },
};

const HIGHLIGHTS = [
  {
    icon: Flame,
    title: 'Daily Fresh Prep & Negros Heritage',
    description:
      'Chicken inasal marinated in calamansi, tanglad & annatto oil, paired with crisp Tagaytay produce and real Negrense batwan every morning.',
    tileClass: 'bg-[#E5EDE7] text-[#0D1C11]',
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
    tileClass: 'bg-[#DDE8E0] text-[#152517]',
  },
];

const STEAM_RIBBONS = [
  {
    id: 'left',
    delay: '0s',
    d: 'M95 190 C78 148, 114 114, 92 66 C80 42, 96 22, 106 8',
    strokeWidth: 10,
  },
  {
    id: 'center',
    delay: '1.5s',
    d: 'M134 195 C152 152, 116 112, 140 62 C150 38, 134 18, 126 6',
    strokeWidth: 11,
  },
  {
    id: 'right',
    delay: '3.0s',
    d: 'M170 184 C154 146, 182 110, 162 70 C154 52, 166 30, 174 16',
    strokeWidth: 9,
  },
];

const FLOAT_VARIANTS = ['cansi-float-a', 'cansi-float-b', 'cansi-float-c'];

function addMediaListener(mq, fn) {
  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }
  if (typeof mq.addListener === 'function') {
    mq.addListener(fn);
    return () => mq.removeListener(fn);
  }
  return () => {};
}

export function GrillPromiseSection({ onInspectDish, onExploreGrill }) {
  const [editorialRef, editorialRevealed] = useSectionReveal({ threshold: 0.04 });
  const sectionRef = useRef(null);
  const timersRef = useRef({ raf1: 0, raf2: 0, hold: null, settle: null });
  const wasInViewRef = useRef(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, hovered: false });
  const [replayKey, setReplayKey] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [scatterMult, setScatterMult] = useState(() => {
    if (typeof window === 'undefined') return 0.42;
    const w = window.innerWidth;
    if (w >= 1280) return 1;
    if (w >= 1024) return 0.86;
    if (w >= 640) return 0.62;
    return 0.42;
  });
  const [phase, setPhase] = useState(() => (reducedMotion ? 'assembled' : 'scattered'));

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(mq.matches);
    sync();
    return addMediaListener(mq, sync);
  }, []);

  useEffect(() => {
    const syncScatterMult = () => {
      const w = window.innerWidth;
      setScatterMult(w >= 1280 ? 1 : w >= 1024 ? 0.86 : w >= 640 ? 0.62 : 0.42);
    };
    syncScatterMult();
    window.addEventListener('resize', syncScatterMult);
    return () => window.removeEventListener('resize', syncScatterMult);
  }, []);

  const clearTimers = () => {
    if (timersRef.current.raf1) {
      window.cancelAnimationFrame(timersRef.current.raf1);
      timersRef.current.raf1 = 0;
    }
    if (timersRef.current.raf2) {
      window.cancelAnimationFrame(timersRef.current.raf2);
      timersRef.current.raf2 = 0;
    }
    if (timersRef.current.hold) {
      window.clearTimeout(timersRef.current.hold);
      timersRef.current.hold = null;
    }
    if (timersRef.current.settle) {
      window.clearTimeout(timersRef.current.settle);
      timersRef.current.settle = null;
    }
  };

  const triggerBuildSequence = (holdMs = 520) => {
    if (reducedMotion) {
      setPhase('assembled');
      return;
    }
    clearTimers();
    setPhase('scattered');
    setReplayKey((k) => k + 1);
    // Guarantee at least one painted scattered frame across iOS WebKit, Firefox, and Chrome before starting transition
    timersRef.current.raf1 = window.requestAnimationFrame(() => {
      timersRef.current.raf1 = 0;
      timersRef.current.raf2 = window.requestAnimationFrame(() => {
        timersRef.current.raf2 = 0;
        timersRef.current.hold = window.setTimeout(() => {
          setPhase('building');
          timersRef.current.settle = window.setTimeout(() => {
            setPhase('assembled');
          }, 3050);
        }, holdMs);
      });
    });
  };

  useEffect(() => {
    if (reducedMotion) {
      clearTimers();
      setPhase('assembled');
      return undefined;
    }

    const node = sectionRef.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver !== 'function') {
      triggerBuildSequence(420);
      return () => clearTimers();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        const isTall = entry.boundingClientRect.height > window.innerHeight * 0.9;
        if (entry.isIntersecting && (entry.intersectionRatio >= 0.02 || isTall)) {
          if (!wasInViewRef.current) {
            wasInViewRef.current = true;
            triggerBuildSequence(520);
          }
        } else if (!entry.isIntersecting) {
          wasInViewRef.current = false;
          clearTimers();
          setPhase('scattered');
        }
      },
      { threshold: [0, 0.02, 0.05, 0.2], rootMargin: '260px 0px' },
    );

    observer.observe(node);
    return () => {
      clearTimers();
      observer.disconnect();
    };
  }, [reducedMotion]);

  const handleReplayClick = (e) => {
    e.currentTarget.blur();
    triggerBuildSequence(600);
  };

  const handleStageMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: nx, y: ny, hovered: true });
  };

  const handleStageLeave = () => {
    setTilt({ x: 0, y: 0, hovered: false });
  };

  const isScattered = phase === 'scattered';

  return (
    <section
      ref={sectionRef}
      id="craft"
      data-cansi-phase={phase}
      className="cansi-stage-root relative flex min-h-[var(--stage-h)] flex-col justify-center overflow-hidden border-b border-[#0D1C11]/12 bg-[#F5EFE2] pb-14 pt-10 text-[#0D1C11] sm:py-16 lg:py-4 2xl:py-8"
    >
      {/* Top-Left Open Flame Accent blended cleanly into warm beige (Desktop / Tablet only so it never overlaps mobile headline) */}
      <img
        src="./images/flame-corner.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-2 -top-2 hidden h-40 w-52 object-cover object-left-top opacity-90 mix-blend-multiply lg:block lg:h-52 lg:w-68"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-7 sm:gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Editorial Column — Below Steaming Bowl on Mobile, Left on Desktop */}
          <div ref={editorialRef} className="relative z-20 order-2 pb-2 lg:order-1 lg:col-span-6 lg:pb-0">
            <h2
              data-revealed={editorialRevealed ? 'true' : 'false'}
              style={{ transitionDelay: '0ms' }}
              className="piyo-reveal text-center font-serif text-[1.6rem] font-semibold leading-[1.16] tracking-[-0.02em] text-[#0D1C11] sm:text-[2.45rem] sm:leading-[1.12] lg:text-left lg:text-[2.15rem] lg:leading-[1.08] 2xl:text-[2.85rem]"
            >
              PIYO&apos;s{' '}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10">#1 House Favorite</span>
                <svg
                  viewBox="0 0 320 20"
                  fill="none"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -bottom-1 left-0 h-3 w-full sm:h-4"
                >
                  <path
                    d="M4 11.5C82 4 218 4 316 10.5"
                    stroke="#C29645"
                    strokeWidth="6.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14 15.5C96 10 220 9.5 304 13"
                    stroke="#0D1C11"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    opacity="0.35"
                  />
                </svg>
              </span>
              <span className="mt-1 block">Authentic Bacolod Cansi</span>
            </h2>

            <p
              data-revealed={editorialRevealed ? 'true' : 'false'}
              style={{ transitionDelay: '70ms' }}
              className="piyo-reveal mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-[#425246] sm:mt-5 sm:text-[15px] sm:leading-7 lg:mx-0 lg:mt-2.5 lg:text-left lg:text-[13px] lg:leading-[1.55] 2xl:mt-5 2xl:text-[15px] 2xl:leading-7"
            >
              Loved by Tagaytay families and repeat visitors for our real
              batwan-soured beef shank &amp; bone marrow broth — served piping
              hot on banana leaf alongside outdoor charcoal-grilled favorites.
            </p>

            {/* 3 Tinted Line-Icon Highlights */}
            <div className="mt-6 space-y-3.5 sm:space-y-4 lg:mt-3.5 lg:space-y-2.5 2xl:mt-6 2xl:space-y-4">
              {HIGHLIGHTS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    data-revealed={editorialRevealed ? 'true' : 'false'}
                    style={{ transitionDelay: `${130 + idx * 70}ms` }}
                    className="piyo-reveal flex items-start gap-3.5 sm:gap-4 lg:gap-3 2xl:gap-4"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-xs ring-1 ring-[#0D1C11]/10 sm:h-14 sm:w-14 lg:h-10 lg:w-10 2xl:h-14 2xl:w-14 ${item.tileClass}`}
                    >
                      <Icon className="h-5 w-5 stroke-[1.75] sm:h-6 sm:w-6 lg:h-[18px] lg:w-[18px] 2xl:h-6 2xl:w-6" aria-hidden="true" />
                    </div>
                    <div className="pt-0.5">
                      <h3 className="font-serif text-[1.05rem] font-semibold leading-snug text-[#0D1C11] sm:text-xl lg:text-[1.02rem] 2xl:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#47574B] sm:text-sm lg:text-[11.5px] lg:leading-[1.45] 2xl:text-sm 2xl:leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              data-revealed={editorialRevealed ? 'true' : 'false'}
              style={{ transitionDelay: '330ms' }}
              className="piyo-reveal mx-auto mt-6 grid w-full max-w-[330px] grid-cols-2 gap-2.5 sm:mt-7 sm:flex sm:w-auto sm:max-w-none sm:flex-wrap sm:items-center sm:gap-3 lg:mx-0 lg:mt-4 2xl:mt-7"
            >
              <button
                type="button"
                onClick={onExploreGrill}
                className="inline-flex h-[40px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#0D1C11] px-3 text-[11.5px] font-bold text-[#FAF6EC] shadow-md transition hover:bg-[#162719] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D1C11] sm:h-auto sm:min-h-[44px] sm:w-auto sm:gap-2 sm:px-6 sm:py-2.5 sm:text-sm"
              >
                <span className="sm:hidden">Browse Grill</span>
                <span className="hidden sm:inline">Browse Grill &amp; Specials</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#DFB96F] sm:h-4 sm:w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onInspectDish}
                className="inline-flex h-[40px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#0D1C11]/25 bg-[#FAF6EC] px-3 text-[11.5px] font-semibold text-[#0D1C11] transition hover:border-[#0D1C11]/45 hover:bg-[#E5EDE7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D1C11] sm:h-auto sm:min-h-[44px] sm:w-auto sm:px-5 sm:py-2.5 sm:text-sm"
              >
                <span className="sm:hidden">Cansi · ₱666</span>
                <span className="hidden sm:inline">Inspect Bacolod Cansi · ₱666</span>
              </button>
            </div>
          </div>

          {/* Interactive Scatter-to-Bowl Animated Exploded Bacolod Cansi — TOP on Mobile, Right on Desktop */}
          <div className="relative z-10 order-1 lg:order-2 lg:col-span-6 lg:translate-x-4 xl:translate-x-8 2xl:translate-x-16">
            <div
              onPointerMove={handleStageMove}
              onPointerLeave={handleStageLeave}
              className="group relative flex h-[340px] w-full items-center justify-center pb-5 pt-1 sm:h-[480px] sm:py-2 lg:h-[clamp(370px,calc(var(--stage-h)-36px),600px)] 2xl:h-[clamp(440px,calc(var(--stage-h)-48px),665px)]"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={handleReplayClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleReplayClick(e);
                  }
                }}
                title="Touch me to replay animation"
                aria-label="Replay Bacolod Cansi ingredient assembly animation"
                className="relative mx-auto flex h-full w-[min(86vw,300px)] cursor-pointer items-center justify-center rounded-3xl outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D1C11]/35 sm:w-[410px] lg:w-auto"
                style={{
                  aspectRatio: `${CANSI_STAGE_ASPECT}`,
                  maxWidth: '100%',
                }}
              >
                {/* Subtle "Touch me" interactive hint centered below the bowl */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -bottom-3 left-1/2 z-30 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap text-[11px] font-medium tracking-[0.18em] uppercase text-[#0D1C11]/55 transition-all duration-500 group-hover:text-[#0D1C11]/85 ${
                    phase === 'assembled' ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
                  }`}
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C29645]" />
                  <span>Touch me</span>
                </span>
                {/* Subtle Interactive Hover Stage (WebKit-safe flat compositing — no preserve-3d flatten bug) */}
                <div
                  className="relative h-full w-full transition-transform duration-300 ease-out"
                  style={{
                    transform: tilt.hovered
                      ? `perspective(1000px) rotateY(${(tilt.x * 6.5).toFixed(2)}deg) rotateX(${(-tilt.y * 5).toFixed(2)}deg) scale(1.025)`
                      : 'none',
                  }}
                >
                  {/* Soft Natural Ground Shadow Underneath the Stoneware Bowl */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[17%] bottom-[2.2%] h-[5.2%] w-[70%] rounded-full transition-all duration-700"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, rgba(54,40,24,0.32) 0%, rgba(54,40,24,0.14) 48%, rgba(54,40,24,0) 76%)',
                      filter: 'blur(7px)',
                      transform: isScattered ? 'scale(0.92)' : 'scale(1)',
                    }}
                  />

                  {/* Rising Translucent Steam Ribbons — HTML-Wrapped for Guaranteed GPU Animation on iOS/iPadOS Safari & Linux */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[14%] top-[24%] z-30 h-[38%] w-[70%] opacity-75"
                  >
                    {STEAM_RIBBONS.map((ribbon) => (
                      <div
                        key={ribbon.id}
                        className="cansi-steam pointer-events-none absolute inset-0"
                        style={{ animationDelay: ribbon.delay }}
                      >
                        <svg
                          viewBox="0 0 260 220"
                          fill="none"
                          className="h-full w-full overflow-visible"
                        >
                          <defs>
                            <linearGradient
                              id={`piyo-steam-grad-${ribbon.id}`}
                              x1="0"
                              y1="1"
                              x2="0"
                              y2="0"
                            >
                              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                              <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.45" />
                              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path
                            d={ribbon.d}
                            stroke={`url(#piyo-steam-grad-${ribbon.id})`}
                            strokeWidth={ribbon.strokeWidth}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    ))}
                  </div>

                  {/* 16 Pixel-Accurate Layered Sprites: Pure Cross-Engine GPU Transforms (Zero var() Inside Keyframes/Shorthand) */}
                  {CANSI_LAYERS.map((layer, layerIdx) => {
                    const choreo = LAYER_CHOREOGRAPHY[layer.id] || {};
                    const isBowl = Boolean(choreo.isBowl);
                    const depth = choreo.depth ?? 1;
                    const parallaxX = tilt.hovered ? tilt.x * 9 * depth : 0;
                    const parallaxY = tilt.hovered ? tilt.y * 7 * depth : 0;
                    const sxPx = (parseFloat(choreo.sx || '0') * scatterMult).toFixed(1);
                    const syPx = (parseFloat(choreo.sy || '0') * scatterMult).toFixed(1);
                    const srot = choreo.srot || '0deg';
                    const sscale = choreo.sscale ?? 0.92;
                    const sopacity = choreo.sopacity ?? 0.98;
                    const flyDur = choreo.dur || '1750ms';
                    const flyDelay = choreo.delay || '0ms';
                    const floatClass = isBowl
                      ? 'cansi-float-bowl'
                      : FLOAT_VARIANTS[layerIdx % FLOAT_VARIANTS.length];

                    return (
                      <div
                        key={layer.id}
                        data-cansi-layer={layer.id}
                        className="pointer-events-none absolute"
                        style={{
                          left: `${layer.left}%`,
                          top: `${layer.top}%`,
                          width: `${layer.width}%`,
                          height: `${layer.height}%`,
                          zIndex: layer.zIndex,
                          transform: tilt.hovered
                            ? `translate3d(${parallaxX.toFixed(1)}px, ${parallaxY.toFixed(1)}px, 0px)`
                            : 'translate3d(0px, 0px, 0px)',
                          transition: 'transform 320ms ease-out',
                        }}
                      >
                        {isBowl ? (
                          <div
                            key={`bowl-${replayKey}`}
                            className={`h-full w-full ${phase !== 'scattered' ? 'cansi-bowl-impact' : ''}`}
                          >
                            <div
                              className={`${floatClass} h-full w-full`}
                              style={{
                                animationDuration: choreo.idleDur || '5.8s',
                                animationDelay: choreo.idleDelay || '0s',
                              }}
                            >
                              <img
                                src={layer.src}
                                alt="Steaming stoneware bowl of PIYO Bacolod Cansi with splashing golden batwan broth"
                                decoding="async"
                                className="h-full w-full select-none object-contain"
                                draggable={false}
                              />
                            </div>
                          </div>
                        ) : (
                          <div
                            data-scattered={isScattered ? 'true' : 'false'}
                            className="h-full w-full"
                            style={{
                              willChange: phase === 'building' ? 'transform, opacity' : 'auto',
                              WebkitBackfaceVisibility: 'hidden',
                              backfaceVisibility: 'hidden',
                              transform: isScattered
                                ? `translate3d(${sxPx}px, ${syPx}px, 0px) rotate(${srot}) scale(${sscale})`
                                : 'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)',
                              opacity: isScattered ? sopacity : 1,
                              transitionProperty: 'transform, opacity',
                              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                              transitionDuration: isScattered ? '450ms' : flyDur,
                              transitionDelay: isScattered ? '0ms' : flyDelay,
                            }}
                          >
                            <div
                              className={`${floatClass} h-full w-full`}
                              style={{
                                animationDuration: choreo.idleDur || '5.2s',
                                animationDelay: choreo.idleDelay || '0s',
                              }}
                            >
                              <img
                                src={layer.src}
                                alt=""
                                aria-hidden="true"
                                decoding="async"
                                className="h-full w-full select-none object-contain"
                                draggable={false}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
