// Bakes the brand watermark (envelope + "weddingwebsites" wordmark) into published media.
// Clean originals live in media-src/ (not served); watermarked copies are written to public/.
// Safe to re-run: it always starts from the originals, so a mark is never applied twice.
//   node scripts/watermark.mjs            # everything
//   node scripts/watermark.mjs <id> ...   # only these invitation posters (after scripts/capture.mjs)
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const src = (...p) => path.join(root, "media-src", ...p);
const pub = (...p) => path.join(root, "public", ...p);

/* ---------- the mark ---------- */
const iconSvg = fs.readFileSync(pub("brand/icon-white.svg"), "utf8");
const wordSvg = fs.readFileSync(pub("brand/wordmark-maroon.svg"), "utf8");
const inner = (svg) => svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
// Mark geometry in "units": icon 200x164 scaled to 100 tall, wordmark 444x92 scaled to 100 tall.
const ICON_S = 100 / 164, WORD_S = 100 / 92, GAP = 26;
const ICON_W = 200 * ICON_S, WORD_W = 444 * WORD_S;
const MARK_W = ICON_W + GAP + WORD_W, MARK_H = 100;

function markSvg(widthPx, color, opacity, shadow) {
  const k = widthPx / MARK_W;
  const h = Math.round(MARK_H * k) + 8;
  const layer = (fill, id) => {
    const icon = inner(iconSvg).replace(/#FFFFFF/gi, fill).replace(/id="h6(g?)"/g, `id="${id}$1"`).replace(/url\(#h6(g?)\)/g, `url(#${id}$1)`);
    const word = inner(wordSvg).replace(/#5A1424/gi, fill);
    return `<g transform="scale(${ICON_S})">${icon}</g><g transform="translate(${ICON_W + GAP} 0) scale(${WORD_S})">${word}</g>`;
  };
  const shadowColor = color === "#FFFFFF" ? "#000000" : "#FFFFFF";
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(widthPx) + 8}" height="${h}" viewBox="-4 -4 ${MARK_W + 8 / k} ${MARK_H + 8 / k}">
  <defs><filter id="b" x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="${2.2 / k}"/></filter></defs>
  ${shadow ? `<g filter="url(#b)" opacity="${color === "#FFFFFF" ? 0.65 : 0.45}">${layer(shadowColor, "s")}</g>` : ""}
  <g opacity="${opacity}">${layer(color, "m")}</g>
</svg>`);
}

/** Picks maroon on light areas, white on dark ones (based on the region the mark will cover). */
async function styleFor(image, left, top, w, h) {
  const { channels } = await sharp(image).extract({ left, top, width: w, height: h }).stats();
  const lum = 0.2126 * channels[0].mean + 0.7152 * channels[1].mean + 0.0722 * channels[2].mean;
  return lum > 150 ? { color: "#5A1424", opacity: 0.72, shadow: true } : { color: "#FFFFFF", opacity: 0.82, shadow: true };
}

/** visibleH: how much of the image is actually shown (gallery cards crop posters to 3:5). */
async function markImage(inFile, outFile, { widthFrac, bottomGap, visibleH, forceWhite, position = "bottom" }) {
  const img = sharp(inFile);
  const { width, height } = await img.metadata();
  const markW = Math.round(width * (position === "top-right" ? widthFrac * 0.8 : widthFrac));
  const probe = markSvg(markW, "#FFFFFF", 1, false);
  const { height: markH } = await sharp(probe).metadata();
  const areaH = Math.min(height, visibleH ?? height);
  const left = position === "top-right" ? width - markW - 18 : Math.round((width - markW) / 2) - 4;
  const top = position === "top-right" ? 18 : Math.max(0, areaH - bottomGap - markH);
  const style = forceWhite
    ? { color: "#FFFFFF", opacity: 0.85, shadow: true }
    : await styleFor(inFile, Math.max(0, left), top, Math.min(markW + 8, width - Math.max(0, left)), markH);
  const mark = markSvg(markW, style.color, style.opacity, style.shadow);
  const ext = path.extname(outFile);
  let out = sharp(inFile).composite([{ input: mark, left: Math.max(0, left), top }]);
  out = ext === ".webp" ? out.webp({ quality: 82 }) : out.jpeg({ quality: 84, mozjpeg: true });
  await out.toFile(outFile);
  return style.color;
}

/* ---------- run ---------- */
const only = process.argv.slice(2);
const count = { maroon: 0, white: 0 };
const tally = (c) => count[c === "#FFFFFF" ? "white" : "maroon"]++;

// Published under /designs/ (not /invitations/) so caches never serve the old unmarked files.
fs.mkdirSync(pub("designs"), { recursive: true });
const posters = fs.readdirSync(src("invitations")).filter((f) => f.endsWith(".webp") && (!only.length || only.includes(f.replace(/\.webp$/, ""))));
// Designs whose names or key artwork sit where the mark normally goes (bottom of the visible card).
const POSITION = { "aysha-farhan-falakh-shahzar": "top-right" };
// Designs whose names sit at the very bottom of the card: lift the mark above them (gap from the card's bottom edge, px).
const BOTTOM_GAP = { "fidha-kabeer": 145 };
for (const f of posters) {
  const { width } = await sharp(src("invitations", f)).metadata();
  const id = f.replace(/\.webp$/, "");
  const position = POSITION[id] ?? "bottom";
  tally(await markImage(src("invitations", f), pub("designs", f), { widthFrac: 0.34, bottomGap: BOTTOM_GAP[id] ?? 22, visibleH: Math.round((width * 5) / 3), position }));
}
if (!only.length) {
  fs.mkdirSync(pub("guest-desk"), { recursive: true });
  // Guest-desk screens show the dashboard with sample data and are full of text to the edges,
  // so a mark would sit on top of UI. They are copied as-is.
  for (const f of fs.readdirSync(src("guest-desk"))) fs.copyFileSync(src("guest-desk", f), pub("guest-desk", f));
}
console.log(`watermarked ${posters.length} posters${only.length ? "" : " + copied guest desk screens"} (maroon mark: ${count.maroon}, white mark: ${count.white})`);
