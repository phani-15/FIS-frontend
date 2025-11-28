  import React, { useState } from 'react';
  import {  User, GraduationCap, Briefcase, Users, BookOpen, Save, X } from 'lucide-react';
  import { useNavigate } from 'react-router-dom';

  const EditProfilePage = () => {
    // Initial profile data
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

    // State to manage form data and active section
    const [profile, setProfile] = useState(initialProfile);
    const [activeSection, setActiveSection] = useState('personalInfo');
    const [isSaving, setIsSaving] = useState(false);
  const [changes, setChanges] = useState([]);
    const navigate = useNavigate();
    // Handle input changes
  const handleChange = (section, field, value) => {
    let oldValue;

    if (section === 'profile') {
      oldValue = profile.profile[field];
      setProfile(prev => ({
        ...prev,
        profile: { ...prev.profile, [field]: value }
      }));
    } else if (section === 'personalInfo') {
      oldValue = profile.personalInfo[field];
      setProfile(prev => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, [field]: value }
      }));
    }

    // Record the change
    setChanges(prev => [
      ...prev,
      { section, field, index: null, oldValue, newValue: value, timestamp: new Date() }
    ]);

    // console.log('Changes so far:', [...changes, { section, field, index: null, oldValue, newValue: value }]);
  };

    // Handle array field changes (education, experience, etc.)
  const handleArrayChange = (section, index, field, value) => {
    const oldValue = profile[section][index][field];
    setProfile(prev => {
      const updatedSection = [...prev[section]];
      updatedSection[index] = { ...updatedSection[index], [field]: value };
      return { ...prev, [section]: updatedSection };
    });

    setChanges(prev => [
      ...prev,
      { section, field, index, oldValue, newValue: value, timestamp: new Date() }
    ]);

    // console.log('Changes so far:', [...changes, { section, field, index, oldValue, newValue: value }]);
  };
  const handleSingleArrayChange = (section, index, value) => {
    const oldValue = profile[section][index];
    const updated = [...profile[section]];
    updated[index] = value;
    setProfile(prev => ({ ...prev, [section]: updated }));

    setChanges(prev => [
      ...prev,
      { section, field: null, index, oldValue, newValue: value, timestamp: new Date() }
    ]);

    // console.log('Changes so far:', [...changes, { section, field: null, index, oldValue, newValue: value }]);
  };


    // Add new item to array sections
    const addNewItem = (section) => {
      if (section === 'education') {
        setProfile(prev => ({
          ...prev,
          education: [
            ...prev.education,
            { degree: '', institution: '', year: '' }
          ]
        }));
      } else if (section === 'professionalExperience') {
        setProfile(prev => ({
          ...prev,
          professionalExperience: [
            ...prev.professionalExperience,
            { role: '', institution: '', years: '' }
          ]
        }));
      } else if (section === 'adminServiceThis') {
        setProfile(prev => ({
          ...prev,
          adminServiceThis: [...prev.adminServiceThis, '']
        }));
      } else if (section === 'adminServiceOther') {
        setProfile(prev => ({
          ...prev,
          adminServiceOther: [...prev.adminServiceOther, '']
        }));
      } else if (section === 'researchInterests') {
        setProfile(prev => ({
          ...prev,
          researchInterests: [...prev.researchInterests, '']
        }));
      }
    };

    // Remove item from array sections
   const removeItem = (section, index) => {
  setProfile(prev => {
    const updatedSection = [...prev[section]];
    updatedSection[index] = null; // mark as deleted
    return {
      ...prev,
      [section]: updatedSection
    };
  });
};

  const restoreItem = (section, index) => {
  setProfile(prev => {
    const updatedSection = [...prev[section]];

    // Always restore from initialProfile
    updatedSection[index] = initialProfile[section][index];

    return {
      ...prev,
      [section]: updatedSection
    };
  });
};


    // Handle saving the profile
