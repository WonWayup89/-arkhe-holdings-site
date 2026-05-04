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
    y: 16,
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
    y: 76,
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
    y: 76,
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
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mb-6"
        >
          <p className="text-sm font-semibold tracking-[0.35em] text-teal-300">
            ARKHE VENTURE MAP
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white">
            Interlinked Venture Geometry
          </h2>
          <p className="mt-3 max-w-3xl text-white/60">
            Every venture is Arkhe branded, connected to the parent structure, and designed as part of one operating system.
          </p>
        </motion.div>

        <div className="relative h-[600px] overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(45,255,220,0.20),transparent_44%)]">
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

              <linearGradient id="nodeFace" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(94,234,212,.42)" />
                <stop offset="50%" stopColor="rgba(8,20,20,.95)" />
                <stop offset="100%" stopColor="rgba(94,234,212,.18)" />
              </linearGradient>
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
                  stroke="rgba(94,234,212,.38)"
                  strokeWidth="1.5"
                  filter="url(#mapGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.45 + i * 0.08, duration: 0.9 }}
                />
              );
            })}

            {ventures.map((node, i) => (
              <motion.g
                key={node.id}
                onMouseEnter={() => setActive(node)}
                className="cursor-pointer"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + i * 0.12, duration: 0.55 }}
              >
                <polygon
                  points="-44,-26 0,-50 44,-26 44,26 0,50 -44,26"
                  transform={`translate(${node.x * 10.8}, ${node.y * 5.9})`}
                  fill="rgba(94,234,212,.08)"
                  stroke="rgba(94,234,212,.22)"
                  strokeWidth="8"
                  filter="url(#mapGlow)"
                />

                <polygon
                  points="-36,-22 0,-42 36,-22 36,22 0,42 -36,22"
                  transform={`translate(${node.x * 10.8}, ${node.y * 5.9})`}
                  fill={active.id === node.id ? "url(#nodeFace)" : "rgba(8,20,20,.88)"}
                  stroke="rgba(94,234,212,.9)"
                  strokeWidth="2"
                  filter="url(#mapGlow)"
                />

                <polygon
                  points="-22,-13 0,-26 22,-13 22,13 0,26 -22,13"
                  transform={`translate(${node.x * 10.8}, ${node.y * 5.9})`}
                  fill="rgba(255,255,255,.04)"
                  stroke="rgba(255,255,255,.22)"
                  strokeWidth="1"
                />

                <circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={active.id === node.id ? 8 : 5}
                  fill="rgb(94,234,212)"
                  filter="url(#mapGlow)"
                />
              </motion.g>
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
