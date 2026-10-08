import { describe, expect, it } from "vite-plus/test";
import { anchor, parseBlocks, parseInline } from "./prose";

describe("parseInline", () => {
  it("leaves plain text alone", () => {
    expect(parseInline("Nothing to see.")).toEqual([{ type: "text", text: "Nothing to see." }]);
  });

  it("reads strong, emphasis, code, links and notes in order", () => {
    expect(parseInline("**Bold** then *soft*, `jace.json`, [inklu](/inklu) and a note.[^2]")).toEqual([
      { type: "strong", text: "Bold" },
      { type: "text", text: " then " },
      { type: "em", text: "soft" },
      { type: "text", text: ", " },
      { type: "code", text: "jace.json" },
      { type: "text", text: ", " },
      { type: "link", text: "inklu", href: "/inklu" },
      { type: "text", text: " and a note." },
      { type: "note", number: 2 },
    ]);
  });

  it("keeps an unfinished marker as text", () => {
    expect(parseInline("5 * 3 and [not a link]")).toEqual([{ type: "text", text: "5 * 3 and [not a link]" }]);
  });

  it("never turns text into anything but these parts", () => {
    const types = parseInline('<script>alert(1)</script> <a href="x">y</a>').map((part) => part.type);
    expect(types).toEqual(["text"]);
  });
});

describe("parseBlocks", () => {
  it("splits paragraphs on an empty line and joins wrapped lines", () => {
    expect(parseBlocks("One\ntwo.\n\n\nThree.")).toEqual([
      { type: "paragraph", inline: [{ type: "text", text: "One two." }] },
      { type: "paragraph", inline: [{ type: "text", text: "Three." }] },
    ]);
  });

  it("reads a list and a quote", () => {
    expect(parseBlocks("- one\n- two\n\n> first\n> second")).toEqual([
      { type: "list", items: [[{ type: "text", text: "one" }], [{ type: "text", text: "two" }]] },
      { type: "quote", lines: [[{ type: "text", text: "first" }], [{ type: "text", text: "second" }]] },
    ]);
  });

  it("treats a dash in the middle of a paragraph as a paragraph", () => {
    expect(parseBlocks("Start\n- not a list")[0]?.type).toBe("paragraph");
  });

  it("returns nothing for empty writing", () => {
    expect(parseBlocks("  \n\n ")).toEqual([]);
  });
});

describe("anchor", () => {
  it("makes an address from a heading", () => {
    expect(anchor("What's next")).toBe("whats-next");
    expect(anchor("Your stock is your shop")).toBe("your-stock-is-your-shop");
  });
});
