// Prints data warnings before each build (never fails the build). Run: node scripts/check-data.mjs
import fs from "node:fs";
import path from "node:path";

const file = path.resolve(import.meta.dirname, "../src/data/invitations.generated.json");
const data = JSON.parse(fs.readFileSync(file, "utf8")).filter((i) => !i.hidden);
const list = (rows) => rows.map((i) => `    - ${i.id}${i.url ? `  ${i.url}` : ""}`).join("\n");

const uncategorised = data.filter((i) => i.category === "Wedding");
if (uncategorised.length)
  console.warn(`⚠ ${uncategorised.length} designs have category "Wedding" (only shown under "All"). Recategorise:\n${list(uncategorised)}`);

const guessed = data.filter((i) => i.categorySource === "name-guess" || i.categorySource === "unknown");
if (guessed.length)
  console.warn(`⚠ ${guessed.length} designs were categorised by guessing or not at all. Check by hand:\n${list(guessed)}`);
