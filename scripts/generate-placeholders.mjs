/**
 * Tao anh placeholder dang SVG (do hoa kien truc truu tuong).
 * Chay:  npm run placeholders
 *
 * Khi anh co anh that, chi can thay file trong /public/images/
 * va sua duong dan trong src/data/projects.ts + posts.ts.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ---------- Bang mau thuong hieu ---------- */
const PALETTES = [
  { bg: "#002e6e", mid: "#0b4394", line: "#14559f", pop: "#ed0435" },
  { bg: "#04255c", mid: "#003d91", line: "#1a5aa8", pop: "#6ec1fa" },
  { bg: "#0b4394", mid: "#14559f", line: "#3d7cc4", pop: "#ed0435" },
  { bg: "#021c47", mid: "#002e6e", line: "#0f4b8f", pop: "#8ed0fb" },
];

/** Bam chuoi -> so, de moi anh co bo cuc rieng nhung on dinh giua cac lan build */
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Do hoa: cac khoi nha dang mat cat + luoi ky thuat */
/** Anh hero dung tong sang hon de nhin ro khoi cong trinh duoi lop phu navy */
const HERO_PALETTE = {
  bg: "#1c4d8c",
  mid: "#2f6bad",
  line: "#5b93cd",
  pop: "#ed0435",
};

