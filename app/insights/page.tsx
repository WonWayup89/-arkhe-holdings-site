import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Insights",
  description: "Founder notes from Brian Salsbury on law, technology, AI systems, venture structure, and building durable companies.",
};

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-[#05070a] px-6 py-8 text-white">
      <section className="mx-auto max-w-5xl">
        <SiteNav />

        <p className="mt-6 text-sm uppercase tracking-[0.35em] text-teal-300">
          Insights
        </p>

        <h1 className="mt-4 text-5xl font-bold">Founder Notes and Updates</h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
          This section will hold future writing on law, technology, strategy,
          AI systems, venture structure, and long term company building.
        </p>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-white/60">
            No public insights have been published yet.
          </p>
        </div>
      </section>
    </main>
  );
}
