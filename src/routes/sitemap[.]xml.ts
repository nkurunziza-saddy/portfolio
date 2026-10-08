import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL, stories } from "@/lib/content";

const sitemap = () =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...["", ...stories.map((story) => `/${story.slug}`)].map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: { GET: () => new Response(sitemap(), { headers: { "Content-Type": "application/xml" } }) },
  },
});
