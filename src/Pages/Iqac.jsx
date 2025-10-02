// import React, { useState } from "react";

// export default function Iqac() {
//   const [filters, setFilters] = useState({
//     department: "All",
//     role: "All",
//     searchTerm: "",
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10); // default 10 rows

//   const departments = [
//     "All",
//     "Computer Science and Engineering",
//     "Electronics and Communication Engineering",
//     "Electrical and Electronics Engineering",
//     "Mechanical Engineering",
//     "Civil Engineering",
//     "Metallurgical Engineering",
//     "Information Technology Engineering",
//     "M.Tech",
//     "MBA"
//   ];

//   const roles = [
//     "All",
//     "Professor",
//     "Associate Professor",
//     "Assistant Professor",
//     "Lecturer",
//     "Researcher"
//   ];

//   const facultyList = [
//     { name: "Dr. John Doe", department: "Computer Science and Engineering", role: "Professor" },
//     { name: "Dr. Jane Smith", department: "Electrical and Electronics Engineering", role: "Associate Professor" },
//     { name: "Dr. Mike Johnson", department: "Mechanical Engineering", role: "Assistant Professor" },
//     { name: "Dr. Emily Davis", department: "MBA", role: "Lecturer" },
//     { name: "Dr. William Brown", department: "Computer Science and Engineering", role: "Professor" },
//     { name: "Dr. Olivia Wilson", department: "Civil Engineering", role: "Assistant Professor" },
//     { name: "Dr. Henry Taylor", department: "Electronics and Communication Engineering", role: "Lecturer" },
//     { name: "Dr. Sophia Martinez", department: "Information Technology Engineering", role: "Researcher" },
//     { name: "Dr. Daniel Anderson", department: "Metallurgical Engineering", role: "Professor" },
//     { name: "Dr. Grace Lee", department: "M.Tech", role: "Assistant Professor" },
//     { name: "Dr. Benjamin Harris", department: "MBA", role: "Lecturer" },
//     { name: "Dr. Alice Walker", department: "Civil Engineering", role: "Professor" },
//     { name: "Dr. Mark Spencer", department: "Computer Science and Engineering", role: "Assistant Professor" },
//     { name: "Dr. Laura King", department: "Electrical and Electronics Engineering", role: "Researcher" },
//     { name: "Dr. Richard Clark", department: "Mechanical Engineering", role: "Professor" },
//     { name: "Dr. Nancy Roberts", department: "Information Technology Engineering", role: "Associate Professor" },
//     { name: "Dr. Kevin Lewis", department: "Metallurgical Engineering", role: "Assistant Professor" },
//     { name: "Dr. Angela White", department: "Computer Science and Engineering", role: "Lecturer" },
//     { name: "Dr. Patrick Hall", department: "MBA", role: "Researcher" },
//     { name: "Dr. Brenda Allen", department: "Civil Engineering", role: "Assistant Professor" },
//     { name: "Dr. Steven Young", department: "Mechanical Engineering", role: "Lecturer" },
//     { name: "Dr. Kimberly Scott", department: "Electronics and Communication Engineering", role: "Professor" },
//     { name: "Dr. Charles Adams", department: "Information Technology Engineering", role: "Professor" },
//     { name: "Dr. Victoria Perez", department: "MBA", role: "Assistant Professor" },
//     { name: "Dr. Jonathan Hall", department: "Computer Science and Engineering", role: "Researcher" },
//     { name: "Dr. Samantha Allen", department: "Civil Engineering", role: "Lecturer" },
//     { name: "Dr. Brian Mitchell", department: "Mechanical Engineering", role: "Associate Professor" },
//     { name: "Dr. Lauren Turner", department: "Electronics and Communication Engineering", role: "Researcher" },
//     { name: "Dr. Timothy Carter", department: "Metallurgical Engineering", role: "Lecturer" },
//     { name: "Dr. Rachel Evans", department: "M.Tech", role: "Professor" }
//   ];

//   // Filter faculty
//   const filteredFaculty = facultyList.filter((f) => {
//     const matchesDept = filters.department === "All" || f.department === filters.department;
//     const matchesRole = filters.role === "All" || f.role === filters.role;
//     const matchesSearch = f.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
//     return matchesDept && matchesRole && matchesSearch;
//   });

