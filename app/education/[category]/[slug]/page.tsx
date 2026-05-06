import { educationIndex } from "@/generated/education-index";

type Params = {
  params: {
    category: string;
    slug: string;
  };
};

export default function EducationArticlePage({ params }: Params) {
  const article = educationIndex.find(
    (x) =>
      x.category === params.category &&
      x.slug === params.slug
  );

  if (!article) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-zinc-400">
            No education article matched this route.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <div className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-4">
            {article.category}
          </div>

          <h1 className="text-5xl font-bold mb-6">
            {article.title}
          </h1>

          <div className="h-px bg-cyan-500/30 w-full mb-10" />
        </div>

        <article
          className="prose prose-invert prose-cyan max-w-none"
          style={{
            whiteSpace: "pre-wrap",
            lineHeight: "1.8"
          }}
        >
          {article.content}
        </article>

      </div>
    </main>
  );
}
