import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return Response.json({ error: "Email is required." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Arkhe Holdings <onboarding@resend.dev>",
      to: process.env.ARKHE_LEADS_EMAIL || "brian.salsbury@arkheholdings.net",
      subject: "New Arkhe Holdings subscriber",
      text: `New subscriber: ${email}`,
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
