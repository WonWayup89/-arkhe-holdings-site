// Single source of truth for the five Arkhe Holdings vertical categories.
// Consumed by:
//   - app/page.tsx (homepage card grid)
//   - components/SystemDiagram.tsx (node labels + click-through links)
// Add a new vertical here and it appears everywhere those components render.

export interface Vertical {
  /** URL slug. Doubles as React key and matches the route under /app. */
  id: string;
  /** Short label used on the homepage card and SystemDiagram node. */
  title: string;
  /** Same label, optionally shorter, for the diagram where space is tight. */
  shortTitle?: string;
  /** Route the user lands on when they click the card or node. */
  href: string;
  /** One-line blurb shown on the homepage card. */
  blurb: string;
}

export const verticals: Vertical[] = [
  {
    id: "legal",
    title: "Legal",
    href: "/legal",
    blurb:
      "Future legal infrastructure, compliance awareness, and professional practice development.",
  },
  {
    id: "technology",
    title: "Technology / AI",
    shortTitle: "AI Systems",
    href: "/technology",
    blurb:
      "AI systems, automation tools, internal platforms, and applied software ventures.",
  },
  {
    id: "media",
    title: "Media & Community",
    shortTitle: "Media",
    href: "/media",
    blurb:
      "Digital communities, content ecosystems, and audience driven platforms.",
  },
  {
    id: "holdings",
    title: "Arkhe Market",
    shortTitle: "Market",
    href: "/holdings",
    blurb:
      "AI-driven market intelligence platform merging real-time data, multi-agent analysis, and integrated financial education.",
  },
  {
    id: "strategy",
    title: "Consulting & Strategy",
    shortTitle: "Strategy",
    href: "/strategy",
    blurb:
      "Strategic support for business systems, workflows, and venture architecture.",
  },
];
