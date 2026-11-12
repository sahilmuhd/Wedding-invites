// Builds public/og.jpg (1200x630, <300KB): maroon brand panel + real invitation screenshots.
// Run: node scripts/make-og.mjs   (brand name is read from src/config/brand.ts)
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const brandSrc = fs.readFileSync(path.join(root, "src/config/brand.ts"), "utf8");
const brandName = brandSrc.match(/^\s*name:\s*"([^"]+)"/m)?.[1] ?? "";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const ids = ["jishnu-vibha", "sanoop-fidha", "vinay-athira"];
const H = 500, W = Math.round(H * 0.5);
const phones = await Promise.all(ids.map(async (id) => {
  const img = await sharp(path.join(root, `public/invitations/${id}.webp`)).resize(W, H, { fit: "cover", position: "top" }).png().toBuffer();
  const mask = Buffer.from(`<svg width="${W}" height="${H}"><rect width="${W}" height="${H}" rx="28"/></svg>`);
  return sharp(img).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}));

// Envelope mark (from public/brand/icon-white.svg), scaled to 96px wide.
const mark = fs.readFileSync(path.join(root, "public/brand/icon-white.svg"), "utf8")
  .replace(/<svg[^>]*>/, "").replace("</svg>", "");

const svg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
<rect width="1200" height="630" fill="#5A1424"/>
<rect x="640" y="0" width="560" height="630" fill="#F6EEF0"/>
<g transform="translate(72 96) scale(0.48)">${mark}</g>
<text x="72" y="300" font-family="'Playfair Display', Georgia, serif" font-size="64" fill="#FFFFFF">Your wedding,</text>
<text x="72" y="378" font-family="'Playfair Display', Georgia, serif" font-size="64" font-style="italic" fill="#FFFFFF">beautifully invited.</text>
<text x="72" y="452" font-family="Jost, 'Segoe UI', Arial, sans-serif" font-size="26" fill="#F6EEF0">Wedding invitation websites · Ready in 24 hours</text>
<text x="72" y="560" font-family="'Playfair Display', Georgia, serif" font-size="30" font-style="italic" fill="#F6EEF0">${esc(brandName)}</text>
</svg>`);

const out = await sharp(svg).composite([
  { input: phones[0], left: 660, top: 90 },
  { input: phones[2], left: 940, top: 90 },
  { input: phones[1], left: 795, top: 65 },
]).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
fs.writeFileSync(path.join(root, "public/og.jpg"), out);
console.log("og.jpg", out.length, "bytes");
