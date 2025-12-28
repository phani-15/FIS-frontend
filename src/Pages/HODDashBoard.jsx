import React, { useEffect, useState } from "react";
import { Search, X, User, ChevronDown, ShieldCheck, XCircle, ChevronUp, FileText, Download } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx"; // Import XLSX library
import { schemas, yearFields, certifications } from '../assets/Data'
import { HodDashBoard } from "../core/hod"
import axios from "axios";

export default function HODDashBoard() {
  const [filters, setFilters] = useState({ searchTerm: "" });
  const [filteredFaculty, setFacultyList] = useState([
    {
      "personalData": {
        "designation": " Professor",
        "name": "Polavarrapu Srrinivas"
      },
      "user": {
        "email": "srinu@gmail.com"
      }
    }
  ])
  const navigate = useNavigate();
  const { userId } = useParams()
  // --- State for report modal ---
  const [showExtractModal, setShowExtractModal] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [dateFrom, setdateFrom] = useState("");
  const [dateTo, setdateTo] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Helper: Get full list of attribute keys for a type
  const getAllAttributesForType = (typeKey) => {
    return getSchemaForType(typeKey).attributes.map(a => a.key);
  };
  useEffect(() => {
    const filterTheFaculty = async () => {
      try {
        const filteredFaculty = await HodDashBoard(userId)
        if (filteredFaculty) {
          setFacultyList(filteredFaculty.faculties);
        }
      } catch (error) {
        console.log(error);
      }
    }
    filterTheFaculty()

  }, [])

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
              if (dateFrom || dateTo) {
                const recordYear = extractYearFromRecord(record, typeKey);

                if (dateFrom && recordYear && recordYear < parseInt(dateFrom)) {
                  return; // Skip if before start year
                }
                if (dateTo && recordYear && recordYear > parseInt(dateTo)) {
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

  // Filter faculty list by search term
  // const filteredFaculty = facultyList


  // Highlight search term in names
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
        faculty.mail || "", // Use email if available, otherwise empty string
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

  return (
    <div className="p-2 mx-auto max-w-6xl lg:text-sm rounded-3xl space-y-6">
      {/* ... (your existing JSX remains the same until the modal) */}
      <h1 className="text-2xl lg:text-4xl font-serif font-semibold mb-2 text-center text-indigo-800 tracking-wide drop-shadow">
        HOD DashBoard
      </h1>

      <div className="flex flex-col">

        {/* Styled Extract Reports Button */}
        <div className="flex justify-start pr-2 mt-10 md:pr-0">
          <button
            onClick={() => setShowExtractModal(true)}
            className="flex items-center gap-2 px-4 py-2 font-bold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <FileText size={20} />
            Extract Reports
          </button>
        </div>

        {/* Search Filter */}
        <div className="flex justify-end p-2">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full border border-gray-300 rounded-lg p-2 pl-10 pr-10 bg-gray-50 shadow-sm focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
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
                <th className="px-4 py-3 text-left font-semibold">Designation</th>
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
                    <td className="px-4 py-2">{highlightMatch(faculty.personalData.name)}</td>
                    <td className="px-4 py-2">{faculty.personalData.designation}</td>
                    <td>
                      <button
                        onClick={() => navigate(`/profile/${faculty.user._id}`)}
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
                    colSpan="4" // Adjusted colspan
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    ❌ No faculty found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end ">
          <div className="bg-linear-to-r from-blue-700 w-fit m-2 mr-4 rounded-lg to-purple-600 " >
            <button onClick={printList} className="m-2 mx-4 text-white">Print List </button>
          </div>
        </div>
      </div>
      {/* Extract Modal */}
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
                          From 
                        </label>
                        <input
                          type="date"
                          placeholder="01-01-2015"
                          className="w-full border rounded-lg p-2"
                          value={dateFrom}
                          onChange={(e) => setdateFrom(e.target.value)}
                          min="1950"
                          max={new Date().getFullYear()}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          To 
                        </label>
                        <input
                          type="date"
                          placeholder="01-01-2025"
                          className="w-full border rounded-lg p-2"
                          value={dateTo}
                          onChange={(e) => setdateTo(e.target.value)}
                          min={dateFrom}
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
