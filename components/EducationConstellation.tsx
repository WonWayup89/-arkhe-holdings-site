// Expanding knowledge-graph constellation for the Arkhe Education hero.
// Server-rendered SVG: a central "Arkhe" core with 12 category hubs
// arranged radially, each fanning out to leaf nodes. Lines draw in from
// the centre outward (the "expanding" feel), then settle into a slow
// pulse + twinkle. Hubs link to their matching #category anchors on
// /education so the visualization doubles as a navigator.

import Link from "next/link";

// ---------- model ------------------------------------------------------------

type Cluster = {
  /** Matches the category id used by EducationAccordion (folder name). */
  id: string;
  /** Display label on the hub badge. */
  label: string;
  /** Short leaf labels — kept tight so the fan reads cleanly. */
  children: string[];
};

// 12 clusters, ordered clockwise starting at the top. Each cluster's id
// is the same id the accordion uses, so the hubs deep-link cleanly.
const CLUSTERS: Cluster[] = [
  { id: "arkhe_systems",      label: "Arkhe Systems",  children: ["Swarm", "Risk Engine", "Memory", "Supervisor"] },
  { id: "macro",              label: "Macro",          children: ["Liquidity", "Rates", "QE / QT", "Dollar"] },
  { id: "risk_management",    label: "Risk",           children: ["Tail", "VaR", "Stress", "Hedging"] },
  { id: "market_structure",   label: "Microstructure", children: ["Order Flow", "Dealers", "HFT", "Spread"] },
  { id: "strategies",         label: "Strategies",     children: ["Trend", "Mean Rev", "Stat Arb", "Carry"] },
  { id: "quant",              label: "Quant",          children: ["Vol", "Factors", "Greeks", "Bayes"] },
  { id: "psychology",         label: "Psychology",     children: ["Reflexivity", "FOMO", "Bias", "Cycles"] },
  { id: "historical_events",  label: "Historical",     children: ["1987", "LTCM", "2008", "COVID"] },
  { id: "blockchain",         label: "Blockchain",     children: ["BTC", "ETH", "DeFi", "MEV"] },
  { id: "asset_classes",      label: "Asset Classes",  children: ["Equities", "FX", "Bonds", "Derivs"] },
  { id: "alternative_assets", label: "Alternatives",   children: ["PE", "VC", "Hedge", "Tokenized"] },
  { id: "portfolio",          label: "Portfolio",      children: ["Construction", "Allocation", "Parity", "Optim."] },
];

// ---------- geometry ---------------------------------------------------------

const VW = 1200;
const VH = 800;
const CX = VW / 2;
const CY = VH / 2;

const HUB_RADIUS = 285;        // distance from core to a hub
const CHILD_RADIUS = 110;      // distance from hub to a child
const CHILD_FAN_DEG = 64;      // total angular spread for the children

type Pt = { x: number; y: number };

function hubPosition(i: number, total: number): Pt & { angle: number } {
  // start at the top (-90°) and walk clockwise
  const angle = ((-90 + (i * 360) / total) * Math.PI) / 180;
  return {
    angle,
    x: CX + HUB_RADIUS * Math.cos(angle),
    y: CY + HUB_RADIUS * Math.sin(angle),
  };
}

function childPosition(
  hubAngle: number,
  hub: Pt,
  idx: number,
  total: number,
): Pt {
  const step = total > 1 ? CHILD_FAN_DEG / (total - 1) : 0;
  const offsetDeg = -CHILD_FAN_DEG / 2 + idx * step;
  const angle = hubAngle + (offsetDeg * Math.PI) / 180;
  return {
    x: hub.x + CHILD_RADIUS * Math.cos(angle),
    y: hub.y + CHILD_RADIUS * Math.sin(angle),
  };
}

// ---------- pre-compute layout ----------------------------------------------

type LaidOutCluster = Cluster & {
  hub: Pt & { angle: number };
  leaves: Pt[];
};

