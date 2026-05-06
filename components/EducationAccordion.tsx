"use client";

// Client-side accordion list for /education. Each row is a category that
// expands to reveal its items as links. State is local; the URL hash is
// kept in sync so deep-linking to /education#crypto opens that category.

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EducationCategory } from "@/lib/education";

interface Props {
  categories: EducationCategory[];
}

export default function EducationAccordion({ categories }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  // Hydrate the open category from the URL hash (#crypto, #blockchain, etc.).
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && categories.some((c) => c.id === hash)) {
      setOpen(hash);
      // Scroll into view after the layout settles.
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, [categories]);

  // Filter is applied to both category title and item title.
  const q = filter.trim().toLowerCase();
  const filteredCategories = q
    ? categories
        .map((c) => ({
          ...c,
          items: c.items.filter(
            (i) =>
              i.title.toLowerCase().includes(q) ||
              c.title.toLowerCase().includes(q),
          ),
        }))
        .filter((c) => c.items.length > 0)
    : categories;

  return (
    <div className="mt-10">
      <div className="mb-6 flex items-center gap-3">
        <input
          type="text"
          inputMode="search"
          placeholder="Filter by topic — e.g. bitcoin, dollar, tail risk"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-teal-300/50 focus:outline-none"
        />
        {filter && (
          <button
            type="button"
            onClick={() => setFilter("")}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs text-white/60 hover:bg-white/10"
          >
            Clear
          </button>
        )}
      </div>

      <div className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
        {filteredCategories.length === 0 && (
          <p className="px-6 py-8 text-sm text-white/50">
            No topics match &ldquo;{filter}&rdquo;.
          </p>
        )}
        {filteredCategories.map((cat) => {
          const isOpen = open === cat.id;
          return (
            <div key={cat.id} id={cat.id} className="scroll-mt-24">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`panel-${cat.id}`}
                onClick={() => {
                  const next = isOpen ? null : cat.id;
                  setOpen(next);
                  if (next && typeof window !== "undefined") {
                    history.replaceState(null, "", `#${next}`);
                  }
                }}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-teal-400/5 focus:bg-teal-400/5 focus:outline-none"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`text-teal-300 transition-transform ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    >
                      ▸
                    </span>
                    <h3 className="text-lg font-semibold text-white">
                      {cat.title}
                    </h3>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/55">
                      {cat.items.length}
                    </span>
                  </div>
                  {cat.blurb && (
                    <p className="mt-1 pl-6 text-sm text-white/50">
                      {cat.blurb}
                    </p>
                  )}
                </div>
                <span className="hidden text-xs uppercase tracking-widest text-white/40 sm:inline">
                  {isOpen ? "Hide" : "Open"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`panel-${cat.id}`}
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <ul className="grid grid-cols-1 gap-2 px-6 pb-6 sm:grid-cols-2 lg:grid-cols-3">
                      {cat.items.map((item) => (
                        <li key={item.slug}>
                          <Link
                            href={`/education/${cat.id}/${item.slug}`}
                            className="block rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition-colors hover:border-teal-300/40 hover:bg-teal-400/10 hover:text-white"
                          >
                            <span className="block font-medium">
                              {item.title}
                            </span>
                            <span className="mt-1 block truncate text-xs text-white/35">
                              {item.filePath}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
