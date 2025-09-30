import React, { useState, useCallback} from "react";
import InputField from "../components/inputField";

export default function Register() {
  const [step, setStep] = useState("personal"); // "personal" | "education"
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    father: "",
    gender: "",
    DOB: "",
    email: "",
    phone: "",
    marrital: "",
    password: "",
    Cpassword: "",
  });

  const [education, setEducation] = useState({
    tenth: { title : "Tenth" ,school: "", marks: "", year: "", certificate: null },
    inter: { title : "Intermediate/Diploma" , college: "", marks: "", year: "", certificate: null },
    degree: { title :"Under Graduation", college: "", degreeName: "", specialization: "", year: "", certificate: null },
    pg: { title : "Post Graduation", course: "", specialization: "", year: "", certificate: null },
  });

  // stable handler for generic personal fields
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  // phone handler: keep only digits and limit to 10
  const handlePhoneChange = useCallback((e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: digits }));
    setErrors((prev) => ({ ...prev, phone: "" }));
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
  const handleFileChange = useCallback((e) => {
    const [level] = e.target.name.split(".");
    const file = e.target.files?.[0] ?? null;
    setEducation((prev) => ({
      ...prev,
      [level]: { ...prev[level], certificate: file },
    }));
  }, []);

  const validatePersonal = useCallback(() => {
    const newErrors = {};
    if (formData.phone.length !== 10) newErrors.phone = "Phone number must be 10 digits";
    if(formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.Cpassword) newErrors.Cpassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmitPersonal = useCallback(
    (e) => {
      e.preventDefault();
      if (!validatePersonal()) return;
      console.log("Personal Data:", formData);
      setStep("education");
    },
    [formData, validatePersonal]
  );

  const handleSubmitEducation = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Education Data:", education);
      alert("Registration Complete!");
    },
    [education]
  );

  // helper to render non-certificate fields of education level
  const renderEduFields = (levelKey) => {
    const fields = Object.keys(education[levelKey]).filter((f) => f !== "certificate" && f!="title");
    return fields.map((f) => {
      const label = f
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (s) => s.toUpperCase()); // "degreeName" -> "Degree Name"
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

            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />

            {/* specific handler for phone to keep digits-only and stable string */}
            <InputField
              label="Phone Number (10 digits)"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              inputMode="numeric"
              placeholder="Enter phone number"
              error={errors.phone}
              required
            />

            <InputField 
            label="Password" 
            name="password" 
            type="password" 
            value={formData.password} 
            onChange={handleChange} 
            error={errors.password}
            required />
            <InputField
              label="Confirm Password"
              name="Cpassword"
              type="password"
              value={formData.Cpassword}
              onChange={handleChange}
              error={errors.Cpassword}
              required
            />

            <button
              type="submit"
              className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition"
            >
              Next
            </button>
          </form>
        </div>
      )}

      {step === "education" && (
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 style={{ fontFamily: "Times New Roman, serif" }} className="text-2xl font-semibold mb-4">Education Details</h1>

          <form onSubmit={handleSubmitEducation} className="flex flex-col space-y-6">
            {Object.keys(education).map((level) => (
              <div key={level}>
                <h2 className="text-lg font-semibold mt-4 capitalize">{education[level].title}</h2>
                {renderEduFields(level)}

                <div className="flex flex-col text-left space-y-2 mt-4">
                  <label>Upload Certificate:</label>
                  <label className="w-full border border-gray-300 rounded-lg py-2 px-3 cursor-pointer flex justify-between items-center hover:border-blue-500 transition">
                    <span>{education[level].certificate?.name || "Choose file"}</span>
                    <span className="text-gray-500 text-sm">Browse</span>
                    {/* name used to identify level in handler */}
                    <input
                      type="file"
                      name={`${level}.certificate`}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            ))}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setStep("personal")}
                className="py-2 px-4 rounded-lg border"
              >
                Back
              </button>
              <button
                type="submit"
                className="mt-0 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
