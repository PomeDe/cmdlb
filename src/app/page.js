"use client"

import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"
import { useState,useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import shows from "@/data/shows.json"
import { getTickets } from "@/components/ticketStorage";


export default function Home() {

  const [active, setActive] = useState(1);
  const [lang, setLang]= useState(true);
  const { logged,user } = useAuth();
const [showHistory, setShowHistory] = useState(false)
const [tickets, setTickets] = useState([])
useEffect(() => {
  if (!user) return; // prevent errors if no one is logged in

  const userTickets = getTickets(user); 
  setTickets(userTickets);
}, [user, showHistory]);
const featuredShows = shows.filter(show => show.type === "featured");
const upcomingShows = shows.filter(show => show.type === "upcoming");

  return (
    <div className=" flex flex-col items-center justify-center bg-black font-sans  text-white">
      <Header lang={lang} setLang={setLang} logged={logged} setShowHistory={setShowHistory}/>
      <div id="header" className="scroll-mt-36 flex h-170 w-full items-center justify-center">


        {featuredShows.map((img, index) => {{
             const isCenter = index === active
          const isLeft =
            index === (active - 1 + featuredShows.length) % featuredShows.length
          const isRight =
            index === (active + 1) % featuredShows.length

          return (
            <motion.div
              key={img.id}
              onClick={() => setActive(index)}
              className="absolute cursor-pointer"
              animate={{
                x: isCenter ? 0 : isLeft ? -650 : 650,
                scale: isCenter ? 1.5 : 1,
                opacity: isCenter || isLeft || isRight ? 1 : 0,
                zIndex: isCenter ? 5 : 3,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 28,
              }}
            >
              {active == img.id ? (              <div onClick={()=> window.location.href = `/ticket/${img.id}`} className="h-100 w-84 overflow-hidden rounded-xl shadow-xl ">
                <img
                  src={img.src}
                  className="h-full w-full object-cover"
                />
              </div>) :(              <div  className="h-100 w-84 overflow-hidden rounded-xl shadow-xl ">
                <img
                  src={img.src}
                  className="h-full w-full object-cover"
                />
              </div>)}

            </motion.div>
          )
          }
          
        })}
      </div>
      <div id="past-shows" className="flex flex-col scroll-mt-32 items-center text-left justify-center text-4xl font-semibold w-2/3 space-y-15 mb-10">
        {(lang)?<p className="w-full">Upcoming Shows</p> : <p className="w-full">Дууссан Эвэнтүүд</p>}
        <div className="grid grid-cols-2 gap-30 w-full  ">
          {upcomingShows.map((im) => (
            <Link href={`/ticket/${im.id}`} key={im.id} className="h-80 w-170 overflow-hidden shadow-xl flex flex-col justify-center items-start space-y-5">
              <p>{im.name}</p>
              <div className="h-65 w-150 rounded-xl flex justify-end items-start p-3" style={{ backgroundImage: `url(${im.src})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="h-18 w-18 bg-white rounded-2xl text-xl text-black flex flex-col justify-center items-center">
                  <p className=" uppercase">{im.date}</p>
                  <p >{im.time}</p>
                </div>
              </div>
            </Link>
))}
        </div>

      </div>
              {/* Overlay */}
{showHistory && (
  <div
    className="fixed inset-0 bg-black/50 z-40"
    onClick={() => setShowHistory(false)}
  />
)}

{/* Slide Panel */}
<div
  className={`fixed top-0 right-0 h-full w-96 bg-gray-900 z-50 transform transition-transform duration-300 ${
    showHistory ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="p-6 flex flex-col h-full">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Purchase History</h2>
      <button onClick={() => setShowHistory(false)}>✕</button>
    </div>

    <div className="flex-1 overflow-y-auto space-y-4">
      {tickets.length === 0 ? (
        <p>No tickets purchased yet.</p>
      ) : (
        tickets.map((ticket, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-xl"
          >
            <p className="text-lg font-semibold">{ticket.name}</p>
            <p className="text-sm">{ticket.date} | {ticket.time}</p>
             <div className=" flex flex-row space-x-1 items-center" >
              <p className="text-green-400">Seats: </p>
                         {ticket.seats.map(  (seat, index) => (
             
                           <p className="text-sm" key={index }>{seat}</p>

            ))}
              </div>

                        <p className="text-sm">Total: {ticket.total}</p>
            <p className="text-xs text-gray-400">
              {new Date(ticket.purchasedAt).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  </div>
</div>
      <Footer lang={lang} />
    </div>
  )
}