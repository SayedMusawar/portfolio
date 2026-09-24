"use client";

import { useState } from "react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
    type Transition,
} from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { projectCategories, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type Category = (typeof projectCategories)[number];

const pillBase =
    "inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-150";
const pillOn = "border-transparent bg-brand text-brand-fg";
const pillOff = "border-border bg-surface text-foreground hover:bg-accent";
const gridClass = "relative mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3";
const emptyClass =
    "mt-4 flex flex-col items-start gap-4 rounded-xl border border-dashed p-8";

export function ProjectFilter({ projects }: { projects: Project[] }) {
    const [active, setActive] = useState<Category>("All");
    const reduceMotion = useReducedMotion();

    const transition: Transition = reduceMotion
        ? { duration: 0 }
        : { duration: 0.18, ease: "easeOut" };

    const visible =
        active === "All"
            ? projects
            : projects.filter((p) => p.category === active);

    const count = visible.length;
    const noun = count === 1 ? "project" : "projects";
    const status =
        `Showing ${count} ${noun}` + (active === "All" ? "" : ` in ${active}`);

    return (
        <div>
            <div
                role="group"
                aria-label="Filter projects by category"
                className="flex flex-wrap gap-2">
                {projectCategories.map((c) => (
                    <button
                        key={c}
                        type="button"
                        aria-pressed={active === c}
                        onClick={() => setActive(c)}
                        className={cn(pillBase, active === c ? pillOn : pillOff)}>
                        {c}
                    </button>
                ))}
            </div>

            <p aria-live="polite" className="mt-6 text-sm text-muted-foreground">
                {status}
            </p>

            {count > 0 ? (
                <ul className={gridClass}>
                    <AnimatePresence mode="popLayout" initial={false}>
                        {visible.map((p) => (
                            <motion.li
                                key={p.slug}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={transition}
                                className="flex">
                                <ProjectCard project={p} className="w-full" />
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
            ) : (
                <div className={emptyClass}>
                    <p className="font-heading text-lg font-semibold">
                        No {active} projects yet
                    </p>
                    <p className="max-w-prose text-muted-foreground">
                        Nothing has been added to this category yet. You can look
                        through the other projects in the meantime.
                    </p>
                    <Button variant="outline" onClick={() => setActive("All")}>
                        Show all projects
                    </Button>
                </div>
            )}
        </div>
    );
}