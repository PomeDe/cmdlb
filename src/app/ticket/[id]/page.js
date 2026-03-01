"use client"

import Link from "next/link"
import Header from "@/components/Header"
import { useParams } from "next/navigation";
import Footer from "@/components/Footer"
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext"
import showsData from "@/data/shows.json"


export default function Home() {
  const [lang, setLang] = useState(true);
  const { id } = useParams();
  const { logged } = useAuth();
  const [ticket, setTicket] = useState(null);

    const [allShows, setAllShows] = useState([])

useEffect(() => {
  const adminShows = JSON.parse(localStorage.getItem("admin_shows")) || []
  setAllShows([...showsData, ...adminShows])
}, [])
useEffect(() => {
  if (!allShows.length) return;

  const selectedTicket = allShows.find(
    (p) => p.id === Number(id)
  );

  setTicket(selectedTicket || null);
}, [id, allShows]);


  return (
    <div className=" flex flex-col items-center justify-center bg-black font-sans  text-white">
      <Header lang={lang} setLang={setLang} logged={logged} />
      <div id="header" className=" overflow-hidden  flex w-full items-start justify-center">
        {ticket !== null ? (
  <div className="w-full max-w-6xl px-6 py-24">
    
    <div className="grid lg:grid-cols-2 gap-16 items-start">

      {/* LEFT SIDE - IMAGE */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={ticket.src}
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      {/* RIGHT SIDE - DETAILS */}
      <div className="flex flex-col justify-between space-y-10">

        {/* TITLE */}
        <div>
          <h1 className="text-5xl font-bold mb-4">{ticket.name}</h1>
          <p className="text-gray-400 text-lg">
            {lang ? "Live Stand-Up Comedy Experience" : "Live Stand-Up тоглолт"}
          </p>
        </div>

        {/* INFO CARDS */}
        <div className="space-y-6">

          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">
                {lang ? "Date & Time" : "Огноо"}
              </p>
              <p className="text-xl font-semibold">
                {ticket.date} • {ticket.time}
              </p>
            </div>
          </div>

          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">
                {lang ? "Location" : "Байршил"}
              </p>
              <p className="text-xl font-semibold">
                {ticket.location}
              </p>
            </div>
          </div>

          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">
                {lang ? "Ticket Price" : "Үнэ"}
              </p>
              <p className="text-2xl font-bold text-red-500">
                {ticket.price}₮
              </p>
            </div>
          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={() => {
            logged
              ? (window.location.href = `/purchase/${ticket.id}`)
              : (window.location.href = "/Login")
          }}
          className="w-full h-16 bg-red-600 hover:bg-red-500 rounded-2xl text-xl font-semibold transition duration-200 shadow-lg hover:shadow-red-500/30"
        >
          {lang ? "Purchase Ticket" : "Тасалбар худалдаж авах"}
        </button>

      </div>

    </div>

  </div>
) : (
  <div className="py-40 text-gray-500 text-xl">
    {lang ? "Ticket not found." : "Тоглолт олдсонгүй."}
  </div>
)}

      </div>
      <Footer lang={lang} />
    </div>
  )
}
