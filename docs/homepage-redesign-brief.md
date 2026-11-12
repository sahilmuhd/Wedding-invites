# Homepage redesign: critique, direction and build brief

Site: https://invite.weddinginvitation.family · Review date: 12 Nov 2026
Goal: make it feel premium and get more WhatsApp enquiries, mainly from Instagram visitors on phones.

---

## Part 1: The 10 biggest problems, ranked by impact

**1. "View invitation" sends visitors away.** This is the moment they're most interested, and it opens a bare `*.vercel.app` page in a new tab. That page has no branding, no price and no way to order. On a phone, a new tab feels like leaving the site, and many people won't find their way back. This is the biggest leak in the funnel.
*Code: `InvitationCard.tsx` links straight to `invitation.url` with `target="_blank"`.*

**2. Eighteen identical green buttons.** Repeating a bright button makes the site look like a discount shop and gives no hint which step matters. Every gallery card has two actions ("View" and "Customize"), so 12 cards alone add 24 tap targets. Premium brands use one clear action per screen.

**3. The site doesn't look like your Instagram.** Someone taps the link in your bio and lands on "Serein Atelier" with a plain "S", beige and Inter. They'd just been looking at "weddingwebsites" with maroon and an envelope logo, so for a moment they wonder if they're in the right place. The WhatsApp messages also start with "Hello Serein Atelier".
*Code: `brand.ts` (name), `Header.tsx` (letter logo), `whatsapp.ts` (message text).*

**4. The visual system looks generic.** Inter on beige with rounded white cards is the look of a default template. Your maroon appears nowhere. Headings and body text use the same font (`globals.css` sets both to Inter), so there's no sense of occasion.

**5. The first screen doesn't show the product.** What you sell is an invitation that opens, plays music and counts down. On mobile the hero is text with a small still image (`w-44`). The moving demo is in the next section, and visitors have to tap play to see it.

**6. The gallery is too long on mobile.** Below 560px it's one column (`grid-cols-1`), so 12 cards take up many screens of scrolling, each with two buttons. The 6 featured designs repeat the same card style just above. Also, 9 designs are labelled "Wedding", which has no filter tab, so they only show under "All".

**7. Pricing is confusing.** Each card shows its own price (₹999 or ₹1,499), which suggests the price belongs to the design. The Pricing section says the price depends on the plan. The Premium list also includes features you didn't list in your brief: a coordinator call button, itinerary and dress code, "2 rounds" of revisions, "up to 20 photos" and "lifetime" hosting. If any of these aren't guaranteed, they're a risk to trust.

**8. Too little reassurance right before the tap.** There are no testimonials yet (fine, but plan a place for them). The low-risk offer, "₹200 to book, pay the rest after you approve", is in the FAQ and the steps instead of next to the button. The cards also show real couples' names. Get consent for each one, or give designs their own names (see Decisions).

**9. Link previews and Google point to the old address.** The canonical URL, sitemap and share image use `wedding-invites-tau-sooty.vercel.app`. The cause is in `brand.ts`: when `NEXT_PUBLIC_SITE_URL` isn't set, `siteUrl` falls back to `VERCEL_PROJECT_PRODUCTION_URL`, which is the old Vercel address. WhatsApp and Instagram previews show that address, and Google may index it.

**10. Slow to respond on mid-range Android phones.** Total Blocking Time is 550 ms. The whole 142-design dataset, including build-only fields like `categorySource`, is passed to the client-side `Gallery`, along with a client-side header. On a budget phone, taps lag right when people start using the filters.

---

## Part 2: Design direction

**Mood: "a sealed invitation in your hand."** Mostly white space, maroon used sparingly like ink and wax, an elegant serif and very little decoration. The envelope logo and the wax-seal demo video tell the same story, so build the design around it: a sealed envelope that opens.

### Colour
| Token | Hex | Use |
|---|---|---|
| `maroon` | `#5A1424` | Main buttons, headings, emphasis words, closing section background |
| `maroon-deep` | `#3E0D18` | Hover and pressed states |
| `maroon-tint` | `#F6EEF0` | Background for alternating sections (replaces beige) |
| `white` | `#FFFFFF` | Main background |
| `ink` | `#241418` | Body text |
| `ink-soft` | `#6E5C60` | Secondary text (meets 4.5:1 contrast on white and on tint) |
| `line` | `#EADFE2` | Dividers and card borders |

Rules: about 80% of the page is white, 15% tint and 5% maroon. No green buttons. WhatsApp is shown by its icon and the words "on WhatsApp", not by its colour. No gradients and no gold.

