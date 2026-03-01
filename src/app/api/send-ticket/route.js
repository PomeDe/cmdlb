import nodemailer from "nodemailer";
import QRCode from "qrcode";

export async function POST(req) {
  const { email, ticket } = await req.json();

  try {
    // 🎟 Generate random ticket code
    const ticketCode = "TICKET-" + Math.random().toString(36).substring(2, 10).toUpperCase();

    // 📱 Generate QR Code as base64 image
    const qrDataUrl = await QRCode.toDataURL(ticketCode);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

// Convert base64 to Buffer
const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, "");
const qrBuffer = Buffer.from(base64Data, "base64");

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: "🎟 Your Concert Ticket",
  html: `
    <h2>Ticket Confirmation</h2>
    <p><strong>Show:</strong> ${ticket.name}</p>
    <p><strong>Date:</strong> ${ticket.date}</p>
    <p><strong>Time:</strong> ${ticket.time}</p>
    <p><strong>Total:</strong> ${ticket.total}₮</p>
    <br/>
    <h3>Your Entry QR Code:</h3>
    <img src="cid:qrimage" width="200" height="200"/>
    <p><strong>Ticket ID:</strong> ${ticketCode}</p>
    <br/>
    <p>Show this QR code at entry.</p>
  `,
  attachments: [
    {
      filename: "ticket.png",
      content: qrBuffer,
      cid: "qrimage", 
    },
  ],
});

    return Response.json({ success: true, ticketCode });

  } catch (error) {
    console.log(error);
    return Response.json({ success: false });
  }
} 