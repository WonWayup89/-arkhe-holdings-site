import VentureGeomMap from "@/components/VentureGeomMap";
import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { ventures, stageBadgeClasses } from "@/lib/ventures";

export const metadata: Metadata = {
  title: "Venture System",
  description:
    "The Arkhe Holdings venture system — a coordinated framework of legal, technology, media, and investment initiatives built for long-term growth.",
};

export default function SystemPage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <section className="relative mx-auto max-w-7xl px-5 py-6 sm:px-8">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-400/20 blur-3xl" />

        <SiteNav />

        {/* Hero intro */}
        <header className="mx-auto mt-4 max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-teal-300">
            Venture Portfolio
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight drop-shadow-[0_0_32px_rgba(255,255,255,0.18)] sm:text-6xl">
            System Architecture
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            Arkhe Holdings is not a single company. It is a framework for
            building and scaling multiple ventures under one disciplined
            structure. Hover any node to see how its lane connects to the rest
            of the system.
          </p>
        </header>

        {/* Interactive venture map */}
        <div className="mt-12">
          <VentureGeomMap />
        </div>

        {/* Textual venture detail cards */}
        <section className="mx-auto mt-20 max-w-5xl">
          <div className="mb-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-teal-300">
                Detail
              </p>
              <h2 className="mt-3 text-3xl font-bold">Five Initiatives. One Structure.</h2>
            </div>
            <p className="max-w-md text-sm text-white/55">
              Each venture serves a defined role. Together, they form a
              coordinated system.
            </p>
          </div>

          <div className="space-y-5">
            {ventures.map((v) => (
              <div
                key={v.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-7 transition-colors hover:border-teal-300/30 hover:bg-white/[0.07]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">{v.name}</h3>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">
                      {v.vertical}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${stageBadgeClasses[v.stageColor]}`}
                  >
                    {v.stage}
                  </span>
                </div>

                <p className="mt-4 leading-relaxed text-white/70">
                  {v.description}
                </p>

                <div className="mt-4 rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-sm text-white/45">
                  {v.detail}
                </div>

                <div className="mt-5">
                  <Link
                    href={v.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300 transition-colors hover:text-teal-100"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <SiteFooter />
      </section>
    </main>
  );
}
