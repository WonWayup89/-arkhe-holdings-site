import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { posts, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} — Arkhe Holdings`,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <main className="min-h-screen bg-[#05070a] px-6 py-8 text-white">
      <section className="mx-auto max-w-5xl">
        <SiteNav />

        <Link
          href="/insights"
          className="mt-6 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-teal-300"
        >
          <span aria-hidden="true">&larr;</span>
          Back to Insights
        </Link>
      </section>

      <article className="mx-auto mt-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-300">
          Founder Notes
        </p>

        <h1 className="mt-4 text-4xl font-bold leading-tight">{post.title}</h1>

        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="text-teal-300">{post.date}</span>
          <span className="text-white/40">&middot;</span>
          <span className="text-white/50">{post.readTime}</span>
        </div>

        <hr className="mt-8 border-teal-400/30" />

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-white/80">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-10">
          <Link
            href="/insights"
            className="text-sm text-white/50 transition-colors hover:text-teal-300"
          >
            &larr; Back to all Insights
          </Link>
        </div>
      </article>
    </main>
  );
}
