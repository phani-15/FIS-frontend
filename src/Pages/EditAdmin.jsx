import React, { useEffect, useState, useRef } from 'react';
import {
  User,
  GraduationCap,
  Briefcase,
  Users,
  Trash2,
  Save,
  X,
  Menu,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Personal, updatePersonalProfile } from '../core/Personal';
import { API } from '../backend';
import { departments } from '../assets/Data.jsx';
import ProfilePictureCropper from '../components/ProfilePictureCropper';

const EditProfilePage = () => {
  const { profileId } = useParams();
  const imageurl = API.replace("/api", "");
  const navigate = useNavigate();

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State to manage form data and active section
  const [initialProfile, setInitialProfile] = useState({
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
  });

  const [profile, setProfile] = useState(initialProfile);
  const [activeSection, setActiveSection] = useState('personalData');
  const [isSaving, setIsSaving] = useState(false);

  // Profile picture states
  const [showCropper, setShowCropper] = useState(false);
  const [profileImageSrc, setProfileImageSrc] = useState(null);
  const [croppedImageFile, setCroppedImageFile] = useState(null);
  const [croppedPreviewUrl, setCroppedPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch profile on mount
  useEffect(() => {
    const getFunction = async () => {
      const data = await Personal(profileId);
      if (data) {
        setInitialProfile(data);
        setProfile(data);
      }
    };
    getFunction();
  }, [profileId]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (croppedPreviewUrl) URL.revokeObjectURL(croppedPreviewUrl);
    };
  }, [croppedPreviewUrl]);

  // Close mobile menu when active section changes
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  }, [activeSection]);

  // === Handlers ===
  const handleChange = (section, field, value) => {
    if (section === 'personalData' || section === 'user') {
      setProfile((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    }
  };

  const handleEducationChange = (subSection, field, value) => {
    setProfile((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [subSection]: {
          ...prev.education[subSection],
          [field]: value,
        },
      },
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setProfile((prev) => {
      const updatedSection = [...prev[section]];
      updatedSection[index] = { ...updatedSection[index], [field]: value };
      return { ...prev, [section]: updatedSection };
    });
  };

  const handleNestedArrayChange = (parentSection, arrayName, index, field, value) => {
    setProfile((prev) => {
      const updatedArray = [...prev[parentSection][arrayName]];
      updatedArray[index] = { ...updatedArray[index], [field]: value };
      return {
        ...prev,
        [parentSection]: {
          ...prev[parentSection],
          [arrayName]: updatedArray,
        },
      };
    });
  };

  const addNewItem = (section) => {
    if (section === 'experience') {
      setProfile((prev) => ({
        ...prev,
        experience: [...prev.experience, { institute: '', designation: '', from: '', to: '' }],
      }));
    } else if (section === 'administrativeService') {
      setProfile((prev) => ({
        ...prev,
        administrativeService: [
          ...prev.administrativeService,
          { designation: '', from: '', to: '' },
        ],
      }));
    } else if (section === 'otherAdministrativeService') {
      setProfile((prev) => ({
        ...prev,
        otherAdministrativeService: [
          ...prev.otherAdministrativeService,
          { institute: '', designation: '', from: '', to: '' },
        ],
      }));
    } else if (section === 'education.phd') {
      setProfile((prev) => ({
        ...prev,
        education: {
          ...prev.education,
          phd: [
            ...prev.education.phd,
            {
              specialization: '',
              under_the_proffessor: '',
              department: '',
              University: '',
              year: '',
            },
          ],
        },
      }));
    } else if (section === 'education.postdoc') {
      setProfile((prev) => ({
        ...prev,
        education: {
          ...prev.education,
          postdoc: [
            ...prev.education.postdoc,
            { University: '', specialization: '', under_the_proffessor: '', year: '' },
          ],
        },
      }));
    }
  };

  const removeItem = (section, index) => {
    if (section === 'education.phd' || section === 'education.postdoc') {
      const [parent, child] = section.split('.');
      setProfile((prev) => {
        const updatedArray = [...prev[parent][child]];
        updatedArray[index] = null;
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: updatedArray,
          },
        };
      });
    } else {
      setProfile((prev) => {
        const updatedSection = [...prev[section]];
        updatedSection[index] = null;
        return { ...prev, [section]: updatedSection };
      });
    }
  };

  const restoreItem = (section, index) => {
    if (section === 'education.phd' || section === 'education.postdoc') {
      const [parent, child] = section.split('.');
      setProfile((prev) => {
        const updatedArray = [...prev[parent][child]];
        updatedArray[index] = initialProfile[parent][child][index];
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: updatedArray,
          },
        };
      });
    } else {
      setProfile((prev) => {
        const updatedSection = [...prev[section]];
        updatedSection[index] = initialProfile[section][index];
        return { ...prev, [section]: updatedSection };
      });
    }
  };

  // === Image Handling ===
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, etc.)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfileImageSrc(event.target.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (croppedBlob) => {
    if (!croppedBlob) return;
    const croppedFile = new File([croppedBlob], 'profile-picture.jpg', {
      type: 'image/jpeg',
    });
    const previewUrl = URL.createObjectURL(croppedBlob);
    setCroppedImageFile(croppedFile);
    setCroppedPreviewUrl(previewUrl);
    setShowCropper(false);
    setProfile((prev) => ({
      ...prev,
      personalData: {
        ...prev.personalData,
        avatar: croppedFile,
      },
    }));
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setProfileImageSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveProfilePicture = () => {
    setCroppedImageFile(null);
    setCroppedPreviewUrl(null);
    setProfile((prev) => ({
      ...prev,
      personalData: {
        ...prev.personalData,
        avatar: null,
      },
    }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // === Save Logic ===
  const handleSave = () => {
    const updatedFields = {};
    const fields = [];
    const subfields = {};

    // Compare personalData
    const personalDataChanges = {};
    Object.keys(profile.personalData).forEach((field) => {
      if (profile.personalData[field] !== initialProfile.personalData[field]) {
        personalDataChanges[field] = profile.personalData[field];
      }
    });
    if (Object.keys(personalDataChanges).length > 0) {
      updatedFields.personalData = personalDataChanges;
      fields.push('personalData');
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

    // Prepare payload
    const payload = { updatedFields, fields, subfields };

    if (fields.length === 0) {
      alert('No changes detected!');
      return;
    }

    if (confirm('Save changes?')) {
      setIsSaving(true);
      updatePersonalProfile(profileId, payload)
        .then((response) => {
          setIsSaving(false);
          if (response.success) {
            alert('Profile updated successfully!');
            setInitialProfile(profile);
            navigate(`/profile/${profileId}`);
          } else {
            alert('Failed to save changes: ' + (response.error || 'Unknown error'));
          }
        })
        .catch((error) => {
          setIsSaving(false);
          alert('Failed to save changes: ' + error.message);
          console.error('Error saving profile:', error);
        });
    }
  };

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

  // Render active section
  const renderActiveSection = () => {
    const [mainSection, subSection] = activeSection.split('.');
    switch (mainSection) {
      case 'personalData':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {Object.keys(profile.personalData)
                .filter((field) => field !== 'avatar')
                .map((field) => {
                  let value = profile.personalData[field];
                  if (field === 'DOB') {
                    if (value && value.includes('T')) {
                      value = new Date(value).toISOString().split('T')[0];
                    }
                  }

                  // Marital
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
                          <option value="">Select</option>
                          <option value="unmarried">Unmarried</option>
                          <option value="married">Married</option>
                        </select>
                      </div>
                    );
                  }

                  // Gender
                  if (field === 'gender') {
                    return (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <div className="flex space-x-4 mt-2">
                          {['Male', 'Female'].map((g) => (
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

                  // Designation
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
                          <option value="">Select</option>
                          <option value="Professor">Professor</option>
                          <option value="Assistant Professor">Assistant Professor</option>
                          <option value="Associate Professor">Associate Professor</option>
                          <option value="Assistant Professor(contract)">Assistant Professor(contract)</option>
                        </select>
                      </div>
                    );
                  }

                  // College
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
                            if (e.target.value === 'College of PharmaCeutical Sciences') {
                              handleChange('personalData', 'department', 'Department of Pharmacy');
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                          <option value="">Select</option>
                          <option value="University College of Engineering">University College of Engineering</option>
                          <option value="College of PharmaCeutical Sciences">College of PharmaCeutical Sciences</option>
                        </select>
                      </div>
                    );
                  }

                  // Department
                  if (field === 'department') {
                    if (profile.personalData.college === 'University College of Engineering') {
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
                            <option value="">Select</option>
                            {departments.map((dept) => (
                              <option key={dept} value={dept}>
                                {dept}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    } else {
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

                  // Phone
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
                            const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                            handleChange('personalData', field, digits);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Enter 10-digit phone number"
                        />
                      </div>
                    );
                  }

                  // Date of Join
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

                  // Default input
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
                          if (field === 'DOB' && newValue) {
                            newValue = new Date(newValue).toISOString();
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
                <div className="grid grid-cols-1 gap-4">
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
                <div className="flex justify-end items-center mb-4">
                  <button
                    onClick={() => addNewItem(`education.${subSection}`)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                  >
                    Add New
                  </button>
                </div>
                <div className="space-y-4">
                  {profile.education[subSection].map((item, index) => (
                    item && (
                      <div key={index} className="grid grid-cols-1 gap-4 p-4 border border-gray-200 rounded-lg">
                        {Object.keys(item).map((field) => (
                          !(field === "_id") && (
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
                          )
                        ))}
                        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                          <button
                            onClick={() => restoreItem(`education.${subSection}`, index)}
                            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                          >
                            Undo
                          </button>
                          <button
                            onClick={() => removeItem(`education.${subSection}`, index)}
                            className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
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
            <div className="flex justify-end items-center mb-4">
              <button
                onClick={() => addNewItem('experience')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
              >
                Add New
              </button>
            </div>
            <div className="space-y-4">
              {profile.experience.map((exp, index) => (
                exp && (
                  <div key={index} className="grid grid-cols-1 gap-4 p-4 border border-gray-200 rounded-lg">
                    {Object.keys(exp).map((field) => (
                      !(field === "_id") && (
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
                      )
                    ))}
                    <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                      <button
                        onClick={() => restoreItem('experience', index)}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        Undo
                      </button>
                      <button
                        onClick={() => removeItem('experience', index)}
                        className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
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
            <div className="flex justify-end items-center mb-4">
              <button
                onClick={() => addNewItem(mainSection)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
              >
                Add New
              </button>
            </div>
            <div className="space-y-4">
              {profile[mainSection].map((item, index) => (
                item && (
                  <div key={index} className="grid grid-cols-1 gap-4 p-4 border border-gray-200 rounded-lg">
                    {Object.keys(item).map((field) => (
                      !(field === "_id") && (
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
                      )
                    ))}
                    <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                      <button
                        onClick={() => restoreItem(mainSection, index)}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        Undo
                      </button>
                      <button
                        onClick={() => removeItem(mainSection, index)}
                        className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
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
    <>
      <div className="flex flex-col min-h-screen m-2 lg:m-12 rounded-3xl bg-gray-50">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold font-serif text-gray-900">Edit Profile</h1>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Main Layout - Mobile: Stack vertically, Desktop: Sidebar + Content */}
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Sidebar - Hidden on mobile by default, slides in when menu is open */}

          {/* Overlay for mobile */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
          <div
            className={`fixed md:static z-50 inset-y-0 left-0 w-64 bg-linear-to-br from-blue-100 to-purple-200 border-2 p-1 m-1 border-gray-200 rounded-2xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
              }`}
          >

            {/* Sidebar Content */}
            <div className="flex flex-col h-full">
              {/* Profile Picture Section */}
              <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col items-center">
                <div className="relative group mb-4 w-full max-w-32">
                  {croppedPreviewUrl || (profile.personalData.avatar && !croppedImageFile) ? (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
                      <img
                        src={
                          croppedPreviewUrl ||
                          (typeof profile.personalData.avatar === 'string'
                            ? `${imageurl}/uploads/profiles/${profile.personalData.avatar}`
                            : URL.createObjectURL(profile.personalData.avatar))
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/128?text=No+Image';
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer mx-auto"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <span className="text-gray-400 text-sm">No Photo</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center space-x-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 text-white"
                    >
                      Change
                    </button>
                    {(croppedPreviewUrl || profile.personalData.avatar) && (
                      <button
                        type="button"
                        onClick={handleRemoveProfilePicture}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 text-white"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 w-full max-w-32"
                >
                  {croppedPreviewUrl || profile.personalData.avatar ? 'Change Photo' : 'Add Photo'}
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 md:p-6 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        if (window.innerWidth < 768) {
                          setIsMobileMenuOpen(false);
                        }
                      }}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${activeSection === item.id
                        ? 'text-white bg-purple-600'
                        : 'text-gray-700 hover:bg-purple-100'
                        }`}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="text-sm font-medium truncate">{item.label}</span>
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Desktop Header */}
            <div className="hidden md:block p-6 border-b border-gray-200">
              <h1 className="text-3xl font-bold font-serif text-gray-900 text-center">Edit Profile</h1>
            </div>

            <div className="flex-1 p-4 md:p-6 overflow-y-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                  {navItems.find((item) => item.id === activeSection)?.label || 'Edit Section'}
                </h2>
                {renderActiveSection()}
              </div>
            </div>

            {/* Sticky Footer Buttons */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-bold bg-gray-600 text-white rounded-lg hover:bg-gray-500 shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-linear-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cropper Modal */}
        {showCropper && profileImageSrc && (
          <ProfilePictureCropper
            image={profileImageSrc}
            onCropComplete={handleCropComplete}
            onCancel={handleCropCancel}
          />
        )}
      </div>
    </>
  );
};

export default EditProfilePage;