import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function MediaPage() {
  return (
    <main className="min-h-screen px-6 py-8 text-white">
      <section className="mx-auto max-w-4xl">
        <SiteNav />

        <p className="mt-6 text-sm uppercase tracking-[0.35em] text-teal-300">
          Vertical
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <h1 className="text-5xl font-bold">Media &amp; Community</h1>
          <span className="rounded-full border border-teal-300/40 bg-teal-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-teal-300">
            Planned
          </span>
        </div>

        <p className="mt-4 text-xl text-white/70">
          Audience-first platforms and content ecosystems designed for long-term community ownership.
        </p>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-white/75">
          <p>
            The Media and Community vertical is built on a simple observation: the most durable businesses of the next decade will be the ones that own their audience. Not rent it through an algorithm, not borrow it from a platform, but own it through consistent trust, genuine value, and direct relationship.
          </p>

          <p>
            Arkhe&rsquo;s approach to media is structural rather than reactive. The goal is not to produce content for its own sake, but to build platforms and communities around specific domains where Arkhe already operates — law, technology, entrepreneurship, and long-term thinking. Each media property is designed to have an independent identity and value proposition while feeding back into the broader Arkhe ecosystem.
          </p>

          <p>
            This vertical also includes educational content development. Brian Salsbury&rsquo;s background as an Academic Advisor at Crestpoint University provides direct insight into how people learn, where educational systems fall short, and what independent learners actually need. That perspective informs how Arkhe designs content experiences — practical, structured, and built around outcomes rather than engagement metrics.
          </p>

          <p>
            The longer-term vision for this vertical includes digital communities organized around professional development themes, newsletter properties, and audio or video formats that translate complex subjects into actionable frameworks. Each property is evaluated on its ability to build a direct relationship with a specific audience rather than on short-term traffic or virality.
          </p>

          <p className="text-white">
            Attention is not the goal. Trust is. Communities built on trust become assets. Assets compound.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-widest text-teal-300">Current Focus</p>
          <ul className="mt-4 space-y-2 text-white/65">
            <li>— Domain and brand acquisition for future media properties</li>
            <li>— Content strategy framework for Arkhe-adjacent topics</li>
            <li>— Newsletter and direct audience development planning</li>
            <li>— Educational content architecture for professional skill areas</li>
          </ul>
        </div>

        <a
          href="/system"
          className="mt-12 inline-block text-sm text-white/50 hover:text-teal-300 transition-colors"
        >
          ← All Verticals
        </a>
      </section>
      <div className="mx-auto max-w-4xl px-6">
        <SiteFooter />
      </div>
    </main>
  );
}
