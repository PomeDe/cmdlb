'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { saveTicket } from "@/components/ticketStorage";
import { useState, useEffect } from 'react';
import { useParams,useRouter } from "next/navigation";
import showsData from "@/data/shows.json";




export default function Home() {
  const { id } = useParams();
  const [lang, setLang] = useState(true);
  const { logged,email } = useAuth();
  const router = useRouter();

  const [show, setShow] = useState(null);

  const [selectedMethod, setSelectedMethod] = useState('qpay');
  const [allShows, setAllShows] = useState([])

useEffect(() => {
  const adminShows = JSON.parse(localStorage.getItem("admin_shows")) || []
  setAllShows([...showsData, ...adminShows])
}, [])

  const pricePerSeat = 15000;

useEffect(() => {
  if (!allShows.length) return;

  const selectedShow = allShows.find(
    s => s.id === Number(id)
  );

  setShow(selectedShow || null);
}, [id, allShows]);

 

  const totalPrice = pricePerSeat;

 const handleCompletion = async () => {
  if (!show || !email) return;

  const ticketData = {
    id: show.id,
    name: show.name,
    date: show.date,
    time: show.time,
    total: totalPrice,
    purchasedAt: new Date().toISOString(),
  };

  // Save locally
  saveTicket(ticketData, email);

  // 🔥 Send ticket email
  const res = await fetch("/api/send-ticket", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      ticket: ticketData,
    }),
  });

const data = await res.json();

  if (data.success) {
    const storedTickets = JSON.parse(localStorage.getItem("issuedTickets")) || [];

    storedTickets.push({
      code: data.ticketCode,
      used: false,
      email,
      show: show.name,
    });

    localStorage.setItem("issuedTickets", JSON.stringify(storedTickets));

    alert("Ticket sent! 🎟");
    router.push("/");
  }
};


  return (
  <div className="flex flex-col min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900 font-sans">
    <Header lang={lang} setLang={setLang} logged={logged} />

    <div className="flex-1 flex items-center justify-center px-4 py-16 w-full">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.4)] p-14 space-y-12">

          {/* HEADER */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-gray-900">
              {lang ? "Secure Checkout" : "Аюулгүй төлбөр"}
            </h1>
            <p className="text-gray-500 text-sm">
              {lang ? "Concert Ticket Purchase" : "Концертын тасалбар"}
            </p>
          </div>

          {/* TOTAL */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 space-y-4">
            {show && (
              <div className="space-y-1 text-gray-700">
                <p className="font-semibold text-lg">{show.name}</p>
                <p className="text-sm text-gray-500">
                  {show.date} • {show.time}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-gray-600">
                {lang ? "Total Amount" : "Нийт дүн"}
              </span>
              <span className="text-3xl font-bold text-red-600">
                {totalPrice.toLocaleString()}₮
              </span>
            </div>
          </div>

          {/* PAYMENT METHODS */}
          <div className="space-y-5">
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              {lang ? "Payment Method" : "Төлбөрийн хэрэгсэл"}
            </p>

            <div className="grid grid-cols-2 gap-5">
              <button
                onClick={() => setSelectedMethod("qpay")}
                className={`p-6 rounded-2xl border transition-all duration-200 ${
                  selectedMethod === "qpay"
                    ? "border-red-500 bg-red-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <p className="font-semibold text-gray-900 text-center">
                  QPay
                </p>
                <p className="text-xs text-gray-500 text-center mt-1">
                  Scan & Pay
                </p>
              </button>

              <button
                onClick={() => setSelectedMethod("card")}
                className={`p-6 rounded-2xl border transition-all duration-200 ${
                  selectedMethod === "card"
                    ? "border-red-500 bg-red-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <p className="font-semibold text-gray-900 text-center">
                  {lang ? "Card" : "Карт"}
                </p>
                <p className="text-xs text-gray-500 text-center mt-1">
                  Visa / MasterCard
                </p>
              </button>
            </div>
          </div>

          {/* QPAY SECTION */}
          {selectedMethod === "qpay" && (
  <div className="bg-gray-50 rounded-2xl p-10 border border-gray-100 space-y-8">

    <p className="text-sm text-gray-600 text-center">
      {lang
        ? "Choose your bank app to complete payment"
        : "Төлбөр хийх банкны апп-аа сонгоно уу"}
    </p>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">

      {[
        {
          name: "Khan Bank",
          logo: "https://play-lh.googleusercontent.com/PFiYIqgKKgiq7xN1pYaQw5XpTnm64BDdsFjm106vyq-M2GAVPW_ajQKI2cGKKl9573o",
        },
        {
          name: "Golomt Bank",
          logo: "https://scontent.fuln6-1.fna.fbcdn.net/v/t39.30808-6/546301544_24466434229672511_1811602618798956583_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=53a332&_nc_ohc=JNJU7ejzXG0Q7kNvwG-4-m_&_nc_oc=AdnPb6cfEpIiluKllm5mdHU55BJPQ4qKCtPp0nJcLDnK6nLD8Vw7S_k3oeuly1i-R8k&_nc_zt=23&_nc_ht=scontent.fuln6-1.fna&_nc_gid=lv2KyegA0egBOgKFh-mXMg&_nc_ss=8&oh=00_AfvhNHfXkFib8BJW3BKxeIWu-JU7kE-IV_RXIetiqUDN8A&oe=69AA04B7",
        },
        {
          name: "XacBank",
          logo: "https://play-lh.googleusercontent.com/vHTV4z9QgeW9tPT2uIQtFIFA1Y_i2se3mrc98h4XvUJFhvQGgLRlCdl4oHF3YZXI4qcG",
        },
        {
          name: "TDB Bank",
          logo: "https://d20ytcq1zkh3th.cloudfront.net/6powyvum0vvlgdb.png",
        },
      ].map((bank) => (
        <button
          key={bank.name}
          className="bg-white rounded-2xl p-6 border text-black border-gray-200 hover:border-red-500 hover:shadow-md transition-all duration-200 flex items-center justify-center"
        >
          <img
            src={bank.logo}
            alt={bank.name}
            className="h-20 object-contain"
          />
        </button>
      ))}
    </div>

  </div>
)}


          {/* CARD SECTION */}
          {selectedMethod === "card" && (
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 space-y-5">
              <input
                type="text"
                placeholder={lang ? "Card Number" : "Картын дугаар"}
                className="w-full px-4 py-3 text-gray-900 rounded-xl border border-gray-300 focus:border-red-500 focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="px-4 py-3 text-gray-900 rounded-xl border border-gray-300 focus:border-red-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="px-4 py-3 text-gray-900 rounded-xl border border-gray-300 focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* ACTION */}
          <div className="pt-4">
            <button
              onClick={handleCompletion}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg"
            >
              {lang ? "Complete Payment" : "Төлбөр төлөх"}
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm"
            >
              {lang ? "Cancel & Return" : "Буцах"}
            </button>
          </div>

        </div>
      </div>
    </div>

    <Footer lang={lang} />
  </div>
);

}
