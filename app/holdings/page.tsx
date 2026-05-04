import SiteNav from "@/components/SiteNav";

export default function HoldingsPage() {
  return (
    <main className="min-h-screen bg-[#05070a] px-6 py-8 text-white">
      <section className="mx-auto max-w-4xl">
        <SiteNav />

        <p className="mt-6 text-sm uppercase tracking-[0.35em] text-teal-300">
          Vertical
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <h1 className="text-5xl font-bold">Investments &amp; Holdings</h1>
          <span className="rounded-full border border-teal-300/40 bg-teal-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-teal-300">
            Active
          </span>
        </div>

        <p className="mt-4 text-xl text-white/70">
          Long-term ownership of assets, intellectual property, and operating companies under one disciplined structure.
        </p>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-white/75">
          <p>
            Arkhe Holdings exists because of a fundamental belief: ownership compounds, and renting does not. Every venture, every tool, every platform, and every relationship built inside the Arkhe structure is designed to generate lasting equity — not short-term returns that evaporate when market conditions shift.
          </p>

          <p>
            The Investments and Holdings vertical is the backbone of that philosophy. It is the mechanism through which Arkhe accumulates and protects the assets that all other verticals generate. Intellectual property, domain portfolios, software products, operating agreements, and equity positions in future ventures all flow through this vertical and are held with long-term intent.
          </p>

          <p>
            Capital allocation within Arkhe is governed by a simple framework: durability over velocity. An asset is worth acquiring if it will be more valuable in five to ten years than it is today, and if it can be protected within a proper legal and structural wrapper. Speculative positions, trend-driven investments, and assets without defensible moats do not meet that standard.
          </p>

          <p>
            As the holding structure matures, this vertical will expand to include minority and majority equity positions in external operating companies — particularly those that align with Arkhe's existing domain expertise in law, technology, and media. The evaluation criteria will remain consistent: durable business model, aligned founder values, and strategic fit within the broader portfolio.
          </p>

          <p className="text-white">
            Every asset held here represents a decision to build rather than borrow, own rather than access, and compound rather than consume.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-widest text-teal-300">Current Focus</p>
          <ul className="mt-4 space-y-2 text-white/65">
            <li>— Intellectual property portfolio development and registration</li>
            <li>— Domain and digital asset acquisition</li>
            <li>— Internal venture equity structuring</li>
            <li>— Criteria development for future external investment positions</li>
          </ul>
        </div>

        <a
          href="/verticals"
          className="mt-12 inline-block text-sm text-white/50 hover:text-teal-300 transition-colors"
        >
          ← All Verticals
        </a>
      </section>
    </main>
  );
}
