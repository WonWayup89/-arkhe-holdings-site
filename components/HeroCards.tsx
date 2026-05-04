const cards = [
  {
    title: "Purpose",
    text: "Protect, organize, and launch disciplined ventures under one parent structure.",
  },
  {
    title: "Structure",
    text: "Connect legal, technical, media, and investment systems under one framework.",
    glow: true,
  },
  {
    title: "Launch",
    text: "Build durable ventures designed for scale, control, and long term growth.",
  },
];

export default function HeroCards() {
  return (
    <div className="relative z-10 mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-2xl border p-6 text-left backdrop-blur-2xl transition hover:-translate-y-1 ${
            card.glow
              ? "border-teal-300/60 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.35),rgba(20,184,166,0.10)_45%,rgba(255,255,255,0.05))] shadow-[0_0_85px_rgba(45,212,191,0.36)]"
              : "border-white/15 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.16),rgba(255,255,255,0.05)_48%,rgba(255,255,255,0.03))] shadow-[0_0_40px_rgba(255,255,255,0.04)]"
          }`}
        >
          <h2 className="text-2xl font-semibold">{card.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            {card.text}
          </p>
        </div>
      ))}
    </div>
  );
}
