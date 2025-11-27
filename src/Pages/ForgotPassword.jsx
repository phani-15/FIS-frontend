import { useState } from "react";
import axios from "axios";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!email) return setError("Email is required");

    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      navigate("/verify-otp", { state: { email } });  // ✅ pass email forward
    } catch (err) {
      setError("Email not registered");
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <div className="relative">
            <Mail className="absolute left-2 top-2.5 text-gray-400 w-5 h-5"/>
            <input
              type="email"
              className="w-full pl-10 border p-2 rounded"
              placeholder="Enter registered email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="w-full bg-indigo-600 text-white p-2 rounded mt-4">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}
