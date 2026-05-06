# Arkhe Intersecting Knowledge Map & Geometric UI Layer

**Status:** Design spec, ready to build
**Owner:** Arkhe Holdings — Knowledge Architecture
**Companion files:**
- `design/graph_examples/crypto_btc_subgraph.json` — concrete sample
- `design/schemas/node.schema.json` — node contract
- `design/schemas/edge.schema.json` — edge contract

---

## 0. Build philosophy

Arkhe is a navigable intelligence architecture, not a static documentation site. Every markdown file under `content/education/**` is a node in a living ontology. The constellation UI is the surface; the graph is the substrate. The substrate must be:

1. **Local-first.** The full graph builds, queries, and renders without a network round-trip to any cloud LLM. Cloud AI is reserved for offline enrichment passes only.
2. **Deterministic at build time.** Given the same content tree, the same graph emerges. No randomness in core relationships.
3. **Incrementally rebuildable.** A single edit to a single `.md` file should cost milliseconds, not minutes.
4. **Visually coherent with the existing system.** The constellation must speak the same geometric language as `components/HeroNetwork.tsx` and `components/VentureGeomMap.tsx` — deep-space gradient, geodesic polyhedra, perspective grid, framer-motion easing curves.

Everything below serves those four constraints.

---

## 1. Knowledge intersection detection logic

A *knowledge intersection* is any place two markdown nodes share meaningful structure or meaning. Each detector below is an independent signal; the relationship weight formula in §4 fuses them.

### 1.1 Detectors

The indexer runs eight detectors over every pair of nodes. Each emits a per-edge contribution score in `[0, 1]`.

| ID  | Detector             | Source of signal                                                                  | Cost  |
| --- | -------------------- | --------------------------------------------------------------------------------- | ----- |
| D1  | explicit_link        | Markdown link `[X](../path/X.md)` or "Related Topics" list block                  | O(1)  |
| D2  | shared_tags          | Frontmatter `tags:` array intersection / Jaccard                                  | O(t)  |
| D3  | category_sibling     | Same parent directory under `content/education/**`                                | O(1)  |
| D4  | keyword_overlap      | TF-IDF over Beginner / Intermediate / Advanced section bodies                     | O(n)  |
| D5  | semantic_similarity  | Cosine over local sentence-transformer embedding of the file summary              | O(d)  |
| D6  | agent_overlap        | Both files reference the same Arkhe agent (Risk, Macro, Liquidity, etc.)          | O(a)  |
| D7  | regime_overlap       | Both files declare the same `regime_relevance` (risk-on, deleveraging, …)         | O(r)  |
| D8  | doctrine_anchor      | Both files inherit from the same doctrine node (e.g. `arkhe_strategic_doctrine`)  | O(1)  |

### 1.2 Where the signals come from

Every `.md` under `content/education/` is parsed into:

```yaml
---
title: Bitcoin
slug: bitcoin
category: blockchain
tags: [btc, store-of-value, digital-assets, halving, on-chain]
doctrine_level: 2
connected_agents: [technical, macro, liquidity, risk, portfolio]
risk_level: high
regime_relevance: [risk-on, late-cycle, liquidity-driven]
asset_class: digital_assets
strategy: [basis_trade, vol_selling, treasury_allocation]
summary: >
  Decentralized digital store of value with fixed supply and four-year
  halving cycles. Functions as risk asset in expansion, potential reserve
  in liquidity crises.
---
```

Files that lack this frontmatter today get backfilled by the indexer in Phase 1 (see §10) using rule-based extraction over the existing `## Beginner / Intermediate / Advanced / Related Topics` skeleton already present in every file.

### 1.3 Direct, secondary, tertiary connections

After detectors run, every edge is graded by hop distance from a focal node:

- **Direct (1-hop):** `relationship_weight ≥ 0.55` and explicit_link OR shared_tags ≥ 0.5
- **Secondary (2-hop):** reached through one direct neighbor; brightness halved
- **Tertiary (3-hop):** reached through two direct neighbors; rendered as faint background filaments only when the user has locked focus on a node

The UI never renders 4+ hop edges. They exist in the cache for graph algorithms (centrality, shortest-path) but are visually inert.

---

## 2. Graph node schema

