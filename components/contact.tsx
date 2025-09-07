import React from "react";
import { Github, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  return (
    <section>
      <h2 className="section-title">Contact</h2>
      <div className="flex flex-wrap gap-3">
        <Button variant="ghost" className="px-0" asChild>
          <Link
            href="https://github.com/nkurunziza-saddy"
            target="_blank"
            className="gap-2"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Link>
        </Button>
        {/* <Button variant="ghost" className="px-0" asChild>
          <Link
             target="_blank"
            href="https://linkedin.com/in/saad-nkurunziza-5a15892a3/"
            className="gap-2"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Link>
        </Button> */}
        <Button variant="ghost" className="px-0" asChild>
          <Link
            target="_blank"
            href="mailto:saddynkurunziza8@gmail.com"
            className="gap-2"
          >
            <Mail className="h-4 w-4" />
            Email
          </Link>
        </Button>
      </div>
    </section>
  );
};
