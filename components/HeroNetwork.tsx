// Hero visual layer — fully matches the mockup:
//   • hex-faceted shield with bright apex + internal wireframe
//   • detailed wireframe polyhedrons (geodesic-style, multi-edge)
//   • clustered constellation web around each polyhedron + sparse fill
//   • pronounced perspective grid floor receding into vanishing point
//   • bright accent reflection dots
// All elements draw themselves in on first paint.

// ---------- constellation field ----------------------------------------------

type S = { x: number; y: number; r: number; o: number };

// Star clusters (anchored around the polyhedron positions and shield) plus
// a sparse fill across the rest of the canvas.
const STARS: S[] = [
  // -- left polyhedron cluster (~ x:230 y:240) --
  { x: 130, y: 180, r: 1.2, o: 0.55 },
  { x: 200, y: 145, r: 2.0, o: 0.85 },
  { x: 280, y: 175, r: 1.4, o: 0.7 },
  { x: 320, y: 240, r: 2.1, o: 0.85 },
  { x: 270, y: 305, r: 1.3, o: 0.6 },
  { x: 195, y: 320, r: 1.9, o: 0.8 },
  { x: 110, y: 280, r: 1.4, o: 0.7 },
  { x: 90, y: 220, r: 2.0, o: 0.85 },
  { x: 230, y: 240, r: 2.4, o: 0.95 },

  // -- right polyhedron cluster (top, ~ x:960 y:200) --
  { x: 870, y: 145, r: 1.4, o: 0.7 },
  { x: 940, y: 110, r: 2.1, o: 0.85 },
  { x: 1020, y: 145, r: 1.3, o: 0.6 },
  { x: 1060, y: 215, r: 2.0, o: 0.85 },
  { x: 1010, y: 280, r: 1.4, o: 0.7 },
  { x: 930, y: 290, r: 1.9, o: 0.8 },
  { x: 855, y: 245, r: 1.3, o: 0.6 },
  { x: 880, y: 195, r: 2.4, o: 0.95 },

  // -- right polyhedron cluster (lower, ~ x:980 y:430) --
  { x: 880, y: 380, r: 1.3, o: 0.65 },
  { x: 960, y: 350, r: 1.9, o: 0.8 },
  { x: 1040, y: 380, r: 1.3, o: 0.65 },
  { x: 1080, y: 450, r: 1.9, o: 0.8 },
  { x: 1030, y: 510, r: 1.3, o: 0.65 },
  { x: 950, y: 525, r: 2.1, o: 0.85 },
  { x: 880, y: 480, r: 1.3, o: 0.65 },
  { x: 855, y: 425, r: 1.9, o: 0.8 },

  // -- shield apex / surrounds --
  { x: 600, y: 80, r: 1.6, o: 0.8 },
  { x: 540, y: 130, r: 1.2, o: 0.55 },
  { x: 660, y: 130, r: 1.2, o: 0.55 },
  { x: 470, y: 180, r: 1.0, o: 0.5 },
  { x: 730, y: 180, r: 1.0, o: 0.5 },

  // -- sparse fill --
  { x: 60, y: 90, r: 1.0, o: 0.5 },
  { x: 380, y: 60, r: 1.1, o: 0.55 },
  { x: 700, y: 50, r: 1.0, o: 0.5 },
  { x: 1140, y: 80, r: 1.2, o: 0.6 },
  { x: 40, y: 380, r: 1.1, o: 0.55 },
  { x: 380, y: 410, r: 1.0, o: 0.5 },
  { x: 420, y: 580, r: 1.1, o: 0.55 },
  { x: 580, y: 600, r: 1.0, o: 0.5 },
  { x: 760, y: 580, r: 1.1, o: 0.55 },
  { x: 1120, y: 600, r: 1.0, o: 0.5 },
  { x: 1170, y: 360, r: 1.0, o: 0.5 },
  { x: 30, y: 600, r: 1.0, o: 0.5 },
];

