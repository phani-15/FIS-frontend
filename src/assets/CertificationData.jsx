const names = {
    award_title: 'Awards & Recognitions',
    acm: 'ACM Membership',
    book: 'Books',
    book_chapter: 'Book Chapters',
    conference_paper: 'Conference Papers',
    conference: 'Conferences',
    consultancy: 'Consultancy Projects',
    coursera: 'Coursera Certifications',
    csi: 'CSI Membership',
    edx: 'edX Certifications',
    fdp: 'FDPs',
    foreign_visits: 'Foreign Visits',
    lecture: 'Guest Lectures',
    ie: 'IE Membership',
    ieee: 'IEEE Membership',
    iete: 'IETE Membership',
    infosysspringboard: 'Infosys Springboard',
    innovative_pedagogy: 'Innovative Pedagogy',
    talk: 'Invited Talks',
    journal: 'Journal Publications',
    keynote: 'Keynote Addresses',
    nptel: 'NPTEL Certifications',
    OC: 'Orientation Courses',
    other: 'Other Certifications',
    other_bodies: 'Other Professional Bodies',
    patents: 'Patents',
    RC: 'Refresher Courses',
    research: 'Research Projects',
    resource_person: 'Resource Person',
    seminar: 'Seminars',
    chair: 'Session Chair',
    sponsored: 'Sponsored Projects',
    sttp: 'STTPs',
    swayam: 'SWAYAM Certifications',
    any_moocs_course: 'Transmission works(any moocs)',
    book_book_chapter: 'Transmission works(Book/Book Chapters)',
    webinar: 'Webinars',
    workshop: 'Workshops',
    phd_awarded : "Research Guidance(PhD's awarded)",
    phd_ongoing:"Research Guidance(PhD's ongoing)",
    mtech : "Research Guidance(M.Tech/M.E)"
  };

  const map = {
    foreign_visits: ['Purpose of Visit', 'Name of Conference/Event', 'Country Visited'],
    patents: ['Title of the Patent', 'Patent Number', 'Year of Published/Granted'],
    book_chapter: ['Title of the Book Chapter', 'Name of the Publisher', 'Year of Publication'],
    book: ['Title of the Book', 'Name of the Publisher', 'Year of Publication'],
    journal: ['Title of the Paper', 'Name of the Journal', 'Year of Publication'],
    conference_paper: ['Title of the Paper', 'Title of the Conference', 'Date of Publication'],
    nptel: ['Name of Certification Course', 'Type of Certification', 'Duration (in weeks)'],
    swayam: ['Name of Certification Course', 'Type of Certification', 'Duration (in weeks)'],
    coursera: ['Name of Certification Course', 'Type of Certification', 'Duration (in weeks)'],
    infosysspringboard: ['Name of Certification Course', 'Type of Certification', 'Duration (in weeks)'],
    edx: ['Name of Certification Course', 'Type of Certification', 'Duration (in weeks)'],
    other: ['Name of Certification Course', 'Organized by', 'Duration (in weeks)'],
    sponsored: ['Project Title', 'Funding Agency', 'Amount (in INR)'],
    research: ['Project Title', 'Funding Agency', 'Year of Sanction'],
    consultancy: ['Project Title', 'Funding Agency', 'Year of Sanction'],
    fdp: ['Program Title', 'Organizing Body', 'Mode'],
    sttp: ['Program Title', 'Organizing Body', 'Mode'],
    conference: ['Program Title', 'Organizing Body', 'Mode'],
    workshop: ['Program Title', 'Organizing Body', 'Mode'],
    seminar: ['Program Title', 'Organizing Body', 'Mode'],
    webinar: ['Program Title', 'Organizing Body', 'Mode'],
    RC: ['Program Title', 'Organizing Body', 'Mode'],
    OC: ['Program Title', 'Organizing Body', 'Mode'],
    talk: [ 'Topic / Title of Talk', 'Date'],
    keynote: ['Conference Title', 'Topic / Title of Talk', 'Date'],
    chair: ['Conference Title', 'Topic / Title of Talk', 'Date'],
    lecture: ['Organizing Institution', 'Topic / Title of Talk', 'Date'],
    resource_person: [ 'Topic / Title of Talk', 'Date'],
    innovative_pedagogy: ['Title of the Pedagogical Innovation', 'Year of development', 'Pedagogy is being used by Organization'],
    award_title: ['Award / Recognition Title', 'Granting Organization / Institution', 'Year'],
    ieee: ['Membership ID', 'Membership Type', 'Year Joined'],
    acm: ['Membership ID', 'Membership Type', 'Year Joined'],
    csi: ['Membership ID', 'Membership Type', 'Year Joined'],
    ie: ['Membership ID', 'Membership Type', 'Year Joined'],
    iete: ['Membership ID', 'Membership Type', 'Year Joined'],
    other_bodies: ['Name of the Professional Body', 'Membership ID', 'Year Joined'],
    any_moocs_course: ['Name of Certification Course', 'Duration', 'Transmitted language'],
    book_book_chapter: ['Title of the Book/Book Chapter', 'Name of the Publisher', 'Month & year of Publication'],
    mtech : ['Number Of Students',"Year Of Awarding"]
  };

  const initialData = {
    foreign_visits: [
      {
        "Purpose of Visit": "Paper Presentation",
        "Nature of Visit": "Academic",
        "Name of Conference/Event": "International Conference on AI",
        "Academic Year": "2023-24",
        "Name of Host Organization": "MIT",
        "Country Visited": "USA",
        "Start Date": "2024-02-10",
        "End Date": "2024-02-15",
        "Duration (in days)": "5",
        "Role of Faculty": "Presenter",
        "Title of the Paper/Talk": "AI in Smart Cities",
        "Sponsoring Agency": "DST",
        "Amount Sanctioned": "150000",
        "Travel Grant Recieved": "Yes",
        "document": "foreign_visit_doc1.pdf"
      }
    ],
    patents: [
      {
        "Patent Number": "IN2024A000123",
        "Title of the Patent": "Smart Irrigation System",
        "Published/Granted": "Granted",
        "Year of Published/Granted": "2024",
        "Scope": "National",
        "Document": "patent_doc1.pdf"
      },
      {
        "Patent Number": "IN2024A000123",
        "Title of the Patent": "Smart Irrigation System",
        "Published/Granted": "Granted",
        "Year of Published/Granted": "2024",
        "Scope": "National",
        "Document": "patent_doc1.pdf"
      }
    ],
    book_chapter: [
      {
        "Title of the Book Chapter": "Advances in Deep Learning",
        "Name of the Publisher": "Springer",
        "Year of Publication": "2023",
        "National/International": "International",
        "ISBN Number": "978-3-030-12345-6",
        "No. of Authors": "3",
        "Document": "book_chapter_doc.pdf"
      }
    ],
    journal: [
      {
        "Title of the Paper": "IoT for Healthcare",
        "Name of the Journal": "Journal of Smart Systems",
        "Page Number": "45-52",
        "Year of Publication": "2024",
        "Volume Number": "18",
        "Impact Factor (Thomson Reuters)": "3.2",
        "National/International": "International",
        "ISSN Number": "2456-1234",
        "No.of Authors": "4",
        "Author": "First Author",
        "Indexing Platform": "Scopus",
        "H-index": "12",
        "Document": "journal_paper1.pdf"
      }
    ],
    conference_paper: [
      {
        "Title of the Paper": "Blockchain in Education",
        "Title of the Conference": "IEEE International Conference on Emerging Tech",
        "Date of Publication": "2023-11-05",
        "Organized by": "IEEE",
        "National/International": "International",
        "Document": "conference_paper1.pdf"
      }
    ],
    nptel: [
      {
        "Name of Certification Course": "Machine Learning",
        "Type of Certification": "Elite",
        "Duration (in weeks)": "12",
        "certificate": "nptel_ml_cert.pdf"
      }
    ],
    sponsored: [
      {
        "Project Title": "AI-based Traffic Monitoring",
        "Funding Agency": "SERB",
        "Amount (in INR)": "500000",
        "Duration (in months)": "24",
        "Academic Year": "2023-24",
        "Are you": "Principal Investigator",
        "Status": "Ongoing",
        "Sanctioning Order": "sanction_order_ai.pdf",
        "Utilization Certificate (final year)": "uc_pending.pdf"
      }
    ],
    research: [
      {
        "Project Title": "Smart Agriculture Platform",
        "Year of Sanction": "2022",
        "Duration ": "18 months",
        "Funding Agency": "UGC",
        "Sanctioned Amount": "300000",
        "Recieved Amount (utilized)": "200000",
        "Are you": "Co-Principal Investigator",
        "Status": "Ongoing",
        "Sanctioning Order": "sanction_research.pdf",
        "Utilization Certificate (final year)": "uc_not_submitted.pdf"
      }
    ],
    consultancy: [
      {
        "Project Title": "Industrial Automation Consultancy",
        "Year of Sanction": "2023",
        "Duration ": "12 months",
        "Funding Agency": "XYZ Industries",
        "Amount (in INR)": "150000",
        "Are you ": "Consultant",
        "Status": "Completed",
        "Sanctioning Order": "consultancy_order.pdf",
        "Utilization Certificate (final year)": "consultancy_uc.pdf"
      }
    ],
    fdp: [
      {
        "Program Title": "FDP on Data Science",
        "Starting Date": "2024-01-05",
        "Ending Date": "2024-01-10",
        "Scope": "National",
        "Organizing Body": "IIT Delhi",
        "Mode": "Online",
        "Place": "Delhi",
        "Attended/Organized": "Attended",
        "Role": "Participant"
      }
    ],
    talk: [
      {
        "Name of the Event": "Tech Talk Series",
        "Date": "2024-03-15",
        "Topic / Title of Talk": "AI for Everyone",
        "Scope": "Institutional",
        "Mode": "Offline",
        "Place": "College Auditorium",
        "Document": "talk_certificate.pdf"
      }
    ],
    award_title: [
      {
        "Award / Recognition Title": "Best Researcher Award",
        "Granting Organization / Institution": "ABC University",
        "Scope": "University",
        "Year": "2023",
        "Document": "award_doc.pdf"
      }
    ],
    ieee: [
      {
        "Membership ID": "IEEE123456",
        "Membership Type": "Professional Member",
        "Year Joined": "2022",
        "Validity Period (if applicable)": "2025",
        "Document": "ieee_membership.pdf"
      }
    ],
  };

  export {names,map,initialData};