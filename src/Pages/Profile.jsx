import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Printer,
  LogOut,
} from "lucide-react"; // 👈 using lucide icons (npm install lucide-react)

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);

  const navigate = useNavigate()
  // Dummy JSON data
  const dummyData = {
    profile: {
      name: "Dr. P. Aruna Kumari",
      role: "Professor @ JNTUGV",
      avatar: "https://i.pinimg.com/564x/51/90/10/519010d9ee8167bfe445e616f260f758.jpg"
    },
    message: "I believe in empowering students through interactive learning and real-world problem solving.",
    personalInfo: {
      email: "aruna.kumari@jntugv.edu",
      phone: "+91 9876543210",
      location: "Vizianagaram, Andhra Pradesh",
      joinedDate: "Aug 2015",
    },
    education: [
      {
        degree: "Ph.D. in Computer Science",
        institution: "IIT Delhi",
        year: "2014",
      },
      {
        degree: "M.Tech in Computer Engineering",
        institution: "NIT Trichy",
        year: "2009",
      },
      {
        degree: "B.Tech in Information Technology",
        institution: "Andhra University",
        year: "2007",
      },
    ],
    professionalExperience: [
      {
        role: "Professor",
        institution: "JNTU-GV",
        years: "2018 - Present",
      },
      {
        role: "Associate Professor",
        institution: "JNTU-GV",
        years: "2014 - 2018",
      },
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

  // Simulate API call
  useEffect(() => {
    setTimeout(() => {
      setProfile(dummyData);
      setEditedProfile(JSON.parse(JSON.stringify(dummyData)));
      setLoading(false);
    }, 500);
  }, []);

  const handleEditToggle = () => {
    setIsEditing(true);
    setEditedProfile(JSON.parse(JSON.stringify(profile)));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(JSON.parse(JSON.stringify(profile)));
  };

  const handleSave = () => {
    setProfile(JSON.parse(JSON.stringify(editedProfile)));
    setIsEditing(false);
    // Here you would typically make an API call to save the data
  };

  const handleInputChange = (section, field, value, index = null) => {
    setEditedProfile(prev => {
      if (index !== null) {
        // Handle array fields
        const updatedArray = [...prev[section]];
        updatedArray[index] = { ...updatedArray[index], [field]: value };
        return { ...prev, [section]: updatedArray };
      } else if (section === 'profile' || section === 'personalInfo') {
        // Handle nested objects
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value
          }
        };
      } else {
        // Handle direct fields
        return { ...prev, [field]: value };
      }
    });
  };

  const handleArrayItemChange = (section, index, field, value) => {
    setEditedProfile(prev => {
      const updatedArray = prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      );
      return { ...prev, [section]: updatedArray };
    });
  };

  const addArrayItem = (section, template) => {
    setEditedProfile(prev => ({
      ...prev,
      [section]: [...prev[section], { ...template }]
    }));
  };

  const removeArrayItem = (section, index) => {
    setEditedProfile(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const Section = ({ title, icon, children, className = "" }) => (
    <div className={`bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Left - Profile Card */}
        <div className="lg:col-span-1 flex flex-col items-center bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6">
          <img
            src={profile.profile.avatar}
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-blue-400 shadow-md object-cover"
          />
          <h1 className="mt-4 text-2xl font-bold text-gray-800 text-center">
            {profile.profile.name}
          </h1>
          <p className="text-gray-500 text-center">{profile.profile.role}</p>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white shadow hover:bg-blue-600 transition">
              <Edit size={18} /> Edit Profile
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white shadow hover:bg-red-600 transition">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Right - Info Sections */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Section title="Message">
            <p className="text-gray-700 italic">"{profile.message}"</p>
          </Section>

          <Section title="Personal Information">
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-blue-600" />{" "}
                {profile.personalInfo.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-green-600" />{" "}
                {profile.personalInfo.phone}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-red-600" />{" "}
                {profile.personalInfo.location}
              </p>
              <p className="flex items-center gap-2">
                <Calendar size={16} className="text-purple-600" /> Joined{" "}
                {profile.personalInfo.joinedDate}
              </p>
            </div>
          </Section>

          <Section title="Educational Qualifications">
            <ul className="space-y-3">
              {profile.education.map((edu, idx) => (
                <li key={idx}>
                  <p className="font-medium">{edu.degree}</p>
                  <p className="text-sm text-gray-600">
                    {edu.institution} – {edu.year}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Professional (Research/Teaching) Experience">
            <ul className="space-y-3">
              {profile.professionalExperience.map((exp, idx) => (
                <li key={idx}>
                  <p className="font-medium">{exp.role}</p>
                  <p className="text-sm text-gray-600">
                    {exp.institution} – {exp.years}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Administrative Service in this Institution">
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {profile.adminServiceThis.map((service, idx) => (
                <li key={idx}>{service}</li>
              ))}
            </ul>
          </Section>

          <Section title="Administrative Service to Other Institutions">
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {profile.adminServiceOther.map((service, idx) => (
                <li key={idx}>{service}</li>
              ))}
            </ul>
          </Section>

          <Section title="Research Interests">
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {profile.researchInterests.map((interest, idx) => (
                <li key={idx}>{interest}</li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}

