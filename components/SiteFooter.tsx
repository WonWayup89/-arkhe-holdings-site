import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/founder", label: "Founder" },
  { href: "/system", label: "Ventures" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-12 text-center text-sm text-white/40">
      <div className="mb-6 flex justify-center">
        <Image
          src="/arkhe-logo.jpeg"
          alt="Arkhe Holdings"
          width={160}
          height={160}
          className="h-40 w-auto opacity-90 drop-shadow-[0_0_32px_rgba(45,212,191,0.45)]"
        />
      </div>
      <div className="mb-4 flex flex-wrap justify-center gap-6 text-white/50">
        {footerLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-teal-300"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <p>© 2026 Arkhe Holdings. All rights reserved.</p>
    </footer>
  );
}
