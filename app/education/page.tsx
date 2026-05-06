import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import EducationAccordion from "@/components/EducationAccordion";
import EducationConstellation from "@/components/EducationConstellation";
import { getCategories, getStats } from "@/lib/education";

export const metadata: Metadata = {
  title: "Arkhe Education",
  description:
    "Arkhe Education is the institutional knowledge layer of the Arkhe ecosystem — a structured library covering macro, markets, crypto, risk, strategy, and the systems that connect them.",
};

export default function EducationPage() {
  const categories = getCategories();
  const { categoryCount, itemCount } = getStats();

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <section className="relative mx-auto max-w-7xl px-5 py-6 sm:px-8">
        <SiteNav />

        {/* ---------- Hero --------------------------------------------------- */}
        <section className="relative overflow-hidden rounded-[2rem] border border-teal-300/25 bg-[radial-gradient(circle_at_50%_42%,rgba(20,184,166,0.30),transparent_42%),radial-gradient(circle_at_top,rgba(94,234,212,0.14),transparent_50%),linear-gradient(180deg,#0a0f15,#04070a)] px-6 pb-16 pt-24 text-center shadow-[0_0_120px_rgba(45,212,191,0.18)] sm:px-10">
          <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-400/20 blur-3xl" />

          <div className="relative mx-auto max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.55em] text-teal-300 drop-shadow-[0_0_14px_rgba(45,212,191,0.65)] sm:text-sm">
              Arkhe Education
            </p>

            <h1 className="text-5xl font-bold tracking-tight drop-shadow-[0_0_32px_rgba(255,255,255,0.22)] sm:text-6xl md:text-7xl">
              The Institutional Knowledge Layer
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/75 sm:text-xl">
              A structured library of how markets actually work — built the way
              an institutional research desk would build it, then made navigable
              for anyone serious enough to study it.
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/55">
              Macro, markets, crypto, risk, strategy, and the Arkhe systems
              that connect them — every concept tied to every other concept it
              actually depends on.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-white/55">
              <span className="rounded-full border border-teal-300/30 bg-teal-400/10 px-4 py-1.5 text-teal-200">
                {categoryCount} categories
              </span>
              <span className="rounded-full border border-teal-300/30 bg-teal-400/10 px-4 py-1.5 text-teal-200">
                {itemCount} modules
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-white/65">
                Beginner → Intermediate → Advanced
              </span>
            </div>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="#crypto"
                className="rounded-xl bg-teal-300 px-6 py-3 font-semibold text-black shadow-[0_0_35px_rgba(45,212,191,0.25)] hover:bg-teal-200"
              >
                Start with Crypto
              </Link>
              <Link
                href="#macro"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white hover:border-teal-300/40 hover:bg-teal-400/10"
              >
                Or Macro
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- Knowledge graph constellation ------------------------- */}
        <EducationConstellation />

        {/* ---------- Three pillars ----------------------------------------- */}
        <section className="mt-16">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">
              How Arkhe Education is Organized
            </p>
            <h2 className="mt-3 text-3xl font-bold">Three layers, one map</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <Pillar
              title="Foundations & Concepts"
              body="Asset classes, market structure, statistics, fundamentals — the base layer every other layer depends on."
            />
            <Pillar
              title="Applied Markets"
              body="Crypto, macro, strategies, risk management, execution — the working knowledge of how capital actually moves."
            />
            <Pillar
              title="Arkhe Systems"
              body="The internal engine: the agents, the doctrine, the regime detection — how Arkhe Market reasons about all of the above."
            />
          </div>
        </section>

        {/* ---------- Browse by category ------------------------------------ */}
        <section className="mt-16">
          <div className="mb-2">
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">
              Browse by category
            </p>
            <h2 className="mt-3 text-3xl font-bold">Explore the library</h2>
            <p className="mt-3 max-w-2xl text-white/60">
              Click a category to expand it. Click any module to open the full
              Beginner → Intermediate → Advanced breakdown.
            </p>
          </div>

          <EducationAccordion categories={categories} />
        </section>

        <SiteFooter />
      </section>
    </main>
  );
}

function Pillar({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_45px_rgba(255,255,255,0.03)]">
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-teal-300/40 bg-teal-400/10 text-teal-200">
        ◈
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/65">{body}</p>
    </div>
  );
}
