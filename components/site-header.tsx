"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/ai-lab", label: "AI Lab" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
];

export function SiteHeader() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(`${href}/`);

    return (
        <header className="sticky top-0 z-40 border-b bg-background">
            <div className="container-page flex h-16 items-center justify-between gap-4">
                <Link
                    href="/"
                    className="font-heading text-lg font-semibold tracking-tight"
                >
                    {profile.shortName}
                </Link>

                <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={isActive(link.href) ? "page" : undefined}
                            className={cn(
                                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-150",
                                isActive(link.href)
                                    ? "text-brand"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    <Link
                        href="/contact"
                        className={cn(buttonVariants(), "hidden md:inline-flex")}
                    >
                        Contact
                    </Link>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        aria-label="Open menu"
                        onClick={() => setOpen(true)}
                    >
                        <Menu aria-hidden />
                    </Button>

                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetContent side="right" className="w-72">
                            <SheetTitle className="px-4 pt-4 font-heading">Menu</SheetTitle>
                            <SheetDescription className="sr-only">
                                Site navigation
                            </SheetDescription>
                            <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        aria-current={isActive(link.href) ? "page" : undefined}
                                        className={cn(
                                            "rounded-full px-4 py-2.5 text-base font-medium",
                                            isActive(link.href)
                                                ? "text-brand"
                                                : "text-foreground hover:bg-accent"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link
                                    href="/contact"
                                    onClick={() => setOpen(false)}
                                    className={cn(buttonVariants(), "mt-4")}
                                >
                                    Contact
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}