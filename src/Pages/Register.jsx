import React, { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    father: "",
    gender: "",
    DOB: "",
    email: "",
    phone: "",
    marrital: "",
    password: "",
    Cpassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      document.getElementById("inPhone").innerHTML = "<p class='text-red-600 text-sm'>Phone number must be 10 digits</p>";
      return;
    }
    console.log("Submitted Data:", formData);
    // 🚀 You can send formData to your backend API here
  };

  return (
    <div className="m-5 flex justify-center items-center ">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">Personal Details</h1>

        <form onSubmit={handleSubmit} className="flex flex-col">

          {/* Full Name */}
          <div className="flex flex-col text-left space-y-2 mt-4">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Father's Name */}
          <div className="flex flex-col text-left space-y-2 mt-4">
            <label htmlFor="father">Father's Name:</label>
            <input
              type="text"
              id="father"
              name="father"
              placeholder="Enter your father's name"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.father}
              onChange={handleChange}
              required
            />
          </div>

          <div className="md:flex justify-between ">
            {/* Gender */}
            <div className="flex flex-col text-left space-y-2 mt-4">
              <label htmlFor="gender">Gender:</label>
              <div className="flex space-x-6 mt-1">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                    required
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col mr-20 text-left space-y-2 mt-4">
              <label htmlFor="DOB">Date of Birth:</label>
              <input
                type="date"
                id="DOB"
                name="DOB"
                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.DOB}
                onChange={handleChange}
                required
              />
            </div>
          </div>



          <div className="flex flex-col text-left space-y-2 mt-4">
            {/* marrital status */}
            <label htmlFor="marrital">Marital Status:</label>
            <select
              id="marrital"
              name="marrital"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.marrital}
              onChange={handleChange}
              required
            >
              <option value="" disabled >Select your option</option>
              <option value="unmarried">Unmarried</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* Email */}
          <div className="flex flex-col text-left space-y-2 mt-4">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col text-left space-y-2 mt-4">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="number"
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              maxLength="10"
              pattern="[0-9]{10}"
              value={formData.phone}
              onChange={
                (e) => {
                  if (e.target.value.length <= 10) {
                    handleChange(e);
                    document.getElementById("inPhone").innerHTML = "";
                  }
                }
              }
              required
            />
            <small id="inPhone" className="text-gray-500 text-sm"></small>
          </div>
            
          <div className="flex flex-col text-left space-y-2 mt-4">
            {/* password */}
            <label htmlFor="password">Choose Password:</label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
  
          <div className="flex flex-col text-left space-y-2 mt-4">
            {/* confirm password */}
            <label htmlFor="password">Confirm Password:</label>
            <input
              type="password"
              id="Cpassword"
              name="Cpassword"
              placeholder="Confirm your password"
              value={formData.Cpassword}
              onChange={handleChange}
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
