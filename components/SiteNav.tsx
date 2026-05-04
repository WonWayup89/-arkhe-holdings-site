export default function SiteNav() {
  return (
    <nav className="relative z-10 mb-10 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-2xl backdrop-blur">
      <a href="/" className="flex items-center gap-3">
        <img
          src="/arkeh-shield.svg"
          alt="Arkhe Holdings shield"
          className="h-9 w-9 drop-shadow-[0_0_18px_rgba(45,212,191,0.55)]"
        />
        <span className="text-lg font-semibold tracking-tight">
          Arkhe Holdings
        </span>
      </a>

      <div className="hidden items-center gap-8 text-sm text-white/80 md:flex">
        <a href="/about"    className="hover:text-teal-300 transition-colors">About</a>
        <a href="/founder"  className="hover:text-teal-300 transition-colors">Founder</a>
        <a href="/system"   className="hover:text-teal-300 transition-colors">Ventures</a>
        <a href="/insights" className="hover:text-teal-300 transition-colors">Insights</a>
        <a href="/contact"  className="hover:text-teal-300 transition-colors">Contact</a>
      </div>

      <a
        href="mailto:brian.salsbury@arkheholdings.net"
        className="hidden rounded-xl border border-teal-300/40 bg-teal-400/10 px-4 py-2 text-sm font-semibold text-teal-200 hover:bg-teal-400/20 md:inline-block transition-colors"
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
  );
}
