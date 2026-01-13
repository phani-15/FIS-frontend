import React, { useEffect, useState } from 'react';
import { User, GraduationCap, Briefcase, Users, BookOpen, Save, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Personal } from "../core/Personal";
import { API } from "../backend"
import { isAuthenticated } from '../core/auth';

const EditProfilePage = () => {
  const { profileId } = useParams();
  const imageurl = API.replace("/api", "")
  // Initial profile data based on the new object structure


  // State to manage form data and active section
  const [initialProfile, setintialProfile] = useState({
    personalData: {
      name: "Phani Polavarapu",
      avatar: "images/Profile2.avif",
      father: "Surya Nageswara Rao",
      gender: "Male",
      DOB: "2004-09-15",
      marital: "unmarried",
      designation: "Assistant Professor",
      department: "cse",
      college: "University College of Engineering",
      date_of_join: "15-09-2011",
      phone: "1234567890",
      location: "buffalo ,New york"
    },
    user: {
      password: "Phani@123",
      email: "phanipolavarapu15@gmail.com",
      cPassword: "Phani@123"
    },
    education: {
      tenth: {
        title: "Tenth",
        school: "ZPHS Mummidivaram",
        percentage: "",
        year: "2009"
      },
      twelth: {
        title: "Intermediate/Diploma",
        type: "Intermediate",
        college: "Sri Ravi Junior College",
        percentage: "",
        year: "2013"
      },
      degree: {
        title: "Under Graduation",
        degreeName: "B.Tech",
        specialization: "Computer Science",
        percentage: "",
        college: "JNTUGV,CEV",
        university: "JNTUGV",
        year: "2017"
      },
      pg: {
        title: "Post Graduation",
        course: "M.Tech",
        specialization: "Computer Applications",
        percentage: "",
        college: "JNTUK,CEV",
        university: "JNTUK",
        year: "2021"
      },
      phd: [
        {
          specialization: "Biometrics",
          under_the_proffessor: "Dr.P.Aruna Kumari",
          department: "Computer Science",
          University: "JNTUGV",
          year: "2021"
        }
      ],
      postdoc: [
        {
          University: "MIT",
          specialization: "Neural Networks",
          under_the_proffessor: "Dr. John Doe",
          year: 2020
        }
      ]
    },
    experience: [
      {
        institute: "JNTUGV",
        designation: "Asst.Professor",
        from: 2021,
        to: 2023
      }
    ],
    administrativeService: [
      {
        designation: "Head of the Administrative service",
        from: 2024,
        to: "Present"
      }
    ],
    otherAdministrativeService: [
      {
        institute: "JNTUK",
        from: 2022,
        to: 2023,
        designation: "head of the department"
      }
    ]
  }
  )
  const [profile, setProfile] = useState(initialProfile);
  const [activeSection, setActiveSection] = useState('personalData');
  const [isSaving, setIsSaving] = useState(false);
  const [changes, setChanges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getFunction = async () => {
      const data = await Personal(profileId);
      if (data) {
        setintialProfile(data);
        setProfile(data);
      }
    };
    getFunction();
  }, [profileId]);
  console.log("intial Profile:", initialProfile);
  console.log(" Profile:", profile);


  // Handle input changes for nested objects
  const handleChange = (section, field, value) => {
    let oldValue;

    if (section === 'personalData' || section === 'user') {
      oldValue = profile[section][field];
      setProfile(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    } else if (section.startsWith('education.')) {
      // Handle nested education objects
      const [eduSection, subSection, fieldName] = section.split('.');
      oldValue = profile[eduSection][subSection][fieldName];
      setProfile(prev => ({
        ...prev,
        [eduSection]: {
          ...prev[eduSection],
          [subSection]: {
            ...prev[eduSection][subSection],
            [fieldName]: value
          }
        }
      }));
    }

    // Record the change
    if (oldValue !== undefined) {
      setChanges(prev => [
        ...prev,
        { section, field, index: null, oldValue, newValue: value, timestamp: new Date() }
      ]);
    }
  };

  // Handle array field changes (experience, administrativeService, etc.)
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
  };

  // Handle nested array changes (education.phd, education.postdoc)
  const handleNestedArrayChange = (parentSection, arrayName, index, field, value) => {
    const oldValue = profile[parentSection][arrayName][index][field];
    setProfile(prev => {
      const updatedArray = [...prev[parentSection][arrayName]];
      updatedArray[index] = { ...updatedArray[index], [field]: value };
      return {
        ...prev,
        [parentSection]: {
          ...prev[parentSection],
          [arrayName]: updatedArray
        }
      };
    });

    setChanges(prev => [
      ...prev,
      { section: `${parentSection}.${arrayName}`, field, index, oldValue, newValue: value, timestamp: new Date() }
    ]);
  };

  // Add new item to array sections
  const addNewItem = (section) => {
    if (section === 'experience') {
      setProfile(prev => ({
        ...prev,
        experience: [
          ...prev.experience,
          { institute: '', designation: '', from: '', to: '' }
        ]
      }));
    } else if (section === 'administrativeService') {
      setProfile(prev => ({
        ...prev,
        administrativeService: [
          ...prev.administrativeService,
          { designation: '', from: '', to: '' }
        ]
      }));
    } else if (section === 'otherAdministrativeService') {
      setProfile(prev => ({
        ...prev,
        otherAdministrativeService: [
          ...prev.otherAdministrativeService,
          { institute: '', designation: '', from: '', to: '' }
        ]
      }));
    } else if (section === 'education.phd') {
      setProfile(prev => ({
        ...prev,
        education: {
          ...prev.education,
          phd: [
            ...prev.education.phd,
            { specialization: '', under_the_proffessor: '', department: '', University: '', year: '' }
          ]
        }
      }));
    } else if (section === 'education.postdoc') {
      setProfile(prev => ({
        ...prev,
        education: {
          ...prev.education,
          postdoc: [
            ...prev.education.postdoc,
            { University: '', specialization: '', under_the_proffessor: '', year: '' }
          ]
        }
      }));
    }
  };

  // Remove item from array sections
  const removeItem = (section, index) => {
    if (section === 'education.phd' || section === 'education.postdoc') {
      const [parent, child] = section.split('.');
      setProfile(prev => {
        const updatedArray = [...prev[parent][child]];
        updatedArray[index] = null;
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: updatedArray
          }
        };
      });
    } else {
      setProfile(prev => {
        const updatedSection = [...prev[section]];
        updatedSection[index] = null;
        return {
          ...prev,
          [section]: updatedSection
        };
      });
    }
  };

  const restoreItem = (section, index) => {
    if (section === 'education.phd' || section === 'education.postdoc') {
      const [parent, child] = section.split('.');
      setProfile(prev => {
        const updatedArray = [...prev[parent][child]];
        updatedArray[index] = initialProfile[parent][child][index];
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: updatedArray
          }
        };
      });
    } else {
      setProfile(prev => {
        const updatedSection = [...prev[section]];
        updatedSection[index] = initialProfile[section][index];
        return {
          ...prev,
          [section]: updatedSection
        };
      });
    }
  };

  const handleSave = () => {
    const diff = {};
    const changedSections = new Set();

    // Compare personalData section
    const personalDataChanges = {};
    Object.keys(profile.personalData).forEach(field => {
      if (profile.personalData[field] !== initialProfile.personalData[field]) {
        personalDataChanges[field] = profile.personalData[field];
        changedSections.add('personalData');
      }
    });
    if (Object.keys(personalDataChanges).length > 0) {
      diff.personalData = personalDataChanges;
    }

    // Compare user section
    const userChanges = {};
    Object.keys(profile.user).forEach(field => {
      if (profile.user[field] !== initialProfile.user[field]) {
        userChanges[field] = profile.user[field];
        changedSections.add('user');
      }
    });
    if (Object.keys(userChanges).length > 0) {
      diff.user = userChanges;
    }

    // Compare education sections
    const educationChanges = {};

    // Handle flat education objects (tenth, twelth, degree, pg)
    const educationFlatSections = ['tenth', 'twelth', 'degree', 'pg'];
    educationFlatSections.forEach(subSection => {
      const sectionChanges = {};
      Object.keys(profile.education[subSection]).forEach(field => {
        if (profile.education[subSection][field] !== initialProfile.education[subSection][field]) {
          sectionChanges[field] = profile.education[subSection][field];
          changedSections.add(`education.${subSection}`);
        }
      });
      if (Object.keys(sectionChanges).length > 0) {
        educationChanges[subSection] = sectionChanges;
      }
    });

    // Handle array education sections (phd, postdoc)
    const educationArraySections = ['phd', 'postdoc'];
    educationArraySections.forEach(subSection => {
      const currentArray = profile.education[subSection];
      const originalArray = initialProfile.education[subSection] || [];

      // Check if arrays are different
      let hasChanges = false;

      if (currentArray.length !== originalArray.length) {
        hasChanges = true;
      } else {
        for (let i = 0; i < currentArray.length; i++) {
          const currentItem = currentArray[i];
          const originalItem = originalArray[i];

          if (currentItem === null && originalItem !== null) {
            hasChanges = true;
            break;
          }

          if (currentItem && originalItem) {
            const allFields = new Set([...Object.keys(currentItem), ...Object.keys(originalItem)]);
            for (const field of allFields) {
              if (currentItem[field] !== originalItem[field]) {
                hasChanges = true;
                break;
              }
            }
          }
          if (hasChanges) break;
        }
      }

      if (hasChanges) {
        educationChanges[subSection] = currentArray;
        changedSections.add(`education.${subSection}`);
      }
    });

    if (Object.keys(educationChanges).length > 0) {
      diff.education = educationChanges;
    }

    // Array sections
    const arraySections = ['experience', 'administrativeService', 'otherAdministrativeService'];

    arraySections.forEach(section => {
      const currentArray = profile[section];
      const originalArray = initialProfile[section] || [];

      // Check if arrays are different
      let hasChanges = false;

      if (currentArray.length !== originalArray.length) {
        hasChanges = true;
      } else {
        for (let i = 0; i < currentArray.length; i++) {
          const currentItem = currentArray[i];
          const originalItem = originalArray[i];

          if (currentItem === null && originalItem !== null) {
            hasChanges = true;
            break;
          }

          if (currentItem && originalItem) {
            const allFields = new Set([...Object.keys(currentItem), ...Object.keys(originalItem)]);
            for (const field of allFields) {
              if (currentItem[field] !== originalItem[field]) {
                hasChanges = true;
                break;
              }
            }
          }
          if (hasChanges) break;
        }
      }

      if (hasChanges) {
        diff[section] = currentArray;
        changedSections.add(section);
      }
    });

    // Log detailed changes for debugging
    console.log("Changed sections:", Array.from(changedSections));
    console.log("Changes to send:", diff);

    // Prepare final payload with only changed data
    const payload = {};
    if (diff.personalData) payload.personalData = diff.personalData;
    if (diff.user) payload.user = diff.user;
    if (diff.education) payload.education = diff.education;
    if (diff.experience) payload.experience = diff.experience;
    if (diff.administrativeService) payload.administrativeService = diff.administrativeService;
    if (diff.otherAdministrativeService) payload.otherAdministrativeService = diff.otherAdministrativeService;

    // Add profileId if needed
    if (profileId) {
      payload.id = profileId;
    }

    console.log("Final payload to send:", payload);

    if (Object.keys(payload).length === 0) {
      alert("No changes detected!");
      return;
    }

    if (confirm("Save changes?")) {
      setIsSaving(true);

      // Here you would typically make an API call to save the changes
      // Example:
      // try {
      //   const response = await fetch(`/api/profiles/${profileId}`, {
      //     method: 'PATCH',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(payload)
      //   });
      //   
      //   if (response.ok) {
      //     alert("Profile saved successfully!");
      //     navigate('/profile/');
      //   } else {
      //     throw new Error('Failed to save');
      //   }
      // } catch (error) {
      //   alert("Failed to save changes: " + error.message);
      // } finally {
      //   setIsSaving(false);
      // }

      // For now, just show alert and navigate
      setTimeout(() => {
        setIsSaving(false);
        alert("Profile saved successfully!");
        navigate(`/profile/${profileId}`);
      }, 1000);
    }
  };
  // Handle cancel (reset to initial state)
  const handleCancel = () => {
    setProfile(initialProfile);
  };

  // Navigation items
  const navItems = [
    { id: 'personalData', label: 'Personal Data', icon: User },
    { id: 'education.tenth', label: '10th Grade', icon: GraduationCap },
    { id: 'education.twelth', label: 'Intermediate', icon: GraduationCap },
    { id: 'education.degree', label: 'Under Graduation', icon: GraduationCap },
    { id: 'education.pg', label: 'Post Graduation', icon: GraduationCap },
    { id: 'education.phd', label: 'PhD Details', icon: GraduationCap },
    { id: 'education.postdoc', label: 'Post Doc Details', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'administrativeService', label: 'Administrative Service', icon: Users },
    { id: 'otherAdministrativeService', label: 'Other Administrative Service', icon: Users },
  ];

  // Render the active section
  const renderActiveSection = () => {
    const [mainSection, subSection] = activeSection.split('.');

    switch (mainSection) {
      case 'personalData':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(profile.personalData).map((field) => {
                let value = profile.personalData[field];

                // Format the date for the input field
                if (field === 'DOB') {
                  // If it's an ISO date string, convert to YYYY-MM-DD format
                  if (value && value.includes('T')) {
                    value = new Date(value).toISOString().split('T')[0];
                  }
                }
                if (field === "avatar") {
                  value = "Profile-image"
                }

                return (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {field.replace(/_/g, ' ')}
                    </label>
                    <input
                      type={field === 'DOB' ? 'date' : 'text'}
                      value={value}
                      onChange={(e) => {
                        let newValue = e.target.value;
                        // If it's a date field, store it as ISO string
                        if (field === 'DOB') {
                          if (newValue) {
                            newValue = new Date(newValue).toISOString();
                          }
                        }
                        handleChange('personalData', field, newValue);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'education':
        switch (subSection) {
          case 'tenth':
          case 'twelth':
          case 'degree':
          case 'pg':
            const eduData = profile.education[subSection];
            return (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(eduData).map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {field}
                      </label>
                      <input
                        type="text"
                        value={eduData[field]}
                        onChange={(e) => handleChange(`education.${subSection}`, field, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'phd':
          case 'postdoc':
            return (
              <div className="space-y-4">
                <div className="flex justify-end items-center">
                  <button
                    onClick={() => addNewItem(`education.${subSection}`)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Add New
                  </button>
                </div>
                <div className="space-y-4">
                  {profile.education[subSection].map((item, index) => (
                    item && (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
                        {Object.keys(item).map((field) => (
                          !(field === "_id") &&
                          <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                              {field.replace(/_/g, ' ')}
                            </label>
                            <input
                              type="text"
                              value={item[field]}
                              onChange={(e) => handleNestedArrayChange('education', subSection, index, field, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                            />
                          </div>
                        ))}
                        <div className="col-span-2 flex justify-end space-x-2">
                          <button
                            onClick={() => restoreItem(`education.${subSection}`, index)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            Undo
                          </button>
                          <button
                            onClick={() => removeItem(`education.${subSection}`, index)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            );

          default:
            return null;
        }

      case 'experience':
        return (
          <div className="space-y-4">
            <div className="flex justify-end items-center">
              <button
                onClick={() => addNewItem('experience')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add New
              </button>
            </div>
            <div className="space-y-4">
              {profile.experience.map((exp, index) => (
                exp && (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
                    {Object.keys(exp).map((field) => (
                      !(field === "_id") &&
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                          {field}
                        </label>
                        <input
                          type="text"
                          value={exp[field]}
                          onChange={(e) => handleArrayChange('experience', index, field, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                        />
                      </div>
                    ))}
                    <div className="col-span-2 flex justify-end space-x-2">
                      <button
                        onClick={() => restoreItem('experience', index)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Undo
                      </button>
                      <button
                        onClick={() => removeItem('experience', index)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        );

      case 'administrativeService':
      case 'otherAdministrativeService':
        return (
          <div className="space-y-4">
            <div className="flex justify-end items-center">
              <button
                onClick={() => addNewItem(mainSection)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add New
              </button>
            </div>
            <div className="space-y-4">
              {profile[mainSection].map((item, index) => (
                item && (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
                    {Object.keys(item).map((field) => (
                      !(field === "_id") &&
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                          {field}
                        </label>
                        <input
                          type="text"
                          value={item[field]}
                          onChange={(e) => handleArrayChange(mainSection, index, field, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                        />
                      </div>
                    ))}
                    <div className="col-span-2 flex justify-end space-x-2">
                      <button
                        onClick={() => restoreItem(mainSection, index)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Undo
                      </button>
                      <button
                        onClick={() => removeItem(mainSection, index)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex bg-gray-50 mx-32 mt-10 rounded-xl">
      {/* Sidebar */}
      <div className="w-64 bg-linear-to-br from-blue-100 to-purple-200 border-white border-5 flex flex-col items-center rounded-xl">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <img src={`${imageurl}/uploads/profiles/${profile.personalData.avatar}`} alt="Profile Picture" className="rounded-full h-38" />
        </div>
        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${activeSection === item.id
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
      <div className="flex-1 flex-col items-center">
        {/* Header */}
        <div className="text-center mt-6 p-6">
          <h1 className="text-3xl font-bold font-serif text-gray-900">Edit Profile</h1>
        </div>

        {/* Profile Section */}
        <div className="p-4">
          {/* Active Section Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {navItems.find(item => item.id === activeSection)?.label || 'Edit Section'}
            </h2>
            {renderActiveSection()}
          </div>

          {/* Save Changes Button at Bottom */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky bottom-0">
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-5 py-2 text-sm font-bold bg-gray-600 text-white rounded-lg hover:bg-gray-500 shadow-sm flex gap-2 items-center"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 bg-linear-to-r cursor-pointer from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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