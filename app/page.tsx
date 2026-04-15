import Link from "next/link";
import PROJECTS_DATA from "@/projects.json";

export default function Page() {
  const featured = PROJECTS_DATA.projects.filter((p) => p.featured);

  return (
    <main className="min-h-screen w-full max-w-2xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-16 selection:bg-foreground selection:text-background">
      {/* Header */}
      <header className="flex flex-col gap-5">
        <h1 className="text-base font-medium text-foreground tracking-tight">Saddy Nkurunziza</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[500px]">
          Software engineer focused on building clean, functional, and well-designed digital experiences. Working
          primarily with React, Next.js, Go, and Rust.
        </p>
      </header>

      {/* Selected Work */}
      <section className="flex flex-col gap-6">
        <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/60">selected work</p>
        <div className="flex flex-col gap-4">
          {featured.map((p) => (
            <div key={p.title} className="flex justify-between items-baseline gap-4 group">
              <Link
                href={p.href}
                target="_blank"
                className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors duration-300 inline-flex items-center gap-1.5"
              >
                {p.title}
                <svg
                  aria-hidden="true"
                  role="img"
                  width="10"
                  height="10"
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
              <span className="text-xs font-mono text-muted-foreground/60">{p.year}</span>
            </div>
          ))}
        </div>

        <Link
          href="/projects"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 w-max mt-2 inline-flex items-center gap-1.5 group"
        >
          all projects
          <svg
            aria-hidden="true"
            role="img"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path
              d="M2 6H10M10 6L7 3M10 6L7 9"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 6H6"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.3"
            />
          </svg>
        </Link>
      </section>

      <section className="flex flex-col gap-6">
        <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/60">connect</p>
        <div className="flex gap-6">
          {[
            { label: "github", href: "https://github.com/nkurunziza-saddy" },
            { label: "email", href: "mailto:saddynkurunziza8@gmail.com" },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-1.5 group"
            >
              {l.label}
              <svg
                aria-hidden="true"
                role="img"
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-0 transition-[opacity,transform] duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
          ))}
        </div>
      </section>
    </main>
  );
}
