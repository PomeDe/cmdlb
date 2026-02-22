"use client"

import { useState, useRef } from "react"

export default function AdminPage() {
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [image, setImage] = useState("") // base64 string
  const [preview, setPreview] = useState(null)
  const [fileName, setFileName] = useState("No image selected")
  const [type, setType] = useState("upcoming")
  const fileInputRef = useRef(null)

  const handleFileClick = () => {
    fileInputRef.current.click()
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setFileName(file.name)

    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result)   // base64 string
      setPreview(reader.result) // preview image
    }
    reader.readAsDataURL(file)
  }

  const handleAddShow = () => {
    if (!name || !date || !time || !image) {
      alert("Please fill all fields and select an image")
      return
    }

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

    // Reset form
    setName("")
    setDate("")
    setTime("")
    setImage("")
    setPreview(null)
    setFileName("No image selected")
  }

  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">
      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-xl bg-neutral-900 rounded-2xl shadow-2xl p-8 space-y-6 border border-neutral-800">
          <h1 className="text-3xl font-bold text-center mb-4">
            Add New Show
          </h1>

          <input
            placeholder="Show Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <div className="flex gap-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-1/2 p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-1/2 p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Custom File Upload Button */}
          <button
            type="button"
            onClick={handleFileClick}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold text-lg"
          >
            Select Show Image
          </button>

          {/* Display Selected File Name */}
          <span className="block text-sm text-gray-300 text-center">{fileName}</span>

          {/* Image Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg mt-2"
            />
          )}

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="featured">Featured</option>
            <option value="upcoming">Upcoming</option>
          </select>

          <button
            onClick={handleAddShow}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition font-semibold text-lg shadow-lg"
          >
            Add Show
          </button>

        </div>
      </div>
    </div>
  )
}
