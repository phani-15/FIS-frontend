import React, { useState } from "react";
import { X, Search,User2 } from "lucide-react";

export default function Admin() {
  const [filters, setFilters] = useState({
    department: "All",
    searchTerm: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const departments = [
    "All",
    "Computer Science and Engineering",
    "Electronics and Communication Engineering",
    "Electrical and Electronics Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Metallurgical Engineering",
    "Information Technology Engineering",
    "M.Tech",
    "MBA",
  ];

  const facultyList = [
    { name: "Dr. John Doe", department: "Computer Science and Engineering", role: "Professor" },
    { name: "Dr. Jane Smith", department: "Electrical and Electronics Engineering", role: "Associate Professor" },
    { name: "Dr. Mike Johnson", department: "Mechanical Engineering", role: "Assistant Professor" },
    { name: "Dr. Emily Davis", department: "MBA", role: "Lecturer" },
    { name: "Dr. William Brown", department: "Computer Science and Engineering", role: "Professor" },
    { name: "Dr. Olivia Wilson", department: "Civil Engineering", role: "Assistant Professor" },
    { name: "Dr. Henry Taylor", department: "Electronics and Communication Engineering", role: "Lecturer" },
    { name: "Dr. Sophia Martinez", department: "Information Technology Engineering", role: "Researcher" },
    { name: "Dr. Daniel Anderson", department: "Metallurgical Engineering", role: "Professor" },
    { name: "Dr. Grace Lee", department: "M.Tech", role: "Assistant Professor" },
    { name: "Dr. Benjamin Harris", department: "MBA", role: "Lecturer" },
    { name: "Dr. Alice Walker", department: "Civil Engineering", role: "Professor" },
    // Additional faculty 13-30
    { name: "Dr. Christopher Young", department: "Computer Science and Engineering", role: "Assistant Professor" },
    { name: "Dr. Rachel Green", department: "Electrical and Electronics Engineering", role: "Professor" },
    { name: "Dr. Steven Hall", department: "Mechanical Engineering", role: "Associate Professor" },
    { name: "Dr. Monica Clark", department: "MBA", role: "Assistant Professor" },
    { name: "Dr. Kevin Lewis", department: "Information Technology Engineering", role: "Professor" },
    { name: "Dr. Laura Robinson", department: "Civil Engineering", role: "Lecturer" },
    { name: "Dr. Patrick Walker", department: "Metallurgical Engineering", role: "Assistant Professor" },
    { name: "Dr. Kimberly Scott", department: "M.Tech", role: "Researcher" },
    { name: "Dr. Anthony King", department: "Computer Science and Engineering", role: "Lecturer" },
    { name: "Dr. Stephanie Adams", department: "Electrical and Electronics Engineering", role: "Assistant Professor" },
    { name: "Dr. Brian Mitchell", department: "Mechanical Engineering", role: "Professor" },
    { name: "Dr. Jennifer Phillips", department: "MBA", role: "Professor" },
    { name: "Dr. Eric Campbell", department: "Information Technology Engineering", role: "Lecturer" },
    { name: "Dr. Melissa Parker", department: "Civil Engineering", role: "Associate Professor" },
    { name: "Dr. Joshua Rivera", department: "Computer Science and Engineering", role: "Researcher" },
    { name: "Dr. Angela Brooks", department: "Electrical and Electronics Engineering", role: "Lecturer" },
    { name: "Dr. Ryan Morris", department: "Mechanical Engineering", role: "Assistant Professor" },
    { name: "Dr. Samantha Price", department: "MBA", role: "Assistant Professor" },
    { name: "Dr. Nicholas Cox", department: "Information Technology Engineering", role: "Associate Professor" },
    { name: "Dr. Olivia Foster", department: "Civil Engineering", role: "Lecturer" },
  ];

  const filteredFaculty = facultyList.filter((f) => {
    const matchesDept = filters.department === "All" || f.department === filters.department;
    const matchesSearch = f.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
  const paginatedFaculty = filteredFaculty.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const highlightMatch = (name) => {
    if (!filters.searchTerm) return name;
    const regex = new RegExp(`(${filters.searchTerm})`, "gi");
    return name.split(regex).map((part, idx) =>
      regex.test(part) ? <span key={idx} className="bg-yellow-300 text-black rounded px-1">{part}</span> : part
    );
  };

  return (
    <div className="p-4 sm:p-8 mx-2 lg:mx-auto max-w-7xl bg-gray-50 rounded-3xl shadow-xl space-y-6 font-[Inter]">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center bg-purple-800 text-transparent bg-clip-text tracking-wide">
        IQAC DASHBOARD
      </h1>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 lg:gap-6 p-4 sm:p-6 rounded-2xl bg-gray-50">
        {/* Department Filter */}
        <div className="w-full max-w-full sm:w-96 relative">
          <label className="block mb-2 text-base sm:text-lg font-semibold text-gray-700">
            Department
          </label>
          <select
            className="w-full border border-gray-300 p-2 bg-white shadow-sm focus:outline-none transition-all duration-200 rounded-md pr-6"
            value={filters.department}
            onChange={(e) => {
              setFilters({ ...filters, department: e.target.value });
              setCurrentPage(1);
            }}
          >
            {departments.map((dept, idx) => (
              <option key={idx} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-full sm:w-80 mt-4 sm:mt-0">
          <label className="block mb-2 text-base sm:text-lg font-semibold text-gray-700 text-left">
            Search
          </label>
          
          <div className="relative">
            {/* Search Icon */}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 " size={20} />
            <input
              type="text"
              placeholder="Search by name"
              className="w-full border border-gray-300 rounded-full p-2 pl-10 pr-10 bg-white shadow-sm focus:outline-none transition-all duration-200 placeholder-gray-400"
              value={filters.searchTerm}
              onChange={(e) => {
                setFilters({ ...filters, searchTerm: e.target.value });
                setCurrentPage(1);
              }}
            />
            {/* X Button */}
            <button
              type="button"
              className={`absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center text-gray-500 hover:text-gray-700 transition-opacity duration-300 ${
                filters.searchTerm ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={() => setFilters({ ...filters, searchTerm: "" })}
              aria-label="Clear search"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Info + Rows Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-2">
        <p className="font-medium text-gray-700">Total Faculty: {filteredFaculty.length}</p>
        <div>
          <label className="mr-2 font-medium">Rows per page:</label>
          <select
            className="border border-gray-300 rounded-lg p-1 bg-gray-50 focus:ring-2 focus:ring-purple-400"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 25, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200">
        <table className="w-full min-w-[600px] table-auto border-collapse text-sm sm:text-base">
          <thead className="bg-purple-200 text-gray-900 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Department</th>
              <th className="px-4 py-3 text-left font-semibold">Role</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFaculty.length > 0 ? (
              paginatedFaculty.map((f, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-gray-50 hover:bg-purple-50 transition">
                  <td className="px-4 py-2">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                  <td className="px-4 py-2">{highlightMatch(f.name)}</td>
                  <td className="px-4 py-2">{f.department}</td>
                  <td className="px-4 py-2">{f.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                  ❌ No faculty found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
     {/* Pagination */}
{totalPages > 1 && (
  <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
    <button
      className="px-5 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition disabled:opacity-50 cursor-pointer"
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
    >
      ⬅️ Previous
    </button>
    <span className="font-medium">
      Page {currentPage} of {totalPages}
    </span>
    <button
      className="px-5 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition disabled:opacity-50 cursor-pointer"
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
    >
      Next ➡️
    </button>
  </div>
)}
    </div>
  );
}
