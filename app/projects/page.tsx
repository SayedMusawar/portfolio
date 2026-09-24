import type { Metadata } from "next";
import { ProjectFilter } from "@/components/project-filter";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full-stack web apps, desktop software, and games built by Muhammad Musawar Ali Shah, a Computer Science student at FAST-NUCES Karachi.",
};

export default function ProjectsPage() {
  return (
    <div className="container-page section-space">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-title">Projects</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Web apps, desktop software, and games I have built. Pick a
          category to filter, or open a project for the details.
        </p>
      </header>
      <ProjectFilter projects={projects} />
    </div>
  );
}