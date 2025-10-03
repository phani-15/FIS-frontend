import React, { useState, useCallback } from "react";
import InputField from "../components/inputField";
import { useNavigate } from "react-router-dom";
import {Trash2} from "lucide-react"

export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState("experience"); // "personal" | "education" | "experience"
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    father: "",
    gender: "",
    DOB: "",
    marrital: "",
    designation: "",
  });

  const [loginData, setLoginData] = useState({
    password: "",
    Cpassword: "",
    department: "",
    email: "",
    phone: "",
  })

  const [education, setEducation] = useState({
    tenth: { title: "Tenth", school: "", marks: "", year: "", },
    twelth: { title: "Intermediate/Diploma", type: "", college: "", marks: "", year: "", },
    degree: { title: "Under Graduation", college: "", degreeName: "", specialization: "", year: "", },
    pg: { title: "Post Graduation", college: "", course: "", specialization: "", year: "" },
  });


  const [experience, setExperience] = useState([
    { institute: "", designation: "", from: "", to: "" }
  ])

  // stable handler for generic personal fields
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleExperienceChange = useCallback((index, e) => {
    const { name, value } = e.target;
    setExperience((prev) => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  }, []);


  // Add new experience row
  const addExperience = useCallback(() => {
    setExperience((prev) => [
      ...prev,
      { institute: "", designation: "", from: "", to: "", certificate: null }
    ]);
  }, []);

  // Remove experience row
  const removeExperience = useCallback((index) => {
    setExperience((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // phone handler: keep only digits and limit to 10
  const handlePhoneChange = useCallback((e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setLoginData((prev) => ({ ...prev, phone: digits }));
    setErrors((prev) => ({ ...prev, phone: "" }));
  }, []);

  const handleLoginChange = useCallback((e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  // single stable handler for education inputs using name="level.field"
  const handleEducationChange = useCallback((e) => {
    const [level, field] = e.target.name.split(".");
    const value = e.target.value;
    setEducation((prev) => ({
      ...prev,
      [level]: { ...prev[level], [field]: value },
    }));
  }, []);

  // file input handler (file inputs stay uncontrolled but we keep file ref in state)


  const validateSignUp = useCallback(() => {
    const newErrors = {};
    if (loginData.phone.length !== 10) newErrors.phone = "Phone number must be 10 digits";
    if (loginData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (loginData.password !== loginData.Cpassword) newErrors.Cpassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [loginData]);

  const handleSubmitPersonal = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Personal Data:", formData);
      setStep("education");
    }, [formData]
  );


  const handleSubmitSignUp = useCallback(
    (e) => {
      e.preventDefault();
      if (!validateSignUp()) return;
      console.log("Login Data:", loginData);
      setStep("personal");
    },
    [formData, validateSignUp]
  );

  const handleSubmitEducation = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Education Data:", education);
      setStep("experience")
    },
    [education]
  );

  const renderEduFields = (levelKey) => {
    const fields = Object.keys(education[levelKey]).filter((f) => f != "title");
    return fields.map((f) => {
      const label = f
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (s) => s.toUpperCase()); // "degreeName" -> "Degree Name"

      // Special case: "type" field under "twelth" should be a dropdown
      if (levelKey === "twelth" && f === "type") {
        return (
          <div key={`${levelKey}.${f}`} className="flex flex-col text-left space-y-2">
            <label>{label}</label>
            <select
              name={`${levelKey}.${f}`}
              value={education[levelKey][f] || ""}
              onChange={handleEducationChange}
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Diploma">Diploma</option>
            </select>
          </div>
        );
      }

      return (
        <InputField
          key={`${levelKey}.${f}`}
          label={label}
          name={`${levelKey}.${f}`}
          value={String(education[levelKey][f] ?? "")}
          onChange={handleEducationChange}
          // keep year as text + inputMode numeric to avoid number->string conversions
          type={f === "year" ? "text" : "text"}
          inputMode={f === "year" ? "numeric" : undefined}
          placeholder={f === "year" ? "Enter year" : `Enter ${label.toLowerCase()}`}
        />
      );
    });
  };

  return (
    <div className="m-5 flex flex-col justify-center items-center">
      {step === 'signUp' && (
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-2xl font-semibold mb-4" style={{ fontFamily: "Times New Roman, serif" }}>Sign Up</h1>

          <form onSubmit={handleSubmitSignUp} className="flex flex-col">

            <InputField label="Email" name="email" type="email" value={loginData.email} onChange={handleLoginChange} required />

            {/* specific handler for phone to keep digits-only and stable string */}
            <InputField
              label="Phone Number (10 digits)"
              name="phone"
              value={loginData.phone}
              onChange={handlePhoneChange}
              inputMode="numeric"
              placeholder="Enter phone number"
              error={errors.phone}
              required
            />

            <div className="flex flex-col text-left space-y-2 mt-4">
              <label>Department</label>
              <select
                name="department"
                value={loginData.department}
                onChange={handleLoginChange}
                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select your option</option>
                <option value="bshss">BS & HSS</option>
                <option value="cse">Computer Science & Engineering</option>
                <option value="ece">Electronics & Communication Engineering</option>
                <option value="eee">Electrical & Electronics Engineering</option>
                <option value="civil">Civil Engineering</option>
                <option value="it">Inforamtion Technology</option>
                <option value="met">Metallurgical Engineering</option>
                <option value="mech">Mechanical Engineering</option>
              </select>
            </div>

            <InputField
              label="Password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleLoginChange}
              error={errors.password}
              required />
            <InputField
              label="Confirm Password"
              name="Cpassword"
              type="password"
              value={loginData.Cpassword}
              onChange={handleLoginChange}
              error={errors.Cpassword}
              required
            />

            <p className="mt-3">Already have an Account ? <span onClick={() => (navigate("/"))} className="text-blue-800 cursor-pointer">Back to home</span></p>

            <button
              type="submit"
              className="mt-6 cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition"
            >
              Next
            </button>
          </form>
        </div>
      )}
      {step === "personal" && (
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-2xl font-semibold mb-4" style={{ fontFamily: "Times New Roman, serif" }}>Personal Details</h1>

          <form onSubmit={handleSubmitPersonal} className="flex flex-col">
            <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
            <InputField label="Father's Name" name="father" value={formData.father} onChange={handleChange} required />

            <div className="md:flex justify-between">
              <div className="flex flex-col text-left space-y-2 mt-4">
                <label>Gender:</label>
                <div className="flex space-x-6 mt-1">
                  {["Male", "Female"].map((g) => (
                    <label key={g} className="flex items-center space-x-2">
                      <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} required />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              <InputField
                label="Date of Birth"
                name="DOB"
                type="date"
                value={formData.DOB}
                onChange={handleChange}
                required
                className="mr-18"
              />
            </div>

            <div className="flex flex-col text-left space-y-2 mt-4">
              <label>Marital Status:</label>
              <select
                name="marrital"
                value={formData.marrital}
                onChange={handleChange}
                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select your option</option>
                <option value="unmarried">Unmarried</option>
                <option value="married">Married</option>
              </select>
            </div>


            {/* Submit Button */}

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setStep("signUp")}
                className="mt-6 py-2 px-4 cursor-pointer rounded-lg border"
              >
                Back
              </button>

              <button
                type="submit"
                className="mt-6 cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition"
              >
                Next
              </button>
            </div>
          </form>
        </div >
      )
      }

      {
        step === "education" && (
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 text-center">
            <h1 style={{ fontFamily: "Times New Roman, serif" }} className="text-2xl font-semibold mb-4">Education Details</h1>

            <form onSubmit={handleSubmitEducation} className="flex flex-col space-y-6">
              {Object.keys(education).map((level) => (
                <div key={level}>
                  <h2 className="text-lg font-semibold mt-4 capitalize">{education[level].title}</h2>
                  {renderEduFields(level)}
                </div>
              ))}
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setStep("personal")}
                  className="py-2 px-4 rounded-lg border cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="mt-0 cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )
      }

      {step === "experience" && (
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 style={{ fontFamily: "Times New Roman, serif" }} className="text-2xl font-semibold mb-4">
            Proffessional/Research Experience
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Experience Data:", experience);
              alert("Registration Complete!");
            }}
            className="flex flex-col space-y-6"
          >
            {experience.map((exp, index) => (
              <div key={index} className="border mt-4 border-blue-300 p-2 py-4 rounded-lg shadow-sm relative">
                <h2 className="text-lg font-semibold mb-3">Experience {index + 1}</h2>

                <InputField
                  label="Institute Name"
                  name="institute"
                  value={exp.institute}
                  onChange={(e) => handleExperienceChange(index, e)}
                  required
                />

                <InputField
                  label="Designation"
                  name="designation"
                  value={exp.designation}
                  onChange={(e) => handleExperienceChange(index, e)}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="From"
                    type="number"
                    name="from"
                    value={exp.from}
                    onChange={(e) => handleExperienceChange(index, e)}
                    required
                  />
                  <InputField
                    label="To"
                    type="number"
                    name="to"
                    value={exp.to}
                    onChange={(e) => handleExperienceChange(index, e)}
                    required
                  />
                </div>

                {experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="absolute top-2 cursor-pointer right-2 text-sm"
                  >
                    <Trash2 /> 
                  </button>
                )}
              </div>
            ))}

            <div className="flex justify-between">
              
            <button
              type="button"
              onClick={addExperience}
              className="border py-2 px-4 mr-4 rounded-lg cursor-pointer transition"
            >
              ➕ Add
            </button>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setStep("education")}
                className="py-2 px-4 rounded-lg border cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="mt-0 cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition"
              >
               Finish Registration
              </button>
            </div>

            </div>
            
          </form>
        </div>
      )}
    </div>
  )
}