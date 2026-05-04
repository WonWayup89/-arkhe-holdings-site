import HeroCards from "@/components/HeroCards";
import HeroNetwork from "@/components/HeroNetwork";
import SystemDiagram from "@/components/SystemDiagram";
import EmailCapture from "@/components/EmailCapture";

const verticals = [
  {
    title: "Legal",
    text: "Future legal infrastructure, compliance awareness, and professional practice development.",
    href: "/legal",
  },
  {
    title: "Technology / AI",
    text: "AI systems, automation tools, internal platforms, and applied software ventures.",
    href: "/technology",
  },
  {
    title: "Media & Community",
    text: "Digital communities, content ecosystems, and audience driven platforms.",
    href: "/media",
  },
  {
    title: "Investments & Holdings",
    text: "Long term ownership of assets, intellectual property, domains, and operating companies.",
    href: "/holdings",
  },
  {
    title: "Consulting & Strategy",
    text: "Strategic support for business systems, workflows, and venture architecture.",
    href: "/strategy",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <section className="relative mx-auto max-w-7xl px-5 py-6 sm:px-8">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-400/20 blur-3xl" />

        <nav className="relative z-10 mb-10 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-2xl backdrop-blur">
          <a href="/" className="flex items-center gap-3">
            <img
              src="/arkhe-logo.jpeg"
              alt="Arkhe Holdings shield logo"
              className="h-9 w-9 drop-shadow-[0_0_18px_rgba(45,212,191,0.55)]"
            />
            <span className="text-lg font-semibold tracking-tight">
              Arkhe Holdings
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm text-white/80 md:flex">
            <a href="/about" className="hover:text-teal-300">
              About
            </a>
            <a href="/founder" className="hover:text-teal-300">
              Founder
            </a>
            <a href="/system" className="hover:text-teal-300">
              Ventures
            </a>
            <a href="/insights" className="hover:text-teal-300">
              Insights
            </a>
            <a href="/contact" className="hover:text-teal-300">
              Contact
            </a>
          </div>

          <a
            href="mailto:brian.salsbury@arkheholdings.net"
            className="hidden rounded-xl border border-teal-300/40 bg-teal-400/10 px-4 py-2 text-sm font-semibold text-teal-200 hover:bg-teal-400/20 md:inline-block"
          >
            Work With Arkhe
          </a>

          <a
            href="/contact"
            className="rounded-xl border border-teal-300/30 bg-teal-400/10 px-4 py-2 text-sm font-semibold text-teal-200 md:hidden"
          >
            Contact
          </a>
        </nav>

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
              <a
                href="/about"
                className="rounded-xl bg-teal-300 px-6 py-3 font-semibold text-black shadow-[0_0_35px_rgba(45,212,191,0.25)] hover:bg-teal-200"
              >
                Learn About Arkhe
              </a>
              <a
                href="/contact"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white hover:border-teal-300/40 hover:bg-teal-400/10"
              >
                Contact
              </a>
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
              <a
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_45px_rgba(255,255,255,0.03)] transition hover:-translate-y-1 hover:border-teal-300/50 hover:bg-teal-400/10 hover:shadow-[0_0_55px_rgba(45,212,191,0.16)]"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-teal-300/40 bg-teal-400/10 text-teal-200 group-hover:shadow-[0_0_25px_rgba(45,212,191,0.3)]">
                  ◈
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {item.text}
                </p>
              </a>
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

        <footer className="border-t border-white/10 py-12 text-center text-sm text-white/40">
          <div className="mb-6 flex justify-center">
            <img
              src="/arkhe-logo.jpeg"
              alt="Arkhe Holdings"
              className="h-40 opacity-90 drop-shadow-[0_0_32px_rgba(45,212,191,0.45)]"
            />
          </div>
          <div className="mb-4 flex justify-center gap-6 text-white/50">
            <a href="/about"    className="hover:text-teal-300 transition-colors">About</a>
            <a href="/founder"  className="hover:text-teal-300 transition-colors">Founder</a>
            <a href="/system"   className="hover:text-teal-300 transition-colors">Ventures</a>
            <a href="/insights" className="hover:text-teal-300 transition-colors">Insights</a>
            <a href="/contact"  className="hover:text-teal-300 transition-colors">Contact</a>
            <a href="/privacy"  className="hover:text-teal-300 transition-colors">Privacy</a>
          </div>
          <p>© 2026 Arkhe Holdings. All rights reserved.</p>
        </footer>
      </section>
    </main>
  );
}
