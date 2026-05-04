import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Brian Salsbury — Founder",
  description: "Brian Salsbury is the founder of Arkhe Holdings — a law student, self-taught developer, and builder of disciplined long-term ventures.",
};

export default function FounderPage() {
  return (
    <main className="min-h-screen bg-[#05070a] px-6 py-8 text-white">
      <section className="mx-auto max-w-5xl">
        <SiteNav />

        <p className="mt-6 text-sm uppercase tracking-[0.35em] text-teal-300">
          Founder
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          Brian Salsbury
        </h1>

        <p className="mt-4 text-xl text-white/70">
          Founder of Arkhe Holdings  
          <br />
          <span className="text-teal-300">
            Building structured ventures across law, technology, and capital.
          </span>
        </p>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-white/75">
          
          <p>
            My path has never followed a straight line. That is exactly what built the foundation for everything I am creating today.
          </p>

          <p>
            I am currently a law student at Purdue University Global Law School, where I focus on legal systems, contracts, and the structural mechanics behind how institutions operate. Alongside that, I serve as an Academic Advisor at Crestpoint University, working directly with students as they navigate higher education. That role has provided a direct view into both the opportunities and the breakdowns within modern systems.
          </p>

          <p>
            Outside of formal education, I have taken a self-driven approach to technical development. I taught myself Python and began building tools, automation systems, and AI-driven frameworks designed to solve real problems. My work sits at the intersection of law, technology, and systems design, with an emphasis on building solutions that are not only functional, but durable.
          </p>

          <p>
            My perspective has been shaped as much by adversity as it has by education. I have faced situations that required rapid adaptation, rebuilding, and forward movement under pressure. Those experiences fundamentally changed how I approach problems. I do not wait for ideal conditions. I build within real ones.
          </p>

          <p>
            That mindset led to the creation of Arkhe Holdings.
          </p>

          <p>
            Arkhe represents origin, first principles, and the belief that anything worth building must begin with a strong foundation. The company is not a single venture, but a structured system designed to support many. It is where legal insight, technical execution, and practical problem-solving converge to create assets built for long-term stability and growth.
          </p>

          <p className="text-white">
            I am not interested in trends. I am focused on building systems that work.
          </p>

        </div>

        <a
          href="mailto:brian.salsbury@arkheholdings.net"
          className="mt-12 inline-block rounded-xl bg-teal-300 px-6 py-3 font-semibold text-black hover:bg-teal-200"
        >
          Work With Arkhe
        </a>

      </section>
    </main>
  );
}