Every node — one per `.md` file — conforms to `design/schemas/node.schema.json`.

```jsonc
{
  "node_id": "blockchain__bitcoin",                       // <category>__<slug>
  "title": "Bitcoin",
  "category": "blockchain",                               // top-level folder under content/education
  "subcategory": null,                                    // optional, for future nesting
  "file_path": "content/education/blockchain/bitcoin.md", // canonical, repo-relative, POSIX
  "tags": ["btc", "store-of-value", "digital-assets", "halving", "on-chain"],
  "doctrine_level": 2,                                    // 0=foundational doctrine, 1=core, 2=applied, 3=tactical
  "connected_agents": ["technical", "macro", "liquidity", "risk", "portfolio"],
  "risk_level": "high",                                   // low | medium | high | tail
  "regime_relevance": ["risk-on", "late-cycle", "liquidity-driven"],
  "asset_class": "digital_assets",                        // optional, when applicable
  "strategy": ["basis_trade", "vol_selling", "treasury_allocation"],
  "summary": "Decentralized digital store of value...",   // 1–3 sentence anchor
  "relationship_count": 11,                               // populated post-build
  "centrality": 0.74,                                     // 0–1 betweenness, populated post-build
  "geom": {
    "shape": "icosahedron",                               // see §7 for shape vocabulary
    "scale": 1.6,                                         // base render size multiplier
    "color_token": "--arkhe-cyan-300"                     // resolves through CSS var palette
  }
}
```

**Naming rule.** `node_id` is `<category>__<slug>` with double underscore. This is stable across renames of the *file* (the slug is canonical), and unique across the entire content tree. Aliases for previous IDs live in a side index `cache/aliases.json`.

**Required vs optional.** Required: `node_id`, `title`, `category`, `file_path`, `tags`, `summary`, `doctrine_level`. Everything else is enriched and may be `null` on a freshly indexed node.

---

## 3. Graph edge schema

Every edge conforms to `design/schemas/edge.schema.json`.

```jsonc
{
  "edge_id": "blockchain__bitcoin--asset_classes__digital_assets",
  "source_node": "blockchain__bitcoin",
  "destination_node": "asset_classes__digital_assets",
  "source_file_path": "content/education/blockchain/bitcoin.md",
  "destination_file_path": "content/education/asset_classes/digital_assets.md",
  "relationship_type": "core",                  // see vocabulary below
  "relationship_weight": 0.92,                  // 0–1, see §4
  "confidence_score": 0.97,                     // detector agreement, see §4.4
  "generated_by": ["explicit_link", "shared_tags", "category_sibling"],
  "doctrine_relevance": 0.6,                    // 0 if unrelated to a doctrine node
  "macro_relevance": 0.4,                       // 0 if unrelated to macro layer
  "hop_class": "direct",                        // direct | secondary | tertiary
  "bidirectional": true,                        // edges are stored once, rendered both ways
  "last_built": "2026-05-06T14:00:00Z"
}
```

### 3.1 Relationship type vocabulary

Exactly ten types, matching the spec:

```
core                  // primary definitional link (BTC → digital_assets)
supporting            // a topic that adds context but isn't definitional
risk                  // one node materially shapes the other's risk profile
macro                 // shared macro driver (liquidity, dollar, rates)
liquidity             // shared liquidity venue, depth, or flow channel
execution             // shared execution venue, microstructure, or routing path
historical_analogue   // current pattern echoes a past episode
doctrine              // both inherit from the same Arkhe doctrine node
agent_routing         // both are consumed by the same agent in the swarm
scenario              // both appear together in a defined scenario / playbook
```

A single edge has exactly one `relationship_type`. When detectors disagree, the type with the highest contributing weight wins; ties break in the order above (which encodes precedence).

---

## 4. Relationship weight formula

The weight is a fused score in `[0, 1]`. Each detector emits its contribution `c_i ∈ [0, 1]`; each has a tunable coefficient `α_i` set in `lib/graph/weights.ts`. The default coefficients are:

