import Link from "next/link";
import HeroCards from "@/components/HeroCards";
import HeroNetwork from "@/components/HeroNetwork";
import SystemDiagram from "@/components/SystemDiagram";
import EmailCapture from "@/components/EmailCapture";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { verticals } from "@/lib/verticals";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <section className="relative mx-auto max-w-7xl px-5 py-6 sm:px-8">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-400/20 blur-3xl" />

        <SiteNav />

        <section className="relative overflow-hidden rounded-[2rem] border border-teal-300/25 bg-[radial-gradient(circle_at_50%_42%,rgba(20,184,166,0.30),transparent_42%),radial-gradient(circle_at_top,rgba(94,234,212,0.14),transparent_50%),linear-gradient(180deg,#0a0f15,#04070a)] px-6 pb-16 pt-28 text-center shadow-[0_0_120px_rgba(45,212,191,0.18)] sm:px-10">
          <HeroNetwork />

          <div className="relative mx-auto max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.55em] text-teal-300 drop-shadow-[0_0_14px_rgba(45,212,191,0.65)] sm:text-sm">
              Arkhe Holdings
            </p>

            <h1 className="text-5xl font-bold tracking-tight drop-shadow-[0_0_32px_rgba(255,255,255,0.22)] sm:text-6xl md:text-7xl">
              Shield. Structure. Launch.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/75 sm:text-xl">
              Arkhe Holdings builds and organizes ventures across legal,
              technological, media, and investment domains under one unified
              strategic structure.
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/55">
              Designed for long term control, scalability, and disciplined growth.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/about"
                className="rounded-xl bg-teal-300 px-6 py-3 font-semibold text-black shadow-[0_0_35px_rgba(45,212,191,0.25)] hover:bg-teal-200"
              >
                Learn About Arkhe
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white hover:border-teal-300/40 hover:bg-teal-400/10"
              >
                Contact
              </Link>
            </div>
          </div>

          <HeroCards />
        </section>

        <section id="verticals" className="py-16">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-teal-300">
                Focus Areas
              </p>
              <h2 className="mt-3 text-3xl font-bold">Our Verticals</h2>
            </div>
            <p className="max-w-xl text-sm text-white/55">
              Built as separate lanes under one disciplined holding structure.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {verticals.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_45px_rgba(255,255,255,0.03)] transition hover:-translate-y-1 hover:border-teal-300/50 hover:bg-teal-400/10 hover:shadow-[0_0_55px_rgba(45,212,191,0.16)]"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-teal-300/40 bg-teal-400/10 text-teal-200 group-hover:shadow-[0_0_25px_rgba(45,212,191,0.3)]">
                  ◈
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {item.blurb}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <EmailCapture />

        <SystemDiagram />

        <section
          id="ventures"
          className="my-16 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300">
            Framework
          </p>
          <h2 className="mt-3 text-3xl font-bold">Venture Framework</h2>
          <p className="mt-5 max-w-3xl text-white/70">
            Arkhe Holdings is being built as a home for long term ventures,
            intellectual property, digital infrastructure, and future operating
            companies.
          </p>

          <p className="mt-5 max-w-3xl rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/50">
            Future legal services will be offered only through a properly
            licensed law practice and in compliance with applicable rules.
          </p>
        </section>

        <section id="contact" className="pb-12 text-center">
          <h2 className="text-3xl font-bold">Contact</h2>
          <a
            href="mailto:brian.salsbury@arkheholdings.net"
            className="mt-4 inline-block text-white/70 hover:text-teal-300"
          >
            brian.salsbury@arkheholdings.net
          </a>
        </section>

        <SiteFooter />
      </section>
    </main>
  );
}
