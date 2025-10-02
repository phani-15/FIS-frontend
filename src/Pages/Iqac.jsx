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
    <div className="p-4 md:p-8">
      <div className="max-w-6xl rounded-3xl bg-gray-50 p-6  mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">IQAC Dashboard</h1>
          <p className="text-gray-600 mt-2">Internal Quality Assurance Cell - Faculty Directory</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Department Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                value={filters.department}
                onChange={(e) => { 
                  setFilters({ ...filters, department: e.target.value }); 
                  setCurrentPage(1); 
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {departments.map((dept, idx) => (
                  <option key={idx} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={filters.role}
                onChange={(e) => { 
                  setFilters({ ...filters, role: e.target.value }); 
                  setCurrentPage(1); 
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {roles.map((role, idx) => (
                  <option key={idx} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Faculty</label>
              <input
                type="text"
                placeholder="Search by name..."
                value={filters.searchTerm}
                onChange={(e) => { 
                  setFilters({ ...filters, searchTerm: e.target.value }); 
                  setCurrentPage(1); 
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <p className="text-gray-700 font-medium">
            Total Faculty: <span className="font-bold text-blue-600">{filteredFaculty.length}</span>
          </p>
          
          <div className="mt-2 md:mt-0">
            <label className="text-sm font-medium text-gray-700 mr-2">Rows per page:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => { 
                setItemsPerPage(Number(e.target.value)); 
                setCurrentPage(1); 
              }}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {[10, 25, 50, 100].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Faculty Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedFaculty.length > 0 ? (
                  paginatedFaculty.map((f, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(currentPage - 1) * itemsPerPage + idx + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {highlightMatch(f.name)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">
                        {f.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          bg-blue-100 text-blue-800">
                          {f.role}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-gray-400 mb-2">🔍</div>
                        <p className="text-gray-500 font-medium">No faculty members found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
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
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, filteredFaculty.length)}
              </span>{" "}
              of <span className="font-medium">{filteredFaculty.length}</span> results
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                Previous
              </button>
              
              <span className="px-4 py-2 text-gray-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
