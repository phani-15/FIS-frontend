import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function HodDashBoard() {
  // --- Sample Faculty List (Replace with API data or props) ---
  const [facultyList] = useState([
    { name: "Dr. Aruna Kumari", role: "Professor", dept: "CSE" },
    { name: "Mr. Ravi Kumar", role: "Assistant Professor", dept: "AI&DS" },
    { name: "Mrs. Meghana", role: "Assistant Professor", dept: "IT" },
  ]);

  // --- Modal State ---
  const [showExtractModal, setShowExtractModal] = useState(false);

  return (
    <div className="w-full px-6 py-6">
      {/* HEADER */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        HOD Dashboard
      </h1>

      {/* SUMMARY ROW */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-medium">
          Total Faculty:{" "}
          <span className="font-normal">
            {facultyList.length}
          </span>
        </p>

        {/* Extract Report BUTTON */}
        <button
          onClick={() => setShowExtractModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Extract Reports
        </button>
      </div>

      {/* FACULTY TABLE */}
      <div className="overflow-hidden rounded-2xl border shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">Designation</th>
              <th className="p-3 font-semibold">Department</th>
            </tr>
          </thead>

          <tbody>
            {facultyList.map((f, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{f.name}</td>
                <td className="p-3">{f.role}</td>
                <td className="p-3">{f.dept}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ============================
          EXTRACT REPORTS MODAL 
      ================================= */}
      <AnimatePresence>
        {showExtractModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Extract Report
                </h2>
                <button
                  onClick={() => setShowExtractModal(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Modal Form */}
              <form className="space-y-4">

                {/* Report Type */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Report Type
                  </label>
                  <select className="w-full border rounded-lg p-2">
                    <option>Patents</option>
                    <option>Journal Publications</option>
                    <option>Book Chapters</option>
                    <option>Conferences</option>
                    <option>Certifications</option>
                    <option>Consultancy</option>
                    <option>Funded Projects</option>
                    <option>Workshops / FDP / STTP</option>
                    <option>Memberships (IEEE / ACM / CSI)</option>
                  </select>
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
                    />
                  </div>
                </div>

                {/* Faculty Selection */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Faculty
                  </label>
                  <select className="w-full border rounded-lg p-2">
                    <option value="all">All Faculty</option>
                    {facultyList.map((f, idx) => (
                      <option key={idx}>
                        {f.name} — {f.role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowExtractModal(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Extract
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

[
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

  import React, { useState } from "react";
import { Search, X, User, ChevronDown, ShieldCheck, XCircle, ChevronUp, FileText } from "lucide-react"; // Added FileText icon
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion";
// Removed unused imports: import { td, tr } from "framer-motion/client";

export default function HODDashBoard() {
  const [filters, setFilters] = useState({ searchTerm: "" });

  const navigate = useNavigate()

  // --- State for report modal ---
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState({});

  // Helper: Get full list of attribute keys for a type
  const getAllAttributesForType = (typeKey) => {
    return getSchemaForType(typeKey).attributes.map(a => a.key);
  };

  // Helper: Define schema per type (label + attributes)
  const getSchemaForType = (typeKey) => {
    const schemas = {
      patents: {
        label: "Patents",
        attributes: [
          { key: "Patent Number", label: "Patent Number", required: true },
          { key: "Title of the Patent", label: "Title", required: true },
          { key: "Published/Granted", label: "Status", required: true },
          { key: "Year of Published/Granted", label: "Year", required: true },
          { key: "National/International", label: "Scope", required: true },
        ],
      },
      journal: {
        label: "Journal Publications",
        attributes: [
          { key: "Title of the Paper", label: "Paper Title", required: true },
          { key: "Name of the Journal", label: "Journal Name", required: true },
          { key: "Year of Publication", label: "Year", required: true },
          { key: "Impact Factor", label: "Impact Factor", required: false },
          { key: "ISSN Number", label: "ISSN", required: false },
          { key: "Indexing Platform", label: "Indexing", required: false },
          { key: "H-index", label: "H-index", required: false },
        ],
      },
      book: {
        label: "Books",
        attributes: [
          { key: "Title of the Book", label: "Book Title", required: true },
          { key: "Name of the Publisher", label: "Publisher", required: true },
          { key: "Year of Publication", label: "Year", required: true },
          { key: "ISBN Number", label: "ISBN", required: false },
        ],
      },
      book_chapter: {
        label: "Book Chapters",
        attributes: [
          { key: "Title of the Book Chapter", label: "Chapter Title", required: true },
          { key: "Name of the Publisher", label: "Publisher", required: true },
          { key: "Year of Publication", label: "Year", required: true },
          { key: "ISBN Number", label: "ISBN", required: false },
        ],
      },
      conference: {
        label: "Conferences",
        attributes: [
          { key: "Title of the Paper", label: "Paper Title", required: true },
          { key: "Title of the Conference", label: "Conference", required: true },
          { key: "Date of Publication", label: "Date", required: false },
          { key: "Organized by", label: "Organizer", required: true },
        ],
      },
      certifications: {
        label: "Certifications",
        attributes: [
          { key: "Name of Certification Course", label: "Course Name", required: true },
          { key: "Type of Certification", label: "Type", required: true },
          { key: "Organized by", label: "Organizer", required: true },
          { key: "Duration (in days)", label: "Duration (days)", required: false },
        ],
      },
      workshop: {
        label: "Workshops",
        attributes: [
          { key: "Program Title", label: "Title", required: true },
          { key: "Year", label: "Year", required: true },
          { key: "Organizing Body", label: "Organizer", required: true },
          { key: "Attended/Organized", label: "Role", required: true },
        ],
      },
      fdp: {
        label: "FDP / STTP",
        attributes: [
          { key: "Program Title", label: "Title", required: true },
          { key: "Year", label: "Year", required: true },
          { key: "Organizing Body", label: "Organizer", required: true },
          { key: "Mode (Online/Offline)", label: "Mode", required: true },
          { key: "Attended/Organized", label: "Role", required: true },
        ],
      },
      webinar: {
        label: "Webinars",
        attributes: [
          { key: "Program Title", label: "Title", required: true },
          { key: "Year", label: "Year", required: true },
          { key: "Organizing Body", label: "Organizer", required: true },
          { key: "Mode (Online/Offline)", label: "Mode", required: true },
          { key: "Attended/Organized", label: "Role", required: true },
        ],
      },
      OC: {
        label: "Orientation Courses",
        attributes: [
          { key: "Program Title", label: "Title", required: true },
          { key: "Year", label: "Year", required: true },
          { key: "Organizing Body", label: "Organizer", required: true },
          { key: "Mode (Online/Offline)", label: "Mode", required: true },
          { key: "Attended/Organized", label: "Role", required: true },
        ],
      },
      keynote: {
        label: "Keynote Talks",
        attributes: [
          { key: "Conference Title", label: "Event", required: true },
          { key: "Name of the Event", label: "Event Name", required: true },
          { key: "Date", label: "Date", required: false },
          { key: "Topic / Title of Talk", label: "Talk Title", required: true },
          { key: "Mode", label: "Mode", required: true },
        ],
      },
      talk: {
        label: "Expert Talks",
        attributes: [
          { key: "Event Title", label: "Event", required: true },
          { key: "Name of the Event", label: "Event Name", required: true },
          { key: "Date", label: "Date", required: false },
          { key: "Topic / Title of Talk", label: "Talk Title", required: true },
          { key: "Mode", label: "Mode", required: true },
        ],
      },
      award_title: {
        label: "Awards & Recognitions",
        attributes: [
          { key: "Award / Recognition Title", label: "Award Title", required: true },
          { key: "Granting Organization / Institution", label: "Institution", required: true },
          { key: "Year", label: "Year", required: true },
        ],
      },
      research: {
        label: "Research Projects",
        attributes: [
          { key: "Project Title", label: "Title", required: true },
          { key: "Year of Sanction", label: "Sanction Year", required: true },
          { key: "Duration (in months)", label: "Duration (months)", required: false },
          { key: "Funding Agency", label: "Agency", required: true },
          { key: "Fund Received (in INR)", label: "Amount (₹)", required: false },
          { key: "Are you", label: "Role (PI/Co-PI)", required: true },
          { key: "Status", label: "Status", required: true },
        ],
      },
      sponsored: {
        label: "Sponsored Projects",
        attributes: [
          { key: "Project Title", label: "Title", required: true },
          { key: "Funding Details", label: "Funding Agency", required: true },
          { key: "Amount (in INR)", label: "Amount (₹)", required: true },
          { key: "Duration (in months)", label: "Duration (months)", required: false },
          { key: "Status", label: "Status", required: true },
          { key: "Academic Year", label: "Academic Year", required: false },
        ],
      },
      consultancy: {
        label: "Consultancy",
        attributes: [
          { key: "Project Title", label: "Title", required: true },
          { key: "Year of Sanction", label: "Sanction Year", required: true },
          { key: "Duration (in months)", label: "Duration (months)", required: false },
          { key: "Name of Funding Agency", label: "Client", required: true },
          { key: "Amount (in INR)", label: "Amount (₹)", required: true },
          { key: "Are you ", label: "Role", required: true },
        ],
      },
      phd_awarded: {
        label: "PhD Students Awarded",
        attributes: [
          { key: "Year of Awarding", label: "Year", required: true },
          { key: "Number of Students", label: "Count", required: true },
        ],
      },

      // Add seminar, etc. if needed (similar to workshop)
    };
    return schemas[typeKey] || { label: typeKey, attributes: [] };
  };

  // --- Start of Data (certifications) ---
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
  // --- End of Data (certifications) ---

  const [showExtractModal, setShowExtractModal] = useState(false);

  const [facultyList, setFacultyList] = useState([
    { name: "Dr. John Doe", role: "Professor" },
    { name: "Dr. Jane Smith", role: "Associate Professor" },
    { name: "Dr. Mike Johnson", role: "Assistant Professor" },
    { name: "Dr. Emily Davis", role: "Lecturer" },
    { name: "Dr. William Brown", role: "Professor" },
    { name: "Dr. Olivia Wilson", role: "Assistant Professor" },
    { name: "Dr. Henry Taylor", role: "Lecturer" },
    { name: "Dr. Sophia Martinez", role: "Researcher" },
    { name: "Dr. Daniel Anderson", role: "Professor" },
    { name: "Dr. Grace Lee", role: "Assistant Professor" },
    { name: "Dr. Benjamin Harris", role: "Lecturer" },
    { name: "Dr. Patrick Hall", role: "Researcher" },
    { name: "Dr. Brenda Allen", role: "Assistant Professor" },
    { name: "Dr. Steven Young", role: "Lecturer" },
    { name: "Dr. Kimberly Scott", role: "Professor" },
    { name: "Dr. Charles Adams", role: "Professor" },
    { name: "Dr. Victoria Perez", role: "Assistant Professor" },
    { name: "Dr. Jonathan Hall", role: "Researcher" },
    { name: "Dr. Samantha Allen", role: "Lecturer" },
    { name: "Dr. Brian Mitchell", role: "Associate Professor" },
  ]);

  const [registeredList, setRegisteredList] = useState([
    { name: "Dr. Henry Taylor", role: "Lecturer" },
    { name: "Dr. Sophia Martinez", role: "Researcher" },
    { name: "Dr. Daniel Anderson", role: "Professor" },
    { name: "Dr. Grace Lee", role: "Assistant Professor" },
    { name: "Dr. Benjamin Harris", role: "Lecturer" },
    { name: "Dr. Patrick Hall", role: "Researcher" },
    { name: "Dr. Brenda Allen", role: "Assistant Professor" },
  ])

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

  const verifyFac = (idx) => {
    // verify faculty
    const facultyToVerify = registeredList[idx]

    if (confirm("Verify " + facultyToVerify.name)) {
      // remove from the registered faculty
      setRegisteredList(prevList =>
        prevList.filter((_, i) => i !== idx))


      //added to the facultyList
      setFacultyList(prevList =>
        [...prevList, facultyToVerify]
      );
    }
  }

  const removeFac = (idx) => {
    // remove faculty from the list
    const fac = registeredList[idx].name
    if (confirm("Are you sure to deny " + fac + "?")) {
      setRegisteredList(prevList =>
        prevList.filter((_, i) => i !== idx))
    }
  }

  const [expand, setExpand] = useState(false)

  // --- New function for "Extract Reports" button ---
  const handleExtractReports = () => {
    // Logic for generating and extracting reports goes here.
    // This is just a placeholder. You would typically:
    // 1. Send an API request to the backend to generate a report (e.g., CSV, PDF).
    // 2. Handle the file download in the browser.
    alert("Report extraction initiated! (Placeholder action)");
  };
  // --------------------------------------------------


  return (
    <div className="p-2 mx-auto max-w-6xl  lg:text-sm rounded-3xl space-y-6">
      <h1 className="text-2xl lg:text-4xl font-serif font-semibold mb-2 text-center text-indigo-800 tracking-wide drop-shadow">
        HOD DashBoard
      </h1>

      <div className="flex flex-col">
        <div className="mb-8 mt-4 border border-gray-200 rounded-2xl overflow-hidden shadow-md bg-linear-to-br from-slate-50 via-white to-slate-100">
          {/* Header */}
          <button
            onClick={() => setExpand(!expand)}
            className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-slate-700 bg-linear-to-r from-blue-50 via-indigo-50 to-blue-100 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 rounded bg-blue-500 shadow-sm" />
              <span className="text-base tracking-wide">Registered Faculty</span>
            </div>
            <motion.div
              animate={{ rotate: expand ? 180 : 0 }} // Corrected animation property
              transition={{ duration: 0.25 }}
            >
              {expand ? <ChevronDown className="text-blue-600" /> : <ChevronUp className="text-blue-600" />}
            </motion.div>
          </button>

          {/* Animated Expansion */}
          <AnimatePresence>
            {expand && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-white/80 backdrop-blur-sm"
              >
                <div className="px-6 py-4 overflow-x-auto">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200">
                        <th className="px-4 py-3 text-left text-slate-700 font-semibold">#</th>
                        <th className="px-4 py-3 text-left text-slate-700 font-semibold">Name</th>
                        <th className="px-4 py-3 text-left text-slate-700 font-semibold">Role</th>
                        <th className="px-4 py-3 text-center text-slate-700 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registeredList.map((faculty, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-200"
                        >
                          <td className="px-4 py-3 text-gray-500 font-medium">{idx + 1}</td>
                          <td className="px-4 py-3 text-gray-800 font-semibold">{faculty.name}</td>
                          <td className="px-4 py-3 text-gray-600">{faculty.role}</td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex justify-center gap-3">
                              <button
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-sm transition-all duration-200"
                                aria-label="Verify faculty"
                                onClick={() => verifyFac(idx)}
                              >
                                <ShieldCheck className="w-3.5 h-3.5" /> Verify
                              </button>
                              <button
                                onClick={() => removeFac(idx)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-sm transition-all duration-200"
                                aria-label="Decline faculty"
                              >
                                <XCircle className="w-3.5 h-3.5" /> Decline
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {registeredList.length === 0 && (
                    <div className="py-5 text-center text-slate-500 italic text-sm">
                      No registered faculty found.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Styled Extract Reports Button */}
        <div className="flex justify-start pr-2 md:pr-0">
          <button
            onClick={() => setShowExtractModal(true)}
            className="flex items-center gap-2 px-4 py-2 font-bold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <FileText size={20} />
            Extract Reports
          </button>
        </div>
        {/* End of Styled Button */}

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
                <th className="px-4 py-3 text-left font-semibold">Role</th>
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
      </div>
      
      <AnimatePresence>
        {showExtractModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50"
              onClick={() => setShowExtractModal(false)}
            />

            {/* Modal Sheet (slides from top) */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed top-10 left-1/2  -translate-x-1/2 z-50 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
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

                {/* Scrollable Content */}
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
                                  // Initialize attribute selection for this type (all true by default)
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

                                {/* Select All / None */}
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

                                {/* Attribute Checkboxes */}
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
                        />
                      </div>
                    </div>

                    {/* Faculty Selection */}
                    {/* <div>
                  <label className="block text-sm font-medium mb-1">
                    Faculty
                  </label>
                  <select className="w-full border rounded-lg p-2">
                    <option value="all">All Faculty</option>
                    {facultyList.map((f, idx) => (
                      <option key={idx}>
                        {f.name} — {f.role}
                      </option>
                    ))}
                  </select>
                </div> */}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setShowExtractModal(false)}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                      >
                        Extract
                      </button>
                    </div>
                  </form>
                </div>

                {/* Footer (sticky actions) */}
                {/* <div className="border-t bg-gray-50 px-6 py-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowExtractModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm"
            >
              Extract Report
            </button>
          </div> */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}