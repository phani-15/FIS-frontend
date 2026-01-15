import React, { useEffect, useState } from 'react';
import { User, GraduationCap, Briefcase, Users, BookOpen, Save, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Personal, updatePersonalProfile } from "../core/Personal";
import { API } from "../backend"
import { departments } from '../assets/Data.jsx';

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


  // Handle input changes for personalData and user sections
  const handleChange = (section, field, value) => {
    if (section === 'personalData' || section === 'user') {
      setProfile(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    }
  };

  // Separate handler for education object changes (tenth, twelth, degree, pg)
  const handleEducationChange = (subSection, field, value) => {
    setProfile(prev => ({
      ...prev,
      education: {
        ...prev.education,
        [subSection]: {
          ...prev.education[subSection],
          [field]: value
        }
      }
    }));
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
    const updatedFields = {};
    const fields = [];
    const subfields = {};

    // Helper function to process array operations
    const processArraySection = (sectionName, currentArray, originalArray) => {
      const processedArray = [];
      const sectionSubfields = [];
      let hasChanges = false;

      // Track original items by index
      const originalMap = new Map();
      (originalArray || []).forEach((item, index) => {
        if (item && item._id) {
          originalMap.set(item._id, { item, index });
        }
      });

      // Process current array
      currentArray.forEach((currentItem, currentIndex) => {
        if (currentItem === null) {
          // Deleted item
          const originalItem = originalArray[currentIndex];
          if (originalItem) {
            processedArray.push({
              ...originalItem,
              _operation: "delete",
              _index: currentIndex
            });
            sectionSubfields.push(`deleted_${currentIndex}`);
            hasChanges = true;
          }
        } else if (currentItem._id) {
          // Existing item - check if edited
          const original = originalMap.get(currentItem._id);
          if (original) {
            // Compare fields
            let isEdited = false;
            Object.keys(currentItem).forEach(key => {
              if (key !== '_id' && currentItem[key] !== original.item[key]) {
                isEdited = true;
              }
            });

            if (isEdited) {
              processedArray.push({
                ...currentItem,
                _operation: "edit",
                _index: original.index
              });
              sectionSubfields.push(original.index);
              hasChanges = true;
            }
          }
        } else {
          // New item
          processedArray.push({
            ...currentItem,
            _operation: "add"
          });
          sectionSubfields.push("new");
          hasChanges = true;
        }
      });

      if (hasChanges) {
        updatedFields[sectionName] = processedArray;
        fields.push(sectionName);
        subfields[sectionName] = sectionSubfields;
      }
    };

    // Compare personalData section
    const personalDataChanges = {};
    const personalDataSubfields = [];
    Object.keys(profile.personalData).forEach(field => {
      if (profile.personalData[field] !== initialProfile.personalData[field]) {
        personalDataChanges[field] = profile.personalData[field];
        personalDataSubfields.push(field);
      }
    });
    if (Object.keys(personalDataChanges).length > 0) {
      updatedFields.personalData = personalDataChanges;
      fields.push('personalData');
      subfields.personalData = personalDataSubfields;
    }

    // Compare user section
    const userChanges = {};
    const userSubfields = [];
    Object.keys(profile.user).forEach(field => {
      if (profile.user[field] !== initialProfile.user[field]) {
        userChanges[field] = profile.user[field];
        userSubfields.push(field);
      }
    });
    if (Object.keys(userChanges).length > 0) {
      updatedFields.user = userChanges;
      fields.push('user');
      subfields.user = userSubfields;
    }

    // Compare education sections
    const educationChanges = {};
    const educationSubfields = [];

    // Handle flat education objects (tenth, twelth, degree, pg)
    const educationFlatSections = ['tenth', 'twelth', 'degree', 'pg'];
    educationFlatSections.forEach(subSection => {
      const sectionChanges = {};
      let hasChanges = false;
      Object.keys(profile.education[subSection]).forEach(field => {
        if (profile.education[subSection][field] !== initialProfile.education[subSection][field]) {
          sectionChanges[field] = profile.education[subSection][field];
          hasChanges = true;
        }
      });
      if (Object.keys(sectionChanges).length > 0) {
        educationChanges[subSection] = sectionChanges;
        educationSubfields.push(subSection);
      }
    });

    // Handle array education sections (phd, postdoc) - process with operations
    const educationArraySections = ['phd', 'postdoc'];
    educationArraySections.forEach(subSection => {
      const currentArray = profile.education[subSection];
      const originalArray = initialProfile.education[subSection] || [];

      const processedArray = [];
      let hasChanges = false;

      // Process each item
      currentArray.forEach((currentItem, currentIndex) => {
        const originalItem = originalArray[currentIndex];

        if (currentItem === null && originalItem !== null) {
          // Deleted item
          processedArray.push({
            ...originalItem,
            _operation: "delete",
            _index: currentIndex
          });
          hasChanges = true;
        } else if (currentItem && !originalItem) {
          // New item
          processedArray.push({
            ...currentItem,
            _operation: "add"
          });
          hasChanges = true;
        } else if (currentItem && originalItem) {
          // Check if edited
          let isEdited = false;
          Object.keys(currentItem).forEach(key => {
            if (key !== '_id' && currentItem[key] !== originalItem[key]) {
              isEdited = true;
            }
          });

          if (isEdited) {
            processedArray.push({
              ...currentItem,
              _operation: "edit",
              _index: currentIndex
            });
            hasChanges = true;
          }
        }
      });

      if (hasChanges) {
        educationChanges[subSection] = processedArray;
        educationSubfields.push(subSection);
      }
    });

    if (Object.keys(educationChanges).length > 0) {
      updatedFields.education = educationChanges;
      fields.push('education');
      subfields.education = educationSubfields;
    }

    // Process array sections (experience, administrativeService, otherAdministrativeService)
    const arraySections = ['experience', 'administrativeService', 'otherAdministrativeService'];

    arraySections.forEach(section => {
      const currentArray = profile[section];
      const originalArray = initialProfile[section] || [];

      const processedArray = [];
      const sectionSubfields = [];
      let hasChanges = false;

      // Process each item
      currentArray.forEach((currentItem, currentIndex) => {
        const originalItem = originalArray[currentIndex];

        if (currentItem === null && originalItem !== null) {
          // Deleted item
          processedArray.push({
            ...originalItem,
            _operation: "delete",
            _index: currentIndex
          });
          sectionSubfields.push(`deleted_${currentIndex}`);
          hasChanges = true;
        } else if (currentItem && !originalItem) {
          // New item
          processedArray.push({
            ...currentItem,
            _operation: "add"
          });
          sectionSubfields.push("new");
          hasChanges = true;
        } else if (currentItem && originalItem) {
          // Check if edited
          let isEdited = false;
          Object.keys(currentItem).forEach(key => {
            if (key !== '_id' && currentItem[key] !== originalItem[key]) {
              isEdited = true;
            }
          });

          if (isEdited) {
            processedArray.push({
              ...currentItem,
              _operation: "edit",
              _index: currentIndex
            });
            sectionSubfields.push(currentIndex);
            hasChanges = true;
          }
        }
      });

      if (hasChanges) {
        updatedFields[section] = processedArray;
        fields.push(section);
        subfields[section] = sectionSubfields;
      }
    });

    // Prepare final payload
    const payload = {
      updatedFields,
      fields,
      subfields
    };

    console.log("Final payload to send:", payload);

    if (fields.length === 0) {
      alert("No changes detected!");
      return;
    }

    if (confirm("Save changes?")) {
      setIsSaving(true);

      // Make API call to save the changes
      updatePersonalProfile(profileId, payload)
        .then(response => {
          setIsSaving(false);
          if (response.success) {
            alert("Profile updated successfully!");
            // Update initial profile to reflect saved changes
            setintialProfile(profile);
            navigate(`/profile/${profileId}`);
          } else {
            alert("Failed to save changes: " + (response.error || "Unknown error"));
          }
        })
        .catch(error => {
          setIsSaving(false);
          alert("Failed to save changes: " + error.message);
          console.error("Error saving profile:", error);
        });
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

                // Marital Status - Dropdown
                if (field === 'marital') {
                  return (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        Marital Status
                      </label>
                      <select
                        value={value}
                        onChange={(e) => handleChange('personalData', field, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Select your option</option>
                        <option value="unmarried">Unmarried</option>
                        <option value="married">Married</option>
                      </select>
                    </div>
                  );
                }

                // Gender - Radio Buttons
                if (field === 'gender') {
                  return (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <div className="flex space-x-6 mt-2">
                        {["Male", "Female"].map((g) => (
                          <label key={g} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="gender"
                              value={g}
                              checked={value === g}
                              onChange={(e) => handleChange('personalData', field, e.target.value)}
                              className="focus:ring-purple-500"
                            />
                            <span>{g}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                }

                // Designation - Dropdown
                if (field === 'designation') {
                  return (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        Designation
                      </label>
                      <select
                        value={value}
                        onChange={(e) => handleChange('personalData', field, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Select your option</option>
                        <option value="Professor">Professor</option>
                        <option value="Assistant Professor">Assistant Professor</option>
                        <option value="Associate Professor">Associate Professor</option>
                        <option value="Assistant Professor(contract)">Assistant Professor(contract)</option>
                      </select>
                    </div>
                  );
                }

                // College - Dropdown
                if (field === 'college') {
                  return (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        College
                      </label>
                      <select
                        value={value}
                        onChange={(e) => {
                          handleChange('personalData', field, e.target.value);
                          // Auto-set department if College of Pharmaceutical Sciences
                          if (e.target.value === "College of PharmaCeutical Sciences") {
                            handleChange('personalData', 'department', "Department of Pharmacy");
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Select your option</option>
                        <option value="University College of Engineering">University College of Engineering</option>
                        <option value="College of PharmaCeutical Sciences">College of PharmaCeutical Sciences</option>
                      </select>
                    </div>
                  );
                }

                // Department - Dropdown (conditional on college)
                if (field === 'department') {
                  // Only show if University College of Engineering
                  if (profile.personalData.college === "University College of Engineering") {
                    return (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                          Department
                        </label>
                        <select
                          value={value}
                          onChange={(e) => handleChange('personalData', field, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                          <option value="">Select your option</option>
                          {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                    );
                  } else {
                    // For College of Pharmaceutical Sciences, show read-only
                    return (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                          Department
                        </label>
                        <input
                          type="text"
                          value={value}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                        />
                      </div>
                    );
                  }
                }

                // Phone - Numeric validation
                if (field === 'phone') {
                  return (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                          handleChange('personalData', field, digits);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Enter 10-digit phone number"
                      />
                    </div>
                  );
                }

                // Date of Join - Date picker
                if (field === 'date_of_join') {
                  return (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        Date of Join
                      </label>
                      <input
                        type="date"
                        value={value}
                        onChange={(e) => handleChange('personalData', field, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  );
                }

                // Default text input for other fields
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                        onChange={(e) => handleEducationChange(subSection, field, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Add {subSection === 'phd' ? 'PhD' : 'Post Doc'} Details</h3>
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
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Professional Experience</h3>
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {mainSection === 'administrativeService' ? 'Administrative Service' : 'Other Administrative Service'}
              </h3>
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                className="px-6 py-2 bg-linear-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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