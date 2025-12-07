import React from "react";
import { KeyRound } from "lucide-react";
import InputField from "../components/inputField";
import { useNavigate } from "react-router-dom";

export default function Forgotiqac() {
  const [data, setData] = React.useState({
    department: "",
    OTP: "",
    npassword: "",
    cpassword: "",
  });

  const [clicked, setClicked] = React.useState(false);
  const [otpVerified, setOtpVerified] = React.useState(false);
  const [error, setError] = React.useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Clear errors dynamically
    setError((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (data.npassword.length < 8) {
      newErrors.npassword = "Password must be atleast 8 characters";
    }

    if (data.npassword !== data.cpassword) {
      newErrors.cpassword = "Passwords do not match";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    alert("Password Updated Successfully");
    navigate("/ofc");
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">

        <div className="flex justify-center mb-6">
          <div className="p-4 bg-purple-100 rounded-xl shadow-sm">
            <KeyRound className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900">Forgot password</h2>

        <form className="mt-8 space-y-5 text-left">
          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block mb-1 text-sm font-medium">
              Select your Role
            </label>

            <select
              id="department"
              value={data.department}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black"
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Vice Principal">Vice Principal</option>
              <option value="Principal">Principal</option>
              <option value="IQAC Coordinator">IQAC Coordinator</option>
              <option value="IQAC Director">IQAC Director</option>
              <option value="R&D Director">R&D Director</option>
            </select>

            {error.department && (
              <p className="text-red-500 text-sm">{error.department}</p>
            )}
          </div>

          {/* Generate OTP */}
          {!clicked && (
            <button
              onClick={(e) => {
                e.preventDefault();

                if (!data.department) {
                  setError({ department: "Please select a role" });
                  return;
                }

                setClicked(true);
              }}
              className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition"
            >
              Generate OTP
            </button>
          )}

          {/* OTP Input */}
          {clicked && (
            <div>
              <InputField
                label="OTP"
                type="number"
                value={data.OTP}
                id="OTP"
                placeholder="Enter OTP"
                onChange={handleChange}
                error={error.OTP}
              />

              {/* Verify OTP */}
              {!otpVerified && (
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    if (!data.OTP) {
                      setError((prev) => ({
                        ...prev,
                        OTP: "Please enter the OTP",
                      }));
                      return;
                    }

                    setOtpVerified(true);
                  }}
                  className="w-full mt-6 flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition"
                >
                  Verify OTP
                </button>
              )}

              {/* New Password Fields */}
              {otpVerified && (
                <div>
                  <InputField
                    label="New Password"
                    type="password"
                    value={data.npassword}
                    id="npassword"
                    placeholder="Choose new password"
                    onChange={handleChange}
                    error={error.npassword}
                  />

                  <InputField
                    label="Confirm New Password"
                    type="password"
                    value={data.cpassword}
                    id="cpassword"
                    placeholder="Re-enter new password"
                    onChange={handleChange}
                    error={error.cpassword}
                  />

                  <button
                    onClick={handleSubmit}
                    className="w-full mt-6 flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition"
                  >
                    Update Password
                  </button>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