### Typography
- **Playfair Display** for headings: weights 400 and 500, plus italic 400 for one emphasised word per heading (for example "Your wedding, *beautifully* invited.").
- **Jost** for body text, labels and buttons: weights 400 and 500. Use uppercase with wide letter spacing (0.18em) only for small labels above headings.
- Mobile sizes: H1 40/44px, H2 30/36px, body 16/26px, label 12px. Desktop: H1 64px, H2 44px, body 17px.
- Keep lines to about 34 characters on mobile headings and 65 on desktop body text.

### Layout
- Design for 390px width first. Side margins 20px, space between sections 72px on mobile and 120px on desktop, maximum content width 1120px.
- Separate things with whitespace and thin lines, not with stacks of cards. Use cards only for design thumbnails and the two price plans.
- Gallery: **2 columns on phones**, 3 on tablets, 4 on desktop. Each card is just a thumbnail, the design name and the category. Tapping the card opens the preview.
- **One WhatsApp action per section, plus a slim bottom bar** on mobile (replaces the floating button).

### Motion (subtle, never in the way)
- Sections fade in and rise 12px over 400ms as they scroll into view. Animate only `opacity` and `transform`.
- Logo: on first load, the heart seal fades in once (about 600ms). Never block the page while it plays.
- Hero: a short, muted, looping clip of the wax-seal opening plays inside a phone frame. It starts after the page has loaded and shows a still image if reduced motion or data saver is on.
- Preview: opens as a full-screen sheet that slides up (300ms) and closes with a swipe down, the ✕ button or the phone's back button.
- With `prefers-reduced-motion`, all of this is replaced by simple fades or nothing.

### The first 5 seconds on a phone (from an Instagram link)
| Time | What they see |
|---|---|
| 0–0.5s | White screen, envelope logo with the brand name (same as Instagram) and the headline in Playfair. No splash screen and no layout jump. |
| 0.5–1.5s | Below the headline: one line of supporting text, the reassurance line "From ₹999 · Book with ₹200 · Pay after you approve" and one maroon button, **Start on WhatsApp**. |
| 1.5–3s | The top of a phone frame shows at the bottom of the screen. The wax seal breaks and the invitation opens. It feels like the logo coming to life. |
| 3–5s | The visitor scrolls. The sticky bottom bar appears (Start on WhatsApp · From ₹999), and the design chips come into view. |

---

## Part 3: The new homepage, section by section

> Copy uses only facts from your brief. Text in [square brackets] is a placeholder for you to fill in.

### 0. Header (sticky, 56px)
Envelope logo with the brand name on the left. On the right, a "Designs" link and a small outlined WhatsApp icon button. The menu has: Designs · Pricing · FAQ · Instagram.

### 1. Hero
- **Label:** Wedding invitation websites
- **H1:** Your wedding, *beautifully* invited.
  - Alternatives: "One link. Your whole celebration." / "An invitation they'll *open*, not just receive."
- **Sub:** A personalised invitation website for your Nikah, wedding or engagement, with your song, a live countdown and one-tap directions. Ready in 24 hours.
- **Reassurance line:** From ₹999 · Book with ₹200 · Pay the rest after you approve
- **Main button:** Start on WhatsApp
- **Secondary link:** See all 140 designs ↓
- **Visual:** a phone frame with the muted wax-seal clip looping.

### 2. See it open
- **H2:** Watch it *open*.
- **Body:** Recorded on a real phone. Tap for sound.
- Both demo videos as a swipeable carousel (one at a time on mobile). No button in this section.

### 3. Designs
- **H2:** 140 designs for *your* celebration.
- **Body:** Tap any design to see it exactly as your guests will. We personalise every one with your names, photos, colours and song.
- **Chips:** All 140 · Nikah 78 · Hindu 23 · Christian 25 · Engagement & more. The last chip covers engagement, reception and housewarming.
- 2-column grid showing 12 designs, then "Show more". Search goes behind a small icon.
- **Preview sheet** (opens when a card is tapped): the live invitation inside the sheet, with a fixed bar at the bottom: **Book this design on WhatsApp**. The message names the design.
- Empty state: "Can't find the one? Tell us what you have in mind." Button: Ask on WhatsApp.
- This replaces both the separate "Featured" section and the old gallery. "All" starts with the 6 featured designs.

### 4. What's inside
- **H2:** Everything your guests need, in *one link*.
- Six features, each with a thin-line icon and one line of text:
  - Your song plays as they open it
  - A live countdown to the day
  - One-tap Google Maps directions
  - RSVP · *Premium*
  - Photo gallery · *Premium*
  - Add to calendar · *Premium*