// Bright reflective accent dots (small fully-saturated points)
const ACCENTS: S[] = [
  { x: 350, y: 175, r: 2.2, o: 1 },
  { x: 820, y: 420, r: 2.2, o: 1 },
  { x: 1080, y: 370, r: 2.0, o: 1 },
  { x: 470, y: 540, r: 2.0, o: 1 },
  { x: 720, y: 540, r: 2.0, o: 1 },
  { x: 980, y: 600, r: 2.0, o: 1 },
  { x: 160, y: 510, r: 2.0, o: 1 },
];

// Constellation lines (indices into STARS). Heavy density inside clusters,
// then a few weaving connectors between clusters and toward the shield.
const LINES: Array<[number, number, number]> = [
  // [from, to, base*100]
  // left cluster web
  [0, 1, 32], [1, 2, 32], [2, 3, 32], [3, 4, 32], [4, 5, 32], [5, 6, 32], [6, 7, 32], [7, 0, 32],
  [0, 8, 24], [1, 8, 24], [2, 8, 24], [3, 8, 24], [4, 8, 24], [5, 8, 24], [6, 8, 24], [7, 8, 24],
  [1, 4, 18], [3, 6, 18], [0, 5, 16], [2, 7, 16],

  // right-top cluster web
  [9, 10, 32], [10, 11, 32], [11, 12, 32], [12, 13, 32], [13, 14, 32], [14, 15, 32], [15, 16, 32], [16, 9, 32],
  [9, 17, 24], [10, 17, 24], [11, 17, 24], [12, 17, 24], [13, 17, 24], [14, 17, 24], [15, 17, 24], [16, 17, 24],
  [10, 13, 18], [12, 15, 18],

  // right-lower cluster web (no center node, so use ring + cross-links)
  [18, 19, 28], [19, 20, 28], [20, 21, 28], [21, 22, 28], [22, 23, 28], [23, 24, 28], [24, 25, 28], [25, 18, 28],
  [18, 22, 18], [19, 23, 18], [20, 24, 18], [21, 25, 18],

  // weaves between clusters
  [3, 16, 12], [12, 19, 12], [8, 17, 10],

  // shield apex web
  [25, 26, 18], [26, 27, 18], [26, 28, 18], [27, 29, 14], [28, 30, 14],

  // long sparse weaves
  [31, 0, 8], [32, 26, 8], [33, 9, 8], [34, 11, 8],
  [35, 7, 8], [36, 18, 8], [37, 21, 8], [38, 22, 8],
  [39, 24, 8], [40, 20, 8], [41, 13, 8], [41, 6, 8],
];

// ---------- main component ----------------------------------------------------

