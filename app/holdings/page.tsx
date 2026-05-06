import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function HoldingsPage() {
  return (
    <main className="min-h-screen px-6 py-8 text-white">
      <section className="mx-auto max-w-4xl">
        <SiteNav />

        <p className="mt-6 text-sm uppercase tracking-[0.35em] text-teal-300">
          Vertical
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <h1 className="text-5xl font-bold">Arkhe Market</h1>
          <span className="rounded-full border border-teal-300/40 bg-teal-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-teal-300">
            In Development
          </span>
        </div>

        <p className="mt-4 text-xl text-white/70">
          An AI-driven market intelligence platform merging real-time data, swarm-based analysis, institutional-grade risk systems, and integrated financial education into a unified trading and research environment.
        </p>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-white/75">
          <p>
            Arkhe Market is being designed as both an advanced market operating system and an educational intelligence framework — a platform capable of helping users understand not only what markets are doing, but why they are behaving that way.
          </p>

          <p>
            The platform combines multi-agent AI systems, macroeconomic analysis, liquidity modeling, and educational infrastructure into a scalable environment built for traders, researchers, investors, and future autonomous financial systems. Rather than presenting markets as a black box of tickers and price action, Arkhe Market is being engineered to expose the underlying structure: capital flows, regime changes, risk concentration, and the institutional logic that drives them.
          </p>

          <p>
            Where most retail tools optimize for speed and surface-level signals, Arkhe Market optimizes for understanding. Real-time data feeds are paired with swarm-based AI analysis so that any signal can be interrogated, contextualized, and explained. Institutional-grade risk systems sit underneath the interface to enforce discipline. Integrated education turns every interaction into an opportunity to build durable market literacy.
          </p>

          <p>
            Arkhe Market is the first externally facing platform built inside the Arkhe Holdings system. It exists to embody the broader thesis: that the future belongs to those who can understand systems deeply, adapt quickly, learn continuously, and integrate technology responsibly. Its purpose is not to predict markets — it is to help people think more clearly about them.
          </p>

          <p className="text-white">
            The goal is not simply to ship software. It is to build infrastructure capable of helping people act more intelligently and operate more independently in a rapidly evolving financial environment.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-widest text-teal-300">Platform Pillars</p>
          <ul className="mt-4 space-y-2 text-white/65">
            <li>— Real-time market data and liquidity modeling</li>
            <li>— Swarm-based, multi-agent AI analysis</li>
            <li>— Institutional-grade risk and decision systems</li>
            <li>— Integrated financial education and research tooling</li>
            <li>— Macroeconomic context layered onto every signal</li>
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