function buildSvg({ w, h, seed, label, bright }) {
  const n = hash(seed);
  const rand = rng(n);
  const p = bright ? HERO_PALETTE : PALETTES[n % PALETTES.length];

  const parts = [];

  // Nen
  parts.push(`<rect width="${w}" height="${h}" fill="${p.bg}"/>`);

  // Luoi ky thuat
  const grid = 48;
  parts.push(`<g stroke="${p.line}" stroke-width="1" opacity="0.22">`);
  for (let x = grid; x < w; x += grid)
    parts.push(`<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`);
  for (let y = grid; y < h; y += grid)
    parts.push(`<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`);
  parts.push(`</g>`);

  // Duong chan troi
  const horizon = Math.round(h * (0.62 + rand() * 0.12));
  parts.push(
    `<rect x="0" y="${horizon}" width="${w}" height="${h - horizon}" fill="${p.mid}" opacity="0.75"/>`
  );

  // Cac khoi cong trinh
  const count = 4 + Math.floor(rand() * 3);
  let cursor = -Math.round(w * 0.05);
  for (let i = 0; i < count; i++) {
    const bw = Math.round(w * (0.12 + rand() * 0.16));
    const bh = Math.round(h * (0.2 + rand() * 0.42));
    const x = cursor;
    const y = horizon - bh;
    cursor += bw + Math.round(w * 0.015);
    if (x > w) break;

    parts.push(
      `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" fill="${p.mid}" stroke="${p.line}" stroke-width="1.5"/>`
    );

    // Cac o cua so
    const cols = Math.max(2, Math.floor(bw / 34));
    const rows = Math.max(2, Math.floor(bh / 34));
    const pad = 10;
    const cw = (bw - pad * 2) / cols;
    const ch = (bh - pad * 2) / rows;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (rand() > 0.55) continue;
        parts.push(
          `<rect x="${(x + pad + c * cw + 2).toFixed(1)}" y="${(y + pad + r * ch + 2).toFixed(1)}" width="${Math.max(3, cw - 6).toFixed(1)}" height="${Math.max(3, ch - 6).toFixed(1)}" fill="${p.line}" opacity="${(0.35 + rand() * 0.4).toFixed(2)}"/>`
        );
      }
    }

    // Vach nhan mau cam tren mot khoi
    if (i === Math.floor(count / 2)) {
      parts.push(
        `<rect x="${x}" y="${y - 6}" width="${bw}" height="4" fill="${p.pop}"/>`
      );
    }
  }

  // Duong do dac trung ban ve
  const dimY = Math.round(h * 0.9);
  parts.push(
    `<g stroke="${p.pop}" stroke-width="1.5" opacity="0.85">
      <line x1="${Math.round(w * 0.08)}" y1="${dimY}" x2="${Math.round(w * 0.42)}" y2="${dimY}"/>
      <line x1="${Math.round(w * 0.08)}" y1="${dimY - 7}" x2="${Math.round(w * 0.08)}" y2="${dimY + 7}"/>
      <line x1="${Math.round(w * 0.42)}" y1="${dimY - 7}" x2="${Math.round(w * 0.42)}" y2="${dimY + 7}"/>
    </g>`
  );

  // Lop phu chuyen sac cho de doc chu
  parts.push(
    `<linearGradient id="g" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="${p.bg}" stop-opacity="0.85"/>
      <stop offset="0.55" stop-color="${p.bg}" stop-opacity="0"/>
    </linearGradient>
    <rect width="${w}" height="${h}" fill="url(#g)"/>`
  );

  // Nhan
  if (label) {
    const fs = Math.max(13, Math.round(w * 0.022));
    parts.push(
      `<text x="${Math.round(w * 0.055)}" y="${Math.round(h * 0.945)}" fill="#ffffff" opacity="0.5" font-family="Segoe UI, Arial, sans-serif" font-size="${fs}" letter-spacing="${(fs * 0.14).toFixed(1)}">${label}</text>`
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Ảnh minh họa công trình">${parts.join("")}</svg>`;
}

/* ---------- Danh sach file can tao ---------- */

const files = [];

const add = (path, w, h, label, bright = false) =>
  files.push({ path, w, h, label, seed: path, bright });

// Hero + OG + gioi thieu
add("public/images/hero.svg", 1920, 1080, "", true);
add("public/images/about-team.svg", 900, 1125, "DOI NGU K3");
add("public/images/about-office.svg", 1400, 900, "VAN PHONG K3");
add("public/images/cta-site.svg", 1600, 900, "CONG TRUONG");

// Du an — dong bo voi src/data/projects.ts
const projectSlugs = {
  "nha-pho-thao-dien": 4,
  "biet-thu-long-an": 3,
  "can-ho-vinhomes": 3,
  "van-phong-tan-binh": 2,
  "nha-pho-go-vap": 2,
  "nha-xuong-binh-duong": 2,
  "biet-thu-binh-chanh": 2,
  "showroom-quan-7": 2,
};

for (const [slug, galleryCount] of Object.entries(projectSlugs)) {
  add(`public/images/projects/${slug}-cover.svg`, 1200, 800, "ANH MINH HOA");
  for (let i = 1; i <= galleryCount; i++) {
    add(`public/images/projects/${slug}-${i}.svg`, 1400, 933, "ANH MINH HOA");
  }
}

// Tin tuc — dong bo voi src/data/posts.ts
for (const slug of [
  "chi-phi-xay-nha",
  "chong-tham",
  "chon-nha-thau",
  "thong-gio",
]) {
  add(`public/images/news/${slug}.svg`, 1200, 750, "ANH MINH HOA");
}

// OG image
add("public/og-image.svg", 1200, 630, "K3 DESIGN — THIET KE & THI CONG");

/* ---------- Ghi file ---------- */

let written = 0;
for (const f of files) {
  const abs = join(root, f.path);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(
    abs,
    buildSvg({ w: f.w, h: f.h, seed: f.seed, label: f.label, bright: f.bright }),
    "utf8"
  );
  written++;
}

/* ---------- Favicon ---------- */

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#003d91"/><path d="M17 17h7.5v12.6L35 17h9.8l-13 15.1L45 47H35.2L24.5 33.6V47H17z" fill="#ffffff"/><rect x="17" y="50" width="30" height="3.5" rx="1.75" fill="#ED0435"/></svg>`;
writeFileSync(join(root, "public/favicon.svg"), favicon, "utf8");
// apple-touch-icon.png duoc tao tu logo that, khong ghi de o day
written += 1;

/* ---------- Anh dai dien khach hang (trang tri) ---------- */

const AVATAR_TONES = [
  ["#8ed0fb", "#002e6e"],
  ["#c7e4fb", "#0b4394"],
  ["#6ec1fa", "#04255c"],
  ["#dde9f9", "#14559f"],
];

for (let i = 0; i < AVATAR_TONES.length; i++) {
  const [bg, fg] = AVATAR_TONES[i];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="72" height="72" role="presentation"><rect width="72" height="72" fill="${bg}"/><circle cx="36" cy="27" r="12" fill="${fg}"/><path d="M8 72c0-15.5 12.5-24 28-24s28 8.5 28 24z" fill="${fg}"/></svg>`;
  const abs = join(root, `public/images/avatars/avatar-${i + 1}.svg`);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, svg, "utf8");
  written++;
}

console.log(`Da tao ${written} file placeholder trong /public.`);
