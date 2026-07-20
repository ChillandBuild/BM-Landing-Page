import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const CONTACT_RECIPIENT = "bloommatrixtech@gmail.com";

const contactSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(200),
  email: z.string().trim().email("A valid email address is required").max(320),
  company: z.string().trim().max(200).optional().default(""),
  phone: z.string().trim().max(50).optional().default(""),
  projectType: z.string().trim().max(100).optional().default(""),
  budget: z.string().trim().max(50).optional().default(""),
  description: z.string().trim().max(5000).optional().default(""),
  website: z.string().trim().max(200).optional().default(""), // honeypot
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Please check the form and try again.";
    return NextResponse.json({ ok: false, error: firstIssue }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot: silently accept without sending, so bots get a fake success.
  if (data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form submission was not sent.");
    return NextResponse.json(
      { ok: false, error: "Email delivery is not configured yet. Please email us directly." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Bloom Matrix Website <onboarding@resend.dev>",
      to: CONTACT_RECIPIENT,
      replyTo: data.email,
      subject: `New strategy call request from ${data.fullName}`,
      text: [
        `Full Name: ${data.fullName}`,
        `Company: ${data.company || "—"}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "—"}`,
        `Project Type: ${data.projectType || "—"}`,
        `Budget: ${data.budget || "—"}`,
        "",
        "Description:",
        data.description || "—",
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not send your message. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please try again shortly." },
      { status: 500 }
    );
  }
}
