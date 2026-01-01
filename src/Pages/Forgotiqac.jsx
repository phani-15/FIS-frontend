import React from "react";
import { KeyRound } from "lucide-react";
import InputField from "../components/inputField";
import { useNavigate } from "react-router-dom";
import { forgotPassword,verifyOtp,resetPassword } from '../core/forgotPassword';

export default function Forgotiqac() {
  const [data, setData] = React.useState({
    role: "",
    OTP: "",
    password: "",
    confirmPassword: "",
  });
  
  const [clicked, setClicked] = React.useState(false);
  const [otpVerified, setOtpVerified] = React.useState(false);
  const [error, setError] = React.useState({});
  const [otpToken, setOtpToken] = React.useState(false);
  const [message, setMessage] = React.useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setMessage({});

    // Clear errors dynamically
    setError((prev) => ({ ...prev, [id]: "" }));
  };
const [isgenerating, setIsgenerating] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (data.password.length < 8) {
      newErrors.password = "Password must be atleast 8 characters";
    }

    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    alert("Password Updated Successfully");
    navigate("/ofc");
  };
  const handleGenerateOTP = async () => {
      setIsgenerating(true);
      const response = await forgotPassword(data.role,"iqac");
      console.log(response);
      if (response?.error) {
          setMessage({})
        setMessage((prev) => ({
          ...prev,
          error: response.error,
        }));
        return;
      }
  
      if (!response.otpToken) {
          setMessage({})
        setMessage(prev =>({
        ...prev,
        error : "Address not found"
      }))
        return;
      }
  
      setOtpToken(response.otpToken);
      setClicked(true);
          setMessage({})
      setMessage((prev) => ({
        ...prev,
        success: "OTP sent successfully",
      }));
    };
    const handleVerifyOTP = async () => {
      const response = await verifyOtp(otpToken, data.OTP);
  
      if (response.error) {
          setMessage({})
        setMessage((prev) => ({
          ...prev,
          error: response.error,
        }));
        return;
      }
          setMessage({})
  
      setMessage((prev) => ({
        ...prev,
        success: "OTP verified successfully",
      }));
      setOtpVerified(true);
    };
    const passwordreset = async () => {
      if (!otpVerified) {
          setMessage({})
        setMessage((prev) => ({
          ...prev,
          error: "OTP not verrified",
        }));
        return;
      }
  
      if (data.password.length < 8) {
          setMessage({})
        setMessage((prev) => ({
          ...prev,
          error: "Password must be atleast 8 characters",
        }));
        return;
      }
  
      if (data.password !== data.confirmPassword) {
          setMessage({})
        setMessage((prev) => ({
          ...prev,
          error: "Confirm Password must be same as new Password",
        }));
        return;
      }
  
      try {
        const response = await resetPassword(otpToken, data.password);
  
        if (response.error) {
          setMessage({})
          setMessage((prev) => ({
            ...prev,
            error: response.error,
          }));
          // navigate("/");
          return;
        }
  
        
        alert("Password reset successful");
        navigate('/ofc');
      } catch (err) {
          console.log(err)
          setMessage({})
        setMessage((prev) => ({
          ...prev,
          error:err.msg
        }));
      
      }
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

        <form onSubmit={(e) => { e.preventDefault(); passwordreset(); }} className="mt-8 space-y-5 text-left">
          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block mb-1 text-sm font-medium">
              Select your Role
            </label>

            <select
              id="role"
              value={data.role}
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

            {error.role && (
              <p className="text-red-500 text-sm">{error.role}</p>
            )}
          </div>

          {/* Generate OTP */}
          {!clicked && (
            <button
              onClick={handleGenerateOTP}
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
                onWheel={(e) => e.target.blur()}
                value={data.OTP}
                id="OTP"
                placeholder="Enter OTP"
                onChange={handleChange}
                error={error.OTP}
              />

              {/* Verify OTP */}
              {!otpVerified && (
                <button
                  onClick={handleVerifyOTP}

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
                    value={data.password}
                    id="password"
                    placeholder="Choose new password"
                    onChange={handleChange}
                    error={error.password}
                  />

                  <InputField
                    label="Confirm New Password"
                    type="password"
                    value={data.confirmPassword}
                    id="confirmPassword"
                    placeholder="Re-enter new password"
                    onChange={handleChange}
                    error={error.confirmpassword}
                  />

                  <button
                   type="submit"
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
