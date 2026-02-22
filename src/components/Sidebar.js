import Link from "next/link"

export default function Sidebar() {
  return (
    <div className="min-h-screen w-64 bg-neutral-900 text-white p-6 flex flex-col justify-between shadow-xl">

      <div className="space-y-10">
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="w-10 h-10" />
          <h1 className="text-2xl font-bold">Admin</h1>
        </div>

        <nav className="flex flex-col gap-4 text-xl">

          <Link href="/admin" className="p-3 space-x-3 rounded-lg hover:bg-neutral-800 transition flex flex-row items-center ">
          <img src="dashboards.png" className="w-8 h-8"/>
             <p>Dashboard</p>
          </Link>

            <Link href="/admin/edit" className="p-3 space-x-3 rounded-lg hover:bg-neutral-800 transition flex flex-row items-center ">
          <img src="pencil.png" className="w-8 h-8"/>
             <p>Edit Shows</p>
          </Link>

          <Link href="/admin/statistics" className="p-3 space-x-3 rounded-lg hover:bg-neutral-800 transition flex flex-row items-center ">
          <img src="trend.png" className="w-8 h-8"/>
             <p>Statistics</p>
          </Link>

        </nav>
      </div>

      <div className="text-sm text-gray-400">
        © 2025 Event Admin
      </div>
    </div>
  )
}
