/**
 * Tao anh minh hoa dang SVG cho tung cong trinh.
 * Chay:  npm run placeholders
 *
 * Moi loai cong trinh co mot kieu phoi canh rieng (nha pho, biet thu,
 * van phong, nha xuong, showroom, noi that) thay vi dung chung mot hinh khoi.
 *
 * DAY LA ANH MINH HOA, KHONG PHAI ANH CHUP CONG TRINH THAT.
 * Khi co anh thuc te, thay file trong /public/images/projects/ va sua
 * duong dan trong src/data/projects.ts.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ================= Mau ================= */

const C = {
  sky1: "#0b3f86",
  sky2: "#1c5da8",
  sky3: "#3f83c4",
  ground: "#04255c",
  wall: "#e8eef7",
  wallShade: "#c2d3e8",
  wallDark: "#8fa9c9",
  glass: "#1e6fb8",
  glassLit: "#6ec1fa",
  frame: "#002e6e",
  red: "#ed0435",
  green: "#2f6b3f",
  greenDark: "#1e4a2c",
};

/* ================= Tien ich ================= */

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

const r2 = (n) => Math.round(n * 100) / 100;

const rect = (x, y, w, h, fill, extra = "") =>
  `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(Math.max(0, w))}" height="${r2(Math.max(0, h))}" fill="${fill}"${extra}/>`;

const poly = (pts, fill, extra = "") =>
  `<polygon points="${pts.map(([x, y]) => `${r2(x)},${r2(y)}`).join(" ")}" fill="${fill}"${extra}/>`;

/** Luoi cua so tren mot mat tuong */
function windowGrid(x, y, w, h, cols, rows, rand, gap = 0.22) {
  const out = [];
  const cw = w / cols;
  const ch = h / rows;
  const mx = cw * gap;
  const my = ch * gap;
  for (let c = 0; c < cols; c++) {
    for (let rr = 0; rr < rows; rr++) {
      const lit = rand() > 0.62;
      out.push(
        rect(
          x + c * cw + mx / 2,
          y + rr * ch + my / 2,
          cw - mx,
          ch - my,
          lit ? C.glassLit : C.glass,
          lit ? ' opacity="0.9"' : ' opacity="0.75"'
        )
      );
    }
  }
  return out.join("");
}

/** Nen troi + dat */
function backdrop(w, h, rand) {
  const horizon = h * (0.72 + rand() * 0.06);
  return `
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${C.sky1}"/>
        <stop offset="0.55" stop-color="${C.sky2}"/>
        <stop offset="1" stop-color="${C.sky3}"/>
      </linearGradient>
      <linearGradient id="gnd" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${C.ground}" stop-opacity="0.9"/>
        <stop offset="1" stop-color="${C.ground}"/>
      </linearGradient>
      <linearGradient id="vig" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stop-color="#001233" stop-opacity="0.55"/>
        <stop offset="0.6" stop-color="#001233" stop-opacity="0"/>
      </linearGradient>
    </defs>
    ${rect(0, 0, w, h, "url(#sky)")}
    <circle cx="${r2(w * (0.68 + rand() * 0.18))}" cy="${r2(h * 0.22)}" r="${r2(h * 0.16)}" fill="#ffffff" opacity="0.07"/>
    ${rect(0, horizon, w, h - horizon, "url(#gnd)")}
    ${rect(0, horizon - 1.5, w, 1.5, C.glassLit, ' opacity="0.35"')}
  `;
}

const vignette = (w, h) => rect(0, 0, w, h, "url(#vig)");

/** Cay xanh don gian */
function tree(x, base, size) {
  return `
    ${rect(x - size * 0.05, base - size * 0.32, size * 0.1, size * 0.32, C.greenDark)}
    <circle cx="${r2(x)}" cy="${r2(base - size * 0.5)}" r="${r2(size * 0.26)}" fill="${C.green}"/>
    <circle cx="${r2(x - size * 0.16)}" cy="${r2(base - size * 0.38)}" r="${r2(size * 0.19)}" fill="${C.greenDark}"/>
    <circle cx="${r2(x + size * 0.17)}" cy="${r2(base - size * 0.4)}" r="${r2(size * 0.17)}" fill="${C.greenDark}"/>
  `;
}

/* ================= Cac kieu cong trinh ================= */

