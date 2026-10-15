// Builds public/og.jpg (1200x630, <300KB) from the real invitation posters + brand text. Run: node scripts/make-og.mjs
import sharp from "sharp";
import fs from "node:fs";
const root = new URL("..", import.meta.url).pathname;
const ids = ["jishnu-vibha", "vinay-athira", "sanoop-fidha"];
const H = 470, W = Math.round(H * 0.5);
const phones = await Promise.all(ids.map(async (id) => {
  const img = await sharp(`${root}public/invitations/${id}.webp`).resize(W, H, { fit: "cover", position: "top" }).png().toBuffer();
  const mask = Buffer.from(`<svg width="${W}" height="${H}"><rect width="${W}" height="${H}" rx="26"/></svg>`);
  return sharp(img).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}));
const svg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
<rect width="1200" height="630" fill="#FAF7F2"/><rect x="700" y="0" width="500" height="630" fill="#F2E7E4"/>
<text x="70" y="250" font-family="Georgia, 'DejaVu Serif', serif" font-size="68" fill="#282420">The Wedding</text>
<text x="70" y="330" font-family="Georgia, 'DejaVu Serif', serif" font-size="68" font-style="italic" fill="#8A6D42">Edit</text>
<rect x="70" y="360" width="64" height="2" fill="#C6A77A"/>
<text x="70" y="420" font-family="Georgia, 'DejaVu Serif', serif" font-size="30" font-style="italic" fill="#5D554C">Your Story. Beautifully Invited.</text>
</svg>`);
const out = await sharp(svg).composite([
  { input: phones[1], left: 730, top: 80 }, { input: phones[0], left: 880, top: 110 }, { input: phones[2], left: 1030, top: 140 },
]).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
fs.writeFileSync(`${root}public/og.jpg`, out);
console.log("og.jpg", out.length, "bytes");
