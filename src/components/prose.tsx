import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { webUrl } from "@/lib/content";
import { type Block, type Inline, parseBlocks } from "@/lib/prose";

/** Writing from content/, drawn in the body tone. Strong text and links step up to the ink. */
export function Prose({ source }: { source: string }) {
  return (
    <div className="space-y-4 text-muted-foreground text-pretty">
      {parseBlocks(source).map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  if (block.type === "list") {
    return (
      <ul className="space-y-2">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="relative pl-4 before:absolute before:left-0 before:text-faint-foreground before:content-['–']"
          >
            <Line inline={item} />
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote className="border-l border-faint-foreground/40 pl-4">
        {block.lines.map((line, i) => (
          <p key={i}>
            <Line inline={line} />
          </p>
        ))}
      </blockquote>
    );
  }

  return (
    <p>
      <Line inline={block.inline} />
    </p>
  );
}

function Line({ inline }: { inline: Inline[] }) {
  return inline.map((part, i) => <Part key={i} part={part} />);
}

function Part({ part }: { part: Inline }): ReactNode {
  switch (part.type) {
    case "text":
      return part.text;
    case "strong":
      return <strong className="font-medium text-foreground">{part.text}</strong>;
    case "em":
      return <em>{part.text}</em>;
    case "code":
      return <code className="rounded-[5px] bg-surface px-1 py-0.5 font-mono text-[0.9em]">{part.text}</code>;
    case "note":
      return (
        <sup>
          <a id={`ref-${part.number}`} href={`#note-${part.number}`} className="px-0.5 text-foreground">
            {part.number}
          </a>
        </sup>
      );
    case "link":
      return <TextLink href={part.href}>{part.text}</TextLink>;
  }
}

/** A story on this site, or a web page in a new tab. Anything else stays as its words. */
function TextLink({ href, children }: { href: string; children: string }) {
  const slug = /^\/([a-z0-9-]+)$/.exec(href)?.[1];
  if (slug) {
    return (
      <Link to="/$slug" params={{ slug }} className="link text-foreground">
        {children}
      </Link>
    );
  }

  const url = webUrl(href);
  if (!url) return children;
  return (
    <a href={url} target="_blank" rel="noreferrer" className="link text-foreground">
      {children}
    </a>
  );
}
