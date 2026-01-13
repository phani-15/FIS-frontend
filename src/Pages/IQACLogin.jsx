import React, { useState } from "react";
import { Lock, LogIn, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ofclogin } from "../core/ofc";
import { authenticate } from "../core/auth";

export default function IQACLogin() {
  const [passCode, setPassCode] = useState("1234567890");
  const [role, setRole] = useState(""); 
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.role;
      return newErrors;
    });
  };

  const handlePassCodeChange = (e) => {
    setPassCode(e.target.value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.passCode;
      delete newErrors.submit;
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!role) {
      return setErrors({ role: "Please select a role" });
    }
    if (!passCode.trim()) {
      return setErrors({ passCode: "PassCode is required" });
    }

    try {
      const response = await ofclogin({ passcode: passCode, role });
      const data = response.data || response;

      // 🔒 SAFETY CHECK: Ensure Iqac and id exist
      if (!data?.Iqac?.id) {
        throw new Error("Invalid server response: missing Iqac ID");
      }

      // ✅ Success
      authenticate(data, () => {
        setPassCode("");
        setRole("IQAC Coordinator"); // reset to default
      });

      navigate(`/ofcDashboard/${data.Iqac.id}?role=${role}`);
    } catch (error) {
      console.error("OFC Login error:", error);

      // 🎯 Unified error message (security best practice)
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Enter a valid password";

      // Show under passcode (most intuitive for user)
      setErrors({ passCode: errorMsg });
    }
  };

  return (
    <div className="flex justify-center items-center p-4 my-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-purple-50 rounded-xl shadow-sm">
            <Lock className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">Officials Login</h2>
        <p className="text-gray-600 text-sm mt-1">Faculty Information System</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 text-left">
          {/* Role Dropdown */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select your Role *
            </label>
            <select
              value={role}
              onChange={handleRoleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="">Select Role</option>
              <option value="Vice Principal">Vice Principal</option>
              <option value="Principal">Principal</option>
              <option value="IQAC Coordinator">IQAC Coordinator</option>
              <option value="IQAC Director">IQAC Director</option>
              <option value="R&D Director">R&D Director</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-500">{errors.role}</p>
            )}
          </div>

          {/* Passcode */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              PassCode *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <KeyRound className="w-5 h-5" />
              </span>
              <input
                type="password"
                value={passCode}
                onChange={handlePassCodeChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            {errors.passCode && (
              <p className="mt-1 text-sm text-red-500">{errors.passCode}</p>
            )}
          </div>

          <p
            onClick={() => navigate("/ofcChange")}
            className="text-sm text-violet-700 hover:underline cursor-pointer text-end"
          >
            Change Password?
          </p>

          <button
            type="submit"
            className="w-full mt-4 flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-medium py-2.5 rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700"
          >
            <LogIn className="w-5 h-5" />
            Login
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500">Secure Officials Access</p>
      </div>
    </div>
  );
}