import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/founder", label: "Founder" },
  { href: "/system", label: "Ventures" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  return (
    <nav className="relative z-10 mb-10 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-2xl backdrop-blur">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/arkhe-logo.jpeg"
          alt="Arkhe Holdings shield"
          width={36}
          height={36}
          className="h-9 w-9 drop-shadow-[0_0_18px_rgba(45,212,191,0.55)]"
        />
        <span className="text-lg font-semibold tracking-tight">
          Arkhe Holdings
        </span>
      </Link>

      <div className="hidden items-center gap-8 text-sm text-white/80 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-teal-300"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <a
        href="mailto:brian.salsbury@arkheholdings.net"
        className="hidden rounded-xl border border-teal-300/40 bg-teal-400/10 px-4 py-2 text-sm font-semibold text-teal-200 transition-colors hover:bg-teal-400/20 md:inline-block"
      >
        Work With Arkhe
      </a>

      <Link
        href="/contact"
        className="rounded-xl border border-teal-300/30 bg-teal-400/10 px-4 py-2 text-sm font-semibold text-teal-200 md:hidden"
      >
        Contact
      </Link>
    </nav>
  );
}
