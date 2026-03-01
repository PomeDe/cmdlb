import nodemailer from "nodemailer";

export async function POST(req) {
  const { email } = await req.json();

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App Password
    },
  });

  try {
    await transporter.sendMail({
      from: `"ComedyLab" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Verification Code",
      html: `
        <h2>Your verification code</h2>
        <p style="font-size: 24px; font-weight: bold;">${code}</p>
        <p>This code will expire in 5 minutes.</p>
      `,
    });

    return Response.json({ success: true, code });
  } catch (error) {
    console.error("Email send error:", error);
    return Response.json({ success: false, error: error.message });
  }
}
