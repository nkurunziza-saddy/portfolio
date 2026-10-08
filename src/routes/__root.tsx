import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { Page, SubpageHeader } from "@/components/layout";
import { profile, SITE_URL, twitterHandle } from "@/lib/content";
import styles from "@/styles.css?url";

const KEYWORDS = [
  "saddy",
  "nkurunziza",
  "kigali",
  "rwanda",
  "africa",
  "rugero",
  "jace",
  "inklu",
  "ibuka",
  "engineer",
  "react",
  "fullstack",
];

const OG_IMAGE = `${SITE_URL}/og.png`;

const SEO_DESCRIPTION = `${profile.name} — software engineer based in Kigali, Rwanda. Selected work includes Rugero, Jace, inklu, and Ibuka.`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: profile.name },
      { name: "description", content: SEO_DESCRIPTION },
      { name: "author", content: profile.name },
      { name: "keywords", content: KEYWORDS.join(",") },
      { name: "creator", content: "saddy" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: profile.name },
      { property: "og:title", content: profile.name },
      { property: "og:description", content: SEO_DESCRIPTION },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      ...(twitterHandle ? [{ name: "twitter:creator", content: twitterHandle }] : []),
      { name: "twitter:title", content: profile.name },
      { name: "twitter:description", content: SEO_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist+Mono&family=Inter:wght@400..600&display=swap",
      },
      { rel: "stylesheet", href: styles },
      { rel: "icon", href: "/favicon.ico" },
      ...profile.links.map((link) => ({ rel: "me", href: link.href })),
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <html lang="en" className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <Page>
      <SubpageHeader title="Not found">There is nothing at this address.</SubpageHeader>
    </Page>
  );
}
