import SiteNav from "@/components/SiteNav";

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-[#05070a] px-6 py-8 text-white">
      <section className="mx-auto max-w-4xl">
        <SiteNav />

        <p className="mt-6 text-sm uppercase tracking-[0.35em] text-teal-300">
          Vertical
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <h1 className="text-5xl font-bold">Technology / AI</h1>
          <span className="rounded-full border border-teal-300/40 bg-teal-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-teal-300">
            In Development
          </span>
        </div>

        <p className="mt-4 text-xl text-white/70">
          Applied intelligence and automation systems built for real operational problems.
        </p>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-white/75">
          <p>
            Arkhe's Technology and AI vertical is the most active development lane within the holding structure. It encompasses every internal platform, automation tool, AI-driven workflow, and software product being built under the Arkhe umbrella — as well as future external ventures in the software and applied intelligence space.
          </p>

          <p>
            Founder Brian Salsbury taught himself Python independently, then extended that foundation into AI tooling, workflow automation, and systems design. The work is practical by nature. The goal has never been to build for its own sake, but to identify specific operational problems and engineer durable solutions to them. Every tool built internally first is a candidate to become an external product.
          </p>

          <p>
            The current focus is on AI-augmented workflows that compress the time between decision and execution. That includes internal document generation systems, research automation, data organization pipelines, and AI integration layers that connect existing platforms to more intelligent routing and output. These systems are tested inside Arkhe's own operations before being considered for external release.
          </p>

          <p>
            The broader vision for this vertical is to develop software ventures that can operate independently under the Arkhe holding structure — each with its own product, user base, and revenue model, but sharing the capital efficiency and operational discipline of the parent company.
          </p>

          <p className="text-white">
            Technology is not the product. Leverage is. Every tool built here is designed to multiply the output of every other vertical.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-widest text-teal-300">Current Focus</p>
          <ul className="mt-4 space-y-2 text-white/65">
            <li>— Internal automation systems and AI-augmented workflows</li>
            <li>— Python tooling for document generation and research pipelines</li>
            <li>— Software product development pipeline</li>
            <li>— AI integration architecture for cross-vertical use</li>
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
