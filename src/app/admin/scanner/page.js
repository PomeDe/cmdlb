"use client"

import { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function ScannerPage() {

  useEffect(() => {
    const qrCodeScanner = new Html5Qrcode("reader");

    const startScanner = async () => {
      const cameras = await Html5Qrcode.getCameras();
      if (cameras && cameras.length) {
        await qrCodeScanner.start(
          cameras[0].id,
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            verifyTicket(decodedText);
            qrCodeScanner.stop();
          }
        );
      }
    };

    startScanner();

    return () => {
      qrCodeScanner.stop().catch(() => {});
    };
  }, []);

  function verifyTicket(code) {
    const tickets = JSON.parse(localStorage.getItem("issuedTickets")) || [];

    const ticket = tickets.find(t => t.code === code);

    if (!ticket) {
      alert("❌ Invalid Ticket");
      return;
    }

    if (ticket.used) {
      alert("⚠️ Ticket Already Used");
      return;
    }

    ticket.used = true;
    localStorage.setItem("issuedTickets", JSON.stringify(tickets));

    alert("✅ Ticket Valid - Entry Allowed");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl mb-6">Scan Ticket</h1>
      <div id="reader" className="w-96"></div>
    </div>
  );
}