### 5. How it works
- **H2:** Booked in *three* messages.
- 1. **Choose a design.** Tap any design to preview it.
- 2. **Send your details on WhatsApp.** Names, date, venue and photos. Reserve your slot with a ₹200 UPI advance.
- 3. **Approve and share.** Your preview is ready in 24 hours. Approve it, pay the balance and share your link.

### 6. Pricing
- **H2:** One-time price. *No surprises.*
- **Classic, ₹999:** Personalised invitation website · Background music · Live countdown · One-tap Google Maps. Button: Choose Classic.
- **Premium, ₹1,499** (highlighted): Everything in Classic, plus RSVP · Photo gallery · Add to calendar. Button: Choose Premium.
- **Below both:** ₹200 UPI advance to book · Balance after you approve the preview · Delivered in 24 hours.
- Only add features you've confirmed (see Decisions).

### 7. Kind words (hidden until you have real testimonials)
- **H2:** From our *couples*.
- 3 quote cards: "[Real quote]" — [First names], [Event type], [Month Year]. Only show this section once you have real, approved quotes.

### 8. FAQ
- **H2:** Questions, *answered*.
- How fast will I get it? → Within 24 hours of receiving your details and the ₹200 advance.
- How do I pay? → ₹200 by UPI to book, adjusted in your total. The balance is paid after you approve the preview.
- Can it match our colours and traditions? → Yes. Every invitation is personalised with your colours, photos and traditions.
- Do guests need an app? → No. It's one link that opens on any phone.
- What's the difference between Classic and Premium? → Premium adds RSVP, a photo gallery and add-to-calendar.
- How long does my link stay live? → [Your answer: confirm the hosting period]

### 9. Closing call to action (full-width maroon, white text)
- Envelope logo in white.
- **H2:** Let's write your invitation.
- **Body:** Send us a message on WhatsApp with your date. We'll take it from there.
- **Button (white on maroon):** Chat on WhatsApp
- Below: +91 75609 43996

### 10. Footer
Logo · Instagram @weddingwebsites.in · WhatsApp +91 75609 43996 · © 2026 [Brand name]

---

## Decisions needed from you before building

1. **One brand name** for the site, Instagram and WhatsApp messages. The site says "Serein Atelier", Instagram says "weddingwebsites" and the domain says "weddinginvitation.family". Recommendation: use the Instagram identity and envelope logo on the site, since that's where visitors come from. Or rename the Instagram display name to match the site.
2. **Design names vs couple names.** Do you have each couple's consent to show their names? If not, give designs their own names (for example "Wax Seal", "Arched Doors").
3. **Per-design price.** Can every design be ordered as either Classic or Premium? If yes, remove the per-card price.
4. **Unconfirmed Premium extras** currently on the site (coordinator call button, itinerary and dress code, 2 revision rounds, 20-photo limit, lifetime hosting): keep or remove?
5. **9 designs labelled "Wedding"**: which category should each go in?
6. **24 designs were categorised by guessing from the couple's names.** Please check them by hand. Showing a family's invitation under the wrong religion is a real risk.

---

## Part 4: Build brief for the AI developer

> Copy everything below this line into Claude Code.

### Context
You are redesigning the homepage of an existing Next.js (App Router) + Tailwind v4 site in this repository. It sells personalised wedding invitation websites in Kerala, India. Orders come only through WhatsApp. Most visitors arrive from Instagram on phones. Build for 390px width first.

Read `docs/homepage-redesign-brief.md` Parts 2 and 3 for the design direction and the exact copy. Keep `src/config/*` as the single source of truth for brand, content and pricing. Don't hard-code copy in components.

**Hard rules**
- Don't invent testimonials, client counts, awards, ratings or features. Only these features exist: background music, live countdown, one-tap Google Maps, RSVP (Premium), photo gallery (Premium), add-to-calendar (Premium).
- Prices: Classic ₹999 and Premium ₹1,499, one-time. ₹200 UPI advance to book, balance after approving the preview. Delivered in 24 hours.
- WhatsApp +91 75609 43996 (`917560943996`) is the only way to order. Instagram is @weddingwebsites.in.
- Where the owner hasn't decided something (see "Decisions needed"), use the config placeholders and leave a `TODO(owner)` comment.

### Tasks

