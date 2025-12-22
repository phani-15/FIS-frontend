import React, { useState, useMemo } from 'react';
import { fields } from '../assets/Data.jsx';
import { phd_awarded_fields, phd_joining_fields } from '../assets/Data.jsx';

// ✅ Data Structures (fixed syntax errors)
const groupOptions = [
  'Publications',
  'Patents',
  'Foreign Visits',
  'Academic Enrichment Programs',
  'Projects',
  'Certifications',
  'Content Development',
  'External Academic Engagements',
  'Awards and Recognitions',
  'Memberships in Professional Bodies',
  'Research Guidance',
];

const select_fields = ['Purpose of Visit', 'Nature of Visit', 'Role of Faculty', 'Scope', 'Membership Type', 'Role', 'Indexing Platform']

const select_options = {
  'Purpose of Visit': ['Conference', 'Workshop', 'FDP', 'Research Collaboration', 'Invited Lecture', 'MoU Activity', 'Training', 'Others'],
  'Nature of Visit': ['Official', 'Self-sponsored', 'Sponsored'],
  'Role of Faculty': ['Presenter', 'Invited Speaker', 'Resource Person', 'Session Chair', 'Participant'],
  'Scope': ['International (Abroad)', 'International (within India)', 'National Level', 'State Level', 'University Level'],
  'Membership Type': ['Life', 'Annual', 'Student'],
  'Role': ['Convenor', 'Co-Convenor', 'Coordinator', 'Co-Coordinator', 'Member'],
  'Indexing Platform': ['Scopus', 'Web of Science', 'SCI'],
}
const subcategories = {
  'Publications': [
    { label: 'Journal Paper', value: 'journal' },
    { label: 'Conference Paper/Seminar Paper', value: 'conference_paper' },
    { label: 'Book Chapter', value: 'book_chapter' },
    { label: 'Book', value: 'book' },
  ],
  'Certifications': [
    { label: 'NPTEL', value: 'nptel' },
    { label: 'SWAYAM', value: 'swayam' },
    { label: 'Coursera', value: 'coursera' },
    { label: 'Infosys SpringBoard', value: 'infosysspringboard' },
    { label: 'edX', value: 'edx' },
    { label: 'Others', value: 'other' },
  ],
  'Projects': [
    { label: 'Sponsored', value: 'sponsored' },
    { label: 'Consultancy', value: 'consultancy' },
    { label: 'Research', value: 'research' },
  ],
  'Academic Enrichment Programs': [
    { label: 'FDP', value: 'fdp' },
    { label: 'STTP', value: 'sttp' },
    { label: 'Workshop', value: 'workshop' },
    { label: 'Conference', value: 'conference' },
    { label: 'Seminar', value: 'seminar' },
    { label: 'Webinar', value: 'webinar' },
    { label: 'Refresh Course', value: 'rc' },
    { label: 'Orientation Course', value: 'oc' },
  ],
  'External Academic Engagements': [
    { label: 'Invited Talk', value: 'talk' },
    { label: 'Keynote Address', value: 'keynote' },
    { label: 'Session Chair', value: 'chair' },
    { label: 'Guest Lecture', value: 'lecture' },
    { label: 'Expert Committee Member', value: 'committee' },
    { label: 'Resource Person', value: 'resource_person' },
  ],
  'Content Development': [
    { label: 'MOOCs', value: 'mooc_content' },
    { label: 'e-Content', value: 'econtent' },
    { label: 'Course Content', value: 'course_content' },
    { label: 'Lab Manual', value: 'lab_manual' },
    { label: 'Institutional Repository', value: 'repository' },
  ],
  'Memberships in Professional Bodies': [
    { label: 'IEEE', value: 'ieee' },
    { label: 'ACM', value: 'acm' },
    { label: 'CSI', value: 'csi' },
    { label: 'IE', value: 'ie' },
    { label: 'IETE', value: 'iete' },
    { label: 'Others', value: 'other_bodies' },
  ],
  'Research Guidance': [
    { label: 'Ph.D. (Awarded)', value: 'phd_awarded' },
    { label: 'Ph.D. (Ongoing)', value: 'phd_ongoing' },
    { label: 'M.Tech/M.E/MCA', value: 'mtech' },
  ],
};

const directFieldGroups = {
  'Patents': 'patents',
  'Awards and Recognitions': 'award_title',
  'Foreign Visits': 'foreign_visits',
};

