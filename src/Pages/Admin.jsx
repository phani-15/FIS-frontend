import React, { useState } from "react";
import { User, Eye, Check, X, ChevronDown, ChevronUp } from 'lucide-react'
import { useNavigate } from "react-router-dom";
// --- Data Structure Mocks (Kept the same for functionality) ---
const mockRequests = [
  {
    id: 'req_001',
    user: { name: 'P. Srinivas', email: 'srinivas.jntugv@univ.edu' },
    isPending: true,
    originalProfile: {
      personalData: { name: 'P.Srinivas', designation: 'Professor', department: 'cse' },
      loginData: { email: 'srinivas.jntugv@univ.edu', phone: '1234567890' },
    },
    updatedFields: {
      personalData: { designation: 'Senior Professor', department: 'Computer Science and Engineering' },
      loginData: { phone: '0987654321' },
    },
  },
  {
    id: 'req_002',
    user: { name: 'Dr. Albert', email: 'albert.dr@univ.edu' },
    isPending: true,
    personalData: { name: 'Dr. Albert', designation: 'Lecturer', department: 'eee' },
    originalProfile: {
      education: {
        tenth: { board: 'State Board', year: '2010', percentage: '85%' },
        pg: { title: 'Post Graduation', course: 'M.Tech', year: '2020' }
      },
      experience: [
        { institute: 'Old College', designation: 'assistant', from: 2020, to: 2023 }
      ],
    },
    updatedFields: {
      education: {
        tenth: { board: 'State Board', year: '2011', percentage: '85%' },
        pg: { title: 'Post Graduation', course: 'M.Tech', year: '2022' }
      },
      experience: [
        { institute: 'New College', designation: 'lecturer', from: 2024, to: 'Present' }
      ],
    },
  },
];

// --- Utility Function: Deep Diffing for Display ---
const getDiff = (original, updates) => {
  const diff = {};
  for (const key in updates) {
    if (typeof updates[key] === 'object' && updates[key] !== null && !Array.isArray(updates[key])) {
      const subDiff = getDiff(original[key] || {}, updates[key]);
      if (Object.keys(subDiff).length > 0) {
        diff[key] = subDiff;
      }
    } else {
      diff[key] = {
        original: original[key],
        new: updates[key],
      };
    }
  }
  return diff;
};

// --- Utility Function: Get nested field differences ---
const getNestedDiff = (originalObj, updatedObj) => {
  const changes = [];

  if (!originalObj && updatedObj) {
    // Completely new field
    return { isNew: true, data: updatedObj };
  }

  if (originalObj && updatedObj) {
    // Check for changes in nested properties
    const allKeys = new Set([...Object.keys(originalObj), ...Object.keys(updatedObj)]);

    allKeys.forEach(key => {
      if (JSON.stringify(originalObj[key]) !== JSON.stringify(updatedObj[key])) {
        changes.push({
          field: key,
          original: originalObj[key],
          new: updatedObj[key]
        });
      }
    });
  }

  return { isNew: false, changes, originalData: originalObj, newData: updatedObj };
};

