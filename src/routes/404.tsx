import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "@/components/not-found";
import { profile } from "@/lib/content";

// Prerendered to 404.html, which Cloudflare serves for any address with no file. Not code-split:
// an unknown address hydrates this markup without the route, so it must not preload a chunk of its own.
export const Route = createFileRoute("/404")({
  codeSplitGroupings: [],
  head: () => ({
    meta: [{ title: `Not found — ${profile.name}` }, { name: "robots", content: "noindex" }],
  }),
  component: NotFound,
});
