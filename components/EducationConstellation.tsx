"use client";

// Interactive knowledge-graph constellation for /education.
//
// 12 geodesic polyhedron hubs (matching the /system venture map's aesthetic)
// arranged radially around an Arkhe core. Each hub represents a category in
// the education library.
//
// Behaviour:
//   • idle             — only the polyhedron + label are shown
//   • hover a hub      — its sub-topics expand, fanning outward; non-active
//                        hubs dim, lines connecting to the active hub brighten
//   • click a hub      — pins that hub so the user can move the cursor onto
//                        the sub-topics and click through to the articles
//   • click outside    — unpins
//   • click a sub-topic when pinned → /education/<category>/<slug>

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ---------- model ------------------------------------------------------------

type Leaf = { label: string; slug: string };

type Cluster = {
  /** Folder id under content/education — also the accordion section id. */
  id: string;
  label: string;
  children: Leaf[];
};

// 12 clusters, ordered clockwise starting at the top. Slugs match real
// markdown files in content/education/<id>/<slug>.md so that clicking a
// sub-topic jumps to the article (or the "in development" placeholder).
const CLUSTERS: Cluster[] = [
  {
    id: "arkhe_systems",
    label: "Arkhe Systems",
    children: [
      { label: "Swarm",      slug: "swarm_architecture" },
      { label: "Risk Engine", slug: "arkhe_risk_engine" },
      { label: "Memory",     slug: "arkhe_memory_system" },
      { label: "Supervisor", slug: "arkhe_supervisor_agent" },
    ],
  },
  {
    id: "macro",
    label: "Macro",
    children: [
      { label: "Liquidity", slug: "global_liquidity" },
      { label: "Rates",     slug: "interest_rates" },
      { label: "QE / QT",   slug: "quantitative_easing" },
      { label: "Dollar",    slug: "dollar_system" },
    ],
  },
  {
    id: "risk_management",
    label: "Risk",
    children: [
      { label: "Tail",    slug: "tail_risk" },
      { label: "VaR",     slug: "value_at_risk" },
      { label: "Stress",  slug: "stress_testing" },
      { label: "Hedging", slug: "portfolio_hedging" },
    ],
  },
  {
    id: "market_structure",
    label: "Microstructure",
    children: [
      { label: "Order Books", slug: "order_books" },
      { label: "Dark Pools",  slug: "dark_pools" },
      { label: "Cycles",      slug: "market_cycles" },
      { label: "Spread",      slug: "bid_ask_spread" },
    ],
  },
  {
    id: "strategies",
    label: "Strategies",
    children: [
      { label: "Trend",     slug: "trend_following" },
      { label: "Mean Rev",  slug: "mean_reversion" },
      { label: "Stat Arb",  slug: "statistical_arbitrage" },
      { label: "Carry",     slug: "carry_trade" },
    ],
  },
  {
    id: "quant",
    label: "Quant",
    children: [
      { label: "Vol",     slug: "volatility_modeling" },
      { label: "Factors", slug: "factor_models" },
      { label: "Greeks",  slug: "black_scholes" },
      { label: "MC",      slug: "monte_carlo" },
    ],
  },
  {
    id: "psychology",
    label: "Psychology",
    children: [
      { label: "Reflexivity", slug: "reflexivity" },
      { label: "FOMO",        slug: "fomo" },
      { label: "Bias",        slug: "cognitive_bias" },
      { label: "Cycles",      slug: "sentiment_cycles" },
    ],
  },
  {
    id: "historical_events",
    label: "Historical",
    children: [
      { label: "1987",  slug: "black_monday_1987" },
      { label: "LTCM",  slug: "long_term_capital_management" },
      { label: "2008",  slug: "housing_bubble" },
      { label: "COVID", slug: "covid_liquidity_crisis" },
    ],
  },
  {
    id: "blockchain",
    label: "Blockchain",
    children: [
      { label: "BTC",  slug: "bitcoin" },
      { label: "ETH",  slug: "ethereum" },
      { label: "DeFi", slug: "defi" },
      { label: "MEV",  slug: "mev" },
    ],
  },
  {
    id: "asset_classes",
    label: "Asset Classes",
    children: [
      { label: "Equities", slug: "equities" },
      { label: "FX",       slug: "currencies" },
      { label: "Bonds",    slug: "fixed_income" },
      { label: "Derivs",   slug: "derivatives" },
    ],
  },
  {
    id: "alternative_assets",
    label: "Alternatives",
    children: [
      { label: "PE",        slug: "private_equity" },
      { label: "VC",        slug: "venture_capital" },
      { label: "Hedge",     slug: "hedge_funds" },
      { label: "Tokenized", slug: "tokenized_assets" },
    ],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    children: [
      { label: "Construct", slug: "portfolio_construction" },
      { label: "Allocate",  slug: "asset_allocation" },
      { label: "Parity",    slug: "risk_parity" },
      { label: "Optim.",    slug: "portfolio_optimization" },
    ],
  },
];

