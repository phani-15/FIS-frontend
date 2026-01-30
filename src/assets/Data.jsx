import { label } from "framer-motion/client";

const yearFields = {
  patents: "year_of_published/granted",
  journal: "year_of_publication",
  book: "year_of_publication",
  book_chapter: "year_of_publication",
  conference_paper: "date_of_publication",
  keynote: "date",
  talk: "date",
  awards_and_recognitions: "year",
  research: "year_of_sanction",
  consultancy: "year_of_sanction",
  phd_awarded: "year_of_awarding",
  ieee: "year_joined",
  csi: "year_joined",
  chair: "date",
  lecture: "date",
  resource_person: "date",
  mooc_content: "month_year",
  e_content: "month_year",
  innovative_pedagogy: "year_of_development",
  acm: "year_joined",
  ie: "year_joined",
  iete: "year_joined",
  other_bodies: "year_joined",
  book_book_chapter: "month_&_year_of_publication",
  phd_ongoing: "year_of_joining",
  mtech: "year_of_awarding",
  sttp: { start: "starting_date", end: "ending_date" },
  rc: { start: "starting_date", end: "ending_date" },
  foreign_visits: { start: "starting_date", end: "end_date" },
  seminar: { start: "starting_date", end: "ending_date" },
  workshop: { start: "starting_date", end: "ending_date" },
  fdp: { start: "starting_date", end: "ending_date" },
  webinar: { start: "starting_date", end: "ending_date" },
  oc: { start: "starting_date", end: "ending_date" },
};

