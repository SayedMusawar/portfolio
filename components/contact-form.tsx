"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { contactSchema, toFieldErrors, type ContactField, type ContactFieldErrors } from "@/lib/contact-schema";

type Status = "idle" | "sending" | "success" | "error";

const emptyValues = { name: "", email: "", message: "", company: "" };
const fieldOrder: ContactField[] = ["name", "email", "message"];
const fieldClass = "w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground aria-invalid:border-red-600 dark:aria-invalid:border-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

type FieldProps = { id: string; label: string; error?: string; children: ReactNode };

function Field({ id, label, error, children }: FieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
            {children}
            {error ? <p id={id + "-error"} className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
        </div>
    );
}

export function ContactForm() {
    const [values, setValues] = useState(emptyValues);
    const [errors, setErrors] = useState<ContactFieldErrors>({});
    const [status, setStatus] = useState<Status>("idle");
    const [message, setMessage] = useState("");

    function update(field: keyof typeof emptyValues, value: string) {
        setValues((prev) => ({ ...prev, [field]: value }));
        if (field !== "company" && errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (status === "sending") return;

        const parsed = contactSchema.safeParse(values);
        if (!parsed.success) {
            const fieldErrors = toFieldErrors(parsed.error.issues);
            setErrors(fieldErrors);
            setStatus("idle");
            setMessage("");
            const first = fieldOrder.find((field) => fieldErrors[field]);
            if (first) document.getElementById("contact-" + first)?.focus();
            return;
        }

        setStatus("sending");
        setMessage("");
        setErrors({});

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsed.data),
            });
            const result = await response.json().catch(() => null);

            if (response.ok && result && result.ok) {
                setValues(emptyValues);
                setStatus("success");
                return;
            }

            if (result && result.fieldErrors) setErrors(result.fieldErrors);
            setMessage(result && result.message ? result.message : "Something went wrong. Please try again, or email " + profile.email + " directly.");
            setStatus("error");
        } catch {
            setMessage("Could not reach the server. Check your connection and try again, or email " + profile.email + " directly.");
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div role="status" className="flex flex-col items-start gap-4">
                <h2 className="text-title">Message sent</h2>
                <p className="text-muted-foreground">Thanks for writing. Your message was delivered to my inbox.</p>
                <Button type="button" onClick={() => setStatus("idle")}>Send another message</Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            {status === "error" ? <p role="alert" className="rounded-xl border border-red-600 px-4 py-3 text-sm text-red-600 dark:border-red-400 dark:text-red-400">{message}</p> : null}

            <Field id="contact-name" label="Name" error={errors.name}>
                <input id="contact-name" name="name" type="text" autoComplete="name" value={values.name} onChange={(e) => update("name", e.target.value)} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? "contact-name-error" : undefined} className={fieldClass} />
            </Field>

            <Field id="contact-email" label="Email" error={errors.email}>
                <input id="contact-email" name="email" type="email" autoComplete="email" value={values.email} onChange={(e) => update("email", e.target.value)} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? "contact-email-error" : undefined} className={fieldClass} />
            </Field>

            <Field id="contact-message" label="Message" error={errors.message}>
                <textarea id="contact-message" name="message" rows={6} value={values.message} onChange={(e) => update("message", e.target.value)} aria-invalid={errors.message ? true : undefined} aria-describedby={errors.message ? "contact-message-error" : undefined} className={fieldClass} />
            </Field>

            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="contact-company">Company</label>
                <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" value={values.company} onChange={(e) => update("company", e.target.value)} />
            </div>

            <div>
                <Button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending" : "Send message"}</Button>
            </div>
        </form>
    );
}