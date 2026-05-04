"use client";

import { useState } from "react";

const nodes = [
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
    x: 18,
    y: 45,
    body:
      "Builds entity structure, contracts, compliance systems, intellectual property planning, and legal architecture for Arkhe ventures.",
    note: "Future legal services will only operate through properly licensed channels.",
  },
  {
    id: "media",
    label: "Arkhe Media",
    type: "Media / Community",
    status: "Planned",
    x: 82,
    y: 45,
    body:
      "Publishing, education, founder notes, technical breakdowns, and public communication for Arkhe projects.",
    note: "Launch planned after core infrastructure is established.",
  },
  {
    id: "anon",
    label: "ANON Network",
    type: "Privacy / Community",
    status: "Concept",
    x: 30,
    y: 76,
    body:
      "A privacy-focused digital ecosystem around anonymous identity, secure communication, and decentralized community infrastructure.",
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
      "The parent framework connecting legal, technical, media, and investment systems under one disciplined structure.",
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

export default function VentureGeomMap() {
  const [active, setActive] = useState(nodes[0]);

  const point = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <section className="mx-auto mb-20 max-w-6xl px-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-teal-300/20 bg-black/40 p-6 shadow-[0_0_60px_rgba(45,255,220,0.12)]">
        <div className="mb-6">
          <p className="text-sm font-semibold tracking-[0.35em] text-teal-300">
            INTERLINKED SYSTEM MAP
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white">
            Venture Stack Interface
          </h2>
          <p className="mt-3 max-w-3xl text-white/60">
            Hover over each geometry to preview the Arkhe vertical it represents.
          </p>
        </div>

        <div className="relative h-[560px] rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(45,255,220,0.18),transparent_45%)]">
          <svg className="absolute inset-0 h-full w-full">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {links.map(([a, b]) => {
              const p1 = point(a);
              const p2 = point(b);
              return (
                <line
                  key={`${a}-${b}`}
                  x1={`${p1.x}%`}
                  y1={`${p1.y}%`}
                  x2={`${p2.x}%`}
                  y2={`${p2.y}%`}
                  stroke="rgba(94,234,212,.35)"
                  strokeWidth="1.5"
                  filter="url(#glow)"
                />
              );
            })}

            {nodes.map((node) => (
              <g
                key={node.id}
                onMouseEnter={() => setActive(node)}
                className="cursor-pointer"
              >
                <polygon
                  points="
                    -34,-20
                    0,-39
                    34,-20
                    34,20
                    0,39
                    -34,20
                  "
                  transform={`translate(${node.x * 10.8}, ${node.y * 5.4})`}
                  fill={
                    active.id === node.id
                      ? "rgba(94,234,212,.22)"
                      : "rgba(10,20,20,.9)"
                  }
                  stroke="rgba(94,234,212,.85)"
                  strokeWidth="2"
                  filter="url(#glow)"
                />

                <circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={active.id === node.id ? 8 : 5}
                  fill="rgb(94,234,212)"
                  filter="url(#glow)"
                />
              </g>
            ))}
          </svg>

          <div
            className="absolute w-[360px] rounded-3xl border border-teal-300/30 bg-black/80 p-6 shadow-[0_0_40px_rgba(45,255,220,0.25)] backdrop-blur-xl transition-all"
            style={{
              left: active.x > 60 ? "8%" : active.x < 30 ? "48%" : "34%",
              top: active.y > 55 ? "10%" : "52%",
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
          </div>
        </div>
      </div>
    </section>
  );
}
