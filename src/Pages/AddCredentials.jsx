import React, { useState, useMemo } from 'react';

// Your data structures (unchanged)
const groupOptions = [
  'Publications',
  'Patents',
  'Academic Enrichment Programs',
  'Projects',
  'Certifications',
  'Content Development',
  'External Academic Engagements',
  'Awards and Recognitions',
  'Memberships in Professional Bodies',
  'Research Guidance',
];

const fields = {
  patents: ['Patent Number','Title of the Invention','Publication Date','Jurisdiction / Authority','Patent Status'],
  book_chapter: ['Title of the Book','Name of the Publisher','Year of Publication','national/international','ISBN Number','Document'],
  book: ['Title of the Book','Name of the Publisher','Year of Publication','national/international','ISBN Number','Document'],
  journal: ['Title of the Paper','Name of the Journal','Page Number','Year of Publication','ISBN_DOI_number','national/international','ISSN Number','Document'],
  conference: ['Title of the Paper','Title of the Conference','Page Number','Year of Publication','national/international','Document','organised by'],
  nptel: ['Course Title','Instructor Name(s)','Date of Completion','Grade/Score','Certificate '],
  swayam: ['Course Title','Instructor Name(s)','Date of Completion','Grade/Score','Certificate '],
  Coursera: ['Course Title','Instructor Name(s)','Date of Completion','Grade/Score','Certificate '],
  InfosysSpringBoard: ['Course Title','Instructor Name(s)','Date of Completion','Grade/Score','Certificate '],
  edx: ['Course Title','Instructor Name(s)','Date of Completion','Grade/Score','Certificate '],
  other: ['Type of Course','Course Title','Instructor Name(s)','Date of Completion','Grade/Score','Certificate '],
  sponsored: ['Project Title','Funding Agency','Amount (in INR)','Duration','Status','Document'],
  research: ['Project Title','Funding Agency','Principal Investigator','Fund Recieved (in INR)','Department_of_recipient','year_of_sanction','Duration','Status','Document'],
  consultancy: ['Project Title','Client Organization','Amount (in INR)','Duration','Status','Document'],
  FDP: ['Program Title','Organizing Body','Duration','Mode (Online/Offline)','venue','Attended/Organized'],
  STTP: ['Program Title','Organizing Body','Duration','Mode (Online/Offline)','venue','Attended/Organized'],
  workshop: ['Program Title','Organizing Body','Duration','Mode (Online/Offline)','venue','Attended/Organized'],
  seminar: ['Program Title','Organizing Body','Duration','Mode (Online/Offline)','venue','Attended/Organized'],
  webinar: ['Program Title','Organizing Body','Duration','Mode (Online/Offline)','venue','Attended/Organized'],
  RC: ['Program Title','Organizing Body','Duration','Mode (Online/Offline)','venue','Attended/Organized'],
  OC: ['Program Title','Organizing Body','Duration','Mode (Online/Offline)','venue','Attended/Organized'],
  talk: ['Event Title','Organizing Institution','Date','Topic / Title of Talk',' Mode','venue','Document'],
  keynote: ['Conference Title','Organizing Institution','Date','Topic / Title of Talk',' Mode','venue','Document'],
  chair: ['Conference title','Organizing Institution','Date','Topic / Title of Talk',' Mode','venue','Document'],
  lecture: ['Event Title','Organizing Institution','Date','Topic / Title of Talk',' Mode','venue','Document'],
  committee: ['Event Title','Organizing Institution','Date','Topic / Title of Talk',' Mode','venue','Document'],
  resource_person: ['Event Title','Organizing Institution','Date','Topic / Title of Talk',' Mode','venue','Document'],
  mooc_content: ['Content Title','Platform / Repository Name','Associated Course/Subject','Date / Year','Link'],
  'e-content': ['Content Title','Platform / Repository Name','Associated Course/Subject','Date / Year','Link'],
  course_content: ['Content Title','Platform / Repository Name','Associated Course/Subject','Date / Year','Link'],
  lab_manual: ['Content Title','Platform / Repository Name','Associated Course/Subject','Date / Year','Link'],
  repository: ['Content Title','Platform / Repository Name','Associated Course/Subject','Date / Year','Link'],
  award_title: ['Award / Recognition Title','Granting Organization / Institution','Year','Document'],
  ieee: ['Organization Name','Membership ID (if any)','Membership Type (Life/Annual/Student)','Year Joined','Validity Period (if applicable)','Document'],
  acm: ['Organization Name','Membership ID (if any)','Membership Type (Life/Annual/Student)','Year Joined','Validity Period (if applicable)','Document'],
  csi: ['Organization Name','Membership ID (if any)','Membership Type (Life/Annual/Student)','Year Joined','Validity Period (if applicable)','Document'],
  phd_awarded: ['year of awarding','Number of Students'],
  phd_ongoing: ['year of awarding','Number of Students'],
  mtech: ['year of awarding','Number of Students'],
  mphilmba: ['year of awarding','Number of Students'],
};

