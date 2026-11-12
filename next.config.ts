import type { NextConfig } from "next";

/** Applied to every page and file. None of these change how the site looks or behaves for visitors. */
const securityHeaders = [
  // Other websites can't show this site inside a frame (stops look-alike pages and click-jacking).
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self'" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Browsers must treat files as the type we say they are.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Only the site's origin (not full page addresses) is shared when visitors click through to other sites.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The site never needs these, so nothing on it (including embedded invitations) can ask for them.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  images: { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/designs/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