// --- ProfileUpdateRequests Component ---
const ProfileUpdateRequests = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [showModal, setShowModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [isPendingExpanded, setIsPendingExpanded] = useState(true);
  const [expandedPreviousData, setExpandedPreviousData] = useState({});

  const handleAccept = (id) => {
    console.log(`ACCEPTING request ${id}. Sending update to DB...`);
    setRequests(requests.filter(req => req.id !== id));
    setShowModal(false);
  };

  const handleReject = (id) => {
    console.log(`REJECTING request ${id}. Removing request...`);
    setRequests(requests.filter(req => req.id !== id));
    setShowModal(false);
  };

  const handleShowUpdates = (request) => {
    // Create a merged diff that includes both original and updated data
    const diff = {};

    // Get all sections from both original and updated
    const allSections = new Set([
      ...Object.keys(request.originalProfile || {}),
      ...Object.keys(request.updatedFields || {})
    ]);

    allSections.forEach(section => {
      const originalSection = request.originalProfile[section] || {};
      const updatedSection = request.updatedFields[section] || {};

      // Get all fields in this section
      const allFields = new Set([
        ...Object.keys(originalSection),
        ...Object.keys(updatedSection)
      ]);

      diff[section] = {};

      allFields.forEach(field => {
        const originalValue = originalSection[field];
        const updatedValue = updatedSection[field];

        // Only include fields that have updates
        if (updatedValue !== undefined) {
          if (typeof updatedValue === 'object' && !Array.isArray(updatedValue)) {
            // For objects, store both original and updated
            diff[section][field] = {
              type: 'object',
              original: originalValue,
              updated: updatedValue
            };
          } else if (Array.isArray(updatedValue)) {
            // For arrays, store both original and updated
            diff[section][field] = {
              type: 'array',
              original: originalValue,
              updated: updatedValue
            };
          } else {
            // For simple values
            diff[section][field] = {
              original: originalValue,
              new: updatedValue
            };
          }
        }
      });
    });

    setCurrentRequest({ ...request, diff });
    setShowModal(true);
    setExpandedPreviousData({});
  };

  const togglePreviousData = (sectionKey, fieldKey) => {
    const key = `${sectionKey}_${fieldKey}`;
    setExpandedPreviousData(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="my-6">
      {/* Collapsible Pending Requests Header */}
      <div
        className="flex items-center justify-between cursor-pointer mb-4 p-3 bg-white rounded-lg hover:bg-purple-150 transition-colors"
        onClick={() => setIsPendingExpanded(!isPendingExpanded)}
      >
        <h2 className="text-2xl font-bold font-serif text-purple-800">
          Pending Update Requests ({requests.length})
        </h2>
        {isPendingExpanded ? (
          <ChevronUp size={28} className="text-purple-800" />
        ) : (
          <ChevronDown size={28} className="text-purple-800" />
        )}
      </div>

      {/* Collapsible Content */}
      {isPendingExpanded && (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-xl shadow-lg border-l-4 border-violet-500 gap-3"
            >
              {/* User Info */}
              <div className="flex items-center space-x-4">
                <User size={24} className="text-gray-500" />
                <div>
                  <p className="font-semibold text-gray-800">{request.user.name}</p>
                  <p className="text-sm text-gray-500">{request.user.email}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                  onClick={() => handleShowUpdates(request)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-gray-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition shadow-sm"
                >
                  <Eye size={14} />
                  Show Updates
                </button>

                <button
                  onClick={() => handleAccept(request.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition shadow-sm"
                >
                  <Check size={14} />
                  Accept
                </button>

                <button
                  onClick={() => handleReject(request.id)}
                  className="inline-flex relative right-0 items-center gap-1.5 px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400 transition shadow-sm"
                >
                  <X size={14} />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Updates Modal */}
      {showModal && currentRequest && (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-white backdrop-blur-xl rounded-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl border border-white/20">

              {/* Modal Header */}
              <div className="sticky top-0 bg-purple-200/90 backdrop-blur-sm p-4 border-b border-purple-300/50 flex justify-between items-center z-10">
                <h3 className="text-xl font-bold text-purple-800">
                  Updates for {currentRequest.user.name}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-full p-1 transition-all duration-200"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(90vh-180px)]">
                <p className="text-md capitalize font-medium text-gray-700 mb-4">
                  The following fields are requested for change.
                </p>

                {/* Diff Display */}
                {Object.keys(currentRequest.diff).map(sectionKey => (
                  <div key={sectionKey} className="mb-6 p-4 border border-gray-200/50 rounded-xl bg-slate-50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-200">
                    <h4 className="font-bold text-lg text-indigo-700 mb-3 capitalize">
                      {sectionKey.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    {Object.keys(currentRequest.diff[sectionKey]).map(fieldKey => {
                      const diffItem = currentRequest.diff[sectionKey][fieldKey];
                      const toggleKey = `${sectionKey}_${fieldKey}`;
                      const isExpanded = expandedPreviousData[toggleKey];

                      if (diffItem.type === 'object') {
                        // Handle object type changes
                        const originalData = diffItem.original;
                        const updatedData = diffItem.updated;

                        // Find what changed
                        const changes = [];
                        if (updatedData) {
                          Object.keys(updatedData).forEach(key => {
                            const oldVal = originalData?.[key];
                            const newVal = updatedData[key];
                            if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
                              changes.push({ field: key, original: oldVal, new: newVal });
                            }
                          });
                        }

                        return (
                          <div key={fieldKey} className="border-t border-gray-200/50 pt-3 mt-3">
                            <span className="font-semibold text-base text-gray-800 block mb-3 capitalize">
                              {fieldKey}:
                            </span>
                            <div className="mt-3">
                              <button
                                onClick={() => togglePreviousData(sectionKey, fieldKey)}
                                className="flex items-center gap-2 w-full p-2 bg-amber-50 justify-between hover:bg-gray-100 rounded-lg transition-colors text-left"
                              >
                                <span className="font-semibold text-sm text-amber-800 ">
                                  View Complete Previous Data
                                </span>
                                {isExpanded ? (
                                  <ChevronUp size={16} className="text-amber-800" />
                                ) : (
                                  <ChevronDown size={16} className="text-amber-800" />
                                )}
                              </button>

                              {isExpanded && (
                                <div className="mt-2 p-3 bg-amber-50/50 rounded-lg border border-amber-200/50">
                                  <pre className="text-xs overflow-x-auto text-gray-700">
                                    {JSON.stringify(originalData, null, 2)}
                                  </pre>
                                </div>
                              )}
                            </div>

                            {!originalData ? (
                              // Completely new field
                              <>
                                <div className="mb-2">
                                  <span className="text-sm font-medium text-green-700 bg-green-50 px-2 py-1 rounded">New Data Added</span>
                                </div>
                                <pre className="bg-white/70 p-3 rounded-lg text-xs overflow-x-auto border border-gray-200/50 text-gray-700 shadow-inner">
                                  {JSON.stringify(updatedData, null, 2)}
                                </pre>
                              </>
                            ) : (
                              // Updated field - show changes
                              <div className="space-y-2">
                                {changes.length > 0 ? (
                                  <>
                                    {changes.map((change, idx) => (
                                      <div key={idx} className="flex flex-col sm:flex-row justify-between border-b border-gray-200/50 py-2 text-sm last:border-b-0">
                                        <span className="font-medium text-gray-600 capitalize sm:w-1/3 mb-1 sm:mb-0">
                                          {change.field}:
                                        </span>
                                        <div className='text-left sm:text-right sm:w-2/3'>
                                          <span className="line-through text-gray-500 sm:mr-2 block sm:inline-block bg-red-50/50 px-2 py-0.5 rounded mb-1 sm:mb-0">
                                            {typeof change.original === 'object'
                                              ? JSON.stringify(change.original)
                                              : (change.original || 'N/A')}
                                          </span>
                                          <span className="font-semibold text-gray-900 block sm:inline-block bg-green-50/50 px-2 py-0.5 rounded">
                                            {typeof change.new === 'object'
                                              ? JSON.stringify(change.new)
                                              : (change.new || 'N/A')}
                                          </span>
                                        </div>
                                      </div>
                                    ))}

                                    {/* Previous Complete Data Section - Collapsible */}

                                  </>
                                ) : (
                                  <div className="text-sm text-gray-500">No changes detected</div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      } else if (diffItem.type === 'array') {
                        // Handle array type changes
                        return (
                          <div key={fieldKey} className="border-t border-gray-200/50 pt-3 mt-3">
                            <span className="font-semibold text-base text-gray-800 block mb-2 capitalize">
                              {fieldKey}:
                            </span>
                            <div className="mb-2">
                              <span className="text-sm font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded">Updated Array Data</span>
                            </div>
                            <pre className="bg-white/70 p-3 rounded-lg text-xs overflow-x-auto border border-gray-200/50 text-gray-700 shadow-inner mb-3">
                              {JSON.stringify(diffItem.updated, null, 2)}
                            </pre>

                            {diffItem.original && (
                              <div className="mt-2">
                                <button
                                  onClick={() => togglePreviousData(sectionKey, fieldKey)}
                                  className="flex items-center gap-2 w-full p-2 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors text-left"
                                >
                                  <span className="font-semibold text-sm text-amber-800">
                                    View Previous Array Data
                                  </span>
                                  {isExpanded ? (
                                    <ChevronUp size={16} className="text-amber-800" />
                                  ) : (
                                    <ChevronDown size={16} className="text-amber-800" />
                                  )}
                                </button>

                                {isExpanded && (
                                  <div className="mt-2 p-3 bg-amber-50/50 rounded-lg border border-amber-200/50">
                                    <pre className="text-xs overflow-x-auto text-gray-700">
                                      {JSON.stringify(diffItem.original, null, 2)}
                                    </pre>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      } else if (diffItem.original !== undefined || diffItem.new !== undefined) {
                        // Simple field change (Before vs After)
                        return (
                          <div key={fieldKey} className="flex flex-col sm:flex-row justify-between border-b border-gray-200/50 py-3 text-sm last:border-b-0">
                            <span className="font-medium text-gray-600 capitalize sm:w-1/3 mb-1 sm:mb-0">
                              {fieldKey}:
                            </span>
                            <div className='text-left sm:text-right sm:w-2/3'>
                              <span className="line-through text-gray-500 sm:mr-2 block sm:inline-block bg-red-50/50 px-2 py-0.5 rounded mb-1 sm:mb-0">
                                {diffItem.original || 'N/A'}
                              </span>
                              <span className="font-semibold text-gray-900 block sm:inline-block bg-green-50/50 px-2 py-0.5 rounded">
                                {diffItem.new || 'N/A'}
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                ))}
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 bg-gray-100/80 backdrop-blur-sm border-t border-gray-200/50 flex justify-end gap-3 sticky bottom-0">
                <button
                  onClick={() => handleAccept(currentRequest.id)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                >
                  <Check size={16} />
                  Accept Changes
                </button>
                <button
                  onClick={() => handleReject(currentRequest.id)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-black bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  <X size={16} />
                  Reject Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Admin() {
  const [filters, setFilters] = useState({
    department: "All",
    role: "All",
    searchTerm: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const departments = [
    "All",
    "Computer Science and Engineering",
    "Electronics and Communication Engineering",
    "Electrical and Electronics Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Metallurgical Engineering",
    "Information Technology Engineering",
    "M.Tech",
    "MBA"
  ];

  const facultyList = [
    { name: "Dr. John Doe", department: "Computer Science and Engineering", role: "Professor" },
    { name: "Dr. Jane Smith", department: "Electrical and Electronics Engineering", role: "Associate Professor" },
    { name: "Dr. Mike Johnson", department: "Mechanical Engineering", role: "Assistant Professor" },
    { name: "Dr. Emily Davis", department: "MBA", role: "Lecturer" },
    { name: "Dr. William Brown", department: "Computer Science and Engineering", role: "Professor" },
    { name: "Dr. Olivia Wilson", department: "Civil Engineering", role: "Assistant Professor" },
    { name: "Dr. Henry Taylor", department: "Electronics and Communication Engineering", role: "Lecturer" },
    { name: "Dr. Sophia Martinez", department: "Information Technology Engineering", role: "Researcher" },
    { name: "Dr. Daniel Anderson", department: "Metallurgical Engineering", role: "Professor" },
    { name: "Dr. Grace Lee", department: "M.Tech", role: "Assistant Professor" },
    { name: "Dr. Benjamin Harris", department: "MBA", role: "Lecturer" },
    { name: "Dr. Alice Walker", department: "Civil Engineering", role: "Professor" },
    { name: "Dr. Mark Spencer", department: "Computer Science and Engineering", role: "Assistant Professor" },
    { name: "Dr. Laura King", department: "Electrical and Electronics Engineering", role: "Researcher" },
    { name: "Dr. Richard Clark", department: "Mechanical Engineering", role: "Professor" },
    { name: "Dr. Nancy Roberts", department: "Information Technology Engineering", role: "Associate Professor" },
    { name: "Dr. Kevin Lewis", department: "Metallurgical Engineering", role: "Assistant Professor" },
    { name: "Dr. Angela White", department: "Computer Science and Engineering", role: "Lecturer" },
    { name: "Dr. Patrick Hall", department: "MBA", role: "Researcher" },
    { name: "Dr. Brenda Allen", department: "Civil Engineering", role: "Assistant Professor" },
    { name: "Dr. Steven Young", department: "Mechanical Engineering", role: "Lecturer" },
    { name: "Dr. Kimberly Scott", department: "Electronics and Communication Engineering", role: "Professor" },
    { name: "Dr. Charles Adams", department: "Information Technology Engineering", role: "Professor" },
    { name: "Dr. Victoria Perez", department: "MBA", role: "Assistant Professor" },
    { name: "Dr. Jonathan Hall", department: "Computer Science and Engineering", role: "Researcher" },
    { name: "Dr. Samantha Allen", department: "Civil Engineering", role: "Lecturer" },
    { name: "Dr. Brian Mitchell", department: "Mechanical Engineering", role: "Associate Professor" },
    { name: "Dr. Lauren Turner", department: "Electronics and Communication Engineering", role: "Researcher" },
    { name: "Dr. Timothy Carter", department: "Metallurgical Engineering", role: "Lecturer" },
    { name: "Dr. Rachel Evans", department: "M.Tech", role: "Professor" }
  ];

  const filteredFaculty = facultyList.filter((f) => {
    const matchesDept = filters.department === "All" || f.department === filters.department;
    const matchesRole = filters.role === "All" || f.role === filters.role;
    const matchesSearch = f.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
    return matchesDept && matchesRole && matchesSearch;
  });

  const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
  const paginatedFaculty = filteredFaculty.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const highlightMatch = (name) => {
    if (!filters.searchTerm) return name;
    const regex = new RegExp(`(${filters.searchTerm})`, "gi");
    return name.split(regex).map((part, idx) =>
      regex.test(part) ? <span key={idx} className="bg-yellow-200 font-semibold">{part}</span> : part
    );
  };

  const navigate = useNavigate()
  const handleViewClick = () => {
    navigate('/profile')
  };

  // const handleEditClick = () => {
  //   navigate('/ea')
  // };

  return (
    <div className="p-1 lg:p-8">
      <div className="max-w-7xl mx-2 lg:mx-auto"><h1 className="lg:text-4xl text-2xl font-semibold font-serif mb-6 text-center text-purple-800 tracking-wide drop-shadow">
        ADMIN PANEL
      </h1>
        {ProfileUpdateRequests()}

        {/* Filters */}
        <div className=" rounded-xl shadow-md p-6 mb-2">
          <div className="flex justify-between lg:flex-row flex-col gap-5">
            <div className="max-w-[350px]">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 shadow-sm focus:ring-0 focus:border-gray-400  outline-none transition"
                value={filters.department}
                onChange={(e) => { setFilters({ ...filters, department: e.target.value }); setCurrentPage(1); }}
              >
                {departments.map((dept, idx) => (
                  <option key={idx} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="max-w-[350px] lg:min-w-[350px]">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 bg-gray-50 shadow-sm focus:ring-0 focus:border-gray-400 outline-none transition"
                  value={filters.searchTerm}
                  onChange={(e) => { setFilters({ ...filters, searchTerm: e.target.value }); setCurrentPage(1); }}
                />
                {filters.searchTerm && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    onClick={() => setFilters({ ...filters, searchTerm: '' })}
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Rows per page */}
        <div className=" p-4 flex flex-wrap justify-between items-center gap-4">
          <p className="text-sm font-medium text-gray-700">
            Total Faculty: <span className="text-purple-600 font-bold">{filteredFaculty.length}</span>
          </p>
          <div className="flex items-center  gap-2">
            <label className="text-sm font-medium text-gray-700">Rows per page:</label>
            <select
              className="border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm outline-none transition text-sm"
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            >
              {[10, 25, 50, 100].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Faculty Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-purple-400 to-purple-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">S.No</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedFaculty.length > 0 ? (
                  paginatedFaculty.map((f, idx) => (
                    <tr key={idx} className="hover:bg-purple-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                        {(currentPage - 1) * itemsPerPage + idx + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                        {highlightMatch(f.name)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {f.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                          {f.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={handleViewClick}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gray-500 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition shadow-sm"
                          >
                            <User size={14} />
                            View
                          </button>
                          {/* <button
                            onClick={handleEditClick}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 transition"
                          >
                            <Edit2 size={14} />
                            Edit
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-lg font-semibold text-gray-500">No faculty found</p>
                        <p className="text-sm text-gray-400">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="bg-white rounded-xl shadow-md p-5 mt-6 border border-purple-100">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600 font-medium">
                Showing <span className="text-purple-600 font-bold">{(currentPage - 1) * itemsPerPage + 1}</span>–
                <span className="text-purple-600 font-bold">{Math.min(currentPage * itemsPerPage, filteredFaculty.length)}</span> of{' '}
                <span className="text-purple-600 font-bold">{filteredFaculty.length}</span> results
              </p>
              <div className="flex items-center gap-3">
                <button
                  className="px-5 py-2 text-sm font-semibold text-purple-700 bg-white border-2 border-purple-300 rounded-lg hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none transition"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="px-5 py-2 text-sm font-bold text-white bg-linear-to-r from-purple-600 to-indigo-600 rounded-lg shadow-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-5 py-2 text-sm font-semibold text-purple-700 bg-white border-2 border-purple-300 rounded-lg hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none transition"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}