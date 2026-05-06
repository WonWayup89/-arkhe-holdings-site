import fs from "fs";
import path from "path";

const root = "content/education";
const outDir = "src/generated";
const outFile = path.join(outDir, "education-index.js");

function titleFromMarkdown(md, file) {
  const match = md.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : path.basename(file, ".md").replaceAll("_", " ");
}

function walk(dir) {
  let files = [];

  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);

    if (fs.statSync(full).isDirectory()) {
      files = files.concat(walk(full));
    } else if (full.endsWith(".md")) {
      files.push(full);
    }
  }

  return files;
}

const files = walk(root);

const entries = files.map(file => {
  const md = fs.readFileSync(file, "utf8");

  const rel = file.replaceAll("\\\\", "/");
  const parts = rel.split("/");

  const category = parts[2];
  const slug = path.basename(file, ".md");

  return {
    title: titleFromMarkdown(md, file),
    category,
    slug,
    route: `/education/${category}/${slug}`,
    file: rel,
    content: md
  };
});

fs.writeFileSync(
  outFile,
  `export const educationIndex = ${JSON.stringify(entries, null, 2)};\n`,
  "utf8"
);

console.log(`Built ${entries.length} education entries`);
