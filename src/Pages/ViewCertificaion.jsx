import React, { useState } from 'react';
import { Pencil, X, SquarePen } from "lucide-react";

// Helper function to format field labels
const formatFieldLabel = (label) => {
  // Exclude special keys from being editable fields
  if (['name', 'id', 'document', 'certificate'].includes(label)) return null;

  return label.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

// --- Edit Modal Component (Internal) ---
const EditModal = ({ item, sectionKey, onClose, onSave, onInputChange }) => {
  // Find a main title field for the modal header
  const titleField = item.title_of_the_paper || item.name_of_research_project || item.name_of_certification_course || item.project_title || "Item";

  // Get all relevant fields for editing
  const fieldsToEdit = Object.entries(item)
    .filter(([key]) => !['name', 'id'].includes(key)) // Exclude internal identifiers
    .map(([key, value]) => ({
      key,
      label: formatFieldLabel(key),
      value,
    }))
    .filter(field => field.label); // Only include fields with a valid label

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            {/* Modal Content Container */}
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl transform scale-100 transition-transform duration-300">
                
                {/* 2. Modal Header: Added Gradient and updated text colors */}
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-700 border-b p-5 flex justify-between items-center z-10">
                    <h3 className="text-xl font-bold text-white">Edit {formatFieldLabel(sectionKey)}: {titleField.substring(0, 40)}...</h3>
                    <button onClick={onClose} className="text-white hover:text-gray-300 transition cursor-pointer">
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Body: Form Fields */}
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fieldsToEdit.map(({ key, label, value }) => (
                        <div key={key} className="flex flex-col">
                            <label htmlFor={key} className="text-sm font-medium text-gray-700 mb-1">
                                {label}
                            </label>
                            {/* Check if the field is a file/document link */}
                            {key === 'document' || key === 'certificate' ? (
                                <p className="text-sm text-gray-500 bg-gray-100 p-2 rounded-lg truncate">
                                    {value || 'No file uploaded'} 
                                </p>
                            ) : (
                                <input
                                    id={key}
                                    type="text"
                                    value={value || ''}
                                    onChange={(e) => onInputChange(key, e.target.value)}
                                    className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                                />
                            )}
                            
                        </div>
                    ))}
                </div>

                {/* Modal Footer: Actions */}
                <div className="sticky bottom-0 bg-gray-50 p-5 border-t flex justify-end gap-3">
                    {/* 4. Updated Cancel button styling */}
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border cursor-pointer  border-gray-300 rounded-lg text-black transition hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="px-6 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
  );
};
// --- End Edit Modal Component ---

