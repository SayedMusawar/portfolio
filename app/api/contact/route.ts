import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, toFieldErrors } from "@/lib/contact-schema";
import { profile } from "@/data/profile";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "The request could not be read. Reload the page and try again." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Some fields need attention. Fix them and send again.", fieldErrors: toFieldErrors(parsed.error.issues) }, { status: 400 });
  }

  const data = parsed.data;

  if (data.company && data.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set.");
    return NextResponse.json({ ok: false, message: "Sending is not set up on the server yet. Please email " + profile.email + " directly." }, { status: 503 });
  }

  const to = process.env.CONTACT_TO_EMAIL ?? profile.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio contact <onboarding@resend.dev>";
  const safeName = data.name.replace(/[\r\n]+/g, " ");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: "Portfolio message from " + safeName,
      text: "Name: " + safeName + "\nEmail: " + data.email + "\n\n" + data.message,
    });

    if (error) {
      console.error("Contact form: Resend error", error);
      return NextResponse.json({ ok: false, message: "The message could not be sent. Please try again in a moment, or email " + profile.email + " directly." }, { status: 502 });
    }
  } catch (err) {
    console.error("Contact form: unexpected error", err);
    return NextResponse.json({ ok: false, message: "Something went wrong on the server. Please try again, or email " + profile.email + " directly." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}