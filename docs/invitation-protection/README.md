# Protection kit for invitation sites

For the individual invitation websites (`couple-name.vercel.app`), not for this sales site.

## What it does
| | |
|---|---|
| **Credit** | Adds "Invitation website by weddingwebsites" at the bottom of the invitation (links to Instagram). Free marketing to every guest. |
| **Domain lock** | If the invitation is opened on any address you didn't list, a "Design © weddingwebsites" watermark covers the page and a maroon bar says the design belongs to you. Copies hosted elsewhere become useless. |
| **No Google listing** | Tells search engines not to list the invitation, so couples' names, dates and venues don't show up in searches. |
| **Copyright notice** | A © notice at the top of the script file. |

It makes no network requests, collects nothing, and works on sites with a strict Content-Security-Policy (e.g. jimson-bismy), because it's a separate file with no inline code.

**Honest limit:** someone determined can still delete the script from a copy. The kit stops casual copying and gives you clear proof of ownership if you need a takedown. It isn't unbreakable, and nothing on the public web is.

## Add it to an invitation (2 minutes)
1. Copy `ww-protect.js` into the invitation's folder, next to `index.html` (or into `public/` for sites that serve from there, like jimson-bismy).
2. Add this line just before `</body>` in `index.html`, listing **every** address the invitation is shared on:
   ```html
   <script src="ww-protect.js" data-hosts="ajish-sikha.vercel.app" defer></script>
   ```
   Several addresses: `data-hosts="jishnu-vibha.vercel.app,jishnu-vibha.skenllp.com"`.
3. Optional, recommended: in the project's `vercel.json`, add the header so search engines skip it even before the page loads:
   ```json
   { "headers": [{ "source": "/(.*)", "headers": [{ "key": "X-Robots-Tag", "value": "noindex, nofollow, noarchive" }] }] }
   ```
   (Merge into the existing `headers` list if the project already has one.)
4. Open the invitation on its real address: it should look exactly as before, plus the small credit at the bottom.

> ⚠ If you forget an address in `data-hosts`, guests on that address will see the watermark. Always list the `.vercel.app` address **and** any custom domain.

## Gallery privacy
For couples who haven't agreed to appear in the public gallery, show a copy of their design with placeholder names instead of their real invitation link.
