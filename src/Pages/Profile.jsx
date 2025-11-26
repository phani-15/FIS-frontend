import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  LogOut,
  SquarePen ,
  GraduationCap,
  Briefcase,
  Award,
  Printer,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {

  const navigate = useNavigate()
  // Static Profile Data
  const profile = {
    profile: {
      name: "Dr. P. Aruna Kumari",
      role: "Professor @ JNTUGV",
      avatar: "/images/Profile.jpg",
    },
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

  // Section Component
  const Section = ({ title, icon, children, className = "" }) => (
    <div
      className={`bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">{icon}</div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sticky top-8 border border-white/20">
              <div className="text-center">
                <img
                  draggable="false"
                  src={profile.profile.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover mx-auto"
                />
                <div className="mt-4">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {profile.profile.name}
                  </h1>
                  <p className="text-gray-600">{profile.profile.role}</p>
                </div>

                {/* Action Button */}
                <div className="flex flex-col gap-4">
                  <div className="mt-6 flex justify-center text-gray-600 gap-6">

                    {/* Edit Button */}
                    <button className="relative group cursor-pointer">
                      <SquarePen  />
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                     bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 
                     group-hover:opacity-100 transition">
                        Print
                      </span>
                    </button>

                    {/* Print Button */}
                    <button className="relative group cursor-pointer">
                      <Printer />
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                     bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 
                     group-hover:opacity-100 transition">
                        Print
                      </span>
                    </button>

                    {/* Logout Button */}
                    <button
                      className="relative group cursor-pointer"
                      onClick={() => navigate("/")}
                    >
                      <LogOut />
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-sm text-white bg-gray-800 px-2 py-1 rounded opacity-0 
                     group-hover:opacity-100 transition">
                        Logout
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-col  gap-3">
                    <button
                      onClick={() => navigate('/add')}
                      className="bg-linear-to-r  from-violet-600 to-blue-600 hover:from-violet-700 px-6 py-2 rounded-full hover:to-blue-700 text-white">Add Certifications</button>
                    <button
                      onClick={() => navigate('/vc')}
                      className="bg-linear-to-r  from-blue-600 to-violet-600 px-6 py-2 rounded-full hover:from-blue-900 hover:to-purple-700 text-white">view Certifications</button>
                  </div>
                </div>

              </div>

              {/* Personal Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Mail size={16} className="text-blue-500" />
                    {profile.personalInfo.email}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Phone size={16} className="text-green-500" />
                    {profile.personalInfo.phone}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <MapPin size={16} className="text-red-500" />
                    {profile.personalInfo.location}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Calendar size={16} className="text-purple-500" />
                    Joined: {profile.personalInfo.joinedDate}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Education Section */}
              <Section
                title="Educational Qualifications"
                icon={<GraduationCap size={20} className="text-green-600" />}
              >
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-white/50 rounded-lg border border-white/50"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {edu.degree}
                        </p>
                        <p className="text-sm text-gray-600">
                          {edu.institution} • {edu.year}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Professional Experience */}
              <Section
                title="Professional Experience"
                icon={<Briefcase size={20} className="text-orange-600" />}
              >
                <div className="space-y-4">
                  {profile.professionalExperience.map((exp, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-white/50 rounded-lg border border-white/50"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{exp.role}</p>
                        <p className="text-sm text-gray-600">
                          {exp.institution} • {exp.years}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* Two Column Sections */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Administrative Service - This Institution */}
              <Section
                title="Administrative Service (Current)"
                icon={<Award size={20} className="text-purple-600" />}
              >
                <div className="space-y-2">
                  {profile.adminServiceThis.map((service, index) => (
                    <p key={index} className="text-sm text-gray-700">
                      • {service}
                    </p>
                  ))}
                </div>
              </Section>

              {/* Administrative Service - Other Institutions */}
              <Section
                title="Administrative Service (Other)"
                icon={<Award size={20} className="text-indigo-600" />}
              >
                <div className="space-y-2">
                  {profile.adminServiceOther.map((service, index) => (
                    <p key={index} className="text-sm text-gray-700">
                      • {service}
                    </p>
                  ))}
                </div>
              </Section>
            </div>

            {/* Research Interests */}
            <Section
              title="Research Interests"
              icon={<BookOpen size={20} className="text-teal-600" />}
            >
              <div className="space-y-2">
                {profile.researchInterests.map((interest, index) => (
                  <p key={index} className="text-sm text-gray-700">
                    • {interest}
                  </p>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
