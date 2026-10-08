import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react";
import { Page } from "@/components/layout";
import { Prose } from "@/components/prose";
import { StoryGroups } from "@/components/story-groups";
import { profile, type StoryKind, stories } from "@/lib/content";

export const Route = createFileRoute("/")({
  component: Home,
});

/** A group for each kind of story, in this order. A kind with no stories has no group. */
const TITLES: Record<StoryKind, string> = {
  product: "Products",
  "open source": "Open source",
  experiment: "Experiments",
};

const GROUPS = Object.entries(TITLES)
  .map(([kind, title]) => ({ title, stories: stories.filter((story) => story.kind === kind) }))
  .filter((group) => group.stories.length > 0);

function Home() {
  return (
    <Page>
      <header className="reveal">
        <h1 className="font-medium">{profile.name}</h1>
        <div className="mt-3">
          <Prose source={profile.about} />
        </div>
        <Contact />
      </header>

      <StoryGroups groups={GROUPS} />
    </Page>
  );
}

/** The profile's links and email as a sentence: "Find me on GitHub and Twitter, or reach me by email." */
function Contact() {
  const { links, email } = profile;
  if (links.length === 0 && !email) return null;

  const mail = (
    <Ext href={`mailto:${email}`} rel="noreferrer">
      email
    </Ext>
  );

  return (
    <p className="mt-4 text-muted-foreground text-pretty">
      {links.length > 0 && "Find me on "}
      {links.map((link, i) => (
        <Fragment key={link.href}>
          {i > 0 && (i === links.length - 1 ? " and " : ", ")}
          <Ext href={link.href} rel="me noreferrer">
            {link.label}
          </Ext>
        </Fragment>
      ))}
      {email && (links.length > 0 ? <>, or reach me by {mail}</> : <>Reach me by {mail}</>)}.
    </p>
  );
}

function Ext({ href, rel, children }: { href: string; rel: string; children: string }) {
  return (
    <a href={href} target="_blank" rel={rel} className="link text-foreground">
      {children}
    </a>
  );
}
