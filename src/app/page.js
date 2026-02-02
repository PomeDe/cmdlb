"use client"

import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"

const images = [
  {
    id: 0,
    src: "0.jpg",
  },
  {
    id: 1,
    src: "1.jpg",
  },
  {
    id: 2,
    src: "2.jpg",
  },
]
const past= [
  {
    id: 0,
    src: "0.jpg",
  },
  {
    id: 1,
    src: "1.jpg",
  },
  {
    id: 2,
    src: "2.jpg",
  },
    {
    id: 3,
    src: "0.jpg",
  },
]


export default function Home() {
  const [active, setActive] = useState(1);
  const [lang, setLang]= useState(true);
  const { logged } = useAuth()

  return (
    <div className=" flex flex-col items-center justify-center bg-black font-sans  text-white">
      <Header lang={lang} setLang={setLang} logged={logged}/>
      <div id="header" className="scroll-mt-36 flex h-170 w-full items-center justify-center">
        {images.map((img, index) => {
          const isCenter = index === active
          const isLeft =
            index === (active - 1 + images.length) % images.length
          const isRight =
            index === (active + 1) % images.length

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
              <div  className="h-100 w-84 overflow-hidden rounded-xl shadow-xl ">
                <img
                  src={img.src}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          )
        })}
      </div>
      <div id="past-shows" className="flex flex-col scroll-mt-32 items-center text-left justify-center text-4xl font-semibold w-2/3 space-y-15 mb-10">
        {(lang)?<p className="w-full">Upcoming Shows</p> : <p className="w-full">Дууссан Эвэнтүүд</p>}
        <div className="grid grid-cols-2 gap-20 w-full  ">
          {past.map((im) => (
            <Link href="/" key={im.id} className="h-80 w-170 overflow-hidden shadow-xl flex flex-col justify-center items-start space-y-5">
              <p>{im.id}</p>
              <div className="h-65 w-150 rounded-xl flex justify-end items-start p-3" style={{ backgroundImage: `url(${im.src})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="h-18 w-18 bg-white rounded-2xl text-xl text-black flex flex-col justify-center items-center">
                  <p>FEB 3</p>
                  <p>18:00</p>
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