| Detector              | α (default) | Notes                                                  |
| --------------------- | ----------- | ------------------------------------------------------ |
| explicit_link (D1)    | 0.30        | Highest single signal; an explicit link is intent      |
| shared_tags (D2)      | 0.18        | Jaccard on tag arrays                                  |
| category_sibling (D3) | 0.10        | Same folder under content/education                    |
| keyword_overlap (D4)  | 0.12        | TF-IDF cosine, body text only                          |
| semantic_similarity   | 0.15        | Local embedding cosine, summary field                  |
| agent_overlap (D6)    | 0.08        | Jaccard on connected_agents                            |
| regime_overlap (D7)   | 0.04        | Jaccard on regime_relevance                            |
| doctrine_anchor (D8)  | 0.03        | Binary 1 if same doctrine ancestor                     |

Sum of α = **1.00**.

### 4.1 Raw weight

```
raw_weight = Σ (α_i · c_i)
```

### 4.2 Normalization

Then apply a soft sigmoid to compress noise near zero:

```
relationship_weight = clamp01( 1 / (1 + exp(-6 · (raw_weight - 0.4))) )
```

The constants `6` (steepness) and `0.4` (midpoint) are exposed in `lib/graph/weights.ts` so they can be tuned without a code change to the indexer.

### 4.3 Hop class assignment

```
direct     if relationship_weight ≥ 0.55
secondary  if 0.30 ≤ relationship_weight < 0.55
tertiary   if 0.15 ≤ relationship_weight < 0.30
dropped    if relationship_weight < 0.15
```

### 4.4 Confidence

`confidence_score` is *not* the weight. It measures detector agreement:

```
confidence_score = (#detectors with c_i > 0) / 8
```

A high weight from a single detector (e.g. only `explicit_link`) yields a moderate confidence score, which the UI uses to render line *style* (solid for high confidence, dashed for low). This visually separates "two files are linked because the author said so" from "two files are linked because eight signals quietly agree" — both are valid, but they read differently.

### 4.5 Doctrine and macro relevance

These are computed independently and stored on the edge so the UI can recolor:

```
doctrine_relevance = max(c_doctrine_anchor, 0.5 if either node has doctrine_level == 0)
macro_relevance    = c_regime_overlap · 0.5 + (0.5 if either node.category == 'macro')
```

---

## 5. UI hover behavior logic

The UI is a state machine. There is exactly one *focused* node and zero or one *locked* node at any time.

### 5.1 States

```
idle           → no node focused, ambient drift only
hover(n)       → cursor over n, local constellation expanded around n
hover_held(n)  → cursor left n recently; constellation persists for 250ms grace
locked(n)      → user clicked n; focus is sticky until ESC or click on canvas
locked+hover(n, m) → user has locked n and is now hovering m to compare
```

### 5.2 Visual rules per state

| State              | Focal node          | Direct neighbors        | Secondary       | Tertiary    | Unrelated   |
| ------------------ | ------------------- | ----------------------- | --------------- | ----------- | ----------- |
| idle               | normal              | normal                  | faint           | hidden      | normal      |
| hover(n)           | scale 1.25, glow    | pulse, lines bright     | dim 0.5         | hidden      | dim 0.2     |
| hover_held(n)      | same as hover(n)    | same                    | same            | hidden      | same        |
| locked(n)          | scale 1.4, ring     | pulse, lines bright     | visible 0.6     | filament    | dim 0.15    |
| locked+hover(n, m) | both highlighted    | union of both sets      | union           | union       | dim 0.1     |

Pulse, glow, and dim values use the same CSS variable palette already in `app/globals.css`. No new colors are introduced.

### 5.3 Behavioral rules

1. Hover expands the *local* constellation only. The global graph never re-lays-out on hover. This is critical for performance and for the user's spatial memory.
2. Click locks. ESC, click on empty canvas, or clicking the same node again unlocks.
3. Clicking a locked node's *summary card* deep-links to its `file_path` (opens the rendered insight page).
4. Clicking a locked node's *related neighbor* re-locks to that neighbor and the constellation animates the transition over 320ms (framer-motion `easeInOut`).
5. Right-arrow / left-arrow navigates locked focus through neighbors in order of decreasing weight.
6. `/` opens a search palette that resolves to nodes by title or tag.
7. `f` toggles a filter drawer (see §7.3 filter taxonomy).

### 5.4 Hover prefetch

On `mouseenter`, the UI fetches the locked-state subgraph for that node from the cache (see §13). Latency budget: **<8ms** off cache, **<60ms** if cache miss + worker rebuild. This is what makes hover feel instant.

