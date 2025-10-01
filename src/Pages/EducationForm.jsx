import React, { useState } from "react";

export default function EducationForm() {
  const [education, setEducation] = useState({
    tenth: { school: "", marks: "", year: "", certificate: null },
    inter: { college: "", marks: "", year: "", certificate: null },
    degree: { college: "", degreeName: "", specialization: "", year: "", certificate: null },
    pg: { course: "", specialization: "", year: "", certificate: null },
  });

  const handleChange = (level, field, value) => {
    setEducation((prev) => ({
      ...prev,
      [level]: {
        ...prev[level],
        [field]: value,
      },
    }));
  };

  const handleFileChange = (level, e) => {
    handleChange(level, "certificate", e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Education Data Submitted:", education);
    alert("Education details submitted successfully!");
  };

  return (
    <div className="m-5 flex flex-col justify-center items-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">Education Details</h1>

        <form onSubmit={handleSubmit} className="flex flex-col">

          {/* 10th / Secondary */}
          <h2 className="text-lg font-semibold mt-4">10th / Secondary</h2>
          <div className="flex flex-col text-left space-y-2 mt-4">
            <label>School Name:</label>
            <input
              type="text"
              placeholder="Enter school name"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={education.tenth.school}
              onChange={(e) => handleChange("tenth", "school", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label>Marks Obtained:</label>
            <input
              type="text"
              placeholder="Enter marks"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={education.tenth.marks}
              onChange={(e) => handleChange("tenth", "marks", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label>Year of Passing:</label>
            <input
              type="number"
              placeholder="Enter year"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={education.tenth.year}
              onChange={(e) => handleChange("tenth", "year", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label>Upload Certificate:</label>
            <label className="w-full border border-gray-300 rounded-lg py-2 px-3 cursor-pointer flex justify-between items-center hover:border-blue-500 transition">
              <span>{education.tenth.certificate ? education.tenth.certificate.name : "Choose file"}</span>
              <span className="text-gray-500 text-sm">Browse</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange("tenth", e)}
                required
              />
            </label>
            <small className="text-gray-500 text-sm">Upload scanned copy of 10th certificate</small>
          </div>

          {/* Inter / Diploma */}
          <h2 className="text-lg font-semibold mt-6">Intermediate / Diploma</h2>
          <div className="flex flex-col text-left space-y-2 mt-4">
            <label>College Name:</label>
            <input
              type="text"
              placeholder="Enter college name"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={education.inter.college}
              onChange={(e) => handleChange("inter", "college", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label>Marks Obtained:</label>
            <input
              type="text"
              placeholder="Enter marks"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={education.inter.marks}
              onChange={(e) => handleChange("inter", "marks", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label>Year of Passing:</label>
            <input
              type="number"
              placeholder="Enter year"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={education.inter.year}
              onChange={(e) => handleChange("inter", "year", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label>Upload Certificate:</label>
            <label className="w-full border border-gray-300 rounded-lg py-2 px-3 cursor-pointer flex justify-between items-center hover:border-blue-500 transition">
              <span>{education.inter.certificate ? education.inter.certificate.name : "Choose file"}</span>
              <span className="text-gray-500 text-sm">Browse</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange("inter", e)}
                required
              />
            </label>
            <small className="text-gray-500 text-sm">Upload scanned copy of Intermediate/Diploma certificate</small>
          </div>

          {/* Degree */}
          <h2 className="text-lg font-semibold mt-6">Degree</h2>
          <div className="flex flex-col text-left space-y-2 mt-4">
            <label>College Name:</label>
            <input
              type="text"
              placeholder="Enter college name"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={education.degree.college}
              onChange={(e) => handleChange("degree", "college", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label>Degree Name:</label>
            <input
              type="text"
              placeholder="Enter degree name"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={education.degree.degreeName}
              onChange={(e) => handleChange("degree", "degreeName", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label>Specialization:</label>
            <input
              type="text"
              placeholder="Enter specialization"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={education.degree.specialization}
              onChange={(e) => handleChange("degree", "specialization", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label>Year of Passing:</label>
            <input
              type="number"
              placeholder="Enter year"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={education.degree.year}
              onChange={(e) => handleChange("degree", "year", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label>Upload Certificate:</label>
            <label className="w-full border border-gray-300 rounded-lg py-2 px-3 cursor-pointer flex justify-between items-center hover:border-blue-500 transition">
              <span>{education.degree.certificate ? education.degree.certificate.name : "Choose file"}</span>
              <span className="text-gray-500 text-sm">Browse</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange("degree", e)}
                required
              />
            </label>
            <small className="text-gray-500 text-sm">Upload scanned copy of Degree certificate</small>
          </div>

          {/* PG */}
          <h2 className="text-lg font-semibold mt-6">Post Graduation (Optional)</h2>
          <div className="flex flex-col text-left space-y-2 mt-4">
            <label>Course Name:</label>
            <input
              type="text"
              placeholder="Enter course name"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={education.pg.course}
              onChange={(e) => handleChange("pg", "course", e.target.value)}
            />
          </div>

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label>Specialization:</label>
            <input
              type="text"
              placeholder="Enter specialization"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={education.pg.specialization}
              onChange={(e) => handleChange("pg", "specialization", e.target.value)}
            />
          </div>

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label>Year of Passing:</label>
            <input
              type="number"
              placeholder="Enter year"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={education.pg.year}
              onChange={(e) => handleChange("pg", "year", e.target.value)}
            />
          </div>

          <div className="flex flex-col text-left space-y-2 mt-4">
            <label>Upload Certificate:</label>
            <label className="w-full border border-gray-300 rounded-lg py-2 px-3 cursor-pointer flex justify-between items-center hover:border-blue-500 transition">
              <span>{education.pg.certificate ? education.pg.certificate.name : "Choose file"}</span>
              <span className="text-gray-500 text-sm">Browse</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange("pg", e)}
              />
            </label>
            <small className="text-gray-500 text-sm">Upload scanned copy of PG certificate</small>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}
