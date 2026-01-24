import React, { useState, useEffect } from "react";
import { User, Eye, Check, X, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getRequests, acceptRequest, rejectRequest, AdminDashboard, addfaculty } from "../core/admin";
import { isAuthenticated } from "../core/auth";
import { departments } from "../assets/Data"

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

// --- ProfileUpdateRequests Component ---
const ProfileUpdateRequests = () => {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [isPendingExpanded, setIsPendingExpanded] = useState(true);
  const [expandedPreviousData, setExpandedPreviousData] = useState({});

  const { admin } = isAuthenticated();

  const loadRequests = () => {
    if (admin && admin._id) {
      getRequests(admin._id).then(data => {
        console.log(data);
        if (data && !data.error) {
          const formatted = data.map(r => ({
            id: r._id,
            user: {
              name: r.personal?.personalData?.name || "Unknown",
              email: r.user?.email || "No Email"
            },
            isPending: r.isPending,
            originalProfile: r.originalProfile,
            updatedFields: r.updatedFields
          }));
          setRequests(formatted);
        } else {
          console.log("Error loading requests");
        }
      });
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleAccept = (id) => {
    acceptRequest(currentUser._id, token, id).then(data => {
      if (data && !data.error) {

        loadRequests(); // Reload
        setShowModal(false);
      } else {
        console.error("Failed to accept");
      }
    });
  };

  const handleReject = (id) => {
    rejectRequest(currentUser._id, token, id).then(data => {
      if (data && !data.error) {
        console.log("Request Rejected");
        loadRequests(); // Reload
        setShowModal(false);
      } else {
        console.error("Failed to reject");
      }
    });
  };

  const handleShowUpdates = (request) => {
    const diff = {};
    const allSections = new Set([
      ...Object.keys(request.originalProfile || {}),
      ...Object.keys(request.updatedFields || {})
    ]);

    allSections.forEach(section => {
      const originalSection = request.originalProfile[section] || {};
      const updatedSection = request.updatedFields[section] || {};
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
      {
        requests.length > 0 && (

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
        )
      }

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
        <div className="min-h-screen bg-linear-to-br from-purple-100 p-4">
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
  const { adminId } = useParams()
  const [filters, setFilters] = useState({
    department: "All",
    role: "All",
    searchTerm: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [facultyList, setfacultyList] = useState([
    {
      name: "Dr. John Doe",
      department: "Computer Science and Engineering",
      role: "Professor"
    }
  ])
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Form Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await addfaculty({ email: formData.email, password: formData.password })
        if (res.msg) {
          setFormData({ email: '', password: '', confirmPassword: '' });
          setErrors({});
          setIsAddModalOpen(false);
          toast.success("Faculty registering mail was sent !")
        }
      } catch (error) {
        toast.error(`${error}`)
      }
    }
  };

  useEffect(() => {
    async function getFaculty() {
      const data = await AdminDashboard(adminId)
      setfacultyList(data)
    }
    getFaculty();
  }, [adminId])
  // --- Filtering Logic ---
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

  return (
    <div className="p-1 lg:p-8">
      <div className="max-w-7xl mx-2 lg:mx-auto">
        <h1 className="lg:text-4xl text-2xl font-semibold font-serif mb-6 text-center text-purple-800 tracking-wide drop-shadow">
          ADMIN PANEL
        </h1>

        {ProfileUpdateRequests()}

        {/* Add Faculty Button */}
        <div className="flex justify-end my-2 px-2 py-1">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-2 py-1 lg:text-lg rounded-md cursor-pointer text-white font-semibold bg-linear-to-tl from-blue-600 via-violet-600 to-pink-600 hover:from-blue-700 hover:via-violet-700 hover:to-pink-700 flex items-center gap-1"
          >
            Add Faculty
          </button>
        </div>

        {/* Filters */}
        <div className="rounded-xl shadow-md p-6 mb-2">
          <div className="flex justify-between lg:flex-row flex-col gap-5">
            <div className="max-w-[350px]">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 shadow-sm focus:ring-0 focus:border-gray-400 outline-none transition"
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
        <div className="p-4 flex flex-wrap justify-between items-center gap-4">
          <p className="text-sm font-medium text-gray-700">
            Total Faculty: <span className="text-purple-600 font-bold">{filteredFaculty.length}</span>
          </p>
          <div className="flex items-center gap-2">
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

      {/* Add Faculty Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-white/20">
            {/* Modal Header */}
            <div className="sticky top-0 bg-purple-200/90 backdrop-blur-sm p-4 border-b border-purple-300/50 flex justify-between items-center">
              <h3 className="text-xl font-bold text-purple-800">Add New Faculty</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-full p-1 transition-all"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg px-4 py-2.5 bg-gray-50 shadow-sm focus:ring-0 focus:border-gray-400 outline-none transition`}
                  placeholder="faculty@univ.edu"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg px-4 py-2.5 bg-gray-50 shadow-sm focus:ring-0 focus:border-gray-400 outline-none transition`}
                  placeholder="At least 8 characters"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg px-4 py-2.5 bg-gray-50 shadow-sm focus:ring-0 focus:border-gray-400 outline-none transition`}
                  placeholder="Re-enter password"
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Add Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>

  );
}