const ViewCertificaion = () => {
  const initialData = {
    journals: [
      { id: 1, name: "journals", title_of_the_paper: "Advanced Machine Learning Techniques", name_of_the_journal: "International Journal of Computer Science", page_number: "45-52", year: "2023", ISSN_Number: "1234-5678", Impact_Factor: "3.5", national_or_International: "International", document: "journal_doc.pdf" },
      { id: 2, name: "journals", title_of_the_paper: "Quantum Computing Applications", name_of_the_journal: "Journal of Advanced Computing", page_number: "23-30", year: "2023", ISSN_Number: "8765-4321", Impact_Factor: "4.2", national_or_International: "International", document: "quantum_paper.pdf" }
    ],
    conferences: [
      { id: 1, name: "conferences", title_of_the_paper: "AI in Healthcare Applications", title_of_conference: "International Conference on AI", year: "2023", organized_by: "IEEE", national_or_international: "International", document: "conference_cert.pdf" },
      { id: 2, name: "conferences", title_of_the_paper: "Blockchain for Supply Chain", title_of_conference: "Global Tech Summit", year: "2023", organized_by: "ACM", national_or_international: "International", document: "blockchain_conf.pdf" }
    ],
    seminars: [
      { id: 1, name: "seminars", title_of_the_paper: "Blockchain Technology Overview", title_of_seminar: "Tech Innovation Summit 2023", year: "2023", organized_by: "Tech Association", national_international: "National", certificate: "certificate.pdf" }
    ],
    research: [
      { id: 1, name: "research", year: "2022-2023", name_of_the_principal_investigator: "Dr. Sarah Johnson", duration_of_project: "12 months", name_of_research_project: "Renewable Energy Optimization", fund_received: "$50,000", name_of_funding_agency: "National Science Foundation", year_of_sanction: "2022", Department_of_recipient: "Engineering", document: "research_cert.pdf" }
    ],
    certifications: [
      { id: 1, name: "certifications", name_of_certification_course: "AWS Solutions Architect", organized_by: "Amazon Web Services", duration: "6 months", certificate: "aws_cert.pdf" },
      { id: 2, name: "certifications", name_of_certification_course: "Google Cloud Professional", organized_by: "Google Cloud", duration: "3 months", certificate: "gcp_cert.pdf" },
      { id: 3, name: "certifications", name_of_certification_course: "React Native Development", organized_by: "Meta", duration: "2 months", certificate: "react_native_cert.pdf" }
    ],
    books: [
      { id: 1, name: "books", title_of_the_book: "Modern Web Development", name_of_the_publisher: "Tech Publications", year: "2023", ISBN_DOI_number: "978-3-16-148410-0", national_or_international: "International", document: "book_cover.pdf" }
    ],
    book_chapters: [
      { id: 1, name: "book_chapters", title_of_the_book: "AI Ethics and Society", name_of_the_publisher: "Academic Press", year: "2023", ISBN_DOI_number: "978-0-12-345678-9", national_or_international: "International", document: "nothing.pdf" }
    ],
    sponsored_projects: [
      { id: 1, name: "sponsored_projects", project_title: "Smart City Infrastructure", funding_details: "Government Grant", amount: "$100,000", duration: "18 months", academic_year: "2022-2023", certificate: "sponsored_project_cert.pdf" }
    ]
  };

  // Core data state
  const [certificationsData, setCertificationsData] = useState(initialData);

  // State for managing the modal
  const [expandedItems, setExpandedItems] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [sectionKey, setSectionKey] = useState(null);

  // --- Modal Handlers ---

  const handleEditClick = (section, item) => {
    // Find the specific item data to pass to the modal
    // We clone it so changes in the modal don't affect the state directly before saving
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
    setItemToEdit(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    if (!itemToEdit || !sectionKey) {
      console.error("Attempted to save without valid data.");
      closeModal();
      return;
    }

    // MOCK STATE UPDATE LOGIC: Update the main state with the edited item
    setCertificationsData(prevData => {
      const updatedSection = prevData[sectionKey].map(item =>
        item.id === itemToEdit.id ? itemToEdit : item
      );
      return {
        ...prevData,
        [sectionKey]: updatedSection,
      };
    });

    // Close modal after saving
    closeModal();
  };

  // --- Utility Functions (unchanged logic) ---

  // Function to get top 3 relevant keys for each certificate type
  const getTopRelevantFields = (type, data) => {
    const fieldMaps = {
      journals: ['title_of_the_paper', 'name_of_the_journal', 'year'],
      conferences: ['title_of_the_paper', 'title_of_conference', 'year'],
      seminars: ['title_of_the_paper', 'title_of_seminar', 'year'],
      research: ['name_of_research_project', 'name_of_the_principal_investigator', 'year'],
      certifications: ['name_of_certification_course', 'organized_by', 'duration'],
      books: ['title_of_the_book', 'name_of_the_publisher', 'year'],
      book_chapters: ['title_of_the_book', 'name_of_the_publisher', 'year'],
      sponsored_projects: ['project_title', 'funding_details', 'amount']
    };

    return fieldMaps[type]?.map(field => ({
      label: formatFieldLabel(field),
      value: data[field]
    })) || [];
  };

  // Function to get display name for each section
  const getSectionDisplayName = (section) => {
    const names = {
      journals: 'Research Journals',
      conferences: 'Conference Papers',
      seminars: 'Seminars',
      research: 'Research Projects',
      certifications: 'Professional Certifications',
      books: 'Published Books',
      book_chapters: 'Book Chapters',
      sponsored_projects: 'Sponsored Projects'
    };
    return names[section] || section;
  };

  // Toggle expanded view for individual items
  const toggleExpanded = (section, itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [`${section}-${itemId}`]: !prev[`${section}-${itemId}`]
    }));
  };

  // Function to get all fields for a certificate
  const getAllFields = (item) => {
    return Object.entries(item)
      .filter(([key]) => !['name', 'id', 'document', 'certificate'].includes(key))
      .map(([key, value]) => ({
        label: formatFieldLabel(key),
        value: value
      }));
  };

  // Render each certificate item
  const renderCertificateItem = (section, item) => {
    const isExpanded = expandedItems[`${section}-${item.id}`];
    const topFields = getTopRelevantFields(section, item);
    const allFields = getAllFields(item);
    const hasDocument = item.document || item.certificate;

    return (
      <div key={item.id} className=" rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        
        <div className="p-6 relative">
            <button
            className=' absolute top-2  group right-2 cursor-pointer'
              onClick={() => handleEditClick(section, item)}
            >
              <SquarePen  className='relative'/>
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                     bg-gray-700 text-white text-sm px-3 py-0.5 rounded opacity-0 
                     group-hover:opacity-100 transition">
                       Edit
                      </span>
            </button>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ">
            {/* Preview Fields */}

            <div className="flex-1 space-y-3">
              {topFields.map((field, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-start">
                  <span className="text-sm font-semibold text-gray-700 min-w-[180px] mb-1 sm:mb-0">
                    {field.label}:
                  </span>
                  <span className="text-sm text-gray-600 flex-1">
                    {field.value || 'Not specified'}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 lg:flex-col xl:flex-row relative ">
              {/* The corrected onClick handler that opens the modal */}

              <div className='flex gap-2 relative '>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-2"
                  onClick={() => toggleExpanded(section, item.id)}
                >
                  <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {hasDocument && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Document
                  </button>
                )}

              </div>
            </div>
          </div>

          {/* Expanded Details */}
          {isExpanded && (
            <div className="mt-6 pt-6 border-t border-gray-200 animate-fade-in">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Complete Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allFields.map((field, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {field.value || 'Not specified'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className=" lg:py-8 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-normal lg:font-semibold lg:text-4xl text-gray-800 mb-4 font-serif">
            Professional Certifications & Achievement
          </h1>
        </div>

        {/* Certification Sections */}
        <div className="space-y-9">
          {Object.entries(certificationsData).map(([section, items]) => (
            items.length > 0 && (
              <section key={section} className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Section Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {getSectionDisplayName(section)}
                    <span className="ml-auto bg-white bg-opacity-20 text-center rounded-full px-3 py-1 text-black text-xs font-semibold min-w-16">
                      {items.length} {items.length === 1 ? 'item' : 'items'}
                    </span>
                  </h2>
                </div>


                <div className="p-6">
                  <div className="space-y-4">
                    {items.map(item => renderCertificateItem(section, item))}
                  </div>
                </div>
              </section>
            )
          ))}
        </div>


        {Object.values(certificationsData).every(items => items.length === 0) && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certifications Found</h3>
              <p className="text-gray-600">There are no certifications to display at the moment.</p>
            </div>
          </div>
        )}
      </div>


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
  );
};

export default ViewCertificaion;