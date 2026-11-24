import React, { useEffect, useRef, useState } from 'react';
import { Flame, Soup, UtensilsCrossed, ArrowUpRight } from 'lucide-react';
import { CANSI_LAYERS, CANSI_STAGE_ASPECT } from '../data/cansiLayers';

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
    sx: '-555px',
    sy: '-235px',
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
  const sectionRef = useRef(null);
  const timersRef = useRef({ hold: null, settle: null });
  const [tilt, setTilt] = useState({ x: 0, y: 0, hovered: false });
  const [replayKey, setReplayKey] = useState(0);
  const [phase, setPhase] = useState(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return 'assembled';
    }
    return 'scattered';
  });

  const clearTimers = () => {
    if (timersRef.current.hold) {
      window.clearTimeout(timersRef.current.hold);
      timersRef.current.hold = null;
    }
    if (timersRef.current.settle) {
      window.clearTimeout(timersRef.current.settle);
      timersRef.current.settle = null;
    }
  };

  const triggerBuildSequence = (holdMs = 700) => {
    clearTimers();
    setPhase('scattered');
    setReplayKey((k) => k + 1);
    timersRef.current.hold = window.setTimeout(() => {
      setPhase('building');
      timersRef.current.settle = window.setTimeout(() => {
        setPhase('assembled');
      }, 3050);
    }, holdMs);
  };

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setPhase('assembled');
      return undefined;
    }

    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.18) {
          triggerBuildSequence(700);
        } else if (!entry.isIntersecting) {
          clearTimers();
          setPhase('scattered');
        }
      },
      { threshold: [0, 0.18, 0.35] },
    );

    observer.observe(node);
    return () => {
      clearTimers();
      observer.disconnect();
    };
  }, []);

  const handleReplayClick = () => {
    triggerBuildSequence(760);
  };

  const handleStageMove = (e) => {
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
      className="cansi-stage-root relative overflow-hidden border-b border-[#0B2718]/12 bg-[#F5EFE2] py-14 text-[#0B2718] sm:py-16 lg:flex lg:min-h-[calc(100svh-var(--nav-h,69px))] lg:items-center lg:py-10 xl:py-12"
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
          <div className="relative z-20 pb-2 lg:col-span-6 lg:pb-2">
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

          {/* Right Interactive Scatter-to-Bowl Animated Exploded Bacolod Cansi */}
          <div className="relative z-10 lg:col-span-6 lg:translate-x-10 xl:translate-x-20">
            <div
              onPointerMove={handleStageMove}
              onPointerLeave={handleStageLeave}
              className="group relative flex h-[470px] w-full items-center justify-center py-2 sm:h-[560px] lg:h-[620px] xl:h-[670px]"
            >
              <button
                type="button"
                onClick={handleReplayClick}
                title="Click to replay Bacolod Cansi animation"
                aria-label="Replay Bacolod Cansi ingredient assembly animation"
                className="relative mx-auto flex h-full w-auto cursor-pointer items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#0B2718]"
                style={{
                  aspectRatio: `${CANSI_STAGE_ASPECT}`,
                  maxWidth: '100%',
                  perspective: '1000px',
                }}
              >
                {/* 3D Tilting Master Stage */}
                <div
                  className="relative h-full w-full transition-transform duration-300 ease-out"
                  style={{
                    transform: `rotateY(${(tilt.x * 6.5).toFixed(2)}deg) rotateX(${(-tilt.y * 5).toFixed(2)}deg) scale(${tilt.hovered ? 1.025 : 1})`,
                    transformStyle: 'preserve-3d',
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

                  {/* Rising Translucent Steam Ribbons Directly Above the Stoneware Bowl */}
                  <svg
                    viewBox="0 0 260 220"
                    fill="none"
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[14%] top-[24%] z-30 h-[38%] w-[70%] opacity-75"
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

                  {/* 16 Pixel-Accurate Layered Sprites: Bowl Waiting + Ingredients Scattering In */}
                  {CANSI_LAYERS.map((layer) => {
                    const choreo = LAYER_CHOREOGRAPHY[layer.id] || {};
                    const isBowl = Boolean(choreo.isBowl);
                    const depth = choreo.depth ?? 1;
                    const parallaxX = tilt.hovered ? tilt.x * 9 * depth : 0;
                    const parallaxY = tilt.hovered ? tilt.y * 7 * depth : 0;

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
                          transform: `translate3d(${parallaxX.toFixed(1)}px, ${parallaxY.toFixed(1)}px, 0)`,
                          transition: 'transform 320ms ease-out',
                        }}
                      >
                        {isBowl ? (
                          <div
                            key={`bowl-${replayKey}`}
                            className={`h-full w-full ${phase !== 'scattered' ? 'cansi-bowl-impact' : ''}`}
                          >
                            <div
                              className="cansi-layer-float h-full w-full"
                              style={{
                                '--idle-x': choreo.idleX,
                                '--idle-y': choreo.idleY,
                                '--idle-rot': choreo.idleRot,
                                '--idle-dur': choreo.idleDur,
                                '--idle-delay': choreo.idleDelay,
                              }}
                            >
                              <img
                                src={layer.src}
                                alt="Steaming stoneware bowl of PIYO Bacolod Cansi with splashing golden batwan broth"
                                className="h-full w-full select-none object-contain"
                                draggable={false}
                              />
                            </div>
                          </div>
                        ) : (
                          <div
                            data-scattered={isScattered ? 'true' : 'false'}
                            className="cansi-ingredient-fly h-full w-full"
                            style={{
                              '--sx': choreo.sx,
                              '--sy': choreo.sy,
                              '--srot': choreo.srot,
                              '--sscale': choreo.sscale ?? 0.92,
                              '--sopacity': choreo.sopacity ?? 0.98,
                              '--fly-delay': choreo.delay,
                              '--fly-dur': choreo.dur,
                            }}
                          >
                            <div
                              className="cansi-layer-float h-full w-full"
                              style={{
                                '--idle-x': choreo.idleX,
                                '--idle-y': choreo.idleY,
                                '--idle-rot': choreo.idleRot,
                                '--idle-dur': choreo.idleDur,
                                '--idle-delay': choreo.idleDelay,
                              }}
                            >
                              <img
                                src={layer.src}
                                alt=""
                                aria-hidden="true"
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
