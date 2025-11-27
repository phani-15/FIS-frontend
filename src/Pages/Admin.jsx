import React, { useState } from "react";
import {X,User,Edit2} from 'lucide-react'
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [filters, setFilters] = useState({
    department: "All",
    role: "All",
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
    "MBA"
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
    { name: "Dr. Mark Spencer", department: "Computer Science and Engineering", role: "Assistant Professor" },
    { name: "Dr. Laura King", department: "Electrical and Electronics Engineering", role: "Researcher" },
    { name: "Dr. Richard Clark", department: "Mechanical Engineering", role: "Professor" },
    { name: "Dr. Nancy Roberts", department: "Information Technology Engineering", role: "Associate Professor" },
    { name: "Dr. Kevin Lewis", department: "Metallurgical Engineering", role: "Assistant Professor" },
    { name: "Dr. Angela White", department: "Computer Science and Engineering", role: "Lecturer" },
    { name: "Dr. Patrick Hall", department: "MBA", role: "Researcher" },
    { name: "Dr. Brenda Allen", department: "Civil Engineering", role: "Assistant Professor" },
    { name: "Dr. Steven Young", department: "Mechanical Engineering", role: "Lecturer" },
    { name: "Dr. Kimberly Scott", department: "Electronics and Communication Engineering", role: "Professor" },
    { name: "Dr. Charles Adams", department: "Information Technology Engineering", role: "Professor" },
    { name: "Dr. Victoria Perez", department: "MBA", role: "Assistant Professor" },
    { name: "Dr. Jonathan Hall", department: "Computer Science and Engineering", role: "Researcher" },
    { name: "Dr. Samantha Allen", department: "Civil Engineering", role: "Lecturer" },
    { name: "Dr. Brian Mitchell", department: "Mechanical Engineering", role: "Associate Professor" },
    { name: "Dr. Lauren Turner", department: "Electronics and Communication Engineering", role: "Researcher" },
    { name: "Dr. Timothy Carter", department: "Metallurgical Engineering", role: "Lecturer" },
    { name: "Dr. Rachel Evans", department: "M.Tech", role: "Professor" }
  ];

  const filteredFaculty = facultyList.filter((f) => {
    const matchesDept = filters.department === "All" || f.department === filters.department;
    const matchesRole = filters.role === "All" || f.role === filters.role;
    const matchesSearch = f.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
    return matchesDept && matchesRole && matchesSearch;
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
      regex.test(part) ? <span key={idx} className="bg-yellow-200 font-semibold">{part}</span> : part
    );
  };

  const navigate = useNavigate()
  const handleViewClick = () => {
    navigate('/profile')
  };

  const handleEditClick = () => {
    navigate('/ea')
  };

  return (
    <div className="p-1 lg:p-8">
      <div className="max-w-7xl mx-2 lg:mx-auto"><h1 className="lg:text-4xl text-2xl font-semibold font-serif mb-6 text-center text-purple-800 tracking-wide drop-shadow">
      ADMIN PANEL
      </h1>

        {/* Filters */}
        <div className=" rounded-xl shadow-md p-6 mb-2">
          <div className="flex justify-between lg:flex-row flex-col gap-5">
            <div className="max-w-[350px]">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 shadow-sm focus:ring-0 focus:border-gray-400  outline-none transition"
                value={filters.department}
                onChange={(e) => { setFilters({ ...filters, department: e.target.value }); setCurrentPage(1); }}
              >
                {departments.map((dept, idx) => (
                  <option key={idx} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="max-w-[350px] lg:min-w-[350px]">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 bg-gray-50 shadow-sm focus:ring-0 focus:border-gray-400 outline-none transition"
                  value={filters.searchTerm}
                  onChange={(e) => { setFilters({ ...filters, searchTerm: e.target.value }); setCurrentPage(1); }}
                />
                {filters.searchTerm && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    onClick={() => setFilters({ ...filters, searchTerm: '' })}
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Rows per page */}
        <div className=" p-4 flex flex-wrap justify-between items-center gap-4">
          <p className="text-sm font-medium text-gray-700">
            Total Faculty: <span className="text-purple-600 font-bold">{filteredFaculty.length}</span>
          </p>
          <div className="flex items-center  gap-2">
            <label className="text-sm font-medium text-gray-700">Rows per page:</label>
            <select
              className="border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm outline-none transition text-sm"
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            >
              {[10, 25, 50, 100].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Faculty Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-purple-400 to-purple-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">S.No</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedFaculty.length > 0 ? (
                  paginatedFaculty.map((f, idx) => (
                    <tr key={idx} className="hover:bg-purple-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                        {(currentPage - 1) * itemsPerPage + idx + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                        {highlightMatch(f.name)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {f.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                          {f.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={handleViewClick}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gray-500 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition shadow-sm"
                          >
                            <User size={14} />
                            View
                          </button>
                          <button
                            onClick={handleEditClick}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 transition"
                          >
                            <Edit2 size={14} />
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-lg font-semibold text-gray-500">No faculty found</p>
                        <p className="text-sm text-gray-400">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="bg-white rounded-xl shadow-md p-5 mt-6 border border-purple-100">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600 font-medium">
                Showing <span className="text-purple-600 font-bold">{(currentPage - 1) * itemsPerPage + 1}</span>–
                <span className="text-purple-600 font-bold">{Math.min(currentPage * itemsPerPage, filteredFaculty.length)}</span> of{' '}
                <span className="text-purple-600 font-bold">{filteredFaculty.length}</span> results
              </p>
              <div className="flex items-center gap-3">
                <button
                  className="px-5 py-2 text-sm font-semibold text-purple-700 bg-white border-2 border-purple-300 rounded-lg hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none transition"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="px-5 py-2 text-sm font-bold text-white bg-linear-to-r from-purple-600 to-indigo-600 rounded-lg shadow-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-5 py-2 text-sm font-semibold text-purple-700 bg-white border-2 border-purple-300 rounded-lg hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none transition"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}