import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Arrow } from "@/components/arrow";

export function Page({ children }: { children: ReactNode }) {
  return <main className="w-full max-w-[580px] mx-auto px-4 sm:px-6 pt-12 pb-24 sm:pt-20 sm:pb-32">{children}</main>;
}

/** The way back, then the title and intro line shared by the secondary pages. `meta` is a last line of the page's own. */
export function SubpageHeader({ title, meta, children }: { title: string; meta?: ReactNode; children: ReactNode }) {
  return (
    <header className="reveal">
      <Link
        to="/"
        className="group inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        <Arrow direction="left" className="transition-transform duration-200 group-hover:-translate-x-0.5" />
        Home
      </Link>
      <h1 className="mt-8 font-medium">{title}</h1>
      <p className="mt-1 text-muted-foreground text-pretty">{children}</p>
      {meta}
    </header>
  );
}
