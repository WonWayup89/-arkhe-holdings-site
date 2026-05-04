// Ambient page-wide background. Lives behind the entire page below the
// hero and provides a quiet star/grid layer so the constellation aesthetic
// continues through Verticals, System Diagram, and the footer.

const STARS: Array<{ x: number; y: number; r: number; o: number; d: number }> = [
  { x: 80, y: 60, r: 1.0, o: 0.45, d: 0.4 },
  { x: 220, y: 140, r: 1.4, o: 0.65, d: 1.6 },
  { x: 360, y: 90, r: 1.1, o: 0.5, d: 2.6 },
  { x: 540, y: 180, r: 1.3, o: 0.6, d: 0.9 },
  { x: 700, y: 70, r: 1.0, o: 0.45, d: 1.2 },
  { x: 870, y: 150, r: 1.4, o: 0.65, d: 0.2 },
  { x: 1040, y: 80, r: 1.1, o: 0.5, d: 2.2 },
  { x: 1170, y: 200, r: 1.0, o: 0.45, d: 1.0 },

  { x: 60, y: 320, r: 1.2, o: 0.55, d: 0.7 },
  { x: 230, y: 400, r: 1.4, o: 0.65, d: 1.9 },
  { x: 410, y: 340, r: 1.0, o: 0.45, d: 0.3 },
  { x: 580, y: 430, r: 1.3, o: 0.6, d: 2.1 },
  { x: 760, y: 360, r: 1.1, o: 0.5, d: 1.4 },
  { x: 920, y: 410, r: 1.4, o: 0.65, d: 0.6 },
  { x: 1080, y: 320, r: 1.2, o: 0.55, d: 2.4 },

  { x: 130, y: 600, r: 1.1, o: 0.5, d: 1.3 },
  { x: 320, y: 680, r: 1.4, o: 0.65, d: 0.5 },
  { x: 510, y: 620, r: 1.0, o: 0.45, d: 2.0 },
  { x: 690, y: 700, r: 1.3, o: 0.6, d: 0.9 },
  { x: 860, y: 640, r: 1.1, o: 0.5, d: 1.7 },
  { x: 1030, y: 720, r: 1.4, o: 0.65, d: 0.8 },

  { x: 110, y: 880, r: 1.2, o: 0.55, d: 1.1 },
  { x: 290, y: 950, r: 1.0, o: 0.45, d: 2.3 },
  { x: 470, y: 880, r: 1.4, o: 0.65, d: 0.4 },
  { x: 650, y: 960, r: 1.1, o: 0.5, d: 1.5 },
  { x: 830, y: 900, r: 1.3, o: 0.6, d: 2.7 },
  { x: 1010, y: 970, r: 1.0, o: 0.45, d: 0.6 },
  { x: 1170, y: 880, r: 1.2, o: 0.55, d: 1.8 },

  { x: 90, y: 1180, r: 1.4, o: 0.65, d: 0.9 },
  { x: 280, y: 1240, r: 1.0, o: 0.45, d: 2.1 },
  { x: 460, y: 1180, r: 1.3, o: 0.6, d: 0.3 },
  { x: 640, y: 1260, r: 1.1, o: 0.5, d: 1.6 },
  { x: 820, y: 1190, r: 1.4, o: 0.65, d: 0.7 },
  { x: 1000, y: 1270, r: 1.0, o: 0.45, d: 2.4 },
  { x: 1160, y: 1180, r: 1.2, o: 0.55, d: 1.0 },
];

const LINES: Array<[number, number, number]> = [
  [0, 1, 14], [1, 2, 14], [2, 3, 14], [3, 4, 14], [4, 5, 14], [5, 6, 14], [6, 7, 14],
  [8, 9, 14], [9, 10, 14], [10, 11, 14], [11, 12, 14], [12, 13, 14], [13, 14, 14],
  [15, 16, 14], [16, 17, 14], [17, 18, 14], [18, 19, 14], [19, 20, 14],
  [21, 22, 14], [22, 23, 14], [23, 24, 14], [24, 25, 14], [25, 26, 14], [26, 27, 14],
  [28, 29, 14], [29, 30, 14], [30, 31, 14], [31, 32, 14], [32, 33, 14], [33, 34, 14],
  // verticals to weave the layers together
  [1, 9, 10], [3, 11, 10], [5, 13, 10], [9, 16, 10], [11, 18, 10], [13, 20, 10],
  [16, 23, 10], [18, 25, 10], [20, 27, 10], [22, 29, 10], [24, 31, 10], [26, 33, 10],
];

export default function AmbientNetwork() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <style>{`
        @keyframes ambDrawIn {
          0%   { stroke-dashoffset: 1; opacity: 0; }
          20%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes ambStarIn {
          0%   { opacity: 0; }
          100% { opacity: var(--o, .5); }
        }
        @keyframes ambientPulse {
          0%, 100% { stroke-opacity: var(--base, .12); }
          50% { stroke-opacity: calc(var(--base, .12) * 2); }
        }
        @keyframes ambientTwinkle {
          0%, 100% { opacity: var(--o, .5); }
          50% { opacity: 1; }
        }
        .amb-line {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation:
            ambDrawIn 2.4s cubic-bezier(.4,.0,.2,1) var(--draw-delay, 0s) forwards,
            ambientPulse 7s ease-in-out var(--pulse-delay, 2.4s) infinite;
        }
        .amb-star {
          opacity: 0;
          animation:
            ambStarIn 1.2s ease-out var(--star-delay, 0s) forwards,
            ambientTwinkle 4.5s ease-in-out calc(var(--star-delay, 0s) + 1.2s) infinite;
        }
      `}</style>

      {/* deep space gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.10),transparent_45%),radial-gradient(ellipse_at_bottom,rgba(20,184,166,0.07),transparent_55%),#04070a]" />

      {/* faint grid wash */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(94,234,212,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 80%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 1300"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="ambGlow">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="ambLine" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(45,212,191,.04)" />
            <stop offset="50%" stopColor="rgba(94,234,212,.55)" />
            <stop offset="100%" stopColor="rgba(45,212,191,.04)" />
          </linearGradient>
        </defs>

        {LINES.map(([a, b, base], i) => {
          const A = STARS[a];
          const B = STARS[b];
          // Stagger by midpoint-y so lines draw downward through the page on first paint
          const midY = (A.y + B.y) / 2;
          const drawDelay = 0.4 + (midY / 1300) * 1.6; // 0.4s .. 2.0s
          const drawDuration = 2.4;
          return (
            <line
              key={i}
              className="amb-line"
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="url(#ambLine)"
              strokeWidth="1"
              pathLength={1}
              filter="url(#ambGlow)"
              style={{
                ["--base" as string]: (base / 100).toString(),
                ["--draw-delay" as string]: `${drawDelay.toFixed(2)}s`,
                ["--pulse-delay" as string]: `${(drawDelay + drawDuration + (i % 5) * 0.4).toFixed(2)}s`,
              }}
            />
          );
        })}

        {STARS.map((s, i) => {
          const starDelay = 0.2 + (s.y / 1300) * 1.4;
          return (
            <circle
              key={i}
              className="amb-star"
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="rgba(186,250,237,.85)"
              filter="url(#ambGlow)"
              style={{
                ["--o" as string]: s.o.toString(),
                ["--star-delay" as string]: `${starDelay.toFixed(2)}s`,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