/** Nha pho: lo dat hep, nhieu tang, ban cong va lam chan nang */
function scenNhaPho(w, h, rand) {
  const base = h * 0.76;
  const bw = w * 0.3;
  const bh = h * 0.56;
  const x = w * 0.32;
  const y = base - bh;
  const floors = 4;
  const fh = bh / floors;
  const out = [];

  // Nha lien ke hai ben
  out.push(rect(x - w * 0.22, base - bh * 0.72, w * 0.22, bh * 0.72, C.wallDark, ' opacity="0.5"'));
  out.push(rect(x + bw, base - bh * 0.8, w * 0.24, bh * 0.8, C.wallDark, ' opacity="0.45"'));

  // Khoi chinh
  out.push(rect(x, y, bw, bh, C.wall));
  out.push(rect(x + bw * 0.78, y, bw * 0.22, bh, C.wallShade));

  for (let f = 0; f < floors; f++) {
    const fy = y + f * fh;
    if (f === floors - 1) {
      // Tang tret: cua chinh + gara
      out.push(rect(x + bw * 0.08, fy + fh * 0.25, bw * 0.4, fh * 0.75, C.frame));
      out.push(rect(x + bw * 0.54, fy + fh * 0.32, bw * 0.34, fh * 0.68, C.glassLit, ' opacity="0.85"'));
    } else {
      out.push(windowGrid(x + bw * 0.08, fy + fh * 0.16, bw * 0.8, fh * 0.56, 2, 1, rand));
      out.push(rect(x + bw * 0.04, fy + fh * 0.74, bw * 0.92, fh * 0.07, C.wallShade));
      for (let i = 0; i < 7; i++) {
        out.push(rect(x + bw * (0.06 + i * 0.13), fy + fh * 0.81, bw * 0.02, fh * 0.16, C.wallDark, ' opacity="0.8"'));
      }
    }
  }

  // Lam chan nang doc mat tien
  for (let i = 0; i < 5; i++) {
    out.push(rect(x + bw * (0.06 + i * 0.19), y, bw * 0.035, bh * 0.74, C.wallShade, ' opacity="0.9"'));
  }

  out.push(rect(x, y - h * 0.012, bw, h * 0.012, C.red));
  out.push(tree(x - w * 0.06, base, h * 0.2));
  out.push(tree(x + bw + w * 0.05, base, h * 0.16));
  return out.join("");
}

/** Biet thu: khoi thap trai ngang, mai doc, ho nuoc va vuon */
function scenBietThu(w, h, rand) {
  const base = h * 0.74;
  const out = [];
  const bw = w * 0.56;
  const x = w * 0.2;
  const bh = h * 0.3;
  const y = base - bh;

  // Khoi tang 2 lui vao
  out.push(rect(x + bw * 0.12, y - bh * 0.62, bw * 0.5, bh * 0.62, C.wall));
  out.push(
    poly(
      [
        [x + bw * 0.06, y - bh * 0.62],
        [x + bw * 0.37, y - bh * 0.92],
        [x + bw * 0.68, y - bh * 0.62],
      ],
      C.wallShade
    )
  );
  out.push(windowGrid(x + bw * 0.18, y - bh * 0.5, bw * 0.38, bh * 0.34, 3, 1, rand));

  // Khoi tret trai ngang
  out.push(rect(x, y, bw, bh, C.wall));
  out.push(rect(x, y, bw, bh * 0.06, C.wallShade));
  out.push(windowGrid(x + bw * 0.05, y + bh * 0.18, bw * 0.55, bh * 0.6, 3, 1, rand));
  out.push(rect(x + bw * 0.64, y + bh * 0.14, bw * 0.31, bh * 0.8, C.glassLit, ' opacity="0.85"'));
  out.push(rect(x + bw * 0.79, y + bh * 0.14, bw * 0.012, bh * 0.8, C.frame));

  // Hien va cot
  out.push(rect(x - w * 0.05, y + bh * 0.02, w * 0.05, bh * 0.05, C.wallShade));
  for (let i = 0; i < 3; i++) {
    out.push(rect(x - w * 0.045 + i * w * 0.018, y + bh * 0.07, w * 0.008, bh * 0.93, C.wallDark));
  }

  out.push(rect(x, y - h * 0.01, bw, h * 0.01, C.red));

  // Ho nuoc phia truoc
  const py = base + h * 0.05;
  out.push(rect(w * 0.12, py, w * 0.7, h * 0.1, C.glass, ' opacity="0.55"'));
  out.push(rect(w * 0.12, py, w * 0.7, h * 0.012, C.glassLit, ' opacity="0.5"'));
  for (let i = 0; i < 6; i++) {
    out.push(rect(w * (0.16 + rand() * 0.6), py + h * (0.02 + rand() * 0.06), w * 0.06, 1.5, "#ffffff", ' opacity="0.18"'));
  }

  out.push(tree(w * 0.11, base, h * 0.26));
  out.push(tree(w * 0.86, base, h * 0.3));
  out.push(tree(w * 0.93, base, h * 0.2));
  return out.join("");
}

