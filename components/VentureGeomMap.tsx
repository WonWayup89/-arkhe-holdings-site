"use client";

// Hero-style venture map for /system. Mirrors the homepage HeroNetwork's
// visual language: deep-space gradient, perspective grid floor, constellation
// stars, and geodesic-icosahedron polyhedrons floating in the canvas.
//
// Each polyhedron is a venture (lib/ventures.ts). On hover the active geom
// expands — its sub-node web radiates outward, the connection lines that
// touch it brighten, and a detail card slides in next to it. Click navigates
// to the venture's vertical page.

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ventures,
  ventureLinks,
  stageBadgeClasses,
  type Venture,
} from "@/lib/ventures";

// Canvas dimensions for the SVG viewBox. Layout coords below all use this
// pixel space; HTML labels/cards convert via percentages of the same space.
const VW = 1200;
const VH = 760;

// ---- background constellation -----------------------------------------------

type Star = { x: number; y: number; r: number; o: number };

const STARS: Star[] = [
  { x: 80, y: 60, r: 1.0, o: 0.45 },
  { x: 220, y: 140, r: 1.4, o: 0.65 },
  { x: 360, y: 90, r: 1.1, o: 0.5 },
  { x: 540, y: 180, r: 1.3, o: 0.6 },
  { x: 700, y: 70, r: 1.0, o: 0.45 },
  { x: 870, y: 150, r: 1.4, o: 0.65 },
  { x: 1040, y: 80, r: 1.1, o: 0.5 },
  { x: 1170, y: 200, r: 1.0, o: 0.45 },
  { x: 60, y: 320, r: 1.2, o: 0.55 },
  { x: 410, y: 340, r: 1.0, o: 0.45 },
  { x: 580, y: 430, r: 1.3, o: 0.6 },
  { x: 760, y: 360, r: 1.1, o: 0.5 },
  { x: 920, y: 410, r: 1.4, o: 0.65 },
  { x: 1080, y: 320, r: 1.2, o: 0.55 },
  { x: 130, y: 600, r: 1.1, o: 0.5 },
  { x: 320, y: 680, r: 1.4, o: 0.65 },
  { x: 510, y: 620, r: 1.0, o: 0.45 },
  { x: 690, y: 700, r: 1.3, o: 0.6 },
  { x: 860, y: 640, r: 1.1, o: 0.5 },
  { x: 1030, y: 720, r: 1.4, o: 0.65 },
];

// ---- geodesic polyhedron ----------------------------------------------------
// Same wireframe as HeroNetwork's #hpoly symbol, parameterized by scale.
// Coordinates are in a 100×100 box centered on (0,0); render with translate().

function Polyhedron({
  scale = 1,
  active = false,
  dim = false,
}: {
  scale?: number;
  active?: boolean;
  dim?: boolean;
}) {
  const baseStroke = dim
    ? "rgba(94,234,212,.30)"
    : active
      ? "rgba(186,250,237,.95)"
      : "rgba(94,234,212,.65)";
  const innerStroke = dim
    ? "rgba(255,255,255,.10)"
    : "rgba(255,255,255,.22)";
  const haloStroke = active
    ? "rgba(94,234,212,.45)"
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
      {/* outer halo ring */}
      <circle r="58" fill="none" stroke={haloStroke} strokeWidth={active ? 1.2 : 0.8} />

      {/* outer hexagonal silhouette */}
      <polygon
        points="0,-46 40,-23 40,23 0,46 -40,23 -40,-23"
        fill={active ? "rgba(94,234,212,0.10)" : "rgba(0,0,0,0.35)"}
        stroke={baseStroke}
        strokeWidth={active ? 1.1 : 0.8}
      />
      {/* inscribed pentagons */}
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
      {/* spokes */}
      <line x1="0" y1="-46" x2="0" y2="46" stroke={baseStroke} strokeWidth={0.7} />
      <line x1="-40" y1="-23" x2="40" y2="23" stroke={baseStroke} strokeWidth={0.7} />
      <line x1="40" y1="-23" x2="-40" y2="23" stroke={baseStroke} strokeWidth={0.7} />
      {/* triangle facets */}
      <line x1="0" y1="-46" x2="30" y2="-10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="0" y1="-46" x2="-30" y2="-10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="0" y1="46" x2="30" y2="10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="0" y1="46" x2="-30" y2="10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="-40" y1="-23" x2="-30" y2="10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="40" y1="-23" x2="30" y2="10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="-40" y1="23" x2="-30" y2="-10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="40" y1="23" x2="30" y2="-10" stroke={baseStroke} strokeWidth={0.6} />
      {/* equator */}
      <line x1="-30" y1="-10" x2="30" y2="-10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="-30" y1="10" x2="30" y2="10" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="-19" y1="-26" x2="19" y2="26" stroke={baseStroke} strokeWidth={0.6} />
      <line x1="19" y1="-26" x2="-19" y2="26" stroke={baseStroke} strokeWidth={0.6} />

      {/* center node */}
      <circle
        r={active ? 4 : 2.5}
        fill="rgba(186,250,237,.95)"
        style={{ filter: "drop-shadow(0 0 8px rgba(45,255,220,.9))" }}
      />
    </g>
  );
}

