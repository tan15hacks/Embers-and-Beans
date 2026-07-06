import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema, contactTopicLabels } from "@/lib/contact";
import { siteConfig } from "@/data/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Please check the form and try again." },
        { status: 400 },
      );
    }

    const data = result.data;

    if (data.website) {
      return NextResponse.json({ message: "Message received." });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ?? "Ember & Bean <onboarding@resend.dev>";

    if (!apiKey) {
      console.warn("RESEND_API_KEY is not configured. Contact email was not sent.");
      return NextResponse.json({
        message:
          "Message received. Email delivery will activate once the shop inbox is configured.",
      });
    }

    const resend = new Resend(apiKey);
    const topicLabel = contactTopicLabels[data.topic];
    const subject = `New ${topicLabel} message from ${data.name}`;

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "Not provided"}`,
        `Topic: ${topicLabel}`,
        `Preferred date/time: ${data.visitDate || "Not provided"}`,
        "",
        data.message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; color: #2B1E18; line-height: 1.6;">
          <h1 style="font-size: 24px; margin-bottom: 16px;">New Ember & Bean inquiry</h1>
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(data.phone || "Not provided")}</p>
          <p><strong>Topic:</strong> ${escapeHtml(topicLabel)}</p>
          <p><strong>Preferred date/time:</strong> ${escapeHtml(data.visitDate || "Not provided")}</p>
          <hr style="border: 0; border-top: 1px solid #E5C7A1; margin: 24px 0;" />
          <p>${escapeHtml(data.message).replaceAll("\n", "<br />")}</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Thanks — your message was sent." });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
