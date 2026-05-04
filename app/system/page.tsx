import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Venture System",
  description: "The Arkhe Holdings venture system — a coordinated framework of legal, technology, media, and investment initiatives built for long-term growth.",
};

export default function SystemPage() {
  return (
    <main className="min-h-screen bg-[#05070a] px-6 py-8 text-white">
      <section className="mx-auto max-w-5xl">
        <SiteNav />

        <p className="mt-6 text-sm uppercase tracking-[0.35em] text-teal-300">
          Venture Portfolio
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          System Architecture
        </h1>

        <p className="mt-6 text-xl text-white/80 leading-relaxed max-w-3xl">
          Arkhe Holdings is not a single company.
          <br />
          It is a framework for building and scaling multiple systems under a unified structure.
        </p>

        <p className="mt-6 text-white/70 max-w-3xl leading-relaxed">
          Arkhe is being developed as a parent entity designed to manage, structure,
          and grow ventures across law, technology, and digital infrastructure.
        </p>

        <p className="mt-4 text-white/70 max-w-3xl leading-relaxed">
          Each initiative serves a defined role.
          Together, they form a coordinated system.
        </p>

        {/* VENTURES */}
        <div className="mt-16 space-y-10">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Arkhe Legal (Future)</h2>
            <p className="mt-4 text-white/70">
              Reserved for the development of a licensed legal practice and supporting infrastructure.
              This entity will focus on compliant legal services, contract systems, and the legal
              frameworks required to support both internal ventures and external clients.
            </p>
          </div>

          <div className="rounded-3xl border border-teal-300/30 bg-teal-400/10 p-8">
            <h2 className="text-2xl font-semibold">Arkhe AI Systems (In Development)</h2>
            <p className="mt-4 text-white/70">
              Focused on applied AI, automation workflows, and internal operating systems.
              This includes research assistants, decision-support tools, and scalable automation
              designed to increase efficiency across all Arkhe entities.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">ANON Network (Concept)</h2>
            <p className="mt-4 text-white/70">
              A privacy-focused digital ecosystem built around anonymous identity and decentralized interaction.
              Designed to support secure communication, community infrastructure, and long-term ecosystem development.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Arkhe Media (Planned)</h2>
            <p className="mt-4 text-white/70">
              A centralized platform for publishing, education, and documentation.
              This will house written work, technical breakdowns, founder notes,
              and ongoing development insights across all ventures.
            </p>
          </div>

        </div>

        {/* FOOTER NOTE */}
        <p className="mt-16 text-sm text-white/50 max-w-3xl">
          Future legal services will be offered only through a properly licensed law practice
          and in full compliance with all applicable regulations.
        </p>

      </section>
    </main>
  );
}
