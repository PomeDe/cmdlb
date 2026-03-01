"use client"

import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import showsData from "@/data/shows.json"


export default function Home() {

  const [active, setActive] = useState(1);
  const [lang, setLang] = useState(true);
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
      <div id="header" className="scroll-mt-36 flex h-[85vh] w-full  justify-center">
        <div className="relative w-full h-[80%] overflow-hidden">

          {featuredShows.map((img, index) => {
            const isCenter = index === active;

            return (
              <motion.div
                key={img.id}
                className="absolute w-full h-full flex justify-center items-center cursor-pointer"
                animate={{
                  x: `${(index - active) * 100}%`,
                  scale: isCenter ? 1 : 0.85,
                  opacity: Math.abs(index - active) <= 1 ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 30,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset, velocity }) => {
                  if (offset.x < -100) {
                    setActive((prev) => (prev + 1) % featuredShows.length);
                  } else if (offset.x > 100) {
                    setActive(
                      (prev) =>
                        (prev - 1 + featuredShows.length) %
                        featuredShows.length
                    );
                  }
                }}
              >
                <div
                  onClick={() =>
                    isCenter &&
                    (window.location.href = `/ticket/${img.id}`)
                  }
                  className=" w-full h-full  overflow-hidden rounded-2xl shadow-xl"
                >
                  <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src={img.src}
                      className="w-full h-full object-cover"
                      alt="show banner"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Text Content */}
                    <div className="absolute bottom-10 left-10 text-white">
                      <h2 className="text-5xl font-bold mb-3">{img.name}</h2>
                      <p className="text-lg opacity-80">{img.date} • {img.time}</p>

                      <button className="mt-5 bg-red-600 hover:bg-red-500 transition px-6 py-3 rounded-xl text-lg font-semibold">
                        Buy Tickets
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}

          {/* SLIDE INDICATORS */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            {featuredShows.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`w-3 h-3 rounded-full transition ${active === index
                    ? "bg-red-600 scale-125"
                    : "bg-gray-500"
                  }`}
              />
            ))}
          </div>

        </div>
      </div>
      <div id="past-shows" className="w-full max-w-6xl px-6 py-24">
        <h2 className="text-4xl font-bold mb-12">
  {lang ? "Upcoming Shows" : "Удахгүй"}
</h2>
<div className="grid md:grid-cols-2 gap-25 w-full">
          {upcomingShows.map((im) => (
           <Link
  href={`/ticket/${im.id}`}
  key={im.id}
  className="group bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 "
>
  <div
    className="h-72 relative"
    style={{
      backgroundImage: `url(${im.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />

    <div className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold">
      {im.date} • {im.time}
    </div>
  </div>

  <div className="p-6">
    <h3 className="text-2xl font-semibold group-hover:text-red-500 transition">
      {im.name}
    </h3>
  </div>
</Link>
          ))}
        </div>

      </div>


      <Footer lang={lang} />
    </div>
  )
}