---

## 6. Example graph JSON for Crypto and BTC

The full example lives at `design/graph_examples/crypto_btc_subgraph.json`. A condensed view:

```jsonc
{
  "graph_meta": {
    "generated_at": "2026-05-06T14:00:00Z",
    "indexer_version": "0.1.0",
    "node_count": 14,
    "edge_count": 24,
    "scope": "crypto_btc_constellation"
  },
  "nodes": [
    {
      "node_id": "blockchain__bitcoin",
      "title": "Bitcoin",
      "category": "blockchain",
      "file_path": "content/education/blockchain/bitcoin.md",
      "tags": ["btc","store-of-value","digital-assets","halving","on-chain"],
      "doctrine_level": 2,
      "connected_agents": ["technical","macro","liquidity","risk","portfolio"],
      "risk_level": "high",
      "regime_relevance": ["risk-on","late-cycle","liquidity-driven"],
      "summary": "Decentralized digital store of value with fixed supply and halving cycles."
    },
    { "node_id": "asset_classes__digital_assets", "...": "..." },
    { "node_id": "macro__dollar_system", "...": "..." },
    { "node_id": "macro__global_liquidity", "...": "..." },
    { "node_id": "macro__energy_markets", "...": "..." },
    { "node_id": "strategies__volatility_trading", "...": "..." },
    { "node_id": "psychology__sentiment_cycles", "...": "..." },
    { "node_id": "risk_management__tail_risk", "...": "..." },
    { "node_id": "risk_management__portfolio_hedging", "...": "..." },
    { "node_id": "arkhe_systems__arkhe_liquidity_engine", "...": "..." },
    { "node_id": "arkhe_systems__arkhe_risk_engine", "...": "..." }
  ],
  "edges": [
    {
      "edge_id": "blockchain__bitcoin--asset_classes__digital_assets",
      "source_node": "blockchain__bitcoin",
      "destination_node": "asset_classes__digital_assets",
      "source_file_path": "content/education/blockchain/bitcoin.md",
      "destination_file_path": "content/education/asset_classes/digital_assets.md",
      "relationship_type": "core",
      "relationship_weight": 0.92,
      "confidence_score": 0.88,
      "generated_by": ["explicit_link","shared_tags","category_sibling"],
      "doctrine_relevance": 0.6,
      "macro_relevance": 0.2,
      "hop_class": "direct"
    }
  ]
}
```

See the full file for the populated 14-node, 24-edge example covering BTC's complete one-hop constellation.

---

## 7. Suggested geometric layouts

Five layouts, each tuned to a specific viewing intent. The user can switch between them via a layout-picker in the lower-right of the canvas. All five share the same geodesic polyhedron rendering primitive defined in `components/VentureGeomMap.tsx`.

### 7.1 Constellation (default)

**Use when:** general browsing, no locked focus.
**Algorithm:** force-directed (Fruchterman-Reingold) seeded by category clustering, then frozen. Stars in the background are the existing `STARS` array from `HeroNetwork`.
**Strength:** organic, navigable, matches the brand's "deep space" feel.

### 7.2 Web

**Use when:** the user wants to compare two locked nodes.
**Algorithm:** the two locked nodes are placed at golden-ratio horizontal anchors; their direct neighbors fan out in arcs above and below. Edges become bent splines.
**Strength:** comparison, intersection visibility.

### 7.3 Shield

**Use when:** the user is exploring doctrine and risk topology.
**Algorithm:** doctrine_level 0 nodes form an inner hexagonal ring, level 1 nodes the next ring, level 2/3 the outer rings. Looks like nested shields. Risk-tier color overlays.
**Strength:** governance and risk hierarchy at a glance.

### 7.4 Pyramid

**Use when:** strategy / playbook view.
**Algorithm:** macro nodes at apex, intermediate strategies in the middle band, tactical playbooks at the base. Edges flow downward, gravity-styled.
**Strength:** shows the chain from doctrine → macro → strategy → execution.

### 7.5 Radial graph

**Use when:** drilling into a single node's full graph (locked + tertiary).
**Algorithm:** locked node at center, neighbors placed on concentric rings by hop class, angle by category. Same primitive as `VentureGeomMap` but parameterized.
**Strength:** absolute clarity on what connects to what.

