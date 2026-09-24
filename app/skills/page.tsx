import type { Metadata } from "next";
import Link from "next/link";
import { skillGroups } from "@/data/skills";
import { SkillTile } from "@/components/skill-tile";

export const metadata: Metadata = {
  title: "Skills",
  description: "Languages, tools, and AI/ML topics grouped by area.",
};

export default function SkillsPage() {
  return (
    <div className="container-page section-space">
      <header className="max-w-[65ch]">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.1] tracking-tight">Skills</h1>
        <p className="mt-4 text-lg text-[color:var(--muted)]">Languages, tools, and topics I have worked with, grouped by area. The AI and ML tile is coursework level, and the familiar-with tile covers tools I have only used for learning and small experiments.</p>
      </header>
      <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-flow-dense lg:grid-cols-6">
        {skillGroups.map((group) => <SkillTile key={group.id} group={group} />)}
      </ul>
      <p className="mt-10 max-w-[65ch] text-[color:var(--muted)]">
        You can watch BFS, DFS, and A* run in the <Link href="/ai-lab" className="text-[color:var(--accent)] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]">AI Lab</Link>.
      </p>
    </div>
  );
}