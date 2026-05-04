"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const ventures = [
  {
    id: "ai",
    label: "Arkhe AI Systems",
    type: "Technology / AI",
    status: "In Development",
    x: 52,
    y: 26,
    size: 150,
    body:
      "Focused on applied AI, automation workflows, research assistants, decision support tools, and internal operating systems.",
    note: "Currently building internal tooling and proof of concept automation systems.",
  },
  {
    id: "legal",
    label: "Arkhe Legal",
    type: "Legal Infrastructure",
    status: "Forming",
    x: 23,
    y: 42,
    size: 135,
    body:
      "Entity structure, contracts, governance, intellectual property planning, compliance protocols, and legal architecture.",
    note: "Future legal services only through properly licensed channels.",
  },
  {
    id: "media",
    label: "Arkhe Media",
    type: "Media / Publishing",
    status: "Planned",
    x: 78,
    y: 38,
    size: 165,
    body:
      "Publishing, education, founder notes, technical breakdowns, and public communication for the Arkhe ecosystem.",
    note: "Launch planned after core infrastructure is established.",
  },
  {
    id: "anon",
    label: "Arkhe ANON Network",
    type: "Privacy / Community",
    status: "Concept",
    x: 34,
    y: 73,
    size: 120,
    body:
      "Privacy focused digital infrastructure for anonymous identity, secure communication, and community design.",
    note: "Architecture and community model under active design.",
  },
  {
    id: "holdings",
    label: "Arkhe Holdings",
    type: "Parent Structure",
    status: "Core",
    x: 68,
    y: 74,
    size: 135,
    body:
      "The parent framework connecting legal, technical, media, and strategic systems under one disciplined holding structure.",
    note: "Built for long term control, scalability, and venture formation.",
  },
];

const links = [
  ["ai", "legal"],
  ["ai", "media"],
  ["ai", "holdings"],
  ["legal", "anon"],
  ["legal", "holdings"],
  ["media", "holdings"],
  ["anon", "holdings"],
];

function WireOrb({ node, active, onEnter }: any) {
  const r = node.size / 2;

  return (
    <motion.g
      onMouseEnter={onEnter}
      className="cursor-pointer"
      initial={{ opacity: 0, scale: 0.45 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      transform={`translate(${node.x * 10.8}, ${node.y * 6.2})`}
    >
      <motion.g
        animate={{ rotate: active ? 360 : 0 }}
        transition={{ duration: active ? 22 : 55, repeat: Infinity, ease: "linear" }}
      >
        <circle r={r} fill="rgba(94,234,212,.025)" stroke="rgba(94,234,212,.34)" strokeWidth="1.2" filter="url(#glow)" />
        <circle r={r * 0.72} fill="none" stroke="rgba(94,234,212,.26)" strokeWidth="1" />
        <circle r={r * 0.43} fill="none" stroke="rgba(94,234,212,.18)" strokeWidth="1" />

        <polygon
          points={`${-r * 0.78},${-r * 0.45} 0,${-r * 0.9} ${r * 0.78},${-r * 0.45} ${r * 0.78},${r * 0.45} 0,${r * 0.9} ${-r * 0.78},${r * 0.45}`}
          fill={active ? "rgba(94,234,212,.12)" : "none"}
          stroke="rgba(94,234,212,.82)"
          strokeWidth="1.5"
          filter="url(#glow)"
        />

        <polygon
          points={`${-r * 0.48},${-r * 0.28} 0,${-r * 0.56} ${r * 0.48},${-r * 0.28} ${r * 0.48},${r * 0.28} 0,${r * 0.56} ${-r * 0.48},${r * 0.28}`}
          fill="none"
          stroke="rgba(255,255,255,.22)"
          strokeWidth="1"
        />

        <line x1={-r * 0.78} y1={-r * 0.45} x2={r * 0.78} y2={r * 0.45} stroke="rgba(94,234,212,.24)" />
        <line x1={r * 0.78} y1={-r * 0.45} x2={-r * 0.78} y2={r * 0.45} stroke="rgba(94,234,212,.24)" />
        <line x1="0" y1={-r * 0.9} x2="0" y2={r * 0.9} stroke="rgba(94,234,212,.20)" />
        <line x1={-r * 0.78} y1={r * 0.45} x2={r * 0.78} y2={-r * 0.45} stroke="rgba(255,255,255,.10)" />
      </motion.g>

      <circle r={active ? 8 : 5} fill="rgb(180,255,245)" filter="url(#glow)" />
      <circle cx={-r * 0.78} cy={-r * 0.45} r="2.4" fill="rgb(180,255,245)" />
      <circle cx="0" cy={-r * 0.9} r="2.4" fill="rgb(180,255,245)" />
      <circle cx={r * 0.78} cy={-r * 0.45} r="2.4" fill="rgb(180,255,245)" />
      <circle cx={r * 0.78} cy={r * 0.45} r="2.4" fill="rgb(180,255,245)" />
      <circle cx="0" cy={r * 0.9} r="2.4" fill="rgb(180,255,245)" />
      <circle cx={-r * 0.78} cy={r * 0.45} r="2.4" fill="rgb(180,255,245)" />
    </motion.g>
  );
}

export default function VentureGeomMap() {
  const [active, setActive] = useState(ventures[0]);
  const point = (id: string) => ventures.find((v) => v.id === id)!;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9 }}
      className="mx-auto mb-24 max-w-7xl px-6"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-teal-300/20 bg-black/50 p-6 shadow-[0_0_90px_rgba(45,255,220,0.16)]">
        <div className="mb-6">
          <p className="text-sm font-semibold tracking-[0.35em] text-teal-300">
            INTERLINKED SYSTEM MAP
          </p>
          <h2 className="mt-3 text-4xl font-bold text-white">Venture Stack Interface</h2>
          <p className="mt-3 max-w-3xl text-white/60">
            Hover over each floating geometry to preview the Arkhe vertical it represents.
          </p>
        </div>

        <div className="relative h-[720px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(45,255,220,.22),transparent_45%)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(94,234,212,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(94,234,212,.045)_1px,transparent_1px)] bg-[size:52px_52px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(0,0,0,.76)_80%)]" />

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1080 720" preserveAspectRatio="none">
            <defs>
              <filter id="glow">
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
                  stroke="rgba(94,234,212,.34)"
                  strokeWidth="1.4"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.35 + i * 0.08, duration: 1.1 }}
                />
              );
            })}

            {ventures.map((node) => (
              <WireOrb
                key={node.id}
                node={node}
                active={active.id === node.id}
                onEnter={() => setActive(node)}
              />
            ))}
          </svg>

          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute z-10 w-[390px] rounded-3xl border border-teal-300/30 bg-black/75 p-6 shadow-[0_0_55px_rgba(45,255,220,0.34)] backdrop-blur-xl"
            style={{
              left: active.x > 60 ? "8%" : active.x < 35 ? "55%" : "36%",
              top: active.y > 55 ? "12%" : "54%",
            }}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white">{active.label}</h3>
                <p className="mt-1 text-sm font-semibold text-teal-300">{active.type}</p>
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
