import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || typeof name !== "string") {
      return Response.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email || typeof email !== "string") {
      return Response.json({ error: "Email is required." }, { status: 400 });
    }
    if (!message || typeof message !== "string") {
      return Response.json({ error: "Message is required." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const cleanSubject =
      typeof subject === "string" && subject.trim().length > 0
        ? subject.trim()
        : "New Arkhe Holdings contact message";

    await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Arkhe Holdings <onboarding@resend.dev>",
      to:
        process.env.ARKHE_LEADS_EMAIL || "brian.salsbury@arkheholdings.net",
      replyTo: email,
      subject: `[Contact] ${cleanSubject}`,
      text: `New contact submission

Name:    ${name}
Email:   ${email}
Subject: ${cleanSubject}

Message:
${message}
`,
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
