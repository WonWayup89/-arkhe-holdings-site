"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const ventures = [
  {
    id: "ai",
    label: "Arkhe AI Systems",
    type: "Technology / AI",
    status: "In Development",
    x: 50,
    y: 17,
    body:
      "Applied AI, automation workflows, research assistants, decision support tools, and internal operating systems built to increase efficiency across every Arkhe entity.",
    note: "Currently building internal tooling and proof of concept automation systems.",
  },
  {
    id: "legal",
    label: "Arkhe Legal",
    type: "Legal Infrastructure",
    status: "Forming",
    x: 18,
    y: 44,
    body:
      "Entity structure, contracts, governance, intellectual property planning, compliance protocols, and legal architecture for Arkhe ventures.",
    note: "Future legal services will only operate through properly licensed channels.",
  },
  {
    id: "media",
    label: "Arkhe Media",
    type: "Media / Publishing",
    status: "Planned",
    x: 82,
    y: 44,
    body:
      "Publishing, education, founder notes, technical breakdowns, public communication, and strategic narrative for the Arkhe ecosystem.",
    note: "Launch planned after core infrastructure is established.",
  },
  {
    id: "anon",
    label: "Arkhe ANON Network",
    type: "Privacy / Community",
    status: "Concept",
    x: 30,
    y: 77,
    body:
      "Privacy focused digital infrastructure for anonymous identity, secure communication, and decentralized community design.",
    note: "Architecture and community model under active design.",
  },
  {
    id: "holdings",
    label: "Arkhe Holdings",
    type: "Parent Structure",
    status: "Core",
    x: 70,
    y: 77,
    body:
      "The parent framework connecting legal, technical, media, and strategic systems under one disciplined holding structure.",
    note: "Built for long term control, scalability, and venture formation.",
  },
];

const links = [
  ["ai", "legal"],
  ["ai", "media"],
  ["legal", "anon"],
  ["media", "holdings"],
  ["anon", "holdings"],
  ["legal", "holdings"],
  ["ai", "holdings"],
];

function WireGeom({
  node,
  active,
  index,
  setActive,
}: {
  node: (typeof ventures)[number];
  active: (typeof ventures)[number];
  index: number;
  setActive: (node: (typeof ventures)[number]) => void;
}) {
  const cx = node.x * 10.8;
  const cy = node.y * 5.8;
  const isActive = active.id === node.id;

  return (
    <motion.g
      onMouseEnter={() => setActive(node)}
      className="cursor-pointer"
      initial={{ opacity: 0, scale: 0.45, rotate: -18 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 0.25 + index * 0.12, duration: 0.8, ease: "easeOut" }}
    >
      <motion.g
        animate={{ rotate: isActive ? 360 : 0 }}
        transition={{ duration: isActive ? 18 : 0, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={isActive ? 78 : 64}
          fill="rgba(94,234,212,.035)"
          stroke="rgba(94,234,212,.55)"
          strokeWidth="1.4"
          filter="url(#mapGlow)"
        />

        <ellipse
          cx={cx}
          cy={cy}
          rx={isActive ? 76 : 62}
          ry={isActive ? 27 : 22}
          fill="none"
          stroke="rgba(94,234,212,.46)"
          strokeWidth="1"
        />

        <ellipse
          cx={cx}
          cy={cy}
          rx={isActive ? 27 : 22}
          ry={isActive ? 76 : 62}
          fill="none"
          stroke="rgba(94,234,212,.38)"
          strokeWidth="1"
        />

        <polygon
          points={`${cx},${cy - 70} ${cx + 60},${cy - 35} ${cx + 60},${cy + 35} ${cx},${cy + 70} ${cx - 60},${cy + 35} ${cx - 60},${cy - 35}`}
          fill={isActive ? "rgba(94,234,212,.11)" : "rgba(8,20,20,.32)"}
          stroke="rgba(94,234,212,.8)"
          strokeWidth="1.8"
          filter="url(#mapGlow)"
        />

        <polygon
          points={`${cx},${cy - 48} ${cx + 42},${cy - 24} ${cx + 42},${cy + 24} ${cx},${cy + 48} ${cx - 42},${cy + 24} ${cx - 42},${cy - 24}`}
          fill="none"
          stroke="rgba(255,255,255,.22)"
          strokeWidth="1"
        />

        <line x1={cx - 60} y1={cy - 35} x2={cx + 60} y2={cy + 35} stroke="rgba(94,234,212,.28)" />
        <line x1={cx + 60} y1={cy - 35} x2={cx - 60} y2={cy + 35} stroke="rgba(94,234,212,.28)" />
        <line x1={cx} y1={cy - 70} x2={cx} y2={cy + 70} stroke="rgba(94,234,212,.25)" />
      </motion.g>

      <circle
        cx={cx}
        cy={cy}
        r={isActive ? 8 : 5}
        fill="rgb(94,234,212)"
        filter="url(#mapGlow)"
      />

      <text
        x={cx}
        y={cy + 100}
        textAnchor="middle"
        fill="rgba(255,255,255,.78)"
        fontSize="14"
        fontWeight="700"
      >
        {node.label.replace("Arkhe ", "")}
      </text>
    </motion.g>
  );
}

export default function VentureGeomMap() {
  const [active, setActive] = useState(ventures[0]);
  const point = (id: string) => ventures.find((v) => v.id === id)!;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="mx-auto mb-20 max-w-6xl px-6"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-teal-300/20 bg-black/40 p-6 shadow-[0_0_80px_rgba(45,255,220,0.16)]">
        <div className="mb-6">
          <p className="text-sm font-semibold tracking-[0.35em] text-teal-300">
            ARKHE VENTURE MAP
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white">
            Interlinked Venture Geometry
          </h2>
          <p className="mt-3 max-w-3xl text-white/60">
            Every venture is Arkhe branded, connected to the parent structure, and designed as part of one operating system.
          </p>
        </div>

        <div className="relative h-[650px] overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(45,255,220,0.22),transparent_46%)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(94,234,212,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(94,234,212,.05)_1px,transparent_1px)] bg-[size:48px_48px]" />

          <svg className="absolute inset-0 h-full w-full">
            <defs>
              <filter id="mapGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {links.map(([a, b], i) => {
              const p1 = point(a);
              const p2 = point(b);
              return (
                <motion.line
                  key={`${a}-${b}`}
                  x1={`${p1.x}%`}
                  y1={`${p1.y}%`}
                  x2={`${p2.x}%`}
                  y2={`${p2.y}%`}
                  stroke="rgba(94,234,212,.36)"
                  strokeWidth="1.4"
                  filter="url(#mapGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.45 + i * 0.08, duration: 0.9 }}
                />
              );
            })}

            {ventures.map((node, i) => (
              <WireGeom
                key={node.id}
                node={node}
                index={i}
                active={active}
                setActive={setActive}
              />
            ))}
          </svg>

          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute w-[390px] rounded-3xl border border-teal-300/30 bg-black/80 p-6 shadow-[0_0_50px_rgba(45,255,220,0.30)] backdrop-blur-xl"
            style={{
              left: active.x > 60 ? "7%" : active.x < 30 ? "50%" : "34%",
              top: active.y > 55 ? "9%" : "52%",
            }}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white">{active.label}</h3>
                <p className="mt-1 text-sm font-semibold text-teal-300">
                  {active.type}
                </p>
              </div>
              <span className="rounded-full border border-teal-300/50 px-3 py-1 text-xs font-semibold text-teal-300">
                {active.status}
              </span>
            </div>

            <p className="text-sm leading-6 text-white/70">{active.body}</p>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/60">
              {active.note}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
