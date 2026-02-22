import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
  return (
<>
<div className="flex flex-row space-x-5 ">
   <Sidebar/>
        {children}
        </div>
</>
  )
}