// ---------- geometry ---------------------------------------------------------

const VW = 1200;
const VH = 760;
const CX = VW / 2;
const CY = VH / 2;
const HUB_RADIUS = 260;
const CHILD_RADIUS = 96;
const CHILD_FAN_DEG = 58;
const POLY_SCALE = 0.62;

type Pt = { x: number; y: number };

function hubPosition(i: number, total: number): Pt & { angle: number } {
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

type LaidOutLeaf = Leaf & { pos: Pt };
type LaidOutCluster = Omit<Cluster, "children"> & {
  hub: Pt & { angle: number };
  leaves: LaidOutLeaf[];
};

const LAYOUT: LaidOutCluster[] = CLUSTERS.map((c, i) => {
  const hub = hubPosition(i, CLUSTERS.length);
  const leaves: LaidOutLeaf[] = c.children.map((leaf, j) => ({
    ...leaf,
    pos: childPosition(hub.angle, hub, j, c.children.length),
  }));
  return { id: c.id, label: c.label, hub, leaves };
});

// ---------- polyhedron wireframe --------------------------------------------

function Polyhedron({
  active,
  dim,
  scale = 1,
}: {
  active: boolean;
  dim: boolean;
  scale?: number;
}) {
  const baseStroke = dim
    ? "rgba(94,234,212,.28)"
    : active
      ? "rgba(186,250,237,.95)"
      : "rgba(94,234,212,.65)";
  const innerStroke = dim
    ? "rgba(255,255,255,.08)"
    : "rgba(255,255,255,.20)";
  const haloStroke = active
    ? "rgba(94,234,212,.55)"
    : "rgba(94,234,212,.18)";

  return (
    <g
      style={{
        transform: `scale(${scale})`,
        transformBox: "fill-box",
        transformOrigin: "center",
        transition: "all .35s ease",
      }}
    >
      <circle r="58" fill="none" stroke={haloStroke} strokeWidth={active ? 1.2 : 0.8} />
      <polygon
        points="0,-46 40,-23 40,23 0,46 -40,23 -40,-23"
        fill={active ? "rgba(94,234,212,0.10)" : "rgba(0,0,0,0.40)"}
        stroke={baseStroke}
        strokeWidth={active ? 1.1 : 0.8}
      />
      <polygon
        points="0,-32 30,-10 19,26 -19,26 -30,-10"
        fill="none"
        stroke={baseStroke}
        strokeWidth={0.7}
      />
      <polygon
        points="0,32 30,10 19,-26 -19,-26 -30,10"
        fill="none"
        stroke={innerStroke}
        strokeWidth={0.7}
      />
      <line x1="0" y1="-46" x2="0" y2="46" stroke={baseStroke} strokeWidth={0.7} />
      <line x1="-40" y1="-23" x2="40" y2="23" stroke={baseStroke} strokeWidth={0.7} />
      <line x1="40" y1="-23" x2="-40" y2="23" stroke={baseStroke} strokeWidth={0.7} />
      <line x1="0" y1="-46" x2="30" y2="-10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="0" y1="-46" x2="-30" y2="-10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="0" y1="46" x2="30" y2="10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="0" y1="46" x2="-30" y2="10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="-40" y1="-23" x2="-30" y2="10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="40" y1="-23" x2="30" y2="10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="-40" y1="23" x2="-30" y2="-10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="40" y1="23" x2="30" y2="-10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="-30" y1="-10" x2="30" y2="-10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="-30" y1="10" x2="30" y2="10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="-19" y1="-26" x2="19" y2="26" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="19" y1="-26" x2="-19" y2="26" stroke={baseStroke} strokeWidth={0.6} />
      <circle
        r={active ? 4 : 2.5}
        fill="rgba(186,250,237,.95)"
        style={{ filter: "drop-shadow(0 0 8px rgba(45,255,220,.9))" }}
      />
    </g>
  );
}

// ---------- main component ---------------------------------------------------

export default function EducationConstellation() {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pin wins over hover so the user can move their cursor off the polyhedron
  // and onto a sub-topic without the expansion collapsing.
  const activeId = pinnedId ?? hoverId;

  function activate(id: string) {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    setHoverId(id);
  }

  function scheduleDismiss() {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    dismissTimer.current = setTimeout(() => setHoverId(null), 220);
  }

  function togglePin(id: string) {
    setPinnedId((cur) => (cur === id ? null : id));
  }

  // Click outside the canvas → unpin.
  useEffect(() => {
    if (!pinnedId) return;
    function handleClick(e: MouseEvent) {
      const node = containerRef.current;
      if (!node) return;
      if (!node.contains(e.target as Node)) setPinnedId(null);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [pinnedId]);

  // ESC also unpins / clears hover.
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setPinnedId(null);
        setHoverId(null);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section className="relative mt-12">
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-teal-300/90">
          The Knowledge Graph
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/55">
          Hover any hub to expand its sub-topics. Click to pin the expansion,
          then click any sub-topic to jump into the library.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-teal-300/25 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.20),transparent_55%),radial-gradient(circle_at_top,rgba(94,234,212,0.12),transparent_60%),linear-gradient(180deg,#040a0d,#02060a)] shadow-[0_0_120px_rgba(45,212,191,0.18)]"
      >
        {/* Faint background grid */}
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(94,234,212,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(94,234,212,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_95%)]" />

        {/* Soft core glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-300/12 blur-[110px]" />

        <style>{`
          @keyframes ecDrawIn {
            0%   { stroke-dashoffset: 1; opacity: 0; }
            10%  { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 1; }
          }
          @keyframes ecPulseLine {
            0%, 100% { stroke-opacity: var(--base, .35); }
            50%      { stroke-opacity: calc(var(--base, .35) * 2.0); }
          }
          @keyframes ecPolyIn {
            0%   { opacity: 0; transform: scale(.55); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes ecFloat {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-4px); }
          }
          @keyframes ecCoreIn {
            0%   { opacity: 0; transform: scale(.4); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes ecCorePulse {
            0%, 100% { filter: drop-shadow(0 0 22px rgba(94,234,212,.55)); }
            50%      { filter: drop-shadow(0 0 60px rgba(186,250,237,.95)); }
          }
          @keyframes ecRingIn {
            0% { opacity: 0; transform: scale(.85); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes ecLabelIn {
            0%   { opacity: 0; transform: translateY(-4px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes ecPinPulse {
            0%, 100% { stroke-opacity: .35; transform: scale(1); }
            50%      { stroke-opacity: .8;  transform: scale(1.1); }
          }

          .ec-line {
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
            opacity: 0;
            animation:
              ecDrawIn 1.5s cubic-bezier(.4,0,.2,1) var(--draw-delay, 0s) forwards,
              ecPulseLine 5s ease-in-out var(--pulse-delay, 1.6s) infinite;
          }
          .ec-poly-wrap {
            opacity: 0;
            animation:
              ecPolyIn 1s cubic-bezier(.2,.7,.2,1) var(--poly-delay, 0s) forwards,
              ecFloat 8s ease-in-out calc(var(--poly-delay, 0s) + 1.2s) infinite;
            transform-origin: center;
            transform-box: fill-box;
          }
          .ec-core {
            opacity: 0;
            transform-origin: ${CX}px ${CY}px;
            transform-box: fill-box;
            animation:
              ecCoreIn 1.2s cubic-bezier(.2,.7,.2,1) .1s forwards,
              ecCorePulse 6s ease-in-out 1.4s infinite;
          }
          .ec-ring {
            opacity: 0;
            transform-origin: ${CX}px ${CY}px;
            transform-box: fill-box;
            animation: ecRingIn 1.6s ease-out var(--ring-delay, .3s) forwards;
          }
          .ec-label {
            opacity: 0;
            animation: ecLabelIn .7s ease-out var(--label-delay, 2.2s) forwards;
          }
          .ec-pin-ring {
            transform-origin: center;
            transform-box: fill-box;
            animation: ecPinPulse 2.4s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .ec-line, .ec-poly-wrap, .ec-core, .ec-ring, .ec-label {
              animation: none !important;
              opacity: 1 !important;
              stroke-dashoffset: 0 !important;
              transform: none !important;
            }
          }
        `}</style>

        <div className="relative aspect-[1200/760] w-full">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${VW} ${VH}`}
            preserveAspectRatio="xMidYMid meet"
            // Click on empty SVG area also unpins
            onClick={(e) => {
              if (e.target === e.currentTarget) setPinnedId(null);
            }}
          >
            <defs>
              <filter id="ecGlow">
                <feGaussianBlur stdDeviation="2.4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="ecSoft">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="ecLineGrad" x1="0" x2="1">
                <stop offset="0%"   stopColor="rgba(45,212,191,.05)" />
                <stop offset="50%"  stopColor="rgba(94,234,212,.95)" />
                <stop offset="100%" stopColor="rgba(45,212,191,.05)" />
              </linearGradient>
              <radialGradient id="ecCoreGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="rgba(255,255,255,1)" />
                <stop offset="30%"  stopColor="rgba(186,250,237,.95)" />
                <stop offset="65%"  stopColor="rgba(45,212,191,.45)" />
                <stop offset="100%" stopColor="rgba(20,184,166,0)" />
              </radialGradient>
            </defs>

            {/* Concentric atmosphere rings */}
            <g fill="none">
              <circle
                className="ec-ring"
                style={{ ["--ring-delay" as string]: "0.4s" }}
                cx={CX} cy={CY} r={140}
                stroke="rgba(94,234,212,.12)" strokeWidth="1"
              />
              <circle
                className="ec-ring"
                style={{ ["--ring-delay" as string]: "0.7s" }}
                cx={CX} cy={CY} r={205}
                stroke="rgba(94,234,212,.09)" strokeWidth="1"
              />
              <circle
                className="ec-ring"
                style={{ ["--ring-delay" as string]: "1.0s" }}
                cx={CX} cy={CY} r={HUB_RADIUS}
                stroke="rgba(94,234,212,.07)" strokeWidth="1"
                strokeDasharray="4 8"
              />
            </g>

            {/* Lines: core → each hub. Lit when that cluster is active. */}
            {LAYOUT.map((c, i) => {
              const lit = activeId === c.id;
              const dimmed = activeId !== null && !lit;
              const drawDelay = 0.6 + i * 0.06;
              return (
                <line
                  key={`spoke-${c.id}`}
                  className="ec-line"
                  x1={CX}
                  y1={CY}
                  x2={c.hub.x}
                  y2={c.hub.y}
                  stroke={lit ? "rgba(94,234,212,.95)" : "url(#ecLineGrad)"}
                  strokeWidth={lit ? 1.8 : 1.4}
                  pathLength={1}
                  filter="url(#ecGlow)"
                  style={{
                    ["--base" as string]: lit ? "0.9" : dimmed ? "0.18" : "0.45",
                    ["--draw-delay" as string]: `${drawDelay.toFixed(2)}s`,
                    ["--pulse-delay" as string]: `${(drawDelay + 1.6).toFixed(2)}s`,
                    transition: "stroke .3s ease, stroke-width .3s ease",
                  }}
                />
              );
            })}

            {/* Lines: rim web — connect adjacent hubs */}
            {LAYOUT.map((c, i) => {
              const next = LAYOUT[(i + 1) % LAYOUT.length];
              const drawDelay = 2.2 + i * 0.04;
              const dimmed = activeId !== null;
              return (
                <line
                  key={`rim-${c.id}`}
                  className="ec-line"
                  x1={c.hub.x}
                  y1={c.hub.y}
                  x2={next.hub.x}
                  y2={next.hub.y}
                  stroke="rgba(94,234,212,.35)"
                  strokeWidth="0.7"
                  pathLength={1}
                  filter="url(#ecGlow)"
                  style={{
                    ["--base" as string]: dimmed ? "0.08" : "0.18",
                    ["--draw-delay" as string]: `${drawDelay.toFixed(2)}s`,
                    ["--pulse-delay" as string]: `${(drawDelay + 1.6).toFixed(2)}s`,
                    transition: "stroke-opacity .3s ease",
                  }}
                />
              );
            })}

            {/* Sub-topic web — only when a cluster is active */}
            <AnimatePresence>
              {activeId &&
                (() => {
                  const cluster = LAYOUT.find((c) => c.id === activeId);
                  if (!cluster) return null;
                  return (
                    <motion.g
                      key={`web-${cluster.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {cluster.leaves.map((leaf, j) => (
                        <line
                          key={`leaf-line-${j}`}
                          x1={cluster.hub.x}
                          y1={cluster.hub.y}
                          x2={leaf.pos.x}
                          y2={leaf.pos.y}
                          stroke="rgba(94,234,212,.7)"
                          strokeWidth="1"
                          filter="url(#ecGlow)"
                        />
                      ))}
                      {cluster.leaves.map((leaf, j) => (
                        <g key={`leaf-${j}`}>
                          <circle
                            cx={leaf.pos.x}
                            cy={leaf.pos.y}
                            r={7}
                            fill="rgba(186,250,237,.25)"
                            filter="url(#ecSoft)"
                          />
                          <circle
                            cx={leaf.pos.x}
                            cy={leaf.pos.y}
                            r={3}
                            fill="rgba(186,250,237,1)"
                            filter="url(#ecGlow)"
                          />
                        </g>
                      ))}
                    </motion.g>
                  );
                })()}
            </AnimatePresence>

            {/* Hub polyhedrons */}
            {LAYOUT.map((c, i) => {
              const isActive = activeId === c.id;
              const isPinned = pinnedId === c.id;
              const dimmed = activeId !== null && !isActive;
              const polyDelay = 1.4 + i * 0.07;

              return (
                <g
                  key={c.id}
                  transform={`translate(${c.hub.x}, ${c.hub.y})`}
                  onMouseEnter={() => activate(c.id)}
                  onMouseLeave={scheduleDismiss}
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePin(c.id);
                  }}
                  onFocus={() => activate(c.id)}
                  onBlur={scheduleDismiss}
                  tabIndex={0}
                  role="button"
                  aria-label={`${c.label} — ${isPinned ? "pinned" : "click to pin"}`}
                  aria-pressed={isPinned}
                  style={{ cursor: "pointer", outline: "none" }}
                >
                  {/* Larger transparent hit-rect so the whole silhouette is hoverable */}
                  <circle r={70 * POLY_SCALE * (isActive ? 1.18 : 1)} fill="rgba(0,0,0,0.001)" />

                  <g
                    className="ec-poly-wrap"
                    style={{
                      ["--poly-delay" as string]: `${polyDelay.toFixed(2)}s`,
                    }}
                  >
                    <Polyhedron
                      active={isActive}
                      dim={dimmed}
                      scale={POLY_SCALE * (isActive ? 1.18 : 1)}
                    />
                    {/* Pin indicator — pulsing ring when this hub is pinned */}
                    {isPinned && (
                      <circle
                        className="ec-pin-ring"
                        r={66 * POLY_SCALE}
                        fill="none"
                        stroke="rgba(186,250,237,.6)"
                        strokeWidth="1.4"
                      />
                    )}
                  </g>
                </g>
              );
            })}

            {/* Central core (Arkhe) */}
            <g className="ec-core" pointerEvents="none">
              <circle
                cx={CX}
                cy={CY}
                r={120}
                fill="url(#ecCoreGrad)"
                opacity="0.85"
              />
              <circle
                cx={CX}
                cy={CY}
                r={62}
                fill="rgba(8,22,26,.92)"
                stroke="rgba(94,234,212,.85)"
                strokeWidth="1.6"
                filter="url(#ecGlow)"
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

          {/* HTML overlay: hub category labels — positioned via percentage. */}
          {LAYOUT.map((c, i) => {
            const xPct = (c.hub.x / VW) * 100;
            const yPct = (c.hub.y / VH) * 100;
            const isActive = activeId === c.id;
            const dimmed = activeId !== null && !isActive;
            const labelDelay = 2.0 + i * 0.07;
            return (
              <div
                key={`hub-label-${c.id}`}
                className="pointer-events-none absolute"
                style={{
                  left: `${xPct}%`,
                  top: `${yPct}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className="ec-label absolute left-1/2 top-[58px] -translate-x-1/2 whitespace-nowrap text-center"
                  style={{
                    ["--label-delay" as string]: `${labelDelay.toFixed(2)}s`,
                  }}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: dimmed ? 0.35 : 1,
                      y: isActive ? 4 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
                        isActive ? "text-white" : "text-teal-200/85"
                      }`}
                      style={{
                        textShadow: isActive
                          ? "0 0 14px rgba(94,234,212,0.9)"
                          : "0 0 8px rgba(45,212,191,0.4)",
                      }}
                    >
                      {c.label}
                    </span>
                  </motion.div>
                </div>
              </div>
            );
          })}

          {/* HTML overlay: sub-topic labels + click targets for the active cluster */}
          <AnimatePresence>
            {activeId &&
              (() => {
                const cluster = LAYOUT.find((c) => c.id === activeId);
                if (!cluster) return null;
                return cluster.leaves.map((leaf, j) => {
                  const xPct = (leaf.pos.x / VW) * 100;
                  const yPct = (leaf.pos.y / VH) * 100;
                  const href = `/education/${cluster.id}/${leaf.slug}`;
                  return (
                    <motion.div
                      key={`leaf-label-${cluster.id}-${j}`}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.22, delay: j * 0.04 }}
                      className="absolute z-10"
                      style={{
                        left: `${xPct}%`,
                        top: `${yPct}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <Link
                        href={href}
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={() => activate(cluster.id)}
                        className="group block translate-y-3 select-none rounded-md border border-teal-300/30 bg-[#04141a]/85 px-2.5 py-1 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-100 backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-teal-200 hover:bg-[#062a30] hover:text-white hover:shadow-[0_0_28px_rgba(94,234,212,0.55)]"
                      >
                        {leaf.label}
                      </Link>
                    </motion.div>
                  );
                });
              })()}
          </AnimatePresence>

          {/* Pin hint — only visible when pinned */}
          <AnimatePresence>
            {pinnedId && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-teal-300/30 bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-200 backdrop-blur"
              >
                Pinned · click outside or press esc to release
              </motion.div>
            )}
          </AnimatePresence>

          {!pinnedId && (
            <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.4em] text-white/35">
              12 categories · hover to expand · click to pin
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
