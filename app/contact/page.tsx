import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send a message to " + profile.name + ".",
};

export default function ContactPage() {
  return (
    <div className="container-page section-space">
      <h1 className="text-display">Contact</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">Questions, project ideas, or an internship opportunity: send a message here or use one of the links.</p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
          <ContactForm />
        </div>

        <aside className="flex flex-col gap-6">
          <h2 className="text-title">Elsewhere</h2>
          <ul className="flex flex-col gap-4">
            <li>
              <a href={"mailto:" + profile.email} className="inline-flex items-center gap-2 text-brand underline-offset-4 hover:underline">
                <Mail className="size-4" aria-hidden="true" />
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-brand underline-offset-4 hover:underline">GitHub</a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand underline-offset-4 hover:underline">LinkedIn</a>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground">{profile.location}</p>
        </aside>
      </div>
    </div>
  );
}