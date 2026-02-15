"use client"

import { useState } from "react"

export default function AdminPage() {
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [image, setImage] = useState("")
  const [type, setType] = useState("upcoming")
  const handleAddShow = () => {

    const existing = JSON.parse(localStorage.getItem("admin_shows")) || []
        const newShow = {
      id: Math.random(),
      name,
      date,
      time,
      src: image,
      type
    }
    const updated = [...existing, newShow]

    localStorage.setItem("admin_shows", JSON.stringify(updated))

    alert("Show Added!")

    setName("")
    setDate("")
    setTime("")
    setImage("")
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl mb-6">Admin Panel</h1>

      <div className="flex flex-col space-y-4 w-96">
        <input
          placeholder="Show Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 "
        />

        <input
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 "
        />

        <input
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2"
        />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="p-2"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 "
        >
          <option value="featured" className="text-black" color="blue">Featured</option>
          <option value="upcoming" className="text-black">Upcoming</option>
        </select>

        <button
          onClick={handleAddShow}
          className="bg-blue-600 p-2 rounded"
        >
          Add Show
        </button>
      </div>
    </div>
  )
}
