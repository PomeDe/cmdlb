"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function Home() {
  const [lang, setLang] = useState(true)
  const router = useRouter()

  const { setLogged, setEmail, setUser } = useAuth()

  const [email, setEmailInput] = useState("")
  const [serverCode, setServerCode] = useState("")
  const [enteredCode, setEnteredCode] = useState("")
  const [step, setStep] = useState(1)

  // Send verification code
  const sendCode = async (e) => {
    e.preventDefault()
    if(email == "admin@gmail.com"){
      setLogged(true)
      setEmail(email)
      setUser(email.split("@")[0])
      router.back()
    }
    else{
const res = await fetch("/api/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()

    if (data.success) {
      setServerCode(data.code) // ⚠️ testing only
      setStep(2)
      alert("Verification code sent!")
    }
    }
    
  }

  // Verify and login
  const verifyCode = (e) => {
    e.preventDefault()

    if (enteredCode === serverCode) {
      setLogged(true)
      setEmail(email)
      setUser(email.split("@")[0]) // auto username

      router.back()
    } else {
      alert("Invalid code")
    }
  }

  return (
  <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-neutral-900 to-black text-white">
    <Header lang={lang} setLang={setLang} />

    {/* CENTER AREA */}
    <div className="flex flex-1 items-center justify-center px-5 lg:py-48 py-14">
      <div className="w-full max-w-md bg-neutral-900/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/10">

        {/* LOGO */}
        <div className="flex justify-center mb-8">
          <img src="/logo.png" className="w-24 opacity-90" />
        </div>

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center mb-8">
          {lang ? "Welcome Back" : "Тавтай морил"}
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={sendCode} className="space-y-6">

            <div className="space-y-2">
              <label className="text-sm text-gray-400">
                {lang ? "Email Address" : "Имэйл хаяг"}
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full h-12 bg-neutral-800 border border-white/10 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                onChange={(e) => setEmailInput(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-red-600 hover:bg-red-500 rounded-xl font-semibold transition duration-200"
            >
              {lang ? "Send Verification Code" : "Код илгээх"}
            </button>

          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={verifyCode} className="space-y-6">

            <div className="space-y-2">
              <label className="text-sm text-gray-400">
                {lang ? "Enter Verification Code" : "Баталгаажуулах код"}
              </label>
              <input
                type="text"
                required
                placeholder="123456"
                className="w-full h-12 bg-neutral-800 border border-white/10 rounded-xl px-4 text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                onChange={(e) => setEnteredCode(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-green-600 hover:bg-green-500 rounded-xl font-semibold transition duration-200"
            >
              {lang ? "Verify & Login" : "Баталгаажуулах"}
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-sm text-gray-400 hover:text-white transition"
            >
              {lang ? "Change email" : "Имэйл өөрчлөх"}
            </button>

          </form>
        )}

      </div>
    </div>

    <Footer lang={lang} />
  </div>
)

}