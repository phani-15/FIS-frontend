import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddDetails() {
	const Structure = {
		journals: {
			title_of_the_paper: "", name_of_the_journal: "", page_number: "", year: "", ISSN_Number: "", Impact_Factor: "", national_or_International: "", doc: null
		},
		conferences: {
			title_of_the_paper: "", title_of_conference: "", year: "", organized_by: "", national_or_international: "", doc: null
		},
		seminars: {
			title_of_the_paper: "", title_of_seminar: "", year: "", organized_by: "", national_international: "", doc: null
		},
		research: {
			year: "", name_of_the_principal_investigator: "", duration_of_project: "", name_of_research_project: "", fund_recieved: "", name_of_funding_agency: "", year_of_sanction: "", Deparrtment_of_recipient: "", doc: null,
		},
		certifications: {
			name_of_certification_course: "", organized_by: "", duration: "", certificate: null
		},
		books: {
			title_of_the_book: "",
			name_of_the_publisher: "", year: "", ISBN_DOI_number: "", national_or_international: "", doc: null
		},
		book_chapters: {
			title_of_the_book: "",
			name_of_the_publisher: "", year: "", ISBN_DOI_number: "", national_or_international: "", doc: null
		},
		sponsored_projects: {
			 project_title: "", funding_details: "", amount: "", duration: "", academic_year: "",
			certificate: null,
		}
	}

	const [selectedSection, setSelectedSection] = useState("");
	const [formData, setFormData] = useState({});

	const navigate = useNavigate()

	// ✅ Step 1: User chooses which section to fill
	const handleSectionSelect = (e) => {
		const section = e.target.value;
		setSelectedSection(section);
		setFormData(Structure[section] || {});
	};

	// ✅ Handle input changes for that section
	const handleChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleFileChange = (field, file) => {
		setFormData((prev) => ({ ...prev, [field]: file }));
	};

	// ✅ Final submit
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(`Submitted ${selectedSection} Data:`, formData);
		navigate('/profile')
		
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
								const isFile = field === "doc" || field === "certificate";
								const isSelect = field === "national_or_international";

								return (
									<div key={field} className="flex flex-col text-left">
										<label className="mb-1 capitalize">
											{field.replace(/_/g, " ").replace(/\bor\b/gi, "/")}
										</label>

										{isFile ? (
											<input
												type="file"
												onChange={(e) =>
													handleFileChange(field, e.target.files[0])
												}
												className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
											/>
										) : isSelect ? (
											<select
												value={formData[field]}
												onChange={(e) => handleChange(field, e.target.value)}
												className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
											>
												<option value="">Select</option>
												<option value="national">National</option>
												<option value="international">International</option>
											</select>
										) : (
											<input
												type="text"
												value={formData[field]}
												onChange={(e) => handleChange(field, e.target.value)}
												className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
												placeholder={`Enter ${field.replace(/_/g, " ")}`}
											/>
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
