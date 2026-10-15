/**
 * Builds src/data/invitations.generated.json from the legacy data in /legacy.
 *   node scripts/build-data.mjs
 *
 * - Keeps every record from legacy/samples.js (the live gallery data).
 * - Categories: content signals from legacy/themes_report.txt (design clusters),
 *   cross-checked with legacy/samples.deduped.js, then the original category.
 * - Marks same-couple/same-category variants as duplicates (kept, but hidden).
 * - Converts poster JPGs to WebP thumbnails in public/invitations.
 * No network access is used.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const loadSamples = (p) => new Function(read(p) + ";return SAMPLES")();
const norm = (u) => u.replace(/\/$/, "").toLowerCase();

const legacy = loadSamples("legacy/samples.js");
const deduped = loadSamples("legacy/samples.deduped.js");
const dedupedByUrl = new Map(deduped.map((s) => [norm(s.url), s]));

/* ---- design clusters from the themes report ---- */
const clusters = {};
const urlToCluster = {};
let cur = null;
for (const line of read("legacy/themes_report.txt").split("\n")) {
  let m = line.match(/^=== Design (D\d+)/);
  if (m) { cur = m[1]; clusters[cur] = { labels: "", urls: [] }; continue; }
  m = line.match(/^sample labels: (.*)/);
  if (m && cur) clusters[cur].labels = m[1].toLowerCase();
  m = line.match(/\[(\w+) *\] (https?:\S+)/);
  if (m && cur) { clusters[cur].urls.push(norm(m[2])); urlToCluster[norm(m[2])] = cur; }
}

const RX = {
  Nikah: /allah|nikah|nikkah|bismill|masjid|insha|assalam|[؀-ۿ]/i,
  Christian: /genesis|ephesians|ecclesiastes|psalm|bible|holy matrimony|matthew|song of solomon|\bruth\b|corinthians|church|\bmass\b/i,
  Hindu: /ganesh|shubh|vivah|[ऀ-ॿ]|ഗണപതി|guruvayur/i,
};
function signalFor(url) {
  const c = urlToCluster[norm(url)];
  if (!c) return null;
  const hits = Object.keys(RX).filter((k) => RX[k].test(clusters[c].labels));
  return hits.length === 1 ? hits[0] : null;
}

const SITE_CATS = ["Nikah", "Hindu", "Christian", "Engagement", "Reception", "Housewarming"];
const CAT_LABEL = {
  Nikah: "Nikah", Hindu: "Hindu Wedding", Christian: "Christian Wedding",
  Engagement: "Engagement", Reception: "Reception", Housewarming: "Housewarming",
  Wedding: "Wedding",
};

function classify(s) {
  const u = norm(s.url || "");
  if (/housewarming|house-warming/.test(u)) return ["Housewarming", "url"];
  if (/reception/.test(u)) return ["Reception", "url"];
  if (/betrothal|engagement/.test(u)) return ["Engagement", "url"];
  const content = signalFor(s.url || "");
  const listed = dedupedByUrl.get(u)?.cat;
  const listedOk = SITE_CATS.includes(listed) ? listed : null;
  const original = SITE_CATS.includes(s.cat) ? s.cat : null;
  if (content && listedOk && content === listedOk) return [content, "content+list"];
  if (content) return [content, "content"];
  if (original && SITE_CATS.includes(original)) return [original, "original"];
  if (listedOk) return [listedOk, "name-guess"];
  return ["Wedding", "unknown"];
}

/* ---- posters: real screenshots that already exist in /images ---- */
const POSTERS = {
  "vinay-athira-wedding.vercel.app": "vinay-athira.jpg",
  "jishnu-vibha.skenllp.com": "vibha-jishnu.jpg",
  "sanoop-fidha.vercel.app": "sanoop-fidha.jpg",
  "shanu-hanna.skenllp.com": "fathima-shanu.jpg",
};
const NO_URL_POSTERS = { "Sandra|Vishnu": "vishnu-sandra.jpg" };

const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const titleCase = (t) => t.trim().replace(/\s+/g, " ").replace(/\s+Ctlb$/i, "");

const FEATURED = ["vinay-athira", "jishnu-vibha", "sanoop-fidha", "shanu-farhan-fathima-hanna", "vishnu-sandra"];

const out = [];
const seenIds = new Set();
for (const s of legacy) {
  const bride = titleCase(s.bride), groom = titleCase(s.groom);
  let id = slug(`${groom}-${bride}`);
  if (seenIds.has(id)) id = slug(`${id}-${(s.cat || "").toLowerCase()}-${slug(new URL(s.url || "https://x.y").hostname).slice(0, 12)}`);
  seenIds.add(id);
  const host = s.url ? new URL(s.url).hostname : "";
  const posterFile = POSTERS[host] || NO_URL_POSTERS[`${bride}|${groom}`] || null;
  const [category, categorySource] = classify(s);
  out.push({
    id, bride, groom, category, categorySource,
    url: s.url || null,
    price: s.price,
    poster: posterFile ? `/invitations/${id}.webp` : null,
    _src: posterFile,
  });
}

/* duplicates: same couple + same category (order-insensitive) */
const keyOf = (i) => [i.bride, i.groom].map((x) => x.toLowerCase()).sort().join("|") + "|" + i.category;
const groups = new Map();
for (const i of out) { const k = keyOf(i); groups.set(k, [...(groups.get(k) || []), i]); }
for (const g of groups.values()) {
  if (g.length < 2) continue;
  g.sort((a, b) => (b.poster ? 1 : 0) - (a.poster ? 1 : 0)); // keep one with poster first, else first seen
  g.slice(1).forEach((d) => { d.hidden = true; d.duplicateOf = g[0].id; });
}

/* featured order */
out.forEach((i) => { const k = FEATURED.indexOf(i.id); if (k >= 0) i.featured = k + 1; });
/* sixth featured = a real entry without poster, picked for variety (first Christian) */
const sixth = out.find((i) => i.category === "Christian" && !i.hidden && i.url);
if (sixth) sixth.featured = 6;

/* ---- thumbnails ---- */
const outDir = path.join(root, "public/invitations");
fs.mkdirSync(outDir, { recursive: true });
for (const i of out) {
  if (!i._src) continue;
  const meta = await sharp(path.join(root, "legacy/images", i._src)).metadata();
  const w = 480, h = Math.round((meta.height / meta.width) * w);
  await sharp(path.join(root, "legacy/images", i._src)).resize(w).webp({ quality: 82 }).toFile(path.join(outDir, `${i.id}.webp`));
  i.posterSize = [w, h];
  delete i._src;
}
out.forEach((i) => delete i._src);

fs.mkdirSync(path.join(root, "src/data"), { recursive: true });
fs.writeFileSync(path.join(root, "src/data/invitations.generated.json"), JSON.stringify(out, null, 1) + "\n");

const count = (f) => out.filter(f).length;
console.log("records:", out.length, "| hidden duplicates:", count((i) => i.hidden), "| no URL:", count((i) => !i.url));
console.log("by category:", Object.fromEntries(Object.keys(CAT_LABEL).map((c) => [c, count((i) => !i.hidden && i.category === c)])));
console.log("by source:", out.reduce((a, i) => ((a[i.categorySource] = (a[i.categorySource] || 0) + 1), a), {}));
console.log("duplicates:", out.filter((i) => i.hidden).map((i) => `${i.id}->${i.duplicateOf}`).join(", "));
