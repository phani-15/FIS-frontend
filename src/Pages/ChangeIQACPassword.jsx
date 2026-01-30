import React, { useState } from "react";
import { RotateCcwKey } from "lucide-react";
import InputField from "../components/inputField";
import { useNavigate } from "react-router-dom";
import { passwordchange } from '../core/forgotPassword';
export default function ChangeIQACPassword() {
  const [data, setData] = useState({
    role: "",
    pass: "",
    newPass: "",
  });
  const [message, setMessage] = React.useState({});
  const [cPass, setCPass] = useState("");
  const [errors, setErrors] = useState({});
  const [roleError, setRoleError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!data.role) newErrors.role = "Please select a role";
    if (data.newPass.length < 8)
      newErrors.newPass = "Password must be at least 8 characters";
    if (data.newPass !== cPass)
      newErrors.Cpass = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
                        const response = await passwordchange(data.role, data.pass, data.newPass,"iqac");
                        if (response?.error) {
                            setMessage((prev) => ({ ...prev, error: response.error }));
                            return;
                        }
                        setMessage((prev) => ({ ...prev, success: "Password reset successful" }));
                        alert("Password reset successful")
                        navigate("/ofc");
                    } catch (err) {
                        setMessage((prev) => ({ ...prev, error: "Failed to change password" }));
                    }
                   
  
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === "role") setRoleError(false);
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">

        {/* Top Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-purple-100 rounded-xl shadow-sm">
            <RotateCcwKey className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900">Update Password</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5 text-left">
          
          {/* Role */}
          <div>
            <label className="block mb-1 text-sm font-medium">Select your Role</label>

            <select
              id="role"
              value={data.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black"
            >
              <option value="">Select</option>
              <option value="Vice Principal">Vice Principal</option>
              <option value="Principal">Principal</option>
              <option value="IQAC Coordinator">IQAC Coordinator</option>
              <option value="IQAC Director">IQAC Director</option>
              <option value="R&D Director">R&D Director</option>
            </select>

            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}
          </div>

          {/* Current Passcode */}
          <InputField
            label="Current Passcode"
            type="password"
            id="pass"
            value={data.pass}
            error={errors.pass}
            placeholder="Enter your Passcode"
            onChange={handleChange}
          />

          {/* New Password */}
          <InputField
            label="New Password"
            type="password"
            id="newPass"
            value={data.newPass}
            placeholder="Choose a new password"
            onChange={handleChange}
            error={errors.newPass}
          />

          {/* Confirm Password */}
          <InputField
            label="Confirm Password"
            type="password"
            id="Cpass"
            value={cPass}
            placeholder="Re-Enter new password"
            onChange={(e) => setCPass(e.target.value)}
            error={errors.Cpass}
          />

          <p
            onClick={() => navigate("/forgotpass")}
            className="text-end mb-3 text-blue-800 hover:underline cursor-pointer"
          >
            Forgot Password
          </p>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
