import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/data/profile";
import { certifications, coursework, education, leadership } from "@/data/timeline";
import { TimelineSection } from "@/components/timeline-section";

export const metadata: Metadata = {
  title: "About",
  description: "Computer Science student at FAST-NUCES Karachi building full-stack apps, desktop software, and AI experiments.",
};

const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]";
const inlineLink = `text-[color:var(--accent)] underline underline-offset-4 ${focus}`;
const primaryBtn = `inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--accent)] px-6 text-sm font-medium text-[color:var(--accent-fg)] transition-opacity duration-150 hover:opacity-90 motion-reduce:transition-none ${focus}`;
const secondaryBtn = `inline-flex h-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[var(--surface)] px-6 text-sm font-medium transition-colors duration-150 hover:border-[color:var(--muted)] motion-reduce:transition-none ${focus}`;
const pill = "rounded-full border border-[color:var(--border)] bg-[var(--surface)] px-3 py-1 text-sm transition-colors duration-150 hover:border-[color:var(--muted)] motion-reduce:transition-none";

const facts = [
  { label: "Location", value: profile.location },
  { label: "University", value: profile.universityFull },
  { label: "Degree", value: `${profile.degree}, ${education[0].period}` },
];

export default function AboutPage() {
  return (
    <div className="container-page section-space">
      <header className="max-w-[65ch]">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.1] tracking-tight">About</h1>
        <p className="mt-4 text-lg text-[color:var(--muted)]">{profile.role}</p>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
        <div className="max-w-[65ch] space-y-5 leading-[1.6]">
          {/* TODO (owner to confirm): profile photo and current year of study */}
          <p>I am a Computer Science student at FAST-NUCES in Karachi. I started my BS in 2024 at the Peshawar campus and now study at the Karachi campus.</p>
          <p>I build full-stack apps, desktop software, and games, and I study AI and machine learning. My flagship project is the <Link href="/projects/lost-and-found-system" className={inlineLink}>Lost &amp; Found Intelligence System</Link>, a web app built with React, FastAPI, and PostgreSQL that replaced a manual register-based process at the university.</p>
          <p>Outside class I am a Microsoft Learn Student Ambassador, which involves organizing and taking part in technical workshops and peer-learning sessions on campus. I am also an IEEE student member and join its technical events and workshops.</p>
        </div>
        <aside className="h-fit rounded-[12px] border border-[color:var(--border)] bg-[var(--surface)] p-6">
          <dl className="grid gap-5 text-sm">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[color:var(--muted)]">{fact.label}</dt>
                <dd className="mt-1 text-base">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <TimelineSection title="Education" items={education} />
      <TimelineSection title="Leadership" items={leadership} />
      <TimelineSection title="Other training" items={certifications} />

      <section className="mt-16 md:mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">Relevant coursework</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {coursework.map((course) => <li key={course} className={pill}>{course}</li>)}
        </ul>
      </section>

      <section className="mt-16 md:mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">Get in touch</h2>
        <p className="mt-3 max-w-[65ch] text-[color:var(--muted)]">The contact page is the quickest way to reach me. You can also find me by email, on GitHub, and on LinkedIn.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" className={primaryBtn}>Contact me</Link>
          <Link href="/resume" className={secondaryBtn}>View resume</Link>
        </div>
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <a href={`mailto:${profile.email}`} className={inlineLink}>Email</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className={inlineLink}>GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className={inlineLink}>LinkedIn</a>
        </p>
      </section>
    </div>
  );
}