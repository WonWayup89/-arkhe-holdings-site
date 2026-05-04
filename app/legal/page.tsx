import SiteNav from "@/components/SiteNav";

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#05070a] px-6 py-8 text-white">
      <section className="mx-auto max-w-4xl">
        <SiteNav />

        <p className="mt-6 text-sm uppercase tracking-[0.35em] text-teal-300">
          Vertical
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <h1 className="text-5xl font-bold">Legal</h1>
          <span className="rounded-full border border-teal-300/40 bg-teal-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-teal-300">
            Forming
          </span>
        </div>

        <p className="mt-4 text-xl text-white/70">
          Building the legal infrastructure that every serious venture requires from day one.
        </p>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-white/75">
          <p>
            Most founders treat legal as an afterthought. They form entities late, structure deals informally, and discover the cost of that decision only when something goes wrong. Arkhe Holdings was designed from the beginning to take the opposite approach — legal structure is not overhead, it is architecture.
          </p>

          <p>
            The Legal vertical exists to develop the internal frameworks, compliance protocols, and contractual foundations that protect every venture under the Arkhe umbrella. That means entity structuring, intellectual property registration, operating agreements, and a working understanding of the regulatory environment before problems arise — not after.
          </p>

          <p>
            Founder Brian Salsbury is a law student at Purdue University Global Law School, where his studies focus on contracts, legal systems, and institutional structure. That academic foundation informs how Arkhe thinks about legal risk — not as a compliance checkbox, but as a competitive advantage. Well-structured entities attract better partners, cleaner deals, and longer-term stability.
          </p>

          <p>
            The Legal vertical also serves as a research arm for legal technology. The intersection of law and automation is still early-stage, and there is meaningful opportunity in tools that help individuals and small operators navigate legal complexity without requiring expensive counsel for every decision. Arkhe is watching this space carefully.
          </p>

          <p className="text-white">
            No legal services are offered through this vertical. Any future legal services will be provided only through a properly licensed law practice in full compliance with applicable professional responsibility rules.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-widest text-teal-300">Current Focus</p>
          <ul className="mt-4 space-y-2 text-white/65">
            <li>— Entity formation and operating structure for Arkhe Holdings</li>
            <li>— Intellectual property documentation and registration</li>
            <li>— Contract templates for venture partnerships</li>
            <li>— Legal technology research and tool development</li>
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
