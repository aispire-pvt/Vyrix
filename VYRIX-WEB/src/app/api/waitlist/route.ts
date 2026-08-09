import { NextRequest, NextResponse } from "next/server";
import { getWaitlistCollection } from "@/lib/mongodb";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendConfirmationEmail(email: string) {
  const apiKey = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SENDER;

  if (!apiKey || !sender) return;

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { email: sender, name: "Vyrix" },
      to: [{ email }],
      subject: "You're on the Vyrix waitlist 🎉",
      htmlContent: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#0A0A0A">
          <img src="https://vyrix.in/vyrix-logo.png" alt="Vyrix" style="height:28px;margin-bottom:32px" />
          <h1 style="font-size:24px;font-weight:800;margin:0 0 12px">You're in.</h1>
          <p style="font-size:16px;line-height:1.6;color:#4B5563;margin:0 0 24px">
            Thanks for joining the Vyrix waitlist. We'll reach out as soon as early access opens — no need to check back.
          </p>
          <p style="font-size:14px;color:#6B7280;margin:0">
            — The Vyrix team, <a href="https://vyrix.in" style="color:#0A0A0A">vyrix.in</a>
          </p>
        </div>
      `,
    }),
  }).catch(() => {
    // Non-fatal — signup still succeeds even if email fails
  });
}

export async function POST(request: NextRequest) {
  let email: unknown;

  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: "Malformed request body" }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    const collection = await getWaitlistCollection();

    await collection.createIndex({ email: 1 }, { unique: true });

    const exists = await collection.findOne({ email: cleanEmail });
    if (exists) {
      return NextResponse.json({ error: "This email is already on the waitlist!" }, { status: 400 });
    }

    await collection.insertOne({
      email: cleanEmail,
      timestamp: new Date().toISOString(),
    });

    const total = await collection.countDocuments();

    // Fire and forget — don't await so it doesn't slow down the response
    sendConfirmationEmail(cleanEmail);

    return NextResponse.json({ position: total });
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "code" in err && (err as { code: number }).code === 11000) {
      return NextResponse.json({ error: "This email is already on the waitlist!" }, { status: 400 });
    }

    console.error("Waitlist error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const collection = await getWaitlistCollection();
    const total = await collection.countDocuments();
    return NextResponse.json({ total });
  } catch (err) {
    console.error("Waitlist GET error:", err);
    return NextResponse.json({ error: "Could not fetch count." }, { status: 500 });
  }
}
