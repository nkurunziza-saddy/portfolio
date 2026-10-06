import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Arrow } from "@/components/arrow";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/projects")({
  component: Projects,
});

const TAGS = ["all", ...new Set(projects.flatMap((p) => p.tags))];

function Projects() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const query = search.toLowerCase();
  const filtered = projects.filter(
    (p) =>
      (!query || p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query)) &&
      (!activeTag || p.tags.includes(activeTag))
  );

  return (
    <main className="min-h-screen w-full max-w-2xl mx-auto px-6 py-24 md:py-32 selection:bg-foreground selection:text-background">
      <nav className="mb-16 flex gap-4">
        <Link
          to="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-2 group"
        >
          <Arrow
            direction="left"
            size={12}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          home
        </Link>
      </nav>

      <div className="flex flex-col gap-8 mb-16">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search projects..."
          className="w-full bg-transparent text-sm placeholder:text-muted-foreground/40 outline-none pb-2 border-b border-border/40 focus:border-foreground/40 transition-colors rounded-none"
        />

        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {TAGS.map((t) => {
            const isAll = t === "all";
            const isActive = isAll ? !activeTag : t === activeTag;

            return (
              <button
                type="button"
                key={t}
                onClick={() => setActiveTag(isAll || isActive ? null : t)}
                className={`text-[13px] transition-colors duration-300 ${
                  isActive ? "text-foreground" : "text-muted-foreground/60 hover:text-foreground"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-12">
        {filtered.length === 0 && <p className="text-sm text-muted-foreground/60">no projects match your criteria.</p>}

        {filtered.map((p) => (
          <article key={p.title} className="flex flex-col gap-2.5 group">
            <div className="flex justify-between items-baseline gap-4">
              <a
                href={p.href}
                target="_blank"
                className="text-base font-medium text-foreground hover:text-muted-foreground transition-colors duration-300 inline-flex items-center gap-1.5"
              >
                {p.title}
                {p.current && (
                  <span className="text-[10px] font-mono text-muted-foreground/40 border border-border/40 px-1 rounded-[2px] ml-1 uppercase tracking-tighter">
                    current
                  </span>
                )}
                <Arrow
                  direction="up-right"
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <span className="text-xs font-mono text-muted-foreground/50 shrink-0">{p.year}</span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-[90%]">{p.desc}</p>

            <div className="text-[11px] font-mono text-muted-foreground/50 mt-1">{p.tags.join(" · ")}</div>
          </article>
        ))}
      </div>
    </main>
  );
}
