"use client"

import Link from "next/link"
import Header from "@/components/Header"
import { useParams } from "next/navigation";
import Footer from "@/components/Footer"
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext"
import shows from "@/data/shows.json"

const tickets = shows.filter(show => show.type === "featured");


export default function Home() {
    const [lang, setLang] = useState(true);
    const { id } = useParams();
    const { logged } = useAuth();
    const [ticket, setTicket] = useState(null);
    useEffect(() => {
        const selectedTicket = tickets.find(p => p.id === Number(id));
        setTicket(selectedTicket);
    }, [id]);


    return (
        <div className=" flex flex-col items-center justify-center bg-black font-sans  text-white">
            <Header lang={lang} setLang={setLang} logged={logged} />
            <div id="header" className="scroll-mt-36 flex h-170 w-full items-center justify-center">
                {ticket !== null ? (<div className="w-2/3 h-150 bg-gray-400 rounded-3xl flex flex-row">
                    <img src={ticket.src} className="rounded-l-2xl " />
                    <div className="w-2/3 h-full flex flex-col justify-around text-4xl text-center  items-center" >
                    <div className="w-full flex flex-row items-start ml-10 "><p>Name: {ticket.name}</p>
                    </div>
                    <p>Date & Time: {ticket.date + " " +ticket.time}</p>
                    <p>Price: {ticket.price}</p>
                    <p className=" text-wrap">Location: {ticket.location}</p>
                    
                    <button onClick={()=>{logged ? (window.location.href = "/seating") : (window.location.href = "/Login")} } className=" w-4/5 h-20 bg-linear-to-b from-red-900 to-red-500 rounded-xl">Choose Seat</button></div>
                </div>) : (<p>Couldnt find ticket</p>)}
            </div>
            <Footer lang={lang} />
        </div>
    )
}
