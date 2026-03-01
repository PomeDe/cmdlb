import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header({ lang, setLang, logged }) {
  const { user, email } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuLinks = lang
    ? [
        { href: "#header", label: "Featured" },
        { href: "#past-shows", label: "Upcoming Shows" },
        { href: "/about-us", label: "About Us" },
      ]
    : [
        { href: "#header", label: "Онцлох Эвэнтүүд" },
        { href: "#past-shows", label: "Удахгүй" },
        { href: "/about-us", label: "Бидний тухай" },
      ];

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/10">
      <div className="flex flex-row lg:flex-row justify-evenly lg:items-center px-4 sm:px-8 py-4 gap-4">

        {/* LEFT SIDE */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
          <a href="/" className="flex justify-center lg:justify-start">
            <img src="/logo.png" className="w-16 sm:w-20" />
          </a>

          {/* Desktop Links */}
          <ul className="hidden lg:flex flex-wrap justify-start gap-4 sm:gap-6 text-sm sm:text-base lg:text-lg">
            {menuLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-neutral-500 transition duration-200">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-4 sm:gap-6">
            {logged ? (
              <>
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
              </>
            ) : (
              lang ? (
                <Link
                  href="/Login"
                  className="px-6 py-2 rounded-full bg-gray-600 hover:bg-gray-500 transition font-semibold"
                >
                  Login / Sign in
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

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 bg-gray-600 rounded-full hover:bg-gray-500 transition gap-1"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-3 text-sm text-center">
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-neutral-500 transition duration-200"
            >
              {link.label}
            </Link>
          ))}

          {logged ? (
            <>
              {email === "admin@gmail.com" && (
                <Link
                  href="/admin"
                  className="bg-red-600 px-3 py-1.5 rounded-xl text-sm mx-auto"
                >
                  Admin
                </Link>
              )}
              <div
                onClick={() => router.push("/profile")}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-600 rounded-full cursor-pointer hover:bg-gray-500 transition mx-auto justify-center text-sm"
              >
                <img src="/user.png" className="w-5" />
                <p>{user}</p>
              </div>
            </>
          ) : (
            <Link
              href="/Login"
              className={`px-4 py-1.5 rounded-full text-sm mx-auto ${
                lang ? "bg-gray-600 hover:bg-gray-500" : "border border-white"
              }`}
            >
              {lang ? "Login / Sign in" : "Нэвтрэх / Бүртгүүлэх"}
            </Link>
          )}

          {/* Language Toggle */}
          <div
            onClick={() => setLang(!lang)}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-600 rounded-full cursor-pointer hover:bg-gray-500 transition text-sm mx-auto justify-center"
          >
            <img src="/whiteg.png" className="w-4" />
            <p>{lang ? "EN" : "MN"}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
