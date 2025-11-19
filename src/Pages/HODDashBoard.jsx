import React, { useState } from "react";
import { Search, X, User, ChevronDown, ShieldCheck, XCircle, ChevronUp } from "lucide-react";
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion";
import { td, tr } from "framer-motion/client";

export default function HODDashBoard() {
  const [filters, setFilters] = useState({ searchTerm: "" });

  const navigate = useNavigate()

  const [facultyList,setFacultyList] = useState([
    { name: "Dr. John Doe", role: "Professor" },
    { name: "Dr. Jane Smith", role: "Associate Professor" },
    { name: "Dr. Mike Johnson", role: "Assistant Professor" },
    { name: "Dr. Emily Davis", role: "Lecturer" },
    { name: "Dr. William Brown", role: "Professor" },
    { name: "Dr. Olivia Wilson", role: "Assistant Professor" },
    { name: "Dr. Henry Taylor", role: "Lecturer" },
    { name: "Dr. Sophia Martinez", role: "Researcher" },
    { name: "Dr. Daniel Anderson", role: "Professor" },
    { name: "Dr. Grace Lee", role: "Assistant Professor" },
    { name: "Dr. Benjamin Harris", role: "Lecturer" },
    { name: "Dr. Patrick Hall", role: "Researcher" },
    { name: "Dr. Brenda Allen", role: "Assistant Professor" },
    { name: "Dr. Steven Young", role: "Lecturer" },
    { name: "Dr. Kimberly Scott", role: "Professor" },
    { name: "Dr. Charles Adams", role: "Professor" },
    { name: "Dr. Victoria Perez", role: "Assistant Professor" },
    { name: "Dr. Jonathan Hall", role: "Researcher" },
    { name: "Dr. Samantha Allen", role: "Lecturer" },
    { name: "Dr. Brian Mitchell", role: "Associate Professor" },
  ]);

  const [registeredList, setRegisteredList] = useState([
    { name: "Dr. Henry Taylor", role: "Lecturer" },
    { name: "Dr. Sophia Martinez", role: "Researcher" },
    { name: "Dr. Daniel Anderson", role: "Professor" },
    { name: "Dr. Grace Lee", role: "Assistant Professor" },
    { name: "Dr. Benjamin Harris", role: "Lecturer" },
    { name: "Dr. Patrick Hall", role: "Researcher" },
    { name: "Dr. Brenda Allen", role: "Assistant Professor" },
  ])

  // ✅ Filter faculty list by search term
  const filteredFaculty = facultyList.filter((f) =>
    f.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
  );

  // ✅ Highlight search term in names
  const highlightMatch = (name) => {
    if (!filters.searchTerm) return name;
    const regex = new RegExp(`(${filters.searchTerm})`, "gi");
    return name.split(regex).map((part, idx) =>
      regex.test(part) ? (
        <span key={idx} className="bg-yellow-300 text-black rounded px-1">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const verifyFac = (idx)=>{
    // verify faculty
    const facultyToVerify = registeredList[idx]

    // remove from the registered faculty
    setRegisteredList(prevList => 
    prevList.filter((_, i) => i !== idx))
    alert(facultyToVerify.name + "is verified")
    
    //added to the facultyList
    setFacultyList(prevList => 
    [...prevList, facultyToVerify]
  );
  }

  const removeFac = (idx) => {
    // remove faculty from the list
    const fac = registeredList[idx].name
    setRegisteredList(prevList =>
      prevList.filter((_, i) => i !== idx))
    alert(fac.name + " is denied")
  }

  const [expand, setExpand] = useState(false)

  return (
    <div className="p-2 mx-auto max-w-6xl  lg:text-sm rounded-3xl space-y-6">
      <h1 className="text-2xl lg:text-4xl font-serif font-semibold mb-2 text-center text-indigo-800 tracking-wide drop-shadow">
        HOD DashBoard
      </h1>
      <div className="flex flex-col">
        <div className="mb-8 mt-10 border border-gray-200 rounded-2xl overflow-hidden shadow-md bg-linear-to-br from-slate-50 via-white to-slate-100">
          {/* Header */}
          <button
            onClick={() => setExpand(!expand)}
            className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-slate-700 bg-linear-to-r from-blue-50 via-indigo-50 to-blue-100 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 rounded bg-blue-500 shadow-sm" />
              <span className="text-base tracking-wide">Registered Faculty</span>
            </div>
            <motion.div
              animate={{ rotate: 180 }}
              transition={{ duration: 0.25 }}
            >
              {expand ? <ChevronDown className="text-blue-600" /> : <ChevronUp className="text-blue-600" />}
            </motion.div>
          </button>

          {/* Animated Expansion */}
          <AnimatePresence>
            {expand && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-white/80 backdrop-blur-sm"
              >
                <div className="px-6 py-4 overflow-x-auto">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200">
                        <th className="px-4 py-3 text-left text-slate-700 font-semibold">#</th>
                        <th className="px-4 py-3 text-left text-slate-700 font-semibold">Name</th>
                        <th className="px-4 py-3 text-left text-slate-700 font-semibold">Role</th>
                        <th className="px-4 py-3 text-center text-slate-700 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registeredList.map((faculty, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-200"
                        >
                          <td className="px-4 py-3 text-gray-500 font-medium">{idx + 1}</td>
                          <td className="px-4 py-3 text-gray-800 font-semibold">{faculty.name}</td>
                          <td className="px-4 py-3 text-gray-600">{faculty.role}</td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex justify-center gap-3">
                              <button
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-sm transition-all duration-200"
                                aria-label="Verify faculty"
                                onClick={()=>verifyFac(idx)}
                              >
                                <ShieldCheck className="w-3.5 h-3.5" /> Allow
                              </button>
                              <button
                                onClick={()=>removeFac(idx)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-sm transition-all duration-200"
                                aria-label="Decline faculty"
                              >
                                <XCircle className="w-3.5 h-3.5" /> Decline
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {registeredList.length === 0 && (
                    <div className="py-5 text-center text-slate-500 italic text-sm">
                      No registered faculty found.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Search Filter */}
        <div className="flex justify-end p-2">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full border border-gray-300 rounded-lg p-2 pl-10 pr-10 bg-gray-50 shadow-sm focus:ring-0 focus:ring-purple-400 focus:border-purple-400 focus:outline-none transition-all duration-200"
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters({ ...filters, searchTerm: e.target.value })
              }
              aria-label="Search by name"
            />
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-500 pointer-events-none">
              <Search size={18} aria-hidden="true" />
            </div>
            {filters.searchTerm && (
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setFilters({ ...filters, searchTerm: '' })}
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Total Count */}
        <div className="flex justify-between gap-2 items-center mb-2 px-2">
          <p className="font-medium">
            Total Faculty: <span className="font-normal">{filteredFaculty.length}</span>
          </p>
        </div>

        {/* Faculty Table */}
        <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-purple-200 text-gray-900 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">S.No</th>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Role</th>
                <th className="px-4 py-3 text-left font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculty.length > 0 ? (
                filteredFaculty.map((faculty, idx) => (
                  <tr
                    key={idx}
                    className="odd:bg-white even:bg-gray-50 hover:bg-purple-50 transition"
                  >
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{highlightMatch(faculty.name)}</td>
                    <td className="px-4 py-2">{faculty.role}</td>
                    <td>
                      <button
                        onClick={() => navigate('/profile')}
                        className="inline-flex items-center gap-1.5 px-2 py-1 text-md font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition shadow-sm"
                      >
                        <User size={14} />
                        view
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    ❌ No faculty found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