### 7.6 Filter taxonomy

Filters are layered, not exclusive. Each filter dims non-matching nodes to opacity 0.1 rather than removing them — preserving spatial memory.

```
agent           ∈ {technical, macro, liquidity, risk, portfolio,
                   sentiment, execution, research, supervisor}
category        ∈ all top-level dirs under content/education
risk_type       ∈ {market, credit, liquidity, operational, tail, regime}
asset_class     ∈ {digital_assets, equities, fx, rates, commodities, …}
strategy        ∈ all values across nodes
doctrine        ∈ doctrine_level 0/1/2/3
regime          ∈ {risk-on, risk-off, deleveraging, late-cycle, liquidity-driven, …}
macro_layer     ∈ {monetary, fiscal, geopolitical, energy, demographic, …}
```

---

## 8. Frontend implementation plan

### 8.1 Stack

The site is on Next.js 16 with React 19, Tailwind v4, framer-motion, no animation libraries beyond what already ships. The constellation page reuses what's already there.

### 8.2 Routes & files (new)

```
app/atlas/
  page.tsx                       # the constellation page
  loading.tsx                    # skeleton
  layout.tsx                     # full-bleed layout, no nav padding
components/atlas/
  AtlasCanvas.tsx                # the SVG canvas + camera
  AtlasNode.tsx                  # one polyhedron + label
  AtlasEdge.tsx                  # one line, with brightness/dash logic
  AtlasDetailCard.tsx            # the locked-state card
  AtlasFilterDrawer.tsx          # the f-key drawer
  AtlasSearchPalette.tsx         # the / palette
  AtlasLayoutPicker.tsx          # constellation / web / shield / pyramid / radial
  hooks/
    useAtlasGraph.ts             # loads the cache, exposes subgraph slices
    useAtlasState.ts             # finite state machine for hover/lock
    useAtlasCamera.ts            # pan/zoom, keyboard nav
lib/graph/
  index.ts                       # public API (loadGraph, getNeighborhood, search)
  detectors.ts                   # 8 detectors from §1
  weights.ts                     # tunable α and sigmoid params from §4
  schema.ts                      # zod parsers for node/edge
  layout/
    constellation.ts
    web.ts
    shield.ts
    pyramid.ts
    radial.ts
scripts/
  index_content.ts               # walks content/education, emits cache
  rebuild_graph.ts               # full rebuild
  rebuild_node.ts                # incremental rebuild for one file
public/cache/graph/
  graph.full.json                # the whole graph (gzipped at deploy)
  neighborhoods/<node_id>.json   # per-node 1-hop precomputed
  slices/<category>.json         # per-category precomputed
  index.fts.json                 # title/tag full-text search index
  meta.json                      # build hash, timestamps, counts
```

### 8.3 Rendering

SVG, not Canvas, for the first cut — the existing `VentureGeomMap` and `HeroNetwork` are SVG, and 355 nodes fit comfortably under SVG performance ceilings. If profiling shows >12ms paints, we lift only edges to a single Canvas underlay (nodes stay SVG for accessibility / hit-testing).

### 8.4 Styling

Reuse the existing palette and gradients. New tokens go in `app/globals.css`:

```css
:root {
  --atlas-bg-1: #050912;
  --atlas-bg-2: #0a1628;
  --atlas-edge-direct: rgba(140, 220, 255, 0.85);
  --atlas-edge-secondary: rgba(140, 220, 255, 0.35);
  --atlas-edge-tertiary: rgba(140, 220, 255, 0.12);
  --atlas-doctrine: #f0c674;
  --atlas-risk: #e76f51;
  --atlas-macro: #8ab4f8;
}
```

### 8.5 Animation

framer-motion `easeOut` 220ms for hover-in, `easeIn` 180ms for hover-out, `easeInOut` 320ms for lock transitions. No spring physics — the brand wants precision, not bounce.

### 8.6 Accessibility

Every node is a `<button>` with an `aria-label` of `${title} — ${category}, ${relationship_count} connections`. Tab order follows category, then alphabetical within category. The `/` palette is the keyboard-first path; the canvas is decorative for assistive tech.

---

## 9. Local-first performance strategy

