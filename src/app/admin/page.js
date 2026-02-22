"use client"

import { useEffect, useState } from "react"
import showsData from "@/data/shows.json"

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalShows: 0,
    featured: 0,
    upcoming: 0,
    totalTickets: 0
  })

  useEffect(() => {
    const adminShows = JSON.parse(localStorage.getItem("admin_shows")) || []
    const allShows = [...showsData, ...adminShows]

    let totalTickets = 0

    const users = Object.keys(localStorage)
      .filter(key => key.startsWith("tickets_"))

    users.forEach(userKey => {
      const tickets = JSON.parse(localStorage.getItem(userKey)) || []
      totalTickets += tickets.length
    })

    setStats({
      totalShows: allShows.length,
      featured: allShows.filter(s => s.type === "featured").length,
      upcoming: allShows.filter(s => s.type === "upcoming").length,
      totalTickets
    })

  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard title="Total Shows" value={stats.totalShows} />
        <StatCard title="Featured Shows" value={stats.featured} />
        <StatCard title="Upcoming Shows" value={stats.upcoming} />
        <StatCard title="Tickets Sold" value={stats.totalTickets} />

      </div>
    </div>
  )
}

function StatCard({ title, value }) {
  return (
    <div className="bg-neutral-900 p-6 rounded-2xl shadow-lg border border-neutral-800">
      <h2 className="text-gray-400 text-sm mb-2">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}
