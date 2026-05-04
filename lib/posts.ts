export interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "building-a-holding-company-in-law-school",
    title: "Building a Holding Company While in Law School",
    date: "2026-04-12",
    readTime: "6 min read",
    excerpt:
      "Most people wait for the right moment to build something serious. I stopped waiting.",
    content: `Most people wait for the right moment. The right job, the right savings account, the right amount of free time. I understand that impulse. I had it for a while. But at some point I looked at the conditions I was operating under — full-time work, law school, self-directed technical projects — and realized that waiting for the conditions to improve was itself the mistake.

Arkhe Holdings did not start because the timing was ideal. It started because I decided the structure had to come first, before the timing ever would be ideal.

Here is what I mean by that. Law school teaches you things about entity design that most MBA programs skim over or never touch at all. When you spend time inside contract law, corporate formation doctrine, agency relationships, and fiduciary structures, you start to see businesses differently. You stop seeing them as products or services and start seeing them as legal architectures. The entity is not just an administrative wrapper around the business — it is the business, in the most foundational sense. Get the structure wrong and everything built on top of it is fragile, regardless of how good the underlying idea is.

The holding company model is the right vehicle for someone building across multiple domains, and I chose it deliberately. A holding company is not a startup. It is not a freelance operation. It is a parent structure designed to own, protect, and coordinate subsidiary activity. When you build it correctly, each vertical can operate independently — with its own focus, its own risk profile, its own potential upside — while the parent entity provides the legal shield, the capital architecture, and the governance framework that keeps everything coherent.

That structure matters to me for a specific reason: I am not building one thing. I am building in law, in technology and AI, in media, in advisory services, in capital deployment. These are genuinely different domains. They require different risk tolerances, different operational rhythms, different kinds of expertise. Trying to run all of them out of a single undifferentiated entity would create a mess. The holding company keeps them clean.

Law school also taught me something about constraint that I did not expect to learn in a classroom. There is a legal doctrine — I will not get into the technical details here — that essentially holds that limitations on discretion, when properly structured, actually reduce certain kinds of liability exposure. The principle, translated into business terms, is that constraint creates clarity. When you do not have unlimited options, you make better decisions within the options you have.

I think about that constantly. Working full-time while studying law and building a company is not a liability. It is a forcing function. I cannot afford to waste time on the wrong things. Every hour I invest in Arkhe has to count. That constraint, as uncomfortable as it sometimes is, has made me more disciplined about prioritization, more honest about what actually matters, and more deliberate about every structural decision.

The people who will build durable companies are not the ones who waited for the perfect conditions. They are the ones who built the right container while the conditions were still messy, then filled it in over time.

That is what I am doing. The container comes first.`,
  },
  {
    slug: "why-ai-will-restructure-legal-practice",
    title: "Why AI Will Restructure Legal Practice — And What That Means for New Attorneys",
    date: "2026-04-28",
    readTime: "7 min read",
    excerpt:
      "The legal profession isn't being replaced by AI. It's being restructured around it. The attorneys who understand this now will have an enormous advantage.",
    content: `Let me be direct about what is actually happening, because most of the coverage on this topic swings between two poles that are both wrong. One camp says AI is coming to replace lawyers. The other camp says the legal profession is too nuanced, too judgment-dependent, too human to be meaningfully disrupted. Both miss the real story.

The legal profession is being restructured around AI. Not replaced. Restructured. That is a meaningfully different claim, and the distinction matters enormously if you are a law student, a new attorney, or anyone else whose career is going to span the next three decades.

I am in a somewhat unusual position to think about this, because I am building AI systems professionally while simultaneously studying law academically. That dual vantage point gives me a specific lens that I think is useful here.

Here is what is actually changing. Document review — the work that has historically consumed a disproportionate amount of associate time at litigation firms — is being compressed by AI tools that can process thousands of documents, identify relevant passages, flag privilege issues, and surface patterns in a fraction of the time a human team requires. This is not theoretical. It is happening now. The economic model that justified billing junior attorney hours for document review is eroding.

Contract analysis is moving in the same direction. AI systems can now extract key terms, identify non-standard clauses, compare against template language, and flag risk factors across large volumes of agreements faster than any human reviewer. For transactional practices, this fundamentally changes what associate-level work looks like. The value is no longer in the reading and summarizing. It is in the judgment layer on top of what the system surfaces.

Legal research is being transformed at the query level. The ability to retrieve and synthesize case law, statutes, and secondary sources through natural language interfaces changes the research workflow in ways that compress time and require attorneys to ask better questions rather than execute better searches. This shifts the skill requirement from mechanical retrieval to analytical framing.

Client intake and initial triage are being automated at many firms and legal service providers, which changes the economics of who can access legal services at all — a structural shift with significant implications for access to justice and for how practices are organized.

So what does this mean practically for someone in law school right now?

First: learn how these systems actually work. Not the marketing language. The mechanics. Understand what AI systems are genuinely good at — pattern recognition, synthesis at scale, structured extraction — and where they fail — novel legal questions, jurisdictional nuance, ethical judgment calls. Attorneys who understand the underlying technology will be able to supervise, deploy, and quality-check AI-generated work product. Those who do not understand it will either over-rely on it or under-use it, both of which create professional risk.

Second: develop the judgment layer. If AI handles the retrieval and first-pass synthesis, the attorney's value concentrates in the judgment that sits on top. That means developing sharper analytical skills, clearer communication, and the ability to make defensible calls under uncertainty. These have always been attorney skills. They are about to become the only attorney skills that matter.

Third: think seriously about where AI creates new surface area for legal work rather than just compressing existing work. AI systems need legal frameworks. AI deployments create liability questions. AI-generated content raises IP issues. Algorithmic decision-making in regulated industries requires legal governance. The attorneys who position themselves at that intersection early will have an enormous structural advantage.

Arkhe AI Systems is being built precisely at this intersection. The goal is not to build AI tools for lawyers. It is to build AI-native legal and operational infrastructure that embeds legal judgment into the architecture from the beginning — because that is where the long-term value will be created. The attorneys who understand both sides of that boundary will be the ones building it.

The window to develop that fluency is now. Not later.`,
  },
  {
    slug: "the-discipline-of-structure",
    title: "The Discipline of Structure: Why Most Solo Builders Fail at Scale",
    date: "2026-05-02",
    readTime: "5 min read",
    excerpt:
      "The problem isn't execution. It's architecture. Most solo builders collapse under their own success because they never built the container first.",
    content: `The most common failure mode for solo builders is not a lack of execution. It is a lack of architecture. I have watched it happen repeatedly, and I have felt the pull of it myself. You start building, opportunities accumulate, you say yes to things because they seem aligned, and then somewhere between the third and fifth serious commitment, the whole system starts to buckle under its own weight.

The problem is not that the builder did too much. The problem is that they never built a container capable of holding what they were building.

There is a meaningful distinction between three models that often get conflated. A freelancer sells time and expertise. The ceiling is the number of hours available, and the floor is the hourly rate the market will bear. A startup bets on a single product reaching a large market fast enough to justify the risk. The holding company does something different: it builds a structure designed to own and operate multiple value-generating entities across different domains, coordinating capital, governance, and risk at the parent level while allowing each subsidiary to run independently.

Most solo builders operate in the first two modes even when their actual ambitions require the third. They accumulate projects without creating a structure to contain them. The result is not a portfolio — it is a tangle. And tangles do not scale.

I chose the holding company model for Arkhe deliberately, before I had anything substantial to put inside it. That sequence matters. The container has to come first. Not because it looks more professional on paper, but because the container determines what you can actually build inside it. Structure is not administrative overhead. Structure is the operating system that makes everything else run.

The shield function comes first. Before you can build aggressively, you have to protect what you have built and what you are building. That means legal entities structured correctly, liability isolated at the right level, intellectual property documented and owned properly, and governance frameworks that hold up under scrutiny. Most solo builders skip this because it feels like friction. It is not friction — it is foundation. You cannot build on ground that shifts.

Structure is the second function. This is the architecture layer — how different projects relate to each other, how resources move between them, how decisions get made at the parent level versus the subsidiary level, how you maintain coherence without creating rigidity. Without deliberate structure, growth becomes chaos. With it, growth compounds in a controlled way because each new element has a defined place in the system.

Launch is the third function, and it only works cleanly if the first two are in place. Launching without a shield means every new initiative creates new exposure. Launching without structure means every new initiative creates new confusion. But when the shield and structure are in place, launching becomes a repeatable capability rather than a one-time event. You can put something into production, learn from it, iterate, and move to the next thing — because the container can hold it.

Shield. Structure. Launch. That is not just a tagline. It is a sequencing principle and an operating framework. Do them in that order. Do not skip to launch because it feels more exciting. The builders who do the unglamorous architecture work first are the ones who are still standing when the opportunities compound.

Build the container first. Then fill it in.`,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((post) => post.slug);
}
