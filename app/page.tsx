import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/jsonld";
import { ProjectCard } from "@/components/project-card";
import { PostCard } from "@/components/post-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getFeaturedProjects } from "@/data/projects";
import { getLatestPosts } from "@/lib/posts";
import { getSiteUrl } from "@/lib/site";
import { profile } from "@/data/profile";

const textLink = "inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline";

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={textLink}>
      {children}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export default function Home() {
  const featured = getFeaturedProjects();
  const posts = getLatestPosts(3);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: getSiteUrl(),
    description: profile.role,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
    affiliation: { "@type": "CollegeOrUniversity", name: profile.universityFull },
    sameAs: [profile.github, profile.linkedin],
  };

  return (
    <>
      <JsonLd data={personSchema} />
      <Hero />

      <section aria-labelledby="featured-heading" className="container-page pb-16 md:pb-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 id="featured-heading" className="text-title">Featured projects</h2>
          <Link href="/projects" className={textLink}>
            All projects <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} size={i === 0 ? "large" : "default"} className={i === 0 ? "md:col-span-2 md:row-span-2" : undefined} />
          ))}
        </div>
      </section>

      <section aria-labelledby="lab-heading" className="container-page pb-16 md:pb-24">
        <div className="flex flex-col gap-6 rounded-xl border bg-surface p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-[60ch]">
            <h2 id="lab-heading" className="text-title">Watch a search algorithm at work</h2>
            <p className="mt-3 text-muted-foreground">
              Draw walls on a grid, choose BFS, DFS, or A*, and watch each one
              look for a path. The grid at the top of this page is a still from it.
            </p>
          </div>
          <Link href="/ai-lab" className={cn(buttonVariants({ size: "lg" }), "shrink-0")}>
            Open the AI Lab
          </Link>
        </div>
      </section>

      <section aria-labelledby="posts-heading" className="container-page pb-16 md:pb-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 id="posts-heading" className="text-title">Latest posts</h2>
          {posts.length > 0 && (
            <Link href="/blog" className={textLink}>
              All posts <ArrowRight aria-hidden className="size-4" />
            </Link>
          )}
        </div>
        {posts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed p-8 text-muted-foreground">
            First posts are on the way.
          </div>
        )}
      </section>

      <section aria-labelledby="contact-heading" className="container-page pb-16 md:pb-24">
        <div className="rounded-xl border bg-surface p-6 md:p-10">
          <h2 id="contact-heading" className="text-title">Get in touch</h2>
          <p className="mt-3 max-w-[60ch] text-muted-foreground">
            Questions, project ideas, or opportunities are all welcome. Send a
            message or reach out directly.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/contact" className={buttonVariants({ size: "lg" })}>
              Send a message
            </Link>
            <a href={"mailto:" + profile.email} className={textLink}>{profile.email}</a>
            <ExternalLink href={profile.github}>GitHub</ExternalLink>
            <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
          </div>
        </div>
      </section>
    </>
  );
}