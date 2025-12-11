import React, { useState } from "react";
import { Search, X, User, ChevronDown, ShieldCheck, XCircle, ChevronUp, FileText, Download } from "lucide-react";
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx"; // Import XLSX library
import {schemas,yearFields} from '../assets/Data'

export default function HODDashBoard() {
  const [filters, setFilters] = useState({ searchTerm: "" });
  const navigate = useNavigate();

  // --- State for report modal ---
  const [showExtractModal, setShowExtractModal] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

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

  // --- Data and other state remains the same ---
  const certifications = [
    {
      name: "Dr. John Doe",
      role: "Professor",
      data: {
        patents: [
          {
            "Patent Number": "IN2023A001234",
            "Title of the Patent": "AI-Based Smart Irrigation System",
            "Published/Granted": "Granted",
            "Year of Published/Granted": "2023",
            "National/International": "National",
            "Document": "john_doe_patent.pdf"
          }
        ],
        journal: [
          {
            "Title of the Paper": "Deep Learning for Smart Agriculture",
            "Name of the Journal": "International Journal of AI Research",
            "Page Number": "45-58",
            "Year of Publication": "2022",
            "Impact Factor": "4.5",
            "National/International": "International",
            "ISSN Number": "2456-7899",
            "Indexing Platform": "Scopus",
            "H-index": "22",
            "Document": "john_doe_journal.pdf"
          }
        ],
        book: [
          {
            "Title of the Book": "Advanced Machine Learning Techniques",
            "Name of the Publisher": "TechWorld Publications",
            "Year of Publication": "2021",
            "National/International": "International",
            "ISBN Number": "978-93-12345-67-8",
            "Document": "john_doe_book.pdf"
          }
        ]
      }
    },

    {
      name: "Dr. Jane Smith",
      role: "Associate Professor",
      data: {
        conference: [
          {
            "Title of the Paper": "Secure IoT Networks",
            "Title of the Conference": "IEEE ICC 2022",
            "Date of Publication": "2022-06-12",
            "Organized by": "IEEE",
            "National/International": "International",
            "Document": "jane_smith_conference.pdf"
          }
        ],
        award_title: [
          {
            "Award / Recognition Title": "Excellence in Research Award",
            "Granting Organization / Institution": "IETE",
            "Year": "2023",
            "Document": "jane_smith_award.pdf"
          }
        ]
      }
    },

    {
      name: "Dr. Mike Johnson",
      role: "Assistant Professor",
      data: {
        certifications: [
          {
            "Name of Certification Course": "Cloud Computing Essentials",
            "Type of Certification": "Professional",
            "Organized by": "AWS Academy",
            "Duration (in days)": "7"
          }
        ],
        patents: [
          {
            "Patent Number": "US2024A004321",
            "Title of the Patent": "Hybrid Cloud Resource Optimizer",
            "Published/Granted": "Published",
            "Year of Published/Granted": "2024",
            "National/International": "International",
            "Document": "mike_johnson_patent.pdf"
          }
        ]
      }
    },

    {
      name: "Dr. Emily Davis",
      role: "Lecturer",
      data: {
        workshop: [
          {
            "Program Title": "AI Tools for Educators",
            "Year": "2023",
            "Scope": "National",
            "Organizing Body": "NIT Trichy",
            "Mode (Online/Offline)": "Online",
            "Venue": "NIT Trichy",
            "Attended/Organized": "Attended"
          }
        ]
      }
    },

    {
      name: "Dr. William Brown",
      role: "Professor",
      data: {
        book_chapter: [
          {
            "Title of the Book Chapter": "Quantum Computing — Foundations",
            "Name of the Publisher": "Springer",
            "Year of Publication": "2022",
            "National/International": "International",
            "ISBN Number": "978-81-33456-22-1",
            "No. of Authors": "2",
            "Document": "brown_bookchapter.pdf"
          }
        ]
      }
    },

    {
      name: "Dr. Olivia Wilson",
      role: "Assistant Professor",
      data: {
        journal: [
          {
            "Title of the Paper": "Edge Computing for Healthcare",
            "Name of the Journal": "Journal of Embedded Systems",
            "Page Number": "15-28",
            "Year of Publication": "2023",
            "Impact Factor": "2.9",
            "National/International": "International",
            "ISSN Number": "2394-8899",
            "Indexing Platform": "SCI",
            "H-index": "8",
            "Document": "olivia_journal.pdf"
          }
        ]
      }
    },

    {
      name: "Dr. Henry Taylor",
      role: "Lecturer",
      data: {
        seminar: [
          {
            "Program Title": "Cybersecurity Trends",
            "Year": "2022",
            "Scope": "Institutional",
            "Organizing Body": "IIT Hyderabad",
            "Mode (Online/Offline)": "Offline",
            "Venue": "IIT Hyderabad",
            "Attended/Organized": "Attended"
          }
        ]
      }
    },

    {
      name: "Dr. Sophia Martinez",
      role: "Researcher",
      data: {
        research: [
          {
            "Project Title": "AI-Driven Environmental Monitoring",
            "Year of Sanction": "2023",
            "Duration (in months)": "24",
            "Funding Agency": "DRDO",
            "Fund Received (in INR)": "1200000",
            "Are you": "PI",
            "Status": "Ongoing",
            "Document": "sophia_research.pdf"
          }
        ]
      }
    },

    {
      name: "Dr. Daniel Anderson",
      role: "Professor",
      data: {
        keynote: [
          {
            "Conference Title": "IEEE Future Tech 2023",
            "Name of the Event": "Future Innovations Summit",
            "Date": "2023-09-08",
            "Topic / Title of Talk": "AI in Space Science",
            "Scope": "International",
            "Mode": "Offline",
            "Venue": "Bengaluru",
            "Document": "daniel_keynote.pdf"
          }
        ]
      }
    },

    {
      name: "Dr. Grace Lee",
      role: "Assistant Professor",
      data: {
        patents: [
          {
            "Patent Number": "IN2022A005678",
            "Title of the Patent": "Smart Classroom Automation System",
            "Published/Granted": "Published",
            "Year of Published/Granted": "2022",
            "National/International": "National",
            "Document": "grace_patent.pdf"
          }
        ]
      }
    },

    {
      name: "Dr. Benjamin Harris",
      role: "Lecturer",
      data: {
        talk: [
          {
            "Event Title": "ML for Beginners",
            "Name of the Event": "AI Awareness Program",
            "Date": "2023-05-18",
            "Topic / Title of Talk": "Introduction to Machine Learning",
            "Scope": "National",
            "Mode": "Online",
            "Venue": "Virtual",
            "Document": "ben_harris_talk.pdf"
          }
        ]
      }
    },

    {
      name: "Dr. Patrick Hall",
      role: "Researcher",
      data: {
        ieee: [
          {
            "Organization Name": "IEEE",
            "Membership ID (if any)": "IEEE123456",
            "Membership Type (Life/Annual/Student)": "Annual",
            "Year Joined": "2021",
            "Validity Period (if applicable)": "2025",
            "Document": "patrick_ieee.pdf"
          }
        ]
      }
    },

    {
      name: "Dr. Brenda Allen",
      role: "Assistant Professor",
      data: {
        csi: [
          {
            "Organization Name": "Computer Society of India",
            "Membership ID (if any)": "CSI998877",
            "Membership Type": "Annual",
            "Year Joined": "2022",
            "Validity Period (if applicable)": "2024",
            "Document": "brenda_csi.pdf"
          }
        ]
      }
    },

    {
      name: "Dr. Steven Young",
      role: "Lecturer",
      data: {
        webinar: [
          {
            "Program Title": "Blockchain Basics",
            "Year": "2024",
            "Scope": "Institutional",
            "Organizing Body": "NASSCOM",
            "Mode (Online/Offline)": "Online",
            "Venue": "Virtual",
            "Attended/Organized": "Attended"
          }
        ]
      }
    },

    {
      name: "Dr. Kimberly Scott",
      role: "Professor",
      data: {
        sponsored: [
          {
            "Project Title": "IoT-Enabled Smart City Monitoring",
            "Funding Details": "DST",
            "Amount (in INR)": "2500000",
            "Duration (in months)": "36",
            "Status": "Completed",
            "Academic Year": "2021-22",
            "Document": "kimberly_sponsored.pdf"
          }
        ]
      }
    },

    {
      name: "Dr. Charles Adams",
      role: "Professor",
      data: {
        phd_awarded: [
          {
            "Year of Awarding": "2022",
            "Number of Students": "3"
          }
        ]
      }
    },

    {
      name: "Dr. Victoria Perez",
      role: "Assistant Professor",
      data: {
        fdp: [
          {
            "Program Title": "Advanced Python Programming",
            "Year": "2023",
            "Scope": "National",
            "Organizing Body": "IIT Madras",
            "Mode (Online/Offline)": "Online",
            "Venue": "Virtual",
            "Attended/Organized": "Attended"
          }
        ]
      }
    },

    {
      name: "Dr. Jonathan Hall",
      role: "Researcher",
      data: {
        repository: [
          {
            "Content Title": "Computer Vision Dataset",
            "Platform / Repository Name": "GitHub",
            "Associated Course/Subject": "Machine Learning",
            "Date / Year": "2023",
            "Link": "https://github.com/sample"
          }
        ]
      }
    },

    {
      name: "Dr. Samantha Allen",
      role: "Lecturer",
      data: {
        OC: [
          {
            "Program Title": "Digital Teaching Tools",
            "Year": "2022",
            "Scope": "Institutional",
            "Organizing Body": "JNTUGV",
            "Mode (Online/Offline)": "Offline",
            "Venue": "JNTUGV",
            "Attended/Organized": "Attended"
          }
        ]
      }
    },

    {
      name: "Dr. Brian Mitchell",
      role: "Associate Professor",
      data: {
        consultancy: [
          {
            "Project Title": "AI-Based Traffic Control",
            "Year of Sanction": "2023",
            "Duration (in months)": "6",
            "Name of Funding Agency": "State R&D Cell",
            "Amount (in INR)": "300000",
            "Are you ": "Consultant",
            "Status": "Ongoing",
            "Document": "mitchell_consultancy.pdf"
          }
        ]
      }
    }
  ];

  const [facultyList, setFacultyList] = useState([
    { name: "Dr. John Doe", role: "Professor", mail: "jdoe@university.edu" },
    { name: "Dr. Jane Smith", role: "Associate Professor", mail: "jsmith@university.edu" },
    { name: "Dr. Mike Johnson", role: "Assistant Professor", mail: "mjohnson@university.edu" },
    { name: "Dr. Emily Davis", role: "Lecturer", mail: "edavis@university.edu" },
    { name: "Dr. William Brown", role: "Professor", mail: "wbrown@university.edu" },
    { name: "Dr. Olivia Wilson", role: "Assistant Professor", mail: "owilson@university.edu" },
    { name: "Dr. Henry Taylor", role: "Lecturer", mail: "htaylor@university.edu" },
    { name: "Dr. Sophia Martinez", role: "Researcher", mail: "smartinez@university.edu" },
    { name: "Dr. Daniel Anderson", role: "Professor", mail: "danderson@university.edu" },
    { name: "Dr. Grace Lee", role: "Assistant Professor", mail: "glee@university.edu" },
    { name: "Dr. Benjamin Harris", role: "Lecturer", mail: "bharris@university.edu" },
    { name: "Dr. Patrick Hall", role: "Researcher", mail: "phall@university.edu" },
    { name: "Dr. Brenda Allen", role: "Assistant Professor", mail: "ballen@university.edu" },
    { name: "Dr. Steven Young", role: "Lecturer", mail: "syoung@university.edu" },
    { name: "Dr. Kimberly Scott", role: "Professor", mail: "kscott@university.edu" },
    { name: "Dr. Charles Adams", role: "Professor", mail: "cadams@university.edu" },
    { name: "Dr. Victoria Perez", role: "Assistant Professor", mail: "vperez@university.edu" },
    { name: "Dr. Jonathan Hall", role: "Researcher", mail: "jhall@university.edu" },
    { name: "Dr. Samantha Allen", role: "Lecturer", mail: "sallen@university.edu" },
    { name: "Dr. Brian Mitchell", role: "Associate Professor", mail: "bmitchell@university.edu" }
  ]
  );

  // Filter faculty list by search term
  const filteredFaculty = facultyList.filter((f) =>
    f.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
  );

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
                    <td className="px-4 py-2">{highlightMatch(faculty.name)}</td>
                    <td className="px-4 py-2">{faculty.role}</td>
                    <td>
                      <button
                        onClick={() => navigate('/profile')}
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
