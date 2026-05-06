import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { educationIndex } from "@/src/generated/education-index";

// ---------- types ------------------------------------------------------------

type EducationEntry = {
  title: string;
  category: string;
  slug: string;
  route: string;
  file: string;
  content: string;
};

const ENTRIES = educationIndex as EducationEntry[];

// ---------- static params + metadata ----------------------------------------

export async function generateStaticParams() {
  return ENTRIES.map((e) => ({
    category: e.category,
    slug: e.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const article = ENTRIES.find(
    (e) => e.category === category && e.slug === slug,
  );

  if (!article) {
    return { title: "Article Not Found — Arkhe Education" };
  }

  return {
    title: `${article.title} — Arkhe Education`,
    description: `${article.title} in the Arkhe Education library — institutional-grade explainers across macro, markets, crypto, risk, and Arkhe systems.`,
  };
}

// ---------- page ------------------------------------------------------------

const CATEGORY_DISPLAY: Record<string, string> = {
  ai_systems: "AI Systems",
  alternative_assets: "Alternative Assets",
  arkhe_systems: "Arkhe Systems",
  asset_classes: "Asset Classes",
  blockchain: "Blockchain",
  commodities: "Commodities",
  crisis: "Crisis Playbooks",
  crypto: "Crypto",
  economics: "Economics",
  execution: "Execution",
  foundations: "Foundations",
  fundamentals: "Fundamentals",
  glossary: "Glossary",
  historical_events: "Historical Events",
  infrastructure: "Infrastructure",
  institutional: "Institutional",
  macro: "Macro",
  market_structure: "Market Structure",
  playbooks: "Playbooks",
  portfolio: "Portfolio Construction",
  psychology: "Psychology",
  quant: "Quantitative Methods",
  real_estate: "Real Estate",
  risk_management: "Risk Management",
  statistics: "Statistics",
  strategies: "Strategies",
  traditional_finance: "Traditional Finance",
};

export default async function EducationArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = ENTRIES.find(
    (e) => e.category === category && e.slug === slug,
  );

  if (!article) {
    return (
      <main className="relative min-h-screen overflow-hidden text-white">
        <section className="relative mx-auto max-w-7xl px-5 py-6 sm:px-8">
          <SiteNav />
          <div className="mt-24 flex flex-col items-center justify-center text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-teal-300">
              404
            </p>
            <h1 className="mt-4 text-4xl font-bold">Article Not Found</h1>
            <p className="mt-3 max-w-md text-white/55">
              No education article matched <code className="font-mono text-teal-200">/{category}/{slug}</code>.
            </p>
            <Link
              href="/education"
              className="mt-8 rounded-xl bg-teal-300 px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_30px_rgba(45,212,191,0.3)] hover:bg-teal-200"
            >
              Back to the library
            </Link>
          </div>
          <SiteFooter />
        </section>
      </main>
    );
  }

  // Sibling navigation — prev/next within the same category, alphabetical.
  const siblings = ENTRIES.filter((e) => e.category === category).sort((a, b) =>
    a.title.localeCompare(b.title),
  );
  const idx = siblings.findIndex((e) => e.slug === slug);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  const categoryLabel =
    CATEGORY_DISPLAY[category] ?? category.replace(/_/g, " ");

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <section className="relative mx-auto max-w-7xl px-5 py-6 sm:px-8">
        <SiteNav />

        <div className="mx-auto mt-12 max-w-3xl">
          {/* Breadcrumb / category pill */}
          <Link
            href={`/education#${category}`}
            className="inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-teal-200 transition hover:border-teal-300/60 hover:bg-teal-400/15"
          >
            <span aria-hidden="true">◂</span> {categoryLabel}
          </Link>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {article.title}
          </h1>

          <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-teal-300/40 to-transparent" />

          {/* Article body — strip the leading "# Title" since we already
              render the title above, then parse the rest as Markdown. */}
          {(() => {
            const stripped = article.content
              .replace(/^\s*#\s+.*\n+/, "")
              .trim();

            if (!stripped) {
              return (
                <div className="mt-10 rounded-2xl border border-teal-300/20 bg-teal-400/5 p-8 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-teal-300">
                    In development
                  </p>
                  <p className="mt-3 text-white/65">
                    This module is part of the Arkhe Education library but
                    hasn&apos;t been published yet. Check back soon — or
                    explore other modules in this category.
                  </p>
                </div>
              );
            }

            return (
              <div className="article-body mt-10 text-white/80">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {stripped}
                </ReactMarkdown>
              </div>
            );
          })()}

          <style>{`
            .article-body {
              line-height: 1.75;
              font-size: 1rem;
            }
            .article-body h1,
            .article-body h2 {
              color: rgb(186, 250, 237);
              font-weight: 600;
              letter-spacing: -0.01em;
              margin-top: 2.5rem;
              margin-bottom: 1rem;
              font-size: 1.5rem;
            }
            .article-body h3 {
              color: rgb(186, 250, 237);
              font-weight: 600;
              margin-top: 2rem;
              margin-bottom: 0.75rem;
              font-size: 1.125rem;
              text-transform: uppercase;
              letter-spacing: 0.08em;
            }
            .article-body h4 {
              color: rgb(94, 234, 212);
              font-weight: 600;
              margin-top: 1.5rem;
              margin-bottom: 0.5rem;
              font-size: 0.95rem;
              text-transform: uppercase;
              letter-spacing: 0.12em;
            }
            .article-body p {
              margin-top: 0;
              margin-bottom: 1.1rem;
            }
            .article-body strong {
              color: rgb(255, 255, 255);
              font-weight: 600;
            }
            .article-body ul,
            .article-body ol {
              margin: 0.75rem 0 1.25rem;
              padding-left: 1.5rem;
            }
            .article-body ul { list-style: disc; }
            .article-body ol { list-style: decimal; }
            .article-body li {
              margin-bottom: 0.4rem;
            }
            .article-body code {
              background: rgba(94, 234, 212, 0.1);
              border: 1px solid rgba(94, 234, 212, 0.2);
              border-radius: 0.25rem;
              padding: 0.1em 0.35em;
              font-size: 0.9em;
              color: rgb(186, 250, 237);
            }
            .article-body pre {
              background: rgba(8, 22, 26, 0.7);
              border: 1px solid rgba(94, 234, 212, 0.18);
              border-radius: 0.75rem;
              padding: 1rem 1.25rem;
              overflow-x: auto;
              margin: 1rem 0;
            }
            .article-body pre code {
              background: transparent;
              border: none;
              padding: 0;
              color: rgb(229, 231, 235);
            }
            .article-body blockquote {
              border-left: 2px solid rgba(94, 234, 212, 0.45);
              padding-left: 1rem;
              margin: 1.25rem 0;
              color: rgba(255, 255, 255, 0.65);
              font-style: italic;
            }
            .article-body a {
              color: rgb(94, 234, 212);
              text-decoration: underline;
              text-decoration-color: rgba(94, 234, 212, 0.4);
              text-underline-offset: 3px;
            }
            .article-body a:hover {
              color: rgb(186, 250, 237);
              text-decoration-color: rgba(186, 250, 237, 0.8);
            }
            .article-body hr {
              border: 0;
              border-top: 1px solid rgba(94, 234, 212, 0.2);
              margin: 2rem 0;
            }
            .article-body table {
              width: 100%;
              border-collapse: collapse;
              margin: 1.25rem 0;
              font-size: 0.95rem;
            }
            .article-body th,
            .article-body td {
              border: 1px solid rgba(255, 255, 255, 0.1);
              padding: 0.5rem 0.75rem;
              text-align: left;
            }
            .article-body th {
              background: rgba(94, 234, 212, 0.06);
              color: rgb(186, 250, 237);
              font-weight: 600;
            }
          `}</style>

          {/* Prev / next sibling nav */}
          {(prev || next) && (
            <nav className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={prev.route}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-teal-300/40 hover:bg-teal-400/10"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
                    Previous
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white">
                    {prev.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={next.route}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-right transition hover:border-teal-300/40 hover:bg-teal-400/10"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
                    Next
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white">
                    {next.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          )}

          <div className="mt-12">
            <Link
              href="/education"
              className="text-sm text-white/55 transition hover:text-teal-200"
            >
              ← Back to the library
            </Link>
          </div>
        </div>

        <SiteFooter />
      </section>
    </main>
  );
}
