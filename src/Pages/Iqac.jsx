import React, { useState } from "react";

export default function Iqac() {
  const [filters, setFilters] = useState({
    department: "All",
    role: "All",
    searchTerm: "",
  });

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
     { name: "Dr. Alice Parker", department: "Computer Science and Engineering", role: "Assistant Professor" },
  { name: "Dr. Robert King", department: "Mechanical Engineering", role: "Professor" },
  { name: "Dr. Laura Scott", department: "Civil Engineering", role: "Lecturer" },
  { name: "Dr. Kevin White", department: "Electrical and Electronics Engineering", role: "Researcher" },
  { name: "Dr. Megan Lewis", department: "Electronics and Communication Engineering", role: "Assistant Professor" },
  { name: "Dr. Brian Hall", department: "Information Technology Engineering", role: "Professor" },
  { name: "Dr. Rachel Allen", department: "M.Tech", role: "Lecturer" },
  { name: "Dr. Steven Young", department: "MBA", role: "Assistant Professor" },
  { name: "Dr. Laura Adams", department: "Metallurgical Engineering", role: "Researcher" },
  { name: "Dr. Daniel Carter", department: "Computer Science and Engineering", role: "Lecturer" },
  { name: "Dr. Nancy Mitchell", department: "Civil Engineering", role: "Associate Professor" },
  { name: "Dr. Thomas Walker", department: "Electrical and Electronics Engineering", role: "Professor" },
  { name: "Dr. Karen Harris", department: "Mechanical Engineering", role: "Researcher" },
  { name: "Dr. Joshua Lewis", department: "Information Technology Engineering", role: "Assistant Professor" },
  { name: "Dr. Patricia Clark", department: "MBA", role: "Professor" },
  ];

  // Filter faculty
  const filteredFaculty = facultyList.filter((f) => {
    const matchesDept = filters.department === "All" || f.department === filters.department;
    const matchesRole = filters.role === "All" || f.role === filters.role;
    const matchesSearch = f.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
    return matchesDept && matchesRole && matchesSearch;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">IQAC Dashboard</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Department:</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2"
            value={filters.department}
            onChange={(e) => setFilters({ ...filters, department: e.target.value })}
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
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
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
            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
          />
        </div>
      </div>

      {/* Total members count */}
      <div className="mb-4 font-medium text-gray-700">
        Total Members: {filteredFaculty.length}
      </div>

      {/* Faculty Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-purple-100 text-gray-800">
            <tr>
              <th className="border px-4 py-2 text-left">S.No</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Department</th>
              <th className="border px-4 py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaculty.length > 0 ? (
              filteredFaculty.map((f, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{idx + 1}</td>
                  <td className="border px-4 py-2">{f.name}</td>
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
    </div>
  );
}
