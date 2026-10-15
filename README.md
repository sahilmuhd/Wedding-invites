# The Wedding Edit

Next.js (App Router) · React · TypeScript · Tailwind CSS 4 · Lucide · next/image.

## Run locally
```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck && npm run lint
npm run build && npm start
```

## Where to change things
| What | File |
|---|---|
| Business name, tagline, phone, WhatsApp number | `src/config/brand.ts` |
| Pricing | `src/config/pricing.ts` |
| Features, steps, FAQ copy | `src/config/content.ts` |
| Invitations (142 records) | `src/data/invitations.generated.json` (built by `npm run data` from `legacy/`) |
| Real domain (canonical, sitemap, OG) | set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) |

`legacy/` holds the original HTML/CSS/JS site and source data for reference.

## Real previews
`npm i -D playwright && npx playwright install chromium && npm run capture` takes phone-size screenshots of every
invitation and fills in `poster`. Use `npm run capture -- --only id1,id2` to retake some.
Don't re-run `npm run data` afterwards: it regenerates the JSON from `legacy/` and would drop captured posters.
