import { designItems } from "@/lib/invitations";
import { demo, guestDesk } from "@/config/content";

/**
 * Serves one of OUR invitations through this site with its RSVP and wishes forms hidden and
 * blocked, so visitors browsing designs can't send wishes or RSVPs to a real couple.
 *   /preview?u=https://couple.vercel.app/
 * Only addresses of invitations shown on this site are allowed (never an open proxy).
 */
const allowed = new Set<string>(
  [
    ...designItems.flatMap((d) => [d.url, ...(d.more ?? []).map((m) => m.url)]),
    ...guestDesk.examples.map((e) => e.url),
    demo.live.url,
  ]
    .filter((u): u is string => !!u)
    .map((u) => new URL(u).href),
);

/** Injected into every previewed invitation. */
const LOCK = `
<style id="ww-preview-lock">
  form,
  [id*="rsvp" i], [class*="rsvp" i],
  [id*="wish" i], [class*="wish" i],
  [id*="guestbook" i], [class*="guestbook" i],
  a[href*="wa.me"], a[href*="whatsapp" i] { display: none !important; }
</style>
<script>
(function () {
  // Nothing can be submitted from a preview.
  document.addEventListener("submit", function (e) { e.preventDefault(); e.stopImmediatePropagation(); }, true);
  var nativeFetch = window.fetch;
  window.fetch = function (input, init) {
    var method = (init && init.method) || (input && input.method) || "GET";
    if (String(method).toUpperCase() !== "GET") return Promise.resolve(new Response("{}", { status: 200 }));
    return nativeFetch.apply(this, arguments);
  };
  var open = XMLHttpRequest.prototype.open, send = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (m) { this.__wwBlock = String(m).toUpperCase() !== "GET"; return open.apply(this, arguments); };
  XMLHttpRequest.prototype.send = function () { if (this.__wwBlock) return; return send.apply(this, arguments); };
})();
</script>`;

export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get("u") ?? "";
  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return new Response("Not found", { status: 404 });
  }
  if (!allowed.has(target.href)) return new Response("Not found", { status: 404 });

  const res = await fetch(target.href, { next: { revalidate: 3600 }, headers: { "user-agent": "weddingwebsites-preview" } });
  if (!res.ok) return new Response("Not available", { status: 502 });
  let html = await res.text();

  // <base> makes the invitation's own images, styles and scripts load from its real address.
  // Single-page apps choose what to show from the address, so present their own path instead of /preview.
  const path = JSON.stringify(target.pathname + target.search + target.hash);
  // Absolute same-origin URL: with <base> set, a relative "/" would point at the invitation's domain and be refused.
  const route = `<script>try{history.replaceState(history.state,"",location.origin+${path})}catch(e){}</script>`;
  const head = `<base href="${target.href}">${route}${LOCK}`;
  html = /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, (m) => m + head) : head + html;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=600, s-maxage=3600",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}
