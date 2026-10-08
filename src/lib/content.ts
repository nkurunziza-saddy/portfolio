import profileJson from "../../content/profile.json";

/**
 * Everything under content/ is edited from Jace (see jace.json), by people who
 * never see this code. So nothing here trusts it: a half-filled entry is left
 * out with a warning in the build log instead of breaking the page.
 */

export const SITE_URL = "https://saddy.me";

/** What a story is, and so which group of the home page it is listed in. Written in content/ exactly like this. */
const KINDS = ["product", "open source", "experiment"] as const;

export type SocialLink = { label: string; href: string };
export type StoryKind = (typeof KINDS)[number];
export type StorySection = { heading: string; body: string; image: string; caption: string };
export type Story = {
  /** Its address on this site, from the file's name: content/stories/rugero.json is /rugero. */
  slug: string;
  title: string;
  /** One line: under the title on the home page and on its own page, and in search results. */
  summary: string;
  kind: StoryKind;
  year: number;
  /** Listed before the rest of its group on the home page. */
  pinned: boolean;
  links: SocialLink[];
  sections: StorySection[];
  notes: string[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const list = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

const year = (value: unknown) => (typeof value === "number" && Number.isInteger(value) && value > 1970 ? value : 0);

/** Only links that open a web page: an edited field never becomes a `javascript:` address. */
export function webUrl(value: unknown) {
  const url = text(value);
  return URL.canParse(url) && /^https?:$/.test(new URL(url).protocol) ? url : "";
}

/** A file this site serves ("/stories/counter.webp"), or a web address. */
function mediaUrl(value: unknown) {
  const url = text(value);
  return /^\/[^/]/.test(url) ? url : webUrl(url);
}

function skip(path: string, missing: (string | false)[]) {
  console.warn(`Skipped ${path.replace("../../", "")}: needs ${missing.filter(Boolean).join(", ")}.`);
  return null;
}

function parseLink(value: unknown): SocialLink | null {
  if (!isRecord(value)) return null;
  const link = { label: text(value.label), href: webUrl(value.href) };
  return link.label && link.href ? link : null;
}

/** A section with nothing to read is dropped; its heading, image and caption are all optional. */
function parseSection(value: unknown): StorySection | null {
  if (!isRecord(value)) return null;
  const section = {
    heading: text(value.heading),
    body: text(value.body),
    image: mediaUrl(value.image),
    caption: text(value.caption),
  };
  return section.body ? section : null;
}

function parseStory(path: string, value: unknown): Story | null {
  const entry = isRecord(value) ? value : {};
  const slug = path.slice(path.lastIndexOf("/") + 1).replace(/\.json$/, "");
  const kind = KINDS.find((known) => known === text(entry.kind));
  const story = {
    slug,
    title: text(entry.title),
    summary: text(entry.summary),
    year: year(entry.year),
    pinned: entry.pinned === true,
    links: list(entry.links).flatMap((link) => parseLink(link) ?? []),
    sections: list(entry.sections).flatMap((section) => parseSection(section) ?? []),
    notes: list(entry.notes).flatMap((note) => (isRecord(note) && text(note.note)) || []),
  };
  const missing = [
    !/^[a-z0-9-]+$/.test(slug) && "a file name of lowercase letters, numbers and dashes",
    !story.title && "title",
    !story.summary && "summary",
    !kind && `kind (${KINDS.join(", ")})`,
    !story.year && "year",
    story.sections.length === 0 && "a section with a body",
  ];
  return kind && !missing.some(Boolean) ? { ...story, kind } : skip(path, missing);
}

const saved: Record<string, unknown> = profileJson;
const email = text(saved.email);

export const profile = {
  name: text(saved.name),
  /** The introduction on the home page: paragraphs, with links written as [Rugero](/rugero). */
  about: text(saved.about),
  email: /^\S+@\S+$/.test(email) ? email : "",
  links: list(saved.links).flatMap((link) => parseLink(link) ?? []),
};

/** "@handle", from the Twitter or X link if the profile has one. */
export const twitterHandle = profile.links
  .map((link) => new URL(link.href))
  .filter((url) => /^(www\.)?(twitter|x)\.com$/.test(url.hostname))
  .map((url) => `@${url.pathname.split("/")[1]}`)
  .find((handle) => handle.length > 1);

const storyEntries = import.meta.glob<unknown>("../../content/stories/*.json", { eager: true, import: "default" });

/**
 * The pages of this site, one per product, open source project and experiment.
 * Pinned ones first, then newest first, by name within a year.
 */
export const stories = Object.entries(storyEntries)
  .flatMap(([path, value]) => parseStory(path, value) ?? [])
  .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.year - a.year || a.title.localeCompare(b.title));

export const findStory = (slug: string) => stories.find((story) => story.slug === slug);
