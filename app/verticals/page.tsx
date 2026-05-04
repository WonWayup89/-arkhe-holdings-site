import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Verticals",
  description: "Arkhe Holdings operates across five verticals: Legal, Technology/AI, Media & Community, Investments & Holdings, and Consulting & Strategy.",
};

const verticals = [
  {
    title: "Legal",
    text: "Future legal infrastructure, compliance awareness, legal technology, and professional practice development.",
    href: "/legal",
  },
  {
    title: "Technology / AI",
    text: "Automation systems, AI tools, internal platforms, software products, and applied intelligence ventures.",
    href: "/technology",
  },
  {
    title: "Media & Community",
    text: "Audience focused brands, digital communities, education projects, and content ecosystems.",
    href: "/media",
  },
  {
    title: "Investments & Holdings",
    text: "Long term ownership of domains, intellectual property, digital assets, and operating companies.",
    href: "/holdings",
  },
  {
    title: "Consulting & Strategy",
    text: "Business architecture, systems design, workflow planning, and venture support.",
    href: "/strategy",
  },
];

export default function VerticalsPage() {
  return (
    <main className="min-h-screen bg-[#05070a] px-6 py-8 text-white">
      <section className="mx-auto max-w-6xl">
        <SiteNav />

        <p className="mt-6 text-sm uppercase tracking-[0.35em] text-teal-300">
          Focus Areas
        </p>

        <h1 className="mt-4 text-5xl font-bold">Arkhe Verticals</h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
          Arkhe Holdings is structured around separate venture lanes that can grow
          independently while remaining connected to one parent vision.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {verticals.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-teal-300/40 hover:bg-teal-400/10 transition-colors"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-teal-300/40 bg-teal-400/10 text-teal-200 group-hover:shadow-[0_0_20px_rgba(45,212,191,0.25)]">
                ◈
              </div>
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              <p className="mt-4 text-white/65">{item.text}</p>
              <p className="mt-4 text-sm text-teal-300 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more →
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
