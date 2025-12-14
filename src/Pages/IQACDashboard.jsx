import React, { useState } from "react";
import { X, Search, FileText, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx"; // Import XLSX library
import { schemas, yearFields, certifications, facultyList } from '../assets/Data'

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

  // Helper: Get full list of attribute keys for a type
  const getAllAttributesForType = (typeKey) => {
    return getSchemaForType(typeKey).attributes.map(a => a.key);
  };

  // Helper: Define schema per type (label + attributes)
  const getSchemaForType = (typeKey) => {
    return schemas[typeKey] || { label: typeKey, attributes: [] };
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

  // Function to generate Excel file

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
      // Create a new workbook
      const wb = XLSX.utils.book_new();

      // Track sheet names to avoid duplicates
      const usedSheetNames = new Set();

      // For each selected type, create a worksheet
      selectedTypes.forEach(typeKey => {
        const schema = getSchemaForType(typeKey);
        const selectedAttrs = selectedAttributes[typeKey] || [];

        if (selectedAttrs.length === 0) {
          console.warn(`No attributes selected for ${typeKey}, skipping...`);
          return;
        }

        // Prepare headers (add Faculty Name and Role as first columns)
        const headers = ["Faculty Name", "Faculty Role", ...selectedAttrs.map(attrKey => {
          const attr = schema.attributes.find(a => a.key === attrKey);
          return attr ? attr.label : attrKey;
        })];

        // Prepare data rows
        const rows = [];

        certifications.forEach(faculty => {
          if (faculty.data && faculty.data[typeKey]) {
            faculty.data[typeKey].forEach(record => {
              // Apply year filter if specified
              if (yearFrom || yearTo) {
                const recordYear = extractYearFromRecord(record, typeKey);

                if (yearFrom && recordYear && recordYear < parseInt(yearFrom)) {
                  return; // Skip if before start year
                }
                if (yearTo && recordYear && recordYear > parseInt(yearTo)) {
                  return; // Skip if after end year
                }
              }

              const rowData = [faculty.name, faculty.role];

              // Add selected attributes in order
              selectedAttrs.forEach(attrKey => {
                rowData.push(record[attrKey] || "");
              });

              rows.push(rowData);
            });
          }
        });

        if (rows.length > 0) {
          // Create worksheet with headers and data
          const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);

          // Set column widths (auto-width approximation)
          const colWidths = headers.map(header => ({
            wch: Math.max(header.length, 15)
          }));
          ws['!cols'] = colWidths;

          // Sanitize and ensure unique sheet name
          let sheetName = sanitizeSheetName(schema.label);

          // Ensure sheet name doesn't exceed 31 characters
          sheetName = sheetName.substring(0, 31);

          // Make sure sheet name is not empty
          if (!sheetName.trim()) {
            sheetName = `Sheet_${typeKey}`;
          }

          // Ensure uniqueness
          let finalSheetName = sheetName;
          let counter = 1;
          while (usedSheetNames.has(finalSheetName) && counter < 100) {
            finalSheetName = `${sheetName.substring(0, 28)}_${counter}`;
            counter++;
          }

          usedSheetNames.add(finalSheetName);

          // Add worksheet to workbook
          XLSX.utils.book_append_sheet(wb, ws, finalSheetName);
        }
      });

      // Check if any worksheets were created
      if (wb.SheetNames.length === 0) {
        alert("No data found for the selected criteria.");
        setIsGenerating(false);
        return;
      }

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `Faculty_Report_${timestamp}.xlsx`;

      // Write and download the file
      XLSX.writeFile(wb, filename);

      // Close modal after successful generation
      setShowExtractModal(false);
      alert(`Report generated successfully: ${filename}`);

    } catch (error) {
      console.error("Error generating Excel report:", error);
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
      // Create a new workbook
      const wb = XLSX.utils.book_new();

      // Prepare headers
      const headers = ["S.No", "Faculty Name", "Email", "Designation"];

      // Prepare data rows
      const rows = facultyList.map((faculty, index) => [
        index + 1,
        faculty.name,
        faculty.email || "", // Use email if available, otherwise empty string
        faculty.role
      ]);

      // Combine headers and data
      const data = [headers, ...rows];

      // Create worksheet
      const ws = XLSX.utils.aoa_to_sheet(data);

      // Set column widths
      ws['!cols'] = [
        { wch: 6 },  // S.No column width
        { wch: 30 }, // Name column width
        { wch: 35 }, // Email column width
        { wch: 25 }  // Designation column width
      ];

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, "Faculty List");

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `Faculty_List_${timestamp}.xlsx`;

      // Download the file
      XLSX.writeFile(wb, filename);

      alert(`Faculty list exported successfully: ${filename}`);

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
              onClick={() => setShowExtractModal(false)}
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
                      <label className="block text-sm font-medium mb-1">
                        Select Report Types
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        {[
                          { key: "patents", label: "Patents" },
                          { key: "journal", label: "Journal Publications" },
                          { key: "book", label: "Books" },
                          { key: "book_chapter", label: "Book Chapters" },
                          { key: "conference", label: "Conferences" },
                          { key: "seminar", label: "Seminars" },
                          { key: "workshop", label: "Workshops" },
                          { key: "fdp", label: "FDP / STTP" },
                          { key: "webinar", label: "Webinars" },
                          { key: "OC", label: "Orientation Courses" },
                          { key: "keynote", label: "Keynote Talks" },
                          { key: "talk", label: "Expert Talks" },
                          { key: "certifications", label: "Certifications" },
                          { key: "award_title", label: "Awards & Recognitions" },
                          { key: "research", label: "Research Projects" },
                          { key: "sponsored", label: "Sponsored Projects" },
                          { key: "consultancy", label: "Consultancy" },
                          { key: "phd_awarded", label: "PhD Students Awarded" },
                          { key: "ieee", label: "IEEE Membership" },
                          { key: "csi", label: "CSI Membership" },
                          { key: "repository", label: "Repository Contributions" },
                        ].map((type) => (
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
