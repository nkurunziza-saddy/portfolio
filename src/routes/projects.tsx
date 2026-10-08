import { createFileRoute } from "@tanstack/react-router";
import { Page, Section, SubpageHeader } from "@/components/layout";
import { ProjectList } from "@/components/project-list";
import { everything, profile } from "@/lib/content";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: `Projects — ${profile.name}` }] }),
  component: Projects,
});

function Projects() {
  return (
    <Page>
      <SubpageHeader title="Projects">Everything I've shipped, big and small.</SubpageHeader>
      <Section index={1}>
        <ProjectList projects={everything} />
      </Section>
    </Page>
  );
}
