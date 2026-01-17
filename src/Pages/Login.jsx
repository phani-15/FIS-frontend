import React, { useState } from "react";
import { User, Lock, LogIn, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login, authenticate } from "../core/auth"; // assuming login() returns Promise

export default function Login() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

  React.useEffect(() => {
    const handleClickOutside = () => setShowOptions(false);
    if (showOptions) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showOptions]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear field-specific error on change
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      delete newErrors.login; // optional: clear global too
      return newErrors;
    });
  };

  const urls = [
    {
      title : "HOD",
      url : "/hod"
    },
    {
      title : "Higher Officials",
      url : "/ofc"
    },
    {
      title : "Admin",
      url : "/admin"
    }
  ]

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({});

  if (!formData.username.trim()) return setErrors({ username: "Username is required" });
  if (!formData.password.trim()) return setErrors({ password: "Password is required" });

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.username);
  if (!isEmail) return setErrors({ username: "Enter a valid email" });

  try {
    const result = await login({
      email: formData.username,
      password: formData.password,
    });
    const data = result.data || result;
    if (!data?.user?.id) {
      throw { response: { data: { error: "Any of the credentials is wrong" } } };
    }
    authenticate(data, () => {
      setFormData({ username: "", password: "" });
    });
    navigate(`/profile/${data.user.id}`);
  } catch (error) {
    const msg = error.response?.data?.error || "Any of the credentials is wrong";
    setErrors({ password: msg });
  }
};

  return (
    <div className="flex justify-center items-center p-4 my-4">
    
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Top Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-purple-50 rounded-xl shadow-sm">
            <Lock className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900">LOGIN</h2>
        <p className="text-gray-600 text-sm mt-1">Faculty Information System</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5 text-left">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="e.g., user@example.com "
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <KeyRound className="w-5 h-5" />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Global Error (e.g., network/backend) */}
          {errors.login && (
            <div className="p-2 bg-red-50 text-red-700 text-sm rounded-md">
              {errors.login}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-medium py-2.5 px-4 rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <LogIn className="w-5 h-5" />
            Login
          </button>

          <p
            className="mt-1 text-sm text-center text-violet-700 hover:underline cursor-pointer"
            onClick={() => navigate("/rp")}
          >
            Forgot/Reset Password?
          </p>
        </form>
      </div>
    </div>
  );
}