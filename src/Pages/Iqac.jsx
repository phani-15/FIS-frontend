import React, { useState } from "react";

export default function Iqac() {
  const [filters, setFilters] = useState({
    department: "All",
    role: "All",
    searchTerm: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // default 10 rows

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

  const roles = [
    "All",
    "Professor",
    "Associate Professor",
    "Assistant Professor",
    "Lecturer",
    "Researcher"
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

  // Filter faculty
  const filteredFaculty = facultyList.filter((f) => {
    const matchesDept = filters.department === "All" || f.department === filters.department;
    const matchesRole = filters.role === "All" || f.role === filters.role;
    const matchesSearch = f.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
    return matchesDept && matchesRole && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
  const paginatedFaculty = filteredFaculty.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Highlight search term
  const highlightMatch = (name) => {
    if (!filters.searchTerm) return name;
    const regex = new RegExp(`(${filters.searchTerm})`, "gi");
    return name.split(regex).map((part, idx) =>
      regex.test(part) ? <span key={idx} className="bg-yellow-200">{part}</span> : part
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">IQAC Dashboard</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Department:</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2"
            value={filters.department}
            onChange={(e) => { setFilters({ ...filters, department: e.target.value }); setCurrentPage(1); }}
          >
            {departments.map((dept, idx) => (
              <option key={idx} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Role:</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2"
            value={filters.role}
            onChange={(e) => { setFilters({ ...filters, role: e.target.value }); setCurrentPage(1); }}
          >
            {roles.map((role, idx) => (
              <option key={idx} value={role}>{role}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Search:</label>
          <input
            type="text"
            placeholder="Search by name"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={filters.searchTerm}
            onChange={(e) => { setFilters({ ...filters, searchTerm: e.target.value }); setCurrentPage(1); }}
          />
        </div>
      </div>

      {/* Rows per page selector */}
      <div className="flex justify-between items-center mb-2">
        <p className="font-medium">Total Faculty: {filteredFaculty.length}</p>
        <div>
          <label className="mr-2 font-medium">Rows per page:</label>
          <select
            className="border border-gray-300 rounded-lg p-1"
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
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-purple-100 text-gray-800">
            <tr>
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Department</th>
              <th className="border px-4 py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFaculty.length > 0 ? (
              paginatedFaculty.map((f, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                  <td className="border px-4 py-2">{highlightMatch(f.name)}</td>
                  <td className="border px-4 py-2">{f.department}</td>
                  <td className="border px-4 py-2">{f.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border px-4 py-2 text-center text-gray-500">
                  No faculty found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
