"use client"

import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useState } from "react"


export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center  font-sans dark:bg-black">
      <Header />
      <div className="flex flex-col overflow-hidden h-300 w-full items-center -space-y-15 ">
        <img src="logo.png " className="w-40 z-10"/>
        <div className="h-200 bg-gray-700 w-2/5 flex flex-col items-center" >
             <p className="text-4xl text-white mt-15 font-semibold">Log in</p>
            <div className="w-full flex flex-col h-160 justify-evenly items-center ">
               <div className="flex flex-col items-start text-2xl w-2/3">
              <p>Email *</p>
              <input className="bg-white w-full h-14 rounded-xl"></input>
             </div>
             <div className="flex flex-col items-start text-2xl w-2/3">
              <p>Username *</p>
              <input className="bg-white w-full h-14 rounded-xl"></input>
             </div>
                          <div className="flex flex-col items-start text-2xl w-2/3">
              <p>Create Password *</p>
              <input className="bg-white w-full h-14 rounded-xl"></input>
             </div>
                          <div className="flex flex-col items-start text-2xl w-2/3">
              <p>Confirm Password *</p>
              <input className="bg-white w-full h-14 rounded-xl"></input>
             </div>
             <Link href="/" className="w-2/3 bg-gradient-to-b from-red-900 to-red-500 flex justify-center items-center h-16 rounded-xl text-2xl">
             <p>Sign Up</p>
             </Link>
            </div>
            <div className="flex flex-row space-x-2 text-lg"><p>Already have an account?</p><a className="underline text-red-500 hover:cursor-pointer" href="/Login">Log in</a></div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
