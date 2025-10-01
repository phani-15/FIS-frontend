import React, { useState } from "react";
import { User, Lock, LogIn, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function IQACLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    document.getElementById("empty" + id).innerHTML = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!formData.username) {
      document.getElementById("emptyusername").innerHTML =
        "<p class='text-red-600 text-sm'>Username is required</p>";
      return;
    }
    if (!formData.password) {
      document.getElementById("emptypassword").innerHTML =
        "<p class='text-red-600 text-sm'>Password is required</p>";
      return;
    }

    console.log("Username:", formData.username);
    console.log("Password:", formData.password);

    // Example credentials
    const validUsername = "faculty@college.com";
    const validPassword = "12345";

    if (
      formData.username === validUsername &&
      formData.password === validPassword
    ) {
      // Navigate to IQAC dashboard
      navigate("/iqac");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
<div className="flex justify-center items-center p-4 min-h-screen bg-grey-100">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
    {/* Top Icon */}
    <div className="flex justify-center mb-6">
      <div className="p-4 bg-purple-100 rounded-xl shadow-sm">
        <Lock className="w-8 h-8 text-purple-600" />
      </div>
    </div>
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900">IQAC Login</h2>
        <p className="text-gray-600 text-sm mt-1">Faculty Information System</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5 text-left">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                id="username"
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <div id="emptyusername"></div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <KeyRound className="w-5 h-5" />
              </span>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <div id="emptypassword"></div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition"
          >
            Login
            <LogIn className="w-5 h-5" />
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-xs text-gray-500">
          © Faculty Information System - Secure IQAC Access
        </p>
      </div>
    </div>
  );
}
