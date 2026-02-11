import React from 'react'
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

export default function Header({ lang, setLang, logged, setShowHistory }) {
    const { setLogged, user } = useAuth();
    return (

        <header className="flex flex-row justify-evenly items-center p-6 sticky space-x-50 bg-black  w-full top-0 z-15 h-30">
            <div className="flex flex-row items-center space-x-5">
                <a href="/">
                    <img src="/logo.png" className="w-20" />
                </a>
                {(lang) ? <ul className="flex space-x-6 text-xl">
                    <li><Link href="#header" className="hover:text-gray-800 transition duration-300 ease-in-out">Featured</Link></li>
                    <li><Link href="#past-shows" scroll={true} className="hover:text-gray-800 transition duration-300 ease-in-out">Past Shows</Link></li>
                    <li><Link href="/about-us" className="hover:text-gray-800 transition duration-300 ease-in-out">About Us</Link></li>
                </ul> : <ul className="flex space-x-6 text-xl">
                    <li><Link href="#header" className="hover:text-gray-800 transition duration-300 ease-in-out">Онцлох Эвэнтүүд</Link></li>
                    <li><Link href="#past-shows" scroll={true} className="hover:text-gray-800 transition duration-300 ease-in-out">Дууссан Эвэнтүүд</Link></li>
                    <li><Link href="/about-us" className="hover:text-gray-800 transition duration-300 ease-in-out">Бидний тухай</Link></li>
                </ul>}
            </div>
            <div className='flex flex-row items-center space-x-12 '>
                {logged ?
                    (
                        <div className='flex flex-row space-x-10'>
                            <p>Hello, {user}!</p>
                            <button   onClick={() => setShowHistory(true)} className='hover:text-gray-800 hover:cursor-pointer transition duration-300 ease-in-out  outline-2 rounded-4xl w-50 h-12 text-xl text-white items-center  group relative justify-center flex flex-row space-x-2 bg-linear-30 from-gray-500 to-blue-800 '>
                                <div className='group relative '>
                                    <img src="/hstr.png" className="w-9" />
                                    <img src="/hstrr.png" className="absolute inset-0 w-40 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out" />
                                </div>
                                {(lang ? (<p>History</p>) : (<p>Хуулга</p>))}
                            </button>
                            <button
                                onClick={() => {
                                    setLogged(false);
                                    localStorage.removeItem("auth");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    ) :

                    (lang ?
                        <Link href="/Login" className='hover:text-black hover:cursor-pointer transition duration-300 ease-in-out  outline-2 rounded-4xl w-50 h-12 text-xl text-white items-center justify-center flex flex-row '>
                            <p>Login / Sign Up</p>
                        </Link> :
                        <Link href="/Login" className='hover:text-black hover:cursor-pointer transition duration-300 ease-in-out  outline-2 rounded-4xl w-58 h-12 text-xl text-white items-center justify-center flex flex-row '>
                            <p>Нэвтрэх / Бүртгүүлэх</p>
                        </Link>)}

                <div onClick={() => setLang(!lang)} className='hover:text-black hover:cursor-pointer transition duration-300 ease-in-out bg-gray-500 rounded-4xl w-25 h-12 text-xl text-white flex flex-row items-center justify-center group relative space-x-1.5'>
                    <div className='group relative '>
                        <img src="/whiteg.png" className="w-8" />
                        <img src="/blackg.png" className="absolute inset-0 w-30 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out" />
                    </div>
                    {(lang) ? <p>EN</p> : <p >MN</p>}
                </div>
            </div>

        </header>
    )
}
