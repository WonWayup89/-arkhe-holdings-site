import SiteNav from "@/components/SiteNav";

export default function StrategyPage() {
  return (
    <main className="min-h-screen bg-[#05070a] px-6 py-8 text-white">
      <section className="mx-auto max-w-4xl">
        <SiteNav />

        <p className="mt-6 text-sm uppercase tracking-[0.35em] text-teal-300">
          Vertical
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <h1 className="text-5xl font-bold">Consulting &amp; Strategy</h1>
          <span className="rounded-full border border-teal-300/40 bg-teal-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-teal-300">
            Forming
          </span>
        </div>

        <p className="mt-4 text-xl text-white/70">
          Strategic support for founders and operators who need structure, not just advice.
        </p>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-white/75">
          <p>
            Most consulting relationships fail for the same reason: the advice is disconnected from execution. A strategy that cannot be implemented is not a strategy — it is a document. Arkhe's Consulting and Strategy vertical is built to bridge that gap, bringing together legal awareness, technical capability, and operational discipline into engagements that produce real structural change.
          </p>

          <p>
            Brian Salsbury's background spans law school, academic advising, self-taught software development, and the construction of a multi-vertical holding company from the ground up. That combination produces a perspective that is rare in traditional consulting: someone who understands both the legal architecture that governs a business and the technical systems that operate it, and who has actually built those things rather than advised on them theoretically.
          </p>

          <p>
            The strategy practice focuses on early and growth-stage ventures that are navigating structural complexity — entity design, operational workflow, team systems, and the decisions that determine whether a company scales cleanly or becomes progressively harder to manage. Engagements are project-scoped rather than retainer-dependent, with a clear deliverable at every stage.
          </p>

          <p>
            Particular areas of strength include business architecture for new ventures, systems design for operators transitioning from solo to team-based execution, workflow automation planning, and the intersection of legal compliance with day-to-day operational decisions. Arkhe does not offer generic frameworks. Every engagement is built around the specific constraints and goals of the operator involved.
          </p>

          <p className="text-white">
            The best strategy is one that survives contact with reality. Arkhe builds for that.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-widest text-teal-300">Current Focus</p>
          <ul className="mt-4 space-y-2 text-white/65">
            <li>— Business architecture consulting for early-stage ventures</li>
            <li>— Operational workflow design and systems planning</li>
            <li>— Venture structure review and entity design advisory</li>
            <li>— AI and automation integration strategy for small operators</li>
          </ul>
        </div>

        <a
          href="/contact"
          className="mt-10 inline-block rounded-xl bg-teal-300 px-6 py-3 font-semibold text-black hover:bg-teal-200"
        >
          Inquire About Working Together
        </a>

        <div className="mt-6">
          <a
            href="/verticals"
            className="inline-block text-sm text-white/50 hover:text-teal-300 transition-colors"
          >
            ← All Verticals
          </a>
        </div>
      </section>
    </main>
  );
}
