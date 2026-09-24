import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Brain,
  ExternalLink,
  Gamepad2,
  Globe,
  Monitor,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  getAdjacentProjects,
  getProject,
  projects,
  type ProjectCategory,
} from "@/data/projects";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

const icons: Record<ProjectCategory, LucideIcon> = {
  Web: Globe,
  Desktop: Monitor,
  Games: Gamepad2,
  AI: Brain,
  Misc: Boxes,
};

const backLink =
  "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground";
const heading = "text-4xl font-semibold leading-[1.1] md:text-5xl";
const frame =
  "relative aspect-video overflow-hidden rounded-xl border bg-surface";
const placeholder =
  "flex h-56 flex-col items-center justify-center gap-3 rounded-xl border bg-surface text-muted-foreground md:h-72";
const navCard =
  "flex flex-col gap-1 rounded-xl border bg-surface p-5 transition-shadow duration-150 hover:shadow-sm";
const navLabel = "flex items-center gap-2 text-sm text-muted-foreground";
const navTitle = "font-heading text-lg font-semibold";
const asideClass =
  "h-fit rounded-xl border bg-surface p-5 lg:sticky lg:top-24";
const listClass =
  "mt-4 flex max-w-[65ch] list-disc flex-col gap-2 pl-5 marker:text-muted-foreground";
const primaryLink = buttonVariants({ size: "lg" });
const outlineLink = buttonVariants({ variant: "outline", size: "lg" });

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const Icon = icons[project.category];

  return (
    <article className="container-page section-space">
      <Link href="/projects" className={backLink}>
        <ArrowLeft aria-hidden className="size-4" />
        All projects
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{project.category}</span>
          <span aria-hidden>·</span>
          <span>{project.year}</span>
        </p>
        <h1 className={cn(heading, "mt-3")}>{project.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {project.summary}
        </p>

        {(project.githubUrl || project.liveUrl) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.githubUrl && (
              <a href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={primaryLink}>
                View on GitHub
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={outlineLink}>
                Live site
                <ExternalLink aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </header>

      <section aria-labelledby="gallery-heading" className="mt-12">
        <h2 id="gallery-heading" className="sr-only">
          Screenshots
        </h2>
        {project.images.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {project.images.map((src, i) => (
              <li key={src} className={frame}>
                <Image src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 550px, 100vw"
                  className="object-cover" />
              </li>
            ))}
          </ul>
        ) : (
          <div className={placeholder}>
            <Icon aria-hidden className="size-12" />
            <p>Screenshots coming soon</p>
          </div>
        )}
      </section>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-12">
          <section aria-labelledby="built-heading">
            <h2 id="built-heading" className="text-2xl font-semibold">
              What I built
            </h2>
            <div className="mt-4 flex max-w-[65ch] flex-col gap-4">
              {project.description.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </section>

          {project.highlights.length > 0 && (
            <section aria-labelledby="highlights-heading">
              <h2 id="highlights-heading" className="text-2xl font-semibold">
                Highlights
              </h2>
              <ul className={listClass}>
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside aria-label="Project details" className={asideClass}>
          <dl className="flex flex-col gap-5">
            <div>
              <dt className="text-sm text-muted-foreground">Category</dt>
              <dd className="mt-1">{project.category}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Year</dt>
              <dd className="mt-1">{project.year}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Stack</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <Badge variant="outline">{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      {prev && next && (
        <nav aria-label="More projects"
          className="mt-16 grid gap-4 border-t pt-8 sm:grid-cols-2">
          <Link href={`/projects/${prev.slug}`} className={navCard}>
            <span className={navLabel}>
              <ArrowLeft aria-hidden className="size-4" />
              Previous project
            </span>
            <span className={navTitle}>{prev.title}</span>
          </Link>
          <Link href={`/projects/${next.slug}`}
            className={cn(navCard, "sm:items-end sm:text-right")}>
            <span className={navLabel}>
              Next project
              <ArrowRight aria-hidden className="size-4" />
            </span>
            <span className={navTitle}>{next.title}</span>
          </Link>
        </nav>
      )}
    </article>
  );
}