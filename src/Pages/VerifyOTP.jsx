import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function VerifyOTP() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/verify-otp", {
      email: state.email,
      otp
    });
    navigate("/reset-password", { state: { email: state.email } });
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength={6}
            className="w-full border p-2 rounded"
            placeholder="Enter OTP sent to email"
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="w-full bg-purple-600 text-white p-2 rounded mt-4">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