The graph never makes a network call to an LLM during normal operation. Period.

### 9.1 What runs locally, always

- Indexing
- All 8 detectors
- Weight computation
- Layout solving
- Hover prefetch
- Search

### 9.2 What may use a local LLM (optional, offline only)

A `scripts/enrich.ts` pass — run *manually* before commits or in a nightly job — uses a locally-hosted small model (Ollama with `nomic-embed-text` for embeddings, `llama3.2:3b` for extraction) to:

- Generate the `summary` field if the markdown lacks one
- Compute the embedding vector for D5 semantic similarity
- Suggest tags the author missed (suggestions only — author must accept)
- Suggest doctrine-level for unannotated files

These outputs are cached on disk. Subsequent indexer runs read the cache; they never re-call the model unless the file's content hash changed.

### 9.3 What is explicitly forbidden

- Calling any cloud LLM from the runtime UI
- Generating relationships at request time
- Fetching the full graph on every hover
- Re-laying-out the global graph on hover or lock

### 9.4 Data sizes (projected)

At the current 355 files:

```
graph.full.json (uncompressed) ≈ 1.4 MB
graph.full.json (gzip)         ≈ 230 KB
neighborhoods/<node>.json avg  ≈ 4 KB
slices/<category>.json avg     ≈ 60 KB
index.fts.json                 ≈ 80 KB
```

These are well inside the budget for a first paint under 1.5s on a cold load.

### 9.5 Storage tier

- **JSON files in `public/cache/graph/`** for everything the UI consumes. Static, CDN-cacheable, immutable per build.
- **SQLite (`cache/graph.sqlite`)** for the indexer's working set during a build. Not shipped to the client. Tables: `nodes`, `edges`, `tags`, `embeddings`. Lets the indexer run set-based queries (e.g. "all nodes that share ≥3 tags with this one").
- **DuckDB** is optional and only useful if the analyst wants to run SQL exploration over the graph from the CLI. Not on the runtime path.
- **NetworkX** is the test/analysis fixture — the indexer can dump the graph to NetworkX in `scripts/analyze.py` for centrality, community detection, and shortest-path scripts that inform tuning of α coefficients.

---

## 10. Build phases

Sequential and incremental. Each phase ships independently and the site still works without the next phase.

### Phase 1 — Frontmatter backfill (week 1)

Walk every `.md`. For files missing frontmatter, run a deterministic rule-based extractor:

- `title` ← first `# ` heading
- `slug` ← filename without `.md`
- `category` ← parent directory name
- `tags` ← deduped lowercase tokens from existing "Related Topics" links + headings
- `doctrine_level` ← rule table: arkhe_systems→1, foundations→0, playbooks→3, default→2
- `summary` ← first paragraph after the `## Beginner Level` heading

Emit a single PR per category. Authors review.

### Phase 2 — Indexer (week 2)

`scripts/index_content.ts` walks `content/education/**`, parses frontmatter, builds the SQLite working set, and emits an empty edge table. The full graph builds, just with no relationships yet — proof of round-trip.

### Phase 3 — Detectors D1–D3 (week 2)

Add explicit_link, shared_tags, category_sibling. These are deterministic and require no embeddings. They alone produce a usable graph.

### Phase 4 — Detectors D4 (week 3)

Add TF-IDF keyword overlap. Local, no model. Stored alongside.

### Phase 5 — Cache emission (week 3)

Emit `graph.full.json`, `neighborhoods/`, `slices/`, `index.fts.json`. This is the build-time contract; the UI now has data to consume.

### Phase 6 — UI shell (week 4)

`app/atlas/page.tsx`, `AtlasCanvas`, `AtlasNode`, `AtlasEdge`. Constellation layout only. No hover state yet — the graph just renders, statically.

### Phase 7 — Hover & lock (week 4)

The state machine from §5. Hover prefetch, lock transitions, detail card.

### Phase 8 — Filters & search (week 5)

The filter drawer (`f`) and search palette (`/`).

### Phase 9 — Detectors D5–D8 + enrichment (week 5)

Embeddings via local Ollama. Agent / regime / doctrine overlap. Re-emit cache.

### Phase 10 — Layouts (week 6)

Web, shield, pyramid, radial. Layout picker in the canvas.

### Phase 11 — Regime & doctrine overlays (week 7)

