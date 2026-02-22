import React from 'react'
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function Header({ lang, setLang, logged }) {
    const { user, email} = useAuth();
      const router = useRouter()

    return (


       <header className="w-full sticky top-0 z-50 bg-neutral-900">
  <div className="flex flex-col lg:flex-row lg:justify-evenly lg:items-center px-4 sm:px-8 py-4 gap-4">

    {/* LEFT SIDE */}
    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">

      <a href="/" className="flex justify-center lg:justify-start">
        <img src="/logo.png" className="w-16 sm:w-20" />
      </a>

      {(lang) ? (
        <ul className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 text-sm sm:text-base lg:text-lg">
          <li><Link href="#header" className="hover:text-gray-400 transition">Featured</Link></li>
          <li><Link href="#past-shows" scroll={true} className="hover:text-gray-400 transition">Upcoming Shows</Link></li>
          <li><Link href="/about-us" className="hover:text-gray-400 transition">About Us</Link></li>
        </ul>
      ) : (
        <ul className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 text-sm sm:text-base lg:text-lg">
          <li><Link href="#header" className="hover:text-gray-400 transition">Онцлох Эвэнтүүд</Link></li>
          <li><Link href="#past-shows" scroll={true} className="hover:text-gray-400 transition">Удахгүй</Link></li>
          <li><Link href="/about-us" className="hover:text-gray-400 transition">Бидний тухай</Link></li>
        </ul>
      )}

    </div>

    {/* RIGHT SIDE */}
    <div className="flex flex-wrap justify-center lg:justify-end items-center gap-4 sm:gap-6">

      {logged ? (
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">

          {email === "admin@gmail.com" && (
            <Link
              href="/admin"
              className="bg-red-600 px-3 py-2 text-sm sm:text-base rounded-xl"
            >
              Admin
            </Link>
          )}



      <div
        onClick={() => router.push("/profile")}
        className="flex items-center gap-2 px-4 py-2 bg-gray-600 rounded-full cursor-pointer hover:bg-gray-500 transition"
      >
        <img src="/user.png" className="w-6 sm:w-7" />
        <p className="text-sm sm:text-base">{user}</p>
      </div>
        </div>
      ) : (
        lang ? (
          <Link
            href="/Login"
            className="px-4 sm:px-6 py-2 text-sm sm:text-base rounded-full border border-white"
          >
            Login / Sign Up
          </Link>
        ) : (
          <Link
            href="/Login"
            className="px-4 sm:px-6 py-2 text-sm sm:text-base rounded-full border border-white"
          >
            Нэвтрэх / Бүртгүүлэх
          </Link>
        )
      )}

      {/* Language Toggle */}
      <div
        onClick={() => setLang(!lang)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-600 rounded-full cursor-pointer hover:bg-gray-500 transition"
      >
        <img src="/whiteg.png" className="w-5 sm:w-6" />
        <p className="text-sm sm:text-base">{lang ? "EN" : "MN"}</p>
      </div>

    </div>
  </div>
</header>

    )
}
