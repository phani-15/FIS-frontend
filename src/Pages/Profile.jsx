
import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  LogOut,
} from "lucide-react"; // 👈 using lucide icons (npm install lucide-react)

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy JSON data
  const dummyData = {
    profile: {
      name: "Dr. P.Aruna Kumari",
      role: "Professor @ JNTUGV",
      avatar:
        "https://jntugvcev.edu.in/wp-content/uploads/2020/08/6.-P-Aruna-Kumari-JNTUK-UCEV.jpg",
    },
    message:
      "I believe in empowering students through interactive learning and real-world problem solving.",
    personalInfo: {
      email: "ananya.sharma@university.edu",
      phone: "+91 9876543210",
      location: "Delhi, India",
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
        institution: "Delhi University",
        year: "2007",
      },
    ],
    professionalExperience: [
      {
        role: "Associate Professor",
        institution: "ABC University",
        years: "2018 - Present",
      },
      {
        role: "Assistant Professor",
        institution: "XYZ College",
        years: "2014 - 2018",
      },
    ],
    adminServiceThis: [
      "Head of Department, Computer Science (2021 - Present)",
      "Member, Curriculum Development Committee",
    ],
    adminServiceOther: [
      "Reviewer, International Journal of AI Research",
      "Advisor, National Education Policy Taskforce",
    ],
    researchInterests: [
      "Artificial Intelligence & Machine Learning",
      "Natural Language Processing",
      "Educational Technology",
      "Big Data Analytics",
    ],
  };

  // Simulate API call
  useEffect(() => {
    setTimeout(() => {
      setProfile(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  const Section = ({ title, children }) => (
    <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">{title}</h2>
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

