import Link from "next/link";
import PROJECTS_DATA from "@/projects.json";

export default function Page() {
  const featured = PROJECTS_DATA.projects.filter(p => p.featured);
  return (
    <main className="min-h-screen w-full max-w-2xl flex flex-col gap-y-10 mx-auto px-6 py-16">
      <header className="mb-11">
        <h1 className="text-sm font-medium mb-1 font-mono">Saddy Nkurunziza</h1>
      </header>
      <section>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-3">Contact</p>
        <div className="flex gap-6">
          {[
            { label: "github", href: "https://github.com/nkurunziza-saddy" },
            { label: "email", href: "mailto:saddynkurunziza8@gmail.com" },
          ].map(l => (
            <Link key={l.label} href={l.href} target="_blank"
              className="text-sm text-muted-foreground font-mono hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </section>
      <section className="mb-11">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-3">Selected work</p>
        <div className="flex flex-col gap-2.5">
          {featured.map(p => (
            <div key={p.title} className="flex justify-between items-baseline">
              <Link href={p.href} target="_blank" className="text-sm font-mono hover:underline">{p.title}</Link>
              <span className="text-[11px] text-muted-foreground font-mono">{p.year}</span>
            </div>
          ))}
          <Link href="/projects" className="text-xs text-muted-foreground font-mono hover:text-foreground transition-colors mt-0.5">
            all projects →
          </Link>
        </div>
      </section>
      <section>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-3">Contact</p>
        <div className="flex gap-6">
          {[
            { label: "github", href: "https://github.com/nkurunziza-saddy" },
            { label: "email", href: "mailto:saddynkurunziza8@gmail.com" },
          ].map(l => (
            <Link key={l.label} href={l.href} target="_blank"
              className="text-sm text-muted-foreground font-mono hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