export default function HeroNetwork() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes drawIn {
          0%   { stroke-dashoffset: 1; opacity: 0; }
          15%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes pulseLine {
          0%, 100% { stroke-opacity: var(--base, .25); }
          50% { stroke-opacity: calc(var(--base, .25) * 2.4); }
        }
        @keyframes starIn {
          0%   { opacity: 0; transform: scale(.2); }
          100% { opacity: var(--o, .8); transform: scale(1); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: var(--o, .8); transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        @keyframes geomIn {
          0%   { opacity: 0; transform: translate3d(0,16px,0) scale(.85); }
          100% { opacity: 1; transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes floatGeom {
          0%, 100% { transform: translate3d(0,0,0) rotate(0deg); }
          50% { transform: translate3d(0,-12px,0) rotate(4deg); }
        }
        @keyframes shieldIn {
          0%   { opacity: 0; transform: scale(.55); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes shieldPulse {
          0%, 100% { filter: drop-shadow(0 0 30px rgba(94,234,212,.55)); }
          50%      { filter: drop-shadow(0 0 70px rgba(186,250,237,.95)); }
        }
        @keyframes apexFlare {
          0%, 100% { opacity: .85; }
          50%      { opacity: 1;   }
        }
        @keyframes raySweep {
          0%, 100% { opacity: .25; }
          50%      { opacity: .60; }
        }
        @keyframes gridDrift { 0% { transform: translateY(0); } 100% { transform: translateY(64px); } }
        @keyframes floorIn   { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes rayIn     { 0% { opacity: 0; } 100% { opacity: .4; } }

        .hero-line {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation:
            drawIn 1.6s cubic-bezier(.4,.0,.2,1) var(--draw-delay, 0s) forwards,
            pulseLine 4.5s ease-in-out var(--pulse-delay, 1.6s) infinite;
        }
        .hero-star {
          transform-origin: center;
          transform-box: fill-box;
          opacity: 0;
          animation:
            starIn .9s ease-out var(--star-delay, 0s) forwards,
            twinkle 3.6s ease-in-out calc(var(--star-delay, 0s) + .9s) infinite;
        }
        .hero-geom {
          transform-origin: center;
          transform-box: fill-box;
          opacity: 0;
          animation:
            geomIn 1.2s cubic-bezier(.2,.7,.2,1) var(--geom-delay, 0s) forwards,
            floatGeom 9s ease-in-out calc(var(--geom-delay, 0s) + 1.2s) infinite;
        }
        .hero-shield {
          opacity: 0;
          transform-origin: 600px 360px;
          transform-box: fill-box;
          animation:
            shieldIn 1.4s cubic-bezier(.2,.7,.2,1) 1.6s forwards,
            shieldPulse 5.5s ease-in-out 3s infinite;
        }
        .hero-apex { animation: apexFlare 3.6s ease-in-out 3.4s infinite; }
        .hero-ray  {
          opacity: 0;
          transform-origin: 600px 360px;
          animation:
            rayIn 1.2s ease-out 2.0s forwards,
            raySweep 6s ease-in-out 3.4s infinite;
        }
        .hero-floor      { opacity: 0; animation: floorIn 1.8s ease-out .2s forwards; }
        .hero-floor-anim { animation: gridDrift 12s linear infinite; }
      `}</style>

      {/* Background nebula glow */}
      <div className="absolute left-1/2 top-[20%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-teal-300/12 blur-[110px]" />

      {/* Perspective grid floor */}
      <div className="hero-floor absolute inset-x-0 bottom-0 h-[60%] [perspective:1200px]">
        <div
          className="absolute inset-0 origin-bottom [transform:rotateX(64deg)_translateY(2%)] opacity-90"
          style={{
            backgroundImage:
              "linear-gradient(rgba(94,234,212,0.32) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.32) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "linear-gradient(to top, black 0%, black 35%, transparent 88%), radial-gradient(ellipse at center bottom, black 60%, transparent 95%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 0%, black 35%, transparent 88%), radial-gradient(ellipse at center bottom, black 60%, transparent 95%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          <div
            className="hero-floor-anim absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(94,234,212,0.22) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>
        {/* horizon glow */}
        <div className="absolute inset-x-0 top-[8%] h-px bg-gradient-to-r from-transparent via-teal-200/60 to-transparent blur-[2px]" />
      </div>

      {/* SVG layer — constellation, polyhedrons, shield */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="hglow">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hsoft">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hbright">
            <feGaussianBlur stdDeviation="10" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="hLineGrad" x1="0" x2="1">
            <stop offset="0%"   stopColor="rgba(45,212,191,.05)" />
            <stop offset="50%"  stopColor="rgba(94,234,212,.95)" />
            <stop offset="100%" stopColor="rgba(45,212,191,.05)" />
          </linearGradient>

          <radialGradient id="hShieldCore" cx="50%" cy="42%" r="58%">
            <stop offset="0%"   stopColor="rgba(255,255,255,1)"   />
            <stop offset="22%"  stopColor="rgba(186,250,237,.85)" />
            <stop offset="55%"  stopColor="rgba(45,212,191,.30)"  />
            <stop offset="100%" stopColor="rgba(20,184,166,0)"    />
          </radialGradient>

          <radialGradient id="hShieldHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(94,234,212,.55)" />
            <stop offset="55%"  stopColor="rgba(45,212,191,.10)" />
            <stop offset="100%" stopColor="rgba(45,212,191,0)"   />
          </radialGradient>

          {/* Detailed wireframe polyhedron (geodesic-style icosahedron) */}
          <symbol id="hpoly" viewBox="-50 -50 100 100">
            <g
              fill="none"
              stroke="rgba(94,234,212,.65)"
              strokeWidth="0.7"
              filter="url(#hglow)"
            >
              {/* outer hexagonal silhouette */}
              <polygon points="0,-46 40,-23 40,23 0,46 -40,23 -40,-23" />
              {/* inscribed pentagons giving the 3D feel */}
              <polygon points="0,-32 30,-10 19,26 -19,26 -30,-10" />
              <polygon points="0,32 30,10 19,-26 -19,-26 -30,10" />
              {/* spokes */}
              <line x1="0"   y1="-46" x2="0"   y2="46" />
              <line x1="-40" y1="-23" x2="40"  y2="23" />
              <line x1="40"  y1="-23" x2="-40" y2="23" />
              {/* inner triangle facets */}
              <line x1="0"   y1="-46" x2="30"  y2="-10" />
              <line x1="0"   y1="-46" x2="-30" y2="-10" />
              <line x1="0"   y1="46"  x2="30"  y2="10"  />
              <line x1="0"   y1="46"  x2="-30" y2="10"  />
              <line x1="-40" y1="-23" x2="-30" y2="10"  />
              <line x1="40"  y1="-23" x2="30"  y2="10"  />
              <line x1="-40" y1="23"  x2="-30" y2="-10" />
              <line x1="40"  y1="23"  x2="30"  y2="-10" />
              {/* equator + connector */}
              <line x1="-30" y1="-10" x2="30"  y2="-10" />
              <line x1="-30" y1="10"  x2="30"  y2="10"  />
              <line x1="-19" y1="-26" x2="19"  y2="26"  />
              <line x1="19"  y1="-26" x2="-19" y2="26"  />
              {/* outer halo */}
              <circle r="46" stroke="rgba(94,234,212,.18)" />
            </g>
          </symbol>
        </defs>

        {/* Outer halo behind shield */}
        <circle
          cx="600"
          cy="360"
          r="320"
          fill="url(#hShieldHalo)"
          className="hero-shield"
        />

        {/* Light rays from shield */}
        <g className="hero-ray" filter="url(#hsoft)">
          <line x1="600" y1="360" x2="120"  y2="120" stroke="rgba(94,234,212,.30)" strokeWidth="1" />
          <line x1="600" y1="360" x2="1080" y2="120" stroke="rgba(94,234,212,.30)" strokeWidth="1" />
          <line x1="600" y1="360" x2="200"  y2="600" stroke="rgba(94,234,212,.22)" strokeWidth="1" />
          <line x1="600" y1="360" x2="1000" y2="600" stroke="rgba(94,234,212,.22)" strokeWidth="1" />
          <line x1="600" y1="360" x2="600"  y2="60"  stroke="rgba(186,250,237,.45)" strokeWidth="1.2" />
        </g>

        {/* Polyhedrons — placed to match mockup positions */}
        <g className="hero-geom" style={{ ["--geom-delay" as string]: "1.0s" }}>
          <use href="#hpoly" x="130" y="130" width="200" height="220" />
        </g>
        <g className="hero-geom" style={{ ["--geom-delay" as string]: "1.25s" }}>
          <use href="#hpoly" x="845" y="100" width="220" height="220" />
        </g>
        <g className="hero-geom" style={{ ["--geom-delay" as string]: "1.5s" }}>
          <use href="#hpoly" x="845" y="335" width="240" height="220" />
        </g>
        <g className="hero-geom" style={{ ["--geom-delay" as string]: "1.6s" }} opacity=".55">
          <use href="#hpoly" x="280" y="430" width="120" height="120" />
        </g>
        <g className="hero-geom" style={{ ["--geom-delay" as string]: "1.7s" }} opacity=".55">
          <use href="#hpoly" x="700" y="500" width="110" height="110" />
        </g>

        {/* Constellation lines */}
        {LINES.map(([a, b, base], i) => {
          const A = STARS[a];
          const B = STARS[b];
          if (!A || !B) return null;
          const midX = (A.x + B.x) / 2;
          const drawDelay = 0.25 + (midX / 1200) * 1.2; // 0.25s .. 1.45s
          const drawDuration = 1.6;
          return (
            <line
              key={i}
              className="hero-line"
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="url(#hLineGrad)"
              strokeWidth={base > 26 ? 1.3 : 1}
              pathLength={1}
              filter="url(#hglow)"
              style={{
                ["--base" as string]: (base / 100).toString(),
                ["--draw-delay" as string]: `${drawDelay.toFixed(2)}s`,
                ["--pulse-delay" as string]: `${(drawDelay + drawDuration + (i % 7) * 0.3).toFixed(2)}s`,
              }}
            />
          );
        })}

        {/* Stars */}
        {STARS.map((s, i) => {
          const starDelay = 0.1 + (s.x / 1200) * 1.0;
          return (
            <circle
              key={i}
              className="hero-star"
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="rgba(186,250,237,.95)"
              filter="url(#hglow)"
              style={{
                ["--o" as string]: s.o.toString(),
                ["--star-delay" as string]: `${starDelay.toFixed(2)}s`,
              }}
            />
          );
        })}

        {/* Bright accent reflection dots */}
        {ACCENTS.map((s, i) => {
          const starDelay = 0.6 + (s.x / 1200) * 0.8;
          return (
            <g
              key={`acc-${i}`}
              className="hero-star"
              style={{
                ["--o" as string]: s.o.toString(),
                ["--star-delay" as string]: `${starDelay.toFixed(2)}s`,
              }}
            >
              <circle
                cx={s.x}
                cy={s.y}
                r={s.r * 1.6}
                fill="rgba(186,250,237,.30)"
                filter="url(#hsoft)"
              />
              <circle
                cx={s.x}
                cy={s.y}
                r={s.r}
                fill="rgba(255,255,255,1)"
                filter="url(#hglow)"
              />
            </g>
          );
        })}

        {/* ---------- Central heraldic shield (matches /arkeh-shield.svg) ---------- */}
        <g className="hero-shield">
          {/* Outer body: dark metal fill + bright bevel border */}
          <path
            d="M 435 190 L 765 190 L 765 360 C 765 470, 705 525, 600 575 C 495 525, 435 470, 435 360 Z"
            fill="rgba(10,24,28,.92)"
            stroke="rgba(94,234,212,.95)"
            strokeWidth="2.6"
            filter="url(#hsoft)"
          />
          {/* Inner bevel rings */}
          <path
            d="M 455 207 L 745 207 L 745 358 C 745 458, 690 510, 600 555 C 510 510, 455 458, 455 358 Z"
            fill="none"
            stroke="rgba(94,234,212,.55)"
            strokeWidth="1.4"
            filter="url(#hglow)"
          />
          <path
            d="M 467 219 L 733 219 L 733 357 C 733 450, 685 498, 600 540 C 515 498, 467 450, 467 357 Z"
            fill="none"
            stroke="rgba(94,234,212,.25)"
            strokeWidth="0.9"
          />

          {/* Rivets along the inner edge */}
          <g fill="#a4b4be" stroke="#16373c" strokeWidth=".4">
            {/* top edge */}
            {[480, 520, 560, 600, 640, 680, 720].map((x) => (
              <circle key={`rt-${x}`} cx={x} cy="232" r="2.6" />
            ))}
            {/* left edge */}
            <circle cx="478" cy="265" r="2.6" />
            <circle cx="478" cy="305" r="2.6" />
            <circle cx="482" cy="345" r="2.6" />
            <circle cx="494" cy="395" r="2.6" />
            <circle cx="516" cy="445" r="2.6" />
            <circle cx="546" cy="490" r="2.6" />
            <circle cx="585" cy="525" r="2.6" />
            {/* right edge */}
            <circle cx="722" cy="265" r="2.6" />
            <circle cx="722" cy="305" r="2.6" />
            <circle cx="718" cy="345" r="2.6" />
            <circle cx="706" cy="395" r="2.6" />
            <circle cx="684" cy="445" r="2.6" />
            <circle cx="654" cy="490" r="2.6" />
            <circle cx="615" cy="525" r="2.6" />
            <circle cx="600" cy="538" r="2.6" />
          </g>

          {/* Soft center glow behind the cross */}
          <ellipse
            cx="600"
            cy="370"
            rx="115"
            ry="135"
            fill="url(#hShieldCore)"
            opacity=".9"
          />

          {/* Central neon cross */}
          <g filter="url(#hbright)">
            {/* vertical bar — outer halo, white core, teal core */}
            <rect x="582" y="220" width="36" height="320" rx="4" fill="rgba(94,234,212,.30)" />
            <rect x="588" y="226" width="24" height="308" rx="3" fill="#bafaed" />
            <rect x="594" y="232" width="12" height="296" rx="2" fill="#5eead4" />
            {/* horizontal bar */}
            <rect x="475" y="350" width="250" height="36" rx="4" fill="rgba(94,234,212,.30)" />
            <rect x="481" y="356" width="238" height="24" rx="3" fill="#bafaed" />
            <rect x="487" y="362" width="226" height="12" rx="2" fill="#5eead4" />
          </g>

          {/* Four cross-pattée crusader crosses in quadrants */}
          <g stroke="rgba(94,234,212,.85)" strokeWidth="1.4" filter="url(#hglow)">
            <g transform="translate(515, 290)" fill="rgba(8,22,26,.95)">
              <path d="M -6,-18 L 6,-18 L 4,-6 L 18,-6 L 18,6 L 4,6 L 6,18 L -6,18 L -4,6 L -18,6 L -18,-6 L -4,-6 Z" />
            </g>
            <g transform="translate(685, 290)" fill="rgba(8,22,26,.95)">
              <path d="M -6,-18 L 6,-18 L 4,-6 L 18,-6 L 18,6 L 4,6 L 6,18 L -6,18 L -4,6 L -18,6 L -18,-6 L -4,-6 Z" />
            </g>
            <g transform="translate(515, 450)" fill="rgba(8,22,26,.95)">
              <path d="M -6,-18 L 6,-18 L 4,-6 L 18,-6 L 18,6 L 4,6 L 6,18 L -6,18 L -4,6 L -18,6 L -18,-6 L -4,-6 Z" />
            </g>
            <g transform="translate(685, 450)" fill="rgba(8,22,26,.95)">
              <path d="M -6,-18 L 6,-18 L 4,-6 L 18,-6 L 18,6 L 4,6 L 6,18 L -6,18 L -4,6 L -18,6 L -18,-6 L -4,-6 Z" />
            </g>
          </g>

          {/* Bright apex flare at top center of shield */}
          <g className="hero-apex" filter="url(#hbright)">
            <circle cx="600" cy="190" r="9"  fill="rgba(255,255,255,.95)" />
            <circle cx="600" cy="190" r="22" fill="rgba(186,250,237,.40)" />
            <circle cx="600" cy="190" r="48" fill="rgba(94,234,212,.16)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
