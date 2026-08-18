/**
 * Doi duong dan anh trong src/data/projects.ts tu .svg sang .webp
 * cho nhung du an da co anh AI trong public/images/projects/.
 *
 * Chay sau khi tao anh:
 *   python scripts/generate-project-images.py
 *   node scripts/sync-project-images.mjs
 *
 * Chay lai nhieu lan khong sao — chi doi nhung duong dan co file that.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataFile = join(root, "src/data/projects.ts");
const imgDir = join(root, "public/images/projects");

let src = readFileSync(dataFile, "utf8");
const before = src;

// Bat moi duong dan dang /images/projects/<ten>.svg
const paths = [...src.matchAll(/\/images\/projects\/([a-z0-9-]+)\.svg/g)];
const seen = new Set();
let swapped = 0;
const missing = [];

for (const m of paths) {
  const name = m[1];
  if (seen.has(name)) continue;
  seen.add(name);

  if (existsSync(join(imgDir, `${name}.webp`))) {
    src = src.replaceAll(
      `/images/projects/${name}.svg`,
      `/images/projects/${name}.webp`
    );
    swapped++;
  } else {
    missing.push(name);
  }
}

if (src !== before) {
  writeFileSync(dataFile, src, "utf8");
}

console.log(`Da doi ${swapped} duong dan anh sang .webp`);
if (missing.length) {
  console.log(`Con ${missing.length} anh chua co ban .webp (van dung .svg):`);
  for (const n of missing) console.log("   ", n);
}
if (!swapped && !missing.length) {
  console.log("Khong tim thay duong dan .svg nao — co the da doi het roi.");
}
