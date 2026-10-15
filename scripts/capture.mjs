/**
 * Captures a phone-size screenshot of every invitation and wires it into the data.
 * Read-only: it just opens each public invitation URL like a visitor would.
 *
 *   npm i -D playwright && npx playwright install chromium
 *   node scripts/capture.mjs              # all invitations without a poster
 *   node scripts/capture.mjs --all        # retake everything
 *   node scripts/capture.mjs --only alwin-sona,hanan-aslam
 *
 * Output: public/invitations/{id}.webp (480px wide) + updates `poster`/`posterSize`
 * in src/data/invitations.generated.json. Failures are listed at the end.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { chromium } from "playwright";

const root = path.resolve(import.meta.dirname, "..");
const file = path.join(root, "src/data/invitations.generated.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));
const args = process.argv.slice(2);
const only = args.includes("--only") ? args[args.indexOf("--only") + 1].split(",") : null;
const all = args.includes("--all");
const todo = data.filter((i) => i.url && !i.hidden && (only ? only.includes(i.id) : all || !i.poster));

fs.mkdirSync(path.join(root, "public/invitations"), { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const failed = [];

for (const [n, inv] of todo.entries()) {
  const page = await ctx.newPage();
  try {
    const res = await page.goto(inv.url, { waitUntil: "networkidle", timeout: 30000 });
    if (!res || res.status() >= 400) throw new Error(`HTTP ${res?.status()}`);
    // Many invitations start with a "tap to open" cover: try to open it, then let the intro settle.
    const opener = page.getByText(/^\s*(tap to (open|begin)|open( invitation)?)\s*$/i).first();
    if (await opener.count()) await opener.click({ timeout: 2000 }).catch(() => {});
    await page.waitForTimeout(2500);
    const buf = await page.screenshot({ type: "png" });
    const out = await sharp(buf).resize(480).webp({ quality: 82 }).toBuffer();
    const meta = await sharp(out).metadata();
    fs.writeFileSync(path.join(root, `public/invitations/${inv.id}.webp`), out);
    inv.poster = `/invitations/${inv.id}.webp`;
    inv.posterSize = [meta.width, meta.height];
    console.log(`[${n + 1}/${todo.length}] ok   ${inv.id}`);
  } catch (e) {
    failed.push(`${inv.id} ${inv.url} — ${e.message}`);
    console.log(`[${n + 1}/${todo.length}] FAIL ${inv.id}: ${e.message}`);
  }
  await page.close();
  fs.writeFileSync(file, JSON.stringify(data, null, 1) + "\n"); // save progress as we go
}
await browser.close();
console.log(`\nDone. ${todo.length - failed.length} captured, ${failed.length} failed.`);
if (failed.length) console.log(failed.join("\n"));