//   // Pagination
//   const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
//   const paginatedFaculty = filteredFaculty.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // Highlight search term
//   const highlightMatch = (name) => {
//     if (!filters.searchTerm) return name;
//     const regex = new RegExp(`(${filters.searchTerm})`, "gi");
//     return name.split(regex).map((part, idx) =>
//       regex.test(part) ? <span key={idx} className="bg-yellow-300 text-black rounded px-1">{part}</span> : part
//     );
//   };

//   return (
//     <div className="p-8 max-w-6xl mx-auto bg-gray-50 rounded-3xl shadow-2xl space-y-6">
//       <h1 className="text-4xl font-extrabold mb-6 text-center text-purple-800 tracking-wide drop-shadow">
//         🌟 IQAC Dashboard
//       </h1>

//       {/* Filters */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl shadow-lg">
//         <div>
//           <label className="block mb-2 font-semibold text-gray-700">Department</label>
//           <select
//             className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 shadow-sm focus:ring-2 focus:ring-purple-400"
//             value={filters.department}
//             onChange={(e) => { setFilters({ ...filters, department: e.target.value }); setCurrentPage(1); }}
//           >
//             {departments.map((dept, idx) => (
//               <option key={idx} value={dept}>{dept}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block mb-2 font-semibold text-gray-700">Role</label>
//           <select
//             className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 shadow-sm focus:ring-2 focus:ring-purple-400"
//             value={filters.role}
//             onChange={(e) => { setFilters({ ...filters, role: e.target.value }); setCurrentPage(1); }}
//           >
//             {roles.map((role, idx) => (
//               <option key={idx} value={role}>{role}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block mb-2 font-semibold text-gray-700">Search</label>
//           <input
//             type="text"
//             placeholder="🔍 Search by name"
//             className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 shadow-sm focus:ring-2 focus:ring-purple-400"
//             value={filters.searchTerm}
//             onChange={(e) => { setFilters({ ...filters, searchTerm: e.target.value }); setCurrentPage(1); }}
//           />
//         </div>
//       </div>

//       {/* Rows per page selector */}
//       <div className="flex justify-between items-center mb-2 px-2">
//         <p className="font-medium">Total Faculty: {filteredFaculty.length}</p>
//         <div>
//           <label className="mr-2 font-medium">Rows per page:</label>
//           <select
//             className="border border-gray-300 rounded-lg p-1 shadow-sm focus:ring-2 focus:ring-purple-400"
//             value={itemsPerPage}
//             onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
//           >
//             {[10, 25, 50, 100].map((num) => (
//               <option key={num} value={num}>{num}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Faculty Table */}
//       <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
//         <table className="w-full table-auto border-collapse">
//           <thead className="bg-purple-200 text-gray-900 sticky top-0">
//             <tr>
//               <th className="px-4 py-3 text-left font-semibold">#</th>
//               <th className="px-4 py-3 text-left font-semibold">Name</th>
//               <th className="px-4 py-3 text-left font-semibold">Department</th>
//               <th className="px-4 py-3 text-left font-semibold">Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedFaculty.length > 0 ? (
//               paginatedFaculty.map((f, idx) => (
//                 <tr key={idx} className="odd:bg-white even:bg-gray-50 hover:bg-purple-50 transition">
//                   <td className="px-4 py-2">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
//                   <td className="px-4 py-2">{highlightMatch(f.name)}</td>
//                   <td className="px-4 py-2">{f.department}</td>
//                   <td className="px-4 py-2">{f.role}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
//                   ❌ No faculty found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-4 mt-6">
//           <button
//             className="px-5 py-2 bg-purple-500 text-white rounded-full shadow hover:bg-purple-600 transition disabled:opacity-50"
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             ⬅️ Previous
//           </button>
//           <span className="font-medium">Page {currentPage} of {totalPages}</span>
//           <button
//             className="px-5 py-2 bg-purple-500 text-white rounded-full shadow hover:bg-purple-600 transition disabled:opacity-50"
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//           >
//             Next ➡️
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
// import React, { useState } from "react";

