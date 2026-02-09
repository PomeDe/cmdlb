"use client"

import Link from "next/link"
import Header from "@/components/Header"
import { useParams } from "next/navigation";
import Footer from "@/components/Footer"
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext"
import shows from "@/data/shows.json"

const tickets = shows.filter(show => show.type === "upcoming");


export default function Home() {
  const [lang, setLang] = useState(true);
  const { id } = useParams();
  const { logged } = useAuth();
  const [ticket, setTicket] = useState(null);
  useEffect(() => {
    const selectedTicket = tickets.find(p => p.id === Number(id));
    setTicket(selectedTicket);
  }, [id]);


  return (
    <div className=" flex flex-col items-center justify-center bg-black font-sans  text-white">
      <Header lang={lang} setLang={setLang} logged={logged} />
      <div id="header" className=" overflow-hidden  flex h-250 w-full items-start justify-center">
        {ticket !== null ? (<div className="w-2/3 h-150 bg-gray-400 rounded-3xl flex flex-row mt-30 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 p-8">
              <div className=" rounded-lg overflow-hidden">
                <img
                  src={ticket.src}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="text-5xl mb-6">{ticket.name}</h1>


                  <div className="space-y-4 mb-8">
                    <div className="bg-white rounded-xl p-4 flex items-center gap-4">
                      <div className="bg-[#44a0eb] rounded-xl p-3">
                        <img src="/date.png" className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-[#717171]">Date and Time</p>
                        <p className="text-lg text-neutral-800">{ticket.date} at {ticket.time}</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 flex items-center gap-4">
                      <div className="bg-[#44a0eb] rounded-xl p-3">
                        <img src="/loc.png" className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-[#717171]">Location</p>
                        <p className="text-lg text-neutral-800">{ticket.location}</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 flex items-center gap-4">
                      <div className="bg-[#44a0eb] rounded-xl p-3">
                        <img src="/price.png " className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-[#717171]">Price</p>
                        <p className="text-lg text-neutral-800">{ticket.price}₮</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => { logged ? (window.location.href = "/seating") : (window.location.href = "/Login") }}
                  className="w-full h-20 bg-linear-to-b from-red-900 to-red-500 rounded-xl text-2xl"
                >
                  Choose Seat
                </button>
              </div>
            </div>
          
        </div>) : (<p>Couldnt find ticket</p>)}
      </div>
      <Footer lang={lang} />
    </div>
  )
}
