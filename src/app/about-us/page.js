"use client"

import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"


export default function Home() {
  const [lang, setLang]= useState(true);
  const { logged } = useAuth();
  return (
    <div className=" flex flex-col items-center justify-center bg-black font-sans  text-white">
      <Header lang={lang} setLang={setLang} logged={logged}/>
      
      <Footer lang={lang} />
    </div>
  )
}