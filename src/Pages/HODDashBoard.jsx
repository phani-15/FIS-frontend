import React, { useState } from "react";
import { Search,X } from "lucide-react";

export default function HODDashBoard() {
  const [filters, setFilters] = useState({ searchTerm: "" });

  const facultyList = [
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
  ];

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

  return (
    <div className="p-8 max-w-6xl mx-auto lg:text-sm bg-gray-50 rounded-3xl shadow-2xl space-y-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-purple-800 tracking-wide drop-shadow">
      HOD DashBoard
      </h1>

      {/* Search Filter */}
<div className="flex justify-end p-6">
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
  );
}