/** Van phong / thuong mai: mat dung kinh, khoi vuong vuc */
function scenVanPhong(w, h, rand) {
  const base = h * 0.78;
  const out = [];
  const bw = w * 0.46;
  const x = w * 0.27;
  const bh = h * 0.58;
  const y = base - bh;

  out.push(rect(x - w * 0.16, base - bh * 0.6, w * 0.16, bh * 0.6, C.wallDark, ' opacity="0.55"'));
  out.push(rect(x + bw, base - bh * 0.7, w * 0.15, bh * 0.7, C.wallDark, ' opacity="0.5"'));

  out.push(rect(x, y, bw, bh, C.frame));
  out.push(windowGrid(x + bw * 0.03, y + bh * 0.04, bw * 0.94, bh * 0.82, 6, 8, rand, 0.14));

  for (let i = 1; i < 4; i++) {
    out.push(rect(x, y + (bh * 0.86 * i) / 4, bw, bh * 0.012, C.wallShade, ' opacity="0.85"'));
  }

  // Sanh kinh tang tret
  out.push(rect(x, y + bh * 0.86, bw, bh * 0.14, C.wall));
  out.push(rect(x + bw * 0.3, y + bh * 0.89, bw * 0.4, bh * 0.11, C.glassLit, ' opacity="0.9"'));
  out.push(rect(x + bw * 0.5, y + bh * 0.89, bw * 0.01, bh * 0.11, C.frame));

  out.push(rect(x - bw * 0.02, y - h * 0.015, bw * 1.04, h * 0.015, C.wallShade));
  out.push(rect(x - bw * 0.02, y - h * 0.028, bw * 0.3, h * 0.013, C.red));

  out.push(tree(w * 0.15, base, h * 0.16));
  out.push(tree(w * 0.87, base, h * 0.18));
  return out.join("");
}

/** Nha xuong: khung thep, mai doc dai, cua cuon */
function scenNhaXuong(w, h, rand) {
  const base = h * 0.78;
  const out = [];
  const bw = w * 0.72;
  const x = w * 0.14;
  const bh = h * 0.26;
  const y = base - bh;

  out.push(
    poly(
      [
        [x - w * 0.02, y],
        [x + bw * 0.5, y - bh * 0.55],
        [x + bw + w * 0.02, y],
      ],
      C.wallShade
    )
  );
  out.push(rect(x, y, bw, bh, C.wall));
  for (let i = 0; i < 26; i++) {
    out.push(rect(x + (bw * i) / 26, y, bw * 0.012, bh, C.wallShade, ' opacity="0.55"'));
  }
  out.push(rect(x + bw * 0.04, y + bh * 0.16, bw * 0.92, bh * 0.2, C.glass, ' opacity="0.8"'));
  for (let i = 0; i < 12; i++) {
    if (rand() > 0.5) {
      out.push(rect(x + bw * (0.05 + i * 0.077), y + bh * 0.17, bw * 0.06, bh * 0.18, C.glassLit, ' opacity="0.85"'));
    }
  }
  for (let i = 0; i < 3; i++) {
    const dx = x + bw * (0.12 + i * 0.3);
    out.push(rect(dx, y + bh * 0.5, bw * 0.16, bh * 0.5, C.frame));
    for (let k = 0; k < 5; k++) {
      out.push(rect(dx, y + bh * (0.52 + k * 0.09), bw * 0.16, bh * 0.02, C.wallDark, ' opacity="0.5"'));
    }
  }
  out.push(rect(x, y - h * 0.012, bw, h * 0.012, C.red));

  // Khoi van phong dieu hanh
  const ox = x + bw + w * 0.02;
  out.push(rect(ox, base - bh * 1.15, w * 0.12, bh * 1.15, C.wall));
  out.push(windowGrid(ox + w * 0.012, base - bh * 1.02, w * 0.096, bh * 0.72, 2, 3, rand));

  return out.join("");
}

/** Showroom: mat tien kinh lon, bien hieu */
function scenShowroom(w, h, rand) {
  const base = h * 0.78;
  const out = [];
  const bw = w * 0.6;
  const x = w * 0.2;
  const bh = h * 0.4;
  const y = base - bh;

  out.push(rect(x - w * 0.14, base - bh * 0.8, w * 0.14, bh * 0.8, C.wallDark, ' opacity="0.5"'));
  out.push(rect(x + bw, base - bh * 0.85, w * 0.14, bh * 0.85, C.wallDark, ' opacity="0.45"'));

  out.push(rect(x, y, bw, bh, C.wall));
  out.push(rect(x, y, bw, bh * 0.16, C.frame));
  out.push(rect(x + bw * 0.06, y + bh * 0.05, bw * 0.3, bh * 0.06, C.glassLit, ' opacity="0.9"'));
  out.push(rect(x + bw * 0.4, y + bh * 0.05, bw * 0.1, bh * 0.06, C.red));

  out.push(rect(x + bw * 0.04, y + bh * 0.22, bw * 0.92, bh * 0.7, C.glass, ' opacity="0.85"'));
  for (let c = 0; c < 5; c++) {
    out.push(rect(x + bw * (0.04 + c * 0.184), y + bh * 0.22, bw * 0.012, bh * 0.7, C.frame));
    if (rand() > 0.45) {
      out.push(rect(x + bw * (0.06 + c * 0.184), y + bh * 0.26, bw * 0.15, bh * 0.28, C.glassLit, ' opacity="0.55"'));
    }
  }
  out.push(rect(x + bw * 0.04, y + bh * 0.56, bw * 0.92, bh * 0.012, C.frame));
  out.push(rect(x + bw * 0.34, y + bh * 0.62, bw * 0.32, bh * 0.04, C.wallShade));

  out.push(tree(w * 0.13, base, h * 0.18));
  return out.join("");
}

/** Noi that: phoi canh mot diem, cua so lon lay sang */
function scenNoiThat(w, h, rand) {
  const out = [];
  const fx = w * 0.52;
  const fy = h * 0.5;
  const bw = w * 0.34;
  const bh = h * 0.36;
  const bx = fx - bw / 2;
  const by = fy - bh / 2;

  out.push(rect(0, 0, w, h, "#dfe8f4"));
  out.push(poly([[0, 0], [bx, by], [bx, by + bh], [0, h]], "#c7d6ea"));
  out.push(poly([[w, 0], [bx + bw, by], [bx + bw, by + bh], [w, h]], "#b9cbe3"));
  out.push(poly([[0, 0], [w, 0], [bx + bw, by], [bx, by]], "#eef3fa"));
  out.push(poly([[0, h], [w, h], [bx + bw, by + bh], [bx, by + bh]], "#a8bcd6"));

  // Tuong cuoi + cua kinh lon
  out.push(rect(bx, by, bw, bh, "#e8eef7"));
  out.push(rect(bx + bw * 0.14, by + bh * 0.12, bw * 0.72, bh * 0.62, C.glassLit, ' opacity="0.85"'));
  out.push(rect(bx + bw * 0.5, by + bh * 0.12, bw * 0.014, bh * 0.62, "#ffffff", ' opacity="0.8"'));

  // Vet sang hat xuong san
  out.push(
    poly(
      [
        [bx + bw * 0.14, by + bh],
        [bx + bw * 0.86, by + bh],
        [bx + bw * 1.15, h],
        [bx - bw * 0.3, h],
      ],
      "#ffffff",
      ' opacity="0.16"'
    )
  );

  // Do noi that
  const sy = by + bh + (h - by - bh) * 0.42;
  out.push(rect(w * 0.3, sy, w * 0.26, h * 0.1, C.frame, ' opacity="0.9"'));
  out.push(rect(w * 0.3, sy - h * 0.05, w * 0.26, h * 0.055, "#1f3a5f"));
  out.push(rect(w * 0.6, sy + h * 0.03, w * 0.14, h * 0.02, "#7d5a3c"));
  out.push(rect(w * 0.63, sy + h * 0.05, w * 0.015, h * 0.06, "#7d5a3c"));
  out.push(rect(w * 0.08, by + bh * 0.1, w * 0.1, h * 0.42, "#8b6a4a", ' opacity="0.9"'));
  for (let i = 0; i < 4; i++) {
    out.push(rect(w * 0.08, by + bh * 0.1 + h * 0.1 * i, w * 0.1, h * 0.006, "#5f4630"));
  }
  // Den tha
  out.push(rect(fx - w * 0.001, 0, w * 0.002, h * 0.16, "#33445e"));
  out.push(
    `<ellipse cx="${r2(fx)}" cy="${r2(h * 0.18)}" rx="${r2(w * 0.035)}" ry="${r2(h * 0.02)}" fill="${C.glassLit}" opacity="0.95"/>`
  );
  out.push(tree(w * 0.82, sy + h * 0.12, h * 0.24));
  // Chut ngau nhien de moi phong khac nhau
  if (rand() > 0.5) {
    out.push(rect(w * 0.22, sy - h * 0.02, w * 0.05, h * 0.12, "#1f3a5f", ' opacity="0.8"'));
  }

  return out.join("");
}

