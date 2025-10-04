
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
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  // const [profile, setProfile] = useState(null);
  // const [loading, setLoading] = useState(true);

  const navigate = useNavigate()
  // Dummy JSON data
  const profile = {
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
  // useEffect(() => {
  //   setTimeout(() => {
  //     setProfile(dummyData);
  //     setLoading(false);
  //   }, 500);
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
  //     </div>
  //   );
  // }

  const Section = ({ title, children }) => (
    <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">{title}</h2>
      {children}
    </div>
  );

  return (
    // <div className=" bg-gradient-to-br from-blue-100 to-purple-200 p-6">
    <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
      {/* Left - Profile Card */}
      <div className="lg:col-span-1 flex flex-col items-center bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6">
        <div className="relative w-full flex justify-end mb-2">
          <Printer className="text-gray-600 hover:text-gray-800 cursor-pointer" />
        </div>

        <img
          src={profile.profile.avatar}
          alt="Profile"
          className="w-36 h-36 rounded-full border-4 border-blue-400 shadow-md object-cover"
        />
        <h1 className="mt-4 text-2xl font-bold text-gray-800 text-center">
          {profile.profile.name}
        </h1>
        <p className="text-gray-500 text-center">{profile.profile.role}</p>

        <div>
          <div className="space-y-2 my-6 text-gray-700">
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

          {/* Action Buttons */}

          <div className="flex flex-col">
            <div className="mt-6 flex gap-3">
              <button className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg bg-blue-700 text-white shadow hover:bg-blue-600 transition">
                <Edit size={18} /> Edit Profile
              </button>
              <button 
              onClick={()=>navigate("/")}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white shadow transition">
                <LogOut size={18} /> Logout
              </button>
            </div>
            <button onClick={() => navigate('/add')} className="w-full bg-gradient-to-r from-green-600 via-purple-600 to-indigo-700 bg-green-600 hover:via-purple-900 mt-4 text-white py-2 px-4 cursor-pointer rounded-md text-sm font-medium transition">
              Add Certifications
            </button>
          </div>

        </div>
      </div>

      {/* Right - Info Sections */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <Section title="Message">
          <p className="text-gray-700 italic">"{profile.message}"</p>
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
  );
}
// import React, { useEffect, useState } from "react";
// import { Mail, Phone, MapPin, Calendar, Edit, LogOut } from "lucide-react";

// export default function ProfilePage() {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Dummy JSON data
//   const dummyData = {
//     profile: {
//       name: "Dr. P. Aruna Kumari",
//       role: "Professor @ JNTUGV",
//       avatar:
//         "https://jntugvcev.edu.in/wp-content/uploads/2020/08/6.-P-Aruna-Kumari-JNTUK-UCEV.jpg",
//     },
//     message:
//       "I believe in empowering students through interactive learning and real-world problem solving.",
//     personalInfo: {
//       email: "aruna.kumari@jntugv.edu.in",
//       phone: "+91 9876543210",
//       location: "Vizianagaram, India",
//       joinedDate: "Aug 2015",
//     },
//     education: [
//       {
//         degree: "Ph.D. in Computer Science",
//         institution: "IIT Delhi",
//         year: "2014",
//       },
//       {
//         degree: "M.Tech in Computer Engineering",
//         institution: "NIT Trichy",
//         year: "2009",
//       },
//       {
//         degree: "B.Tech in Information Technology",
//         institution: "Delhi University",
//         year: "2007",
//       },
//     ],
//     professionalExperience: [
//       {
//         role: "Professor",
//         institution: "JNTU-GV",
//         years: "2018 - Present",
//       },
//       {
//         role: "Associate Professor",
//         institution: "XYZ University",
//         years: "2014 - 2018",
//       },
//     ],
//     adminServiceThis: [
//       "Head of Department, Computer Science (2021 - Present)",
//       "Member, Curriculum Development Committee",
//     ],
//     adminServiceOther: [
//       "Reviewer, International Journal of AI Research",
//       "Advisor, National Education Policy Taskforce",
//     ],
//     researchInterests: [
//       "Artificial Intelligence & Machine Learning",
//       "Natural Language Processing",
//       "Educational Technology",
//       "Big Data Analytics",
//     ],
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       setProfile(dummyData);
//       setLoading(false);
//     }, 800);
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-lg text-gray-600">Loading profile...</p>
//       </div>
//     );
//   }

//   const Section = ({ title, children }) => (
//     <div className="mb-8">
//       <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-1 border-gray-200">
//         {title}
//       </h2>
//       {children}
//     </div>
//   );

//   return (
//     <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="flex gap-4">
//           {/* Left - Profile Card */}
//           <div className="md:w-1/3 bg-gradient-to-b from-blue-50 to-white p-6 text-center md:text-left">
//             <div className="mb-4 flex justify-center md:block">
//               <img
//                 src={profile.profile.avatar}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mx-auto"
//               />
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900">{profile.profile.name}</h1>
//             <p className="text-gray-600 mt-1">{profile.profile.role}</p>

//             {/* Action Buttons */}
//             <div className="mt-6 space-y-3">
//               <div className="flex flex-col sm:flex-row gap-2">
//                 <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition">
//                   <Edit size={16} /> Edit Profile
//                 </button>
//                 <button className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md text-sm font-medium transition">
//                   <LogOut size={16} /> Logout
//                 </button>
//               </div>
//               <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition">
//                 Add Certifications
//               </button>
//             </div>
//           </div>

//           {/* Right - Info Sections */}
//           <div className="md:w-2/3 p-6">
//             <Section title="Message">
//               <p className="text-gray-700 italic">"{profile.message}"</p>
//             </Section>

//             <Section title="Personal Information">
//               <div className="space-y-2">
//                 <p className="flex items-center gap-2 text-gray-700">
//                   <Mail size={16} className="text-blue-600" /> {profile.personalInfo.email}
//                 </p>
//                 <p className="flex items-center gap-2 text-gray-700">
//                   <Phone size={16} className="text-blue-600" /> {profile.personalInfo.phone}
//                 </p>
//                 <p className="flex items-center gap-2 text-gray-700">
//                   <MapPin size={16} className="text-blue-600" /> {profile.personalInfo.location}
//                 </p>
//                 <p className="flex items-center gap-2 text-gray-700">
//                   <Calendar size={16} className="text-blue-600" /> Joined {profile.personalInfo.joinedDate}
//                 </p>
//               </div>
//             </Section>

//             <Section title="Educational Qualifications">
//               <ul className="space-y-3">
//                 {profile.education.map((edu, idx) => (
//                   <li key={idx} className="border-l-2 border-blue-500 pl-3 py-1">
//                     <p className="font-medium text-gray-800">{edu.degree}</p>
//                     <p className="text-gray-600 text-sm">{edu.institution} – {edu.year}</p>
//                   </li>
//                 ))}
//               </ul>
//             </Section>

//             <Section title="Professional (Research/Teaching) Experience">
//               <ul className="space-y-3">
//                 {profile.professionalExperience.map((exp, idx) => (
//                   <li key={idx} className="border-l-2 border-green-500 pl-3 py-1">
//                     <p className="font-medium text-gray-800">{exp.role}</p>
//                     <p className="text-gray-600 text-sm">{exp.institution} – {exp.years}</p>
//                   </li>
//                 ))}
//               </ul>
//             </Section>

//             <Section title="Administrative Service in this Institution">
//               <ul className="list-disc pl-5 space-y-1 text-gray-700">
//                 {profile.adminServiceThis.map((service, idx) => (
//                   <li key={idx}>{service}</li>
//                 ))}
//               </ul>
//             </Section>

//             <Section title="Administrative Service to Other Institutions">
//               <ul className="list-disc pl-5 space-y-1 text-gray-700">
//                 {profile.adminServiceOther.map((service, idx) => (
//                   <li key={idx}>{service}</li>
//                 ))}
//               </ul>
//             </Section>

//             <Section title="Research Interests">
//               <ul className="list-disc pl-5 space-y-1 text-gray-700">
//                 {profile.researchInterests.map((interest, idx) => (
//                   <li key={idx}>{interest}</li>
//                 ))}
//               </ul>
//             </Section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
