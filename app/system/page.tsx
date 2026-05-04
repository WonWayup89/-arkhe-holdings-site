import VentureGeomMap from "@/components/VentureGeomMap";
import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Venture System",
  description: "The Arkhe Holdings venture system — a coordinated framework of legal, technology, media, and investment initiatives built for long-term growth.",
};

const ventures = [
  {
    name: "Arkhe Legal",
    stage: "Forming",
    stageColor: "yellow",
    vertical: "Legal",
    description:
      "Reserved for the development of a licensed legal practice and supporting infrastructure. This entity will focus on compliant legal services, contract systems, and the legal frameworks required to support both internal ventures and external clients.",
    detail:
      "Future legal services will be offered only through a properly licensed law practice in full compliance with applicable rules.",
    href: "/legal",
  },
  {
    name: "Arkhe AI Systems",
    stage: "In Development",
    stageColor: "teal",
    vertical: "Technology / AI",
    description:
      "Focused on applied AI, automation workflows, and internal operating systems. Includes research assistants, decision-support tools, and scalable automation designed to increase efficiency across all Arkhe entities.",
    detail:
      "Currently building internal tooling and proof-of-concept automation systems.",
    href: "/technology",
  },
  {
    name: "ANON Network",
    stage: "Concept",
    stageColor: "purple",
    vertical: "Media & Community",
    description:
      "A privacy-focused digital ecosystem built around anonymous identity and decentralized interaction. Designed to support secure communication, community infrastructure, and long-term ecosystem development.",
    detail: "Architecture and community model under active design.",
    href: "/media",
  },
  {
    name: "Arkhe Media",
    stage: "Planned",
    stageColor: "slate",
    vertical: "Media & Community",
    description:
      "A centralized platform for publishing, education, and documentation. Will house written work, technical breakdowns, founder notes, and ongoing development insights across all ventures.",
    detail:
      "Launch planned after core technology infrastructure is established.",
    href: "/insights",
  },
  {
    name: "Arkhe Capital",
    stage: "Forming",
    stageColor: "yellow",
    vertical: "Investments & Holdings",
    description:
      "Long-term ownership and management of digital assets, intellectual property, domains, and operating companies. The holdings arm that provides the financial architecture for the broader Arkhe system.",
    detail: "Entity structure and asset acquisition strategy in formation.",
    href: "/holdings",
  },
];

const badgeClasses: Record<string, string> = {
  teal: "bg-teal-400/15 text-teal-300 border border-teal-300/30",
  yellow: "bg-yellow-400/10 text-yellow-300 border border-yellow-300/25",
  purple: "bg-purple-400/10 text-purple-300 border border-purple-300/25",
  slate: "bg-white/5 text-white/40 border border-white/10",
};

export default function SystemPage() {
  return (
    <main className="min-h-screen bg-[#05070a] px-6 py-8 text-white">
      <VentureGeomMap />
      <section className="mx-auto max-w-5xl">
        <SiteNav />

        <p className="mt-6 text-sm uppercase tracking-[0.35em] text-teal-300">
          Venture Portfolio
        </p>

        <h1 className="mt-4 text-5xl font-bold">System Architecture</h1>

        <p className="mt-6 text-xl text-white/80 leading-relaxed max-w-3xl">
          Arkhe Holdings is not a single company.
          <br />
          It is a framework for building and scaling multiple systems under a
          unified structure.
        </p>

        <p className="mt-6 text-white/70 max-w-3xl leading-relaxed">
          Arkhe is being developed as a parent entity designed to manage,
          structure, and grow ventures across law, technology, and digital
          infrastructure.
        </p>

        <p className="mt-4 text-white/70 max-w-3xl leading-relaxed">
          5 initiatives. Each serves a defined role. Together, they form a
          coordinated system.
        </p>

        {/* VENTURES */}
        <div className="mt-16 space-y-6">
          {ventures.map((v) => (
            <div
              key={v.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              {/* Top row: name + badge */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">{v.name}</h2>
                  <p className="mt-1 text-sm text-teal-300">{v.vertical}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${badgeClasses[v.stageColor]}`}
                >
                  {v.stage}
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-white/70 leading-relaxed">
                {v.description}
              </p>

              {/* Detail note */}
              <div className="mt-4 rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-sm text-white/45">
                {v.detail}
              </div>

              {/* Learn more link */}
              <div className="mt-5">
                <Link
                  href={v.href}
                  className="text-sm text-teal-300 hover:text-teal-200 transition-colors"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
