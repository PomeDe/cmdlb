import React from 'react'

const Sidebar = () => {
  return (
    <div className='min-h-screen flex flex-col bg-neutral-400 text-black pr-6 pl-2 pt-6 items-start space-y-8'>
      <div className="flex flex-row space-x-3 justify-center items-center text-xl font-semibold">
        <img src='logo.png' className='w-18 h-18'/>
        <p>Dashboard</p>
      </div>
      <div className="flex flex-row space-x-3 justify-center items-center text-xl font-semibold">
        <img src='https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png' className='w-15 h-15 ml-1'/>
        <p>Edit Shows</p>
      </div>
      <div className="flex flex-row space-x-3 justify-center items-center text-xl font-semibold">
        <img src='logo.png' className='w-18 h-18'/>
        <p>Statistics</p>
      </div>
    </div>
  )
}

export default Sidebar