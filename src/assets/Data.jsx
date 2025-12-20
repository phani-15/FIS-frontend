const yearFields = {
  patents: "Year of Published/Granted",
  journal: "Year of Publication",
  book: "Year of Publication",
  book_chapter: "Year of Publication",
  conference: "Date of Publication",
  seminar: "Year",
  workshop: "Year",
  fdp: "Year",
  webinar: "Year",
  OC: "Year",
  keynote: "Date",
  talk: "Date",
  certifications: null,
  award_title: "Year",
  research: "Year of Sanction",
  sponsored: "Academic Year",
  consultancy: "Year of Sanction",
  phd_awarded: "Year of Awarding",
  ieee: "Year Joined",
  csi: "Year Joined",
  repository: "Date / Year",
};

export const certifications = [
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

  {
    name: "Dr. Ramesh Gupta",
    role: "Associate Professor",
    dept: "Electronics and Communication Engineering",
    data: {
      conference: [
        {
          "Title of the Paper": "Low-Power RF Design for IoT",
          "Title of the Conference": "IEEE ICC 2022",
          "Date of Publication": "2022-06-15",
          "Organized by": "IEEE",
          "National/International": "International",
          "Document": "ramesh_gupta_conf.pdf"
        }
      ],
      book_chapter: [
        {
          "Title of the Book Chapter": "RF Front-End Techniques",
          "Name of the Publisher": "Springer",
          "Year of Publication": "2022",
          "National/International": "International",
          "ISBN Number": "978-81-32222-33-1",
          "No. of Authors": "2",
          "Document": "ramesh_gupta_chapter.pdf"
        }
      ]
    }
  },

  {
    name: "Dr. Leela Menon",
    role: "Assistant Professor",
    dept: "Information Technology Engineering",
    data: {
      certifications: [
        {
          "Name of Certification Course": "Full Stack Web Development",
          "Type of Certification": "Professional",
          "Organized by": "Coursera",
          "Duration (in days)": "30"
        }
      ],
      workshop: [
        {
          "Program Title": "Modern JavaScript Frameworks",
          "Year": "2023",
          "Scope": "National",
          "Organizing Body": "IIIT Bangalore",
          "Mode (Online/Offline)": "Online",
          "Venue": "Virtual",
          "Attended/Organized": "Attended"
        }
      ]
    }
  },

  {
    name: "Dr. Vikram Singh",
    role: "Professor",
    dept: "Electrical and Electronics Engineering",
    data: {
      sponsored: [
        {
          "Project Title": "Smart Grid Stability Analysis",
          "Funding Details": "DST",
          "Amount (in INR)": "3200000",
          "Duration (in months)": "36",
          "Status": "Ongoing",
          "Academic Year": "2023-24",
          "Document": "vikram_singh_sponsored.pdf"
        }
      ],
      journal: [
        {
          "Title of the Paper": "Stability Control for Renewable-Rich Grids",
          "Name of the Journal": "International Journal of Power Systems",
          "Page Number": "101-118",
          "Year of Publication": "2022",
          "Impact Factor": "4.1",
          "National/International": "International",
          "ISBN Number": "0976-4518",
          "Indexing Platform": "SCI",
          "H-index": "28",
          "Document": "vikram_singh_journal.pdf"
        }
      ]
    }
  },

  {
    name: "Dr. Priya Nair",
    role: "Lecturer",
    dept: "Mechanical Engineering",
    data: {
      fdp: [
        {
          "Program Title": "Finite Element Methods — Advanced",
          "Year": "2022",
          "Scope": "National",
          "Organizing Body": "IIT Madras",
          "Mode (Online/Offline)": "Online",
          "Venue": "Virtual",
          "Attended/Organized": "Attended"
        }
      ],
      talk: [
        {
          "Event Title": "Sustainable Manufacturing",
          "Name of the Event": "Industry-Academia Conclave",
          "Date": "2023-03-10",
          "Topic / Title of Talk": "Lean Manufacturing for SMEs",
          "Scope": "National",
          "Mode": "Offline",
          "Venue": "Mumbai",
          "Document": "priya_nair_talk.pdf"
        }
      ]
    }
  },

  {
    name: "Dr. Manoj Kumar",
    role: "Associate Professor",
    dept: "Civil Engineering",
    data: {
      research: [
        {
          "Project Title": "Resilient Coastal Structures",
          "Year of Sanction": "2021",
          "Duration (in months)": "30",
          "Funding Agency": "MoES",
          "Fund Received (in INR)": "1800000",
          "Are you": "PI",
          "Status": "Ongoing",
          "Document": "manoj_kumar_research.pdf"
        }
      ],
      conference: [
        {
          "Title of the Paper": "Wave Interaction with Breakwaters",
          "Title of the Conference": "International Coastal Engineering 2022",
          "Date of Publication": "2022-11-20",
          "Organized by": "ICCE",
          "National/International": "International",
          "Document": "manoj_kumar_conf.pdf"
        }
      ]
    }
  },

  {
    name: "Dr. Meera Iyer",
    role: "Professor",
    dept: "Metallurgical Engineering",
    data: {
      book: [
        {
          "Title of the Book": "Advanced Metallurgy and Materials",
          "Name of the Publisher": "Elsevier",
          "Year of Publication": "2020",
          "National/International" : "international",
          "ISBN Number": "978-0-12-345678-9",
          "Document": "meera_iyer_book.pdf"
        }
      ],
      award_title: [
        {
          "Award / Recognition Title": "Lifetime Contribution to Metallurgy",
          "Granting Organization / Institution": "Indian Metallurgical Society",
          "Year": "2023",
          "Document": "meera_iyer_award.pdf"
        }
      ]
    }
  },

  {
    name: "Dr. Sandeep Reddy",
    role: "Assistant Professor",
    dept: "Information Technology Engineering",
    data: {
      journal: [
        {
          "Title of the Paper": "Blockchain Performance for Supply Chains",
          "Name of the Journal": "Journal of Distributed Systems",
          "Page Number": "88-102",
          "Year of Publication": "2023",
          "Impact Factor": "2.4",
          "National/International": "International",
          "ISBN Number": "2233-4455",
          "Indexing Platform": "Scopus",
          "H-index": "10",
          "Document": "sandeep_reddy_journal.pdf"
        }
      ],
      certifications: [
        {
          "Name of Certification Course": "Blockchain Developer Professional",
          "Type of Certification": "Professional",
          "Organized by": "EdX",
          "Duration (in days)": "14"
        }
      ]
    }
  },

  {
    name: "Dr. Kavita Shah",
    role: "Lecturer",
    dept: "MBA",
    data: {
      workshop: [
        {
          "Program Title": "Business Analytics with Python",
          "Year": "2023",
          "Scope": "National",
          "Organizing Body": "IIM Bangalore",
          "Mode (Online/Offline)": "Online",
          "Venue": "Virtual",
          "Attended/Organized": "Attended"
        }
      ],
      consultancy: [
        {
          "Project Title": "Market Research for SME Cluster",
          "Year of Sanction": "2022",
          "Duration (in months)": "4",
          "Name of Funding Agency": "State Industry Dept",
          "Amount (in INR)": "150000",
          "Are you ": "Consultant",
          "Status": "Completed",
          "Document": "kavita_shah_consultancy.pdf"
        }
      ]
    }
  },

  {
    name: "Dr. Arjun Desai",
    role: "Professor",
    dept: "Computer Science and Engineering",
    data: {
      patents: [
        {
          "Patent Number": "IN2020A009001",
          "Title of the Patent": "Adaptive Query Optimizer for NoSQL",
          "Published/Granted": "Granted",
          "Year of Published/Granted": "2020",
          "Scope": "International",
          "Document": "arjun_desai_patent.pdf"
        }
      ],
      sponsored: [
        {
          "Project Title": "AI for Smart Cities",
          "Funding Details": "AICTE",
          "Amount (in INR)": "2000000",
          "Duration (in months)": "24",
          "Status": "Completed",
          "Academic Year": "2021-22",
          "Document": "arjun_desai_sponsored.pdf"
        }
      ]
    }
  },

  {
    name: "Dr. Neha Kulkarni",
    role: "Assistant Professor",
    dept: "Electronics and Communication Engineering",
    data: {
      phd_awarded: [
        {
          "Year of Awarding": "2022",
          "Number of Students": "2"
        }
      ],
      webinar: [
        {
          "Program Title": "5G Antenna Design Trends",
          "Year": "2024",
          "Scope": "National",
          "Organizing Body": "IEEE MTT",
          "Mode (Online/Offline)": "Online",
          "Venue": "Virtual",
          "Attended/Organized": "Attended"
        }
      ]
    }
  },

  {
    name: "Dr. Rohit Verma",
    role: "Researcher",
    dept: "Mechanical Engineering",
    data: {
      research: [
        {
          "Project Title": "Heat Transfer in Microchannels",
          "Year of Sanction": "2022",
          "Duration (in months)": "18",
          "Funding Agency": "SERB",
          "Fund Received (in INR)": "900000",
          "Are you": "Co-PI",
          "Status": "Ongoing",
          "Document": "rohit_verma_research.pdf"
        }
      ],
      talk: [
        {
          "Event Title": "Microfluidics Symposium",
          "Name of the Event": "ICMF 2023",
          "Date": "2023-08-05",
          "Topic / Title of Talk": "Two-Phase Flow Modelling",
          "Scope": "International",
          "Mode": "Offline",
          "Venue": "Chennai",
          "Document": "rohit_verma_talk.pdf"
        }
      ]
    }
  },

  {
    name: "Dr. Sonia Patel",
    role: "Associate Professor",
    dept: "Civil Engineering",
    data: {
      publications: [
        {
          "Title": "Urban Infrastructure Resilience",
          "Name of the Journal": "Journal of Urban Planning",
          "Page Number": "200-216",
          "Year of Publication": "2021",
          "Impact Factor": "2.2",
          "Scope": "International",
          "ISSN Number": "1456-7788",
          "Indexing Platform": "Scopus",
          "H-index": "12",
          "Document": "sonia_patel_journal.pdf"
        }
      ],
      fdp: [
        {
          "Program Title": "Remote Sensing for Civil Engineers",
          "Year": "2022",
          "Scope": "National",
          "Organizing Body": "IIT Bombay",
          "Mode (Online/Offline)": "Online",
          "Venue": "Virtual",
          "Attended/Organized": "Attended"
        }
      ]
    }
  },

  {
    name: "Dr. Kiran Rao",
    role: "Professor",
    dept: "Metallurgical Engineering",
    data: {
      book_chapter: [
        {
          "Title of the Book Chapter": "Nanoalloys and Properties",
          "Name of the Publisher": "Wiley",
          "Year of Publication": "2019",
          "Scope": "International",
          "ISBN Number": "978-81-22111-00-3",
          "No. of Authors": "3",
          "Document": "kiran_rao_chapter.pdf"
        }
      ],
      award_title: [
        {
          "Award / Recognition Title": "Young Metallurgist Award",
          "Granting Organization / Institution": "Indian Metallurgical Society",
          "Year": "2020",
          "Document": "kiran_rao_award.pdf"
        }
      ]
    }
  },

  {
    name: "Dr. Sima Bose",
    role: "Assistant Professor",
    dept: "Information Technology Engineering",
    data: {
      certifications: [
        {
          "Name of Certification Course": "Data Science Professional",
          "Type of Certification": "Professional",
          "Organized by": "IBM",
          "Duration (in days)": "45"
        }
      ],
      repository: [
        {
          "Content Title": "Image Segmentation Dataset",
          "Platform / Repository Name": "GitHub",
          "Associated Course/Subject": "Computer Vision",
          "Date / Year": "2023",
          "Link": "https://github.com/simabose/seg-dataset"
        }
      ]
    }
  },

  {
    name: "Dr. Arvind Kulkar",
    role: "Lecturer",
    dept: "M.Tech",
    data: {
      phd_ongoing: [
        {
          "Year of Awarding": "2023",
          "Number of Students": "2"
        }
      ],
      workshop: [
        {
          "Program Title": "Advanced CFD Applications",
          "Year": "2022",
          "Scope": "Institutional",
          "Organizing Body": "NIT Warangal",
          "Mode (Online/Offline)": "Offline",
          "Venue": "NIT Warangal",
          "Attended/Organized": "Attended"
        }
      ]
    }
  },

  {
    name: "Dr. Mehul Shah",
    role: "Professor",
    dept: "Electrical and Electronics Engineering",
    data: {
      ieee: [
        {
          "Membership ID": "IEEE7654321",
          "Membership Type (Life/Annual/Student)": "Life",
          "Year Joined": "2015",
          "Validity Period (if applicable)": "Life",
          "Document": "mehul_shah_ieee.pdf"
        }
      ],
      consultancy: [
        {
          "Project Title": "Power Quality Assessment for Industry",
          "Year of Sanction": "2021",
          "Duration (in months)": "6",
          "Name of Funding Agency": "ABC Industries",
          "Amount (in INR)": "200000",
          "Are you ": "Consultant",
          "Status": "Completed",
          "Document": "mehul_shah_consultancy.pdf"
        }
      ]
    }
  },
  // Part 1 ends here: objects 1–20
  // 1
  {
    name: "Dr. John Carter",
    role: "Professor",
    dept: "Computer Science and Engineering",
    data: {
      patents: [
        {
          "Patent Number": "IN2024A000101",
          "Title of the Patent": "AI-Based Traffic Prediction System",
          "Published/Granted": "Published",
          "Scope": "International",
          "Year of Published/Granted": "2020",
          "Application Number": "AIPTS001"
        }
      ],
      conference: [
        {
          "Title of the Paper": "Deep Learning Advances",
          "Title of the Conference": "ICML 2024",
          "National/International": "International",
          "Organized by": "IEEE Quantum",
          "Date of Publication": "2024-03-10",
          "Location": "Hyderabad"
        }
      ],
      certifications: [
        {
          "Name of Certification Course": "Google Professional Cloud Architect",
          "Year": "2023",
          "Type of Certification": "Professional",
          "Organized by": "Google",
          "Duration (in days)": "45"
        }
      ]
    }
  },

  // 2
  {
    name: "Dr. Emma Robinson",
    role: "Associate Professor",
    dept: "Information Technology Engineering",
    data: {
      journal: [
        {
          "Title": "Blockchain Security Framework",
          "Journal Name": "IEEE Access",
          "ISSN": "2169-3536",
          "Impact Factor": "4.5",
          "Year": "2023"
        }
      ],
      book: [
        {
          "Title of the Book": "Modern Cryptography Essentials",
          "Name of the Publisher": "Pearson",
          "National/International" : "international",
          "ISBN": "978-1-23456-789-7",
          "Year of Publication": "2022"
        }
      ]
    }
  },

  // 3
  {
    name: "Dr. Michael Adams",
    role: "Assistant Professor",
    dept: "Electronics and Communication Engineering",
    data: {
      conference: [
        {
          "Title of the Paper": "5G mmWave Spectrum Optimization",
          "Title of the Conference": "ICC 2024",
          "Date of Publication": "2024-04-12",
          "Organized by": "IEEE Quantum",
          "National/International" : "International",
          "Location": "Delhi"
        }
      ],
      fdps: [
        {
          "Title": "Advanced Wireless Systems",
          "Conducted By": "IIT Delhi",
          "Duration": "5 Days",
          "Year": "2023"
        }
      ]
    }
  },

  // 4
  {
    name: "Dr. Sophia Patel",
    role: "Lecturer",
    dept: "Civil Engineering",
    data: {
      journal: [
        {
          "Title": "Soil Reinforcement Techniques",
          "Journal Name": "Springer GeoTech",
          "ISSN": "1866-8774",
          "Impact Factor": "3.2",
          "Year": "2024"
        }
      ],
      conference: [
        {
          "Title of the Paper": "Urban Planning Innovations",
          "Title of the Conference": "ICCE 2024",
          "Date of Publication": "2024-05-06",
          "Organized by": "IEEE Quantum",
          "National/International" : "International",
          "Location": "Mumbai"
        }
      ]
    }
  },

  // 5
  {
    name: "Dr. Liam Thompson",
    role: "Professor",
    dept: "Mechanical Engineering",
    data: {
      patents: [
        {
          "Patent Number": "IN2024A000202",
          "Title of the Patent": "Hybrid Turbine Efficiency Enhancer",
          "Year of Published/Granted" : "2024",
          "Published/Granted": "Filed",
          "Issue Date": "2024-01-28",
          "Scope": "International",
          "Application Number": "HTE002"
        }
      ],
      book: [
        {
          "Title of the Book": "Thermodynamics Simplified",
          "National/International":"International",
          "Name of the Publisher": "McGraw Hill",
          "ISBN": "978-0-12345-678-9",
          "Year of Publication": "2021"
        }
      ],
      fdps: [
        {
          "Title": "Industrial Fluid Mechanics",
          "Conducted By": "NIT Trichy",
          "Duration": "7 Days",
          "Year": "2023"
        }
      ]
    }
  },

  // 6
  {
    name: "Dr. Olivia Baker",
    role: "Assistant Professor",
    dept: "MBA",
    data: {
      journal: [
        {
          "Title": "Behavioral Finance Patterns",
          "Journal Name": "Elsevier Finance",
          "ISSN": "1234-5678",
          "Impact Factor": "2.1",
          "Year": "2023"
        }
      ],
      certifications: [
        {
          "Organized by": "Coursera",
          "Year": "2022",
          "Name of Certification Course": "Financial Modelling Expert",
          "Type of Certification": "Professional",
          "Duration (in days)": "45"
        }
      ]
    }
  },

  // 7
  {
    name: "Dr. Noah Williams",
    role: "Researcher",
    dept: "Metallurgical Engineering",
    data: {
      conference : [
        {
          "Title of the Paper": "Metal Alloy Innovations",
          "Title of the Conference": "ICMME 2024",
          "Date of Publication": "2024-06-14",
          "National/International":" International",
          "Organized by": "IEEE Quantum",
          "Location": "Chennai"
        }
      ],
      journal: [
        {
          "Title": "Corrosion Resistance Analysis",
          "Journal Name": "Elsevier Materials",
          "ISSN": "0921-5093",
          "Impact Factor": "5.2",
          "Year": "2024"
        }
      ]
    }
  },

  // 8
  {
    name: "Dr. Ava Mitchell",
    role: "Lecturer",
    dept: "Electrical and Electronics Engineering",
    data: {
      fdps: [
        {
          "Title": "Smart Grid Technologies",
          "Conducted By": "IIT Bombay",
          "Duration": "6 Days",
          "Year": "2024"
        }
      ],
      conference : [
        {
          "Title of the Paper": "Power System Optimization",
          "Title of the Conference": "IEEMA 2023",
          "Date of Publication": "2023-11-09",
          "Organized by": "IEEE Quantum",
          "National/International":"International",
          "Location": "Bangalore"
        }
      ]
    }
  },

  // 9
  {
    name: "Dr. Ethan Garcia",
    role: "Professor",
    dept: "Computer Science and Engineering",
    data: {
      book: [
        {
          "Title of the Book": "Data Structures Deep Dive",
          "Name of the Publisher": "Wiley",
          "ISBN": "978-1-90876-543-2",
          "National/International": "International",
          "Year of Publication": "2020"
        }
      ],
      journal: [
        {
          "Title": "AI Optimization in NLP",
          "Journal Name": "ACM Computing Surveys",
          "ISSN": "0360-0300",
          "Impact Factor": "14.3",
          "Year": "2024"
        }
      ]
    }
  },

  // 10
  {
    name: "Dr. Isabella Shah",
    role: "Assistant Professor",
    dept: "Mechanical Engineering",
    data: {
      patents: [
        {
          "Patent Number": "IN2024A000333",
          "Title of the Patent": "Energy Efficient Cooling Blade",
          "Published/Granted": "Published",
          "Year of Published/Granted" : "2024",
          "Issue Date": "2024-03-16",
          "Scope": "International",
          "Application Number": "ECB003"
        }
      ],
      fdps: [
        {
          "Title": "Advanced CAD Techniques",
          "Conducted By": "IIT Madras",
          "Duration": "5 Days",
          "Year": "2023"
        }
      ]
    }
  },

  // 11
  {
    name: "Dr. Lucas Brown",
    role: "Researcher",
    dept: "Civil Engineering",
    data: {
      conference: [
        {
          "Title of the Paper": "Bridge Load Testing Methods",
          "Title of the Conference": "ICBE 2024",
          "Date of Publication": "2024-07-10",
          "Organized by": "IEEE Quantum",
          "National/International": "International",
          "Location": "Kolkata"
        }
      ],
      certifications: [
        {
          "Name of Certification Course": "AutoCAD Civil Expert",
          "Year": "2023",
          "Type of Certification": "Professional",
          "Organized by": "Autodesk",
          "Duration (in days)": "45"
        }
      ]
    }
  },

  // 12
  {
    name: "Dr. Mia Edwards",
    role: "Professor",
    dept: "MBA",
    data: {
      book: [
        {
          "Title of the Book": "Leadership Psychology",
          "Name of the Publisher": "Oxford",
          "ISBN": "978-0-19234-567-8",
          "National/International": "International",
          "Year of Publication": "2019"
        }
      ],
      journal: [
        {
          "Title": "Human Resource Analytics",
          "Journal Name": "Springer HRM",
          "ISSN": "0933-7998",
          "Impact Factor": "3.8",
          "Year": "2022"
        }
      ]
    }
  },

  // 13
  {
    name: "Dr. Elijah Turner",
    role: "Assistant Professor",
    dept: "Electrical and Electronics Engineering",
    data: {
      conference: [
        {
          "Title of the Paper": "EV Charging Architecture",
          "Title of the Conference": "EVCon 2024",
          "Date of Publication": "2024-03-19",
          "National/International": "International",
          "Organized by": "IEEE Quantum",
          "Location": "Delhi"
        }
      ],
      patents: [
        {
          "Patent Number": "IN2023A000403",
          "Title of the Patent": "Fast Charging Converter System",
          "Published/Granted": "Filed",
          "Year of Published/Granted" : "2024",
          "Issue Date": "2023-12-10",
          "Scope": "International",
          "Application Number": "FCC004"
        }
      ]
    }
  },

  // 14
  {
    name: "Dr. Charlotte White",
    role: "Lecturer",
    dept: "Information Technology Engineering",
    data: {
      journal: [
        {
          "Title": "Cyber Security Threat Modeling",
          "Journal Name": "Elsevier Computers & Security",
          "ISSN": "0167-4048",
          "Impact Factor": "6.2",
          "Year": "2022"
        }
      ],
      certifications: [
        {
          "Organized by": "EC-Council",
          "Year": "2023",
          "Name of Certification Course": "Ethical Hacking",
          "Type of Certification": "Professional",
          "Duration (in days)": "45"
        }
      ]
    }
  },

  // 15
  {
    name: "Dr. William Harris",
    role: "Professor",
    dept: "Metallurgical Engineering",
    data: {
      book: [
        {
          "Title of the Book": "Advanced Metallurgy",
          "National/International": "International",
          "Name of the Publisher": "CRC Press",
          "ISBN": "978-1-23411-445-1",
          "Year of Publication": "2020"
        }
      ],
      journal: [
        {
          "Title": "Nano Grain Structure Control",
          "Journal Name": "Materialia",
          "ISSN": "2589-1529",
          "Impact Factor": "4.9",
          "Year": "2023"
        }
      ]
    }
  },

  // 16
  {
    name: "Dr. Harper Foster",
    role: "Assistant Professor",
    dept: "Electronics and Communication Engineering",
    data: {
      fdps: [
        {
          "Title": "Antenna Theory",
          "Conducted By": "IIT Kanpur",
          "Duration": "3 Days",
          "Year": "2024"
        }
      ],
      conference: [
        {
          "Title of the Paper": "IoT-Based Communication Systems",
          "Title of the Conference": "IoTCon 2023",
          "Date of Publication": "2023-12-08",
          "National/International": "International",
          "Organized by": "IEEE Quantum",
          "Location": "Pune"
        }
      ]
    }
  },

  // 17
  {
    name: "Dr. Henry Collins",
    role: "Lecturer",
    dept: "Civil Engineering",
    data: {
      patents: [
        {
          "Patent Number": "IN2024A000599",
          "Title of the Patent": "Eco-Friendly Cement Binder",
          "Published/Granted": "Published",
          "Year of Published/Granted" : "2024",
          "Scope": "International",
          "Issue Date": "2024-02-22",
          "Application Number": "ECB005"
        }
      ],
      journal: [
        {
          "Title": "Sustainable Construction",
          "Journal Name": "Elsevier Construction & Building Materials",
          "ISSN": "0950-0618",
          "Impact Factor": "7.5",
          "Year": "2023"
        }
      ]
    }
  },

  // 18
  {
    name: "Dr. Amelia Ross",
    role: "Researcher",
    dept: "Computer Science and Engineering",
    data: {
      conference: [
        {
          "Title of the Paper": "Quantum Machine Learning Models",
          "Title of the Conference": "QML Summit 2024",
          "National/International": "International",
          "Date of Publication": "2024-05-18",
          "Organized by": "IEEE Quantum",
          "Location": "Bangalore"
        }
      ],
      certifications: [
        {
          "Year": "2023",
          "Name of Certification Course": "AWS Machine Learning Specialty",
          "Type of Certification": "Professional",
          "Organized by": "IBM",
          "Duration (in days)": "45"
        }
      ]
    }
  },

  // 19
  {
    name: "Dr. Daniel Wright",
    role: "Associate Professor",
    dept: "Information Technology Engineering",
    data: {
      book: [
        {
          "Title of the Book": "Cloud Native Development",
          "National/International" : "International",
          "Name of the Publisher": "O'Reilly",
          "ISBN": "978-1-33733-881-0",
          "Year of Publication": "2020"
        }
      ],
      fdps: [
        {
          "Title": "DevOps Automation",
          "Conducted By": "IIT Hyderabad",
          "Duration": "4 Days",
          "Year": "2023"
        }
      ]
    }
  },

  // 20
  {
    name: "Dr. Victoria Allen",
    role: "Professor",
    dept: "Mechanical Engineering",
    data: {
      journal: [
        {
          "Title": "Heat Transfer Optimization",
          "Journal Name": "ASME Thermal Science",
          "ISSN": "1528-8943",
          "Impact Factor": "3.6",
          "Year": "2024"
        }
      ],
      patents: [
        {
          "Patent Number": "IN2024A000699",
          "Title of the Patent": "Zero-Friction Composite Material",
          "Published/Granted": "Filed",
          "Year of Published/Granted" : "2024",
          "Scope": "International",
          "Issue Date": "2024-03-01",
          "Application Number": "ZFC006"
        }
      ]
    }
  }
];

