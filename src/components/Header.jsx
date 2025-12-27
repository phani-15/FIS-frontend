import React from 'react'

export default function Header() {
  return (
    <div className="relative flex flex-col items-center justify-center md:flex-row md:h-36 p-4 md:p-0">
      {/* Logo pinned left */}
      <div className="w-24 shrink-0 mb-4 md:mb-0 md:absolute md:left-6">

        <img
          src="/images/jntugv.png"
          alt="JNTUGV Logo"
          draggable = {false}
          className="w-full h-auto"
        />
      </div>

      {/* Centered Text */}
      <div className="text-center space-y-1 md:space-y-2 px-4">
        <h1 className="text-base  lg:text-2xl font-bold">
          JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM
        </h1>
        <h2 className="text-xs lg:text-lg">
          VIZIANAGARAM-535 003, A.P
        </h2>
        <h2 className="text-xs lg:text-lg">
          (Established by Andhra Pradesh Act No.22 of 2021)
        </h2>
      </div>
    </div>
  )
}
