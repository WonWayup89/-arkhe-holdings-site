from pathlib import Path
import re
import subprocess

raw = subprocess.check_output(["pbpaste"], text=True)

raw = raw.replace("\r\n", "\n").replace("\r", "\n")

pattern = re.compile(r'(?m)^\s*(content/education/[^\s]+\.md)\s*$')
matches = list(pattern.finditer(raw))

if not matches:
    raise SystemExit("No markdown file paths found. Copy the full file text to clipboard first.")

for i, match in enumerate(matches):
    filepath = match.group(1).strip()
    start = match.end()
    end = matches[i + 1].start() if i + 1 < len(matches) else len(raw)
    content = raw[start:end].strip()

    stop_markers = [
        "]You are generating",
        "You are generating the FINAL",
        "━━━━━━━━━━━━━━━━━━━━",
        "FILES TO GENERATE",
        "Generate ALL files completely",
        "pattern = re.compile",
    ]

    for marker in stop_markers:
        idx = content.find(marker)
        if idx != -1:
            content = content[:idx].strip()

    if not content:
        print(f"Skipped empty file: {filepath}")
        continue

    path = Path(filepath)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content + "\n", encoding="utf-8")
    print(f"Wrote {filepath}")

print(f"\nDone. Generated {len(matches)} files.")
