// Post-build fix for GitHub Pages.
//
// Next's file-based opengraph-image emits PNG files with NO extension
// (out/<route>/opengraph-image) and references them as `.../opengraph-image?<hash>`.
// GitHub Pages serves extensionless files as application/octet-stream, which several
// link scrapers (iMessage, Twitter) reject. This script:
//   1. copies each `opengraph-image` to `opengraph-image.png` (correct content-type), and
//   2. rewrites the meta references in the exported HTML to point at the `.png`.

import { readdir, readFile, writeFile, copyFile, stat } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";
const OG_NAME = "opengraph-image";
// Matches `/opengraph-image?<hexhash>` (and a bare `/opengraph-image` with no query).
const REF_RE = /\/opengraph-image(\?[0-9a-f]+)?/g;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else files.push(p);
  }
  return files;
}

const files = await walk(OUT);

// 1. Copy each extensionless opengraph-image to .png
let copied = 0;
for (const f of files) {
  const base = f.split("/").pop();
  if (base === OG_NAME) {
    await copyFile(f, `${f}.png`);
    copied++;
  }
}

// 2. Rewrite HTML references → .png
let rewritten = 0;
for (const f of files) {
  if (!f.endsWith(".html")) continue;
  const html = await readFile(f, "utf8");
  if (!REF_RE.test(html)) continue;
  const fixed = html.replace(REF_RE, "/opengraph-image.png");
  await writeFile(f, fixed);
  rewritten++;
}

console.log(`fix-og: copied ${copied} OG PNGs, rewrote ${rewritten} HTML files`);
