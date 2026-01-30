import React, { useState } from "react";
import { X, CheckCircle } from "lucide-react";

export default function GetStartedModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    // auto-close modal after 3 seconds (optional)
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X />
        </button>

        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
              Get Started
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* inputs unchanged */}
              {/* Name */}
              <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />

              {/* Email */}
              <label className="block text-sm font-medium text-gray-700 mb-1">
            E-mail
            </label>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />

              {/* Phone */}
              <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
              <input
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-linear-to-r from-blue-800 to-indigo-900 text-white font-semibold"
              >
                Submit
              </button>
            </form>
          </>
        ) : (
          /* ✅ Success Message */
          <div className="flex flex-col items-center justify-center text-center py-12">
            <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Submitted Successfully
            </h3>
            <p className="text-gray-600">
              You'll get notified through the email soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
