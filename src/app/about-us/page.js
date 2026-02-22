"use client"

import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { getTickets } from "@/components/ticketStorage";
import PurchaseHistory from "@/components/Purcha"

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const SEATS_PER_ROW = 12;

export default function Home() {
  const [lang, setLang]= useState(true);
  const { logged, setShowHistory, showHistory, email } = useAuth();
      const [tickets, setTickets] = useState([])
      useEffect(() => {
        if (!email) return; // prevent errors if no one is logged in
      
        const userTickets = getTickets(email); 
        setTickets(userTickets);
      }, [email, showHistory]);
  return (
    <div className=" flex flex-col items-center justify-center bg-black font-sans  text-white">
      <Header lang={lang} setLang={setLang} logged={logged}  setShowHistory={setShowHistory}/>
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <img src="logo.png" alt="Comedy Lab" className="h-32 w-32 rounded-full object-cover mx-auto mb-6" />
        <h1 className="text-5xl mb-4">About Comedy Lab</h1>
        <p className="text-2xl text-gray-300 mb-2">Бид инээдийг найруулна.</p>
        <p className="text-xl text-gray-400">est.2019</p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="bg-[#ebebeb] rounded-xl p-8">
          <h2 className="text-black text-3xl mb-6">Our Story</h2>
          <p className="text-lg text-gray-800 mb-4">
            Comedy Lab was founded in 2019 with a simple mission: to bring laughter and joy to Ulaanbaatar. 
            We've grown from a small comedy night into Mongolia's premier stand-up comedy venue, hosting both 
            local and international comedians.
          </p>
          <p className="text-lg text-gray-800">
            Located in the heart of the city at Liberty Pub, we provide an intimate setting where audiences 
            can experience the best in comedy entertainment. Our shows feature a mix of established comedians 
            and rising stars, ensuring every night is filled with fresh humor and unforgettable moments.
          </p>
        </div>

        <div className="bg-[#ebebeb] rounded-xl p-8">
          <h2 className="text-black text-3xl mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <img src="locb.png" className="h-6 w-6 flex-0 mt-1" />
              <div>
                <p className="text-black font-medium mb-1">Address</p>
                <p className="text-gray-800">
                  LIBERTY PUB, Чингисийн өргөн чөлөө, Тэмээтэй хөшөөний хойно, 
                  Их хуралдай төвийн 1 давхарт<br />
                  Ulaanbaatar, Mongolia
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
                            <img src="https://www.iconpacks.net/icons/1/free-phone-icon-1-thumb.png" className="h-6 w-6 flex-0 mt-1" />
              <div>
                <p className="font-medium mb-1 text-black">Phone</p>
                <p className="text-gray-800">+976 69963388</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
               
              <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/330px-Gmail_icon_%282020%29.svg.png' className="h-6 w-7 text-red-600 mt-1" />
              <div>
                <p className="font-medium mb-1 text-black">Email</p>
                <p className="text-gray-800">comedylabmn@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seating Plan Section */}
      <div className="bg-[#ebebeb] rounded-xl p-8 mb-16">
        <h2 className="text-black text-4xl mb-4 text-center">Seating Plan</h2>
        <p className="text-center text-lg text-gray-700 mb-8">
          Our venue features comfortable seating with excellent views from every angle
        </p>

        {/* Stage */}
        <div className="bg-gray-800 text-white text-center py-6 rounded-lg mb-12">
          <p className="text-2xl">STAGE</p>
        </div>

        {/* Seating Chart - Interactive Visualization */}
        <div className="mb-8">
          {ROWS.map((row) => (
            <div key={row} className="flex items-center justify-center gap-2 mb-3">
              <div className="w-12 text-center font-bold text-xl text-gray-700">{row}</div>
              
              {/* Left Section */}
              <div className="flex gap-2">
                {Array.from({ length: SEATS_PER_ROW / 2 }, (_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-lg bg-blue-100 border-2 border-blue-300 flex items-center justify-center"
                  >
                    <span className="text-xs text-blue-600">{i + 1}</span>
                  </div>
                ))}
              </div>

              {/* Aisle */}
              <div className="w-12 flex items-center justify-center">
                <div className="h-px w-8 bg-gray-300"></div>
              </div>

              {/* Right Section */}
              <div className="flex gap-2">
                {Array.from({ length: SEATS_PER_ROW / 2 }, (_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-lg bg-blue-100 border-2 border-blue-300 flex items-center justify-center"
                  >
                    <span className="text-xs text-blue-600">{i + 7}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Seating Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-black">
          <div className="bg-white rounded-lg p-4">
            <p className="text-3xl mb-2">96</p>
            <p className="text-gray-600">Total Seats</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-3xl mb-2">8</p>
            <p className="text-gray-600">Rows</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-3xl mb-2">100%</p>
            <p className="text-gray-600">Great Views</p>
          </div>
        </div>
      </div>
    </div>
            <PurchaseHistory
            open={showHistory}
            onClose={() => setShowHistory(false)}
            tickets={tickets}
          />
      <Footer lang={lang} />
    </div>
  )
}