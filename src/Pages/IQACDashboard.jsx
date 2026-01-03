import React, { useEffect, useState } from "react";
import { X, Search, FileText, Download,User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";
import { schemas, yearFields, AtKeys } from '../assets/Data';
import { useParams,useSearchParams } from "react-router-dom"
import { getRefFaculty, getReports, ofcDashBoard } from "../core/ofc"

export default function IQACDashboard() {
  const { ofcId } = useParams()
  const [ searchParams ]= useSearchParams()
  const role = searchParams.get('role')
  const [filters, setFilters] = useState({
    department: "All",
    searchTerm: "",
  });
  const [facultyList, setfacultyList] = useState([
    {
      name: "Dr. John Doe",
      department: "Computer Science and Engineering",
      role: "Professor",
      email: "john.doe@yourcollege.edu"
    },
    {
      name: "Dr. Jane Smith",
      department: "Electrical and Electronics Engineering",
      role: "Associate Professor",
      email: "jane.smith@yourcollege.edu"
    },])
  const [certifications, setCertifications] = useState([
    {
      name: "Dr. Aarti Rao",
      role: "Professor",
      dept: "Computer Science and Engineering",
      data: {
        patents: [
          {
            "Patent Number": "IN2021A000101",
            "Title of the Patent": "Neural Compression for Edge Devices",
            "Published/Granted": "Granted",
            "Year of Published/Granted": "2021",
            "Scope": "International",
            "Document": "aarti_rao_patent.pdf"
          }
        ],
        journal: [
          {
            "Title of the Paper": "Efficient Models for On-Device AI",
            "Name of the Journal": "Journal of Edge AI",
            "Page Number": "12-25",
            "Year of Publication": "2021",
            "Impact Factor": "3.2",
            "National/International": "International",
            "ISBN Number": "2345-6789",
            "Indexing Platform": "Scopus",
            "H-index": "15",
            "Document": "aarti_rao_journal.pdf"
          }
        ]
      }
    },
  ])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showExtractModal, setShowExtractModal] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [DateFrom, setDateFrom] = useState(""); // Now a date string like "2024-01-01"
  const [DateTo, setDateTo] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);  
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
  useEffect(() => {
    const getData = async () => {
      const data = await ofcDashBoard(ofcId)
      if (data) {
        setfacultyList(data)
      }
    }
    getData()
  }, [ofcId])

  useEffect(() => {
    if (isGenerating) {
      generateExcelReport();
    }
  }, [certifications]);
  //report extraction useEffects
  useEffect(() => {
    const obj = {
      branch: selectedDepartments,
      fields: selectedTypes
    }
    const getFacultyOnchange = async () => {
      const data = await getRefFaculty(obj, ofcId)
      setCertifications(data)
    }
    selectedDepartments.length > 0 && getFacultyOnchange()
  }, [selectedAttributes, selectedTypes, selectedDepartments,DateFrom,DateTo])

  // Helper: Get full list of attribute keys for a type
  const getAllAttributesForType = (typeKey) => {
    return getSchemaForType(typeKey).attributes.map(a => a.key);
  };



  // Helper: Define schema per type (label + attributes)
  const getSchemaForType = (typeKey) => {
    return schemas[typeKey] || { label: typeKey, attributes: [] };
  };

  const handleFacultyToggle = (facultyName) => {
    setSelectedMembers((prevIds) => {
      // 1. Find the user object in certifications that matches the name
      const targetUser = certifications.find(user => user.name === facultyName);
      // Safety check: if name doesn't exist in certifications, do nothing
      if (!targetUser) return prevIds;
      const targetId = targetUser.id;
      // 2. Check if the ID is already in our selection array
      if (!Array.isArray(prevIds)) {
        const Ids = Object.values(prevIds)
        prevIds = Ids;
      }
      if (prevIds.includes(targetId)) {
        // 3. REMOVE: Filter out the ID if it exi`sts
        return prevIds.filter(id => id !== targetId);
      } else {
        // 4. ADD: Push the new ID into the array
        return [...prevIds, targetId];
      }
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

  // Extract date or year from a record
  const extractDateFromRecord = (record, typeKey) => {
    // First, try to find a date field (common names)
    const dateFields = [
      "date", "eventDate", "startDate", "endDate", "submissionDate", "completionDate",
      "createdAt", "publishedAt", "attendedOn", "heldOn", "dateOfEvent", "monthYear"
    ];

    for (const field of dateFields) {
      const value = record[field];
      if (value) {
        if (typeof value === 'string') {
          // Try parsing as date
          const dateObj = new Date(value);
          if (!isNaN(dateObj.getTime())) {
            return dateObj; // Return the date object
          }
        } else if (value instanceof Date) {
          return value;
        }
      }
    }

    // If no date field found, try the year field
    const yearField = yearFields[typeKey];
    if (yearField && record[yearField] != null) {
      const yearValue = record[yearField];
      let year;
      if (typeof yearValue === 'string') {
        const yearMatch = yearValue.match(/\b(19|20)\d{2}\b/);
        if (yearMatch) {
          year = parseInt(yearMatch[0]);
        }
      } else if (typeof yearValue === 'number') {
        year = yearValue;
      }

      if (year && year >= 1900 && year <= 2100) {
        // Return a date object for January 1st of that year
        return new Date(year, 0, 1); // Month is 0-indexed (0 = January)
      }
    }

    // If no date or year found, return null
    return null;
  };

  const getFacultyForDepartmentAndCredentials = (dept, selectedCredTypes) => {
    // Only process if the department is selected
    if (!selectedDepartments.includes(dept)) {
      return [];
    }
    // Get all faculty from the department
    const facultyInDept = certifications
      .filter(faculty => (faculty.dept === dept))
      .map(faculty => faculty.name);
    if (selectedCredTypes.length === 0) {
      return facultyInDept;
    }
    // Filter based on having data for selected types
    return facultyInDept;
  };

  // Add this helper function to sanitize sheet names
  const sanitizeSheetName = (name) => {
    // Remove characters not allowed in Excel sheet names
    return name.replace(/[:\\/?*\[\]]/g, ' ');
  };

  // Then in your generateExcelReport function, update the sheet name line:
  const generateExcelReport = async () => {
    // Validate inputs
    if (selectedTypes.length === 0) {
      alert("Please select at least one report type.");
      return;
    }

    if (selectedDepartments.length === 0) {
      alert("Please select at least one department.");
      return;
    }

    // Count selected faculty members
    const totalSelectedMembers = Object.values(selectedMembers).reduce(
      (sum, arr) => sum + arr.length, 0
    );

    if (totalSelectedMembers === 0) {
      alert("Please select at least one faculty member.");
      return;
    }

    // Validate date range
    if (!DateFrom || !DateTo) {
      alert("Please select both From Date and To Date.");
      return;
    }

    const fromDate = new Date(DateFrom);
    const toDate = new Date(DateTo);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      alert("Please enter valid dates.");
      return;
    }

    if (fromDate > toDate) {
      alert("From Date cannot be after To Date.");
      return;
    }

    setIsGenerating(true);

    try {
      const wb = XLSX.utils.book_new();
      const usedSheetNames = new Set();
      let hasData = false; // Track if any data was added

      selectedTypes.forEach(typeKey => {
        const schema = getSchemaForType(typeKey);
        let selectedAttrs = selectedAttributes[typeKey] || [];
        const nromalizesAttr=selectedAttrs.map((attr)=>(attr.toLowerCase().replace( /[^\w]/g,"_")))
        selectedAttrs=nromalizesAttr;
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
        console.log("certification data was :",certifications);
        
        // First, filter certifications by selected departments AND selected faculty members
        const relevantFaculty = certifications.filter(faculty => {
          // Check if faculty's department is in selectedDepartments
          if (!selectedDepartments.includes(faculty.dept)) {
            return false;
          }

          // Check if faculty's name is in selected members for their department
          const selectedInDept = selectedMembers.includes(faculty.id) || [];
          if (!selectedInDept) {
            return false;
          }
          return true;
        });
        // Process only the filtered faculty
        relevantFaculty.forEach(faculty => {
          if (faculty.data && faculty.data[typeKey]) {
            faculty.data[typeKey].forEach(record => {
              const dept = faculty.dept || "Others";
              if (!departmentData[dept]) departmentData[dept] = [];

              const row = [faculty.name, faculty.role];
              selectedAttrs.forEach(attrKey => {
                const value = record[attrKey];
                row.push(value !== undefined && value !== null ? value : "");
              });
              departmentData[dept].push(row);
            });
          }
        });
        console.log(relevantFaculty);
        // Check if any data was collected
        const hasDataForType = Object.values(departmentData).some(rows => rows.length > 0);
        if (!hasDataForType) return;

        hasData = true; // Mark that we have some data

        const sheetData = [];
        const borderRanges = [];

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

        // ... rest of your styling code remains the same ...

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

      if (!hasData) {
        alert("No data found for the selected criteria. Please check your filters.");
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
    // Prevent form submission if required fields are empty
    if (!DateFrom || !DateTo) {
      alert("Please select both From Date and To Date.");
      return;
    }
    const obj = {
      fields: selectedTypes,
      subfields: selectedAttributes,
      ids:Array.isArray(selectedMembers) ? selectedMembers:Object.values(selectedMembers),
      from_date: DateFrom,
      to_date: DateTo
    }
    const data = await getReports(obj, ofcId)
    console.log("data was :",data);
    
    setCertifications(data)
    setIsGenerating(true)
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
        {role ? role : 'Officials'} DashBoard
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
              {/* <th className="px-4 py-3 text-left font-semibold"></th> */}
            </tr>
          </thead>
          <tbody>
            {paginatedFaculty.length > 0 ? (
              paginatedFaculty.map((f, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-gray-50 hover:bg-purple-50 transition">
                  <td className="px-4 py-2">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                  <td className="px-4 py-2">{highlightMatch(f.name)}</td>
                  <td className="px-4 py-2">{f.department}</td>
                  <td className="px-4 py-2">{f.role}</td><td>
                    {/* <button
                      onClick={() => navigate(`/profile/${f._id}`)}
                      className="inline-flex items-center gap-1.5 px-2 py-1 text-md font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition shadow-sm"
                    >
                      <User size={14} />
                      view
                    </button> */}
                  </td>
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
          <div className="flex justify-end ">
            <div className="bg-linear-to-r from-blue-700 w-fit m-2 mr-4 rounded-lg to-purple-600 " >
              <button onClick={printList} className="m-2 mx-4 text-white">Print List </button>
            </div>
          </div>
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

                    {/* Date Range */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          From Date
                        </label>
                        <input
                          type="date"
                          className="w-full border rounded-lg p-2"
                          value={DateFrom}
                          onChange={(e) => setDateFrom(e.target.value)}
                          required={true}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          To Date
                        </label>
                        <input
                          type="date"
                          className="w-full border rounded-lg p-2"
                          value={DateTo}
                          required={true}
                          onChange={(e) => setDateTo(e.target.value)}
                          min={DateFrom || undefined} // Set min date to DateFrom if it exists
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
                                        onChange={() => handleFacultyToggle(facultyName)}
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
                    {selectedDepartments.length === 0 && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                        <p className="text-yellow-700 text-sm">
                          ⚠️ Please select at least one department to continue.
                        </p>
                      </div>
                    )}

                    {Object.values(selectedMembers).every(arr => arr.length === 0) && selectedDepartments.length > 0 && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                        <p className="text-yellow-700 text-sm">
                          ⚠️ Please select at least one faculty member from the departments.
                        </p>
                      </div>
                    )}

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
  );}