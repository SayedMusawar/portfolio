import type { Metadata } from "next";
import type { ReactNode } from "react";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PrintButton } from "@/components/print-button";
import { profile } from "@/data/profile";
import { education, leadership, certifications, coursework, type TimelineItem } from "@/data/timeline";
import { getFeaturedProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of " + profile.name + ": education, projects, skills, and leadership.",
};

const RESUME_FILE = "Musawar_Ali_Shah_Resume.pdf";

// Years only. TODO (owner): add the school names when you want them shown.
const schooling: { id: string; title: string; period: string }[] = [
  { id: "hssc", title: "Higher Secondary School Certificate (HSSC)", period: "2023" },
  { id: "ssc", title: "Secondary School Certificate (SSC)", period: "2021" },
];

// Copied from section 6 of the brief. Keep in sync with data/skills.ts.
const skillGroups: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["Python", "C++", "C", "Java", "JavaScript (basic)"] },
  { label: "Web", items: ["React", "FastAPI", "HTML5", "CSS3", "REST APIs", "Axios"] },
  { label: "Databases", items: ["PostgreSQL", "MySQL", "SQLite"] },
  { label: "Desktop and games", items: ["Qt", "SFML", "Java Swing"] },
  { label: "AI and ML (coursework level)", items: ["BFS", "DFS", "UCS", "A*", "Iterative Deepening", "Bidirectional Search", "Hill Climbing", "Simulated Annealing", "Minimax", "Alpha-Beta Pruning", "CSP (N-Queens)", "Linear and Logistic Regression", "Gradient Descent", "Naive Bayes", "K-Means", "K-NN", "Neural Networks"] },
  { label: "Python libraries", items: ["NumPy", "Pandas", "Matplotlib", "NetworkX", "Scikit-learn"] },
  { label: "Familiar with (not expert)", items: ["TensorFlow", "PyTorch", "OpenAI APIs"] },
  { label: "Tools", items: ["Git and GitHub", "Linux (Ubuntu, Arch)", "VS Code", "IntelliJ IDEA", "Eclipse"] },
  { label: "Concepts", items: ["OOP", "Data Structures", "Algorithms", "SDLC", "Software Design and Analysis"] },
];

function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/+$/, "");
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="resume-section flex flex-col gap-5 border-t border-border pt-8">
      <h2 className="text-title">{title}</h2>
      {children}
    </section>
  );
}

function Entries({ items }: { items: TimelineItem[] }) {
  return (
    <ul className="flex flex-col gap-5">
      {items.map((item) => (
        <li key={item.id} className="resume-entry flex flex-col gap-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <span className="text-sm text-muted-foreground">{item.period}</span>
          </div>
          <p className="text-muted-foreground">{item.organization}</p>
          {item.description ? <p>{item.description}</p> : null}
        </li>
      ))}
    </ul>
  );
}

export default function ResumePage() {
  const hasPdf = fs.existsSync(path.join(process.cwd(), "public", "resume", RESUME_FILE));
  const projects = getFeaturedProjects();

  return (
    <article className="resume container-page section-space flex flex-col gap-10">
      <header className="resume-head flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="text-display">{profile.name}</h1>
          <div className="screen-only flex flex-wrap gap-2">
            <PrintButton />
            {hasPdf ? (
              <a href={"/resume/" + RESUME_FILE} download className={buttonVariants({ variant: "default" })}>
                <Download className="size-4" aria-hidden="true" />
                Download PDF
              </a>
            ) : null}
          </div>
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground">{profile.role}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li className="text-muted-foreground">{profile.location}</li>
          <li><a href={"mailto:" + profile.email} className="text-brand underline-offset-4 hover:underline">{profile.email}</a></li>
          <li><a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-brand underline-offset-4 hover:underline">GitHub<span className="print-only">: {displayUrl(profile.github)}</span></a></li>
          <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand underline-offset-4 hover:underline">LinkedIn<span className="print-only">: {displayUrl(profile.linkedin)}</span></a></li>
        </ul>
      </header>

      <Section title="Education">
        <Entries items={education} />
        <ul className="flex flex-col gap-5">
          {schooling.map((item) => (
            <li key={item.id} className="resume-entry flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <span className="text-sm text-muted-foreground">{item.period}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Selected projects">
        <ul className="flex flex-col gap-6">
          {projects.map((project) => (
            <li key={project.slug} className="resume-entry flex flex-col gap-2">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold">
                  <Link href={"/projects/" + project.slug} className="underline-offset-4 hover:text-brand hover:underline">{project.title}</Link>
                </h3>
                <span className="text-sm text-muted-foreground">{project.year}</span>
              </div>
              <p>{project.summary}</p>
              <p className="text-sm text-muted-foreground">{project.stack.join(", ")}</p>
              {project.highlights && project.highlights.length > 0 ? (
                <ul className="ml-5 flex list-disc flex-col gap-1">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
              {project.githubUrl ? <p className="print-only text-sm">GitHub: {displayUrl(project.githubUrl)}</p> : null}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Skills">
        <dl className="flex flex-col gap-3">
          {skillGroups.map((group) => (
            <div key={group.label} className="resume-entry flex flex-col gap-1 sm:flex-row sm:gap-6">
              <dt className="text-sm font-medium sm:w-56 sm:shrink-0">{group.label}</dt>
              <dd className="text-muted-foreground">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Leadership">
        <Entries items={leadership} />
      </Section>

      <Section title="Other training">
        <Entries items={certifications} />
      </Section>

      <Section title="Relevant coursework">
        <p className="text-muted-foreground">{coursework.join(", ")}</p>
      </Section>
    </article>
  );
}