// ---- expanding sub-node web (only on active venture) -----------------------

function HoverWeb() {
  // Twelve sub-nodes around the polyhedron, each connected to center.
  const points = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    const r = 78 + (i % 3) * 8;
    return { x: Math.cos(a) * r, y: Math.sin(a) * r };
  });

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      {points.map((p, i) => (
        <line
          key={`web-l-${i}`}
          x1={0}
          y1={0}
          x2={p.x}
          y2={p.y}
          stroke="rgba(94,234,212,.55)"
          strokeWidth={0.8}
          style={{ filter: "drop-shadow(0 0 4px rgba(45,255,220,.55))" }}
        />
      ))}
      {points.map((p, i) => (
        <line
          key={`web-ring-${i}`}
          x1={p.x}
          y1={p.y}
          x2={points[(i + 1) % points.length].x}
          y2={points[(i + 1) % points.length].y}
          stroke="rgba(94,234,212,.30)"
          strokeWidth={0.6}
        />
      ))}
      {points.map((p, i) => (
        <circle
          key={`web-n-${i}`}
          cx={p.x}
          cy={p.y}
          r={1.6}
          fill="rgba(186,250,237,.9)"
          style={{ filter: "drop-shadow(0 0 4px rgba(94,234,212,.85))" }}
        />
      ))}
    </motion.g>
  );
}

// ---- helpers ----------------------------------------------------------------

function pxFromPos(v: Venture) {
  return { x: (v.pos.x / 100) * VW, y: (v.pos.y / 100) * VH };
}

function isLinkActive(activeId: string | null, a: string, b: string) {
  return activeId !== null && (activeId === a || activeId === b);
}

// ---- main component ---------------------------------------------------------