const AddCredentials = () => {
  const [group, setGroup] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [formData, setFormData] = useState({});
  const [fileMap, setFileMap] = useState({});
  const [errors, setErrors] = useState({});

  // 🔧 Helpers (pure JS)
  const isFileField = (label) => {
    const clean = label.trim().toLowerCase();
    return clean.includes('document') || clean.includes('sanctioning order') || clean.includes('certificate') || clean.includes('proceeding') || clean.includes('allotment order');
  };

  const isRadioField = (label) => {
    const clean = label.trim().toLowerCase();
    return clean === 'national/international' ||
      clean === 'mode' ||
      clean === 'published/granted' ||
      clean === 'attended/organized' ||
      clean === "are you" ||
      clean === "author" ||
      clean === "type of certification" ||
      clean === "status";
  };

  const isUtilCertificate = (label) => {
    const clean = label.trim().toLowerCase();
    return clean === 'utilization certificate (final year)';
  }

  const isDateField = (label) => {
    const clean = label.trim().toLowerCase()
    return clean.includes('date')
  }

  const isPlace = (label) => {
    const clean = label.trim().toLowerCase();
    return clean === 'place';
  };

  const isIndexing = (label) => {
    const clean = label.trim().toLowerCase();
    return clean === 'indexing platform';
  }

  // 🔍 Validation Helper (pure JS)
  const validateField = (label, value) => {
    const cleanLabel = label.trim().toLowerCase();
    const valStr = value.trim();
    const valNum = Number(valStr);

    // Required check for non-file, non-radio, non-scope
    if (!isFileField(label) && !isRadioField(label) && !valStr) {
      return { isValid: false, message: `${label} is required` };
    }
    if (isUtilCertificate(label) && formData['Status'] === 'Ongoing') {
      return { isValid: true };
    }
    if (cleanLabel === 'role' && formData['Attended/Organized'] !== 'Organized') {
      return { isValid: true };
    }

    if (isDateField(label)) {
      const inputDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // normalize to midnight

      const minDate = new Date("1900-01-01");

      if (isNaN(inputDate.getTime())) {
        return { isValid: false, message: "Invalid date format" };
      }

      if (inputDate < minDate) {
        return { isValid: false, message: "Date must be after the year 1900" };
      }

      if (inputDate >= today) {
        return { isValid: false, message: "Date must be before today" };
      }

      return { isValid: true };
    }

    // --- Year validation
    if (cleanLabel.includes('year') && !cleanLabel.includes('academic') && !cleanLabel.includes('certificate')) {
      if (!valStr) return { isValid: false, message: 'Year is required' };
      if (isNaN(valNum)) return { isValid: false, message: 'Year must be a number' };
      if (!Number.isInteger(valNum)) return { isValid: false, message: 'Year must be a whole number' };
      if (valNum < 1900) return { isValid: false, message: 'Year must be ≥ 1900' };
      const currentYear = new Date().getFullYear(); // 2025
      if (valNum > currentYear) return { isValid: false, message: `Year must be ≤ ${currentYear}` };
      return { isValid: true };
    }

    if (cleanLabel.includes('h-index')) {
      if (!valStr) return { isValid: false, message: 'H-index is required' }
      if (isNaN(valNum)) return { isValid: false, message: 'H-index must be a number' };
      if (valNum < 0) return { isValid: false, message: 'H-index must be ≥ 0' };
      return { isValid: true };
    }

    if (cleanLabel.includes('academic year')) {
      if (!valStr) {
        return { isValid: false, message: 'Academic Year is required' };
      }

      // Regex: exactly 4 digits, hyphen, 4 digits
      const academicYearRegex = /^(\d{4})-(\d{4})$/;
      const match = valStr.match(academicYearRegex);

      if (!match) {
        return { isValid: false, message: 'Academic Year must be in YYYY-YYYY format (e.g., 2024-2025)' };
      }

      const [_, startYearStr, endYearStr] = match;
      const startYear = Number(startYearStr);
      const endYear = Number(endYearStr);
      const currentYear = new Date().getFullYear(); // e.g., 2025

      // Validate year ranges
      if (startYear < 1900 || endYear < 1900) {
        return { isValid: false, message: 'Years must be ≥ 1900' };
      }
      if (startYear > currentYear + 1 || endYear > currentYear + 2) {
        return { isValid: false, message: `Years must not exceed ${currentYear + 2}` };
      }

      // Enforce consecutive years: endYear === startYear + 1
      if (endYear !== startYear + 1) {
        return { isValid: false, message: 'Academic Year must be consecutive (e.g., 2024-2025)' };
      }

      return { isValid: true };
    }

    // --- ISBN / ISSN validation
    if (cleanLabel.includes('isbn') || cleanLabel.includes('issn')) {
      if (!valStr) return { isValid: false, message: `${label} is required` };
      const isbnIssnRegex = /^[\d\-]+$/;
      if (!isbnIssnRegex.test(valStr)) {
        return { isValid: false, message: `${label} must contain only digits and hyphens` };
      }
      const digitsOnly = valStr.replace(/-/g, '');
      if (cleanLabel.includes('isbn') && digitsOnly.length !== 10 && digitsOnly.length !== 13) {
        return { isValid: false, message: 'ISBN must be 10 or 13 digits (hyphens allowed)' };
      }
      if (cleanLabel.includes('issn') && digitsOnly.length !== 8) {
        return { isValid: false, message: 'ISSN must be 8 digits (e.g., 1234-5678)' };
      }
      return { isValid: true };
    }

    // --- No. of Authors / Number of Students
    if (cleanLabel.includes('no. of authors') || cleanLabel.includes('number of students')) {
      if (!valStr) return { isValid: false, message: 'This field is required' };
      if (isNaN(valNum)) return { isValid: false, message: 'Must be a number' };
      if (!Number.isInteger(valNum)) return { isValid: false, message: 'Must be a whole number' };
      if (valNum < 1) return { isValid: false, message: 'Must be ≥ 1' };
      if (valNum > 100) return { isValid: false, message: 'Must be ≤ 100' };
      return { isValid: true };
    }

    // --- Amount / Fund Received
    if (cleanLabel.includes('amount') || cleanLabel.includes('fund received')) {
      if (!valStr) return { isValid: false, message: 'Amount is required' };
      if (isNaN(valNum)) return { isValid: false, message: 'Amount must be a number' };
      if (valNum < 0) return { isValid: false, message: 'Amount cannot be negative' };
      return { isValid: true };
    }

    return { isValid: true };
  };

  const hasSubcategories = useMemo(() => {
    return group && subcategories[group] && subcategories[group].length > 0;
  }, [group]);

  const currentFieldKeys = useMemo(() => {
    if (!group) return [];

    let key = '';
    if (directFieldGroups[group]) {
      key = directFieldGroups[group];
    } else if (hasSubcategories) {
      key = subcategory;
    } else {
      key = group.toLowerCase().replace(/\s+/g, '_');
    }
    return fields[key] || [];
  }, [group, subcategory, hasSubcategories]);

  const handleGroupChange = (e) => {
    const val = e.target.value;
    setGroup(val);
    setSubcategory('');
    setFormData({});
    setFileMap({});
    setErrors({});
  };

  const handleSubcategoryChange = (e) => {
    const val = e.target.value;
    setSubcategory(val);
    setFormData({});
    setFileMap({});
    setErrors({});
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (name, file) => {
    setFileMap(prev => ({ ...prev, [name]: file }));
    setFormData(prev => ({
      ...prev,
      [name]: file?.name || ''
    }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const getRadioOptions = (label) => {
    const clean = label.trim().toLowerCase();
    if (clean === 'national/international') {
      return [
        { value: 'National', label: 'National' },
        { value: 'International', label: 'International' }
      ];
    } else if (clean === 'mode') {
      return [
        { value: 'Online', label: 'Online' },
        { value: 'Offline', label: 'Offline' }
      ];
    }
    else if (clean === "published/granted") {
      return [
        { value: 'Published', label: 'Published' },
        { value: 'Granted', label: 'Granted' }
      ]
    }
    else if (clean === 'attended/organized') {
      return [
        { value: 'Attended', label: 'Attended' },
        { value: 'Organized', label: 'Organized' }
      ];
    }
    else if (clean === 'are you') {
      return [
        { value: 'Principal Investigator', label: 'Principal Investigator' },
        { value: 'Co-Principal Investigator', label: 'Co-Principal Investigator' }
      ]
    }
    else if (clean === "status") {
      return [
        { value: "Ongoing", label: "Ongoing" },
        { value: "Completed", label: "Completed" }
      ]
    }
    else if (clean === "type of certification") {
      return [
        { value: "FDP", label: "FDP" },
        { value: "Certification Course", label: "Certification Course" }
      ];
    }
    else if (clean === "author") {
      return [
        { value: "First Author", label: "First Author" },
        { value: "Co-Author", label: "Co-Author" }
      ];
    }
    return [];
  };

  const isNumberField = (label) => {
    const clean = label.toLowerCase();
    return (clean.includes('year') && !clean.includes('academic')) ||
      clean.includes('amount') ||
      clean.includes('number of students') ||
      clean.includes('fund received') ||
      clean.includes('in weeks') ||
      clean.includes('in days') ||
      clean.includes('in months') ||
      clean.includes('page') ||
      clean.includes('impact')
  };

  const isRole = (label) => {
    const clean = label.trim().toLowerCase();
    return clean === 'role';
  }

  const isOrganized = () => {
    const roleValue = formData['Attended/Organized'] || '';
    return roleValue === 'Organized';
  }

  const handlePhdSubmit = (e) => {
    e.preventDefault();
    // Validate all fields
    const newErrors = {};
    let isValid = true;
    const numPhd = Number(formData['Number of Ph.D. Awarded'] || 0);
    for (let i = 0; i < numPhd; i++) {
      phd_awarded_fields.forEach((label) => {
        const name = `${label}__${i}`;
        const value = formData[name] || '';
        const result = validateField(label, value);
        if (!result.isValid && result.message) {
          newErrors[name] = result.message;
          isValid = false;
        }
      });
    }
    if (!isValid) {
      setErrors(newErrors);
      return;
    }
    // ✅ Build payload
    const payload = {
      group,
      subcategory,
      formData,
      files: fileMap
    };
    console.log('✅ Submitted:', payload);
    alert(`✅ ${group} - ${subcategory} added!`);
    // Reset
    setGroup('');
    setSubcategory('');
    setFormData({});
    setFileMap({});
    setErrors({});
  };

  const isMembership = (label) => {
    const clean = label.trim().toLowerCase();
    return clean.includes('membership type');
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    let isValid = true;

    currentFieldKeys.forEach((label, idx) => {
      const name = label;
      const value = formData[name] || '';
      const clean = label.trim().toLowerCase();

      // 🚫 Skip Place validation when Mode ≠ Offline
      if (clean === 'place' && formData['Mode'] !== 'Offline') {
        return;
      }

      if (clean === 'validity period (if applicable)') {
        if (formData['Membership Type (Life/Annual/Student)'] === 'Life') {
          return; // 🚫 Skip validation for Life members
        }
      }

      // 🚫 Skip Role when not Organized
      if (clean === 'role' && formData['Attended/Organized'] !== 'Organized') {
        return;
      }

      const result = validateField(label, value);
      if (!result.isValid && result.message) {
        newErrors[name] = result.message;
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors(newErrors);
      console.log('❌ Validation Errors:', newErrors);
      return;
    }

    // ✅ Build payload
    const payload = {
      group,
      subcategory: hasSubcategories ? subcategory : null,
      formData,
      files: fileMap
    };

    console.log('✅ Submitted:', payload);
    alert(`✅ ${group}${hasSubcategories ? ` - ${subcategory}` : ''} added!`);

    // Reset
    setGroup('');
    setSubcategory('');
    setFormData({});
    setFileMap({});
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-linear-to-r from-purple-600 to-violet-800 px-6 py-5">
          <h1 className="text-3xl font-semibold text-white text-center font-sans" style={{ fontFamily: "Times New Roman, serif" }}>Add New Credential</h1>
        </div>

        <div className="p-6">
          {/* Group Selection */}
          <div className="mb-6">
            <label htmlFor="group" className="block text-sm font-semibold text-gray-700 mb-2">
              Credential Group
            </label>
            <select
              id="group"
              value={group}
              onChange={handleGroupChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:border-none"
            >
              <option value="">— Select a group —</option>
              {groupOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Subcategory Selection */}
          {hasSubcategories && (
            <div className="mb-6 animate-fade-in">
              <label htmlFor="subcategory" className="block text-sm font-semibold text-gray-700 mb-2">
                Type / Subcategory
              </label>
              <select
                id="subcategory"
                value={subcategory}
                onChange={handleSubcategoryChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-0 focus:ring-gray-500 "
                required
              >
                <option value="">— Select type —</option>
                {subcategories[group]?.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Form Fields */}
          {(group && (!hasSubcategories || subcategory)) && currentFieldKeys.length > 0 && (
            subcategory === 'phd_awarded' ? (
              <form onSubmit={handlePhdSubmit} className="space-y-6 animate-fade-in">
                <div className="border-t pt-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    {group} → {subcategories[group]?.find(s => s.value === subcategory)?.label || subcategory}
                  </h2>
                  <div className="space-y-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Ph.D. Awarded<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData['Number of Ph.D. Awarded'] || ''}
                      onChange={(e) => handleInputChange('Number of Ph.D. Awarded', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md ${errors['Number of Ph.D. Awarded'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        } `}
                      placeholder={`Enter Number of Ph.D. Awarded`}
                      required
                      min="1"
                    />
                    {errors['Number of Ph.D. Awarded'] && (
                      <p className="mt-1 text-sm text-red-600 font-medium">{errors['Number of Ph.D. Awarded']}</p>
                    )}
                    {/* I want to add formData['Number of Ph.D. Awarded'] times of phd_awarded_fields */}
                    {Array.from({ length: Number(formData['Number of Ph.D. Awarded'] || 0) }, (_, i) => (
                      <div key={i} className="p-4 border rounded-lg bg-gray-50">
                        <h3 className="text-md font-semibold text-gray-700 mb-3">Ph.D. Scholar {i + 1}</h3>
                        {phd_awarded_fields.map((label, idx) => {
                          const name = `${label}__${i}`;
                          const cleanLabel = label.trim();
                          const isFile = isFileField(cleanLabel);
                          const isNum = isNumberField(cleanLabel);
                          const isDate = isDateField(cleanLabel)
                          const value = formData[name] || '';
                          return (
                            <div key={name} className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {cleanLabel}
                                {!isFile && <span className="text-red-500 ml-1">*</span>}
                              </label>
                              {isFile ? (
                                <div className="mt-1 flex items-center">
                                  <label className="flex flex-col items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition">
                                    <span className="text-sm text-blue-600 font-medium">
                                      {value || 'Choose file'}
                                    </span>
                                    <input
                                      type="file"
                                      className="hidden"
                                      onChange={(e) => handleFileChange(name, e.target.files?.[0] || null)}
                                      accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                  </label>
                                  {value && (
                                    <button
                                      type="button"
                                      onClick={() => handleFileChange(name, null)}
                                      className="ml-2 text-xs text-red-500 hover:text-red-700"
                                    >
                                      ✕ Clear
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <input
                                  type={isNum ? "number" : isDate ? "date" : "text"}
                                  value={value}
                                  onChange={(e) => handleInputChange(name, e.target.value)}
                                  className={`w-full px-3 py-2 border rounded-md ${errors[name] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    } `}
                                  placeholder={`Enter ${cleanLabel}`}
                                  required={!isFile}
                                  min={isNum ? (cleanLabel.includes('year') ? "1900" : "0") : undefined}
                                  step={isNum ? "1" : undefined}
                                />
                              )}
                              {errors[name] && (
                                <p className="mt-1 text-sm text-red-600 font-medium">{errors[name]}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}

                    <div className="mt-6">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) :
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                <div className="border-t pt-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    {group}
                    {hasSubcategories && ` → ${subcategories[group]?.find(s => s.value === subcategory)?.label || subcategory}`}
                  </h2>

                  <div className="space-y-5">
                    {currentFieldKeys.map((label, idx) => {
                      const name = label;
                      const cleanLabel = label.trim();
                      const isFile = isFileField(cleanLabel);
                      const isRadio = isRadioField(cleanLabel);
                      const isNum = isNumberField(cleanLabel) && !isRadio;
                      const isDate = isDateField(cleanLabel)
                      const isPlaceField = isPlace(cleanLabel);
                      const value = formData[name] || '';
                      const modeValue = formData['Mode'] || '';
                      const isRoleField = isRole(cleanLabel);
                      const isUtilCert = isUtilCertificate(cleanLabel);

                      if (isPlaceField && modeValue !== 'Offline') {
                        return null; // 🚫 completely hide Place
                      }

                      if (isRoleField && !isOrganized()) {
                        return null; // 🚫 hide Role if not Organized
                      }
                      const isValidityPeriod =
                        cleanLabel.toLowerCase() === 'validity period (if applicable)';

                      if (
                        isValidityPeriod &&
                        formData['Membership Type (Life/Annual/Student)'] === 'Life'
                      ) {
                        return null;
                      }

                      if (isUtilCert && formData['Status'] === 'Ongoing') {
                        return null;
                      }

                      const isSelect = select_fields.includes(cleanLabel);

                      if (isSelect) {
                        return (
                          <div key={name}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">  
                              {cleanLabel}
                              <span className="text-red-500 ml-1">*</span>
                            </label>
                            <select
                              id={name}
                              value={value}
                              onChange={(e) => handleInputChange(name, e.target.value)}
                              className={`w-full px-4 py-3 border rounded-md ${errors[name] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                } `}
                              required
                            >
                              <option value="">— Select {cleanLabel} —</option>
                              {select_options[cleanLabel]?.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                            {errors[name] && (
                              <p className="mt-1 text-sm text-red-600 font-medium">{errors[name]}</p>
                            )}
                          </div>
                        );
                      }

                      return (
                        <div key={name}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {cleanLabel}
                            {!isFile && !isRadio && cleanLabel !== 'Scope' && <span className="text-red-500 ml-1">*</span>}
                          </label>

                          {isRadio ? (
                            <div className="flex flex-wrap gap-4 mt-1">
                              {getRadioOptions(cleanLabel).map(opt => (
                                <label key={opt.value} className="flex items-center cursor-pointer">
                                  <input
                                    type="radio"
                                    name={name}
                                    value={opt.value}
                                    checked={value === opt.value}
                                    onChange={() => {
                                      handleInputChange(name, opt.value);
                                      if (opt.value === 'Attended') {
                                        setFormData(prev => {
                                          const updated = { ...prev };
                                          delete updated['Role']; // ✅ remove role completely
                                          return updated;
                                        });
                                      }
                                      else if (opt.value === 'Organized') {
                                        setFormData(prev => ({ ...prev, 'Role': prev['Role'] || '' }));
                                      }
                                    }}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    required
                                  />
                                  <span className={`ml-2 ${value === opt.value ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                                    {opt.label}
                                  </span>
                                </label>
                              ))}
                            </div>
                          ) :
                            isUtilCert ? (
                              <div className="mt-1 flex items-center">
                                <label className="flex flex-col items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition">
                                  <span className="text-sm text-blue-600 font-medium">
                                    {value || 'Choose file'}
                                  </span>
                                  <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => handleFileChange(name, e.target.files?.[0] || null)}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                  />
                                </label>
                                {value && (
                                  <button
                                    type="button"
                                    onClick={() => handleFileChange(name, null)}
                                    className="ml-2 text-xs text-red-500 hover:text-red-700"
                                  >
                                    ✕ Clear
                                  </button>
                                )}
                              </div>
                            ) :
                              isFile ? (
                                <div className="mt-1 flex items-center">
                                  <label className="flex flex-col items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition">
                                    <span className="text-sm text-blue-600 font-medium">
                                      {value || 'Choose file'}
                                    </span>
                                    <input
                                      type="file"
                                      className="hidden"
                                      onChange={(e) => handleFileChange(name, e.target.files?.[0] || null)}
                                      accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                  </label>
                                  {value && (
                                    <button
                                      type="button"
                                      onClick={() => handleFileChange(name, null)}
                                      className="ml-2 text-xs text-red-500 hover:text-red-700"
                                    >
                                      ✕ Clear
                                    </button>
                                  )}
                                </div>
                              ) :
                                (
                                  <input
                                    type={isNum || label === "No. of Authors" ? "number" : isDate ? "date" : "text"}
                                    value={value}
                                    onChange={(e) => handleInputChange(name, e.target.value)}
                                    onBlur={() => {
                                      const result = validateField(label, formData[name] || '');
                                      if (!result.isValid && result.message) {
                                        setErrors(prev => ({ ...prev, [name]: result.message }));
                                      }
                                    }}
                                    className={`w-full px-3 py-2 border rounded-md ${errors[name] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                      } `}
                                    placeholder={`Enter ${cleanLabel}`}
                                    required={!isFile && cleanLabel !== 'validity period (if applicable)'}
                                    min={isNum ? (cleanLabel.includes('year') ? "1900" : "0") : undefined}
                                    step={isNum ? "1" : undefined}
                                  />
                                )}

                          {errors[name] && (
                            <p className="mt-1 text-sm text-red-600 font-medium">{errors[name]}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Submit Buttons */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setGroup('');
                        setSubcategory('');
                        setFormData({});
                        setFileMap({});
                        setErrors({});
                      }}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg shadow-sm transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-linear-to-r from-blue-800 to-purple-700 cursor-pointer hover:from-blue-800 hover:to-purple-800 text-white font-medium py-3 px-4 rounded-lg shadow-md transition focus:outline-none "
                    >
                      Submit {group}
                    </button>
                  </div>
                </div>
              </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCredentials;