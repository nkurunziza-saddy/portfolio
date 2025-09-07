import React from "react";

export const Skills = () => {
  return (
    <section>
      <h2 className="section-title">Expertise</h2>
      <div className="flex flex-wrap gap-2">
        {["TypeScript", "Rust", "Golang"].map((skill) => (
          <div
            key={skill}
            className="px-3 py-1 bg-muted/50 rounded-full text-sm text-muted-foreground"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
};