The dynamic recolor — a single dropdown that re-tints the graph by current regime.

### Phase 12 — Agent routing visualization (week 7)

Each agent's view: what nodes does Risk Agent care about, which routes does Macro Agent traverse.

---

## 11. File indexing architecture

### 11.1 Walker

```
scripts/index_content.ts
  → read every file matching content/education/**/*.md
  → for each file:
      hash = sha256(file_contents)
      if hash matches cache/graph.sqlite::nodes.content_hash → skip parse
      else:
        parse frontmatter (gray-matter)
        parse body (remark) → extract:
          - markdown links pointing into content/education/**
          - section headings (Beginner / Intermediate / Advanced / Related Topics)
          - inline mentions of agents, regimes, asset classes
        upsert into nodes table
        re-tokenize body for TF-IDF terms table
```

### 11.2 Tables (SQLite working set)

```sql
CREATE TABLE nodes (
  node_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  file_path TEXT NOT NULL UNIQUE,
  content_hash TEXT NOT NULL,
  frontmatter_json TEXT NOT NULL,
  body_tokens INTEGER NOT NULL,
  last_indexed TEXT NOT NULL
);

CREATE TABLE tags (
  node_id TEXT NOT NULL,
  tag TEXT NOT NULL,
  PRIMARY KEY (node_id, tag)
);

CREATE TABLE explicit_links (
  source_node TEXT NOT NULL,
  destination_node TEXT NOT NULL,
  PRIMARY KEY (source_node, destination_node)
);

CREATE TABLE terms (
  node_id TEXT NOT NULL,
  term TEXT NOT NULL,
  tf REAL NOT NULL,
  PRIMARY KEY (node_id, term)
);

CREATE TABLE embeddings (
  node_id TEXT PRIMARY KEY,
  vector BLOB NOT NULL,
  model TEXT NOT NULL,
  computed_at TEXT NOT NULL
);

CREATE TABLE edges (
  edge_id TEXT PRIMARY KEY,
  source_node TEXT NOT NULL,
  destination_node TEXT NOT NULL,
  relationship_type TEXT NOT NULL,
  relationship_weight REAL NOT NULL,
  confidence_score REAL NOT NULL,
  generated_by_json TEXT NOT NULL,
  doctrine_relevance REAL NOT NULL,
  macro_relevance REAL NOT NULL,
  hop_class TEXT NOT NULL,
  last_built TEXT NOT NULL
);

CREATE INDEX idx_edges_source ON edges(source_node);
CREATE INDEX idx_edges_destination ON edges(destination_node);
CREATE INDEX idx_edges_weight ON edges(relationship_weight DESC);
```

### 11.3 Output layer

After all detectors run, the indexer pivots SQLite into the JSON cache files (§8.2). The JSON files are what ships; SQLite stays in `cache/` (gitignored).

---

## 12. Dynamic relationship rebuilding logic

### 12.1 Triggers

```
git pre-commit hook  → run rebuild_changed.ts on the diff
local file watcher   → in dev, watch content/education/**, debounce 500ms
CI build             → full rebuild_graph.ts before next build
manual               → npm run graph:rebuild
```

### 12.2 Incremental algorithm (`rebuild_changed.ts`)

For each changed file `f`:

1. Recompute its node row.
2. Identify the set `N(f)` = direct neighbors before this change ∪ direct neighbors after this change. This is the *blast radius*.
3. Re-run all 8 detectors only for pairs `(f, n) where n ∈ N(f)`. Detectors that need pairs not involving `f` are skipped.
4. Upsert affected edges; delete edges that no longer exceed the drop threshold.
5. Rebuild only the affected `neighborhoods/<node_id>.json` files (`{f} ∪ N(f)`), and any `slices/<category>.json` whose category appears in that set.
6. Update `meta.json` build hash.

A typical single-file edit touches 5–15 neighbors and finishes in well under one second.

### 12.3 Full rebuild

`rebuild_graph.ts` truncates the SQLite working set, walks the entire tree, runs all detectors pairwise (O(N²) but N ≈ 355 → 63K pairs, milliseconds), emits the full cache. Run on first install, after major doctrine refactors, and in CI.

### 12.4 Author-driven overrides

