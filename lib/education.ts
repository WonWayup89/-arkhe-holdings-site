// Education content loader — reads markdown files from content/education/
// at build time and exposes structured data for the /education hub and
// detail pages. No external markdown deps; the content follows a fixed
// shape (# Title → ## Beginner / Intermediate / Advanced → ## Related Topics)
// so a small inline parser keeps the build local-first.
//
// All exports are pure server-side helpers. They are imported only by
// server components in app/education/.

import fs from "node:fs";
import path from "node:path";

const CONTENT_ROOT = path.join(process.cwd(), "content", "education");

// ---------- types -----------------------------------------------------------

export interface EducationItem {
  /** Category folder under content/education, e.g. "blockchain" */
  category: string;
  /** File slug without .md, e.g. "bitcoin" */
  slug: string;
  /** Display title (first H1 or filename fallback) */
  title: string;
  /** Repo-relative path, useful for the future knowledge map */
  filePath: string;
}

export interface EducationCategory {
  /** Folder name on disk */
  id: string;
  /** Display title (Title Case, e.g. "Asset Classes") */
  title: string;
  /** Short blurb shown beside the dropdown header */
  blurb: string;
  /** Items inside this category, sorted by title */
  items: EducationItem[];
}

export type Section = {
  /** Heading text after `## `, e.g. "Beginner Level" */
  heading: string;
  /** Markdown body block belonging to this section */
  body: string;
};

export interface EducationDocument extends EducationItem {
  /** Whole markdown body minus the leading H1 */
  raw: string;
  /** Section-by-section split, in document order */
  sections: Section[];
  /** Slugs in the same category, used for prev/next navigation */
  siblings: { prev: EducationItem | null; next: EducationItem | null };
}

// ---------- category metadata ----------------------------------------------
// Curated display titles + blurbs for the categories we know about. Anything
// not in this map gets a sensible default derived from the folder name.

const CATEGORY_META: Record<string, { title: string; blurb: string }> = {
  ai_systems: {
    title: "AI Systems",
    blurb: "Multi-agent architectures, swarm reasoning, and applied AI.",
  },
  alternative_assets: {
    title: "Alternative Assets",
    blurb: "Private markets, hedge fund structures, and non-traditional exposure.",
  },
  arkhe_systems: {
    title: "Arkhe Systems",
    blurb: "The internal engine architecture powering Arkhe Market.",
  },
  asset_classes: {
    title: "Asset Classes",
    blurb: "The universe of investable categories and how they behave.",
  },
  blockchain: {
    title: "Blockchain",
    blurb: "Protocol mechanics, consensus, on-chain analytics, and infrastructure.",
  },
  commodities: {
    title: "Commodities",
    blurb: "Hard assets and the physical economy.",
  },
  crisis: {
    title: "Crisis Playbooks",
    blurb: "Behavior of markets during regime breaks and tail events.",
  },
  crypto: {
    title: "Crypto",
    blurb: "Digital assets, on-chain instruments, and crypto-native strategies.",
  },
  economics: {
    title: "Economics",
    blurb: "Monetary, fiscal, and structural drivers of capital markets.",
  },
  execution: {
    title: "Execution",
    blurb: "Order routing, microstructure, and trade implementation.",
  },
  foundations: {
    title: "Foundations",
    blurb: "First-principles concepts every investor should hold.",
  },
  fundamentals: {
    title: "Fundamentals",
    blurb: "Valuation frameworks and core financial analysis.",
  },
  fundamental_analysis: {
    title: "Fundamental Analysis",
    blurb: "Bottom-up research methodologies.",
  },
  geopolitics: {
    title: "Geopolitics",
    blurb: "How power, policy, and conflict reshape markets.",
  },
  glossary: {
    title: "Glossary",
    blurb: "Reference definitions used across the system.",
  },
  historical_events: {
    title: "Historical Events",
    blurb: "Pattern library of past regime shifts and market episodes.",
  },
  infrastructure: {
    title: "Infrastructure",
    blurb: "Plumbing of the financial system — clearing, settlement, custody.",
  },
  institutional: {
    title: "Institutional",
    blurb: "How allocators, banks, and large funds operate.",
  },
  macro: {
    title: "Macro",
    blurb: "Liquidity, the dollar system, rates, and the global cycle.",
  },
  market_structure: {
    title: "Market Structure",
    blurb: "Venues, depth, fragmentation, and the topology of trading.",
  },
  playbooks: {
    title: "Playbooks",
    blurb: "Reusable strategy scripts for specific regimes and setups.",
  },
  portfolio: {
    title: "Portfolio Construction",
    blurb: "Allocation, sizing, and how to build a coherent book.",
  },
  psychology: {
    title: "Psychology",
    blurb: "Behavioral finance, sentiment cycles, and trader discipline.",
  },
  quant: {
    title: "Quantitative Methods",
    blurb: "Models, statistics, and the mathematics of markets.",
  },
  real_estate: {
    title: "Real Estate",
    blurb: "Direct property, REITs, and real-asset exposure.",
  },
  risk_management: {
    title: "Risk Management",
    blurb: "Drawdown control, hedging, sizing, and tail-risk discipline.",
  },
  statistics: {
    title: "Statistics",
    blurb: "Probability, inference, and distributional reasoning.",
  },
  strategies: {
    title: "Strategies",
    blurb: "Named approaches to extracting return from markets.",
  },
  technical_analysis: {
    title: "Technical Analysis",
    blurb: "Chart-based methodologies and pattern recognition.",
  },
  traditional_finance: {
    title: "Traditional Finance",
    blurb: "The legacy financial system — banks, exchanges, instruments.",
  },
};

