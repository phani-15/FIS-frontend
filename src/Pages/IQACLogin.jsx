import React, { useState } from "react";
import { Lock, LogIn, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function IQACLogin() {
  const [passCode, setPassCode] = useState("");  // ✅ Correct destructuring
  const navigate = useNavigate();
  const [isEmpty, setEmpty] = useState(false);
  const [isFalse, setFalse] = useState(false);

  const handleChange = (e) => {
    setPassCode(e.target.value); // ✅ Update state

    // Reset warnings on input change
    if (isEmpty) setEmpty(false);
    if (isFalse) setFalse(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passCode.trim()) {
      setEmpty(true);
      return;
    }

    const validPassCode = "JntuIqac2025";

    if (passCode === validPassCode) {
      navigate("/ofcDashboard");
    } else {
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
        <h2 className="text-2xl font-bold text-gray-900">Officials Login</h2>
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
                placeholder="Enter your Passcode"
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
          <p onClick={()=>navigate('/ofcChange')} className="text-blue-700 text-end mr-1 hover:underline mb-2 cursor-pointer">Change Password</p>
          <button
            type="submit"
            className="w-full flex cursor-pointer items-center justify-center gap-2 bg-linear-to-r from-indigo-500 to-purple-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 transition"
          >
            Login
            <LogIn className="w-5 h-5" />
          </button>
        </form>

        <p className="mt-8 text-xs text-gray-500">
           Secure Officials Access
        </p>
      </div>
    </div>
  );
}