const LAYOUT: LaidOutCluster[] = CLUSTERS.map((c, i) => {
  const hub = hubPosition(i, CLUSTERS.length);
  const leaves = c.children.map((_, j) =>
    childPosition(hub.angle, hub, j, c.children.length),
  );
  return { ...c, hub, leaves };
});

// ---------- component --------------------------------------------------------

export default function EducationConstellation() {
  return (
    <section className="relative mt-12">
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-teal-300/90">
          The Knowledge Graph
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/55">
          Every concept connects to the ones it actually depends on. Click a
          hub to jump into that branch of the library.
        </p>
      </div>

      <div className="relative mx-auto aspect-[3/2] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-teal-300/20 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.20),transparent_55%),radial-gradient(circle_at_top,rgba(94,234,212,0.10),transparent_60%),linear-gradient(180deg,#040a0d,#02060a)] shadow-[0_0_120px_rgba(45,212,191,0.18)]">
        {/* Faint background grid */}
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(94,234,212,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(94,234,212,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_95%)]" />

        {/* Soft core glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-300/15 blur-[110px]" />

        <style>{`
          @keyframes constDrawIn {
            0%   { stroke-dashoffset: 1; opacity: 0; }
            10%  { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 1; }
          }
          @keyframes constPulseLine {
            0%, 100% { stroke-opacity: var(--base, .35); }
            50%      { stroke-opacity: calc(var(--base, .35) * 2.2); }
          }
          @keyframes constNodeIn {
            0%   { opacity: 0; transform: scale(.2); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes constTwinkle {
            0%, 100% { opacity: .9; transform: scale(1); }
            50%      { opacity: 1;  transform: scale(1.25); }
          }
          @keyframes constHubFloat {
            0%, 100% { transform: translate3d(0,0,0); }
            50%      { transform: translate3d(0,-3px,0); }
          }
          @keyframes constCoreIn {
            0%   { opacity: 0; transform: scale(.4); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes constCorePulse {
            0%, 100% { filter: drop-shadow(0 0 22px rgba(94,234,212,.55)); }
            50%      { filter: drop-shadow(0 0 60px rgba(186,250,237,.95)); }
          }
          @keyframes constRingIn {
            0% { opacity: 0; transform: scale(.85); }
            100% { opacity: 1; transform: scale(1); }
          }

          .const-line {
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
            opacity: 0;
            animation:
              constDrawIn 1.5s cubic-bezier(.4,0,.2,1) var(--draw-delay, 0s) forwards,
              constPulseLine 5s ease-in-out var(--pulse-delay, 1.6s) infinite;
          }
          .const-leaf {
            transform-origin: center;
            transform-box: fill-box;
            opacity: 0;
            animation:
              constNodeIn .8s ease-out var(--node-delay, 0s) forwards,
              constTwinkle 4s ease-in-out calc(var(--node-delay, 0s) + .8s) infinite;
          }
          .const-hub-wrap {
            opacity: 0;
            animation:
              constNodeIn .9s cubic-bezier(.2,.7,.2,1) var(--hub-delay, 0s) forwards,
              constHubFloat 8s ease-in-out calc(var(--hub-delay, 0s) + .9s) infinite;
          }
          .const-core {
            opacity: 0;
            transform-origin: ${CX}px ${CY}px;
            transform-box: fill-box;
            animation:
              constCoreIn 1.2s cubic-bezier(.2,.7,.2,1) .1s forwards,
              constCorePulse 6s ease-in-out 1.4s infinite;
          }
          .const-ring {
            opacity: 0;
            transform-origin: ${CX}px ${CY}px;
            transform-box: fill-box;
            animation: constRingIn 1.6s ease-out var(--ring-delay, .3s) forwards;
          }
        `}</style>

        {/* SVG layer */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="cglow">
              <feGaussianBlur stdDeviation="2.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="csoft">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="cbright">
              <feGaussianBlur stdDeviation="9" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="cLineGrad" x1="0" x2="1">
              <stop offset="0%"   stopColor="rgba(45,212,191,.05)" />
              <stop offset="50%"  stopColor="rgba(94,234,212,.95)" />
              <stop offset="100%" stopColor="rgba(45,212,191,.05)" />
            </linearGradient>

            <radialGradient id="cCoreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="rgba(255,255,255,1)"   />
              <stop offset="30%"  stopColor="rgba(186,250,237,.95)" />
              <stop offset="65%"  stopColor="rgba(45,212,191,.45)"  />
              <stop offset="100%" stopColor="rgba(20,184,166,0)"    />
            </radialGradient>

            <radialGradient id="cHubGrad" cx="50%" cy="40%" r="65%">
              <stop offset="0%"   stopColor="rgba(186,250,237,.95)" />
              <stop offset="55%"  stopColor="rgba(45,212,191,.40)"  />
              <stop offset="100%" stopColor="rgba(8,22,26,1)"       />
            </radialGradient>
          </defs>

          {/* Concentric atmosphere rings */}
          <g fill="none" stroke="rgba(94,234,212,.12)" strokeWidth="1">
            <circle
              className="const-ring"
              style={{ ["--ring-delay" as string]: "0.4s" }}
              cx={CX} cy={CY} r={140}
            />
            <circle
              className="const-ring"
              style={{ ["--ring-delay" as string]: "0.7s" }}
              cx={CX} cy={CY} r={210}
              stroke="rgba(94,234,212,.09)"
            />
            <circle
              className="const-ring"
              style={{ ["--ring-delay" as string]: "1.0s" }}
              cx={CX} cy={CY} r={HUB_RADIUS}
              stroke="rgba(94,234,212,.07)"
              strokeDasharray="4 8"
            />
          </g>

          {/* Lines: core → each hub (these are the "expanding" rays) */}
          {LAYOUT.map((c, i) => {
            const drawDelay = 0.6 + i * 0.06;
            return (
              <line
                key={`spoke-${c.id}`}
                className="const-line"
                x1={CX}
                y1={CY}
                x2={c.hub.x}
                y2={c.hub.y}
                stroke="url(#cLineGrad)"
                strokeWidth="1.4"
                pathLength={1}
                filter="url(#cglow)"
                style={{
                  ["--base" as string]: "0.45",
                  ["--draw-delay" as string]: `${drawDelay.toFixed(2)}s`,
                  ["--pulse-delay" as string]: `${(drawDelay + 1.6).toFixed(2)}s`,
                }}
              />
            );
          })}

          {/* Lines: hub → each leaf */}
          {LAYOUT.flatMap((c, i) =>
            c.leaves.map((leaf, j) => {
              const drawDelay = 1.4 + i * 0.06 + j * 0.05;
              return (
                <line
                  key={`leaf-line-${c.id}-${j}`}
                  className="const-line"
                  x1={c.hub.x}
                  y1={c.hub.y}
                  x2={leaf.x}
                  y2={leaf.y}
                  stroke="rgba(94,234,212,.55)"
                  strokeWidth="0.9"
                  pathLength={1}
                  filter="url(#cglow)"
                  style={{
                    ["--base" as string]: "0.30",
                    ["--draw-delay" as string]: `${drawDelay.toFixed(2)}s`,
                    ["--pulse-delay" as string]: `${(drawDelay + 1.6).toFixed(2)}s`,
                  }}
                />
              );
            }),
          )}

          {/* Lines: rim web — each hub connects to the next one */}
          {LAYOUT.map((c, i) => {
            const next = LAYOUT[(i + 1) % LAYOUT.length];
            const drawDelay = 2.2 + i * 0.04;
            return (
              <line
                key={`rim-${c.id}`}
                className="const-line"
                x1={c.hub.x}
                y1={c.hub.y}
                x2={next.hub.x}
                y2={next.hub.y}
                stroke="rgba(94,234,212,.35)"
                strokeWidth="0.8"
                pathLength={1}
                filter="url(#cglow)"
                style={{
                  ["--base" as string]: "0.18",
                  ["--draw-delay" as string]: `${drawDelay.toFixed(2)}s`,
                  ["--pulse-delay" as string]: `${(drawDelay + 1.6).toFixed(2)}s`,
                }}
              />
            );
          })}

          {/* Leaf nodes */}
          {LAYOUT.flatMap((c, i) =>
            c.leaves.map((leaf, j) => {
              const delay = 1.9 + i * 0.06 + j * 0.05;
              return (
                <g
                  key={`leaf-${c.id}-${j}`}
                  className="const-leaf"
                  style={{ ["--node-delay" as string]: `${delay.toFixed(2)}s` }}
                >
                  <circle
                    cx={leaf.x}
                    cy={leaf.y}
                    r={5}
                    fill="rgba(186,250,237,.30)"
                    filter="url(#csoft)"
                  />
                  <circle
                    cx={leaf.x}
                    cy={leaf.y}
                    r={2.4}
                    fill="rgba(186,250,237,1)"
                    filter="url(#cglow)"
                  />
                  <text
                    x={leaf.x}
                    y={leaf.y + 18}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="500"
                    fill="rgba(255,255,255,.55)"
                    style={{ letterSpacing: "0.04em" }}
                  >
                    {c.children[j]}
                  </text>
                </g>
              );
            }),
          )}

          {/* Central core (Arkhe) */}
          <g className="const-core">
            <circle
              cx={CX}
              cy={CY}
              r={120}
              fill="url(#cCoreGrad)"
              opacity="0.85"
            />
            <circle
              cx={CX}
              cy={CY}
              r={62}
              fill="rgba(8,22,26,.92)"
              stroke="rgba(94,234,212,.85)"
              strokeWidth="1.6"
              filter="url(#cglow)"
            />
            <circle
              cx={CX}
              cy={CY}
              r={50}
              fill="none"
              stroke="rgba(94,234,212,.35)"
              strokeWidth="0.8"
            />
            <text
              x={CX}
              y={CY - 6}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="rgba(94,234,212,.95)"
              style={{ letterSpacing: "0.32em" }}
            >
              ARKHE
            </text>
            <text
              x={CX}
              y={CY + 14}
              textAnchor="middle"
              fontSize="10"
              fontWeight="500"
              fill="rgba(255,255,255,.55)"
              style={{ letterSpacing: "0.25em" }}
            >
              CORE
            </text>
          </g>
        </svg>

        {/* Hub badges — rendered as HTML so they can be clickable links
            with full hover states. Positioned absolutely using the same
            geometry as the SVG. */}
        {LAYOUT.map((c, i) => {
          const xPct = (c.hub.x / VW) * 100;
          const yPct = (c.hub.y / VH) * 100;
          const delay = 1.0 + i * 0.07;
          return (
            <Link
              key={c.id}
              href={`/education#${c.id}`}
              aria-label={`Open ${c.label} category`}
              className="const-hub-wrap absolute z-10 -translate-x-1/2 -translate-y-1/2 group"
              style={{
                left: `${xPct}%`,
                top: `${yPct}%`,
                ["--hub-delay" as string]: `${delay.toFixed(2)}s`,
              }}
            >
              <span
                className="block rounded-full border border-teal-300/60 bg-[#04141a]/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-100 shadow-[0_0_28px_rgba(45,212,191,0.35)] backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-teal-200 group-hover:bg-[#062327] group-hover:text-white group-hover:shadow-[0_0_45px_rgba(94,234,212,0.55)]"
              >
                {c.label}
              </span>
            </Link>
          );
        })}

        {/* Legend strip */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.4em] text-white/35">
          12 categories · radial knowledge graph
        </div>
      </div>
    </section>
  );
}
