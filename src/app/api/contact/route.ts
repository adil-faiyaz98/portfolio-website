import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";


// Contact API endpoint - sends email to Adil Faiyaz
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message, phone, service, source } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Missing required fields: name, email" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Determine the source/form type for the subject
    const formSource = source || "Contact Form";
    const emailSubject = `[SDA Website] New ${formSource} Inquiry from ${name}${company ? ` at ${company}` : ""}`;

    // Build the email content
    const emailBody = `
New inquiry from SDA Intelligence website:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ""}
${company ? `Company: ${company}` : ""}
${service ? `Service Interest: ${service}` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${message || "No message provided"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SOURCE: ${formSource}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This email was automatically sent from the SDA Intelligence website contact form.
Reply directly to this email to respond to ${name}.
    `.trim();

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured. Email not sent.");
      console.log("Would have sent:", {
        to: "adil.faiyaz@consultsda.com",
        subject: emailSubject,
      });

      // Return success but indicate email wasn't sent
      return NextResponse.json({
        success: true,
        message: "Form submitted (email service not configured)",
        emailSent: false,
      });
    }

    // Send email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "SDA Intelligence <noreply@resend.dev>", // Use your verified domain later
      to: ["adil.faiyaz@consultsda.com"],
      subject: emailSubject,
      text: emailBody,
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email", details: error.message },
        { status: 500 },
      );
    }

    console.log("Email sent successfully:", data?.id);

    return NextResponse.json({
      success: true,
      message:
        "Your message has been sent successfully. We'll get back to you soon!",
      emailSent: true,
      emailId: data?.id,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 },
    );
  }
}
