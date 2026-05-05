// Canonical venture entities. Distinct from lib/verticals.ts, which holds the
// FIVE VERTICAL CATEGORIES (legal, technology, media, holdings, strategy).
// This file holds the FIVE NAMED VENTURES that live inside those verticals.
// Both /system page and components/VentureGeomMap.tsx read from here.

export type StageColor = "yellow" | "teal" | "purple" | "slate";

export interface Venture {
  /** Stable id used as React key + node id in the venture map. */
  id: string;
  /** Display name, e.g. "Arkhe Legal". */
  name: string;
  /** Parent vertical category name. */
  vertical: string;
  /** Lifecycle stage. */
  stage: "Forming" | "In Development" | "Concept" | "Planned" | "Active" | "Core";
  /** Visual color applied to the stage badge. */
  stageColor: StageColor;
  /** Long-form blurb shown in the textual section below the map. */
  description: string;
  /** Compliance / status footnote shown beneath the description. */
  detail: string;
  /** Internal route the venture links to. */
  href: string;
  /** Position on the venture map, expressed as percentages of the canvas (0–100). */
  pos: { x: number; y: number };
  /** Optional size multiplier (1 = baseline). Used to give the central / parent venture a slightly larger visual weight. */
  size?: number;
}

export const ventures: Venture[] = [
  {
    id: "legal",
    name: "Arkhe Legal",
    vertical: "Legal Infrastructure",
    stage: "Forming",
    stageColor: "yellow",
    description:
      "Reserved for the development of a licensed legal practice and supporting infrastructure. Focused on compliant legal services, contract systems, and the legal frameworks required to support both internal ventures and external clients.",
    detail:
      "Future legal services will be offered only through a properly licensed law practice in full compliance with applicable rules.",
    href: "/legal",
    pos: { x: 18, y: 24 },
  },
  {
    id: "ai",
    name: "Arkhe AI Systems",
    vertical: "Technology / AI",
    stage: "In Development",
    stageColor: "teal",
    description:
      "Applied AI, automation workflows, and internal operating systems. Includes research assistants, decision-support tools, and scalable automation designed to increase efficiency across all Arkhe entities.",
    detail:
      "Currently building internal tooling and proof-of-concept automation systems.",
    href: "/technology",
    pos: { x: 78, y: 24 },
  },
  {
    id: "capital",
    name: "Arkhe Capital",
    vertical: "Investments & Holdings",
    stage: "Forming",
    stageColor: "yellow",
    description:
      "Long-term ownership of digital assets, intellectual property, domains, and operating companies. Provides the financial architecture for the broader Arkhe system.",
    detail:
      "Entity structure and asset acquisition strategy in formation.",
    href: "/holdings",
    pos: { x: 50, y: 50 },
    size: 1.2,
  },
  {
    id: "anon",
    name: "ANON Network",
    vertical: "Privacy / Community",
    stage: "Concept",
    stageColor: "purple",
    description:
      "A privacy-focused digital ecosystem built around anonymous identity and decentralized interaction. Designed to support secure communication, community infrastructure, and long-term ecosystem development.",
    detail: "Architecture and community model under active design.",
    href: "/media",
    pos: { x: 20, y: 78 },
  },
  {
    id: "media",
    name: "Arkhe Media",
    vertical: "Media / Publishing",
    stage: "Planned",
    stageColor: "slate",
    description:
      "A centralized platform for publishing, education, and documentation. Houses written work, technical breakdowns, founder notes, and ongoing development insights across all ventures.",
    detail:
      "Launch planned after core technology infrastructure is established.",
    href: "/insights",
    pos: { x: 80, y: 78 },
  },
];

// Connections between ventures. Used by VentureGeomMap to render the faint
// always-on connection web; on hover, the lines that touch the active venture
// brighten.
export const ventureLinks: Array<[string, string]> = [
  ["legal", "capital"],
  ["ai", "capital"],
  ["anon", "capital"],
  ["media", "capital"],
  ["legal", "ai"],
  ["anon", "media"],
  ["legal", "anon"],
  ["ai", "media"],
];

export function getVenture(id: string): Venture | undefined {
  return ventures.find((v) => v.id === id);
}

export const stageBadgeClasses: Record<StageColor, string> = {
  teal: "border-teal-300/40 bg-teal-400/15 text-teal-300",
  yellow: "border-yellow-300/30 bg-yellow-400/10 text-yellow-300",
  purple: "border-purple-300/30 bg-purple-400/10 text-purple-300",
  slate: "border-white/15 bg-white/5 text-white/60",
};
