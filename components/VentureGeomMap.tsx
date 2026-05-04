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
    y: 24,
    body: "Applied AI, automation workflows, research assistants, decision support tools, and internal operating systems.",
    note: "Currently building internal tooling and proof of concept automation systems.",
  },
  {
    id: "legal",
    label: "Arkhe Legal",
    type: "Legal Infrastructure",
    status: "Forming",
    x: 22,
    y: 43,
    body: "Entity structure, contracts, governance, intellectual property planning, and compliance architecture.",
    note: "Future legal services only through properly licensed channels.",
  },
  {
    id: "media",
    label: "Arkhe Media",
    type: "Media / Publishing",
    status: "Planned",
    x: 78,
    y: 43,
    body: "Publishing, education, founder notes, technical breakdowns, and public communication.",
    note: "Launch planned after core infrastructure is established.",
  },
  {
    id: "anon",
    label: "Arkhe ANON Network",
    type: "Privacy / Community",
    status: "Concept",
    x: 34,
    y: 74,
    body: "Privacy focused digital infrastructure for anonymous identity and secure communication.",
    note: "Architecture and community model under active design.",
  },
  {
    id: "holdings",
    label: "Arkhe Holdings",
    type: "Parent Structure",
    status: "Core",
    x: 68,
    y: 74,
    body: "The parent framework connecting legal, technical, media, and strategic systems.",
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

function point(id: string) {
  return ventures.find((v) => v.id === id)!;
}

function Geom({ node, active, onEnter }: any) {
  return (
    <motion.g
      onMouseEnter={onEnter}
      className="cursor-pointer"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: 1,
        scale: active ? 1.12 : 1,
        y: [0, -6, 0],
      }}
      transition={{
        opacity: { duration: 0.5 },
        scale: { duration: 0.25 },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
      transform={`translate(${node.x * 10.8}, ${node.y * 6.4})`}
    >
      <circle r="74" fill="rgba(45,255,220,0.055)" stroke="rgba(94,234,212,0.22)" />
      <circle r="51" fill="none" stroke="rgba(94,234,212,0.20)" />
      <circle r="31" fill="none" stroke="rgba(94,234,212,0.14)" />

      <polygon
        points="-56,-32 0,-64 56,-32 56,32 0,64 -56,32"
        fill={active ? "rgba(94,234,212,0.13)" : "rgba(0,0,0,0.22)"}
        stroke="rgba(94,234,212,0.78)"
        strokeWidth="1.5"
      />
      <polygon
        points="-34,-20 0,-39 34,-20 34,20 0,39 -34,20"
        fill="none"
        stroke="rgba(255,255,255,0.20)"
        strokeWidth="1"
      />

      <line x1="-56" y1="-32" x2="56" y2="32" stroke="rgba(94,234,212,0.22)" />
      <line x1="56" y1="-32" x2="-56" y2="32" stroke="rgba(94,234,212,0.22)" />
      <line x1="0" y1="-64" x2="0" y2="64" stroke="rgba(94,234,212,0.18)" />

      <circle
        r={active ? 8 : 5}
        fill="rgb(180,255,245)"
        style={{ filter: "drop-shadow(0 0 10px rgba(45,255,220,0.9))" }}
      />
    </motion.g>
  );
}

export default function VentureGeomMap() {
  const [active, setActive] = useState(ventures[0]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 45 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mx-auto mb-24 max-w-7xl px-6"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-teal-300/20 bg-black/50 p-6 shadow-[0_0_90px_rgba(45,255,220,0.16)]">
        <div className="mb-6">
          <p className="text-sm font-semibold tracking-[0.35em] text-teal-300">INTERLINKED SYSTEM MAP</p>
          <h2 className="mt-3 text-4xl font-bold text-white">Venture Stack Interface</h2>
          <p className="mt-3 max-w-3xl text-white/60">
            Hover over each floating geometry to preview the Arkhe vertical it represents.
          </p>
        </div>

        <div className="relative h-[700px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(45,255,220,.22),transparent_45%)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(94,234,212,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(94,234,212,.045)_1px,transparent_1px)] bg-[size:52px_52px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(0,0,0,.78)_82%)]" />

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1080 700" preserveAspectRatio="none">
            {links.map(([a, b], i) => {
              const p1 = point(a);
              const p2 = point(b);
              const x1 = p1.x * 10.8;
              const y1 = p1.y * 6.4;
              const x2 = p2.x * 10.8;
              const y2 = p2.y * 6.4;
              return (
                <motion.path
                  key={`${a}-${b}`}
                  d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 - 60}, ${x2} ${y2}`}
                  stroke="rgba(94,234,212,0.42)"
                  strokeWidth="1.4"
                  fill="none"
                  style={{ filter: "drop-shadow(0 0 7px rgba(45,255,220,0.45))" }}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 1.1 }}
                />
              );
            })}

            {ventures.map((node) => (
              <Geom
                key={node.id}
                node={node}
                active={active.id === node.id}
                onEnter={() => setActive(node)}
              />
            ))}
          </svg>

          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute z-10 w-[340px] rounded-2xl border border-teal-300/20 bg-black/50 p-6 shadow-[0_0_40px_rgba(45,255,220,0.25)] backdrop-blur-xl"
            style={{
              left: active.x > 60 ? "9%" : active.x < 35 ? "56%" : "37%",
              top: active.y > 55 ? "13%" : "54%",
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
