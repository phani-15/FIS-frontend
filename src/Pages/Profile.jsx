import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  LogOut,
  Save,
  XCircle,
  User,
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);

  // Dummy JSON data
  const profile = {
    profile: {
      name: "Dr. P. Aruna Kumari",
      role: "Professor @ JNTUGV",
      avatar: "images/Aruna-profile-photo.jpg"
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
    <div className=" p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Academic Profile</h1>
          <p className="text-gray-600 text-lg">Manage your professional information</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sticky top-8 border border-white/20">
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={profile.profile.avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover mx-auto"
                  />
                  {isEditing && (
                    <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                      <Edit size={14} />
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className="mt-4 space-y-3">
                    <input
                      type="text"
                      value={editedProfile.profile.name}
                      onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                      className="w-full text-center text-xl font-bold text-gray-800 bg-transparent border-b-2 border-blue-300 focus:border-blue-500 focus:outline-none py-1"
                    />
                    <input
                      type="text"
                      value={editedProfile.profile.role}
                      onChange={(e) => handleInputChange('profile', 'role', e.target.value)}
                      className="w-full text-center text-gray-600 bg-transparent border-b-2 border-blue-300 focus:border-blue-500 focus:outline-none py-1"
                    />
                  </div>
                ) : (
                  <div className="mt-4">
                    <h1 className="text-2xl font-bold text-gray-800">{profile.profile.name}</h1>
                    <p className="text-gray-600">{profile.profile.role}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  {isEditing ? (
                    <div className="flex">
                      <button
                        onClick={handleSave}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-105"
                      >
                        <Save size={20} /> Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-500 text-white shadow-lg hover:bg-gray-600 transition-all duration-200"
                      >
                        <XCircle size={20} /> Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleEditToggle}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
                      >
                        <Edit size={20} /> Edit 
                      </button>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500 text-white shadow-lg hover:bg-red-600 transition-all duration-200">
                        <LogOut size={20} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-3">Contact Information</h3>
                <div className="space-y-3">
                  {[
                    { key: 'email', icon: <Mail size={16} />, color: 'text-blue-500' },
                    { key: 'phone', icon: <Phone size={16} />, color: 'text-green-500' },
                    { key: 'location', icon: <MapPin size={16} />, color: 'text-red-500' },
                    { key: 'joinedDate', icon: <Calendar size={16} />, color: 'text-purple-500' },
                  ].map(({ key, icon, color }) => (
                    <div className="flex items-center gap-3" key={key}>
                      <div className={`${color}`}>{icon}</div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProfile.personalInfo[key]}
                          onChange={(e) => handleInputChange('personalInfo', key, e.target.value)}
                          className="flex-1 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1 text-sm"
                        />
                      ) : (
                        <span className="text-sm text-gray-700">{profile.personalInfo[key]}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Education Section */}
            <Section title="Educational Qualifications" icon={<GraduationCap size={20} className="text-green-600" />}>
              <div className="space-y-4">
                {(isEditing ? editedProfile.education : profile.education).map((edu, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white/50 rounded-lg border border-white/50">
                    {isEditing ? (
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleArrayItemChange('education', index, 'degree', e.target.value)}
                          className="w-full font-semibold text-gray-800 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                          placeholder="Degree Name"
                        />
                        <div className="flex gap-4">
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => handleArrayItemChange('education', index, 'institution', e.target.value)}
                            className="flex-1 text-sm text-gray-600 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                            placeholder="Institution"
                          />
                          <input
                            type="text"
                            value={edu.year}
                            onChange={(e) => handleArrayItemChange('education', index, 'year', e.target.value)}
                            className="w-24 text-sm text-gray-600 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                            placeholder="Year"
                          />
                        </div>
                        {isEditing && (
                          <button
                            onClick={() => removeArrayItem('education', index)}
                            className="text-red-500 text-sm hover:text-red-700 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{edu.degree}</p>
                          <p className="text-sm text-gray-600">
                            {edu.institution} • {edu.year}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={() => addArrayItem('education', { degree: '', institution: '', year: '' })}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>+ Add Education</span>
                  </button>
                )}
              </div>
            </Section>

            {/* Professional Experience */}
            <Section title="Professional Experience" icon={<Briefcase size={20} className="text-orange-600" />}>
              <div className="space-y-4">
                {(isEditing ? editedProfile.professionalExperience : profile.professionalExperience).map((exp, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white/50 rounded-lg border border-white/50">
                    {isEditing ? (
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => handleArrayItemChange('professionalExperience', index, 'role', e.target.value)}
                          className="w-full font-semibold text-gray-800 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                          placeholder="Role/Position"
                        />
                        <div className="flex gap-4">
                          <input
                            type="text"
                            value={exp.institution}
                            onChange={(e) => handleArrayItemChange('professionalExperience', index, 'institution', e.target.value)}
                            className="flex-1 text-sm text-gray-600 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                            placeholder="Institution"
                          />
                          <input
                            type="text"
                            value={exp.years}
                            onChange={(e) => handleArrayItemChange('professionalExperience', index, 'years', e.target.value)}
                            className="w-32 text-sm text-gray-600 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                            placeholder="Years"
                          />
                        </div>
                        {isEditing && (
                          <button
                            onClick={() => removeArrayItem('professionalExperience', index)}
                            className="text-red-500 text-sm hover:text-red-700 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{exp.role}</p>
                          <p className="text-sm text-gray-600">
                            {exp.institution} • {exp.years}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={() => addArrayItem('professionalExperience', { role: '', institution: '', years: '' })}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>+ Add Experience</span>
                  </button>
                )}
              </div>
            </Section>

            {/* Two Column Sections */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Administrative Service - This Institution */}
              <Section title="Administrative Service (Current)" icon={<Award size={20} className="text-purple-600" />}>
                <div className="space-y-2">
                  {(isEditing ? editedProfile.adminServiceThis : profile.adminServiceThis).map((service, index) => (
                    <div key={index} className="flex items-start gap-2">
                      {isEditing ? (
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            value={service}
                            onChange={(e) => {
                              const newServices = [...editedProfile.adminServiceThis];
                              newServices[index] = e.target.value;
                              setEditedProfile(prev => ({ ...prev, adminServiceThis: newServices }));
                            }}
                            className="flex-1 text-sm text-gray-700 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                          />
                          <button
                            onClick={() => {
                              const newServices = editedProfile.adminServiceThis.filter((_, i) => i !== index);
                              setEditedProfile(prev => ({ ...prev, adminServiceThis: newServices }));
                            }}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-700">• {service}</p>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button
                      onClick={() => {
                        setEditedProfile(prev => ({
                          ...prev,
                          adminServiceThis: [...prev.adminServiceThis, '']
                        }));
                      }}
                      className="text-blue-500 text-sm hover:text-blue-700 transition-colors flex items-center gap-1"
                    >
                      + Add Service
                    </button>
                  )}
                </div>
              </Section>

              {/* Administrative Service - Other Institutions */}
              <Section title="Administrative Service (Other)" icon={<Award size={20} className="text-indigo-600" />}>
                <div className="space-y-2">
                  {(isEditing ? editedProfile.adminServiceOther : profile.adminServiceOther).map((service, index) => (
                    <div key={index} className="flex items-start gap-2">
                      {isEditing ? (
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            value={service}
                            onChange={(e) => {
                              const newServices = [...editedProfile.adminServiceOther];
                              newServices[index] = e.target.value;
                              setEditedProfile(prev => ({ ...prev, adminServiceOther: newServices }));
                            }}
                            className="flex-1 text-sm text-gray-700 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                          />
                          <button
                            onClick={() => {
                              const newServices = editedProfile.adminServiceOther.filter((_, i) => i !== index);
                              setEditedProfile(prev => ({ ...prev, adminServiceOther: newServices }));
                            }}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-700">• {service}</p>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button
                      onClick={() => {
                        setEditedProfile(prev => ({
                          ...prev,
                          adminServiceOther: [...prev.adminServiceOther, '']
                        }));
                      }}
                      className="text-blue-500 text-sm hover:text-blue-700 transition-colors flex items-center gap-1"
                    >
                      + Add Service
                    </button>
                  )}
                </div>
              </Section>
            </div>

            {/* Research Interests */}
            <Section title="Research Interests" icon={<BookOpen size={20} className="text-teal-600" />}>
              <div className="space-y-2">
                {(isEditing ? editedProfile.researchInterests : profile.researchInterests).map((interest, index) => (
                  <div key={index} className="flex items-start gap-2">
                    {isEditing ? (
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          value={interest}
                          onChange={(e) => {
                            const newInterests = [...editedProfile.researchInterests];
                            newInterests[index] = e.target.value;
                            setEditedProfile(prev => ({ ...prev, researchInterests: newInterests }));
                          }}
                          className="flex-1 text-sm text-gray-700 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                        />
                        <button
                          onClick={() => {
                            const newInterests = editedProfile.researchInterests.filter((_, i) => i !== index);
                            setEditedProfile(prev => ({ ...prev, researchInterests: newInterests }));
                          }}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700">• {interest}</p>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={() => {
                      setEditedProfile(prev => ({
                        ...prev,
                        researchInterests: [...prev.researchInterests, '']
                      }));
                    }}
                    className="text-blue-500 text-sm hover:text-blue-700 transition-colors flex items-center gap-1"
                  >
                    + Add Research Interest
                  </button>
                )}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}