/* ================= Dung file SVG ================= */

const SCENES = {
  "nha-pho": scenNhaPho,
  "biet-thu": scenBietThu,
  "thuong-mai": scenVanPhong,
  showroom: scenShowroom,
  "cong-nghiep": scenNhaXuong,
  noi_that: scenNoiThat,
};

function buildSvg({ w, h, seed, kind, label }) {
  const rand = rng(hash(seed));
  const scene = SCENES[kind] ?? scenVanPhong;
  const interior = kind === "noi_that";

  const parts = [];
  if (!interior) parts.push(backdrop(w, h, rand));
  parts.push(scene(w, h, rand));
  if (!interior) parts.push(vignette(w, h));

  if (label) {
    const fs = Math.max(12, Math.round(w * 0.018));
    parts.push(
      `<text x="${r2(w * 0.045)}" y="${r2(h * 0.94)}" fill="${interior ? "#1f3a5f" : "#ffffff"}" opacity="0.45" font-family="Segoe UI, Arial, sans-serif" font-size="${fs}" letter-spacing="${r2(fs * 0.16)}">${label}</text>`
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Ảnh minh họa công trình">${parts.join("")}</svg>`;
}

/* ================= Danh sach file ================= */

const files = [];
const add = (path, w, h, kind, label = "") =>
  files.push({ path, w, h, kind, label, seed: path });

// Anh chung
add("public/images/hero.svg", 1920, 1080, "thuong-mai");
add("public/images/about-team.svg", 900, 1125, "noi_that");
add("public/images/about-office.svg", 1400, 900, "noi_that");
add("public/images/cta-site.svg", 1600, 900, "cong-nghiep");

/** Du an — PHAI khop voi src/data/projects.ts */
const PROJECTS = [
  { slug: "nha-pho-thao-dien", kind: "nha-pho", gallery: ["nha-pho", "noi_that", "noi_that", "noi_that"] },
  { slug: "biet-thu-long-an", kind: "biet-thu", gallery: ["biet-thu", "biet-thu", "noi_that"] },
  { slug: "van-phong-tan-binh", kind: "thuong-mai", gallery: ["noi_that", "noi_that"] },
  { slug: "nha-pho-go-vap", kind: "nha-pho", gallery: ["nha-pho", "noi_that"] },
  { slug: "nha-xuong-binh-duong", kind: "cong-nghiep", gallery: ["cong-nghiep", "thuong-mai"] },
  { slug: "biet-thu-binh-chanh", kind: "biet-thu", gallery: ["biet-thu", "noi_that"] },
  { slug: "showroom-quan-7", kind: "showroom", gallery: ["showroom", "noi_that"] },
];

const LABEL = "ẢNH MINH HỌA";

for (const p of PROJECTS) {
  add(`public/images/projects/${p.slug}-cover.svg`, 1200, 800, p.kind, LABEL);
  p.gallery.forEach((g, i) => {
    add(`public/images/projects/${p.slug}-${i + 1}.svg`, 1400, 933, g, LABEL);
  });
}

// Tin tuc — khop voi src/data/posts.ts
const NEWS = [
  ["chi-phi-xay-nha", "nha-pho"],
  ["chong-tham", "cong-nghiep"],
  ["chon-nha-thau", "thuong-mai"],
  ["thong-gio", "biet-thu"],
];
for (const [slug, kind] of NEWS) {
  add(`public/images/news/${slug}.svg`, 1200, 750, kind, LABEL);
}

/* ================= Ghi file ================= */

let written = 0;
for (const f of files) {
  const abs = join(root, f.path);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, buildSvg(f), "utf8");
  written++;
}

/* ---------- Favicon ---------- */

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#003d91"/><path d="M17 17h7.5v12.6L35 17h9.8l-13 15.1L45 47H35.2L24.5 33.6V47H17z" fill="#ffffff"/><rect x="17" y="50" width="30" height="3.5" rx="1.75" fill="#ED0435"/></svg>`;
writeFileSync(join(root, "public/favicon.svg"), favicon, "utf8");
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

console.log(`Da tao ${written} file minh hoa trong /public.`);
