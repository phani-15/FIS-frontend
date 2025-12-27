import React, { useState, useEffect } from 'react';
import { X, SquarePen, Download } from 'lucide-react';
import { names, map, initialData } from '../assets/CertificationData';
import { fields } from '../assets/Data';
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

// --- Helper: Format label (safe, handles spaces & caps)
const formatFieldLabel = (label) => {
  if (!label || ['document', 'certificate', 'Document'].includes(label)) return null;
  return label
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

// --- Helper: Get top 3 preview fields per section ---
const getTopRelevantFields = (section, item) => {
  const keys = map[section] || [];
  return keys.map((key) => ({
    label: formatFieldLabel(key),
    value: item[key] || 'Not specified',
  }));
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

  // Get editable fields (exclude internal)
  const allKeys = fields[sectionKey] || Object.keys(item);

  // --- Helper: Get non-file fields for a section ---
const getNonFileFields = (section) => {
  const allFields = fields[section] || [];
  return allFields.filter(field => 
    !['document', 'certificate', 'Document'].includes(field)
  );
};

  const fieldsToEdit = allKeys
    .filter(key => !['id'].includes(key))
    .map(key => ({
      key,
      label: formatFieldLabel(key),
      value: item[key] ?? '',
    }))
    .filter(f => f.label); // skip null labels

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-blue-600 to-purple-700 p-5 flex justify-between items-center text-white z-10">
          <h3 className="text-xl font-bold">
            Edit {getSectionDisplayName(sectionKey)}: {titleField.substring(0, 30)}...
          </h3>
          <button onClick={onClose} className="hover:text-gray-200">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {fieldsToEdit.map(({ key, label, value }) => {
            // Show file fields as read-only
            const isFile = ['document', 'certificate', 'Document'].includes(key);
            // Conditional: hide 'Place' if Mode === 'Online'
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

        {/* Footer */}
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
  // Initialize selectedSections with all sections unchecked
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

  const toggleSection = (section) => {
    setSelectedSections(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        checked: !prev[section].checked,
        // Auto-select all fields when section is checked (optional)
        selectedFields: !prev[section].checked ? (fields[section] || []).filter(f => !['id'].includes(f)) : []
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

  // --- CSV Utilities ---
  const downloadCSV = () => {
    const rows = [];
    // Build header & data
    Object.entries(selectedSections).forEach(([section, config]) => {
      if (!config.checked || certificationsData[section].length === 0) return;

      const items = certificationsData[section];
      let selectedFields = config.selectedFields.filter(f => 
        !['document', 'certificate', 'Document'].includes(f)
      );

      if (selectedFields.length === 0) return;

      // Add section header row
      rows.push([`${getSectionDisplayName(section)} (${items.length} items)`]);

      // Add field names as header
      rows.push(['S.No', ...selectedFields]);

      // Add data rows
      items.forEach((item, idx) => {
        const row = [idx + 1];
        selectedFields.forEach(field => {
          let val = item[field] ?? '';
          // Clean value: escape commas/quotes, trim
          if (typeof val === 'string') {
            val = val.replace(/"/g, '""'); // escape quotes
            if (val.includes(',') || val.includes('\n') || val.includes('"')) {
              val = `"${val}"`;
            }
          }
          row.push(val);
        });
        rows.push(row);
      });

      rows.push([]); // blank line between sections
    });

    if (rows.length === 0) {
      alert('No data selected.');
      return;
    }

    // Convert to CSV string
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
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-purple-700 p-5 text-white">
          <h3 className="text-xl font-bold">Download Report</h3>
          <p className="text-blue-100 text-sm mt-1">
            Select sections and fields to include in your report.
          </p>
        </div>

        {/* Body */}
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
                      {(getNonFileFields(section)).filter(f => !['id'].includes(f)).map(field => (
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

        {/* Footer */}
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

  const [certificationsData, setCertificationsData] = useState(() => addIdsToData(initialData));
  const [expandedItems, setExpandedItems] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [sectionKey, setSectionKey] = useState(null);

  // Inside ViewCertificaion component:
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const openReportModal = () => {
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
  };

  // --- Handlers ---
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
    const keys = fields[section] || Object.keys(item);
    return keys
      .filter((key) => !['id'].includes(key))
      .map((key) => ({
        label: formatFieldLabel(key),
        value: item[key] ?? 'Not specified',
      }))
      .filter((f) => f.label);
  };

  const renderCertificateItem = (section, item) => {
    const isExpanded = expandedItems[`${section}-${item.id}`];
    const topFields = getTopRelevantFields(section, item);
    const allFields = getAllFields(item, section);
    const hasDoc = item.document || item.certificate || item.Document;

    return (
      <div
        key={item.id}
        className="rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="p-6 relative">
          {/* Edit Button */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-blue-600"
            onClick={() => handleEditClick(section, item)}
            title="Edit"
          >
            <SquarePen size={18} />
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            {/* Preview */}
            <div className="flex-1 space-y-2">
              {topFields.map((field, i) => (
                <div key={i} className="text-sm">
                  <span className="font-medium text-gray-700">{field.label}:</span>{' '}
                  <span className="text-gray-600">{field.value}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleExpanded(section, item.id)}
                className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                {isExpanded ? 'Hide Details' : 'View Details'}
              </button>
              {hasDoc && (
                <button className="px-3 py-1.5 mr-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200">
                  View Document
                </button>
              )}
            </div>
          </div>

          {/* Expanded Details */}
          {isExpanded && (
            <div className="mt-5 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3">All Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {allFields.map((field, i) => {
                  // Skip Place if Mode is Online
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

        {/* Edit Modal */}
        {isModalOpen && itemToEdit && (
          <EditModal
            item={itemToEdit}
            sectionKey={sectionKey}
            onClose={closeModal}
            onSave={handleSave}
            onInputChange={handleInputChange}
          />
        )}
      </div>{/* Report Download Modal */}
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