"use client";
import { useState } from "react";
import Link from "next/link";
import PROJECTS_DATA from "@/projects.json";

const ALL_PROJECTS = PROJECTS_DATA.projects;
const ALL_TAGS = [...new Set(ALL_PROJECTS.flatMap(p => p.tags))];

export default function ProjectsPage() {
    const [search, setSearch] = useState("");
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const filtered = ALL_PROJECTS.filter(p =>
        (!search || p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase())) &&
        (!activeTag || p.tags.includes(activeTag))
    );

    return (
        <main className="max-w-[540px] mx-auto px-5 py-10 font-mono">
            <nav className="flex gap-6 mb-14">
                <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">saddy</Link>
                <span className="text-xs">projects</span>
            </nav>

            <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="search projects..."
                className="w-full bg-transparent border-b border-border pb-1.5 text-xs placeholder:text-muted-foreground outline-none mb-6"
            />

            <div className="flex flex-wrap gap-1.5 mb-8">
                {["all", ...ALL_TAGS].map(t => (
                    <button key={t}
                        onClick={() => setActiveTag(t === "all" ? null : t === activeTag ? null : t)}
                        className={`text-[10px] border rounded-sm px-2 py-0.5 transition-colors ${(t === "all" && !activeTag) || t === activeTag
                            ? "border-foreground text-foreground"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                            }`}>
                        {t}
                    </button>
                ))}
            </div>

            <div className="flex flex-col">
                {filtered.length === 0 && (
                    <p className="text-xs text-muted-foreground py-4">no projects match.</p>
                )}
                {filtered.map((p, i) => (
                    <div key={p.title} className={`py-4 border-b border-border ${i === 0 ? "border-t" : ""}`}>
                        <div className="flex justify-between items-baseline mb-1.5">
                            <Link href={p.href} target="_blank" className="text-sm font-medium hover:underline">{p.title}</Link>
                            <span className="text-[11px] text-muted-foreground">{p.year}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">{p.desc}</p>
                        <div className="flex gap-1.5 flex-wrap">
                            {p.tags.map(t => (
                                <span key={t} className="text-[10px] text-muted-foreground border border-border rounded-sm px-1.5 py-0.5">{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}