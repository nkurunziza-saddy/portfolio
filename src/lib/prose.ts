/**
 * The little writing syntax the introduction and the stories are typed in, as
 * plain strings in Jace. It is read into data here and drawn by
 * components/prose.tsx, so text from content/ never reaches the page as HTML.
 *
 * Blocks are separated by an empty line: a paragraph, a list (every line
 * starts "- ") or a quote (every line starts ">"). Inside a block:
 * **strong**, *emphasis*, `code`, [a link](/rugero) and [^1] for a note.
 */

export type Inline =
  | { type: "text" | "strong" | "em" | "code"; text: string }
  | { type: "link"; text: string; href: string }
  | { type: "note"; number: number };

export type Block =
  | { type: "paragraph"; inline: Inline[] }
  | { type: "list"; items: Inline[][] }
  | { type: "quote"; lines: Inline[][] };

const INLINE = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[\^(\d+)\]|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function parseInline(source: string): Inline[] {
  const inline: Inline[] = [];
  let end = 0;

  for (const match of source.matchAll(INLINE)) {
    const [whole, strong, em, code, note, label, href] = match;
    if (match.index > end) inline.push({ type: "text", text: source.slice(end, match.index) });
    end = match.index + whole.length;

    if (strong) inline.push({ type: "strong", text: strong });
    else if (em) inline.push({ type: "em", text: em });
    else if (code) inline.push({ type: "code", text: code });
    else if (note) inline.push({ type: "note", number: Number(note) });
    else if (label && href) inline.push({ type: "link", text: label, href });
  }

  if (end < source.length) inline.push({ type: "text", text: source.slice(end) });
  return inline;
}

export function parseBlocks(source: string): Block[] {
  return source
    .split(/\n\s*\n/)
    .map((chunk) =>
      chunk
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    )
    .filter((lines) => lines.length > 0)
    .map((lines): Block => {
      if (lines.every((line) => line.startsWith("- "))) {
        return { type: "list", items: lines.map((line) => parseInline(line.slice(2))) };
      }
      if (lines.every((line) => line.startsWith(">"))) {
        return { type: "quote", lines: lines.map((line) => parseInline(line.replace(/^>\s?/, ""))) };
      }
      return { type: "paragraph", inline: parseInline(lines.join(" ")) };
    });
}

/** "What's next" becomes "whats-next": the address of a section within its page. */
export function anchor(heading: string) {
  return heading
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
