// FacultyProfile.jsx
import React from 'react';
import { Edit, LogOut, Printer } from 'lucide-react'; // Make sure to install lucide-react
import { useNavigate } from 'react-router-dom'; // For navigation

const FacultyProfile = ({ faculty }) => {
  const navigate = useNavigate();
  const {
    profile,
    message,
    personalInfo,
    education,
    professionalExperience,
    adminServiceThis,
    adminServiceOther,
    researchInterests
  } = faculty;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar (Your Provided Card) */}
        <div className="lg:col-span-1 flex flex-col items-center bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6">
          <div className="relative w-full flex justify-end mb-2">
            <Printer className="text-gray-600 hover:text-gray-800 cursor-pointer" />
          </div>

          <img
            src={profile.avatar.trim()}
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-blue-400 shadow-md object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div
            className="w-36 h-36 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold border-4 border-blue-400"
            style={{ display: 'none' }}
          >
            {profile.name
              .split(' ')
              .map(n => n[0])
              .join('')}
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-800 text-center">
            {profile.name}
          </h1>
          <p className="text-gray-500 text-center">{profile.role}</p>

          {/* Action Buttons */}
          <div className="flex flex-col w-full mt-6">
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white shadow hover:bg-blue-600 transition flex-1 justify-center">
                <Edit size={18} /> Edit Profile
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white shadow hover:bg-red-600 transition flex-1 justify-center">
                <LogOut size={18} /> Logout
              </button>
            </div>
            <button
              onClick={() => navigate('/add')}
              className="w-full bg-green-600 hover:bg-green-700 mt-4 text-white py-2 px-4 rounded-md text-sm font-medium transition"
            >
              Add Certifications
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Message */}
          <div className="bg-white rounded-xl shadow p-6">
            <blockquote className="text-lg italic text-gray-700 pl-4 border-l-4 border-blue-500">
              "{message}"
            </blockquote>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="ml-2 text-blue-600 hover:underline"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div>
                <span className="font-medium text-gray-700">Phone:</span>
                <span className="ml-2">{personalInfo.phone}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Location:</span>
                <span className="ml-2">{personalInfo.location}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Joined:</span>
                <span className="ml-2">{personalInfo.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Education</h3>
            <div className="space-y-4 ml-2">
              {education.map((edu, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-2 w-2 h-2 rounded-full bg-blue-600 mr-4"></div>
                  <div>
                    <div className="font-semibold">{edu.degree}</div>
                    <div className="text-blue-700">{edu.institution}</div>
                    <div className="text-gray-500 text-sm">({edu.year})</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Professional Experience</h3>
            <div className="space-y-4 ml-2">
              {professionalExperience.map((exp, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-2 w-2 h-2 rounded-full bg-blue-600 mr-4"></div>
                  <div>
                    <div className="font-semibold">{exp.role}</div>
                    <div className="text-blue-700">{exp.institution}</div>
                    <div className="text-gray-500 text-sm">{exp.years}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Administrative Service */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Administrative Service</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">At This Institution</h4>
                <ul className="space-y-1">
                  {adminServiceThis.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Other Service</h4>
                <ul className="space-y-1">
                  {adminServiceOther.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Research Interests */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Research Interests</h3>
            <div className="flex flex-wrap gap-2">
              {researchInterests.map((interest, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;