// export default function Iqac() {
//   const [filters, setFilters] = useState({
//     department: "All",
//     role: "All",
//     searchTerm: "",
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);

//   const departments = [
//     "All",
//     "Computer Science and Engineering",
//     "Electronics and Communication Engineering",
//     "Electrical and Electronics Engineering",
//     "Mechanical Engineering",
//     "Civil Engineering",
//     "Metallurgical Engineering",
//     "Information Technology Engineering",
//     "M.Tech",
//     "MBA",
//   ];

//   const roles = [
//     "All",
//     "Professor",
//     "Associate Professor",
//     "Assistant Professor",
//     "Lecturer",
//     "Researcher",
//   ];

//   // Faculty dataset
//   const facultyList = [
//     { name: "Dr. John Doe", department: "Computer Science and Engineering", role: "Professor" },
//     { name: "Dr. Jane Smith", department: "Electrical and Electronics Engineering", role: "Associate Professor" },
//     { name: "Dr. Mike Johnson", department: "Mechanical Engineering", role: "Assistant Professor" },
//     { name: "Dr. Emily Davis", department: "MBA", role: "Lecturer" },
//     { name: "Dr. William Brown", department: "Computer Science and Engineering", role: "Professor" },
//     { name: "Dr. Olivia Wilson", department: "Civil Engineering", role: "Assistant Professor" },
//     { name: "Dr. Henry Taylor", department: "Electronics and Communication Engineering", role: "Lecturer" },
//     { name: "Dr. Sophia Martinez", department: "Information Technology Engineering", role: "Researcher" },
//     { name: "Dr. Daniel Anderson", department: "Metallurgical Engineering", role: "Professor" },
//     { name: "Dr. Grace Lee", department: "M.Tech", role: "Assistant Professor" },
//     { name: "Dr. Benjamin Harris", department: "MBA", role: "Lecturer" },
//     { name: "Dr. Alice Walker", department: "Civil Engineering", role: "Professor" },
//     { name: "Dr. Mark Spencer", department: "Computer Science and Engineering", role: "Assistant Professor" },
//     { name: "Dr. Laura King", department: "Electrical and Electronics Engineering", role: "Researcher" },
//     { name: "Dr. Richard Clark", department: "Mechanical Engineering", role: "Professor" },
//     { name: "Dr. Nancy Roberts", department: "Information Technology Engineering", role: "Associate Professor" },
//     { name: "Dr. Kevin Lewis", department: "Metallurgical Engineering", role: "Assistant Professor" },
//     { name: "Dr. Angela White", department: "Computer Science and Engineering", role: "Lecturer" },
//     { name: "Dr. Patrick Hall", department: "MBA", role: "Researcher" },
//     { name: "Dr. Brenda Allen", department: "Civil Engineering", role: "Assistant Professor" },
//     { name: "Dr. Steven Young", department: "Mechanical Engineering", role: "Lecturer" },
//     { name: "Dr. Kimberly Scott", department: "Electronics and Communication Engineering", role: "Professor" },
//     { name: "Dr. Charles Adams", department: "Information Technology Engineering", role: "Professor" },
//     { name: "Dr. Victoria Perez", department: "MBA", role: "Assistant Professor" },
//     { name: "Dr. Jonathan Hall", department: "Computer Science and Engineering", role: "Researcher" },
//     { name: "Dr. Samantha Allen", department: "Civil Engineering", role: "Lecturer" },
//     { name: "Dr. Brian Mitchell", department: "Mechanical Engineering", role: "Associate Professor" },
//     { name: "Dr. Lauren Turner", department: "Electronics and Communication Engineering", role: "Researcher" },
//     { name: "Dr. Timothy Carter", department: "Metallurgical Engineering", role: "Lecturer" },
//     { name: "Dr. Rachel Evans", department: "M.Tech", role: "Professor" },
//   ];

//   // Filtering
//   const filteredFaculty = facultyList.filter((f) => {
//     const matchesDept = filters.department === "All" || f.department === filters.department;
//     const matchesRole = filters.role === "All" || f.role === filters.role;
//     const matchesSearch = f.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
//     return matchesDept && matchesRole && matchesSearch;
//   });

