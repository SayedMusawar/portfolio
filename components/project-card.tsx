import Link from "next/link";
import Image from "next/image";
import {
    Boxes,
    Brain,
    Gamepad2,
    Globe,
    Monitor,
    type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/data/projects";

const icons: Record<ProjectCategory, LucideIcon> = {
    Web: Globe,
    Desktop: Monitor,
    Games: Gamepad2,
    AI: Brain,
    Misc: Boxes,
};

type Props = {
    project: Project;
    size?: "default" | "large";
    className?: string;
};

export function ProjectCard({ project, size = "default", className }: Props) {
    const Icon = icons[project.category];
    const large = size === "large";

    return (
        <Link
            href={`/projects/${project.slug}`}
            className={cn(
                "flex flex-col overflow-hidden rounded-xl border bg-surface transition-shadow duration-150 hover:shadow-sm",
                className
            )}
        >
            <div
                className={cn(
                    "relative flex items-center justify-center border-b bg-background",
                    large ? "min-h-48 flex-1" : "h-32"
                )}
            >
                {project.images[0] ? (
                    <Image
                        src={project.images[0]}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="(min-width: 768px) 700px, 100vw"
                        className="object-cover"
                    />
                ) : (
                    <Icon
                        aria-hidden
                        className={cn("text-muted-foreground", large ? "size-12" : "size-8")}
                    />
                )}
            </div>

            <div className="flex flex-col gap-3 p-5">
                <div className="flex items-baseline justify-between gap-3 text-sm text-muted-foreground">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                </div>
                <h3
                    className={cn(
                        "font-heading font-semibold",
                        large ? "text-2xl" : "text-lg"
                    )}
                >
                    {project.title}
                </h3>
                <p className="text-muted-foreground">{project.summary}</p>
                <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
                    {project.stack.map((tech) => (
                        <li key={tech}>
                            <Badge variant="outline">{tech}</Badge>
                        </li>
                    ))}
                </ul>
            </div>
        </Link>
    );
}