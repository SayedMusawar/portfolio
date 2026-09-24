import Link from "next/link";
import { profile } from "@/data/profile";

const links = [
    { href: profile.github, label: "GitHub" },
    { href: profile.linkedin, label: "LinkedIn" },
    { href: `mailto:${profile.email}`, label: "Email" },
];

export function SiteFooter() {
    return (
        <footer className="border-t">
            <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="font-heading font-semibold">{profile.name}</p>
                    <p className="text-sm text-muted-foreground">
                        {profile.university}, {profile.location}
                    </p>
                </div>

                <nav aria-label="Social" className="flex gap-5 text-sm">
                    {links.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-muted-foreground transition-colors duration-150 hover:text-brand"
                            {...(link.href.startsWith("http")
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="container-page pb-8 text-sm text-muted-foreground">
                © {new Date().getFullYear()} {profile.name}
            </div>
        </footer>
    );
}