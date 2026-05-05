import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Founder notes from Brian Salsbury on law, technology, AI systems, venture structure, and building durable companies.",
};

export default function InsightsPage() {
  return (
    <main className="min-h-screen px-6 py-8 text-white">
      <section className="mx-auto max-w-5xl">
        <SiteNav />

        <p className="mt-6 text-sm uppercase tracking-[0.35em] text-teal-300">
          Insights
        </p>

        <h1 className="mt-4 text-5xl font-bold">Founder Notes and Updates</h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
          Writing on law, technology, strategy, AI systems, venture structure,
          and long-term company building — from inside the process of doing it.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-teal-300/50 hover:bg-teal-400/10"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="text-xs text-white/40">{post.date}</span>
                <span className="rounded-full border border-teal-300/30 bg-teal-400/10 px-2 py-0.5 text-xs text-teal-300">
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-lg font-semibold leading-snug text-white">
                {post.title}
              </h2>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                {post.excerpt}
              </p>

              <Link
                href={`/insights/${post.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-teal-300 transition-colors hover:text-teal-100"
              >
                Read <span aria-hidden="true">&rarr;</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-6">
        <SiteFooter />
      </div>
    </main>
  );
}
