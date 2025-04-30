// import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-violet-700 flex justify-between md:justify-around p-3">
        <div className="text-white text-2xl font-bold">
            iTask
        </div>
        <div className="buttons flex justify-around gap-3 text-white text-lg">
            <a href="#">Home</a>
            <a href="#">Your Tasks</a>
        </div>
    </nav>
  )
}

export default Navbar
