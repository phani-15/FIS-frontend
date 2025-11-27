import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (p1 !== p2) return setErr("Passwords do not match");

    await axios.post("http://localhost:5000/api/auth/reset-password", {
      email: state.email,
      newPassword: p1
    });

    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-2 rounded mb-2"
            onChange={(e) => setP1(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-2 rounded"
            onChange={(e) => setP2(e.target.value)}
          />

          {err && <p className="text-red-500 text-sm">{err}</p>}

          <button className="w-full bg-green-600 text-white p-2 rounded mt-4">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
