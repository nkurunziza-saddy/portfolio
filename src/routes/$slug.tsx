import { createFileRoute, notFound } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { Arrow } from "@/components/arrow";
import { Page, SubpageHeader } from "@/components/layout";
import { Prose } from "@/components/prose";
import { findStory, profile, SITE_URL, type Story, type StorySection } from "@/lib/content";
import { anchor } from "@/lib/prose";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    if (!findStory(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const story = findStory(params.slug);
    if (!story) return {};
    const title = `${story.title} — ${profile.name}`;
    return {
      meta: [
        { title },
        { name: "description", content: story.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${SITE_URL}/${story.slug}` },
        { property: "og:title", content: title },
        { property: "og:description", content: story.summary },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: story.summary },
      ],
    };
  },
  component: StoryPage,
});

/** A story with fewer headings than this reads straight through, with no list of its sections. */
const INDEX_FROM = 3;

function StoryPage() {
  const story = findStory(Route.useParams().slug);
  if (!story) return null;

  const headings = story.sections.flatMap((section) => section.heading || []);

  return (
    <Page>
      <SubpageHeader title={story.title} meta={<Facts story={story} />}>
        {story.summary}
      </SubpageHeader>

      {headings.length >= INDEX_FROM && <Index headings={headings} />}

      {/* The line under the header: the same gap above it as below, so it belongs to neither. */}
      <section className="reveal mt-10 border-t pt-10" style={{ "--i": 2 } as CSSProperties}>
        <article className="space-y-12">
          {story.sections.map((section, i) => (
            <Part key={i} section={section} />
          ))}
        </article>
        {story.notes.length > 0 && <Notes notes={story.notes} />}
      </section>
    </Page>
  );
}

/** The last line of the header: what it is and when, then the ways out, for someone who would rather look than read. */
function Facts({ story }: { story: Story }) {
  return (
    <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
      <span className="text-faint-foreground">
        {story.kind.charAt(0).toUpperCase() + story.kind.slice(1)} · {story.year}
      </span>
      {story.links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-1.5"
        >
          {link.label}
          <Arrow
            direction="up-right"
            className="text-muted-foreground transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      ))}
    </p>
  );
}

/**
 * The sections of the page. On a wide screen it is a sidebar that stays put beside the column;
 * on a narrow one there is no room beside it, so it is a short list before the story.
 *
 * It sits outside the page's sections on purpose: they slide in, and a fixed element inside
 * something that is moving is placed against it, not against the window.
 */
function Index({ headings }: { headings: string[] }) {
  const link = "text-muted-foreground transition-colors duration-200 hover:text-foreground";

  return (
    <nav
      aria-label="On this page"
      style={{ "--i": 1 } as CSSProperties}
      className="reveal mt-10 lg:fixed lg:top-20 lg:left-[calc(50%-500px)] lg:mt-0 lg:w-44"
    >
      <p className="pb-2 text-faint-foreground">On this page</p>
      <ol className="space-y-1.5">
        <li className="hidden lg:block">
          <a href="#top" className={link}>
            Intro
          </a>
        </li>
        {headings.map((heading) => (
          <li key={heading}>
            <a href={`#${anchor(heading)}`} className={link}>
              {heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Part({ section }: { section: StorySection }) {
  return (
    <section id={section.heading ? anchor(section.heading) : undefined} className="scroll-mt-10">
      {section.heading && <h2 className="mb-3 font-medium">{section.heading}</h2>}
      <Prose source={section.body} />
      {section.image && <Figure src={section.image} caption={section.caption} />}
    </section>
  );
}

/** A picture, or a silent looping clip when the file is a video. */
function Figure({ src, caption }: { src: string; caption: string }) {
  const frame = "w-full rounded-[10px] bg-surface";

  return (
    <figure className="mt-5">
      {/\.(mp4|webm)$/i.test(src) ? (
        <video src={src} aria-label={caption} autoPlay muted loop playsInline className={frame} />
      ) : (
        <img src={src} alt={caption} loading="lazy" className={frame} />
      )}
      {caption && <figcaption className="mt-2 text-faint-foreground">{caption}</figcaption>}
    </figure>
  );
}

function Notes({ notes }: { notes: string[] }) {
  return (
    <ol className="mt-12 space-y-2 border-t pt-6 text-muted-foreground">
      {notes.map((note, i) => (
        <li key={i} id={`note-${i + 1}`} className="grid grid-cols-[1.25rem_1fr] scroll-mt-10">
          <span className="text-faint-foreground tabular-nums">{i + 1}</span>
          <span className="text-pretty">
            {note}{" "}
            <a href={`#ref-${i + 1}`} aria-label="Back to the text" className="text-foreground">
              ↩
            </a>
          </span>
        </li>
      ))}
    </ol>
  );
}