// ---------- helpers ---------------------------------------------------------

function toTitleCase(slug: string): string {
  return slug
    .split(/[_-]+/)
    .map((p) => (p ? p[0].toUpperCase() + p.slice(1) : p))
    .join(" ");
}

function readFileSafe(p: string): string | null {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return null;
  }
}

function extractTitle(raw: string, fallback: string): string {
  // First H1 line, falling back to the filename in title case.
  const m = raw.match(/^#\s+(.+?)\s*$/m);
  return m ? m[1].trim() : toTitleCase(fallback);
}

function bodyAfterTitle(raw: string): string {
  // Everything after the first H1 line. If no H1, return raw.
  const idx = raw.search(/^#\s+.+$/m);
  if (idx === -1) return raw;
  const afterFirstNewline = raw.indexOf("\n", idx);
  return afterFirstNewline === -1 ? "" : raw.slice(afterFirstNewline + 1).trimStart();
}

function splitSections(body: string): Section[] {
  // Split on `## ` headings. Lines that are heading lines become section
  // boundaries; everything in between is the section body.
  const lines = body.split("\n");
  const sections: Section[] = [];
  let current: Section | null = null;
  let preamble: string[] = [];

  for (const line of lines) {
    const m = line.match(/^##\s+(.+?)\s*$/);
    if (m) {
      if (current) sections.push(current);
      current = { heading: m[1].trim(), body: "" };
    } else if (current) {
      current.body += (current.body ? "\n" : "") + line;
    } else {
      preamble.push(line);
    }
  }
  if (current) sections.push(current);

  // If there's preamble content before any ##, expose it as an unnamed section.
  const trimmedPreamble = preamble.join("\n").trim();
  if (trimmedPreamble) {
    sections.unshift({ heading: "", body: trimmedPreamble });
  }

  // Trim each section body.
  for (const s of sections) s.body = s.body.trim();

  return sections;
}

// ---------- public API ------------------------------------------------------

let _cache: EducationCategory[] | null = null;

/**
 * Returns every category, with its items, sorted by category title.
 * Categories with zero items are filtered out.
 */
export function getCategories(): EducationCategory[] {
  if (_cache) return _cache;

  if (!fs.existsSync(CONTENT_ROOT)) {
    _cache = [];
    return _cache;
  }

  const folders = fs
    .readdirSync(CONTENT_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const categories: EducationCategory[] = folders
    .map((folder) => {
      const dir = path.join(CONTENT_ROOT, folder);
      const files = fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".md"))
        .map((f) => path.basename(f, ".md"));

      const items: EducationItem[] = files
        .map((slug) => {
          const filePath = path.join(dir, `${slug}.md`);
          const raw = readFileSafe(filePath) ?? "";
          const title = extractTitle(raw, slug);
          return {
            category: folder,
            slug,
            title,
            filePath: `content/education/${folder}/${slug}.md`,
          };
        })
        .sort((a, b) => a.title.localeCompare(b.title));

      const meta = CATEGORY_META[folder] ?? {
        title: toTitleCase(folder),
        blurb: "",
      };

      return {
        id: folder,
        title: meta.title,
        blurb: meta.blurb,
        items,
      };
    })
    .filter((c) => c.items.length > 0)
    .sort((a, b) => a.title.localeCompare(b.title));

  _cache = categories;
  return _cache;
}

/** Look up a single category. */
export function getCategory(id: string): EducationCategory | null {
  return getCategories().find((c) => c.id === id) ?? null;
}

/** Look up a single item without rendering its body. */
export function getItem(category: string, slug: string): EducationItem | null {
  const cat = getCategory(category);
  if (!cat) return null;
  return cat.items.find((i) => i.slug === slug) ?? null;
}

/**
 * Load a single document, including its parsed sections. Reads from disk
 * (no caching of the raw body — only of the category index).
 */
export function getDocument(
  category: string,
  slug: string,
): EducationDocument | null {
  const item = getItem(category, slug);
  if (!item) return null;

  const fullPath = path.join(process.cwd(), item.filePath);
  const raw = readFileSafe(fullPath);
  if (raw === null) return null;

  const body = bodyAfterTitle(raw);
  const sections = splitSections(body);

  // Sibling navigation
  const cat = getCategory(category)!;
  const idx = cat.items.findIndex((i) => i.slug === slug);
  const prev = idx > 0 ? cat.items[idx - 1] : null;
  const next = idx >= 0 && idx < cat.items.length - 1 ? cat.items[idx + 1] : null;

  return {
    ...item,
    raw,
    sections,
    siblings: { prev, next },
  };
}

/** Flat list of every item — useful for sitemap generation. */
export function getAllItems(): EducationItem[] {
  return getCategories().flatMap((c) => c.items);
}

/**
 * Aggregate counts. Used by the hero on /education to surface
 * "30 categories · 355 modules" without re-walking the tree.
 */
export function getStats(): { categoryCount: number; itemCount: number } {
  const cats = getCategories();
  return {
    categoryCount: cats.length,
    itemCount: cats.reduce((sum, c) => sum + c.items.length, 0),
  };
}
