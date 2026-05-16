"use client";

import Link from "next/link";
import { useState } from "react";
import PROJECTS_DATA from "@/projects.json";

const ALL_PROJECTS = PROJECTS_DATA.projects;
const ALL_TAGS = [...new Set(ALL_PROJECTS.flatMap((p) => p.tags))];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = ALL_PROJECTS.filter(
    (p) =>
      (!search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase())) &&
      (!activeTag || p.tags.includes(activeTag))
  );

  return (
    <main className="min-h-screen w-full max-w-2xl mx-auto px-6 py-24 md:py-32 selection:bg-foreground selection:text-background">
      <nav className="mb-16 flex gap-4">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-2 group"
        >
          <svg
            aria-hidden="true"
            role="img"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          >
            <path
              d="M10 6H2M2 6L5 3M2 6L5 9"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 6H6"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.3"
            />
          </svg>
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
          {["all", ...ALL_TAGS].map((t) => {
            const isAll = t === "all";
            const isActive = (isAll && !activeTag) || t === activeTag;

            return (
              <button
                type="button"
                key={t}
                onClick={() => setActiveTag(isAll ? null : t === activeTag ? null : t)}
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

      {/* Project List */}
      <div className="flex flex-col gap-12">
        {filtered.length === 0 && <p className="text-sm text-muted-foreground/60">no projects match your criteria.</p>}

        {filtered.map((p) => (
          <article key={p.title} className="flex flex-col gap-2.5 group">
            <div className="flex justify-between items-baseline gap-4">
              <Link
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
                <svg
                  aria-hidden="true"
                  role="img"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path
                    d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.5 8.5L5.5 6.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.3"
                  />
                </svg>
              </Link>
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