**T1. Brand tokens and fonts**
- In `src/app/globals.css`, replace the ivory/gold/beige/charcoal tokens with: `maroon #5A1424`, `maroon-deep #3E0D18`, `maroon-tint #F6EEF0`, `ink #241418`, `ink-soft #6E5C60`, `line #EADFE2`, and white.
- Load Playfair Display (400, 500, italic 400) and Jost (400, 500) with `next/font/google` (`display: "swap"`, latin subset). Expose them as `--font-serif` and `--font-sans`.
- Remove `src/fonts/inter-*.woff2` and the `@fontsource-variable/inter` dev dependency.
- Add the envelope-with-heart logo as an inline SVG component (`src/components/ui/Logo.tsx`) using `currentColor`. Use it in the header, closing section and footer, and as `src/app/icon.svg`. If the owner hasn't supplied the artwork, draw a simple line envelope with a heart seal and mark it `TODO(owner): replace with final logo`.
- Set `brand.name` in `src/config/brand.ts` to `TODO(owner)` with the current value as default. All WhatsApp messages must use `brand.name`.

**Acceptance:** No Inter, beige or `#17794a` anywhere in `src/` (`grep -ri "inter\|beige\|17794a" src` returns nothing relevant). Headings are Playfair, body text is Jost. Every text and background pair meets WCAG AA contrast.

**T2. WhatsApp calls to action**
- Restyle the `whatsapp` button variant: maroon background, white text, WhatsApp glyph icon, hover `maroon-deep`. Add a `light` variant (white on maroon) for the closing section.
- Delete `FloatingWhatsApp`. Add `MobileCtaBar`, a bar fixed to the bottom on screens under 768px that is 64px tall plus the safe-area inset (`env(safe-area-inset-bottom)`). It shows "From ₹999" on the left and **Start on WhatsApp** on the right. It appears only after the hero button scrolls out of view (use IntersectionObserver), and hides while the closing section or the preview sheet is visible.
- Remove all buttons from gallery cards.
- Prefilled messages (in `src/lib/whatsapp.ts`):
  - General: `Hi {brand}! I'd like a wedding invitation website. Our event date is: `
  - Design: `Hi {brand}! I'd like to book the "{design}" design ({category}). Our event date is: `
  - Plan: `Hi {brand}! I'd like the {plan} plan (₹{price}). Our event date is: `
- Track every WhatsApp tap with `track("whatsapp_click", { location, design?, plan? })` from `@vercel/analytics`. `location` is one of `header`, `hero`, `sheet`, `pricing-classic`, `pricing-premium`, `closing`, `bar`, `empty-state`.

**Acceptance:** At 390px, the page has no more than 7 WhatsApp buttons: header icon, hero, 2 pricing, closing, empty state and bar, plus 1 in the preview sheet. Each sends its own message and analytics event. The bar never covers the closing section's button and never hides content (add bottom padding to make room for it).

**T3. Preview inside the site**
- Tapping a gallery card opens `PreviewSheet`, a full-screen `<dialog>` (or an element with `role="dialog"` and `aria-modal`) containing:
  - A top bar with the design name, category and a close button.
  - An `<iframe>` of `invitation.url` with a `title`, `loading="lazy"` and `allow="autoplay; fullscreen"`, framed like a phone on desktop and full-bleed on mobile.
  - A fixed bottom bar: **Book this design on WhatsApp**.
- Opening the sheet adds `?design={id}` to the URL with `pushState`. The browser or Android back button, Escape and swiping down all close it. Loading the page with `?design={id}` opens that design.
- Trap keyboard focus inside the sheet, and return focus to the card when it closes.
- Fallback: if `url` is null, or the iframe hasn't loaded within 8s, show the poster image and a link "Open full screen ↗".
- Before building, check one sample's response headers (`curl -sI https://farira-sabrudeen-1.vercel.app/`). If `X-Frame-Options` or `frame-ancestors` blocks framing, report it and use the fallback for every design.
- Track `track("preview_open", { design })`.

**Acceptance:** On a phone, a visitor can open a design, scroll through it, play its music, book it or go back to the gallery without ever leaving the domain. The back button closes the sheet instead of leaving the site.

**T4. Hero**
- Copy from Part 3, section 1. All copy goes in `src/config/content.ts`.
- On mobile, show a phone frame (about 220px wide) under the button, with its top visible above the fold on a 390×844 screen. Inside, use the poster image (`priority`, this is the LCP image), then swap in a muted, `playsInline`, looping clip after `window` `load`. Skip the clip when `prefers-reduced-motion` or `navigator.connection.saveData` is set.
- Create the clip from `public/videos/demo-nikah-1.mp4`: 5–6 seconds, no audio, 540px wide, at most 900 KB (use ffmpeg if available, otherwise leave `TODO(owner)` and use the poster).
- Desktop: two columns, with the text on the left and the phone on the right.

