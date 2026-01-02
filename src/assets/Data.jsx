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
      { key: "Title Of The Paper", label: "Title Of The Paper", required: true },
      { key: "Name Of The Journal", label: "Name Of The Journal", required: true },
      { key: "Page Number", label: "Page Number(s)", required: false },
      { key: "Year Of Publication", label: "Year Of Publication", required: true },
      { key: "Volume Number", label: "Volume Number", required: false },
      { key: "Impact Factor Thomson Reuters", label: "Impact Factor (Thomson Reuters)", required: false },
      { key: "National/international", label: "National / International", required: true },
      { key: "Issn Number", label: "ISSN Number", required: true },
      { key: "No Of Authors", label: "Number Of Authors", required: false },
      { key: "Author", label: "Author(s)", required: true },
      { key: "Indexing Platform", label: "Indexing Platform", required: false },
      { key: "H Index", label: "H-Index", required: false },
      { key: "Document", label: "Supporting Document", required: false },
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
    { key: "Project Title", label: "Project Title", required: true },
    { key: "Funding Agency", label: "Funding Agency", required: true },
    { key: "Amount In Inr", label: "Amount (INR)", required: true },
    { key: "Duration In Months", label: "Duration (Months)", required: true },
    { key: "Academic Year", label: "Academic Year", required: true },
    { key: "Are You", label: "Role (PI / Co-PI)", required: true },
    { key: "Status", label: "Project Status", required: true },
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
  ],
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

  awards_and_recognitions: {
    label: "Awards And Recognitions",
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
  foreign_visits: {
    label: "Foreign Visits",
    attributes: [
      { key: "Purpose Of Visit", label: "Purpose Of Visit", required: true },
      { key: "Nature Of Visit", label: "Nature Of Visit", required: true },
      { key: "Name Of Conference Event", label: "Name Of Conference / Event", required: false },
      { key: "Academic Year", label: "Academic Year", required: true },
      { key: "Name Of Host Organization", label: "Host Organization", required: true },
      { key: "Country Visited", label: "Country Visited", required: true },
      { key: "Start Date", label: "Start Date", required: true },
      { key: "End Date", label: "End Date", required: true },
      { key: "Duration In Days", label: "Duration (Days)", required: false },
      { key: "Role Of Faculty", label: "Role Of Faculty", required: false },
      { key: "Title Of The Paper Talk", label: "Title Of Paper / Talk", required: false },
      { key: "Sponsoring Agency", label: "Sponsoring Agency", required: false },
      { key: "Amount Sanctioned", label: "Amount Sanctioned", required: false },
      { key: "Travel/grant/received", label: "Travel / Grant Received", required: false },
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
    'Travel grant received',
    'Document'
  ],
  patents: [
    'Patent Number',
    'Title Of The Patent',
    'Published granted',
    'Year Of Published granted',
    'Scope',
    'Document'
  ],
  book_chapter: [
    'Title Of The Book Chapter',
    'Name Of The Publisher',
    'Year Of Publication',
    'National international',
    'Isbn Number',
    'No Of Authors',
    'Document'
  ],
  book: [
    'Title Of The Book',
    'Name Of The Publisher',
    'Year Of Publication',
    'National international',
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
    'National international',
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
    'National international',
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
    'Attended organized',
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
    'Attended organized',
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
    'Attended organized',
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
    'Attended organized',
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
    'Attended organized',
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
    'Attended organized',
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
    'Attended organized',
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
    'Attended organized',
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
  awards_and_recognitions: [
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
    'Title Of The Book Book Chapter',
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
  { key: "conference_paper", label: "Conference Papers" },

  { key: "book", label: "Books" },
  { key: "book_chapter", label: "Book Chapters" },

  { key: "conference", label: "Conferences" },
  { key: "seminar", label: "Seminars" },
  { key: "workshop", label: "Workshops" },
  { key: "fdp", label: "Faculty Development Programs (FDP)" },
  { key: "sttp", label: "Short Term Training Programs (STTP)" },
  { key: "webinar", label: "Webinars" },
  { key: "rc", label: "Refresher Courses (RC)" },
  { key: "oc", label: "Orientation Courses (OC)" },

  { key: "talk", label: "Expert Talks" },
  { key: "keynote", label: "Keynote Addresses" },
  { key: "chair", label: "Session Chair" },
  { key: "lecture", label: "Guest Lectures" },
  { key: "resource_person", label: "Resource Person" },

  { key: "certifications", label: "Certifications (General)" },
  { key: "nptel", label: "NPTEL Certifications" },
  { key: "swayam", label: "SWAYAM Certifications" },
  { key: "coursera", label: "Coursera Certifications" },
  { key: "infosysspringboard", label: "Infosys Springboard Certifications" },
  { key: "edx", label: "edX Certifications" },
  { key: "other", label: "Other Certifications" },

  { key: "awards_and_recognitions", label: "Awards & Recognitions" },

  { key: "research", label: "Research Projects" },
  { key: "sponsored", label: "Sponsored Projects" },
  { key: "consultancy", label: "Consultancy Projects" },

  { key: "foreign_visits", label: "Foreign Visits" },

  { key: "mooc_content", label: "MOOC Content" },
  { key: "eContent", label: "e-Content" },
  { key: "course_content", label: "Course Content" },

  { key: "ieee", label: "IEEE Membership" },
  { key: "acm", label: "ACM Membership" },
  { key: "csi", label: "CSI Membership" },

  { key: "phd_awarded", label: "PhD Students Awarded" },
  { key: "phd_ongoing", label: "PhD Students Ongoing" },
  { key: "mtech", label: "M.Tech Students" },
  { key: "mphilmba", label: "MPhil / MBA Students" },
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

export { schemas, yearFields, fields, phd_awarded_fields, phd_joining_fields, MOOC_fields, e_content_fields, AtKeys, departments };