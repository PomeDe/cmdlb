"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getTickets } from "@/components/ticketStorage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user, email, logged, setLogged} = useAuth();
  const [lang, setLang] = useState("en");
  const [activeTab, setActiveTab] = useState("tickets");
  const [tickets, setTickets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (email) {
      setTickets(getTickets(email));
    }
  }, [email]);

  if (!logged) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Please login first.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header lang={lang} setLang={setLang} logged={logged} setLogged={setLogged}/>

      <div className="w-3/4 mx-auto py-16 space-y-12">

        {/* Page Title */}
        <h1 className="text-4xl font-bold">Миний профайл</h1>

        {/* User Info */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
          <p className="text-lg">
            <span className="text-gray-400">Нэр:</span> {user}
          </p>
          <p className="text-lg mt-2">
            <span className="text-gray-400">Имэйл:</span> {email}
          </p>
                  <button className="text-center mt-6 text-lg bg-neutral-700 px-6 py-3 rounded-xl" onClick={()=> {setLogged(false); localStorage.removeItem("auth"); router.push("/")} }>Logout</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-neutral-800 pb-3">
          <button
            onClick={() => setActiveTab("tickets")}
            className={`pb-2 ${
              activeTab === "tickets"
                ? "border-b-2 border-red-600 text-white"
                : "text-gray-400"
            }`}
          >
            Миний тасалбарууд
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-2 ${
              activeTab === "settings"
                ? "border-b-2 border-red-600 text-white"
                : "text-gray-400"
            }`}
          >
            Тохиргоо
          </button>
        </div>

        {/* Tickets Section */}
        {activeTab === "tickets" && (
          <div className="space-y-6">
            {tickets.length === 0 ? (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-10 text-center">
                <p className="text-gray-400">
                  Та одоогоор тасалбар аваагүй байна.
                </p>

                <Link
                  href="/"
                  className="inline-block mt-6 bg-red-600 px-6 py-3 rounded-lg"
                >
                  Шоунууд харах
                </Link>
              </div>
            ) : (
              tickets.map((ticket, i) => (
                <div
                  key={i}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-semibold">
                    {ticket.name}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {ticket.date} | {ticket.time}
                  </p>

                  <p className="text-gray-300 mt-2">
                    Seats: {ticket.seats.join(", ")}
                  </p>

                  <p className="text-red-500 font-bold mt-4">
                    {ticket.total.toLocaleString()}₮
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Settings Section */}
        {activeTab === "settings" && (
            <div className="flex flex-row justify-evenly">
<div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-6 max-w-lg">

            <h3 className="text-xl font-semibold">
              Нууц үг солих
            </h3>

            <input
              type="password"
              placeholder="Одоогийн нууц үг"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3"
            />

            <input
              type="password"
              placeholder="Шинэ нууц үг"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3"
            />

            <input
              type="password"
              placeholder="Нууц үг баталгаажуулах"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3"
            />

            <button className="w-full bg-red-600 py-3 rounded-lg font-semibold">
              Update
            </button>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-6 w-xl">

            <h3 className="text-xl font-semibold">
                Personal Information
            </h3>
<p>Username</p>
            <input
              type="text"
              placeholder=""
              defaultValue={user}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3"
            />
<p>Email</p>
            <input
              type="text"
              placeholder=""
                            defaultValue={email}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3"
            />
            <button className="w-full bg-red-600 py-3 rounded-lg font-semibold">
              Update
            </button>
          </div>
            </div>
          
        )}

      </div>

      <Footer />
    </div>
  );
}
