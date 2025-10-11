// AdminEditProfile.jsx
import React, { useCallback, useState } from "react";
import {
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {StringListEditor,FileInput,Field,DeepCopy,Section} from "../components/Sections";

export default function AdminEditProfile() {
  /* ------------------ INITIAL DATA (from user) ------------------ */
  const initialProfile = {
    profile: {
      name: "Dr. P. Aruna Kumari",
      role: "Professor @ JNTUGV",
      avatar: "/images/profile.jpg",
    },
    personalInfo: {
      email: "aruna.kumari@jntugv.edu",
      phone: "+91 9876543210",
      location: "Vizianagaram, Andhra Pradesh",
      joinedDate: "Aug 2015",
    },
    education: [
      { degree: "Ph.D. in Computer Science", institution: "IIT Delhi", year: "2014" },
      { degree: "M.Tech in Computer Engineering", institution: "NIT Trichy", year: "2009" },
      { degree: "B.Tech in Information Technology", institution: "Andhra University", year: "2007" },
    ],
    professionalExperience: [
      { role: "Professor", institution: "JNTU-GV", years: "2018 - Present" },
      { role: "Associate Professor", institution: "JNTU-GV", years: "2014 - 2018" },
    ],
    adminServiceThis: [
      "Head of Department, Computer Science (2021 - Present)",
      "Member, Academic Senate",
      "Coordinator, NBA Accreditation",
    ],
    adminServiceOther: [
      "Reviewer, IEEE Transactions on Education",
      "Board Member, AICTE Curriculum Committee",
      "Expert Committee, State Educational Policy",
    ],
    researchInterests: [
      "Artificial Intelligence & Machine Learning",
      "Natural Language Processing",
      "Educational Technology",
      "Data Mining & Big Data Analytics",
    ],
  };

  const initialCertifications = {
    journals: [
      {
        id: 1,
        name: "journals",
        title_of_the_paper: "Advanced Machine Learning Techniques",
        name_of_the_journal: "International Journal of Computer Science",
        page_number: "45-52",
        year: "2023",
        ISSN_Number: "1234-5678",
        Impact_Factor: "3.5",
        national_or_International: "International",
        document: "journal_doc.pdf",
      },
      {
        id: 2,
        name: "journals",
        title_of_the_paper: "Quantum Computing Applications",
        name_of_the_journal: "Journal of Advanced Computing",
        page_number: "23-30",
        year: "2023",
        ISSN_Number: "8765-4321",
        Impact_Factor: "4.2",
        national_or_International: "International",
        document: "quantum_paper.pdf",
      },
    ],
    conferences: [
      {
        id: 1,
        name: "conferences",
        title_of_the_paper: "AI in Healthcare Applications",
        title_of_conference: "International Conference on AI",
        year: "2023",
        organized_by: "IEEE",
        national_or_international: "International",
        document: "conference_cert.pdf",
      },
      {
        id: 2,
        name: "conferences",
        title_of_the_paper: "Blockchain for Supply Chain",
        title_of_the_conference: "Global Tech Summit",
        title_of_conference: "Global Tech Summit",
        year: "2023",
        organized_by: "ACM",
        national_or_international: "International",
        document: "blockchain_conf.pdf",
      },
    ],
    seminars: [
      {
        id: 1,
        name: "seminars",
        title_of_the_paper: "Blockchain Technology Overview",
        title_of_seminar: "Tech Innovation Summit 2023",
        year: "2023",
        organized_by: "Tech Association",
        national_international: "National",
        certificate: "certificate.pdf",
      },
    ],
    research: [
      {
        id: 1,
        name: "research",
        year: "2022-2023",
        name_of_the_principal_investigator: "Dr. Sarah Johnson",
        duration_of_project: "12 months",
        name_of_research_project: "Renewable Energy Optimization",
        fund_received: "$50,000",
        name_of_funding_agency: "National Science Foundation",
        year_of_sanction: "2022",
        Department_of_recipient: "Engineering",
        document: "research_cert.pdf",
      },
    ],
    certifications: [
      {
        id: 1,
        name: "certifications",
        name_of_certification_course: "AWS Solutions Architect",
        organized_by: "Amazon Web Services",
        duration: "6 months",
        certificate: "aws_cert.pdf",
      },
      {
        id: 2,
        name: "certifications",
        name_of_certification_course: "Google Cloud Professional",
        organized_by: "Google Cloud",
        duration: "3 months",
        certificate: "gcp_cert.pdf",
      },
      {
        id: 3,
        name: "certifications",
        name_of_certification_course: "React Native Development",
        organized_by: "Meta",
        duration: "2 months",
        certificate: "react_native_cert.pdf",
      },
    ],
    books: [
      {
        id: 1,
        name: "books",
        title_of_the_book: "Modern Web Development",
        name_of_the_publisher: "Tech Publications",
        year: "2023",
        ISBN_DOI_number: "978-3-16-148410-0",
        national_or_international: "International",
        document: "book_cover.pdf",
      },
    ],
    book_chapters: [
      {
        id: 1,
        name: "book_chapters",
        title_of_the_book: "AI Ethics and Society",
        name_of_the_publisher: "Academic Press",
        year: "2023",
        ISBN_DOI_number: "978-0-12-345678-9",
        national_or_international: "International",
        document: "nothing.pdf",
      },
    ],
    sponsored_projects: [
      {
        id: 1,
        name: "sponsored_projects",
        project_title: "Smart City Infrastructure",
        funding_details: "Government Grant",
        amount: "$100,000",
        duration: "18 months",
        academic_year: "2022-2023",
        certificate: "sponsored_project_cert.pdf",
      },
    ],
  };

  /* ------------------ STATE ------------------ */
  const [profileData, setProfileData] = useState(() => DeepCopy(initialProfile));
  const [certificationsData, setCertificationsData] = useState(() =>
    DeepCopy(initialCertifications)
  );

  const [expanded, setExpanded] = useState("profile");

  /* ------------------ UI helpers ------------------ */
  const toggleExpand = useCallback((name) => {
    setExpanded((prev) => (prev === name ? null : name));
  }, []);

  const cancelEdit = useCallback(() => {
    navigate('/adminPage')
  }, []);

  const navigate = useNavigate()

  /* ------------------ STABLE UPDATERS (prevent focus loss) ------------------ */

  // Update simple top-level or nested profile fields (profile or personalInfo)
  const updateProfileField = useCallback((section, key, value) => {
    setProfileData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  }, []);

  // Update item in array under profileData (education, professionalExperience)
  const updateProfileArrayItem = useCallback((arrayName, index, key, value) => {
    setProfileData((prev) => {
      const arr = prev[arrayName] ?? [];
      const newArr = arr.map((it, i) => (i === index ? { ...it, [key]: value } : it));
      return { ...prev, [arrayName]: newArr };
    });
  }, []);

  const addProfileArrayItem = useCallback((arrayName, template) => {
    setProfileData((prev) => {
      const arr = prev[arrayName] ?? [];
      return { ...prev, [arrayName]: [...arr, { ...template }] };
    });
  }, []);

  const removeProfileArrayItem = useCallback((arrayName, index) => {
    setProfileData((prev) => {
      const arr = prev[arrayName] ?? [];
      return { ...prev, [arrayName]: arr.filter((_, i) => i !== index) };
    });
  }, []);

  const setProfileStringArray = useCallback((arrayName, list) => {
    setProfileData((prev) => ({ ...prev, [arrayName]: [...list] }));
  }, []);

  /* ------------------ Certifications Data Updaters ------------------ */

  const updateCertField = useCallback((collection, id, key, value) => {
    setCertificationsData((prev) => {
      const arr = prev[collection] ?? [];
      const newArr = arr.map((it) => (it.id === id ? { ...it, [key]: value } : it));
      return { ...prev, [collection]: newArr };
    });
  }, []);

  const addCertItem = useCallback((collection, template) => {
    setCertificationsData((prev) => {
      const arr = prev[collection] ?? [];
      const newItem = { ...template, id: Date.now() + Math.floor(Math.random() * 1000) };
      return { ...prev, [collection]: [...arr, newItem] };
    });
  }, []);

  const removeCertItem = useCallback((collection, id) => {
    setCertificationsData((prev) => {
      const arr = prev[collection] ?? [];
      return { ...prev, [collection]: arr.filter((it) => it.id !== id) };
    });
  }, []);

  // file upload (stores File object under __file__ and filename under document/certificate)
  const updateCertFile = useCallback((collection, id, file) => {
    setCertificationsData((prev) => {
      const arr = prev[collection] ?? [];
      const newArr = arr.map((it) =>
        it.id === id ? { ...it, __file__: file, document: file.name || it.document, certificate: file.name || it.certificate } : it
      );
      return { ...prev, [collection]: newArr };
    });
  }, []);

  // avatar file
  const updateAvatar = useCallback((file) => {
    setProfileData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        avatar: URL.createObjectURL(file),
      },
      __avatarFile__: file,
    }));
  }, []);

  /* ------------------ RENDER ------------------ */
  return (
    <div className="lg:p-6 p-2">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-2  border border-gray-100">

        {/* PROFILE */}
        <Section title="Profile" name="profile" expanded={expanded} toggleExpand={toggleExpand}>
          <div className="md:flex gap-6">
            <div className="w-40 flex-shrink-0">
              <div className="w-40 h-40 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img
                  src={profileData.profile.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              
                <div className="mt-3">
                  <label className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                    <UploadCloud size={16} />
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) updateAvatar(f);
                      }}
                    />
                    Change Avatar
                  </label>
                </div>
            </div>

            <div className="flex-1">
              <Field
                label="Full Name"
                value={profileData.profile.name}
                onChange={(v) => updateProfileField("profile", "name", v)}
                editable={true}
              />
              <Field
                label="Role / Designation"
                value={profileData.profile.role}
                onChange={(v) => updateProfileField("profile", "role", v)}
                editable={true}
              />
              <Field
                label="Joined Date"
                value={profileData.personalInfo.joinedDate}
                onChange={(v) => updateProfileField("personalInfo", "joinedDate", v)}
                editable={true}
              />
            </div>
          </div>
        </Section>

        {/* PERSONAL INFO */}
        <Section title="Personal Info" name="personalInfo" expanded={expanded} toggleExpand={toggleExpand}>
          <div className="grid md:grid-cols-2 gap-4">
            <Field
              label="Email"
              value={profileData.personalInfo.email}
              onChange={(v) => updateProfileField("personalInfo", "email", v)}
              editable={true}
            />
            <Field
              label="Phone"
              value={profileData.personalInfo.phone}
              onChange={(v) => updateProfileField("personalInfo", "phone", v)}
              editable={true}
            />
            <Field
              label="Location"
              value={profileData.personalInfo.location}
              onChange={(v) => updateProfileField("personalInfo", "location", v)}
              editable={true}
            />
          </div>
        </Section>

        {/* EDUCATION */}
        <Section title="Education" name="education" expanded={expanded} toggleExpand={toggleExpand}>
          <div>
            {profileData.education.map((edu, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-4 rounded-lg mb-3 border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 mr-3">
                    <Field
                      label="Degree"
                      value={edu.degree}
                      onChange={(v) => updateProfileArrayItem("education", idx, "degree", v)}
                      editable={true}
                      placeholder="Ph.D. in ..."
                    />
                    <Field
                      label="Institution"
                      value={edu.institution}
                      onChange={(v) => updateProfileArrayItem("education", idx, "institution", v)}
                      editable={true}
                    />
                    <Field
                      label="Year"
                      value={edu.year}
                      onChange={(v) => updateProfileArrayItem("education", idx, "year", v)}
                      editable={true}
                    />
                  </div>
                  <div className="w-12 flex flex-col gap-2">
                    
                      <button
                        onClick={() => removeProfileArrayItem("education", idx)}
                        className="p-2   rounded text-red-600 cursor-pointer "
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    
                  </div>
                </div>
              </div>
            ))}

              <div className="mt-2">
                <button
                  onClick={() =>
                    addProfileArrayItem("education", { degree: "", institution: "", year: "" })
                  }
                  className="inline-flex items-center gap-2 px-3 py-2 rounded bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  <Plus size={14} /> Add Education
                </button>
              </div>
            
          </div>
        </Section>

        {/* PROFESSIONAL EXPERIENCE */}
        <Section title="Professional Experience" name="professionalExperience" expanded={expanded} toggleExpand={toggleExpand}>
          <div>
            {profileData.professionalExperience.map((exp, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg mb-3 border border-gray-200">
                <div className="flex justify-between">
                  <div className="flex-1 mr-3">
                    <Field
                      label="Role"
                      value={exp.role}
                      onChange={(v) =>
                        updateProfileArrayItem("professionalExperience", idx, "role", v)
                      }
                      editable={true}
                    />
                    <Field
                      label="Institution"
                      value={exp.institution}
                      onChange={(v) =>
                        updateProfileArrayItem("professionalExperience", idx, "institution", v)
                      }
                      editable={true}
                    />
                    <Field
                      label="Years"
                      value={exp.years}
                      onChange={(v) =>
                        updateProfileArrayItem("professionalExperience", idx, "years", v)
                      }
                      editable={true}
                    />
                  </div>
                  <div className="w-12">
                      <button
                        onClick={() => removeProfileArrayItem("professionalExperience", idx)}
                        className="p-2   rounded text-red-600 cursor-pointer "
                      >
                        <Trash2 size={16} />
                      </button>
                  </div>
                </div>
              </div>
            ))}

              <button
                onClick={() =>
                  addProfileArrayItem("professionalExperience", {
                    role: "",
                    institution: "",
                    years: "",
                  })
                }
                className="inline-flex items-center gap-2 px-3 py-2 rounded bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                <Plus size={14} /> Add Experience
              </button>
              
          </div>
        </Section>

        {/* ADMIN SERVICE THIS */}
        <Section title="Admin Service (This Institution)" name="adminServiceThis" expanded={expanded} toggleExpand={toggleExpand}>
          <StringListEditor
            list={profileData.adminServiceThis ?? []}
            onChangeList={(lst) => setProfileStringArray("adminServiceThis", lst)}
          />
        </Section>

        {/* ADMIN SERVICE OTHER */}
        <Section title="Admin Service (Other)" name="adminServiceOther" expanded={expanded} toggleExpand={toggleExpand}>
          <StringListEditor
            list={profileData.adminServiceOther ?? []}
            onChangeList={(lst) => setProfileStringArray("adminServiceOther", lst)}
          />
        </Section>

        {/* RESEARCH INTERESTS */}
        <Section title="Research Interests" name="researchInterests" expanded={expanded} toggleExpand={toggleExpand}>
          <StringListEditor
            list={profileData.researchInterests ?? []}
            onChangeList={(lst) => setProfileStringArray("researchInterests", lst)}
          />
        </Section>

        {/* Publications & Certifications Header */}
        <div className="mt-4 text-lg font-medium text-gray-700 mb-2">
          Publications & Certifications
        </div>

        {/* JOURNALS */}
        {certificationsData.journals.length > 0 &&
          <Section title="Journals" name="journals" expanded={expanded} toggleExpand={toggleExpand}>
            {certificationsData.journals.map((j) => (
              <div key={j.id} className="bg-gray-50 p-4 rounded-lg mb-3 border border-gray-200">
                <div className="grid md:grid-cols-2 gap-3">
                  <Field
                    label="Paper Title"
                    value={j.title_of_the_paper}
                    onChange={(v) => updateCertField("journals", j.id, "title_of_the_paper", v)}
                    editable={true}
                  />
                  <Field
                    label="Journal Name"
                    value={j.name_of_the_journal}
                    onChange={(v) => updateCertField("journals", j.id, "name_of_the_journal", v)}
                    editable={true}
                  />
                  <Field
                    label="Page Number"
                    value={j.page_number}
                    onChange={(v) => updateCertField("journals", j.id, "page_number", v)}
                    editable={true}
                  />
                  <Field
                    label="Year"
                    value={j.year}
                    onChange={(v) => updateCertField("journals", j.id, "year", v)}
                    editable={true}
                  />
                  <Field
                    label="ISSN Number"
                    value={j.ISSN_Number}
                    onChange={(v) => updateCertField("journals", j.id, "ISSN_Number", v)}
                    editable={true}
                  />
                  <Field
                    label="Impact Factor"
                    value={j.Impact_Factor}
                    onChange={(v) => updateCertField("journals", j.id, "Impact_Factor", v)}
                    editable={true}
                  />
                  <Field
                    label="National / International"
                    value={j.national_or_International}
                    onChange={(v) => updateCertField("journals", j.id, "national_or_International", v)}
                    editable={true}
                  />
                  <FileInput
                    label="Document"
                    filename={j.document}
                    onFileChange={(f) => updateCertFile("journals", j.id, f)}
                    editable={true}
                  />
                </div>

                  <div className="mt-3 flex justify-end gap-2">
                    <button
                      onClick={() => removeCertItem("journals", j.id)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded   text-red-600 cursor-pointer "
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                  
              </div>
            ))}

              <button
                onClick={() =>
                  addCertItem("journals", {
                    name: "journals",
                    title_of_the_paper: "",
                    name_of_the_journal: "",
                    page_number: "",
                    year: "",
                    ISSN_Number: "",
                    Impact_Factor: "",
                    national_or_International: "",
                    document: "",
                  })
                }
                className="inline-flex items-center gap-2 px-3 py-2 rounded bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                <Plus size={14} /> Add Journal
              </button>
              
          </Section>}

        {/* CONFERENCES */}
        {certificationsData.conferences.length > 0 &&
          <Section title="Conferences" name="conferences" expanded={expanded} toggleExpand={toggleExpand}>
            {certificationsData.conferences.map((c) => (
              <div key={c.id} className="bg-gray-50 p-4 rounded-lg mb-3 border border-gray-200">
                <div className="grid md:grid-cols-2 gap-3">
                  <Field
                    label="Paper Title"
                    value={c.title_of_the_paper}
                    onChange={(v) => updateCertField("conferences", c.id, "title_of_the_paper", v)}
                    editable={true}
                  />
                  <Field
                    label="Conference"
                    value={c.title_of_conference || c.title_of_conference}
                    onChange={(v) => updateCertField("conferences", c.id, "title_of_conference", v)}
                    editable={true}
                  />
                  <Field
                    label="Year"
                    value={c.year}
                    onChange={(v) => updateCertField("conferences", c.id, "year", v)}
                    editable={true}
                  />
                  <Field
                    label="Organized By"
                    value={c.organized_by}
                    onChange={(v) => updateCertField("conferences", c.id, "organized_by", v)}
                    editable={true}
                  />
                  <Field
                    label="National / International"
                    value={c.national_or_international}
                    onChange={(v) => updateCertField("conferences", c.id, "national_or_international", v)}
                    editable={true}
                  />
                  <FileInput
                    label="Document"
                    filename={c.document}
                    onFileChange={(f) => updateCertFile("conferences", c.id, f)}
                    editable={true}
                  />
                </div>

                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => removeCertItem("conferences", c.id)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded   text-red-600 cursor-pointer "
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                
              </div>
            ))}

              <button
                onClick={() =>
                  addCertItem("conferences", {
                    name: "conferences",
                    title_of_the_paper: "",
                    title_of_conference: "",
                    year: "",
                    organized_by: "",
                    national_or_international: "",
                    document: "",
                  })
                }
                className="inline-flex items-center gap-2 px-3 py-2 rounded bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                <Plus size={14} /> Add Conference
              </button>
            
          </Section>}

        {/* SEMINARS */}
        {certificationsData.seminars.length > 0 &&
          <Section title="Seminars" name="seminars" expanded={expanded} toggleExpand={toggleExpand}>
            {certificationsData.seminars.map((s) => (
              <div key={s.id} className="bg-gray-50 p-4 rounded-lg mb-3 border border-gray-200">
                <div className="grid md:grid-cols-2 gap-3">
                  <Field
                    label="Paper Title"
                    value={s.title_of_the_paper}
                    onChange={(v) => updateCertField("seminars", s.id, "title_of_the_paper", v)}
                    editable={true}
                  />
                  <Field
                    label="Seminar"
                    value={s.title_of_seminar}
                    onChange={(v) => updateCertField("seminars", s.id, "title_of_seminar", v)}
                    editable={true}
                  />
                  <Field
                    label="Year"
                    value={s.year}
                    onChange={(v) => updateCertField("seminars", s.id, "year", v)}
                    editable={true}
                  />
                  <Field
                    label="Organized By"
                    value={s.organized_by}
                    onChange={(v) => updateCertField("seminars", s.id, "organized_by", v)}
                    editable={true}
                  />
                  <Field
                    label="National / International"
                    value={s.national_international}
                    onChange={(v) => updateCertField("seminars", s.id, "national_international", v)}
                    editable={true}
                  />
                  <FileInput
                    label="Certificate"
                    filename={s.certificate}
                    onFileChange={(f) => updateCertFile("seminars", s.id, f)}
                    editable={true}
                  />
                </div>

                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => removeCertItem("seminars", s.id)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded   text-red-600 cursor-pointer "
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                
              </div>
            ))}

              <button
                onClick={() =>
                  addCertItem("seminars", {
                    name: "seminars",
                    title_of_the_paper: "",
                    title_of_seminar: "",
                    year: "",
                    organized_by: "",
                    national_international: "",
                    certificate: "",
                  })
                }
                className="inline-flex items-center gap-2 px-3 py-2 rounded bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                <Plus size={14} /> Add Seminar
              </button>
            
          </Section>}

        {/* RESEARCH */}
        {certificationsData.research.length > 0
          && <Section title="Research Projects" name="research" expanded={expanded} toggleExpand={toggleExpand}>
            {certificationsData.research.map((r) => (
              <div key={r.id} className="bg-gray-50 p-4 rounded-lg mb-3 border border-gray-200">
                <div className="grid md:grid-cols-2 gap-3">
                  <Field
                    label="Project Year"
                    value={r.year}
                    onChange={(v) => updateCertField("research", r.id, "year", v)}
                    editable={true}
                  />
                  <Field
                    label="Principal Investigator"
                    value={r.name_of_the_principal_investigator}
                    onChange={(v) => updateCertField("research", r.id, "name_of_the_principal_investigator", v)}
                    editable={true}
                  />
                  <Field
                    label="Duration"
                    value={r.duration_of_project}
                    onChange={(v) => updateCertField("research", r.id, "duration_of_project", v)}
                    editable={true}
                  />
                  <Field
                    label="Project Title"
                    value={r.name_of_research_project}
                    onChange={(v) => updateCertField("research", r.id, "name_of_research_project", v)}
                    editable={true}
                  />
                  <Field
                    label="Fund Received"
                    value={r.fund_received}
                    onChange={(v) => updateCertField("research", r.id, "fund_received", v)}
                    editable={true}
                  />
                  <Field
                    label="Funding Agency"
                    value={r.name_of_funding_agency}
                    onChange={(v) => updateCertField("research", r.id, "name_of_funding_agency", v)}
                    editable={true}
                  />
                  <Field
                    label="Year of Sanction"
                    value={r.year_of_sanction}
                    onChange={(v) => updateCertField("research", r.id, "year_of_sanction", v)}
                    editable={true}
                  />
                  <Field
                    label="Department of Recipient"
                    value={r.Department_of_recipient}
                    onChange={(v) => updateCertField("research", r.id, "Department_of_recipient", v)}
                    editable={true}
                  />
                  <FileInput
                    label="Document"
                    filename={r.document}
                    onFileChange={(f) => updateCertFile("research", r.id, f)}
                    editable={true}
                  />
                </div>

                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => removeCertItem("research", r.id)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded   text-red-600 cursor-pointer "
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                
              </div>
            ))}

              <button
                onClick={() =>
                  addCertItem("research", {
                    name: "research",
                    year: "",
                    name_of_the_principal_investigator: "",
                    duration_of_project: "",
                    name_of_research_project: "",
                    fund_received: "",
                    name_of_funding_agency: "",
                    year_of_sanction: "",
                    Department_of_recipient: "",
                    document: "",
                  })
                }
                className="inline-flex items-center gap-2 px-3 py-2 rounded bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                <Plus size={14} /> Add Research Project
              </button>
            
          </Section>}

        {/* CERTIFICATIONS */}
        {certificationsData.certifications.length > 0 &&
          <Section title="Certifications" name="certifications" expanded={expanded} toggleExpand={toggleExpand}>
            {certificationsData.certifications.map((c) => (
              <div key={c.id} className="bg-gray-50 p-4 rounded-lg mb-3 border border-gray-200">
                <div className="grid md:grid-cols-2 gap-3">
                  <Field
                    label="Course"
                    value={c.name_of_certification_course}
                    onChange={(v) => updateCertField("certifications", c.id, "name_of_certification_course", v)}
                    editable={true}
                  />
                  <Field
                    label="Organized By"
                    value={c.organized_by}
                    onChange={(v) => updateCertField("certifications", c.id, "organized_by", v)}
                    editable={true}
                  />
                  <Field
                    label="Duration"
                    value={c.duration}
                    onChange={(v) => updateCertField("certifications", c.id, "duration", v)}
                    editable={true}
                  />
                  <FileInput
                    label="Certificate"
                    filename={c.certificate}
                    onFileChange={(f) => updateCertFile("certifications", c.id, f)}
                    editable={true}
                  />
                </div>

                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => removeCertItem("certifications", c.id)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded   text-red-600 cursor-pointer "
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                
              </div>
            ))}

              <button
                onClick={() =>
                  addCertItem("certifications", {
                    name: "certifications",
                    name_of_certification_course: "",
                    organized_by: "",
                    duration: "",
                    certificate: "",
                  })
                }
                className="inline-flex items-center gap-2 px-3 py-2 rounded bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                <Plus size={14} /> Add Certification
              </button>
            
          </Section>}

        {/* BOOKS */}
        {certificationsData.books.length > 0 &&
          <Section title="Books" name="books" expanded={expanded} toggleExpand={toggleExpand}>
            {certificationsData.books.map((b) => (
              <div key={b.id} className="bg-gray-50 p-4 rounded-lg mb-3 border border-gray-200">
                <div className="grid md:grid-cols-2 gap-3">
                  <Field
                    label="Title"
                    value={b.title_of_the_book}
                    onChange={(v) => updateCertField("books", b.id, "title_of_the_book", v)}
                    editable={true}
                  />
                  <Field
                    label="Publisher"
                    value={b.name_of_the_publisher}
                    onChange={(v) => updateCertField("books", b.id, "name_of_the_publisher", v)}
                    editable={true}
                  />
                  <Field
                    label="Year"
                    value={b.year}
                    onChange={(v) => updateCertField("books", b.id, "year", v)}
                    editable={true}
                  />
                  <Field
                    label="ISBN / DOI"
                    value={b.ISBN_DOI_number}
                    onChange={(v) => updateCertField("books", b.id, "ISBN_DOI_number", v)}
                    editable={true}
                  />
                  <Field
                    label="National / International"
                    value={b.national_or_international}
                    onChange={(v) => updateCertField("books", b.id, "national_or_international", v)}
                    editable={true}
                  />
                  <FileInput
                    label="Document"
                    filename={b.document}
                    onFileChange={(f) => updateCertFile("books", b.id, f)}
                    editable={true}
                  />
                </div>

                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => removeCertItem("books", b.id)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded text-red-600 cursor-pointer "
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                
              </div>
            ))}

              <button
                onClick={() =>
                  addCertItem("books", {
                    name: "books",
                    title_of_the_book: "",
                    name_of_the_publisher: "",
                    year: "",
                    ISBN_DOI_number: "",
                    national_or_international: "",
                    document: "",
                  })
                }
                className="inline-flex items-center gap-2 px-3 py-2 rounded bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                <Plus size={14} /> Add Book
              </button>
            
          </Section>}

        {/* BOOK CHAPTERS */}
        {certificationsData.book_chapters.length > 0 &&
          <Section title="Book Chapters" name="book_chapters" expanded={expanded} toggleExpand={toggleExpand}>
            {certificationsData.book_chapters.map((bc) => (
              <div key={bc.id} className="bg-gray-50 p-4 rounded-lg mb-3 border border-gray-200">
                <div className="grid md:grid-cols-2 gap-3">
                  <Field
                    label="Book Title"
                    value={bc.title_of_the_book}
                    onChange={(v) => updateCertField("book_chapters", bc.id, "title_of_the_book", v)}
                    editable={true}
                  />
                  <Field
                    label="Publisher"
                    value={bc.name_of_the_publisher}
                    onChange={(v) => updateCertField("book_chapters", bc.id, "name_of_the_publisher", v)}
                    editable={true}
                  />
                  <Field
                    label="Year"
                    value={bc.year}
                    onChange={(v) => updateCertField("book_chapters", bc.id, "year", v)}
                    editable={true}
                  />
                  <Field
                    label="ISBN / DOI"
                    value={bc.ISBN_DOI_number}
                    onChange={(v) => updateCertField("book_chapters", bc.id, "ISBN_DOI_number", v)}
                    editable={true}
                  />
                  <Field
                    label="National / International"
                    value={bc.national_or_international}
                    onChange={(v) => updateCertField("book_chapters", bc.id, "national_or_international", v)}
                    editable={true}
                  />
                  <FileInput
                    label="Document"
                    filename={bc.document}
                    onFileChange={(f) => updateCertFile("book_chapters", bc.id, f)}
                    editable={true}
                  />
                </div>

                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => removeCertItem("book_chapters", bc.id)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded   text-red-600 cursor-pointer "
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                
              </div>
            ))}
            
              <button
                onClick={() =>
                  addCertItem("book_chapters", {
                    name: "book_chapters",
                    title_of_the_book: "",
                    name_of_the_publisher: "",
                    year: "",
                    ISBN_DOI_number: "",
                    national_or_international: "",
                    document: "",
                  })
                }
                className="inline-flex items-center gap-2 px-3 py-2 rounded bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                <Plus size={14} /> Add Book Chapter
              </button>
            
          </Section>}

        {/* SPONSORED PROJECTS */}
        {certificationsData.sponsored_projects.length > 0 &&
          <Section title="Sponsored Projects" name="sponsored_projects" expanded={expanded} toggleExpand={toggleExpand}>
            {certificationsData.sponsored_projects.map((sp) => (
              <div key={sp.id} className="bg-gray-50 p-4 rounded-lg mb-3 border border-gray-200">
                <div className="grid md:grid-cols-2 gap-3">
                  <Field
                    label="Project Title"
                    value={sp.project_title}
                    onChange={(v) => updateCertField("sponsored_projects", sp.id, "project_title", v)}
                    editable={true}
                  />
                  <Field
                    label="Funding Details"
                    value={sp.funding_details}
                    onChange={(v) => updateCertField("sponsored_projects", sp.id, "funding_details", v)}
                    editable={true}
                  />
                  <Field
                    label="Amount"
                    value={sp.amount}
                    onChange={(v) => updateCertField("sponsored_projects", sp.id, "amount", v)}
                    editable={true}
                  />
                  <Field
                    label="Duration"
                    value={sp.duration}
                    onChange={(v) => updateCertField("sponsored_projects", sp.id, "duration", v)}
                    editable={true}
                  />
                  <Field
                    label="Academic Year"
                    value={sp.academic_year}
                    onChange={(v) => updateCertField("sponsored_projects", sp.id, "academic_year", v)}
                    editable={true}
                  />
                  <FileInput
                    label="Certificate"
                    filename={sp.certificate}
                    onFileChange={(f) => updateCertFile("sponsored_projects", sp.id, f)}
                    editable={true}
                  />
                </div>

                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => removeCertItem("sponsored_projects", sp.id)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded   text-red-600 cursor-pointer "
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                
              </div>
            ))}

              <button
                onClick={() =>
                  addCertItem("sponsored_projects", {
                    name: "sponsored_projects",
                    project_title: "",
                    funding_details: "",
                    amount: "",
                    duration: "",
                    academic_year: "",
                    certificate: "",
                  })
                }
                className="inline-flex items-center gap-2 px-3 py-2 rounded bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                <Plus size={14} /> Add Sponsored Project
              </button>
            
          </Section>
        }
        
        <div className="flex justify-center items-center mb-6">
          <div className="flex gap-3">
            
                <button
                  onClick={()=>{
                    alert("changes saved successfully")
                    navigate('/adminPage')

                  }}
                  className="flex items-center gap-2 bg-green-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  <Save size={16} /> Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-2 bg-gray-200 cursor-pointer hover:text-white text-gray-800 px-4 py-2 rounded-lg hover:bg-red-400"
                >
                  <X size={16} /> Cancel
                </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}