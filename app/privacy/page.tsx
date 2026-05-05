import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-6 py-8 text-white">
      <section className="mx-auto max-w-4xl">
        <SiteNav />

        <Link href="/" className="text-sm text-teal-300 transition-colors hover:text-teal-200">
          ← Back to Home
        </Link>

        <h1 className="mt-10 text-5xl font-bold">Privacy Policy</h1>

        <p className="mt-6 text-white/70">
          Arkhe Holdings respects visitor privacy. This website currently does not
          collect sensitive personal information, process payments, or provide legal
          services through this site.
        </p>

        <p className="mt-6 text-white/70">
          If contact forms, analytics, newsletters, or client intake systems are added
          later, this policy will be updated to describe what information is collected
          and how it is used.
        </p>
      </section>
      <div className="mx-auto max-w-4xl px-6">
        <SiteFooter />
      </div>
    </main>
  );
}
