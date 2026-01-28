"use client"

import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useState } from "react"


export default function Home() {
        const [lang, setLang]= useState(true);
  return (
    <div className="flex flex-col items-center justify-center  font-sans bg-black text-white">
      <Header lang={lang} setLang={setLang}/>
      <div className="flex flex-col overflow-hidden h-300 w-full items-center -space-y-15 ">
        <img src="logo.png " className="w-40 z-10"/>
        <div className="h-150 bg-gray-700 w-2/5 flex flex-col items-center rounded-xl" >
             <p className="text-4xl text-white mt-15 font-semibold">Log in</p>
            <div className="w-full flex flex-col h-100 justify-evenly items-center ">
               <div className="flex flex-col items-start text-2xl w-2/3">
              {(lang)? <p>Email *</p> : <p>Имэйл *</p>}
              <input className="bg-white w-full h-14 rounded-xl"></input>
             </div>
             <div className="flex flex-col items-start text-2xl w-2/3">
              {(lang)? <p>Password *</p> : <p>Нууц үг *</p>}
              <input className="bg-white w-full h-14 rounded-xl"></input>
             </div>
             <Link href="/" className="w-2/3 bg-gradient-to-b from-red-900 to-red-500 flex justify-center items-center h-16 rounded-xl text-2xl">
             {(lang)? <p>Log in</p> : <p>Нэвтрэх</p>}
             </Link>
            </div>
            <div className="flex flex-row space-x-2 text-lg">{(lang)? <p>Forgot Your Password?</p> : <p>Нууц үгээ мартсан уу?</p>}{(lang)? <a className="underline text-red-500 hover:cursor-pointer" href="/">Reset Your Password</a> : <a className="underline text-red-500 hover:cursor-pointer" href="/">Нууц үгээ солих</a>}</div>
            <div className="flex flex-row space-x-2 text-lg">{(lang)? <p>Don't have an account?</p> : <p>Бүртгэлтэй юу? </p>}{(lang)? <a className="underline text-red-500 hover:cursor-pointer" href="/Signup">Sign Up</a> : <a className="underline text-red-500 hover:cursor-pointer" href="/Signup">Бүртгүүлэх</a>}</div>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  )
}

