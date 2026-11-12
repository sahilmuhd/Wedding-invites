import { designItems } from "@/lib/invitations";

/** Full slim design list, built once at build time. The gallery loads it only when a visitor filters, searches or taps "Show more". */
export const dynamic = "force-static";

export function GET() {
  return Response.json(designItems, {
    headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" },
  });
}
