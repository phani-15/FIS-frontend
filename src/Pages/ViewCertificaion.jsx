import React, { useState, useEffect } from 'react';
import { X, SquarePen, Download } from 'lucide-react';
import { names, map } from '../assets/CertificationData';
import { fields } from '../assets/Data';
import { useParams, useNavigate } from "react-router-dom"
import { getDetails } from "../core/addDetails"
import { API } from '../backend';
import { ArrowLeft } from 'lucide-react'

// --- NORMALIZATION FUNCTION ---
const normalizeBackendData = (backendData) => {
  // Map backend section names (UPPERCASE WITH SPACES) to normalized keys (lowercase_with_underscores)
  const sectionMap = {
    'FOREIGN VISITS': 'foreign_visits',
    'PATENTS': 'patents',
    'BOOK CHAPTER': 'book_chapter',
    'BOOK': 'book',
    'JOURNAL': 'journal',
    'CONFERENCE PAPER': 'conference_paper',
    'NPTEL': 'nptel',
    'SWAYAM': 'swayam',
    'COURSERA': 'coursera',
    'INFOSYS SPRINGBOARD': 'infosysspringboard',
    'EDX': 'edx',
    'OTHER': 'other',
    'SPONSORED': 'sponsored',
    'RESEARCH': 'research',
    'CONSULTANCY': 'consultancy',
    'FDP': 'fdp',
    'STTP': 'sttp',
    'CONFERENCE': 'conference',
    'WORKSHOP': 'workshop',
    'SEMINAR': 'seminar',
    'WEBINAR': 'webinar',
    'RC': 'RC',
    'OC': 'OC',
    'TALK': 'talk',
    'KEYNOTE': 'keynote',
    'CHAIR': 'chair',
    'LECTURE': 'lecture',
    'RESOURCE PERSON': 'resource_person',
    'INNOVATIVE PEDAGOGY': 'innovative_pedagogy',
    'AWARDS AND RECOGNITIONS': 'awards_and_recognitions',
    'IEEE': 'ieee',
    'ACM': 'acm',
    'CSI': 'csi',
    'IE': 'ie',
    'IETE': 'iete',
    'OTHER BODIES': 'other_bodies',
    'MOOC': 'any_moocs_course',
    'BOOK/BOOK CHAPTER': 'book_book_chapter',
  };

  // Reverse mapping: convert lowercase_with_underscores to "Space Separated"
  const underscoreToSpaces = (str) => {
    return str
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const normalizedData = {};

  // Process each section from backend
  Object.entries(backendData).forEach(([backendSection, items]) => {
    // Get normalized section key (e.g., "PATENTS" → "patents")
    const normalizedSection = sectionMap[backendSection] || backendSection.toLowerCase().replace(/\s+/g, '_');

    if (!Array.isArray(items)) return;

    // Process each item in the section
    const normalizedItems = items.map(item => {
      const normalizedItem = {};
      const expectedFields = fields[normalizedSection] || [];

      // Map backend keys (lowercase_with_underscores) to expected field names (Space Separated)
      Object.entries(item).forEach(([backendKey, value]) => {
        // Skip file/document fields if they're not in the expected fields
        if (backendKey.includes('certificate') || backendKey.includes('Certificate') || backendKey.includes('document') || backendKey.includes('Document') || backendKey.includes('Order') || backendKey.includes('Proceeding')) {
          normalizedItem[backendKey] = value;
          return;
        }

        // Try to match backend key with expected field
        let matchedField = null;

        // Direct match (backend key already in expected format)
        if (expectedFields.includes(backendKey)) {
          matchedField = backendKey;
        } else {
          // Try to find fuzzy match
          // Convert backend key from lowercase_underscores to space-separated
          const converted = underscoreToSpaces(backendKey);
          if (expectedFields.includes(converted)) {
            matchedField = converted;
          } else {
            // If no match found, use the converted version anyway
            matchedField = converted;
          }
        }
        normalizedItem[matchedField] = value;
      });

      return normalizedItem;
    });

    normalizedData[normalizedSection] = normalizedItems;
  });

  return normalizedData;
};
// --- Helper: Add IDs to initial data ---
const addIdsToData = (data) => {
  return Object.fromEntries(
    Object.entries(data).map(([section, items]) => [
      section,
      items.map((item, idx) => ({
        ...item,
        id: `${section}-${idx}`,
      })),
    ])
  );
};

// --- Helper: Normalize section key ---
const normalizeSectionKey = (section) => {
  return section.toLowerCase().replace(/\s+/g, '_');
};

// --- Helper: Format label ---
const formatFieldLabel = (label,section) => {
  if (!label || label.includes('certificate') || label.includes('Certificate') || (section!='mtech' && label.includes('Number') && (label.includes('Students') || label.includes('Contents'))) || label.includes('document') || label.includes('Document') || label.includes('Order') || label.includes('Proceeding'))
    return null;
  return label
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

// --- Helper: Get top 3 preview fields ---
const getTopRelevantFields = (section, item) => {
  const normalizedKey = normalizeSectionKey(section);
  const keys = fields[normalizedKey] || Object.keys(item).filter(k => k !== 'id');

  return keys
    .slice(0, 3)
    .map((key) => {
      let value = item[key];
      if (value === undefined) {
        const matchingKey = Object.keys(item).find(
          k => k.toLowerCase() === key.toLowerCase()
        );
        value = matchingKey ? item[matchingKey] : undefined;
      }

      if (key.toLowerCase().includes('date') && value) {
        value = new Date(value).toLocaleDateString("en-GB")
      }

      return {
        label: formatFieldLabel(key,section),
        value: value || '--',
      };
    })
    .filter(f => f.label);
};

// --- Helper: Section display names ---
const getSectionDisplayName = (section) => {
  return names[section] || section.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};

// --- Helper: Get modal title ---
const getModalTitle = (item) => {
  const titleKeys = [
    'Title of the Paper',
    'Project Title',
    'Name of Certification Course',
    'Title of the Patent',
    'Event Title',
    'Award / Recognition Title',
    'Program Title',
    'Title of the Book Chapter',
    'Title of the Book',
    'Title of the Book/Book Chapter',
    'Conference Title',
    'Organizing Institution',
  ];
  return titleKeys.map(k => item[k]).find(Boolean) || 'Item';
};

// --- EditModal Component ---
const EditModal = ({ item, sectionKey, onClose, onSave, onInputChange }) => {
  const titleField = getModalTitle(item);
  const normalizedKey = normalizeSectionKey(sectionKey);
  const allKeys = fields[normalizedKey] || Object.keys(item);  
  const fieldsToEdit = allKeys
    .filter(key => !['id'].includes(key))
    .map(key => ({
      key,
      label: formatFieldLabel(key),
      value: item[key] ?? '',
    }))
    .filter(f => f.label);    
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl">
        <div className="sticky top-0 bg-linear-to-r from-blue-600 to-purple-700 p-5 flex justify-between items-center text-white z-10">
          <h3 className="text-xl font-bold">
            Edit {getSectionDisplayName(sectionKey)}: {titleField.substring(0, 30)}...
          </h3>
          <button onClick={onClose} className="hover:text-gray-200">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {fieldsToEdit.map(({ key, label, value }) => {
            const isFile = key.includes('certificate') || key.includes('Certificate') || key.includes('document') || key.includes('Document') || key.includes('Order') || key.includes('Proceeding')

            const isPlaceField = key === 'Place';
            const modeValue = item['Mode'] || item['mode'];

            if (isPlaceField && modeValue === 'Online') return null;

            return (
              <div key={key} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
                {isFile ? (
                  <div className="p-2 bg-gray-50 rounded border text-sm text-gray-600 truncate">
                    {value || 'No file uploaded'}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => onInputChange(key, e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="sticky bottom-0 bg-gray-50 p-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// --- ReportDownloadModal ---
const ReportDownloadModal = ({ isOpen, onClose, certificationsData, fields }) => {
  const [selectedSections, setSelectedSections] = useState({});

  useEffect(() => {
    if (isOpen) {
      const init = {};
      Object.keys(certificationsData).forEach(sec => {
        init[sec] = {
          checked: false,
          selectedFields: []
        };
      });
      setSelectedSections(init);
    }
  }, [isOpen, certificationsData]);

  const getNonFileFields = (section) => {
    const normalizedKey = normalizeSectionKey(section);
    const allFields = fields[normalizedKey] || [];
    return allFields.filter(f =>
      !(f.includes('certificate') || f.includes('Certificate') || f.includes('document') || f.includes('Document') || f.includes('Order') || f.includes('Proceeding'))

    );
  };

  const toggleSection = (section) => {
    setSelectedSections(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        checked: !prev[section].checked,
        selectedFields: !prev[section].checked ? getNonFileFields(section) : []
      }
    }));
  };

  const toggleField = (section, field) => {
    setSelectedSections(prev => {
      const sec = prev[section];
      if (!sec.checked) return prev;
      const isSelected = sec.selectedFields.includes(field);
      const newFields = isSelected
        ? sec.selectedFields.filter(f => f !== field)
        : [...sec.selectedFields, field];
      return {
        ...prev,
        [section]: { ...sec, selectedFields: newFields }
      };
    });
  };

  const downloadCSV = () => {
    const rows = [];
    Object.entries(selectedSections).forEach(([section, config]) => {
      if (!config.checked || certificationsData[section].length === 0) return;

      const items = certificationsData[section];
      let selectedFields = config.selectedFields.filter(f =>
        !(f.includes('certificate') || f.includes('Certificate') || (section!='mtech' && f.includes('Number') && (f.includes('Moocs') || f.includes('Contents') || f.includes('Students'))) || f.includes('document') || f.includes('Document') || f.includes('Order') || f.includes('Proceeding'))
      );

      if (selectedFields.length === 0) return;

      rows.push([`${getSectionDisplayName(section)} (${items.length} items)`]);
      rows.push(['S.No', ...selectedFields]);

      items.forEach((item, idx) => {
        const row = [idx + 1];
        selectedFields.forEach(field => {
          let val = item[field] ?? '';
          let strVal = typeof val === 'string' ? val : String(val);

          // Escape double quotes by doubling them (CSV standard)
          strVal = strVal.replace(/"/g, '""');

          // Wrap in quotes if it contains commas, newlines, or double quotes
          if (strVal.includes(',') || strVal.includes('\n') || strVal.includes('"')) {
            strVal = `"${strVal}"`;
          }
          row.push(strVal);
        });
        rows.push(row);
      });

      rows.push([]);
    });

    if (rows.length === 0) {
      alert('No data selected.');
      return;
    }

    const csvContent = rows
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `certifications_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownload = () => {
    downloadCSV();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl flex flex-col">
        <div className="bg-linear-to-r from-blue-600 to-purple-700 p-5 text-white">
          <h3 className="text-xl font-bold">Download Report</h3>
          <p className="text-blue-100 text-sm mt-1">
            Select sections and fields to include in your report.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(certificationsData)
              .filter(([, items]) => items.length > 0)
              .map(([section, items]) => (
                <div key={section} className="border rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id={`sec-${section}`}
                      checked={selectedSections[section]?.checked || false}
                      onChange={() => toggleSection(section)}
                      className="mr-2 h-4 w-4 text-blue-600"
                    />
                    <label htmlFor={`sec-${section}`} className="font-medium text-gray-800">
                      {getSectionDisplayName(section)} ({items.length})
                    </label>
                  </div>

                  {selectedSections[section]?.checked && (
                    <div className="ml-6 mt-2 space-y-1 max-h-40 overflow-y-auto border-l-2 pl-2 border-gray-200">
                      {getNonFileFields(section).map(field => (
                        <div key={field} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`${section}-${field}`}
                            checked={selectedSections[section]?.selectedFields?.includes(field)}
                            onChange={() => toggleField(section, field)}
                            className="mr-2 h-3.5 w-3.5 text-blue-600"
                          />
                          <label htmlFor={`${section}-${field}`} className="text-sm text-gray-700">
                            {formatFieldLabel(field) || field}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}

                  {!selectedSections[section]?.checked && (
                    <p className="text-xs text-gray-500 italic ml-6">Select to choose fields</p>
                  )}
                </div>
              ))}
          </div>
        </div>

        <div className="border-t bg-gray-50 p-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-linear-to-r from-purple-600 to-indigo-600 cursor-pointer text-white rounded hover:from-purple-700 hover:to-indigo-700 flex items-center gap-1"
          >
            <Download size={16} />
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const ViewCertificaion = () => {
  const { userId, credId } = useParams();
  const navigate = useNavigate();
  const [initialData, setinitialData] = useState({});
  const [viewer, setviewer] = useState("");
  const [certificationsData, setCertificationsData] = useState({});
  const [expandedItems, setExpandedItems] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [sectionKey, setSectionKey] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const viewDocument = (docPath) => {
    if (!docPath) {
      alert('No document available');
      return;
    }
    const documentUrl = API.replace("/api", "");
    const fullUrl = `${documentUrl}/uploads/cred/${docPath}`;
    window.open(fullUrl, '_blank');
  };
  // Fetch and normalize data from backend
  useEffect(() => {
    const getfunction = async () => {
      try {
        const backendData = await getDetails(userId, credId);
        setviewer(backendData.role)
        // Normalize the backend data
        const normalizedData = normalizeBackendData(backendData);
        setinitialData(normalizedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getfunction();
  }, [userId, credId]);

  // Update certificationsData when initialData changes
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setCertificationsData(addIdsToData(initialData));
    }
  }, [initialData]);

  const openReportModal = () => {
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
  };

  const handleEditClick = (section, item) => {
    setItemToEdit({ ...item });
    setSectionKey(section);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setItemToEdit(null);
    setSectionKey(null);
  };

  const handleInputChange = (key, value) => {
    setItemToEdit((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!itemToEdit || !sectionKey) return closeModal();

    console.log(certificationsData);
    console.log("itemstoEdit : " ,itemToEdit);
    console.log("sectinKeys  : ",sectionKey);
    
    //here that we need to add hte constraint of making edits direclty within 7 days
    setCertificationsData((prev) => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map((item) =>
        item.id === itemToEdit.id ? itemToEdit : item
      ),
    }));
    closeModal();
  };

  const toggleExpanded = (section, id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [`${section}-${id}`]: !prev[`${section}-${id}`],
    }));
  };

  const getAllFields = (item, section) => {
    const normalizedKey = normalizeSectionKey(section);
    const keys = fields[normalizedKey] || Object.keys(item).filter(k => k !== 'id');

    return keys
      .filter((key) => !['id'].includes(key))
      .map((key) => {
        let value = item[key];
        if (value === undefined) {
          const matchingKey = Object.keys(item).find(
            k => k.toLowerCase() === key.toLowerCase()
          );
          value = matchingKey ? item[matchingKey] : undefined;
        }

        return {
          label: formatFieldLabel(key),
          value: value || 'Not specified',
        };
      })
      .filter((f) => f.label);
  };

  const renderCertificateItem = (section, item) => {
    const isExpanded = expandedItems[`${section}-${item.id}`];
    const topFields = getTopRelevantFields(section, item);
    const allFields = getAllFields(item, section);
    const hasDoc = item.document || item.certificate || item.Proceeding || item.Document || item.Certificate || item.sanctioning_order || item.utilization_certificate_of_final_year;
    return (
      <div
        key={item.id}
        className="rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="p-6 relative">
          {viewer === "user" &&
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-blue-600"
              onClick={() => handleEditClick(section, item)}
              title="Edit"
            >
              <SquarePen size={18} />
            </button>}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1 space-y-2">
              {topFields.map((field, i) => (
                <div key={i} className="text-sm">
                  <span className="font-medium text-gray-700">{field.label}:</span>{' '}
                  <span className="text-gray-600">{field.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleExpanded(section, item.id)}
                className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                {isExpanded ? 'Hide Details' : 'View Details'}
              </button>
              {(hasDoc && viewer !== "admin") && (
                <button className="px-3 py-1.5 mr-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
                  onClick={() => viewDocument(item.document || item.Certificate || item.Document || item.Proceeding || item.Sanctioning_Order || item.Utilization_Certificate_Of_Final_Year)}
                >
                  View Document
                </button>
              )}
            </div>
          </div>

          {isExpanded && (
            <div className="mt-5 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3">All Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {allFields.map((field, i) => {
                  if (field.label === 'Place' && (item.Mode === 'Online' || item.mode === 'Online')) {
                    return null;
                  }
                  return (
                    <div key={i} className="bg-gray-50 p-3 rounded text-sm">
                      <div className="font-medium text-gray-700">{field.label}</div>
                      <div className="text-gray-600">{field.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(`/profile/${userId}`)}
        className='left-7 flex ml-4 px-3.5 py-3 cursor-pointer rounded-3xl text-white gap-2 bg-linear-to-tl from-blue-600 via-violet-600 to-pink-600 hover:from-blue-700 hover:via-violet-700 hover:to-pink-700'>
        <ArrowLeft size={22} strokeWidth={3} />
      </button>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
            Professional Certifications & Achievements
          </h1>
        </div>

        <div className="space-y-8">
          {Object.entries(certificationsData)
            .filter(([, items]) => items.length > 0)
            .map(([section, items]) => (
              <section key={section} className="bg-white rounded-xl shadow">
                <div className="bg-linear-to-r rounded-t-xl from-blue-600 to-purple-700 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center justify-between">
                    {getSectionDisplayName(section)}
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full min-w-8 text-center">
                      {items.length}
                    </span>
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  {items.map((item) => renderCertificateItem(section, item))}
                </div>
              </section>
            ))}
          <div className="flex justify-end ">
            <div className="bg-linear-to-r from-blue-600 via-violet-600 to-pink-600 hover:from-blue-700 hover:via-violet-700 hover:to-pink-700 font-semibold w-fit m-2 mr-4 rounded-md " >
              <button onClick={openReportModal} className="m-2 mx-4 text-white cursor-pointer">Download Reports </button>
            </div>
          </div>
        </div>

        {Object.values(certificationsData).every((items) => items.length === 0) && (
          <div className="text-center py-12">
            <div className="inline-block bg-white rounded-lg shadow p-8">
              <div className="text-gray-400 mb-3">📁</div>
              <h3 className="text-lg font-medium text-gray-900">No records found</h3>
              <p className="text-gray-500 mt-1">Add new entries to get started.</p>
            </div>
          </div>
        )}

        {isModalOpen && itemToEdit && (
          <EditModal
            item={itemToEdit}
            sectionKey={sectionKey}
            onClose={closeModal}
            onSave={handleSave}
            onInputChange={handleInputChange}
          />
        )}
      </div>

      {isReportModalOpen && (
        <ReportDownloadModal
          isOpen={isReportModalOpen}
          onClose={closeReportModal}
          certificationsData={certificationsData}
          fields={fields}
        />
      )}
    </div>
  );
};

export default ViewCertificaion;