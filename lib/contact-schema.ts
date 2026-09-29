import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().trim().min(2, "Enter your name (at least 2 characters).").max(100, "Name must be 100 characters or fewer."),
    email: z.string().trim().min(1, "Enter your email address.").max(200, "Email must be 200 characters or fewer.").email("Enter a valid email address, like name@example.com."),
    message: z.string().trim().min(10, "Write at least 10 characters so the message has enough context.").max(2000, "Message must be 2000 characters or fewer."),
    company: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = "name" | "email" | "message";
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export function toFieldErrors(issues: ReadonlyArray<{ path: ReadonlyArray<PropertyKey>; message: string }>): ContactFieldErrors {
    const errors: ContactFieldErrors = {};
    for (const issue of issues) {
        const key = issue.path[0];
        if (key === "name" || key === "email" || key === "message") {
            if (!errors[key]) errors[key] = issue.message;
        }
    }
    return errors;
}