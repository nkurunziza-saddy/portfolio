import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Arrow } from "@/components/arrow";
import type { Listed } from "@/lib/content";

const ROW = "group flex items-center gap-1.5 py-2.5";
const ARROW = "text-muted-foreground opacity-0 transition duration-200 group-hover:opacity-100 group-hover:translate-0";

/** Projects grouped by year, with the year shown once beside each group. Expects newest-first input. */
export function ProjectList({ projects }: { projects: Listed[] }) {
  const groups = new Map<number, Listed[]>();
  for (const p of projects) groups.set(p.year, [...(groups.get(p.year) ?? []), p]);

  return (
    <div>
      {[...groups].map(([year, items]) => (
        <div key={year} className="grid grid-cols-[64px_1fr] sm:grid-cols-[108px_1fr] border-t">
          <span className="py-2.5 text-faint-foreground tabular-nums">{year}</span>
          <ul>
            {items.map((p) => (
              <li key={p.title} className="border-t first:border-t-0">
                <Row project={p} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** A story opens on this site; anything else opens where it lives, in a new tab. */
function Row({ project }: { project: Listed }): ReactNode {
  if ("slug" in project) {
    return (
      <Link to="/$slug" params={{ slug: project.slug }} className={ROW}>
        {project.title}
        <Arrow direction="right" className={`${ARROW} -translate-x-0.5`} />
      </Link>
    );
  }

  return (
    <a href={project.href} target="_blank" rel="noreferrer" className={ROW}>
      {project.title}
      <Arrow direction="up-right" className={`${ARROW} -translate-x-0.5 translate-y-0.5`} />
    </a>
  );
}
