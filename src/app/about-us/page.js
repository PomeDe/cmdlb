"use client"

import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const SEATS_PER_ROW = 12;

export default function Home() {
  const [lang, setLang]= useState(true);
  const { logged } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center bg-black font-sans text-white">
      <Header lang={lang} setLang={setLang} logged={logged} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <img
            src="logo.png"
            alt="Comedy Lab"
            className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full object-cover mx-auto mb-6"
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4">About Comedy Lab</h1>
          <p className="text-lg sm:text-2xl text-gray-300 mb-2">Бид инээдийг найруулна.</p>
          <p className="text-base sm:text-xl text-gray-400">est.2019</p>
        </div>

        {/* Story & Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Story */}
          <div className="bg-[#ebebeb] rounded-xl p-6 sm:p-8">
            <h2 className="text-black text-2xl sm:text-3xl mb-4 sm:mb-6">Our Story</h2>
            <p className="text-base sm:text-lg text-gray-800 mb-4">
              Comedy Lab was founded in 2019 with a simple mission: to bring laughter and joy to Ulaanbaatar. 
              We've grown from a small comedy night into Mongolia's premier stand-up comedy venue, hosting both 
              local and international comedians.
            </p>
            <p className="text-base sm:text-lg text-gray-800">
              Located in the heart of the city at Liberty Pub, we provide an intimate setting where audiences 
              can experience the best in comedy entertainment. Our shows feature a mix of established comedians 
              and rising stars, ensuring every night is filled with fresh humor and unforgettable moments.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-[#ebebeb] rounded-xl p-6 sm:p-8">
            <h2 className="text-black text-2xl sm:text-3xl mb-4 sm:mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <img src="locb.png" className="h-6 w-6 flex-none mt-1" />
                <div>
                  <p className="text-black font-medium mb-1">Address</p>
                  <p className="text-gray-800 text-sm sm:text-base">
                    LIBERTY PUB, Чингисийн өргөн чөлөө, Тэмээтэй хөшөөний хойно, 
                    Их хуралдай төвийн 1 давхарт<br />
                    Ulaanbaatar, Mongolia
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <img src="https://www.iconpacks.net/icons/1/free-phone-icon-1-thumb.png" className="h-6 w-6 flex-none mt-1" />
                <div>
                  <p className="font-medium mb-1 text-black">Phone</p>
                  <p className="text-gray-800 text-sm sm:text-base">+976 69963388</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/330px-Gmail_icon_%282020%29.svg.png' className="h-6 w-7 mt-1" />
                <div>
                  <p className="font-medium mb-1 text-black">Email</p>
                  <p className="text-gray-800 text-sm sm:text-base">comedylabmn@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seating Plan Section */}
        <div className="bg-[#ebebeb] rounded-xl p-6 sm:p-8 mb-16">
          <h2 className="text-black text-3xl sm:text-4xl mb-4 text-center">Seating Plan</h2>
          <p className="text-center text-base sm:text-lg text-gray-700 mb-6">
            Our venue features comfortable seating with excellent views from every angle
          </p>

          {/* Stage */}
          <div className="bg-gray-800 text-white text-center py-4 sm:py-6 rounded-lg mb-8">
            <p className="text-xl sm:text-2xl">STAGE</p>
          </div>

          {/* Seating Chart */}
          <div className="mb-8 space-y-2">
            {ROWS.map((row) => (
              <div key={row} className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <div className="w-8 sm:w-12 text-center font-bold text-sm sm:text-xl text-gray-700">{row}</div>

                {/* Left seats */}
                <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                  {Array.from({ length: SEATS_PER_ROW / 2 }, (_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-100 border-2 border-blue-300 flex items-center justify-center"
                    >
                      <span className="text-xs sm:text-sm text-blue-600">{i + 1}</span>
                    </div>
                  ))}
                </div>

                {/* Aisle */}
                <div className="w-6 sm:w-12 flex items-center justify-center">
                  <div className="h-px w-full bg-gray-300"></div>
                </div>

                {/* Right seats */}
                <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                  {Array.from({ length: SEATS_PER_ROW / 2 }, (_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-100 border-2 border-blue-300 flex items-center justify-center"
                    >
                      <span className="text-xs sm:text-sm text-blue-600">{i + 7}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Seating Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center text-black">
            <div className="bg-white rounded-lg p-4">
              <p className="text-2xl sm:text-3xl mb-1 sm:mb-2">96</p>
              <p className="text-gray-600 text-sm sm:text-base">Total Seats</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-2xl sm:text-3xl mb-1 sm:mb-2">8</p>
              <p className="text-gray-600 text-sm sm:text-base">Rows</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-2xl sm:text-3xl mb-1 sm:mb-2">100%</p>
              <p className="text-gray-600 text-sm sm:text-base">Great Views</p>
            </div>
          </div>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  )
}
