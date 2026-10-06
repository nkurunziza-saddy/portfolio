import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { siteConfig } from "@/lib/config";
import styles from "@/styles.css?url";

const KEYWORDS = [
  "saddy",
  "nkurunziza",
  "job",
  "react",
  "engineer",
  "fullstack",
  "rust",
  "go",
  "next.js",
  "js",
  "rwanda",
  "africa",
];

const OG_IMAGE = `${siteConfig.url}/og.png`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: siteConfig.name },
      { name: "description", content: siteConfig.description },
      { name: "author", content: "Nkurunziza Saddy" },
      { name: "keywords", content: KEYWORDS.join(",") },
      { name: "creator", content: "saddy" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: siteConfig.url },
      { property: "og:site_name", content: siteConfig.name },
      { property: "og:title", content: siteConfig.name },
      { property: "og:description", content: siteConfig.description },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:creator", content: "@nk-saddy" },
      { name: "twitter:title", content: siteConfig.name },
      { name: "twitter:description", content: siteConfig.description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: styles },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "author", href: siteConfig.links.github },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-full flex flex-col">
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
