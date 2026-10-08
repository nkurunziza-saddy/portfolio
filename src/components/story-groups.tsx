import { Link } from "@tanstack/react-router";
import { type CSSProperties, useRef, useState } from "react";
import type { Story } from "@/lib/content";

type Group = { title: string; stories: Story[] };

/** Where the highlight is, measured from the top of the groups. `slide` is off when it has nowhere to come from. */
type Highlight = { top: number; height: number; shown: boolean; slide: boolean };

/**
 * The home page's groups: a label, then each story as its name over the one line that says what it is.
 *
 * Every row shares one highlight. It slides to whichever row the pointer or the keyboard is on,
 * across the groups too, and fades out once neither is on any of them.
 */
export function StoryGroups({ groups }: { groups: Group[] }) {
  const frame = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState<Highlight>({ top: 0, height: 0, shown: false, slide: false });

  const moveTo = (row: HTMLElement) => {
    const outer = frame.current?.getBoundingClientRect();
    if (!outer) return;
    const inner = row.getBoundingClientRect();
    // Appearing, it fades in where it is wanted; sliding there from its last place would cross rows nobody pointed at.
    setHighlight((last) => ({ top: inner.top - outer.top, height: inner.height, shown: true, slide: last.shown }));
  };
  const hide = () => setHighlight((last) => ({ ...last, shown: false }));

  return (
    <div ref={frame} className="relative isolate" onMouseLeave={hide}>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-x-3 top-0 -z-10 rounded-[10px] bg-surface transition-[opacity,transform,height] duration-200 ease-out motion-reduce:transition-none ${
          highlight.shown ? "opacity-100" : "opacity-0"
        }`}
        style={{
          height: highlight.height,
          transform: `translateY(${highlight.top}px)`,
          transitionProperty: highlight.slide ? undefined : "opacity",
        }}
      />

      {groups.map((group, i) => (
        <section key={group.title} className="reveal mt-12" style={{ "--i": i + 1 } as CSSProperties}>
          <h2 className="pb-2 text-faint-foreground">{group.title}</h2>
          <ul className="space-y-1">
            {group.stories.map((story) => (
              <li key={story.slug}>
                <Link
                  to="/$slug"
                  params={{ slug: story.slug }}
                  className="-mx-3 block rounded-[10px] px-3 py-2"
                  // A tap also sends a mouse event, and would leave the highlight behind on a screen with no pointer to move it.
                  onMouseEnter={(event) => window.matchMedia("(hover: hover)").matches && moveTo(event.currentTarget)}
                  onFocus={(event) => moveTo(event.currentTarget)}
                  onBlur={hide}
                >
                  <span className="block">{story.title}</span>
                  <span className="block text-muted-foreground text-pretty">{story.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