**Acceptance:** On a 390×844 screen, the headline, reassurance line and main button are all visible without scrolling, along with the top of the phone frame. LCP is under 2.5s with Lighthouse mobile throttling.

**T5. Designs section (replaces `Featured` and `GallerySection`)**
- Chips: All · Nikah · Hindu · Christian · Engagement & more, each with a count from the data. "Engagement & more" covers Engagement, Reception and Housewarming. Designs labelled `Wedding` appear only under All until the owner recategorises them, and the build script prints a warning listing them.
- Grid: 2 columns under 640px, 3 at `md`, 4 at `lg`. Each card shows the poster cropped to the top 3:5 with `object-position: top`, the design name and the category. No per-card price unless `TODO(owner)` decision 3 says otherwise.
- Show 12 designs, then a **Show more** button that adds 12. "All" lists featured designs first.
- Search goes behind a search icon next to the chips.
- Keep the `?cat=` and `?q=` URL sync.
- Add an optional `title` field to `Invitation`. Cards show `title ?? displayName(invitation)`.
- Performance: render the first 12 cards on the server. Send the client only `{ id, title, bride, groom, category, url, poster, posterSize, featured }` and drop build-only fields. Load the remaining designs' data only when the visitor filters, searches or taps Show more.

**Acceptance:** The first 12 cards take no more than about 3 screen heights at 390px. Filtering responds in under 100ms on a mid-range Android phone (Lighthouse "Moto G Power" profile). No design appears twice.

**T6. Other sections**
Build "See it open" (swipeable carousel with scroll-snap, `preload="none"`), "What's inside", "How it works", "Pricing", "FAQ", "Closing" and "Footer" with the exact copy from Part 3.
- Pricing comes from `src/config/pricing.ts`. Trim the feature lists to the confirmed features only. Move the unconfirmed ones into a commented `TODO(owner)` block.
- Create `src/config/testimonials.ts` exporting an empty array with a typed example in a comment. The "Kind words" section only renders when the array isn't empty.
- FAQ: keep `<details>` and the FAQPage JSON-LD. Leave the hosting-period answer as `TODO(owner)` and leave that question out until it's filled in.

**Acceptance:** Each section has one H2 and at most one call to action. No testimonial markup is rendered while the array is empty. All copy matches Part 3.

**T7. Motion**
Add a small `Reveal` wrapper that fades sections in and moves them up 12px over 400ms (`ease-out`) as they enter the viewport. Use IntersectionObserver and CSS only, with no animation library. Each element animates once. Respect `prefers-reduced-motion`.

**Acceptance:** No layout shift from motion (CLS < 0.05). Without JavaScript, all content is still visible.

**T8. Domain, SEO and sharing**
- In `brand.ts`, set `siteUrl` from `NEXT_PUBLIC_SITE_URL`, defaulting to `https://invite.weddinginvitation.family`. **Remove the `VERCEL_PROJECT_PRODUCTION_URL` fallback.** Update `.env.example`.
- Regenerate `public/og.jpg` (1200×630) with `scripts/make-og.mjs` in the new brand: white or maroon, logo, headline and a phone mockup.
- Set `themeColor` to `#FFFFFF`. Update the title and description to the new brand. Add `url`, `logo` and `sameAs: ["https://www.instagram.com/weddingwebsites.in"]` to the Organization JSON-LD.
- Tell the owner (don't do this yourself): add a 308 redirect from `wedding-invites-tau-sooty.vercel.app` to the main domain under Vercel → Project → Domains, and set `NEXT_PUBLIC_SITE_URL` in Production.

**Acceptance:** `curl -s https://invite.weddinginvitation.family | grep -o 'canonical[^>]*'`, `/sitemap.xml`, `/robots.txt` and `og:image` all point to `invite.weddinginvitation.family`. The old Vercel address doesn't appear anywhere in the built HTML.

### Overall acceptance criteria
- Lighthouse mobile (production build): **Performance ≥ 90, Total Blocking Time < 200 ms**, LCP < 2.5 s, CLS < 0.05. Accessibility, Best practices and SEO stay at 100.
- No horizontal scrolling at 360px. All tap targets are at least 44×44px.
- `npm run lint`, `npm run typecheck` and `npm run build` pass. Existing CI passes.
- Test by hand at 360, 390 and 430px, and on desktop at 1280px: open a preview, go back with the back button, book from the preview and check the WhatsApp message text.
- Finish with a short report: what changed, before and after Lighthouse scores, and the list of `TODO(owner)` items left.
