import React, { useEffect, useState } from "react";
import {Personal} from "../core/Personal"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  LogOut,
  SquarePen,
  GraduationCap,
  Briefcase,
  Award,
  Printer,
} from "lucide-react";
import { useNavigate ,useParams} from "react-router-dom";

export default function ProfilePage() {
   const {profileId}=useParams()
   const navigate = useNavigate()
  const [newObj, setnewobj] = useState(

    {
      "personalData": {
        "name": "Phani Polavarapu",
        "avatar": "images/Profile2.avif",
        "father": "Surya Nageswara Rao",
        "gender": "Male",
        "DOB": "2004-09-15",
        "marital": "unmarried",
        "designation": "Assistant Professor",
        "department": "cse",
        "college": "University College of Engineering",
        "date_of_join": "2023-09",
          "phone": "",
        "location": ""
      },
      "user": {
        "password": "Phani@123",
        "email": "phanipolavarapu15@gmail.com",
        "cPassword": "Phani@123"
      },
      "education": {
        "tenth": {
          "title": "Tenth",
          "school": "ZPHS Mummidivaram",
          "percentage": "",
          "year": "2009"
        },
        "twelth": {
          "title": "Intermediate/Diploma",
          "type": "Intermediate",
          "college": "Sri Ravi Junior College",
          "percentage": "",
          "year": "2013"
        },
        "degree":
          {
            "title": "Under Graduation",
            "degreeName": "B.Tech",
            "specialization": "Computer Science",
            "percentage": "",
            "college": "JNTUGV,CEV",
            "university": "JNTUGV",
            "year": "2017"
          },
        "pg": {
          "title": "Post Graduation",
          "course": "M.Tech",
          "specialization": "Computer Applications",
          "percentage": "",
          "college": "JNTUK,CEV",
          "university": "JNTUK",
          "year": "2021"
        },
        "phd": [
          {
            "specialization": "Biometrics",
            "under_the_proffessor": "Dr.P.Aruna Kumari",
            "department": "Computer Science",
            "University": "JNTUGV",
            "year": "2021"
          }
        ],
        "postdoc": []
      },
      "experience": [
        {
          "institute": "JNTUGV",
          "designation": "Asst.Professor",
          "from": 2021,
          "to": 2023
        },
        {
          "institute": "JNTUGV",
          "designation": "Asst.Professor",
          "from": 2021,
          "to": 2023
        },
        {
          "institute": "JNTUGV",
          "designation": "Asst.Professor",
          "from": 2021,
          "to": 2023
        },
        {
          "institute": "JNTUGV",
          "designation": "Asst.Professor",
          "from": 2021,
          "to": 2023
        }
      ],
      "administrativeService": [
        {
          "designation": "Head of the Administrative service",
          "from": 2024,
          "to": "Present"
        },
        {
          "designation": "Head of the Department, CSE",
          "from": 2023,
          "to": 2024
        }
      ],
      "otherAdministrativeService": [
        {
          "institute": "JNTUK",
          "from": 2022,
          "to": 2023,
          "designation": "head of the department"
        }
      ]
    }
  )
  
 useEffect(() => {
  const loadProfile = async () => {
    try {
      const data = await Personal(profileId);  
      console.log("Fetched profile data:", data);
    
      console.log("Profile ID:", profileId);
      if (data) setnewobj(data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  loadProfile();
}, []);


  const viewer = "user"
  
  // Static Profile Data

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
                  src={newObj.personalData.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover mx-auto"
                />
                <div className="my-4">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {newObj.personalData.name}
                  </h1>
                  <p className="text-gray-600">{newObj.personalData.designation}</p>
                </div>

                {/* Action Button */}
                <div className="flex flex-col gap-4">
                  {viewer == "user" &&
                    <div className="mt-2 flex justify-center text-gray-600 gap-6">

                      {/* Edit Button */}
                      <button
                        onClick={() => navigate('/ea')}
                        className="relative group cursor-pointer">
                        <SquarePen />
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                     bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 
                     group-hover:opacity-100 transition">
                          Edit
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
                    </div>}
                  <div className="flex flex-col  gap-3">
                    {viewer == "user" &&
                      <button
                        onClick={() => navigate('/add')}
                        className="bg-linear-to-r  from-violet-600 to-blue-600 hover:from-violet-700 px-6 py-2 rounded-full hover:to-blue-700 text-white">Add Credentials</button>
                    }
                    <button
                      onClick={() => navigate('/vc')}
                      className="bg-linear-to-r  from-blue-600 to-violet-600 px-6 py-2 rounded-full hover:from-blue-900 hover:to-purple-700 text-white">view Credentials</button>
                  </div>
                </div>

              </div>

              {/* Personal Info */}
              <div className="mt-6 lg:mt-10 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Mail size={16} className="text-blue-500" />
                    {newObj.user.email}
                  </div>
                 { newObj.personalData.phone && <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Phone size={16} className="text-green-500" />
                    {newObj.user.phone}
                  </div>}

                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Calendar size={16} className="text-purple-500" />
                    Joined: {newObj.createdAt}
                  </div>
                 { newObj.personalData.location && <div className="flex items-center gap-3 text-sm text-gray-700">
                    <MapPin  size={16} className="text-green-500" />
                    {newObj.personalData.location}
                  </div>
}
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
                  {viewer === "user" &&
                    newObj.education.postdoc.map((postdoc, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 px-4 py-2 bg-white/50 rounded-lg border border-white/50"
                      >
                        <div className="flex-1 ">
                          <p className="font-semibold text-gray-800">
                            Postdoc in {postdoc.specialization}
                          </p>
                          <p className="text-sm text-gray-600">
                            {postdoc.University} • {postdoc.year}
                          </p>
                        </div>
                      </div>
                    ))
                  }

                  {
                    newObj.education.phd.map((phd, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 px-4 py-2 bg-white/50 rounded-lg border border-white/50"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">
                            Ph.D. in {phd.specialization}
                          </p>
                          <p className="text-sm text-gray-600">
                            {phd.University} • {phd.year}
                          </p>
                        </div>
                      </div>
                    ))}


                  {((viewer === "user") || (Object.keys(newObj.education.phd).length === 0)) &&
                    newObj.education.pg &&
                    <div
                      className="flex items-start gap-2 px-4 py-2 bg-white/50 rounded-lg border border-white/50"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {newObj.education.pg.course} in {newObj.education.pg.specialization}
                        </p>
                        <p className="text-sm text-gray-600">
                          {newObj.education.pg.college} • {newObj.education.pg.year}
                        </p>
                      </div>
                    </div>
                  }
                  {
                    viewer === "user" &&
  
                      <div
                        className="flex items-start gap-2 px-4 py-2 bg-white/50 rounded-lg border border-white/50"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">
                            { newObj.education.degree.degreeName} in { newObj.education.degree.specialization}
                          </p>
                          <p className="text-sm text-gray-600">
                            { newObj.education.degree.college} • { newObj.education.degree.year}
                          </p>
                        </div>
                      </div>
                    }
                </div>
              </Section>

              {/* Professional Experience */}
              {newObj.experience.length > 0 &&
                <Section
                  title="Professional Experience"
                  icon={<Briefcase size={20} className="text-orange-600" />}
                >
                  <div className="space-y-4">
                    {newObj.experience.map((exp, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 px-4 py-2 bg-white/50 rounded-lg border border-white/50"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{exp.designation}</p>
                          <p className="text-sm text-gray-600">
                            {exp.institute} • {exp.from}-{exp.to}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              }
            </div>

            {/* Two Column Sections */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Administrative Service - This Institution */}
              {newObj.administrativeService.length > 0 &&
                <Section
                  title="Administrative Service (Current)"
                  icon={<Award size={20} className="text-purple-600" />}
                >
                  <div className="space-y-2">
                    {newObj.administrativeService.map((service, index) => (
                      <p key={index} className="text-sm text-gray-700">
                        • {service.designation} ({service.from} - {service.to})
                      </p>
                    ))}
                  </div>
                </Section>
              }

              {/* Administrative Service - Other Institutions */}
              {newObj.otherAdministrativeService.length > 0 &&
                <Section
                  title="Administrative Service (Other)"
                  icon={<Award size={20} className="text-indigo-600" />}
                >
                  <div className="space-y-2">
                    {newObj.otherAdministrativeService.map((service, index) => (
                      <p key={index} className="text-sm text-gray-700">
                        • {service.designation} at {service.institute} ({service.from} - {service.to})
                      </p>
                    ))}
                  </div>
                </Section>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
