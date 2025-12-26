import React, { useState } from "react";
import { X, Search, FileText, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx"; // Import XLSX library
import { schemas, yearFields, certifications, facultyList, AtKeys } from '../assets/Data'

export default function IQACDashboard() {
  const [filters, setFilters] = useState({
    department: "All",
    searchTerm: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // --- State for report modal ---
  const [showExtractModal, setShowExtractModal] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState({})

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

  // Helper: Get full list of attribute keys for a type
  const getAllAttributesForType = (typeKey) => {
    return getSchemaForType(typeKey).attributes.map(a => a.key);
  };

  // Helper: Define schema per type (label + attributes)
  const getSchemaForType = (typeKey) => {
    return schemas[typeKey] || { label: typeKey, attributes: [] };
  };

  const handleFacultyToggle = (dept, facultyName) => {
    setSelectedMembers(prev => {
      const currentSelected = prev[dept] || [];
      let newSelected;

      if (currentSelected.includes(facultyName)) {
        // Remove faculty member
        newSelected = currentSelected.filter(name => name !== facultyName);
      } else {
        // Add faculty member
        newSelected = [...currentSelected, facultyName];
      }

      // Return the updated state object
      return {
        ...prev,
        [dept]: newSelected,
      };
    });
  };

  const handleSelectAllForDept = (dept, facultyList) => {
    setSelectedMembers(prev => {
      const currentSelected = prev[dept] || [];
      const allSelected = facultyList.length > 0 && facultyList.every(name => currentSelected.includes(name));

      let newSelected;
      if (allSelected) {
        // Deselect all
        newSelected = [];
      } else {
        // Select all
        newSelected = [...facultyList];
      }

      return {
        ...prev,
        [dept]: newSelected,
      };
    });
  };
  // Extract year from a record
  const extractYearFromRecord = (record, typeKey) => {
    // Try to find a year field based on the type


    const yearField = yearFields[typeKey];
    if (!yearField || !record[yearField]) return null;

    const value = record[yearField];
    // Extract year from date string or use as-is
    if (typeof value === 'string') {
      const yearMatch = value.match(/\b(\d{4})\b/);
      return yearMatch ? parseInt(yearMatch[1]) : parseInt(value);
    }
    return parseInt(value);
  };

  const getFacultyForDepartmentAndCredentials = (dept, selectedCredTypes) => {
    if (selectedCredTypes.length === 0) {
      // If no credential types are selected, return all faculty from the dept
      return certifications
        .filter(faculty => faculty.dept === dept)
        .map(faculty => faculty.name);
    }

    // Otherwise, filter based on both department and having data for selected types
    return certifications
      .filter(faculty => {
        if (faculty.dept !== dept) return false;
        // Check if the faculty has data for at least one of the selected credential types
        return selectedCredTypes.some(type => faculty.data && faculty.data[type]);
      })
      .map(faculty => faculty.name);
  };

  // Add this helper function to sanitize sheet names
  const sanitizeSheetName = (name) => {
    // Remove characters not allowed in Excel sheet names
    return name.replace(/[:\\/?*\[\]]/g, ' ');
  };

  // Then in your generateExcelReport function, update the sheet name line:
  const generateExcelReport = async () => {
    if (selectedTypes.length === 0) {
      alert("Please select at least one report type.");
      return;
    }

    setIsGenerating(true);

    try {
      const wb = XLSX.utils.book_new();
      const usedSheetNames = new Set();

      selectedTypes.forEach(typeKey => {
        const schema = getSchemaForType(typeKey);
        const selectedAttrs = selectedAttributes[typeKey] || [];
        if (selectedAttrs.length === 0) return;

        // Headers
        const headers = [
          "S.No",
          "Faculty Name",
          "Faculty Role",
          ...selectedAttrs.map(attrKey => {
            const attr = schema.attributes.find(a => a.key === attrKey);
            return attr ? attr.label : attrKey;
          })
        ];

        // Group by department
        const departmentData = {};

        certifications.forEach(faculty => {
          if (faculty.data && faculty.data[typeKey]) {
            faculty.data[typeKey].forEach(record => {

              // Year filter
              if (yearFrom || yearTo) {
                const recordYear = extractYearFromRecord(record, typeKey);
                if (yearFrom && recordYear && recordYear < parseInt(yearFrom)) return;
                if (yearTo && recordYear && recordYear > parseInt(yearTo)) return;
              }

              const dept = faculty.dept || "Others";
              if (!departmentData[dept]) departmentData[dept] = [];

              const row = [faculty.name, faculty.role];
              selectedAttrs.forEach(attrKey => row.push(record[attrKey] || ""));
              departmentData[dept].push(row);
            });
          }
        });

        const sheetData = [];
        const borderRanges = []; // Track table ranges for borders

        Object.keys(departmentData).forEach(department => {
          const rows = departmentData[department];
          if (rows.length === 0) return;

          const startRow = sheetData.length;

          // Department title
          sheetData.push([`Department: ${department}`]);

          // Headers
          sheetData.push(headers);

          // Rows with serial numbers
          rows.forEach((row, index) => {
            sheetData.push([String(index + 1), ...row]);
          });

          const endRow = sheetData.length - 1;
          borderRanges.push({ startRow, endRow });

          sheetData.push([]); // Blank row
        });

        if (sheetData.length === 0) return;

        const ws = XLSX.utils.aoa_to_sheet(sheetData);

        // Column widths
        ws["!cols"] = headers.map(h => ({
          wch: Math.max(h.length, 18)
        }));

        // ---------------- STYLING ----------------

        const range = XLSX.utils.decode_range(ws["!ref"]);

        // Apply styles cell-by-cell
        for (let R = range.s.r; R <= range.e.r; ++R) {
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
            const cell = ws[cellAddress];
            if (!cell) continue;

            // Department title (bold)
            if (cell.v && typeof cell.v === "string" && cell.v.startsWith("Department:")) {
              cell.s = {
                font: { bold: true, sz: 12 },
                alignment: { horizontal: "left" }
              };
            }

            // Header row (bold)
            if (R > 0 && sheetData[R - 1] &&
              sheetData[R - 1][0] &&
              typeof sheetData[R - 1][0] === "string" &&
              sheetData[R - 1][0].startsWith("Department:")) {
              cell.s = {
                font: { bold: true },
                alignment: { horizontal: "center" }
              };
            }
          }
        }

        // Apply borders to each department table
        borderRanges.forEach(({ startRow, endRow }) => {
          for (let R = startRow + 1; R <= endRow; R++) {
            for (let C = 0; C < headers.length; C++) {
              const addr = XLSX.utils.encode_cell({ r: R, c: C });
              if (!ws[addr]) continue;

              ws[addr].s = {
                ...(ws[addr].s || {}),
                border: {
                  top: { style: "thin" },
                  bottom: { style: "thin" },
                  left: { style: "thin" },
                  right: { style: "thin" }
                }
              };
            }
          }
        });

        // Sheet name
        let sheetName = sanitizeSheetName(schema.label).substring(0, 31);
        if (!sheetName.trim()) sheetName = `Sheet_${typeKey}`;

        let finalSheetName = sheetName;
        let counter = 1;
        while (usedSheetNames.has(finalSheetName)) {
          finalSheetName = `${sheetName.substring(0, 28)}_${counter++}`;
        }
        usedSheetNames.add(finalSheetName);

        XLSX.utils.book_append_sheet(wb, ws, finalSheetName);
      });

      if (wb.SheetNames.length === 0) {
        alert("No data found for the selected criteria.");
        return;
      }

      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `Faculty_Report_${timestamp}.xlsx`;

      XLSX.writeFile(wb, filename);

      setShowExtractModal(false);
      alert(`Report generated successfully: ${filename}`);

    } catch (error) {
      console.error("Excel generation error:", error);
      alert(`Error generating report: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };


  // Handle form submission
  const handleExtractReports = async (e) => {
    e.preventDefault();
    await generateExcelReport();
  };

  const printList = async () => {
    try {
      const wb = XLSX.utils.book_new();

      // Group faculty by department
      const departmentMap = {};

      facultyList.forEach(faculty => {
        const dept = faculty.department || "Others";
        if (!departmentMap[dept]) {
          departmentMap[dept] = [];
        }
        departmentMap[dept].push(faculty);
      });

      // Prepare headers
      const headers = ["S.No", "Faculty Name", "Email", "Designation", "Department"];

      // Create one sheet per department
      Object.keys(departmentMap).forEach(department => {
        const rows = departmentMap[department].map((faculty, index) => [
          index + 1,
          faculty.name,
          faculty.email || "",
          faculty.role,
          faculty.department || "N/A"
        ]);

        const data = [headers, ...rows];
        const ws = XLSX.utils.aoa_to_sheet(data);

        // Column widths
        ws["!cols"] = [
          { wch: 6 },
          { wch: 30 },
          { wch: 35 },
          { wch: 25 },
          { wch: 30 }
        ];

        // Sheet names must be <= 31 chars
        const sheetName = department.substring(0, 31);

        XLSX.utils.book_append_sheet(wb, ws, sheetName);
      });

      // Filename
      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `Faculty_List_Branch_Wise_${timestamp}.xlsx`;

      XLSX.writeFile(wb, filename);

      alert(`Branch-wise faculty list exported successfully: ${filename}`);

    } catch (error) {
      console.error("Error exporting faculty list:", error);
      alert("Error exporting faculty list. Please try again.");
    }
  };


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
      {/* Styled Extract Reports Button */}
      <div className="flex justify-start pr-2 mt-10 md:pr-0">
        <button
          onClick={() => setShowExtractModal(true)}
          className="flex items-center gap-2 px-4 py-2 font-bold text-white bg-linear-to-r from-blue-600 via-violet-600 to-pink-600 hover:from-blue-700 hover:via-violet-700 hover:to-pink-700 cursor-pointer rounded-lg shadow-md hover:bg-purple-700 focus:outline-none "
        >
          <FileText size={20} />
          Extract Reports
        </button>
      </div>
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
            <option key="All" value="All">All</option>
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
              className={`absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center text-gray-500 hover:text-gray-700 transition-opacity duration-300 ${filters.searchTerm ? "opacity-100" : "opacity-0 pointer-events-none"
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
        <>
          <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
            <button
              className="px-5 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition disabled:opacity-50 cursor-pointer"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ⬅️ Previous
            </button>
            <span className="font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-5 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition disabled:opacity-50 cursor-pointer"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next ➡️
            </button>
          </div>
          <div className="flex justify-end ">
            <div className="bg-linear-to-r from-blue-700 w-fit m-2 mr-4 rounded-lg to-purple-600 " >
              <button onClick={printList} className="m-2 mx-4 text-white">Print List </button>
            </div>
          </div>
        </>
      )}
      <AnimatePresence>
        {showExtractModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50"
            />

            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed top-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <FileText className="text-indigo-600" size={20} />
                    Extract Report
                  </h2>
                  <button
                    onClick={() => setShowExtractModal(false)}
                    className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="max-h-[70vh] overflow-y-auto p-6">
                  <form onSubmit={handleExtractReports} className="space-y-4">
                    {/* Dynamic Report Type + Attribute Selection */}
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Select Report Types
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        {AtKeys.map((type) => (
                          <label key={type.key} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedTypes.includes(type.key)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedTypes((prev) => [...prev, type.key]);
                                  setSelectedAttributes((prev) => ({
                                    ...prev,
                                    [type.key]: getAllAttributesForType(type.key),
                                  }));
                                } else {
                                  setSelectedTypes((prev) => prev.filter((t) => t !== type.key));
                                  setSelectedAttributes((prev) => {
                                    const newAttrs = { ...prev };
                                    delete newAttrs[type.key];
                                    return newAttrs;
                                  });
                                }
                              }}
                              className="rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="text-sm">{type.label}</span>
                          </label>
                        ))}
                      </div>

                      {/* Attribute Selection per Type */}
                      {selectedTypes.length > 0 && (
                        <div className="mt-6 space-y-5">
                          <h3 className="text-sm font-medium text-gray-700 border-b pb-2">
                            Select Attributes for Each Report Type
                          </h3>

                          {selectedTypes.map((typeKey) => {
                            const schema = getSchemaForType(typeKey);
                            const attrs = selectedAttributes[typeKey] || [];

                            return (
                              <div
                                key={typeKey}
                                className="border rounded-lg p-4 bg-gray-50"
                              >
                                <div className="font-medium text-indigo-700 mb-3 flex items-center gap-2">
                                  <span>📄</span>
                                  {schema.label}
                                </div>

                                <div className="flex justify-between items-center mb-3">
                                  <span className="text-xs text-gray-600">
                                    {attrs.length} of {schema.attributes.length} selected
                                  </span>
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setSelectedAttributes((prev) => ({
                                          ...prev,
                                          [typeKey]: schema.attributes.map((a) => a.key),
                                        }))
                                      }
                                      className="text-xs text-indigo-600 hover:underline"
                                    >
                                      Select All
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setSelectedAttributes((prev) => ({
                                          ...prev,
                                          [typeKey]: [],
                                        }))
                                      }
                                      className="text-xs text-gray-500 hover:underline"
                                    >
                                      Clear
                                    </button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {schema.attributes.map((attr) => (
                                    <label key={attr.key} className="flex items-start gap-2">
                                      <input
                                        type="checkbox"
                                        checked={attrs.includes(attr.key)}
                                        onChange={(e) => {
                                          setSelectedAttributes((prev) => {
                                            const current = prev[typeKey] || [];
                                            const updated = e.target.checked
                                              ? [...current, attr.key]
                                              : current.filter((k) => k !== attr.key);
                                            return { ...prev, [typeKey]: updated };
                                          });
                                        }}
                                        className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <span className="text-sm">
                                        {attr.label}{" "}
                                        {attr.required && <span className="text-red-500">*</span>}
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Year Range */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          From Year
                        </label>
                        <input
                          type="number"
                          placeholder="2018"
                          className="w-full border rounded-lg p-2"
                          value={yearFrom}
                          onChange={(e) => setYearFrom(e.target.value)}
                          min="1950"
                          max={new Date().getFullYear()}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          To Year
                        </label>
                        <input
                          type="number"
                          placeholder="2025"
                          className="w-full border rounded-lg p-2"
                          value={yearTo}
                          onChange={(e) => setYearTo(e.target.value)}
                          min={yearFrom}
                          max={new Date().getFullYear()}
                        />
                      </div>
                    </div>

                    {/* add selection of one or more departments as per the requirement all of the selected previously*/}
                    <div className="mt-4">
                      <label className="block text-md font-medium mb-1">
                        Select Departments
                      </label>
                      <div className="space-y-2">
                        {departments.map((dept) => (
                          <label key={dept} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedDepartments.includes(dept)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedDepartments((prev) => [...prev, dept]);
                                } else {
                                  setSelectedDepartments((prev) => prev.filter((d) => d !== dept));
                                  // Optional: Also clear selected members for this department if deselected
                                  setSelectedMembers(prev => {
                                    const newMembers = { ...prev };
                                    delete newMembers[dept];
                                    return newMembers;
                                  });
                                }
                              }}
                              className="rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="text-sm">{dept}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* I want to select the candidates from the certifications based on the selected departments */}
                    <div className="mt-4">
                      <label className="block text-md font-medium mb-1">
                        Select Candidates for each Department
                      </label>
                      {selectedDepartments.length > 0 ? (
                        selectedDepartments.map((dept) => {
                          // Get faculty for the current department based on selected credential types
                          const facultyInDept = getFacultyForDepartmentAndCredentials(dept, selectedTypes);
                          const selectedInDept = selectedMembers[dept] || [];

                          return (
                            <div key={dept} className="mb-4 border rounded-lg p-4 bg-gray-50">
                              <div className="font-medium text-indigo-700 mb-3 flex items-center gap-2">
                                <span>🏢</span>
                                {dept}
                              </div>

                              {/* Select All / Clear All for this department */}
                              <div className="flex justify-between items-center mb-3">
                                <span className="text-xs text-gray-600">
                                  {selectedInDept.length} of {facultyInDept.length} selected
                                </span>
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleSelectAllForDept(dept, facultyInDept)}
                                    className="text-xs text-indigo-600 hover:underline"
                                  >
                                    {selectedInDept.length === facultyInDept.length ? 'Clear All' : 'Select All'}
                                  </button>
                                </div>
                              </div>

                              {facultyInDept.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                                  {facultyInDept.map((facultyName) => (
                                    <label key={`${dept}-${facultyName}`} className="flex items-start gap-2"> {/* Unique key including dept */}
                                      <input
                                        type="checkbox"
                                        checked={selectedInDept.includes(facultyName)}
                                        onChange={() => handleFacultyToggle(dept, facultyName)}
                                        className="mt-1 rounded text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <span className="text-sm">{facultyName}</span>
                                    </label>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500">No faculty members found for selected credentials in this department.</p>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-sm text-gray-500">No departments selected.</p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setShowExtractModal(false)}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                        disabled={isGenerating}
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isGenerating || selectedTypes.length === 0}
                      >
                        {isGenerating ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <Download size={16} />
                            Extract Report
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
