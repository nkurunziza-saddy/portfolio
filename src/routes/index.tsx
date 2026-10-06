import { createFileRoute, Link } from "@tanstack/react-router";
import { Arrow } from "@/components/arrow";
import { siteConfig } from "@/lib/config";
import { type Project, projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  component: Home,
});

const CURRENT = projects.filter((p) => p.current);
const FEATURED = projects.filter((p) => p.featured && !p.current);

const CONNECT = [
  { label: "github", href: siteConfig.links.github },
  { label: "email", href: "mailto:saddynkurunziza8@gmail.com" },
];

function Home() {
  return (
    <main className="min-h-screen w-full max-w-2xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-16 selection:bg-foreground selection:text-background">
      <header className="flex flex-col gap-5">
        <h1 className="text-base font-medium text-foreground tracking-tight">Saddy Nkurunziza</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[500px]">
          Software engineer focused on building clean, functional, and well-designed digital experiences. Working
          primarily with Typescript, Go, Rust and Python.
        </p>
      </header>

      {CURRENT.length > 0 && (
        <section className="flex flex-col gap-6">
          <SectionLabel>currently working on</SectionLabel>
          <ProjectList projects={CURRENT} />
        </section>
      )}

      <section className="flex flex-col gap-6">
        <SectionLabel>selected work</SectionLabel>
        <ProjectList projects={FEATURED} />

        <Link
          to="/projects"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 w-max mt-2 inline-flex items-center gap-1.5 group"
        >
          all projects
          <Arrow
            direction="right"
            size={12}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      </section>

      <section className="flex flex-col gap-6">
        <SectionLabel>connect</SectionLabel>
        <div className="flex gap-6">
          {CONNECT.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-1.5 group"
            >
              {l.label}
              <Arrow
                direction="up-right"
                className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/60">{children}</p>;
}

function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col gap-4">
      {projects.map((p) => (
        <div key={p.title} className="flex justify-between items-baseline gap-4 group">
          <a
            href={p.href}
            target="_blank"
            className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors duration-300 inline-flex items-center gap-1.5"
          >
            {p.title}
            <Arrow
              direction="up-right"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <span className="text-xs font-mono text-muted-foreground/60">{p.year}</span>
        </div>
      ))}
    </div>
  );
}