const handleSave = () => {
  const diff = [];

  // Compare profile section
  Object.keys(profile.profile).forEach(field => {
    if (profile.profile[field] !== initialProfile.profile[field]) {
      diff.push({
        section: 'profile',
        field,
        oldValue: initialProfile.profile[field],
        newValue: profile.profile[field],
      });
    }
  });

  // Compare personalInfo section
  Object.keys(profile.personalInfo).forEach(field => {
    if (profile.personalInfo[field] !== initialProfile.personalInfo[field]) {
      diff.push({
        section: 'personalInfo',
        field,
        oldValue: initialProfile.personalInfo[field],
        newValue: profile.personalInfo[field],
      });
    }
  });

  // Array sections
  const arraySections = [
    'education',
    'professionalExperience',
    'adminServiceThis',
    'adminServiceOther',
    'researchInterests',
  ];

  arraySections.forEach(section => {
    const original = initialProfile[section] || [];
    const current = profile[section];

    // Only compare based on CURRENT list (this avoids duplication)
    current.forEach((item, index) => {
      const originalItem = original[index];

      if (item === null) {
        diff.push({
          section,
          index,
          action: 'removed',
          oldValue: originalItem,
        });
      } 
      else if (originalItem === undefined) {
        diff.push({
          section,
          index,
          action: 'added',
          newValue: item,
        });
      }
      else if (typeof item === 'string') {
        if (item !== originalItem) {
          diff.push({
            section,
            index,
            action: 'updated',
            oldValue: originalItem,
            newValue: item,
          });
        }
      } 
      else {
        Object.keys(item).forEach(field => {
          if (item[field] !== (originalItem[field] || '')) {
            diff.push({
              section,
              index,
              field,
              action: 'updated',
              oldValue: originalItem[field],
              newValue: item[field],
            });
          }
        });
      }
    });

    
  });

  setChanges(diff);
  console.log("Final Changes:", diff);

    if(confirm("Profile saved successfully!")){
      navigate('/adminPage')
    }

};


    // Handle cancel (reset to initial state)
    const handleCancel = () => {
      setProfile(initialProfile);
    };

    // Navigation items
    const navItems = [
      { id: 'personalInfo', label: 'Personal Info', icon: User },
      { id: 'education', label: 'Education', icon: GraduationCap },
      { id: 'professionalExperience', label: 'Professional Experience', icon: Briefcase },
      { id: 'adminServiceThis', label: 'Admin Service - This Institute', icon: Users },
      { id: 'adminServiceOther', label: 'Admin Service - Other Institutes', icon: Users },
      { id: 'researchInterests', label: 'Research Interests', icon: BookOpen },
    ];

    // Render the active section
    const renderActiveSection = () => {
      switch (activeSection) {
        case 'personalInfo':
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={profile.profile.name}
                    onChange={(e) => handleChange('profile', 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    value={profile.profile.role}
                    onChange={(e) => handleChange('profile', 'role', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.personalInfo.email}
                    onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={profile.personalInfo.phone}
                    onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={profile.personalInfo.location}
                    onChange={(e) => handleChange('personalInfo', 'location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Joined Date</label>
                  <input
                    type="text"
                    value={profile.personalInfo.joinedDate}
                    onChange={(e) => handleChange('personalInfo', 'joinedDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          );
        case 'education':
          return (
            <div className="space-y-4">
              
              <div className="space-y-4">
                {profile.education.map((edu, index) => (
                  edu&&<div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div className="flex items-end space-x-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <button
                        onClick={() => restoreItem('education', index)}
                        className="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 cursor-pointer transition-colors text-sm"
                      >
                      undo
                      </button>
                      <button
                        onClick={() => removeItem('education', index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-colors text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        case 'professionalExperience':
          return (
            <div className="space-y-4">
              
              <div className="space-y-4">
                {profile.professionalExperience.map((exp, index) => (
                  exp&&
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleArrayChange('professionalExperience', index, 'role', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                      <input
                        type="text"
                        value={exp.institution}
                        onChange={(e) => handleArrayChange('professionalExperience', index, 'institution', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div className="flex items-end space-x-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Years</label>
                        <input
                          type="text"
                          value={exp.years}
                          onChange={(e) => handleArrayChange('professionalExperience', index, 'years', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <button
                        onClick={() => restoreItem('professionalExperience', index)}
                        className="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 cursor-pointer transition-colors text-sm"
                      >
                        undo
                      </button>
                      <button
                        onClick={() =>{ 
                          if(confirm(`Remove professionalExperience of ${exp.role } from ${exp.institution}?`))
                          removeItem('professionalExperience', index)
                        }}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-colors text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        case 'adminServiceThis':
          return (
            <div className="space-y-4">
              
              <div className="space-y-3">
                {profile.adminServiceThis.map((service, index) => (
                  service&&
                  <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => {
                        const updated = [...profile.adminServiceThis];
                        updated[index] = e.target.value;
                        setProfile(prev => ({ ...prev, adminServiceThis: updated }));
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <button
                      onClick={() => restoreItem('adminServiceThis', index)}
                      className="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 cursor-pointer transition-colors text-sm"
                    >
                      undo
                    </button>
                    <button
                      onClick={() =>{ 
                          if(confirm(`Remove Administrative Service : "${service} "?`))
                             removeItem('adminServiceThis', index)
                        }
                      }
                      className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-colors text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        case 'adminServiceOther':
          return (
            <div className="space-y-4">
              
              <div className="space-y-3">
                {profile.adminServiceOther.map((service, index) => (
                  service&&
                  <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => {
                        const updated = [...profile.adminServiceOther];
                        updated[index] = e.target.value;
                        setProfile(prev => ({ ...prev, adminServiceOther: updated }));
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <button
                      onClick={() => restoreItem('adminServiceOther', index)}
                      className="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm"
                    >
                      undo
                    </button>
                    <button
                      onClick={() => 
                        { 
                          if(confirm(`Remove Administrative Service : "${service} "?`))
                             removeItem('adminServiceOther', index)
                        }
                      }
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        case 'researchInterests':
          return (
            <div className="space-y-4">
              
              <div className="space-y-3">
                {profile.researchInterests.map((interest, index) => (
                  interest&&
                  <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <input
                      type="text"
                      value={interest}
                      onChange={(e) => {
                        const updated = [...profile.researchInterests];
                        updated[index] = e.target.value;
                        setProfile(prev => ({ ...prev, researchInterests: updated }));
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <button
                      onClick={() => restoreItem('researchInterests', index)}
                      className="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 cursor-pointer transition-colors text-sm"
                    >
                      undo
                    </button>
                    <button
                      onClick={() => removeItem('researchInterests', index)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-colors text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div className="flex bg-gray-50 mx-32 mt-10 rounded-xl ">
        {/* Sidebar */}
        <div className="w-64 bg-linear-to-br from-blue-100 to-purple-200 border-white border-5 flex flex-col rounded-xl">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              Pd
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    activeSection === item.id
                      ? 'text-white bg-purple-500'
                      : 'text-gray-700 hover:bg-purple-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              );
            })}
          </nav>
        </div>

        
        {/* Main Content */}
        <div className="flex-1 flex-col items-center ">
          {/* Header */}
          <div className=" text-center mt-6 p-6">
                <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
            
          </div>

          {/* Profile Section */}
          <div className="p-4 ">
            {/* Active Section Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
                {activeSection.replace(/([A-Z])/g, ' $1').trim()}
              </h2>
              {renderActiveSection()}
            </div>

            {/* Save Changes Button at Bottom */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky bottom-0">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border  bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50  flex items-center space-x-0.5"
                >
                  <X className="w-4 h-4"/>
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 "
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default EditProfilePage;
