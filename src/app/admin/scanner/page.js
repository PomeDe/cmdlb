"use client"

import { useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function ScannerPage() {

  const [message, setMessage] = useState("");

  const handleImageScan = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("reader");

    try {
      const decodedText = await html5QrCode.scanFile(file, true);
      verifyTicket(decodedText);
    } catch (err) {
      setMessage("❌ Could not read QR");
    }
  };

  function verifyTicket(code) {
    const tickets = JSON.parse(localStorage.getItem("issuedTickets")) || [];

    const ticket = tickets.find(t => t.code === code);

    if (!ticket) {
      setMessage("❌ Invalid Ticket");
      return;
    }

    if (ticket.used) {
      setMessage("⚠️ Ticket Already Used");
      return;
    }

    ticket.used = true;
    localStorage.setItem("issuedTickets", JSON.stringify(tickets));

    setMessage("✅ Ticket Valid - Entry Allowed");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl mb-6">Scan Ticket</h1>

      <input 
        type="file" 
        accept="image/*"
        onChange={handleImageScan}
        className="mb-4"
      />

      <div id="reader" className="hidden"></div>

      <p className="text-2xl mt-4">{message}</p>
    </div>
  );
}