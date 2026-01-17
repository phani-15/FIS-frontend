import React, { useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import { ChevronsRight, Linkedin, Instagram, Chromium ,Github } from 'lucide-react';
import GetStartedModal from "../components/GetStartedModal";

export default function Home() {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false);
  const devs = [
    {
      avatar : "/images/phani.jpeg",
      name: "Phani Polavarapu",
      github : "https://github.com/phani-15",
      insta : "https://www.instagram.com/iam_srinivas_19",
      linkedin:"https://www.linkedin.com/in/phani-polavarapu-1957722a2/"
    },
    {
      avatar : "/images/vinay.jpeg",
      name: "Siringi Vinay",
      github : "https://github.com/VINAY-67",
      insta:"https://www.instagram.com/vinay_s__67/",
      linkedin :"https://www.linkedin.com/in/vinay-siringi-130633307/"
    },
    {
      avatar : "/images/narendra.jpeg",
      name: "Kura Narendra",
      github : "https://github.com/Narendra-619",
      insta : "https://www.instagram.com/_myself_nani_/",
      linkedin :"https://www.linkedin.com/in/kura-narendrakumar-8589a0298/"
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Navigation Bar */}
      <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold">FIS - JNTUGV</div>
          <ul className="hidden md:flex space-x-8">
            <li><p onClick={() => navigate('/login')} className=" cursor-pointer hover:text-blue-300 transition duration-300 font-medium">Members</p></li>
            <li><p onClick={() => navigate('/hod')} className=" cursor-pointer hover:text-blue-300 transition duration-300 font-medium">HOD</p></li>
            <li><p onClick={() => navigate('/ofc')} className=" cursor-pointer hover:text-blue-300 transition duration-300 font-medium">Higher Officials</p></li>
            <li><p onClick={() => navigate('/admin')} className=" cursor-pointer hover:text-blue-300 transition duration-300 font-medium">Admin</p></li>
          </ul>
          <button className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>
      <Header />

      {/* Main Content */}
      <main className="grow flex items-center justify-center p-4">
        <section className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-blue-900">
            Faculty Information System
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 text-left">
            The Faculty Information System (FIS) is a comprehensive digital platform designed to streamline academic administration at JNTUGV.
            It provides centralized management of faculty profiles, academic schedules, performance metrics, and administrative workflows.
            This system enhances transparency, facilitates efficient communication between departments, and supports data-driven decision-making processes.
            FIS ensures seamless integration of academic operations while maintaining high standards of data security and user accessibility for all stakeholders.
          </p>
          {/* <button className="bg-linear-to-r flex items-center cursor-pointer from-blue-800 to-indigo-900 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
            Get Started <span className='text-slate-300'><ChevronsRight/></span>
          </button> */}
          <button
            onClick={() => setOpenModal(true)}
            className="bg-linear-to-r flex items-center cursor-pointer from-blue-800 to-indigo-900 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
          >
            Get Started
            <span className="text-slate-300 ml-2">
              <ChevronsRight />
            </span>
          </button>

        </section>
      </main>
      {/* Developers Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-4">
            Meet the Developers
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            This application is designed and developed by a dedicated team committed
            to delivering a secure and efficient Faculty Information System.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Developer Card */}
            {devs.map((dev, index) => (
              <div
                key={index}
                className="bg-blue-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition"
              >
                {/* Avatar */}
                <img className="w-20 mx-auto mb-4 rounded-full" src={dev.avatar} alt={dev.name} />

                <h3 className="text-xl font-semibold text-center text-blue-900">
                  {dev.name}
                </h3>
                <div className='flex justify-center gap-2 my-2'>
                  {dev.linkedin && 
                  <a href={dev.linkedin} className="w-8 h-8 flex items-center justify-center bg-blue-200 rounded-full text-gray-700 hover:text-white hover:bg-blue-800 transition duration-300 shadow-md">
                <Linkedin size={18} />
              </a>}
              {dev.github && 
              <a href={dev.github} className="w-8 h-8 flex items-center justify-center bg-blue-200 rounded-full text-gray-700 hover:text-white hover:bg-blue-800 transition duration-300 shadow-md">
                <Github size={18} />
              </a>}
              {dev.insta && 
              <a href={dev.insta} className="w-8 h-8 flex items-center justify-center bg-blue-200 rounded-full text-gray-700 hover:text-white hover:bg-blue-800 transition duration-300 shadow-md">
                <Instagram size={18} />
              </a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white pt-10 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-blue-300 mb-2">JNTUGV</h3>
              <p className="text-sm md:text-base">Jawaharlal Nehru Technological University</p>
              <p className="text-sm md:text-base">Gurajada Vizianagaram</p>
              <p className="text-sm md:text-base">ANDHRA PRADESH - 535 003,</p>
              <p className="text-sm md:text-base">Andhra Pradesh, INDIA.</p>
            </div>

            <div className="flex space-x-6">
              <a href="https://www.linkedin.com/school/jntugv/?originalSubdomain=in" className="w-12 h-12 flex items-center justify-center bg-blue-600 rounded-full text-white hover:bg-blue-800 transition duration-300 shadow-md">
                <Linkedin />
              </a>
              <a href="https://www.instagram.com/jntu_gurajada/" className="w-12 h-12 flex items-center justify-center bg-blue-600 rounded-full text-white hover:bg-blue-800 transition duration-300 shadow-md">
                <Instagram />
              </a>
              <a href="https://jntugv.edu.in/" className="w-12 h-12 flex items-center justify-center bg-blue-600 rounded-full text-white hover:bg-blue-800 transition duration-300 shadow-md">
                <Chromium />
              </a>
            </div>
          </div>

          <div className="border-t border-blue-700 mt-8 pt-6 text-center text-blue-300">
            <p>&copy; {new Date().getFullYear()} JNTUGV. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      <GetStartedModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />

    </div>
  );

}