//   // Pagination
//   const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
//   const paginatedFaculty = filteredFaculty.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // Highlight matches
//   const highlightMatch = (name) => {
//     if (!filters.searchTerm) return name;
//     const regex = new RegExp(`(${filters.searchTerm})`, "gi");
//     return name.split(regex).map((part, idx) =>
//       regex.test(part) ? <span key={idx} className="bg-yellow-200">{part}</span> : part
//     );
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-lg">
//       <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
//         IQAC Faculty Dashboard
//       </h1>

//       {/* 🔍 Search Bar */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           className="w-full border border-gray-300 rounded-lg p-2"
//           value={filters.searchTerm}
//           onChange={(e) => { setFilters({ ...filters, searchTerm: e.target.value }); setCurrentPage(1); }}
//         />
//       </div>

//       {/* 🏫 Department Filter - Pills */}
//       <div className="mb-6 flex flex-wrap gap-2">
//         {departments.map((dept, idx) => (
//           <button
//             key={idx}
//             className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
//               filters.department === dept
//                 ? "bg-purple-600 text-white"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//             onClick={() => { setFilters({ ...filters, department: dept }); setCurrentPage(1); }}
//           >
//             {dept}
//           </button>
//         ))}
//       </div>

//       {/* 🎓 Role Filter - Tabs */}
//       <div className="flex gap-3 border-b mb-6">
//         {roles.map((role, idx) => (
//           <button
//             key={idx}
//             className={`pb-2 px-4 transition ${
//               filters.role === role
//                 ? "border-b-2 border-purple-600 text-purple-600 font-medium"
//                 : "text-gray-600 hover:text-purple-600"
//             }`}
//             onClick={() => { setFilters({ ...filters, role: role }); setCurrentPage(1); }}
//           >
//             {role}
//           </button>
//         ))}
//       </div>

//       {/* Rows per page selector */}
//       <div className="flex justify-between items-center mb-3">
//         <p className="font-medium">Total Faculty: {filteredFaculty.length}</p>
//         <div>
//           <label className="mr-2 font-medium">Rows per page:</label>
//           <select
//             className="border border-gray-300 rounded-lg p-1"
//             value={itemsPerPage}
//             onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
//           >
//             {[10, 25, 50, 100].map((num) => (
//               <option key={num} value={num}>{num}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Faculty Table */}
//       <div className="overflow-x-auto bg-white rounded-xl shadow-md">
//         <table className="w-full table-auto border-collapse">
//           <thead className="bg-purple-100 text-gray-800">
//             <tr>
//               <th className="border px-4 py-2 text-left">#</th>
//               <th className="border px-4 py-2 text-left">Name</th>
//               <th className="border px-4 py-2 text-left">Department</th>
//               <th className="border px-4 py-2 text-left">Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedFaculty.length > 0 ? (
//               paginatedFaculty.map((f, idx) => (
//                 <tr key={idx} className="hover:bg-gray-50 transition">
//                   <td className="border px-4 py-2">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
//                   <td className="border px-4 py-2">{highlightMatch(f.name)}</td>
//                   <td className="border px-4 py-2">{f.department}</td>
//                   <td className="border px-4 py-2">{f.role}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="border px-4 py-2 text-center text-gray-500">
//                   No faculty found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-4 mt-4">
//           <button
//             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button>
//           <span className="font-medium">Page {currentPage} of {totalPages}</span>
//           <button
//             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState } from "react";
import { Search, X, Mail, Phone, Filter, ChevronDown, ChevronUp } from "lucide-react";