Authors can pin or veto relationships in `content/education/_overrides.yaml`:

```yaml
pins:
  - source: blockchain__bitcoin
    destination: macro__energy_markets
    relationship_type: macro
    weight: 0.7
    reason: "BTC hashrate is energy-priced; this link must always render."
vetoes:
  - source: blockchain__bitcoin
    destination: glossary__beta
    reason: "Coincidental keyword overlap, not a real relationship."
```

The rebuilder applies overrides last, so they always win.

---

## 13. Cached graph optimization strategy

### 13.1 Multi-tier cache

```
Tier 1 — graph.full.json
  Loaded once on /atlas page mount. Sliced in the browser for global views.

Tier 2 — neighborhoods/<node_id>.json
  Loaded on hover prefetch. 1-hop subgraph plus tertiary metadata stripped of bodies.
  Average 4 KB. Cache key = node_id. HTTP immutable for a build hash.

Tier 3 — slices/<category>.json
  Loaded when the user enters a category-filter view. Pre-baked.

Tier 4 — index.fts.json
  Loaded lazily when the user opens the search palette.
```

### 13.2 Browser-side caches

- A `Map<node_id, Neighborhood>` in `useAtlasGraph` LRU-bounded to 64 entries.
- `IndexedDB` mirror for session-persistent storage, keyed by `meta.build_hash`. Cleared automatically when the build hash changes.

### 13.3 Hover prefetch heuristic

When the user is in `idle` or `locked(n)` and the cursor passes within 80px of an unfetched node, the UI fires a `link prefetch` for that node's neighborhood JSON. By the time the cursor lands, the JSON is parsed and ready.

### 13.4 Edge bundling

For categories with high internal density (e.g. `arkhe_systems`), the renderer bundles same-type edges into a single SVG `<path>` with multiple `M…L…` subpaths. One DOM element per (category, relationship_type) combination instead of one per edge. Reduces node count by ~75% in dense regions.

### 13.5 Layout caching

Each layout's per-node coordinates are computed once at build time and stored in `cache/layouts/<layout_name>.json`. The UI reads these directly — no force simulation runs in the browser.

### 13.6 Build hash and cache busting

`meta.json` carries `{ build_hash, generated_at, indexer_version }`. The UI sends `If-None-Match: <build_hash>` on every cache fetch. CDN responds 304 when unchanged. When the hash changes, IndexedDB is wiped and Tier-2 entries refetched on next hover.

---

## 14. Open questions to resolve before Phase 2

1. **Frontmatter migration policy.** Auto-PR per category or hand-write a single sweep PR? (Recommendation: auto-PR, author reviews.)
2. **Embedding model choice.** `nomic-embed-text` (small, fast, good enough) vs `bge-large` (slower, marginally better). Recommendation: start with nomic.
3. **Doctrine_level rule table.** Needs ratification by the architecture lead — what counts as level 0 vs 1?
4. **Mobile rendering.** Should `/atlas` collapse to a list view below 768px or render a simplified radial? (Recommendation: simplified radial, scoped to one locked node at a time.)
5. **Public visibility.** Is the atlas behind auth or open? Affects whether the graph cache is bundled into `public/` or served from a protected route.

---

## 15. Why this design

Three properties make this build tractable and durable:

**Determinism over emergence.** The graph is generated by named detectors with named coefficients. Anyone can reproduce it. Anyone can argue with a coefficient. This is the opposite of a black-box LLM-generated map, which is non-reproducible and unauditable. For an institutional research tool, auditability matters.

**Local-first as a structural constraint.** Refusing to depend on cloud LLMs at runtime forces the design to be *fast*. A graph that has to call OpenAI on hover is a graph that will never feel like a constellation. A graph that ships as static JSON behind a CDN feels like a constellation immediately.

**Visual continuity with what exists.** The atlas is not a new aesthetic; it is the existing aesthetic, scaled. `HeroNetwork`'s stars are the atlas's stars. `VentureGeomMap`'s polyhedra are the atlas's polyhedra. The user who arrives from the homepage onto `/atlas` should feel that they have stepped further into the same universe, not a different product.

The result is what the spec called for: a strategic war room, a living ontology, an adaptive intelligence constellation — built on a graph that is small enough to ship, fast enough to feel alive, and rigorous enough to defend.
