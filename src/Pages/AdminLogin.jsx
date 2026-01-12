import React, { useState } from "react";
import { Lock, LogIn, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { adminlogin } from "../core/admin";

export default function AdminLogin() {
  const [passCode, setPassCode] = useState("1234567890");  // ✅ Correct destructuring
  const navigate = useNavigate();
  const [isEmpty, setEmpty] = useState(false);
  const [isFalse, setFalse] = useState(false);

  const handleChange = (e) => {
    setPassCode(e.target.value); // ✅ Update state

    // Reset warnings on input change
    if (isEmpty) setEmpty(false);
    if (isFalse) setFalse(false);
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!passCode.trim()) {
    setEmpty(true);
    return;
  }

  try {
    const data = await adminlogin({ passCode: passCode.trim() });
    if (data.error) {
      setFalse(true);
      return;
    }
    if (data.token) {
      localStorage.setItem("jwt", JSON.stringify(data));
      navigate(`/adminPage/${data.admin._id}`);
    }

  } catch (err) {
    console.error("Login failed:", err);
    setFalse(true);
  }
};

  return (
    <div className="flex justify-center items-center p-4 ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Top Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-purple-100 rounded-xl shadow-sm">
            <Lock className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900">ADMIN</h2>
        <p className="text-gray-600 text-sm mt-1">Faculty Information System</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5 text-left">
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              PassCode
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <KeyRound className="w-5 h-5" />
              </span>
              <input
                type="password"
                id="password"
                value={passCode}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {isFalse && (
              <div className="text-red-500 mt-1 text-sm">
                Please enter a valid Passcode
              </div>
            )}
            {isEmpty && (
              <div className="text-red-500 mt-1 text-sm">
                Please enter the passcode
              </div>
            )}
          </div>
          <p onClick={() => navigate('/adminfp')} className="cursor-pointer hover:underline text-violet-800 font-normal ">Reset Password?</p>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition"
          >
            Login
            <LogIn className="w-5 h-5" />
          </button>
        </form>

        <p className="mt-8 text-xs text-gray-500">
          Secure IQAC Access
        </p>
      </div>
    </div>
  );
}
