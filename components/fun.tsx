import React from "react";
import Link from "next/link";

export const Fun = () => {
  return (
    <section>
      <h2 className="section-title">
        Try this game out
      </h2>

      <Link
        href="https://oops-again.vercel.app/"
        target="_blank"
        className="text-sm underline-offset-4 hover:underline"
      >
        Ooops
      </Link>
    </section>
  );
};