const subcategories = {
  'Publications': [
    { label: 'Journal Paper', value: 'journal' },
    { label: 'Conference Paper', value: 'conference' },
    { label: 'Book Chapter', value: 'book_chapter' },
    { label: 'Book', value: 'book' },
  ],
  'Certifications': [
    { label: 'NPTEL', value: 'nptel' },
    { label: 'SWAYAM', value: 'swayam' },
    { label: 'Coursera', value: 'Coursera' },
    { label: 'Infosys SpringBoard', value: 'InfosysSpringBoard' },
    { label: 'edX', value: 'edx' },
    { label: 'Others', value: 'other' },
  ],
  'Projects': [
    { label: 'Sponsored', value: 'sponsored' },
    { label: 'Consultancy', value: 'consultancy' },
    { label: 'Research', value: 'research' },
  ],
  'Academic Enrichment Programs': [
    { label: 'FDP', value: 'FDP' },
    { label: 'STTP', value: 'STTP' },
    { label: 'Workshop', value: 'workshop' },
    { label: 'Seminar', value: 'seminar' },
    { label: 'Webinar', value: 'webinar' },
    { label: 'Refresh Course', value: 'RC' },
    { label: 'Orientation Course', value: 'OC' },
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
    { label: 'e-Content', value: 'e-content' },
    { label: 'course content', value: 'course_content' },
    { label: 'Lab Manual', value: 'lab_manual' },
    { label: 'Institutional Repository', value: 'repository' },
  ],
  'Memberships in Professional Bodies': [
    { label: 'IEEE', value: 'ieee' },
    { label: 'ACM', value: 'acm' },
    { label: 'CSI', value: 'csi' },
    { label: 'Others', value: 'other' },
  ],
  'Research Guidance': [
    { label: 'Ph.D. (Awarded)', value: 'phd_awarded' },
    { label: 'Ph.D. (Ongoing)', value: 'phd_ongoing' },
    { label: 'M.Tech/M.E/MCA', value: 'mtech' },
    { label: 'M.Phil/MBA', value: 'mphilmba' },
  ],
};

const directFieldGroups = {
  'Patents': 'patents',
  'Awards and Recognitions': 'award_title',
};

const AddCredentials = () => {
  const [group, setGroup] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [formData, setFormData] = useState({});
  const [fileMap, setFileMap] = useState({});

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
  };

  const handleSubcategoryChange = (e) => {
    const val = e.target.value;
    setSubcategory(val);
    setFormData({});
    setFileMap({});
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (name, file) => {
    setFileMap(prev => ({
      ...prev,
      [name]: file
    }));
    setFormData(prev => ({
      ...prev,
      [name]: file?.name || ''
    }));
  };

  // Helper: Is this a file field?
  const isFileField = (label) => {
    const clean = label.trim().toLowerCase();
    return clean.includes('document') || clean.includes('certificate');
  };

  // Helper: Is this a radio field? (e.g., "national/international")
  const isRadioField = (label) => {
    const clean = label.trim().toLowerCase();
    return clean === 'national/international' || 
           clean === 'mode (online/offline)' ||
           clean === 'attended/organized';
  };

  // Helper: Get radio options
  const getRadioOptions = (label) => {
    const clean = label.trim().toLowerCase();
    if (clean === 'national/international') {
      return [
        { value: 'National', label: 'National' },
        { value: 'International', label: 'International' }
      ];
    } else if (clean === 'mode (online/offline)') {
      return [
        { value: 'Online', label: 'Online' },
        { value: 'Offline', label: 'Offline' }
      ];
    } else if (clean === 'attended/organized') {
      return [
        { value: 'Attended', label: 'Attended' },
        { value: 'Organized', label: 'Organized' }
      ];
    }
    return [];
  };

  // Helper: Is this a number field?
  const isNumberField = (label) => {
    const clean = label.toLowerCase();
    return clean.includes('year') || 
           clean.includes('amount') || 
           clean.includes('number of students') ||
           clean.includes('fund recieved') ||
           clean.includes('score') ||
           clean.includes('grade');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
      group,
      subcategory: hasSubcategories ? subcategory : null,
      data: formData,
      files: fileMap
    };
    
    console.log('✅ Submitted:', payload);
    alert(`✅ ${group}${hasSubcategories ? ` - ${subcategory}` : ''} added!`);
    
    setGroup('');
    setSubcategory('');
    setFormData({});
    setFileMap({});
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 px-6 py-5">
          <h1 className="text-2xl font-bold text-white text-center">Add New Credential</h1>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg  shadow-sm transition"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                required
              >
                <option value="">— Select type —</option>
                {subcategories[group].map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Form Fields */}
          {(group && (!hasSubcategories || subcategory)) && currentFieldKeys.length > 0 && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  {group}
                  {hasSubcategories && ` → ${subcategories[group]?.find(s => s.value === subcategory)?.label || subcategory}`}
                </h2>

                <div className="space-y-5">
                  {currentFieldKeys.map((label, idx) => {
                    const name = `field_${idx}`;
                    const cleanLabel = label.trim();
                    const isFile = isFileField(cleanLabel);
                    const isRadio = isRadioField(cleanLabel);
                    const isNum = isNumberField(cleanLabel) && !isRadio;
                    const value = formData[name] || '';

                    return (
                      <div key={name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {cleanLabel}
                          {!isFile && !isRadio && <span className="text-red-500 ml-1">*</span>}
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
                                  onChange={() => handleInputChange(name, opt.value)}
                                  className="h-4 w-4 text-blue-600 "
                                  required
                                />
                                <span className={`ml-2 ${value === opt.value ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                                  {opt.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        ) : isFile ? (
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
                                onClick={() => {
                                  handleFileChange(name, null);
                                }}
                                className="ml-2 text-xs text-red-500 hover:text-red-700"
                              >
                                ✕ Clear
                              </button>
                            )}
                          </div>
                        ) : (
                          <input
                            type={isNum ? "number" : "text"}
                            value={value}
                            onChange={(e) => handleInputChange(name, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md "
                            placeholder={`Enter ${cleanLabel}`}
                            required={!isFile}
                            min={isNum ? "1900" : undefined}
                            step={isNum ? "1" : undefined}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Submit Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3"> 
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition cursor-pointer focus:outline-none"
                  >
                    Submit {group}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setGroup('');
                      setSubcategory('');
                      setFormData({});
                      setFileMap({});
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg shadow-sm transition"
                  >
                    Cancel
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