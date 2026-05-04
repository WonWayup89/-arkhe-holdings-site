import Link from "next/link";

export default function TechnologyPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24 text-white">
      <p className="mb-3 text-sm font-semibold tracking-[0.35em] text-teal-300">
        VERTICAL
      </p>

      <h1 className="mb-4 text-5xl font-bold">
        Technology <span className="rounded-full border border-teal-400 px-3 py-1 text-sm text-teal-300">ACTIVE</span>
      </h1>

      <p className="mb-12 text-xl text-white/70">
        Applied intelligence and automation systems built for real operational problems.
      </p>

      <section className="space-y-8 text-lg leading-8 text-white/75">
        <p>
          Arkhe&apos;s Technology and AI vertical is the most active development lane within the holding structure. It includes internal platforms, automation tools, AI-assisted workflows, research systems, and software products being built under the Arkhe umbrella.
        </p>

        <p>
          Founder Brian Salsbury taught himself Python independently, then extended that foundation into AI tooling, workflow automation, and systems design. The work is practical by nature. The goal is not to build technology for its own sake, but to identify operational problems and engineer durable solutions.
        </p>

        <p>
          Every internal system is treated as a prototype for a larger product. If a tool solves a real Arkhe problem, it becomes a candidate for external development. This creates a disciplined product pipeline where software is tested in real operations before being positioned for broader use.
        </p>

        <p>
          The current focus is AI-augmented workflow design: document generation, research automation, task routing, data organization, calendar intelligence, and local-first personal operating systems. These systems are designed to reduce friction between decision and execution.
        </p>

        <p className="font-semibold text-white">
          Technology is not the product. Leverage is. Every tool built here is designed to multiply the output of every other vertical.
        </p>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="mb-4 text-2xl font-bold">System Categories</h2>
          <ul className="space-y-3 text-white/70">
            <li>AI-assisted document and research workflows</li>
            <li>Calendar, task, and planning automation</li>
            <li>Internal dashboards and operating systems</li>
            <li>Data pipelines and knowledge indexing</li>
            <li>Local-first and offline-capable tools</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="mb-4 text-2xl font-bold">Product Pipeline</h2>
          <ul className="space-y-3 text-white/70">
            <li>Alfred law school operating system</li>
            <li>Founder workflow and venture planning tools</li>
            <li>Legal research support systems</li>
            <li>AI agents for structured task execution</li>
            <li>Future public SaaS products under Arkhe</li>
          </ul>
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-teal-400/30 bg-teal-400/[0.06] p-8">
        <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-teal-300">
          CURRENT FOCUS
        </p>
        <ul className="space-y-3 text-white/75">
          <li>— Internal automation systems and AI-augmented workflows</li>
          <li>— Python tooling for document generation and research pipelines</li>
          <li>— Software product development pipeline</li>
          <li>— AI integration architecture for cross-vertical use</li>
          <li>— Local-first assistant systems for planning and execution</li>
        </ul>
      </section>

      <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.04] p-8">
        <h2 className="mb-4 text-2xl font-bold">Operating Thesis</h2>
        <p className="text-white/70">
          Arkhe builds technology the same way it builds companies: structured, modular, and designed for long-term control. Tools should reduce dependence, increase clarity, and create repeatable systems that can be transferred across ventures.
        </p>
      </section>

      <div className="mt-12">
        <Link href="/verticals" className="text-white/60 hover:text-teal-300">
          ← All Verticals
        </Link>
      </div>
    </main>
  );
}
