import { generateRssFeed } from "@/lib/blog";

export async function GET() {
  const feed = await generateRssFeed();
  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
