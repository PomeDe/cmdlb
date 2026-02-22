"use client"

import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"
import { useState,useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import showsData from "@/data/shows.json"


export default function Home() {

  const [active, setActive] = useState(1);
  const [lang, setLang]= useState(true);
  const { logged } = useAuth();
const [allShows, setAllShows] = useState([])


useEffect(() => {
  const adminShows = JSON.parse(localStorage.getItem("admin_shows")) || []
  setAllShows([...showsData, ...adminShows])
}, [])
const featuredShows = allShows.filter(show => show.type === "featured");
const upcomingShows = allShows.filter(show => show.type === "upcoming");

  return (
    <div className=" flex flex-col items-center justify-center bg-black font-sans  text-white">
      <Header lang={lang} setLang={setLang} logged={logged} />
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
                scale: isCenter ? 1.5 : 0.8,
                opacity: isCenter || isLeft || isRight ? 1 : 0,
                zIndex: isCenter ? 8: 5,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 28,
              }}
            >
              {active == img.id ? (              <div onClick={()=> window.location.href = `/ticket/${img.id}`} className="h-70 w-130 overflow-hidden rounded-xl shadow-xl ">
                <img
                  src={img.src}
                  className="h-full w-full object-cover"
                />
              </div>) :(              <div  className="h-80 w-130 overflow-hidden rounded-xl shadow-xl ">
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
                <div className="h-18 w-18 bg-white rounded-2xl text-lg text-black flex flex-col justify-center items-center">
                  <p className=" uppercase">{im.date}</p>
                  <p >{im.time}</p>
                </div>
              </div>
            </Link>
))}
        </div>

      </div>
  

      <Footer lang={lang} />
    </div>
  )
}