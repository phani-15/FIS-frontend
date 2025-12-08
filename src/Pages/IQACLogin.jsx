import React, { useState } from "react";
import { Lock, LogIn, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function IQACLogin() {
  const [passCode, setPassCode] = useState("");
  const [data, setData] = useState({ role: "" });      

  const navigate = useNavigate();

  const [isEmpty, setEmpty] = useState(false);
  const [isFalse, setFalse] = useState(false);
  const [roleError, setRoleError] = useState(false);

  const handleChange = (e) => {
    setPassCode(e.target.value);
    setEmpty(false);
    setFalse(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.role) {
      setRoleError(true);
      return;
    }

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

        <div className="flex justify-center mb-6">
          <div className="p-4 bg-purple-100 rounded-xl shadow-sm">
            <Lock className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900">Officials Login</h2>
        <p className="text-gray-600 text-sm mt-1">Faculty Information System</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 text-left">

          {/* Role Dropdown */}
          <div>
            <label className="block mb-1 text-sm font-medium">Select your Role</label>

            <select
              id="role"
              value={data.role}
              onChange={(e) => {
                setData({ ...data, role: e.target.value });
                setRoleError(false);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black"
            >
              <option value="">Select</option>
              <option value="Vice Principal">Vice Principal</option>
              <option value="Principal">Principal</option>
              <option value="IQAC Coordinator">IQAC Coordinator</option>
              <option value="IQAC Director">IQAC Director</option>
              <option value="R&D Director">R&D Director</option>
            </select>

            {roleError && (
              <p className="text-red-500 text-sm mt-1">Please select a role</p>
            )}
          </div>

          {/* Passcode */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              PassCode
            </label>

            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <KeyRound className="w-5 h-5" />
              </span>

              <input
                type="password"
                value={passCode}
                onChange={handleChange}
                placeholder="Enter your Passcode"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500"
              />
            </div>

            {isFalse && <p className="text-red-500 mt-1 text-sm">Please enter a valid Passcode</p>}
            {isEmpty && <p className="text-red-500 mt-1 text-sm">Please enter the passcode</p>}
          </div>

          <p
            onClick={() => navigate("/ofcChange")}
            className="text-blue-700 text-end mr-1 hover:underline mb-2 cursor-pointer"
          >
            Change Password
          </p>

          <button
            type="submit"
            className="w-full mt-6 flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition"
          >
            Login
            <LogIn className="w-5 h-5" />
          </button>
        </form>

        <p className="mt-8 text-xs text-gray-500">Secure Officials Access</p>
      </div>
    </div>
  );
}
