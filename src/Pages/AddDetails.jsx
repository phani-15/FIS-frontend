import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { PDFDocument } from "pdf-lib";

export default function AddDetails() {
   const Structure = {
      journals: {
         name: "journals", title_of_the_paper: "", name_of_the_journal: "", page_number: "", year: "", ISSN_Number: "", Impact_Factor: "", national_or_International: "", document: null
      },
      conferences: {
         name: "conferences", title_of_the_paper: "", title_of_conference: "", year: "", organized_by: "", national_or_international: "", document: null
      },
      seminars: {
         name: "seminars", title_of_the_paper: "", title_of_seminar: "", year: "", organized_by: "", national_international: "", document: null
      },
      research: {
         name: "research", year: "", name_of_the_principal_investigator: "", duration_of_project: "", name_of_research_project: "", fund_recieved: "", name_of_funding_agency: "", year_of_sanction: "", Department_of_recipient: "", document: null,
      },
      certifications: {
         name: "certifications", name_of_certification_course: "", organized_by: "", duration: "", certificate: null
      },
      books: {
         name: "books", title_of_the_book: "",
         name_of_the_publisher: "", year: "", ISBN_DOI_number: "", national_or_international: "", document: null
      },
      book_chapters: {
         name: "book_chapters", title_of_the_book: "",
         name_of_the_publisher: "", year: "", ISBN_DOI_number: "", national_or_international: "", document: null
      },
      sponsored_projects: {
         name: "sponsored_projects", project_title: "", funding_details: "", amount: "", duration: "", academic_year: "",
         certificate: null,
      }
   }

   const numericFields = [
      "year",
      "page_number",
      "duration_of_project",
      "duration",
      "fund_recieved",
      "year_of_sanction",
      "amount",
   ];

   const [selectedSection, setSelectedSection] = useState("");
   const [formData, setFormData] = useState({});
   const [errors, setErrors] = useState({})

   const navigate = useNavigate()

   // ✅ Step 1: User chooses which section to fill
   const handleSectionSelect = (e) => {
      const section = e.target.value;
      setSelectedSection(section);
      setFormData(Structure[section] || {});
      setErrors({});
   };

   // ✅ Handle input changes
   const handleChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
   };

   const handleCertificateChange = (field, file) => {
      if (!file) return;

      // ✅ Allowed types for certificate
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

      if (!allowedTypes.includes(file.type)) {
         setErrors((prev) => ({
            ...prev,
            [field]: "Certificate must be JPG, JPEG, PNG, or PDF format",
         }));
         setFormData((prev) => ({ ...prev, [field]: null }));
         return;
      }

      // ✅ Valid certificate file
      const fileURL = URL.createObjectURL(file); // 👈 create a temporary preview URL
      setFormData((prev) => ({ ...prev, [field]: file, [`${field}_url`]: fileURL }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
   };

   const handleDocumentChange = async (field, file) => {
      if (!file) return;

      if (file.type !== "application/pdf") {
         setErrors((prev) => ({
            ...prev,
            [field]: "Document must be in PDF format only",
         }));
         setFormData((prev) => ({ ...prev, [field]: null }));
         return;
      }

      try {
         // ✅ Read file as ArrayBuffer
         const arrayBuffer = await file.arrayBuffer();

         // ✅ Load existing PDF
         const pdfDoc = await PDFDocument.load(arrayBuffer);

         // ✅ Create a new PDF with only the first page
         const newPdf = await PDFDocument.create();
         const [firstPage] = await newPdf.copyPages(pdfDoc, [0]);
         newPdf.addPage(firstPage);

         // ✅ Convert back to Blob
         const pdfBytes = await newPdf.save();
         const trimmedFile = new File([pdfBytes], file.name.replace(".pdf", "_page1.pdf"), {
            type: "application/pdf",
         });

         // ✅ Create preview URL for the single-page PDF
         const fileURL = URL.createObjectURL(trimmedFile);

         setFormData((prev) => ({
            ...prev,
            [field]: trimmedFile,
            [`${field}_url`]: fileURL,
         }));
         setErrors((prev) => ({ ...prev, [field]: "" }));
      } catch (err) {
         console.error("PDF processing failed:", err);
         setErrors((prev) => ({
            ...prev,
            [field]: "Failed to process PDF",
         }));
      }
   };

   // ✅ Validation logic
   const validate = useCallback(() => {
      const newErrors = {};
      const currentYear = new Date().getFullYear();

      Object.entries(formData).forEach(([key, value]) => {
         if (key === "name") return;

         // 🔴 1. Required check
         if (value === "" || value === null) {
            newErrors[key] = "This field is required";
            return;
         }
         // 📅 3. "year" fields must not exceed current year
         if (key.toLowerCase().includes("year")) {
            const yearValue = parseInt(value, 10);
            if (yearValue > currentYear) {
               newErrors[key] = `Year cannot be greater than ${currentYear}`;
            }
            if (yearValue < currentYear - 100) {
               newErrors[key] = `Year cannot be less than ${currentYear - 100}`;
            }
         }

      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   }, [formData]);


   // ✅ Final submit
   const handleSubmit = (e) => {
      e.preventDefault();
      if (!validate()) {
         return; // ❌ stop if validation fails
      }

      console.log(`✅ Submitted ${selectedSection} Data:`, formData);
      navigate('/profile');
   };

   return (
      <div className="flex justify-center items-center p-6">
         <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Add Details</h1>

            {/* STEP 1: Choose Section */}
            <div className="flex flex-col space-y-4">
               <label className="text-lg font-medium">Select detail type:</label>
               <select
                  onChange={handleSectionSelect}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  defaultValue=""
               >
                  <option value="" disabled>
                     -- Choose an option --
                  </option>
                  {Object.keys(Structure).map((section) => (
                     <option key={section} value={section}>
                        {section.replace(/_/g, " ")}
                     </option>
                  ))}
               </select>
            </div>

            {/* STEP 2: Show form for selected section */}
            {selectedSection && (
               <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <h2 className="text-xl font-semibold capitalize mb-4">
                     Enter {selectedSection.replace(/_/g, " ")} details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {Object.keys(formData).map((field) => {
                        if (field === "name" || field === "certificate_url" || field === "document_url") return null;

                        const isDocument = field === "document"
                        const isCertificate = field === "certificate";
                        const isSelect = field === "national_or_international";

                        return (
                           <div key={field} className="flex flex-col text-left">
                              <label className="mb-1 capitalize">
                                 {field.replace(/_/g, " ").replace(/\bor\b/gi, "/")}
                              </label>

                              {isCertificate ? (
                                 <div className="flex flex-col space-y-2">
                                    <input
                                       type="file"
                                       onChange={(e) => handleCertificateChange(field, e.target.files[0])}
                                       className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${errors[field] ? "border-red-500" : "border-gray-300"
                                          }`}
                                    />

                                    {/* ✅ View button (only visible after upload) */}
                                    {formData[`${field}_url`] && (
                                       <div className="flex justify-end">
                                          <button
                                             type="button"
                                             onClick={() => window.open(formData[`${field}_url`], "_blank")}
                                             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                                          >
                                             View Certificate
                                          </button>
                                       </div>
                                    )}

                                 </div>
                              ) : isDocument ? (
                                 <div className="flex flex-col space-y-2">
                                    <input
                                       type="file"
                                       onChange={(e) => handleDocumentChange(field, e.target.files[0])}
                                       className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${errors[field] ? "border-red-500" : "border-gray-300"
                                          }`}
                                    />

                                    {formData[`${field}_url`] && (
                                       <div className="flex justify-end">
                                          <button
                                             type="button"
                                             onClick={() => window.open(formData[`${field}_url`], "_blank")}
                                             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                                          >
                                             View Document
                                          </button>
                                       </div>
                                    )}

                                 </div>

                              ) : isSelect ? (
                                 <select
                                    value={formData[field]}
                                    onChange={(e) => handleChange(field, e.target.value)}
                                    className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${errors[field] ? "border-red-500" : "border-gray-300"
                                       }`}
                                 >
                                    <option value="">Select</option>
                                    <option value="national">National</option>
                                    <option value="international">International</option>
                                 </select>
                              ) : (
                                 <input
                                    type={numericFields.includes(field) ? "number" : "text"}
                                    pattern={numericFields.includes(field) ? "[0-9]*" : undefined}
                                    inputMode={numericFields.includes(field) ? "numeric" : undefined}
                                    value={formData[field]}
                                    onChange={(e) => handleChange(field, e.target.value)}
                                    className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${errors[field] ? "border-red-500" : "border-gray-300"
                                       }`}
                                    placeholder={`Enter ${field.replace(/_/g, " ")}`}
                                 />
                              )}
                              {errors[field] && (
                                 <span className="text-red-600 text-sm mt-1">{errors[field]}</span>
                              )}
                           </div>
                        );
                     })}
                  </div>

                  <div className="flex justify-center mt-6">
                     <button
                        type="submit"
                        className="py-2 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition"
                     >
                        Submit
                     </button>
                  </div>
               </form>
            )}
         </div>
      </div>
   );
}
