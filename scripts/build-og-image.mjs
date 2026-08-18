/**
 * Dung anh Open Graph (anh hien thi khi chia se link) tu logo that.
 * Chay:  npm run og      (da nam trong `npm run placeholders`)
 *
 * Vi sao phai la PNG: Facebook, Zalo, LinkedIn KHONG doc duoc anh .svg.
 * Neu de svg thi link chia se se khong co anh preview.
 *
 * Chi dung module chuan cua Node (zlib), khong can thu vien ngoai.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const W = 1200;
const H = 630;

/* ---------- Mau thuong hieu ---------- */
const BG = [0, 46, 110]; // navy #002E6E
const BG2 = [4, 37, 92]; // navy dam hon
const RED = [237, 4, 53]; // do logo #ED0435
const SKY = [110, 193, 250]; // xanh kinh #6EC1FA

/* ================= Doc PNG RGBA ================= */

function readPng(path) {
  const d = readFileSync(path);
  let pos = 8;
  let idat = [];
  let w = 0;
  let h = 0;

  while (pos < d.length) {
    const len = d.readUInt32BE(pos);
    const tag = d.toString("latin1", pos + 4, pos + 8);
    const body = d.subarray(pos + 8, pos + 8 + len);
    if (tag === "IHDR") {
      w = body.readUInt32BE(0);
      h = body.readUInt32BE(4);
      if (body[8] !== 8 || body[9] !== 6) {
        throw new Error("Chi ho tro PNG RGBA 8-bit");
      }
    } else if (tag === "IDAT") {
      idat.push(body);
    } else if (tag === "IEND") {
      break;
    }
    pos += 12 + len;
  }

  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = w * 4;
  const out = Buffer.alloc(w * h * 4);
  let prev = Buffer.alloc(stride);
  let p = 0;

  for (let y = 0; y < h; y++) {
    const ft = raw[p++];
    const line = Buffer.from(raw.subarray(p, p + stride));
    p += stride;

    if (ft === 1) {
      for (let i = 4; i < stride; i++) line[i] = (line[i] + line[i - 4]) & 255;
    } else if (ft === 2) {
      for (let i = 0; i < stride; i++) line[i] = (line[i] + prev[i]) & 255;
    } else if (ft === 3) {
      for (let i = 0; i < stride; i++) {
        const a = i >= 4 ? line[i - 4] : 0;
        line[i] = (line[i] + ((a + prev[i]) >> 1)) & 255;
      }
    } else if (ft === 4) {
      for (let i = 0; i < stride; i++) {
        const a = i >= 4 ? line[i - 4] : 0;
        const b = prev[i];
        const c = i >= 4 ? prev[i - 4] : 0;
        const pp = a + b - c;
        const pa = Math.abs(pp - a);
        const pb = Math.abs(pp - b);
        const pc = Math.abs(pp - c);
        const pr = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
        line[i] = (line[i] + pr) & 255;
      }
    }
    line.copy(out, y * stride);
    prev = line;
  }
  return { w, h, px: out };
}

/* ================= Ghi PNG RGB ================= */

function writePng(path, w, h, rgb) {
  const stride = w * 3;
  const rows = Buffer.alloc((stride + 1) * h);
  for (let y = 0; y < h; y++) {
    rows[y * (stride + 1)] = 0;
    rgb.copy(rows, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  const chunk = (tag, payload) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(payload.length);
    const body = Buffer.concat([Buffer.from(tag, "latin1"), payload]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(zlib.crc32 ? zlib.crc32(body) : crc32(body));
    return Buffer.concat([len, body, crc]);
  };

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type 2 = RGB
  const data = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(rows, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
  writeFileSync(path, data);
  return data.length;
}

// Du phong cho ban Node khong co zlib.crc32
let table = null;
function crc32(buf) {
  if (!table) {
    table = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c;
    }
  }
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

/* ================= Dung anh ================= */

const canvas = Buffer.alloc(W * H * 3);
const setPx = (x, y, [r, g, b]) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 3;
  canvas[i] = r;
  canvas[i + 1] = g;
  canvas[i + 2] = b;
};

// Nen chuyen sac cheo
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const t = (x / W) * 0.6 + (y / H) * 0.4;
    setPx(x, y, [
      Math.round(BG2[0] + (BG[0] - BG2[0]) * t),
      Math.round(BG2[1] + (BG[1] - BG2[1]) * t),
      Math.round(BG2[2] + (BG[2] - BG2[2]) * t),
    ]);
  }
}

// Luoi ky thuat mo
for (let x = 0; x < W; x += 60) {
  for (let y = 0; y < H; y++) {
    const i = (y * W + x) * 3;
    canvas[i] = Math.min(255, canvas[i] + 10);
    canvas[i + 1] = Math.min(255, canvas[i + 1] + 16);
    canvas[i + 2] = Math.min(255, canvas[i + 2] + 22);
  }
}
for (let y = 0; y < H; y += 60) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 3;
    canvas[i] = Math.min(255, canvas[i] + 10);
    canvas[i + 1] = Math.min(255, canvas[i + 1] + 16);
    canvas[i + 2] = Math.min(255, canvas[i + 2] + 22);
  }
}

// Dai mau thuong hieu ben trai: do + xanh kinh
for (let y = 0; y < H; y++) {
  for (let x = 0; x < 14; x++) setPx(x, y, RED);
  for (let x = 14; x < 22; x++) setPx(x, y, SKY);
}

// Vien sang duoi day
for (let y = H - 5; y < H; y++) {
  for (let x = 0; x < W; x++) setPx(x, y, RED);
}

/* ---------- Dat logo vao giua tren nen trang bo goc ---------- */

const logo = readPng(join(root, "public/logo.png"));
const size = 380; // kich thuoc logo tren anh OG
const lx = Math.round((W - size) / 2);
const ly = Math.round((H - size) / 2) - 6;

// The trang bo goc phia sau logo
const pad = 34;
const radius = 56;
const cx0 = lx - pad;
const cy0 = ly - pad;
const cw = size + pad * 2;
const ch = size + pad * 2;

for (let y = cy0; y < cy0 + ch; y++) {
  for (let x = cx0; x < cx0 + cw; x++) {
    const dx = Math.min(x - cx0, cx0 + cw - 1 - x);
    const dy = Math.min(y - cy0, cy0 + ch - 1 - y);
    if (dx < radius && dy < radius) {
      const d = Math.hypot(radius - dx, radius - dy);
      if (d > radius) continue;
    }
    setPx(x, y, [255, 255, 255]);
  }
}

// Ve logo len the trang (tron alpha)
const scale = logo.w / size;
for (let y = 0; y < size; y++) {
  const sy = Math.min(logo.h - 1, Math.floor(y * scale));
  for (let x = 0; x < size; x++) {
    const sx = Math.min(logo.w - 1, Math.floor(x * scale));
    const si = (sy * logo.w + sx) * 4;
    const a = logo.px[si + 3] / 255;
    if (a === 0) continue;
    const di = ((ly + y) * W + (lx + x)) * 3;
    for (let c = 0; c < 3; c++) {
      canvas[di + c] = Math.round(logo.px[si + c] * a + canvas[di + c] * (1 - a));
    }
  }
}

const bytes = writePng(join(root, "public/og-image.png"), W, H, canvas);
console.log(
  `Da tao public/og-image.png ${W}x${H} (${Math.round(bytes / 1024)} KB)`
);