const departments = [
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

const roles = ["Professor", "Assistant Professor", "Lecturer"];

const facultyData = [
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
  { name: "Dr. Rachel Evans", department: "M.Tech", role: "Professor" },
];

export default function IqacDashboard() {
  const [filters, setFilters] = useState({ departments: [], roles: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Filtering
  let filteredData = facultyData.filter((f) => {
    const deptMatch = filters.departments.length === 0 || filters.departments.includes(f.department);
    const roleMatch = filters.roles.length === 0 || filters.roles.includes(f.role);
    const searchMatch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    return deptMatch && roleMatch && searchMatch;
  });

  // Sorting
  if (sortConfig.key) {
    filteredData = [...filteredData].sort((a, b) => {
      const valA = a[sortConfig.key].toLowerCase();
      const valB = b[sortConfig.key].toLowerCase();
      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const highlightMatch = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 px-1 rounded">{part}</mark>
      ) : part
    );
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-purple-700">IQAC Dashboard</h1>

          <div className="flex items-center gap-3">
            <div className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full border rounded-lg pl-10 pr-10 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              {searchTerm && <X className="absolute right-3 top-2.5 text-gray-400 cursor-pointer" size={18} onClick={() => setSearchTerm("")} />}
            </div>

            <button
              className="p-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Filter size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Sidebar */}
        <aside className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg p-6 transform transition-transform z-30
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Filters</h2>
            <X size={20} className="cursor-pointer" onClick={() => setSidebarOpen(false)} />
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Department</h3>
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  className={`px-3 py-1 rounded-full text-sm ${filters.departments.includes(dept) ? "bg-purple-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                  onClick={() => {
                    const newDepartments = filters.departments.includes(dept)
                      ? filters.departments.filter(d => d !== dept)
                      : [...filters.departments, dept];
                    setFilters({ ...filters, departments: newDepartments });
                    setCurrentPage(1);
                  }}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Role</h3>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <button
                  key={role}
                  className={`px-3 py-1 rounded-full text-sm ${filters.roles.includes(role) ? "bg-purple-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                  onClick={() => {
                    const newRoles = filters.roles.includes(role)
                      ? filters.roles.filter(r => r !== role)
                      : [...filters.roles, role];
                    setFilters({ ...filters, roles: newRoles });
                    setCurrentPage(1);
                  }}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <button
            className="w-full bg-red-100 text-red-600 py-2 rounded hover:bg-red-200"
            onClick={() => { setFilters({ departments: [], roles: [] }); setSearchTerm(""); setCurrentPage(1); }}
          >
            Clear Filters
          </button>
        </aside>

        {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-20" onClick={() => setSidebarOpen(false)} />}

        {/* Content */}
        <main className="flex-1 p-6 mt-6">
          {/* Rows per page selector at top */}
          <div className="flex justify-end mb-4 gap-2 flex-wrap">
            <span className="text-gray-700 font-medium">Rows per page:</span>
            {[10, 25, 50, 100].map((num) => (
              <button
                key={num}
                className={`px-3 py-1 rounded ${rowsPerPage === num ? "bg-purple-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                onClick={() => { setRowsPerPage(num); setCurrentPage(1); }}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Counts + Sorting */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
            <p className="text-gray-700 font-medium">
              Showing <span className="font-bold">{filteredData.length}</span> of <span className="font-bold">{facultyData.length}</span> faculty members
            </p>

            <div className="flex gap-3 flex-wrap">
              {["name", "department", "role"].map((key) => (
                <button
                  key={key}
                  className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 flex items-center gap-1"
                  onClick={() => handleSort(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  {sortConfig.key === key && (sortConfig.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </button>
              ))}
            </div>
          </div>

          {/* Faculty Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedData.length > 0 ? paginatedData.map((f, idx) => (
              <div
                key={idx}
                className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105 animate-fade-in"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 mb-3"></div>
                  <h3 className="font-bold text-lg">{highlightMatch(f.name)}</h3>
                  <p className="text-gray-600">{f.department}</p>
                  <p className="text-purple-600 font-medium">{f.role}</p>
                  <div className="flex gap-3 mt-3">
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><Mail size={16} /></button>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><Phone size={16} /></button>
                  </div>
                  <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">View Profile</button>
                </div>
              </div>
            )) : <p className="col-span-full text-center text-gray-500">No faculty found 🚫</p>}
          </div>

          {/* Pagination at center */}
          <div className="flex justify-center mt-6 gap-2">
            <button
              className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-purple-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </main>
      </div>

      {/* Tailwind animation */}
      <style>
        {`
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease forwards;
          }
        `}
      </style>
    </div>
  );
}
