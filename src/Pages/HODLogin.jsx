import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, LogIn, KeyRound } from "lucide-react";
import { authenticate } from "../core/auth";
import { hodlogin } from "../core/hod";
import { departments } from "../assets/Data";

export default function HODLogin() {
  const navigate = useNavigate();

  const [college, setCollege] = useState("");
  const [formData, setFormData] = useState({
    department: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // Departments grouped by college
  const depts = {
    ucev: departments, // assuming `departments` is array of { name, code }
    pharma: ["Pharmaceutical Sciences"],
  };

  const handleCollegeChange = (e) => {
    const value = e.target.value;
    setCollege(value);
    setFormData({ department: "", password: "" }); // reset department on college change
    setErrors({});
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear field error on input
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    if (!college) {
      return setErrors({ college: "Please select a college" });
    }
    if (!formData.department) {
      return setErrors({ department: "Please select a department" });
    }
    if (!formData.password.trim()) {
      return setErrors({ password: "PassKey is required" });
    }

    try {
      const response = await hodlogin({
        department: formData.department,
        password: formData.password,
      });

      const data = response.data || response;

      // 🔒 Safety check: ensure user and id exist
      if (!data?.user?.id) {
        throw new Error("Invalid response from server");
      }

      authenticate(data, () => {
        setFormData({ department: "", password: "" });
      });

      navigate(`/hodDashboard/${data.user.id}`);
    } catch (error) {
      console.error("HOD Login error:", error);

      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "enter a valid password";

      // Show under department (or password — your UX choice)
      setErrors({ password: errorMsg });
    }
  };

  return (
    <div className="flex justify-center items-center p-4 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Top Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-purple-50 rounded-xl shadow-sm">
            <Lock className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900">HOD Login</h2>
        <p className="text-gray-600 text-sm mt-1">Faculty Information System</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5 text-left">
          {/* College */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              College *
            </label>
            <select
              id="college"
              value={college}
              onChange={handleCollegeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select College</option>
              <option value="ucev">University College of Engineering</option>
              <option value="pharma">College of Pharmaceutical Sciences</option>
            </select>
            {errors.college && (
              <p className="mt-1 text-md text-red-600">{errors.college}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Department *
            </label>
            <select
              id="department"
              value={formData.department}
              onChange={handleChange}
              disabled={!college}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white disabled:bg-gray-100"
            >
              <option value="">Select Department</option>
              {college &&
                depts[college]?.map((dept, idx) => (
                  <option key={idx} value={dept}>
                    {dept}
                  </option>
                ))}
            </select>
            {errors.department && (
              <p className="mt-1 text-md text-red-600">{errors.department}</p>
            )}
          </div>

          {/* PassKey */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              PassKey *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <KeyRound className="w-5 h-5" />
              </span>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-medium py-2.5 rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <LogIn className="w-5 h-5" />
            Login
          </button>

          <p
            onClick={() => navigate("/resetHODpassword")}
            className="text-sm text-violet-700 hover:underline cursor-pointer text-end"
          >
            Reset/Forgot Password?
          </p>
        </form>
      </div>
    </div>
  );
}