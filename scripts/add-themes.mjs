// Tags each invitation in src/data/invitations.generated.json with its design theme (D01, D02…)
// from legacy/themes_report.txt, so the gallery can show one card per theme. Safe to re-run.
//   node scripts/add-themes.mjs
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const norm = (u) => u.replace(/\/$/, "").toLowerCase();
const theme = {};
let cur = null;
for (const line of fs.readFileSync(path.join(root, "legacy/themes_report.txt"), "utf8").split("\n")) {
  const d = line.match(/^=== Design (D\d+)/);
  if (d) { cur = d[1]; continue; }
  const u = line.match(/\[(\w+) *\] (https?:\S+)/);
  if (u && cur) theme[norm(u[2])] = cur;
}
const file = path.join(root, "src/data/invitations.generated.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));
let tagged = 0;
for (const i of data) {
  const t = i.url && theme[norm(i.url)];
  if (t) { i.theme = t; tagged++; } else delete i.theme;
}
fs.writeFileSync(file, JSON.stringify(data, null, 1) + "\n");
console.log(`tagged ${tagged} of ${data.length} invitations with a theme`);