export default function VentureGeomMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  // Small dismissal delay so the cursor can move from polyhedron → detail card
  // (which sits a few pixels away) without the card flickering closed.
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function activate(id: string) {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    setActiveId(id);
  }

  function scheduleDismiss() {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    dismissTimer.current = setTimeout(() => setActiveId(null), 180);
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-teal-300/25 bg-[radial-gradient(circle_at_50%_42%,rgba(20,184,166,0.30),transparent_42%),radial-gradient(circle_at_top,rgba(94,234,212,0.14),transparent_50%),linear-gradient(180deg,#0a0f15,#04070a)] shadow-[0_0_120px_rgba(45,212,191,0.18)]">
      <style>{`
        /* ---- ENTRANCE: stars first, lines second, polyhedrons third, labels last ---- */

        @keyframes vgmStarIn {
          0% { opacity: 0; }
          100% { opacity: var(--o, .5); }
        }
        @keyframes vgmTwinkle {
          0%, 100% { opacity: var(--o, .5); }
          50% { opacity: 1; }
        }
        @keyframes vgmDrawIn {
          0%   { stroke-dashoffset: 1; opacity: 0; }
          18%  { opacity: var(--base-o, .55); }
          100% { stroke-dashoffset: 0; opacity: var(--base-o, .55); }
        }
        @keyframes vgmPulseLine {
          0%, 100% { stroke-opacity: var(--base-o, .55); }
          50%      { stroke-opacity: calc(var(--base-o, .55) * 1.7); }
        }
        @keyframes vgmPolyIn {
          0%   { opacity: 0; transform: scale(.55); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes vgmFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-5px) scale(1); }
        }
        @keyframes vgmFadeIn {
          0%   { opacity: 0; transform: translateY(-6px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .vgm-star {
          opacity: 0;
          animation:
            vgmStarIn .9s ease-out var(--star-delay, 0s) forwards,
            vgmTwinkle 4s ease-in-out calc(var(--star-delay, 0s) + 1.0s) infinite;
        }
        .vgm-line {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          opacity: 0;
          animation:
            vgmDrawIn 1.4s cubic-bezier(.4,.0,.2,1) var(--line-delay, .6s) forwards,
            vgmPulseLine 5s ease-in-out var(--pulse-delay, 2.4s) infinite;
        }
        .vgm-poly {
          opacity: 0;
          transform-origin: center;
          transform-box: fill-box;
          animation:
            vgmPolyIn 1.0s cubic-bezier(.2,.7,.2,1) var(--poly-delay, 1.6s) forwards,
            vgmFloat 7s ease-in-out var(--float-delay, 3s) infinite;
        }
        .vgm-label {
          opacity: 0;
          animation: vgmFadeIn .7s ease-out var(--label-delay, 2.4s) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .vgm-star, .vgm-line, .vgm-poly, .vgm-label {
            animation: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Background nebula glow */}
      <div className="pointer-events-none absolute left-1/2 top-[20%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-teal-300/12 blur-[110px]" />

      {/* Perspective grid floor */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] [perspective:1200px]">
        <div
          className="absolute inset-0 origin-bottom [transform:rotateX(64deg)_translateY(2%)] opacity-90"
          style={{
            backgroundImage:
              "linear-gradient(rgba(94,234,212,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.28) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "linear-gradient(to top, black 0%, black 35%, transparent 88%), radial-gradient(ellipse at center bottom, black 60%, transparent 95%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 0%, black 35%, transparent 88%), radial-gradient(ellipse at center bottom, black 60%, transparent 95%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        <div className="absolute inset-x-0 top-[8%] h-px bg-gradient-to-r from-transparent via-teal-200/60 to-transparent blur-[2px]" />
      </div>

      {/* Canvas — square-ish aspect for clean polyhedron layout */}
      <div className="relative aspect-[1200/760] w-full">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="vgmGlow">
              <feGaussianBlur stdDeviation="2.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="vgmLine" x1="0" x2="1">
              <stop offset="0%" stopColor="rgba(45,212,191,.04)" />
              <stop offset="50%" stopColor="rgba(94,234,212,.55)" />
              <stop offset="100%" stopColor="rgba(45,212,191,.04)" />
            </linearGradient>
          </defs>

          {/* Stars — twinkle in first, then keep twinkling */}
          {STARS.map((s, i) => {
            // Stagger by horizontal position for a left-to-right sweep
            const starDelay = 0.05 + (s.x / VW) * 0.7;
            return (
              <circle
                key={`star-${i}`}
                className="vgm-star"
                cx={s.x}
                cy={s.y}
                r={s.r}
                fill="rgba(186,250,237,.85)"
                filter="url(#vgmGlow)"
                style={
                  {
                    "--o": s.o,
                    "--star-delay": `${starDelay.toFixed(2)}s`,
                  } as React.CSSProperties
                }
              />
            );
          })}

          {/* Connection links between ventures — draw in across the canvas */}
          {ventureLinks.map(([a, b], i) => {
            const va = ventures.find((v) => v.id === a)!;
            const vb = ventures.find((v) => v.id === b)!;
            const pa = pxFromPos(va);
            const pb = pxFromPos(vb);
            const lit = isLinkActive(activeId, a, b);
            const baseOpacity = lit ? 1 : activeId ? 0.25 : 0.55;
            // Stagger draw-in by which side of the canvas the line starts on
            const drawDelay = 0.6 + (Math.min(pa.x, pb.x) / VW) * 0.9;
            return (
              <line
                key={`link-${i}`}
                className="vgm-line"
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke={lit ? "rgba(94,234,212,.85)" : "url(#vgmLine)"}
                strokeWidth={lit ? 1.6 : 1}
                pathLength={1}
                style={
                  {
                    "--base-o": baseOpacity,
                    "--line-delay": `${drawDelay.toFixed(2)}s`,
                    "--pulse-delay": `${(drawDelay + 1.6 + (i % 4) * 0.3).toFixed(2)}s`,
                    filter: lit
                      ? "drop-shadow(0 0 6px rgba(45,255,220,.7))"
                      : undefined,
                    transition: "stroke .35s ease, filter .35s ease",
                  } as React.CSSProperties
                }
              />
            );
          })}

          {/* Polyhedrons — fade + scale in at line endpoints, then float */}
          {ventures.map((v, i) => {
            const p = pxFromPos(v);
            const isActive = activeId === v.id;
            const dimmed = activeId !== null && !isActive;
            const baseScale = v.size ?? 1;
            // Polyhedrons appear after lines have mostly drawn in.
            const polyDelay = 1.7 + i * 0.18;
            return (
              <g
                key={v.id}
                transform={`translate(${p.x}, ${p.y})`}
                onMouseEnter={() => activate(v.id)}
                onFocus={() => activate(v.id)}
                onMouseLeave={scheduleDismiss}
                onBlur={scheduleDismiss}
                tabIndex={0}
                role="button"
                aria-label={`${v.name} — ${v.vertical}`}
                style={{ cursor: "pointer", outline: "none" }}
              >
                <g
                  className="vgm-poly"
                  style={
                    {
                      "--poly-delay": `${polyDelay.toFixed(2)}s`,
                      "--float-delay": `${(polyDelay + 1.2 + i * 0.4).toFixed(2)}s`,
                    } as React.CSSProperties
                  }
                >
                  {/* Invisible hit-rect — makes the entire polyhedron silhouette hoverable, not just the wireframe lines. */}
                  <circle
                    r={70 * (v.size ?? 1)}
                    fill="rgba(0,0,0,0.001)"
                    pointerEvents="all"
                  />
                  <AnimatePresence>{isActive && <HoverWeb />}</AnimatePresence>
                  <Polyhedron
                    scale={baseScale * (isActive ? 1.18 : 1)}
                    active={isActive}
                    dim={dimmed}
                  />
                </g>
              </g>
            );
          })}
        </svg>

        {/* HTML overlay: labels + detail cards (positioned via percentage) */}
        {ventures.map((v, i) => {
          const isActive = activeId === v.id;
          // Detail card placement — flip side when polyhedron is on the right edge
          const cardOnLeft = v.pos.x > 55;
          // Labels fade in last, after their polyhedron has resolved
          const labelDelay = 2.3 + i * 0.18;
          return (
            <div
              key={`label-${v.id}`}
              className="pointer-events-none absolute"
              style={{
                left: `${v.pos.x}%`,
                top: `${v.pos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Compact label — outer wrapper handles entrance fade once,
                  inner motion.div multiplies in the hover-state opacity. */}
              <div
                className="vgm-label absolute left-1/2 top-[72px] -translate-x-1/2 whitespace-nowrap text-center"
                style={
                  {
                    "--label-delay": `${labelDelay.toFixed(2)}s`,
                  } as React.CSSProperties
                }
              >
                <motion.div
                  initial={false}
                  animate={{
                    opacity: activeId === null ? 1 : isActive ? 0 : 0.4,
                    y: isActive ? 16 : 0,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-sm font-semibold tracking-tight text-white drop-shadow-[0_0_12px_rgba(45,212,191,0.55)]">
                    {v.name}
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-teal-300/80">
                    {v.vertical}
                  </p>
                </motion.div>
              </div>

              {/* Expanded detail card on hover */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: cardOnLeft ? 20 : -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    onMouseEnter={() => activate(v.id)}
                    onMouseLeave={scheduleDismiss}
                    className="pointer-events-auto absolute w-[280px] rounded-2xl border border-teal-300/30 bg-black/80 p-5 shadow-[0_0_50px_rgba(45,212,191,0.35)] backdrop-blur-xl"
                    style={{
                      // Anchor card opposite the polyhedron's side of the canvas
                      left: cardOnLeft ? "auto" : "100px",
                      right: cardOnLeft ? "100px" : "auto",
                      top: "-40px",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold leading-tight text-white">
                          {v.name}
                        </h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
                          {v.vertical}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${stageBadgeClasses[v.stageColor]}`}
                      >
                        {v.stage}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      {v.description}
                    </p>
                    <Link
                      href={v.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300 transition-colors hover:text-teal-100"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
