import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Arkhe Holdings is a parent company built to structure, protect, and scale disciplined ventures across law, technology, media, consulting, and investments.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-8 text-white">
      <section className="mx-auto max-w-4xl">
        <SiteNav />

        <h1 className="mt-6 text-5xl font-bold">About Arkhe Holdings</h1>

        {/* What We Are */}
        <div className="mt-16">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300">What We Are</p>
          <h2 className="mt-3 text-2xl font-bold">A Parent Company Built for the Long Game</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Arkhe Holdings is a holding company built to structure, protect, and scale disciplined
            ventures across five verticals: Legal, Technology &amp; AI, Media &amp; Community,
            Arkhe Market, and Consulting &amp; Strategy. It is not a startup. It is
            not a personal brand. It is infrastructure — the legal and operational shell that houses
            serious work and keeps each venture accountable to its own lane.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Most companies grow sideways — chasing opportunity without structure. Arkhe is designed
            to grow vertically, adding depth to each venture before expanding into new ones. Every
            division operates under a shared philosophy but maintains its own focus, its own margin,
            and its own trajectory. The parent company exists so that growth in one area never
            cannibalizes another.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            This is not a company built for the ideal moment. It is being built under real
            conditions — while working, while studying, while solving actual problems for actual
            people. That constraint is not a limitation. It is the proof of concept.
          </p>
        </div>

        {/* Why Arkhe */}
        <div className="mt-16">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Why Arkhe</p>
          <h2 className="mt-3 text-2xl font-bold">The Name Means Something</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Arkhe (ἀρχή) is an ancient Greek term meaning &ldquo;origin,&rdquo; &ldquo;beginning,&rdquo; or &ldquo;first
            principle.&rdquo; The pre-Socratic philosophers used it to describe the fundamental substance
            from which everything else is derived — the irreducible thing that makes all other
            things possible. That is exactly what a holding company should be: not the product, not
            the service, not the brand — but the foundation everything else is built on.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            The name is also a reminder. Every decision made inside Arkhe Holdings is measured
            against first principles. Not convention. Not trend. Not what worked for someone else in
            a different context. If the reasoning is sound and the structure holds, the venture
            moves forward. If it does not, it does not.
          </p>
        </div>

        {/* How We Operate */}
        <div className="mt-16">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300">How We Operate</p>
          <h2 className="mt-3 text-2xl font-bold">Structure First. Then Scale.</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Each venture inside Arkhe Holdings operates as a separate lane with its own scope,
            deliverables, and growth model. The holding structure ensures that liability is
            contained, revenue is tracked independently, and no single division&#39;s volatility
            threatens the whole. This is the same architecture used by the most durable companies
            in the world — applied at the scale that makes sense right now.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Arkhe Holdings runs on three operating principles: Shield the assets and the vision from
            unnecessary risk. Structure every venture so it can function without constant intervention.
            Launch only when the foundation is ready — not when the market says it should be.
            Disciplined growth is slower growth. It is also the only kind that lasts.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <p className="text-lg text-white/70">
            Arkhe Holdings is the work of one founder, building deliberately.
          </p>
          <Link
            href="/founder"
            className="mt-6 inline-block rounded-md bg-teal-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#05070a] transition-opacity hover:opacity-90"
          >
            Meet the Founder →
          </Link>
        </div>
      </section>
      <div className="mx-auto max-w-4xl px-6">
        <SiteFooter />
      </div>
    </main>
  );
}
