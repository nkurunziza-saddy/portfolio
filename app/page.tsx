import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Header } from "@/components/header";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Fun } from "@/components/fun";

export default function Page() {
  return (
    <main className="min-h-screen w-full max-w-2xl flex flex-col gap-y-16 mx-auto px-6 py-16">
      <Header />
      <About />
      <Skills />
      <Projects />
      <Fun />
      <Contact />
    </main>
  );
}
