import { label } from "framer-motion/client";

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
  consultancy: "Year of Sanction",
  phd_awarded: "Year of Awarding",
  ieee: "Year Joined",
  csi: "Year Joined",
};

const schemas = {
  patents: {
    label: "Patents",
    attributes: [
      { key: "Patent Number", label: "Patent Number", required: true },
      { key: "Title of the Patent", label: "Title", required: true },
      { key: "Published/granted", label: "Published/granted", required: true },
      { key: "Year of Published/granted", label: "Year", required: true },
      { key: "Scope", label: "Scope", required: true },
    ],
  },

  book_chapter: {
    label: "Book Chapters",
    attributes: [
      { key: "Title of the Book Chapter", label: "Chapter Title", required: true },
      { key: "Name of the Publisher", label: "Publisher", required: true },
      { key: "Year of Publication", label: "Year", required: true },
      { key: "National/international", label: "Scope", required: false },
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
      { key: "National/international", label: "Scope", required: false },
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
      { key: "National/international", label: "Scope", required: true },
      { key: "Impact Factor", label: "Impact Factor", required: false },
      { key: "ISSN Number", label: "ISSN", required: false },
      { key: "Indexing Platform", label: "Indexing", required: false },
      { key: "H-index", label: "H-index", required: false },
    ],
  },

  conference_paper: {
    label: "Conference Papers",
    attributes: [
      { key: "Title of the Paper", label: "Paper Title", required: true },
      { key: "Title of the Conference", label: "Conference Title", required: true },
      { key: "Date of Publication", label: "Date", required: false },
      { key: "Organized by", label: "Organizer", required: true },
      { key: "National/international", label: "Scope", required: false },
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
      { key: "Funding Agency", label: "Funding Agency", required: true },
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
      { key: "Status", label: " Status", required: true }
    ],
  },

  fdp: {
    label: "FDP",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Year", label: "Year", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Organizing Body", label: "Organizer", required: true },
      { key: "Mode", label: "Mode", required: true },
      { key: "Place", label: "Place", required: false },
      { key: "Attended/organized", label: "Role", required: true },
      { key: "Role", label : "Role" , required:true}
    ],
  },

  sttp: {
    label: "STTP",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Year", label: "Year", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Organizing Body", label: "Organizer", required: true },
      { key: "Mode", label: "Mode", required: true },
      { key: "Place", label: "Place", required: false },
      { key: "Attended/organized", label: "Role", required: true },
      { key: "Role", label : "Role" , required:true}
    ],
  },

  workshop: {
    label: "Workshops",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Year", label: "Year", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Organizing Body", label: "Organizer", required: true },
      { key: "Mode", label: "Mode", required: false },
      { key: "Place", label: "Place", required: false },
      { key: "Attended/organized", label: "Role", required: true },
      { key: "Role", label : "Role" , required:true}
    ],
  },

  seminar: {
    label: "Seminars",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Year", label: "Year", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Organizing Body", label: "Organizer", required: true },
      { key: "Mode", label: "Mode", required: false },
      { key: "Place", label: "Place", required: false },
      { key: "Attended/organized", label: "Role", required: true },
      { key: "Role", label : "Role" , required:true}
    ],
  },

  webinar: {
    label: "Webinars",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Year", label: "Year", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Organizing Body", label: "Organizer", required: true },
      { key: "Mode", label: "Mode", required: true },
      { key: "Place", label: "Place", required: false },
      { key: "Attended/organized", label: "Role", required: true },
      { key: "Role", label : "Role" , required:true}
    ],
  },

  RC: {
    label: "Refresher Courses",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Year", label: "Year", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Organizing Body", label: "Organizer", required: true },
      { key: "Mode", label: "Mode", required: true },
      { key: "Place", label: "Place", required: false },
      { key: "Attended/organized", label: "Role", required: true },
      { key: "Role", label : "Role" , required:true}
    ],
  },

  OC: {
    label: "Orientation Courses",
    attributes: [
      { key: "Program Title", label: "Program Title", required: true },
      { key: "Year", label: "Year", required: true },
      { key: "Scope", label: "Scope", required: false },
      { key: "Organizing Body", label: "Organizer", required: true },
      { key: "Mode", label: "Mode", required: true },
      { key: "Place", label: "Place", required: false },
      { key: "Attended/organized", label: "Role", required: true },
      { key: "Role", label : "Role" , required:true}
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
      { key: "Place", label: "Place", required: false },
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
      { key: "Place", label: "Place", required: false },
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
      { key: "Place", label: "Place", required: false },
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
      { key: "Place", label: "Place", required: false },
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
      { key: "Place", label: "Place", required: false },
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

const fields = {
  foreign_visits: [
    'Purpose Of Visit',
    'Nature Of Visit',
    'Name Of Conference Event',
    'Academic Year',
    'Name Of Host Organization',
    'Country Visited',
    'Start Date',
    'End Date',
    'Duration In Days',
    'Role Of Faculty',
    'Title Of The Paper Talk',
    'Sponsoring Agency',
    'Amount Sanctioned',
    'Travel/grant/recieved',
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
    'No Of Authors',
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
    'No Of Authors',
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
    'Utilization Certificate of Final Year'
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
    'Event Title',
    'Name Of The Event',
    'Date',
    'Topic Title Of Talk',
    'Scope',
    'Mode',
    'Place',
    'Document'
  ],
  keynote: [
    'Conference Title',
    'Name Of The Event',
    'Date',
    'Topic Title Of Talk',
    'Scope',
    'Mode',
    'Place',
    'Document'
  ],
  chair: [
    'Conference Title',
    'Name Of The Event',
    'Date',
    'Topic Title Of Talk',
    'Scope',
    'Mode',
    'Place',
    'Document'
  ],
  lecture: [
    'Organizing Institution',
    'Date',
    'Topic Title Of Talk',
    'Scope',
    'Mode',
    'Place',
    'Document'
  ],
  resource_person: [
    'Event Title',
    'Organizing Institution',
    'Date',
    'Topic Title Of Talk',
    'Scope',
    'Mode',
    'Place',
    'Document'
  ],
  mooc_content: [
    'Contribution In Mooc',
    'Number Of Moocs',
    ...MOOC_fields  // ← now uses the Title Case version above
  ],
  e_content: [
    'Contribution In E Content',
    'Number Of E Contents',
    ...e_content_fields  // ← uses Title Case version above
  ],
  innovative_pedagogy: [
    'Title Of The Pedagogical Innovation',
    'Nature Of Pedagogical Innovation',
    'Year Of Development',
    'Pedagogy Is Being Used By Organization',
    'Document'
  ],
  award_ttle: [
    'Award Recognition Title',
    'Granting Organization Institution',
    'Scope',
    'Year',
    'Document'
  ],
  ieee: [
    'Membership Id',
    'Membership Type',
    'Year Joined',
    'Validity Period If Applicable',
    'Document'
  ],
  acm: [
    'Membership Id',
    'Membership Type',
    'Year Joined',
    'Validity Period If Applicable',
    'Document'
  ],
  csi: [
    'Membership Id',
    'Membership Type',
    'Year Joined',
    'Validity Period If Applicable',
    'Document'
  ],
  ie: [
    'Membership Id',
    'Membership Type',
    'Year Joined',
    'Validity Period If Applicable',
    'Document'
  ],
  iete: [
    'Membership Id',
    'Membership Type',
    'Year Joined',
    'Validity Period If Applicable',
    'Document'
  ],
  other_bodies: [
    'Name Of The Professional Body',
    'Membership Id',
    'Membership Type',
    'Year Joined',
    'Validity Period If Applicable',
    'Document'
  ],
  any_moocs_course: [
    'Name Of Certification Course',
    'Duration',
    'Transmitted Language',
    'Certificate'
  ],
  book_book_chapter: [
    'Title Of The Book/Book Chapter',
    'Name Of The Publisher',
    'Month Year Of Publication',
    'Isbn/Issn Number',
    'No Of Chapters Translated',
    'No Of Books Translated',
    'Document'
  ],
  phd_awarded: [
    'Number Of Students',
    ...phd_awarded_fields  // ← Title Case version above
  ],
  phd_ongoing: [
    'Number Of Students',
    ...phd_joining_fields  // ← Title Case version above
  ],
  mtech: [
    'Year Of Awarding',
    'Number Of Students'
  ]
};

const AtKeys = [
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
]

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

export { schemas, yearFields, fields, phd_awarded_fields, phd_joining_fields, MOOC_fields, e_content_fields, AtKeys,departments };