"use client"

import { useEffect, useState } from "react"
import showsData from "@/data/shows.json"

export default function Statistics() {
  const [showStats, setShowStats] = useState([])

  useEffect(() => {
    const adminShows = JSON.parse(localStorage.getItem("admin_shows")) || []
    const allShows = [...showsData, ...adminShows]

    const users = Object.keys(localStorage)
      .filter(key => key.startsWith("tickets_"))

    const statsMap = {}

    users.forEach(userKey => {
      const tickets = JSON.parse(localStorage.getItem(userKey)) || []

      tickets.forEach(ticket => {
        if (!statsMap[ticket.name]) {
          statsMap[ticket.name] = {
            count: 0,
            revenue: 0
          }
        }

        statsMap[ticket.name].count += 1
        statsMap[ticket.name].revenue += Number(ticket.total || 0)
      })
    })

    const formatted = Object.entries(statsMap).map(([name, data]) => ({
      name,
      ...data
    }))

    setShowStats(formatted)

  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Statistics</h1>

      {showStats.length === 0 ? (
        <p>No ticket data yet.</p>
      ) : (
        <div className="space-y-6">
          {showStats.map((show, index) => (
            <div
              key={index}
              className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800"
            >
              <h2 className="text-xl font-semibold mb-2">{show.name}</h2>
              <p>Tickets Sold: {show.count}</p>
              <p>Total Revenue: ₮{show.revenue}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