const schemas = {
  patents: {
    label: "Patents",
    attributes: [
      { key: "Patent Number", label: "Patent Number", required: true },
      { key: "Title Of The Patent", label: "Title", required: true },
      { key: "Published/granted", label: "Published/granted", required: true },
      { key: "Year Of Published/granted", label: "Year", required: true },
      { key: "Scope", label: "Scope", required: true },
    ],
  },

  book_chapter: {
    label: "Book Chapters",
    attributes: [
      { key: "Title Of The Book Chapter", label: "Chapter Title", required: true },
      { key: "Name Of The Publisher", label: "Publisher", required: true },
      { key: "Year Of Publication", label: "Year", required: true },
      { key: "National/international", label: "Scope", required: false },
      { key: "Isbn Number", label: "ISBN", required: false },
      { key: "No. Of Authors", label: "Authors Count", required: false },
    ],
  },

  book: {
    label: "Books",
    attributes: [
      { key: "Title Of The Book", label: "Book Title", required: true },
      { key: "Name Of The Publisher", label: "Publisher", required: true },
      { key: "Year Of Publication", label: "Year", required: true },
      { key: "National/international", label: "Scope", required: false },
      { key: "Isbn Number", label: "ISBN", required: false },
    ],
  },

  journal: {
    label: "Journal Publications",
    attributes: [
      { key: "Title Of The Paper", label: "Title Of The Paper", required: true },
      { key: "Name Of The Journal", label: "Name Of The Journal", required: true },
      { key: "Page Number", label: "Page Number(s)", required: false },
      { key: "Year Of Publication", label: "Year Of Publication", required: true },
      { key: "Volume Number", label: "Volume Number", required: false },
      { key: "Impact Factor Thomson Reuters", label: "Impact Factor (Thomson Reuters)", required: false },
      { key: "National/international", label: "National / International", required: true },
      { key: "Issn Number", label: "ISSN Number", required: true },
      { key: "No. Of Authors", label: "Number Of Authors", required: false },
      { key: "Author", label: "Author(s)", required: true },
      { key: "Indexing Platform", label: "Indexing Platform", required: false },
      { key: "H Index", label: "H-Index", required: false },
    ],
  },

  conference_paper: {
    label: "Conference Papers",
    attributes: [
      { key: "Title Of The Paper", label: "Paper Title", required: true },
      { key: "Title Of The Conference", label: "Conference Title", required: true },
      { key: "Date Of Publication", label: "Date", required: false },
      { key: "Organized By", label: "Organizer", required: true },
      { key: "National/international", label: "Scope", required: false },
    ],
  },

  certifications: {
    label: "Certifications",
    attributes: [
      { key: "Name Of Certification Course", label: "Course Name", required: true },
      { key: "Type Of Certification", label: "Type", required: true },
      { key: "Organized By", label: "Organizer", required: true },
      { key: "Duration In Weeks", label: "Duration (Weeks)", required: false },
    ],
  },

  nptel: {
    label: "NPTEL Certifications",
    attributes: [
      { key: "Name Of Certification Course", label: "Course Name", required: true },
      { key: "Type Of Certification", label: "Type Of Certification", required: true },
      { key: "Duration In Weeks", label: "Duration (Weeks)", required: false },
    ],
  },

  swayam: {
    label: "SWAYAM Certifications",
    attributes: [
      { key: "Name Of Certification Course", label: "Course Name", required: true },
      { key: "Type Of Certification", label: "Type Of Certification", required: true },
      { key: "Duration In Weeks", label: "Duration (Weeks)", required: false },
    ],
  },

  coursera: {
    label: "Coursera Certifications",
    attributes: [
      { key: "Name Of Certification Course", label: "Course Name", required: true },
      { key: "Type Of Certification", label: "Type Of Certification", required: true },
      { key: "Duration In Weeks", label: "Duration (Weeks)", required: false },
    ],
  },

  infosysspringboard: {
    label: "Infosys Springboard Certifications",
    attributes: [
      { key: "Name Of Certification Course", label: "Course Name", required: true },
      { key: "Type Of Certification", label: "Type Of Certification", required: true },
      { key: "Duration In Weeks", label: "Duration (Weeks)", required: false },
    ],
  },

  edx: {
    label: "edX Certifications",
    attributes: [
      { key: "Name Of Certification Course", label: "Course Name", required: true },
      { key: "Type Of Certification", label: "Type Of Certification", required: true },
      { key: "Duration In Weeks", label: "Duration (Weeks)", required: false },
    ],
  },

  other: {
    label: "Other Certifications",
    attributes: [
      { key: "Name Of Certification Course", label: "Course Name", required: true },
      { key: "Type Of Certification", label: "Type Of Certification", required: true },
      { key: "Organized By", label: "Organized By", required: true },
      { key: "Duration In Weeks", label: "Duration (Weeks)", required: false },
    ],
  },

  sponsored: {
    label: "Sponsored Projects",
    attributes: [
      { key: "Project Title", label: "Project Title", required: true },
      { key: "Funding Agency", label: "Funding Agency", required: true },
      { key: "Amount In Inr", label: "Amount (INR)", required: true },
      { key: "Duration In Months", label: "Duration (Months)", required: true },
      { key: "Academic Year", label: "Academic Year", required: true },
      { key: "Are You", label: "Role (PI / Co-PI)", required: true },
      { key: "Status", label: "Project Status", required: true },
      // "Sanctioning Order" and "Utilization Certificate..." omitted (file fields)
    ],
  },

  research: {
    label: "Research Projects",
    attributes: [
      { key: "Project Title", label: "Project Title", required: true },
      { key: "Year Of Sanction", label: "Year Of Sanction", required: true },
      { key: "Duration", label: "Duration", required: true },
      { key: "Funding Agency", label: "Funding Agency", required: true },
      { key: "Sanctioned Amount", label: "Sanctioned Amount", required: true },
      { key: "Recieved Amount Utilized", label: "Received Amount Utilized", required: false },
      { key: "Are You", label: "Role (PI / Co-PI)", required: true },
      { key: "Status", label: "Project Status", required: true },
      // File fields omitted
    ],
  },

  consultancy: {
    label: "Consultancy Projects",
    attributes: [
      { key: "Project Title", label: "Project Title", required: true },
      { key: "Year Of Sanction", label: "Year Of Sanction", required: true },
      { key: "Duration", label: "Duration", required: true },
      { key: "Funding Agency", label: "Funding Agency", required: true },
      { key: "Amount In Inr", label: "Amount (INR)", required: true },
      { key: "Are You", label: "Role (PI / Co-PI)", required: true },
      { key: "Status", label: "Project Status", required: true },
      // File fields omitted
    ],
  },
  foreign_visits: {
    label: "Foreign Visits",
    attributes: [
      { key: 'Purpose Of Visit', label: 'Purpose Of Visit', required: true },
      { key: 'Nature Of Visit', label: 'Nature Of Visit', required: true },
      { key: 'Name Of Conference/event', label: 'Name Of Conference/event', required: true },
      { key: 'Title Of The Paper/talk', label: 'Title Of The Paper/talk', required: true },
      { key: 'Academic Year', label: 'Academic Year', required: true },
      { key: 'Name Of Host Organization', label: 'Name Of Host Organization', required: true },
      { key: 'Country Visited', label: 'Country Visited', required: true },
      { key: 'Starting Date', label: 'Start Date', required: true },
      { key: 'End Date', label: 'End Date', required: true },
      { key: 'Role Of Faculty', label: 'Role Of Faculty', required: true },
      { key: 'Sponsoring Agency', label: 'Sponsoring Agency', required: true },
      { key: 'Amount Sanctioned', label: 'Amount Sanctioned', required: true },
      { key: 'Travel/grant/received', label: 'Travel Grant Received', required: true },
    ]
  },
  fdp: {
    label: "Faculty Development Program (FDP)",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Starting Date", label: "Start Date", required: true },
      { key: "Ending Date", label: "End Date", required: true },
      { key: "Scope", label: "Scope", required: true },
      { key: "Organizing Body", label: "Organizing Body", required: true },
      { key: "Mode", label: "Mode (Online / Offline / Hybrid)", required: true },
      { key: "Place", label: "Place", required: false },
      { key: "Attended/organized", label: "Attended / Organized", required: true },
      { key: "Role", label: "Role", required: false },
    ],
  },

  sttp: {
    label: "Short Term Training Program (STTP)",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Starting Date", label: "Start Date", required: true },
      { key: "Ending Date", label: "End Date", required: true },
      { key: "Scope", label: "Scope", required: true },
      { key: "Organizing Body", label: "Organizing Body", required: true },
      { key: "Mode", label: "Mode (Online / Offline / Hybrid)", required: true },
      { key: "Place", label: "Place", required: false },
      { key: "Attended/organized", label: "Attended / Organized", required: true },
      { key: "Role", label: "Role", required: false },
    ],
  },

  conference: {
    label: "Conference",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Starting Date", label: "Start Date", required: true },
      { key: "Ending Date", label: "End Date", required: true },
      { key: "Scope", label: "Scope", required: true },
      { key: "Organizing Body", label: "Organizing Body", required: true },
      { key: "Mode", label: "Mode (Online / Offline / Hybrid)", required: true },
      { key: "Place", label: "Place", required: false },
      { key: "Attended/organized", label: "Attended / Organized", required: true },
      { key: "Role", label: "Role", required: false },
    ],
  },

  workshop: {
    label: "Workshop",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Starting Date", label: "Start Date", required: true },
      { key: "Ending Date", label: "End Date", required: true },
      { key: "Scope", label: "Scope", required: true },
      { key: "Organizing Body", label: "Organizing Body", required: true },
      { key: "Mode", label: "Mode (Online / Offline / Hybrid)", required: true },
      { key: "Place", label: "Place", required: false },
      { key: "Attended/organized", label: "Attended / Organized", required: true },
      { key: "Role", label: "Role", required: false },
    ],
  },

  seminar: {
    label: "Seminar",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Starting Date", label: "Start Date", required: true },
      { key: "Ending Date", label: "End Date", required: true },
      { key: "Scope", label: "Scope", required: true },
      { key: "Organizing Body", label: "Organizing Body", required: true },
      { key: "Mode", label: "Mode (Online / Offline / Hybrid)", required: true },
      { key: "Place", label: "Place", required: false },
      { key: "Attended/organized", label: "Attended / Organized", required: true },
      { key: "Role", label: "Role", required: false },
    ],
  },

  webinar: {
    label: "Webinar",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Starting Date", label: "Start Date", required: true },
      { key: "Ending Date", label: "End Date", required: true },
      { key: "Scope", label: "Scope", required: true },
      { key: "Organizing Body", label: "Organizing Body", required: true },
      { key: "Mode", label: "Mode (Online / Offline / Hybrid)", required: true },
      { key: "Place", label: "Place", required: false },
      { key: "Attended/organized", label: "Attended / Organized", required: true },
      { key: "Role", label: "Role", required: false },
    ],
  },

  rc: {
    label: "Refresher Course (RC)",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Starting Date", label: "Start Date", required: true },
      { key: "Ending Date", label: "End Date", required: true },
      { key: "Scope", label: "Scope", required: true },
      { key: "Organizing Body", label: "Organizing Body", required: true },
      { key: "Mode", label: "Mode (Online / Offline / Hybrid)", required: true },
      { key: "Place", label: "Place", required: false },
      { key: "Attended/organized", label: "Attended / Organized", required: true },
      { key: "Role", label: "Role", required: false },
    ],
  },

  oc: {
    label: "Orientation Course (OC)",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Starting Date", label: "Start Date", required: true },
      { key: "Ending Date", label: "End Date", required: true },
      { key: "Scope", label: "Scope", required: true },
      { key: "Organizing Body", label: "Organizing Body", required: true },
      { key: "Mode", label: "Mode (Online / Offline / Hybrid)", required: true },
      { key: "Place", label: "Place", required: false },
      { key: "Attended/organized", label: "Attended / Organized", required: true },
      { key: "Role", label: "Role", required: false },
    ],
  },

  talk: {
    label: "Expert Talks",
    attributes: [
      { key: "Name Of The Event", label: "Event Name", required: true },
      { key: "Date", label: "Date", required: false },
      { key: "Topic/title Of Talk", label: "Talk Title", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Mode", label: "Mode", required: false },
      { key: "Place", label: "Place", required: false },
    ],
  },

  keynote: {
    label: "Keynote Address",
    attributes: [
      { key: "Conference Title", label: "Conference Title", required: true },
      { key: "Name Of The Event", label: "Event Name", required: true },
      { key: "Date", label: "Date", required: false },
      { key: "Topic/title Of Keynote", label: "Talk Title", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Mode", label: "Mode", required: false },
      { key: "Place", label: "Place", required: false },
    ],
  },

  chair: {
    label: "Session Chair",
    attributes: [
      { key: "Conference Title", label: "Conference Title", required: true },
      { key: "Name Of The Event", label: "Event Name", required: true },
      { key: "Date", label: "Date", required: false },
      { key: "Topic/title Of Session", label: "Talk Title", required: false },
      { key: "Scope", label: "Scope", required: false },
      { key: "Mode", label: "Mode", required: false },
      { key: "Place", label: "Place", required: false },
    ],
  },

  lecture: {
    label: "Guest Lectures",
    attributes: [
      { key: "Organizing Institution", label: "Institution", required: true },
      { key: "Date", label: "Date", required: false },
      { key: "Topic/title Of Lecture", label: "Talk Title", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Mode", label: "Mode", required: false },
      { key: "Place", label: "Place", required: false },
    ],
  },

  resource_person: {
    label: "Resource Person",
    attributes: [
      { key: "Organizing Institution", label: "Institution", required: true },
      { key: "Date", label: "Date", required: false },
      { key: "Topic/title Of Lecture", label: "Talk Title", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Mode", label: "Mode", required: false },
      { key: "Place", label: "Place", required: false },
    ],
  },

  mooc_content: {
    label: "MOOC Content",
    attributes: [
      { key: "Contribution In Mooc", label: "Contribution In Mooc", required: true },
      { key: "Title Of The Mooc", label: "Content Title", required: true },
      { key: "Month Year", label: "Date/Year", required: true },
    ],
  },

  e_content: {
    label: "e-Content",
    attributes: [
      { key: "Contribution In E Content", label: "Contribution In E Content", required: true },
      { key: "Title Of The E Content", label: "Content Title", required: true },
      { key: "Month Year", label: "Date/Year", required: true },
      { key: "Module Is Being Used By Organization", label: "Module Is Being Used By Organization", required: false },
    ],
  },

  innovative_pedagogy: {
    label: "Innovative Pedagogy",
    attributes: [
      { key: "Title Of The Pedagogical Innovation", label: "Title Of The Pedagogical Innovation", required: true },
      { key: "Nature Of Pedagogical Innovation", label: "Nature Of Pedagogical Innovation", required: true },
      { key: "Year Of Development", label: "Year Of Development", required: true },
      { key: "Pedagogy Is Being Used By Organization", label: "Pedagogy Is Being Used By Organization", required: false },
    ],
  },

  awards_and_recognitions: {
    label: "Awards And Recognitions",
    attributes: [
      { key: "Award/recognition Title", label: "Award Title", required: true },
      { key: "Granting Organization/institution", label: "Institution", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Year", label: "Year", required: true },
    ],
  },

  ieee: {
    label: "IEEE Membership",
    attributes: [
      { key: "Membership Id", label: "Membership ID", required: false },
      { key: "Membership Type", label: "Membership Type", required: true },
      { key: "Year Joined", label: "Year Joined", required: true },
      { key: "Validity Period", label: "Validity", required: false },
    ],
  },

  acm: {
    label: "ACM Membership",
    attributes: [
      { key: "Membership Id", label: "Membership ID", required: false },
      { key: "Membership Type", label: "Membership Type", required: true },
      { key: "Year Joined", label: "Year Joined", required: true },
      { key: "Validity Period", label: "Validity", required: false },
    ],
  },

  csi: {
    label: "CSI Membership",
    attributes: [
      { key: "Membership Id", label: "Membership ID", required: false },
      { key: "Membership Type", label: "Membership Type", required: true },
      { key: "Year Joined", label: "Year Joined", required: true },
      { key: "Validity Period", label: "Validity", required: false },
    ],
  },

  ie: {
    label: "IE Membership",
    attributes: [
      { key: "Membership Id", label: "Membership ID", required: false },
      { key: "Membership Type", label: "Membership Type", required: true },
      { key: "Year Joined", label: "Year Joined", required: true },
      { key: "Validity Period", label: "Validity", required: false },
    ],
  },

  iete: {
    label: "IETE Membership",
    attributes: [
      { key: "Membership Id", label: "Membership ID", required: false },
      { key: "Membership Type", label: "Membership Type", required: true },
      { key: "Year Joined", label: "Year Joined", required: true },
      { key: "Validity Period", label: "Validity", required: false },
    ],
  },

  other_bodies: {
    label: "Other Professional Bodies",
    attributes: [
      { key: "Name Of The Professional Body", label: "Name Of The Professional Body", required: true },
      { key: "Membership Id", label: "Membership ID", required: false },
      { key: "Membership Type", label: "Membership Type", required: true },
      { key: "Year Joined", label: "Year Joined", required: true },
      { key: "Validity Period", label: "Validity", required: false },
    ],
  },

  any_moocs_course: {
    label: "Any MOOCs Course",
    attributes: [
      { key: "Name Of Certification Course", label: "Course Name", required: true },
      { key: "Duration", label: "Duration", required: true },
      { key: "Transmitted Language", label: "Transmitted Language", required: true },
      // "Certificate" omitted (file field)
    ],
  },

  book_book_chapter: {
    label: "Book / Book Chapter",
    attributes: [
      { key: "Title Of The Book/book Chapter", label: "Title", required: true },
      { key: "Name Of The Publisher", label: "Publisher", required: true },
      { key: "Month & Year Of Publication", label: "Month & Year Of Publication", required: true },
      { key: "Isbn/issn Number", label: "ISBN/ISSN", required: true },
      { key: "No. Of Chapters Translated", label: "Chapters Translated", required: false },
      { key: "No. Of Books Translated", label: "Books Translated", required: false },
    ],
  },

  phd_awarded: {
    label: "PhD Students Awarded",
    attributes: [
      { key: "Title Of The Thesis", label: "Thesis Title", required: false },
      { key: "Name Of The Scholar", label: "Scholar Name", required: false },
      { key: "Reg No", label: "Registration Number", required: false },
      { key: "Role Of Scholar", label: "Role", required: false },
      { key: "Year Of Awarding", label: "Year", required: true },
      // "Proceeding" omitted if considered document-like (ambiguous, but kept only if not a file)
      // Assuming "Proceeding" is textual info → include
      { key: "Proceeding", label: "Proceeding", required: false },
    ],
  },

  phd_ongoing: {
    label: "PhD Students Ongoing",
    attributes: [
      { key: "Title Of The Thesis", label: "Thesis Title", required: false },
      { key: "Name Of The Scholar", label: "Scholar Name", required: false },
      { key: "Reg No", label: "Registration Number", required: false },
      { key: "Role Of Scholar", label: "Role", required: false },
      { key: "Year Of Joining", label: "Year Of Joining", required: true },
      // "Allotment Order" is a file → omit
    ],
  },

  mtech: {
    label: "M.Tech Students",
    attributes: [
      { key: "Year Of Awarding", label: "Year", required: true },
      { key: "Number Of Students", label: "Students", required: true },
    ],
  },
};

const fields = {
  foreign_visits: [
    'Purpose Of Visit',
    'Nature Of Visit',
    'Name Of Conference/event',
    'Title Of The Paper/talk',
    'Academic Year',
    'Name Of Host Organization',
    'Country Visited',
    'Start Date',
    'End Date',
    'Role Of Faculty',
    'Sponsoring Agency',
    'Amount Sanctioned',
    'Travel/grant/received',
    'Document'
  ],
  patents: [
    'Patent Number',
    'Title Of The Patent',
    'Published/granted',
    'Year Of Published/granted',
    'Scope',
    'Document'
  ],
  book_chapter: [
    'Title Of The Book Chapter',
    'Name Of The Publisher',
    'Year Of Publication',
    'National/international',
    'Isbn Number',
    'No. Of Authors',
    'Document'
  ],
  book: [
    'Title Of The Book',
    'Name Of The Publisher',
    'Year Of Publication',
    'National/international',
    'Isbn Number',
    'Document'
  ],
  journal: [
    'Title Of The Paper',
    'Name Of The Journal',
    'Page Number',
    'Year Of Publication',
    'Volume Number',
    'Impact Factor Thomson Reuters',
    'National/international',
    'Issn Number',
    'No. Of Authors',
    'Author',
    'Indexing Platform',
    'H Index',
    'Document'
  ],
  conference_paper: [
    'Title Of The Paper',
    'Title Of The Conference',
    'Date Of Publication',
    'Organized By',
    'National/international',
    'Document'
  ],
  nptel: [
    'Name Of Certification Course',
    'Type Of Certification',
    'Duration In Weeks',
    'Document'
  ],
  swayam: [
    'Name Of Certification Course',
    'Type Of Certification',
    'Duration In Weeks',
    'Document'
  ],
  coursera: [
    'Name Of Certification Course',
    'Type Of Certification',
    'Duration In Weeks',
    'Document'
  ],
  infosysspringboard: [
    'Name Of Certification Course',
    'Type Of Certification',
    'Duration In Weeks',
    'Document'
  ],
  edx: [
    'Name Of Certification Course',
    'Type Of Certification',
    'Duration In Weeks',
    'Document'
  ],
  other: [
    'Name Of Certification Course',
    'Type Of Certification',
    'Organized By',
    'Duration In Weeks',
    'Document'
  ],
  sponsored: [
    'Project Title',
    'Funding Agency',
    'Amount In Inr',
    'Duration In Months',
    'Academic Year',
    'Are You',
    'Status',
    'Sanctioning Order',
    'Utilization Certificate Final Year'
  ],
  research: [
    'Project Title',
    'Year Of Sanction',
    'Duration',
    'Funding Agency',
    'Sanctioned Amount',
    'Recieved Amount Utilized',
    'Are You',
    'Status',
    'Sanctioning Order',
    'Utilization Certificate Final Year'
  ],
  consultancy: [
    'Project Title',
    'Year Of Sanction',
    'Duration',
    'Funding Agency',
    'Amount In Inr',
    'Are You',
    'Status',
    'Sanctioning Order',
    'Utilization Certificate Final Year'
  ],
  fdp: [
    'Program Title',
    'Starting Date',
    'Ending Date',
    'Scope',
    'Organizing Body',
    'Mode',
    'Place',
    'Attended/organized',
    'Role',
    'Document'
  ],
  sttp: [
    'Program Title',
    'Starting Date',
    'Ending Date',
    'Scope',
    'Organizing Body',
    'Mode',
    'Place',
    'Attended/organized',
    'Role',
    'Document'
  ],
  conference: [
    'Program Title',
    'Starting Date',
    'Ending Date',
    'Scope',
    'Organizing Body',
    'Mode',
    'Place',
    'Attended/organized',
    'Role',
    'Document'
  ],
  workshop: [
    'Program Title',
    'Starting Date',
    'Ending Date',
    'Scope',
    'Organizing Body',
    'Mode',
    'Place',
    'Attended/organized',
    'Role',
    'Document'
  ],
  seminar: [
    'Program Title',
    'Starting Date',
    'Ending Date',
    'Scope',
    'Organizing Body',
    'Mode',
    'Place',
    'Attended/organized',
    'Role',
    'Document'
  ],
  webinar: [
    'Program Title',
    'Starting Date',
    'Ending Date',
    'Scope',
    'Organizing Body',
    'Mode',
    'Place',
    'Attended/organized',
    'Role',
    'Document'
  ],
  rc: [
    'Program Title',
    'Starting Date',
    'Ending Date',
    'Scope',
    'Organizing Body',
    'Mode',
    'Place',
    'Attended/organized',
    'Role',
    'Document'
  ],
  oc: [
    'Program Title',
    'Starting Date',
    'Ending Date',
    'Scope',
    'Organizing Body',
    'Mode',
    'Place',
    'Attended/organized',
    'Role',
    'Document'
  ],
  talk: [
    'Name Of The Event',
    'Date',
    'Topic/title Of Talk',
    'Scope',
    'Mode',
    'Place',
    'Document'
  ],
  keynote: [
    'Name Of The Event',
    'Date',
    'Topic/title Of Keynote',
    'Scope',
    'Mode',
    'Place',
    'Document'
  ],
  chair: [
    'Conference Title',
    'Name Of The Event',
    'Date',
    'Topic/title Of Session',
    'Scope',
    'Mode',
    'Place',
    'Document'
  ],
  lecture: [
    'Organizing Institution',
    'Date',
    'Topic/title Of Lecture',
    'Scope',
    'Mode',
    'Place',
    'Document'
  ],
  resource_person: [
    'Organizing Institution',
    'Date',
    'Topic/title Of Lecture',
    'Scope',
    'Mode',
    'Place',
    'Document'
  ],
  mooc_content: [
    'Contribution In Mooc',
    'Number Of Moocs',
    'Title Of The Mooc',
    'Month Year',
    'Document'
  ],
  e_content: [
    'Contribution In E Content',
    'Number Of E Contents',
    'Title Of The E Content',
    'Month Year',
    'Module Is Being Used By Organization',
    'Document'
  ],
  innovative_pedagogy: [
    'Title Of The Pedagogical Innovation',
    'Nature Of Pedagogical Innovation',
    'Year Of Development',
    'Pedagogy Is Being Used By Organization',
    'Document'
  ],
  awards_and_recognitions: [
    'Award/recognition Title',
    'Granting Organization/institution',
    'Scope',
    'Year',
    'Document'
  ],
  ieee: [
    'Membership Id',
    'Membership Type',
    'Year Joined',
    'Validity Period',
    'Document'
  ],
  acm: [
    'Membership Id',
    'Membership Type',
    'Year Joined',
    'Validity Period',
    'Document'
  ],
  csi: [
    'Membership Id',
    'Membership Type',
    'Year Joined',
    'Validity Period',
    'Document'
  ],
  ie: [
    'Membership Id',
    'Membership Type',
    'Year Joined',
    'Validity Period',
    'Document'
  ],
  iete: [
    'Membership Id',
    'Membership Type',
    'Year Joined',
    'Validity Period',
    'Document'
  ],
  other_bodies: [
    'Name Of The Professional Body',
    'Membership Id',
    'Membership Type',
    'Year Joined',
    'Validity Period',
    'Document'
  ],
  any_moocs_course: [
    'Name Of Certification Course',
    'Duration',
    'Transmitted Language',
    'Certificate'
  ],
  book_book_chapter: [
    'Title Of The Book/book Chapter',
    'Name Of The Publisher',
    'Month & Year Of Publication',
    'Isbn/issn Number',
    'No. Of Chapters Translated',
    'No. Of Books Translated',
    'Document'
  ],
  phd_awarded: [
    'Number Of Students',
    'Title Of The Thesis',
    'Name Of The Scholar',
    'Reg No',
    'Role Of Scholar',
    'Year Of Awarding',
    'Proceeding'
  ],
  phd_ongoing: [
    'Number Of Students',
    'Title Of The Thesis',
    'Name Of The Scholar',
    'Reg No',
    'Role Of Scholar',
    'Year Of Joining',
    'Allotment Order'
  ],
  mtech: [
    'Year Of Awarding',
    'Number Of Students'
  ]
};

const phd_awarded_fields = [
  'Title Of The Thesis',
  'Name Of The Scholar',
  'Reg No',
  'Role Of Scholar',
  'Year Of Awarding',
  'Proceeding'
];

const phd_joining_fields = [
  'Title Of The Thesis',
  'Name Of The Scholar',
  'Reg No',
  'Role Of Scholar',
  'Year Of Joining',
  'Allotment Order'
];

const MOOC_fields = [
  'Title Of The Mooc',
  'Month Year',
  'Document'
];

const e_content_fields = [
  'Title Of The E Content',
  'Month Year',
  'Module Is Being Used By Organization',
  'Document'
];

const AtKeys = [
  { key: "acm", label: "ACM Membership" },
  { key: "awards_and_recognitions", label: "Awards & Recognitions" },
  { key: "book", label: "Books" },
  { key: "book_chapter", label: "Book Chapters" },
  { key: "certifications", label: "Certifications (General)" },
  { key: "conference", label: "Conferences" },
  { key: "conference_paper", label: "Conference Papers" },
  { key: "consultancy", label: "Consultancy Projects" },
  { key: "course_content", label: "Course Content" },
  { key: "coursera", label: "Coursera Certifications" },
  { key: "csi", label: "CSI Membership" },
  { key: "e_content", label: "e-Content" },
  { key: "edx", label: "edX Certifications" },
  { key: "talk", label: "Expert Talks" },
  { key: "fdp", label: "Faculty Development Programs (FDP)" },
  { key: "foreign_visits", label: "Foreign Visits" },
  { key: "lecture", label: "Guest Lectures" },
  { key: "ieee", label: "IEEE Membership" },
  { key: "infosysspringboard", label: "Infosys Springboard Certifications" },
  { key: "journal", label: "Journal Publications" },
  { key: "keynote", label: "Keynote Addresses" },
  { key: "mooc_content", label: "MOOC Content" },
  { key: "nptel", label: "NPTEL Certifications" },
  { key: "oc", label: "Orientation Courses (OC)" },
  { key: "other", label: "Other Certifications" },
  { key: "patents", label: "Patents" },
  { key: "phd_awarded", label: "PhD Students Awarded" },
  { key: "phd_ongoing", label: "PhD Students Ongoing" },
  { key: "rc", label: "Refresher Courses (RC)" },
  { key: "research", label: "Research Projects" },
  { key: "mtech", label: "Research Guidance of M.Tech/ME" },
  { key: "resource_person", label: "Resource Person" },
  { key: "seminar", label: "Seminars" },
  { key: "chair", label: "Session Chair" },
  { key: "sttp", label: "Short Term Training Programs (STTP)" },
  { key: "sponsored", label: "Sponsored Projects" },
  { key: "swayam", label: "SWAYAM Certifications" },
  { key: "webinar", label: "Webinars" },
  { key: "workshop", label: "Workshops" },

];

const departments = [
  "BS & HSS",
  "Computer Science and Engineering",
  "Electrical and Electronics Engineering",
  "Electronics and Communication Engineering",
  "Civil Engineering",
  "Information Technology",
  "Metallurgical Engineering",
  "Mechanical Engineering",
  "Master's in Business Administration"
]

export { schemas, yearFields, fields, phd_awarded_fields, phd_joining_fields, e_content_fields, MOOC_fields, AtKeys, departments };