"use client"

import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function Home() {
  const [lang, setLang] = useState(true)
  const router = useRouter()
    const { setLogged } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center font-sans bg-black text-white">
      <Header lang={lang} setLang={setLang} />

      <div className="flex flex-col overflow-hidden h-300 w-full items-center -space-y-15">
        <img src="logo.png" className="w-40 z-10" />

        <div className="h-150 bg-gray-700 w-2/5 flex flex-col items-center rounded-xl">
          <p className="text-4xl mt-15 font-semibold">
            {lang ? "Log in" : "Нэвтрэх"}
          </p>

          <form
            className="w-full flex flex-col h-100 justify-evenly items-center"
            onSubmit={(e) => {
              e.preventDefault()
                setLogged(true)
              router.push("/")
            }}
          >
            <div className="flex flex-col items-start text-xl w-2/3">
              <p className="text-2xl">{lang ? "Email *" : "Имэйл *"}</p>
              <input
                type="email"
                required
                className="bg-white w-full h-14 rounded-xl text-black"
              />
            </div>

            <div className="flex flex-col items-start text-xl w-2/3">
              <p className="text-2xl">{lang ? "Password *" : "Нууц үг *"}</p>
              <input
                type="password"
                required
                minLength={8}
                maxLength={8}
                className="bg-white w-full h-14 rounded-xl text-black"
              />
            </div>

            <button
              type="submit"
              className="w-2/3 bg-gradient-to-b from-red-900 to-red-500 flex justify-center items-center h-16 rounded-xl text-2xl"
            >
              {lang ? "Log in" : "Нэвтрэх"}
            </button>
          </form>

          <div className="flex flex-row space-x-2 text-lg mt-4">
            <p>{lang ? "Forgot Your Password?" : "Нууц үгээ мартсан уу?"}</p>
            <Link href="/" className="underline text-red-500">
              {lang ? "Reset Your Password" : "Нууц үгээ солих"}
            </Link>
          </div>

          <div className="flex flex-row space-x-2 text-lg">
            <p>{lang ? "Don't have an account?" : "Бүртгэлтэй юу?"}</p>
            <Link href="/Signup" className="underline text-red-500">
              {lang ? "Sign Up" : "Бүртгүүлэх"}
            </Link>
          </div>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  )
}

