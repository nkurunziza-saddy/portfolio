# Portfolio

## Nkurunziza Saddy

### Contact Information

- **Email:** [saddynkurunziza8@gmail.com](mailto:saddynkurunziza8@gmail.com)
- **GitHub:** [github.com/nkurunziza-saddy](https://github.com/nkurunziza-saddy)

### Content

Everything the site says lives in `content/` and is edited from
[Jace](https://jace.nkurunziza.workers.dev), which `jace.json` points at it:

- `content/profile.json`: name, tagline, the introduction, email and social
  links. Add a link there and it appears on the home page.
- `content/stories/`: one file per product, open source project or
  experiment. Each is a page of its own, at the file's name: `rugero.json` is
  `/rugero`. Its `kind` (`product`, `open source` or `experiment`) is the
  group it is listed in on the home page.
- `content/projects/`: one file per older project (`title`, `href`, `year`).
  They are links out, listed on the projects page with the stories. A project
  with the same title as a story is left out, so nothing is listed twice.

A story has a `title`, a `summary` (the one line under its name), a `kind`, a
`year`, `pinned` (`true` lists it first in its group on the home page), `links`
(shown at the top of its page), `sections` and `notes`. A
section has a `body`, and optionally a `heading`, an `image` and its
`caption`. Images go in `public/stories/`; a section without one shows none.
A story with three or more headings gets an index of them: a sidebar on a wide
screen, a short list above the story on a narrow one.

The introduction and each section's `body` are written as plain text:

- an empty line starts a new paragraph;
- lines starting `- ` make a list, lines starting `>` a set-off block;
- `**strong**`, `*emphasis*`, `` `code` ``, `[a link](/rugero)` or
  `[a link](https://example.com)`, and `[^1]` for the first of the `notes`.

`src/lib/content.ts` reads all three. An entry missing something it needs is
left out, with a warning in the build log that says what.

### Checks

```sh
vp check   # format, lint and types
vp test    # the writing syntax (src/lib/prose.test.ts)
vp build   # every page, prerendered to dist/client
```
