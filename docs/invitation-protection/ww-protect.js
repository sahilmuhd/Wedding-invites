/*!
 * © weddingwebsites (@weddingwebsites.in). This invitation design is copyrighted.
 * Copying or reusing it without permission is not allowed.
 *
 * Drop-in protection for invitation sites:
 *   <script src="ww-protect.js" data-hosts="couple-name.vercel.app,couple-name.skenllp.com" defer></script>
 *
 * 1. Credit: adds a small "Made by weddingwebsites" line at the bottom of the page.
 * 2. Domain lock: on any address not listed in data-hosts, covers the page with a
 *    "Design © weddingwebsites" watermark (copies hosted elsewhere become useless).
 * 3. Search engines: adds <meta name="robots" content="noindex"> so guests' details stay out of Google.
 * No tracking, no network requests, works with strict Content-Security-Policy (no inline code).
 */
(function () {
  "use strict";
  var script = document.currentScript;
  var BRAND = "weddingwebsites";
  var LINK = "https://www.instagram.com/weddingwebsites.in";
  var hosts = ((script && script.getAttribute("data-hosts")) || "")
    .split(",").map(function (h) { return h.trim().toLowerCase(); }).filter(Boolean);
  var here = location.hostname.toLowerCase();
  // Local previews while editing are always allowed.
  var local = location.protocol === "file:" || here === "localhost" || here === "127.0.0.1" || here === "";
  var allowed = local || hosts.indexOf(here) !== -1;

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  /* 3. keep out of search results */
  if (!document.querySelector('meta[name="robots"]')) {
    var m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex, nofollow, noarchive";
    document.head.appendChild(m);
  }

  ready(function () {
    /* 1. credit line: continues the page's last background and picks readable text for it */
    function bgOf(el) {
      for (; el; el = el.parentElement) {
        var c = getComputedStyle(el).backgroundColor;
        if (c && c !== "transparent" && !/rgba\(.*,\s*0\)$/.test(c)) return c;
      }
      return "rgb(255, 255, 255)";
    }
    function isDark(rgb) {
      var v = (rgb.match(/[\d.]+/g) || [255, 255, 255]).map(Number);
      return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2] < 140;
    }
    if (!document.getElementById("ww-credit")) {
      var blocks = [].filter.call(document.body.children, function (e) {
        var s = getComputedStyle(e);
        return e.tagName !== "SCRIPT" && s.display !== "none" && s.position !== "fixed" && s.position !== "absolute";
      });
      var last = blocks[blocks.length - 1];
      var bg = bgOf(last ? last.lastElementChild || last : document.body);
      var fg = isDark(bg) ? "#ffffff" : "#2b1d17";
      var c = document.createElement("a");
      c.id = "ww-credit";
      c.href = LINK;
      c.target = "_blank";
      c.rel = "noopener";
      c.textContent = "Invitation website by " + BRAND;
      c.setAttribute(
        "style",
        "display:block;margin:0;padding:18px 16px 26px;text-align:center;font:400 12px/1.4 system-ui,sans-serif;" +
          "letter-spacing:.06em;color:" + fg + ";background:" + bg + ";opacity:.75;text-decoration:none;position:relative;z-index:1",
      );
      document.body.appendChild(c);
    }

    /* 2. domain lock */
    if (allowed) return;
    var mark = "Design © " + BRAND + " · @weddingwebsites.in";
    var svg =
      "<svg xmlns='http://www.w3.org/2000/svg' width='420' height='260'>" +
      "<text x='0' y='150' transform='rotate(-24 210 130)' font-family='Georgia,serif' font-size='22' " +
      "fill='rgba(90,20,36,0.38)'>" + mark + "</text></svg>";
    var veil = document.createElement("div");
    veil.id = "ww-veil";
    veil.setAttribute("aria-hidden", "true");
    veil.setAttribute(
      "style",
      "position:fixed;inset:0;z-index:2147483647;pointer-events:none;" +
        "background-image:url(\"data:image/svg+xml," + encodeURIComponent(svg) + "\");background-repeat:repeat",
    );
    var bar = document.createElement("a");
    bar.href = LINK;
    bar.target = "_blank";
    bar.rel = "noopener";
    bar.textContent = "This design belongs to " + BRAND + ". Get your own invitation →";
    bar.setAttribute(
      "style",
      "position:fixed;left:0;right:0;bottom:0;z-index:2147483647;padding:14px 16px;text-align:center;" +
        "font:500 14px/1.4 system-ui,sans-serif;color:#fff;background:#5A1424;text-decoration:none",
    );
    document.body.appendChild(veil);
    document.body.appendChild(bar);
  });
})();
