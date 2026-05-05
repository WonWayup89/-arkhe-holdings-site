import Link from "next/link";
import { verticals } from "@/lib/verticals";

// Position the five vertical nodes around the central "Parent" hub.
// Order matches lib/verticals.ts: legal, technology, media, holdings, strategy.
const NODE_POSITIONS = [
  "left-[8%] top-[42%]",                  // legal
  "left-[27%] top-[18%]",                 // technology
  "right-[27%] top-[18%]",                // media
  "right-[8%] top-[42%]",                 // holdings
  "left-1/2 bottom-[8%] -translate-x-1/2", // strategy
] as const;

export default function SystemDiagram() {
  return (
    <section className="my-20 overflow-hidden rounded-[2rem] border border-teal-300/20 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.18),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-8 shadow-[0_0_80px_rgba(45,212,191,0.12)]">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-300">
          Operating Structure
        </p>
        <h2 className="mt-3 text-4xl font-bold">One Framework. Multiple Systems.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/60">
          Arkhe Holdings is designed as a connected structure where each vertical supports the others.
        </p>
      </div>

      <div className="relative mx-auto h-[520px] max-w-5xl rounded-[2rem] border border-white/10 bg-black/25">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 520" preserveAspectRatio="none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <line x1="500" y1="260" x2="120" y2="220" stroke="rgba(45,212,191,.45)" strokeWidth="2" filter="url(#glow)" />
          <line x1="500" y1="260" x2="300" y2="95" stroke="rgba(45,212,191,.45)" strokeWidth="2" filter="url(#glow)" />
          <line x1="500" y1="260" x2="700" y2="95" stroke="rgba(45,212,191,.45)" strokeWidth="2" filter="url(#glow)" />
          <line x1="500" y1="260" x2="880" y2="220" stroke="rgba(45,212,191,.45)" strokeWidth="2" filter="url(#glow)" />
          <line x1="500" y1="260" x2="500" y2="445" stroke="rgba(45,212,191,.45)" strokeWidth="2" filter="url(#glow)" />

          <circle cx="500" cy="260" r="92" fill="rgba(20,184,166,.08)" stroke="rgba(94,234,212,.55)" strokeWidth="2" filter="url(#glow)" />
          <circle cx="500" cy="260" r="145" fill="none" stroke="rgba(94,234,212,.18)" strokeWidth="1" />
          <circle cx="500" cy="260" r="205" fill="none" stroke="rgba(94,234,212,.12)" strokeWidth="1" />
        </svg>

        <div className="absolute left-1/2 top-1/2 z-10 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-teal-300/50 bg-[#061a1c] text-center shadow-[0_0_70px_rgba(45,212,191,0.35)]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-teal-300">Parent</p>
            <h3 className="mt-2 text-xl font-bold">Arkhe Holdings</h3>
          </div>
        </div>

        {verticals.map((node, i) => (
          <Link
            key={node.id}
            href={node.href}
            className={`absolute ${NODE_POSITIONS[i]} z-10 rounded-2xl border border-teal-300/30 bg-black/60 px-5 py-4 text-center shadow-[0_0_35px_rgba(45,212,191,0.16)] backdrop-blur transition hover:border-teal-300/70 hover:bg-black/80 hover:shadow-[0_0_55px_rgba(45,212,191,0.32)]`}
          >
            <p className="text-sm font-semibold text-white">
              {node.shortTitle ?? node.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
