import Link from "next/link";
import React from "react";

const projects = [
  {
    title: "Quantura",
    description:
      "A modern inventory management system featuring real-time stock tracking, automated alerts, analytics dashboards, ai assistant, business scheduling and meetings and accounting tools to optimize business operations.",
    href: "https://quantura-management.vercel.app/",
  },
  {
    title: "Tiza",
    description:
      "A minimal solution for managing books, students and lendings especially for school libraries.",
    href: "https://nkurunziza-saddy.github.io/tiza",
  },
   {
    title: "Lexi",
    description:
      "A simple yet efficient open-source rich text editor alternative",
   href: "https://lexi-editor.vercel.app/",
  },
];
export const Projects = () => {
  return (
    <section>
      <h2 className="section-title">Some of them</h2>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <Link
            key={index}
            href={project.href}
            target="_blank"
            className="group block p-6 bg-muted/50 rounded-lg hover:bg-muted/75 transition-colors"
          >
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-medium">{project.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {project.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};