const schemas = {
  patents: {
    label: "Patents",
    attributes: [
      { key: "Patent Number", label: "Patent Number", required: true },
      { key: "Title of the Patent", label: "Title", required: true },
      { key: "Published/Granted", label: "Published/Granted", required: true },
      { key: "Year of Published/Granted", label: "Year", required: true },
      { key: "Scope", label: "Scope", required: true },
    ],
  },

  book_chapter: {
    label: "Book Chapters",
    attributes: [
      { key: "Title of the Book Chapter", label: "Chapter Title", required: true },
      { key: "Name of the Publisher", label: "Publisher", required: true },
      { key: "Year of Publication", label: "Year", required: true },
      { key: "National/International", label: "Scope", required: false },
      { key: "ISBN Number", label: "ISBN", required: false },
      { key: "No. of Authors", label: "Authors Count", required: false },
    ],
  },

  book: {
    label: "Books",
    attributes: [
      { key: "Title of the Book", label: "Book Title", required: true },
      { key: "Name of the Publisher", label: "Publisher", required: true },
      { key: "Year of Publication", label: "Year", required: true },
      { key: "National/International", label: "Scope", required: false },
      { key: "ISBN Number", label: "ISBN", required: false },
    ],
  },

  journal: {
    label: "Journal Publications",
    attributes: [
      { key: "Title of the Paper", label: "Paper Title", required: true },
      { key: "Name of the Journal", label: "Journal Name", required: true },
      { key: "Page Number", label: "Page Number", required: false },
      { key: "Year of Publication", label: "Year", required: true },
      { key: "ISBN Number", label: "ISBN", required: false },
      { key : "National/International", label:"Scope" , required : true},
      { key: "Impact Factor", label: "Impact Factor", required: false },
      { key: "ISSN Number", label: "ISSN", required: false },
      { key: "Indexing Platform", label: "Indexing", required: false },
      { key: "H-index", label: "H-index", required: false },
    ],
  },

  conference: {
    label: "Conference Papers",
    attributes: [
      { key: "Title of the Paper", label: "Paper Title", required: true },
      { key: "Title of the Conference", label: "Conference Title", required: true },
      { key: "Date of Publication", label: "Date", required: false },
      { key: "Organized by", label: "Organizer", required: true },
      { key: "National/International", label: "Scope", required: false },
    ],
  },

  certifications: {
    label: "Certifications",
    attributes: [
      { key: "Name of Certification Course", label: "Course Name", required: true },
      { key: "Type of Certification", label: "Type", required: true },
      { key: "Organized by", label: "Organizer", required: true },
      { key: "Duration (in days)", label: "Duration (Days)", required: false },
    ],
  },

  sponsored: {
    label: "Sponsored Projects",
    attributes: [
      { key: "Project Title", label: "Title", required: true },
      { key: "Funding Details", label: "Funding Details", required: true },
      { key: "Amount (in INR)", label: "Amount (₹)", required: true },
      { key: "Duration (in months)", label: "Duration (Months)", required: false },
      { key: "Status", label: "Status", required: true },
      { key: "Academic Year", label: "Academic Year", required: false },
    ],
  },

  research: {
    label: "Research Projects",
    attributes: [
      { key: "Project Title", label: "Title", required: true },
      { key: "Year of Sanction", label: "Sanction Year", required: true },
      { key: "Duration (in months)", label: "Duration (Months)", required: false },
      { key: "Funding Agency", label: "Funding Agency", required: true },
      { key: "Fund Received (in INR)", label: "Amount (₹)", required: false },
      { key: "Are you", label: "Role (PI/Co-PI)", required: false },
      { key: "Status", label: "Status", required: true },
    ],
  },

  consultancy: {
    label: "Consultancy Projects",
    attributes: [
      { key: "Project Title", label: "Title", required: true },
      { key: "Year of Sanction", label: "Sanction Year", required: true },
      { key: "Duration (in months)", label: "Duration (Months)", required: false },
      { key: "Name of Funding Agency", label: "Funding Agency", required: true },
      { key: "Amount (in INR)", label: "Amount (₹)", required: true },
      { key: "Are you ", label: "Role", required: false },
      { key: "Status", label: " Status", required : true}
    ],
  },

  fdp: {
    label: "FDP",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Year", label: "Year", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Organizing Body", label: "Organizer", required: true },
      { key: "Mode (Online/Offline)", label: "Mode", required: true },
      { key: "Venue", label: "Venue", required: false },
      { key: "Attended/Organized", label: "Role", required: true },
    ],
  },

  sttp: {
    label: "STTP",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Year", label: "Year", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Organizing Body", label: "Organizer", required: true },
      { key: "Mode (Online/Offline)", label: "Mode", required: true },
      { key: "Venue", label: "Venue", required: false },
      { key: "Attended/Organized", label: "Role", required: true },
    ],
  },

  workshop: {
    label: "Workshops",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Year", label: "Year", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Organizing Body", label: "Organizer", required: true },
      { key: "Mode (Online/Offline)", label: "Mode", required: false },
      { key: "Venue", label: "Venue", required: false },
      { key: "Attended/Organized", label: "Role", required: true },
    ],
  },

  seminar: {
    label: "Seminars",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Year", label: "Year", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Organizing Body", label: "Organizer", required: true },
      { key: "Mode (Online/Offline)", label: "Mode", required: false },
      { key: "Venue", label: "Venue", required: false },
      { key: "Attended/Organized", label: "Role", required: true },
    ],
  },

  webinar: {
    label: "Webinars",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Year", label: "Year", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Organizing Body", label: "Organizer", required: true },
      { key: "Mode (Online/Offline)", label: "Mode", required: true },
      { key: "Venue", label: "Venue", required: false },
      { key: "Attended/Organized", label: "Role", required: true },
    ],
  },

  RC: {
    label: "Refresher Courses",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Year", label: "Year", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Organizing Body", label: "Organizer", required: true },
      { key: "Mode (Online/Offline)", label: "Mode", required: true },
      { key: "Venue", label: "Venue", required: false },
      { key: "Attended/Organized", label: "Role", required: true },
    ],
  },

  OC: {
    label: "Orientation Courses",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Year", label: "Year", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Organizing Body", label: "Organizer", required: true },
      { key: "Mode (Online/Offline)", label: "Mode", required: true },
      { key: "Venue", label: "Venue", required: false },
      { key: "Attended/Organized", label: "Role", required: true },
    ],
  },

  talk: {
    label: "Expert Talks",
    attributes: [
      { key: "Event Title", label: "Event Title", required: true },
      { key: "Name of the Event", label: "Event Name", required: true },
      { key: "Date", label: "Date", required: false },
      { key: "Topic / Title of Talk", label: "Talk Title", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Mode", label: "Mode", required: false },
      { key: "Venue", label: "Venue", required: false },
    ],
  },

  keynote: {
    label: "Keynote Address",
    attributes: [
      { key: "Conference Title", label: "Conference Title", required: true },
      { key: "Name of the Event", label: "Event Name", required: true },
      { key: "Date", label: "Date", required: false },
      { key: "Topic / Title of Talk", label: "Talk Title", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Mode", label: "Mode", required: false },
      { key: "Venue", label: "Venue", required: false },
    ],
  },

  chair: {
    label: "Session Chair",
    attributes: [
      { key: "Conference Title", label: "Conference Title", required: true },
      { key: "Name of the Event", label: "Event Name", required: true },
      { key: "Date", label: "Date", required: false },
      { key: "Topic / Title of Talk", label: "Talk Title", required: false },
      { key: "Scope", label: "Scope", required: false },
      { key: "Mode", label: "Mode", required: false },
      { key: "Venue", label: "Venue", required: false },
    ],
  },

  lecture: {
    label: "Guest Lectures",
    attributes: [
      { key: "Event Title", label: "Event Title", required: true },
      { key: "Organizing Institution", label: "Institution", required: true },
      { key: "Name of the Event", label: "Event Name", required: true },
      { key: "Date", label: "Date", required: false },
      { key: "Topic / Title of Talk", label: "Talk Title", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Mode", label: "Mode", required: false },
      { key: "Venue", label: "Venue", required: false },
    ],
  },

  resource_person: {
    label: "Resource Person",
    attributes: [
      { key: "Event Title", label: "Event Title", required: true },
      { key: "Organizing Institution", label: "Institution", required: true },
      { key: "Name of the Event", label: "Event Name", required: true },
      { key: "Date", label: "Date", required: false },
      { key: "Topic / Title of Talk", label: "Talk Title", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Mode", label: "Mode", required: false },
      { key: "Venue", label: "Venue", required: false },
    ],
  },

  mooc_content: {
    label: "MOOC Content",
    attributes: [
      { key: "Content Title", label: "Content Title", required: true },
      { key: "Platform / Repository Name", label: "Platform", required: true },
      { key: "Associated Course/Subject", label: "Course/Subject", required: true },
      { key: "Date / Year", label: "Date/Year", required: true },
      { key: "Link", label: "Link", required: false },
    ],
  },

  eContent: {
    label: "e-Content",
    attributes: [
      { key: "Content Title", label: "Content Title", required: true },
      { key: "Platform / Repository Name", label: "Platform", required: true },
      { key: "Associated Course/Subject", label: "Course/Subject", required: true },
      { key: "Date / Year", label: "Date/Year", required: true },
      { key: "Link", label: "Link", required: false },
    ],
  },

  course_content: {
    label: "Course Content",
    attributes: [
      { key: "Content Title", label: "Content Title", required: true },
      { key: "Platform / Repository Name", label: "Platform", required: true },
      { key: "Associated Course/Subject", label: "Course/Subject", required: true },
      { key: "Date / Year", label: "Date/Year", required: true },
      { key: "Link", label: "Link", required: false },
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

  ieee: {
    label: "IEEE Membership",
    attributes: [
      { key: "Membership ID", label: "Membership ID", required: false },
      { key: "Membership Type (Life/Annual/Student)", label: "Membership Type", required: true },
      { key: "Year Joined", label: "Year Joined", required: true },
      { key: "Validity Period (if applicable)", label: "Validity", required: false },
    ],
  },

  acm: {
    label: "ACM Membership",
    attributes: [
      { key: "Membership ID", label: "Membership ID", required: false },
      { key: "Membership Type (Life/Annual/Student)", label: "Membership Type", required: true },
      { key: "Year Joined", label: "Year Joined", required: true },
      { key: "Validity Period (if applicable)", label: "Validity", required: false },
    ],
  },

  csi: {
    label: "CSI Membership",
    attributes: [
      { key: "Membership ID", label: "Membership ID", required: false },
      { key: "Membership Type (Life/Annual/Student)", label: "Membership Type", required: true },
      { key: "Year Joined", label: "Year Joined", required: true },
      { key: "Validity Period (if applicable)", label: "Validity", required: false },
    ],
  },

  phd_awarded: {
    label: "PhD Students Awarded",
    attributes: [
      { key: "Year of Awarding", label: "Year", required: true },
      { key: "Number of Students", label: "Students", required: true },
    ],
  },

  phd_ongoing: {
    label: "PhD Students Ongoing",
    attributes: [
      { key: "Year of Awarding", label: "Year", required: true },
      { key: "Number of Students", label: "Students", required: true },
    ],
  },

  mtech: {
    label: "M.Tech Students",
    attributes: [
      { key: "Year of Awarding", label: "Year", required: true },
      { key: "Number of Students", label: "Students", required: true },
    ],
  },

  mphilmba: {
    label: "MPhil/MBA Students",
    attributes: [
      { key: "Year of Awarding", label: "Year", required: true },
      { key: "Number of Students", label: "Students", required: true },
    ],
  },
};

const facultyList = [
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
  },
  {
    name: "Dr. Mike Johnson",
    department: "Mechanical Engineering",
    role: "Assistant Professor",
    email: "mike.johnson@yourcollege.edu"
  },
  {
    name: "Dr. Emily Davis",
    department: "MBA",
    role: "Lecturer",
    email: "emily.davis@yourcollege.edu"
  },
  {
    name: "Dr. William Brown",
    department: "Computer Science and Engineering",
    role: "Professor",
    email: "william.brown@yourcollege.edu"
  },
  {
    name: "Dr. Olivia Wilson",
    department: "Civil Engineering",
    role: "Assistant Professor",
    email: "olivia.wilson@yourcollege.edu"
  },
  {
    name: "Dr. Henry Taylor",
    department: "Electronics and Communication Engineering",
    role: "Lecturer",
    email: "henry.taylor@yourcollege.edu"
  },
  {
    name: "Dr. Sophia Martinez",
    department: "Information Technology Engineering",
    role: "Researcher",
    email: "sophia.martinez@yourcollege.edu"
  },
  {
    name: "Dr. Daniel Anderson",
    department: "Metallurgical Engineering",
    role: "Professor",
    email: "daniel.anderson@yourcollege.edu"
  },
  {
    name: "Dr. Grace Lee",
    department: "M.Tech",
    role: "Assistant Professor",
    email: "grace.lee@yourcollege.edu"
  },
  {
    name: "Dr. Benjamin Harris",
    department: "MBA",
    role: "Lecturer",
    email: "benjamin.harris@yourcollege.edu"
  },
  {
    name: "Dr. Alice Walker",
    department: "Civil Engineering",
    role: "Professor",
    email: "alice.walker@yourcollege.edu"
  },
  {
    name: "Dr. Christopher Young",
    department: "Computer Science and Engineering",
    role: "Assistant Professor",
    email: "christopher.young@yourcollege.edu"
  },
  {
    name: "Dr. Rachel Green",
    department: "Electrical and Electronics Engineering",
    role: "Professor",
    email: "rachel.green@yourcollege.edu"
  },
  {
    name: "Dr. Steven Hall",
    department: "Mechanical Engineering",
    role: "Associate Professor",
    email: "steven.hall@yourcollege.edu"
  },
  {
    name: "Dr. Monica Clark",
    department: "MBA",
    role: "Assistant Professor",
    email: "monica.clark@yourcollege.edu"
  },
  {
    name: "Dr. Kevin Lewis",
    department: "Information Technology Engineering",
    role: "Professor",
    email: "kevin.lewis@yourcollege.edu"
  },
  {
    name: "Dr. Laura Robinson",
    department: "Civil Engineering",
    role: "Lecturer",
    email: "laura.robinson@yourcollege.edu"
  },
  {
    name: "Dr. Patrick Walker",
    department: "Metallurgical Engineering",
    role: "Assistant Professor",
    email: "patrick.walker@yourcollege.edu"
  },
  {
    name: "Dr. Kimberly Scott",
    department: "M.Tech",
    role: "Researcher",
    email: "kimberly.scott@yourcollege.edu"
  },
  {
    name: "Dr. Anthony King",
    department: "Computer Science and Engineering",
    role: "Lecturer",
    email: "anthony.king@yourcollege.edu"
  },
  {
    name: "Dr. Stephanie Adams",
    department: "Electrical and Electronics Engineering",
    role: "Assistant Professor",
    email: "stephanie.adams@yourcollege.edu"
  },
  {
    name: "Dr. Brian Mitchell",
    department: "Mechanical Engineering",
    role: "Professor",
    email: "brian.mitchell@yourcollege.edu"
  },
  {
    name: "Dr. Jennifer Phillips",
    department: "MBA",
    role: "Professor",
    email: "jennifer.phillips@yourcollege.edu"
  },
  {
    name: "Dr. Eric Campbell",
    department: "Information Technology Engineering",
    role: "Lecturer",
    email: "eric.campbell@yourcollege.edu"
  },
  {
    name: "Dr. Melissa Parker",
    department: "Civil Engineering",
    role: "Associate Professor",
    email: "melissa.parker@yourcollege.edu"
  },
  {
    name: "Dr. Joshua Rivera",
    department: "Computer Science and Engineering",
    role: "Researcher",
    email: "joshua.rivera@yourcollege.edu"
  },
  {
    name: "Dr. Angela Brooks",
    department: "Electrical and Electronics Engineering",
    role: "Lecturer",
    email: "angela.brooks@yourcollege.edu"
  },
  {
    name: "Dr. Ryan Morris",
    department: "Mechanical Engineering",
    role: "Assistant Professor",
    email: "ryan.morris@yourcollege.edu"
  },
  {
    name: "Dr. Samantha Price",
    department: "MBA",
    role: "Assistant Professor",
    email: "samantha.price@yourcollege.edu"
  },
  {
    name: "Dr. Nicholas Cox",
    department: "Information Technology Engineering",
    role: "Associate Professor",
    email: "nicholas.cox@yourcollege.edu"
  },
  {
    name: "Dr. Olivia Foster",
    department: "Civil Engineering",
    role: "Lecturer",
    email: "olivia.foster@yourcollege.edu"
  }
];

const fields = {
  patents: ['Patent Number', 'Title of the Patent', 'Published/Granted', 'Year of Published/Granted', 'Scope', 'Document'],
  book_chapter: ['Title of the Book Chapter', 'Name of the Publisher', 'Year of Publication', 'National/International', 'ISBN Number', 'No. of Authors', 'Document'],
  book: ['Title of the Book', 'Name of the Publisher', 'Year of Publication', 'National/International', 'ISBN Number', 'Document'],
  journal: ['Title of the Paper', 'Name of the Journal', 'Page Number', 'Year of Publication', 'Impact Factor', 'National/International', 'ISSN Number', 'Indexing Platform', 'H-index', 'Document'],
  conference: ['Title of the Paper', 'Title of the Conference', 'Date of Publication', 'Organized by', 'National/International', 'Document'],

  certifications: ['Name of Certification Course', 'Type of Certification', 'Organized by', 'Duration (in days)'],
  sponsored: ['Project Title', 'Funding Details', 'Amount (in INR)', 'Duration (in months)', 'Status', 'Academic Year', 'Document'],
  research: ['Project Title', 'Year of Sanction', 'Duration (in months)', 'Funding Agency', 'Fund Received (in INR)', 'Are you', 'Status', 'Document'],
  consultancy: ['Project Title', 'Year of Sanction', 'Duration (in months)', 'Name of Funding Agency', 'Amount (in INR)', 'Are you ', 'Status', 'Document'],
  fdp: ['Program Title', 'Year', 'Scope', 'Organizing Body', 'Mode (Online/Offline)', 'Venue', 'Attended/Organized'],
  sttp: ['Program Title', 'Year', 'Scope', 'Organizing Body', 'Mode (Online/Offline)', 'Venue', 'Attended/Organized'],
  workshop: ['Program Title', 'Year', 'Scope', 'Organizing Body', 'Mode (Online/Offline)', 'Venue', 'Attended/Organized'],
  seminar: ['Program Title', 'Year', 'Scope', 'Organizing Body', 'Mode (Online/Offline)', 'Venue', 'Attended/Organized'],
  webinar: ['Program Title', 'Year', 'Scope', 'Organizing Body', 'Mode (Online/Offline)', 'Venue', 'Attended/Organized'],
  RC: ['Program Title', 'Year', 'Scope', 'Organizing Body', 'Mode (Online/Offline)', 'Venue', 'Attended/Organized'],
  OC: ['Program Title', 'Year', 'Scope', 'Organizing Body', 'Mode (Online/Offline)', 'Venue', 'Attended/Organized'],

  talk: ['Event Title', 'Name of the Event', 'Date', 'Topic / Title of Talk', 'Scope', 'Mode', 'Venue', 'Document'],
  keynote: ['Conference Title', 'Name of the Event', 'Date', 'Topic / Title of Talk', 'Scope', 'Mode', 'Venue', 'Document'],
  chair: ['Conference Title', 'Name of the Event', 'Date', 'Topic / Title of Talk', 'Scope', 'Mode', 'Venue', 'Document'],
  lecture: ['Event Title', 'Organizing Institution', 'Name of the Event', 'Date', 'Topic / Title of Talk', 'Scope', 'Mode', 'Venue', 'Document'],
  resource_person: ['Event Title', 'Organizing Institution', 'Name of the Event', 'Date', 'Topic / Title of Talk', 'Scope', 'Mode', 'Venue', 'Document'],

  mooc_content: ['Content Title', 'Platform / Repository Name', 'Associated Course/Subject', 'Date / Year', 'Link'],
  eContent: ['Content Title', 'Platform / Repository Name', 'Associated Course/Subject', 'Date / Year', 'Link'],
  course_content: ['Content Title', 'Platform / Repository Name', 'Associated Course/Subject', 'Date / Year', 'Link'],
  
  award_title: ['Award / Recognition Title', 'Granting Organization / Institution', 'Year', 'Document'],
  ieee: ['Membership ID', 'Membership Type (Life/Annual/Student)', 'Year Joined', 'Validity Period (if applicable)', 'Document'],
  acm: [ 'Membership ID', 'Membership Type (Life/Annual/Student)', 'Year Joined', 'Validity Period (if applicable)', 'Document'],
  csi: [ 'Membership ID', 'Membership Type (Life/Annual/Student)', 'Year Joined', 'Validity Period (if applicable)', 'Document'],
  phd_awarded: ['Year of Awarding', 'Number of Students'],
  phd_ongoing: ['Year of Awarding', 'Number of Students'],
  mtech: ['Year of Awarding', 'Number of Students'],
  mphilmba: ['Year of Awarding', 'Number of Students'],
};

export { schemas, yearFields,facultyList,fields }