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
    y: 18,
    body:
      "Focused on applied AI, automation workflows, and internal operating systems. Includes research assistants, decision-support tools, and scalable automation designed to increase efficiency across all Arkhe entities.",
    note: "Currently building internal tooling and proof-of-concept automation systems.",
  },
  {
    id: "legal",
    label: "Arkhe Legal",
    type: "Legal Infrastructure",
    status: "Forming",
    x: 19,
    y: 42,
    body:
      "Entity structure, contracts, compliance systems, intellectual property planning, and legal architecture for Arkhe ventures.",
    note: "Future legal services will only operate through properly licensed channels.",
  },
  {
    id: "media",
    label: "Arkhe Media",
    type: "Media / Community",
    status: "Planned",
    x: 81,
    y: 42,
    body:
      "Publishing, education, founder notes, technical breakdowns, and public communication for the Arkhe ecosystem.",
    note: "Launch planned after core infrastructure is established.",
  },
  {
    id: "anon",
    label: "Arkhe ANON Network",
    type: "Privacy / Community",
    status: "Concept",
    x: 31,
    y: 76,
    body:
      "Privacy-focused digital infrastructure for anonymous identity, secure communication, and decentralized community design.",
    note: "Architecture and community model under active design.",
  },
  {
    id: "holdings",
    label: "Arkhe Holdings",
    type: "Parent Structure",
    status: "Core",
    x: 69,
    y: 76,
    body:
      "The parent framework connecting legal, technical, media, and strategic systems under one disciplined holding structure.",
    note: "Built for long-term control, scalability, and venture formation.",
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

function GeoOrb({
  x,
  y,
  active,
  onEnter,
}: {
  x: number;
  y: number;
  active: boolean;
  onEnter: () => void;
}) {
  return (
    <motion.g
      onMouseEnter={onEnter}
      className="cursor-pointer"
      initial={{ opacity: 0, scale: 0.65 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      transform={`translate(${x * 10.8}, ${y * 5.8})`}
    >
      <motion.g
        animate={{ rotate: active ? 360 : 0 }}
        transition={{ duration: active ? 18 : 40, repeat: Infinity, ease: "linear" }}
      >
        <circle r="74" fill="rgba(94,234,212,.035)" stroke="rgba(94,234,212,.30)" strokeWidth="1" />
        <circle r="52" fill="none" stroke="rgba(94,234,212,.28)" strokeWidth="1" />
        <circle r="30" fill="none" stroke="rgba(94,234,212,.18)" strokeWidth="1" />

        <polygon points="-56,-32 0,-64 56,-32 56,32 0,64 -56,32" fill="none" stroke="rgba(94,234,212,.72)" strokeWidth="1.5" />
        <polygon points="-38,-22 0,-44 38,-22 38,22 0,44 -38,22" fill="none" stroke="rgba(94,234,212,.42)" strokeWidth="1" />
        <polygon points="-20,-12 0,-24 20,-12 20,12 0,24 -20,12" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="1" />

        <line x1="-56" y1="-32" x2="56" y2="32" stroke="rgba(94,234,212,.24)" />
        <line x1="56" y1="-32" x2="-56" y2="32" stroke="rgba(94,234,212,.24)" />
        <line x1="0" y1="-64" x2="0" y2="64" stroke="rgba(94,234,212,.22)" />
        <line x1="-56" y1="32" x2="56" y2="-32" stroke="rgba(255,255,255,.10)" />
        <line x1="-38" y1="-22" x2="38" y2="22" stroke="rgba(255,255,255,.10)" />
      </motion.g>

      <circle r={active ? 8 : 5} fill="rgb(180,255,245)" filter="url(#mapGlow)" />
      <circle cx="-56" cy="-32" r="2.4" fill="rgb(180,255,245)" />
      <circle cx="0" cy="-64" r="2.4" fill="rgb(180,255,245)" />
      <circle cx="56" cy="-32" r="2.4" fill="rgb(180,255,245)" />
      <circle cx="56" cy="32" r="2.4" fill="rgb(180,255,245)" />
      <circle cx="0" cy="64" r="2.4" fill="rgb(180,255,245)" />
      <circle cx="-56" cy="32" r="2.4" fill="rgb(180,255,245)" />

      {active && (
        <circle r="86" fill="none" stroke="rgba(94,234,212,.42)" strokeWidth="1" filter="url(#mapGlow)" />
      )}
    </motion.g>
  );
}

export default function VentureGeomMap() {
  const [active, setActive] = useState(ventures[0]);
  const point = (id: string) => ventures.find((v) => v.id === id)!;

  return (
    <motion.section
      initial={{ opacity: 0, y: 45, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="mx-auto mb-24 max-w-7xl px-6"
    >
      <div className="relative overflow-hidden rounded-[2.25rem] border border-teal-300/20 bg-black/50 p-6 shadow-[0_0_90px_rgba(45,255,220,0.16)]">
        <div className="mb-6">
          <p className="text-sm font-semibold tracking-[0.35em] text-teal-300">
            INTERLINKED SYSTEM MAP
          </p>
          <h2 className="mt-3 text-4xl font-bold text-white">Venture Stack Interface</h2>
          <p className="mt-3 max-w-3xl text-white/60">
            Hover over each geometry to preview the Arkhe vertical it represents.
          </p>
        </div>

        <div className="relative h-[650px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(45,255,220,0.22),transparent_43%)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(94,234,212,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(94,234,212,.05)_1px,transparent_1px)] bg-[size:52px_52px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,.70)_78%)]" />

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1080 650" preserveAspectRatio="none">
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
                  stroke="rgba(94,234,212,.34)"
                  strokeWidth="1.6"
                  filter="url(#mapGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.35 + i * 0.09, duration: 1.1 }}
                />
              );
            })}

            {ventures.map((node) => (
              <GeoOrb
                key={node.id}
                x={node.x}
                y={node.y}
                active={active.id === node.id}
                onEnter={() => setActive(node)}
              />
            ))}
          </svg>

          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute left-1/2 top-1/2 z-10 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-teal-300/30 bg-black/75 p-6 shadow-[0_0_55px_rgba(45,255,220,0.34)] backdrop-blur-xl"
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
