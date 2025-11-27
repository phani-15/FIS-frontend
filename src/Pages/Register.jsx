import React, { useState, useCallback, useEffect, use } from "react";
import InputField from "../components/inputField";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react"

export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState("as"); // "signUp" | "personal" | "education" | "experience" | "as" | "oas"
  const [errors, setErrors] = useState({});
  const [haveOAS, setHaveOAS] = useState(true);
  const [havePhD, setHavePhD] = useState(false);
  const [havePostDoc, setHavePostDoc] = useState(false);

  const [personalData, setpersonalData] = useState({
    name: "",
    profile: null,
    father: "",
    gender: "",
    DOB: "",
    marital: "",
    designation: "",
    department: "",
    college: "",
  });

  const [loginData, setLoginData] = useState({
    password: "",
    email: "",
    phone: "",
  })

  const [Cpassword, setCpassword] = useState("");

  const [education, setEducation] = useState({
    tenth: { title: "Tenth", school: "", percentage: "", year: "", },
    twelth: { title: "Intermediate/Diploma", type: "", college: "", percentage: "", year: "", },
    degree: { title: "Under Graduation", degreeName: "", specialization: "", percentage: "", college: "", university: "", year: "", },
    pg: { title: "Post Graduation", course: "", specialization: "", percentage: "", college: "", university: "", year: "" },
  });


  const [experience, setExperience] = useState([
    { institute: "", designation: "", from: "", to: "" }
  ])

  const [PhDs, setPhDs] = useState([])
  const [PostDocs, setPostDocs] = useState([])

  const [administrativeService, setAdministrativeService] = useState([
    { designation: "", from: "", to: "" }
  ])

  const [otherAdministrativeService, setOtherAdministrativeService] = useState([
    { institute: "", from: "", to: "", designation: "" }
  ])

  useEffect(() => {
    if (personalData.college === "College of PharmaCeutical Sciences") {
      setpersonalData(prev => ({ ...prev, department: "Department of Pharmacy" }));
    }
  }, [personalData.college]);

  useEffect(() => {
    if (!haveOAS) {
      setOtherAdministrativeService([]);
    }
  }, [haveOAS]);

  // stable handler for generic personal fields
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setpersonalData((prev) => ({ ...prev, [name]: value }));
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
      { institute: "", designation: "", from: "", to: "" }
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

  const handleASChange = useCallback((index, e) => {
    const { name, value } = e.target;
    setAdministrativeService(prev => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  }, []);

  const handleOASChange = useCallback((index, e) => {
    const { name, value } = e.target;
    setOtherAdministrativeService(prev => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  }, []);

  const addAS = useCallback(() => {
    setAdministrativeService(prev => [
      ...prev,
      { designation: "", from: "", to: "" }
    ]);
  }, []);

  const addOAS = useCallback(() => {
    setOtherAdministrativeService(prev => [
      ...prev,
      { institute: "", designation: "", from: "", to: "" }
    ]);
  }, []);

  const removeAS = useCallback((index) => {
    setAdministrativeService(prev => prev.filter((_, i) => i !== index));
  }, []);

  const removeOAS = useCallback((index) => {
    setOtherAdministrativeService(prev => prev.filter((_, i) => i !== index));
  }, []);

  const [previewUrl, setPreviewUrl] = useState(null);

  const validateSignUp = useCallback(() => {
    const newErrors = {};
    if (loginData.phone.length !== 10) newErrors.phone = "Phone number must be 10 digits";
    if (loginData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (loginData.password !== Cpassword) newErrors.Cpassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [loginData]);

  const handleSubmitPersonal = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Personal Data:", personalData);
      setStep("education");
    }, [personalData]
  );

  const validateExperience = useCallback(() => {
    const newErrors = {};

    experience.forEach((exp, index) => {
      Object.entries(exp).forEach(([field, value]) => {
        if (!value || value.toString().trim() === "") {
          newErrors[`experience.${index}.${field}`] = `Experience ${index + 1}: ${field} is required`;
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [experience]);

  const handleSubmitExperience = useCallback(
    (e) => {
      e.preventDefault();
      if (!validateExperience()) return;
      console.log("Experience Data:", experience);
      setStep("as");
    },
    [experience, validateExperience]
  );

  const handlePhDChange = useCallback((index, e) => {
    const { name, value } = e.target;
    setPhDs(prev => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  }, []);

  const handlePostDocChange = useCallback((index, e) => {
    const { name, value } = e.target;
    setPostDocs(prev => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  }, [])

  const removePhD = useCallback((index) => {
    setPhDs(prev => prev.filter((_, i) => i !== index));
  }, []);

  const removePostDoc = useCallback((index) => {
    setPostDocs(prev => prev.filter((_, i) => i !== index));
  }, []);

  const addPhD = useCallback(() => {
    setPhDs(prev => [
      ...prev,
      { specialization: "", under_the_proffessor: "", department: "", University: "", year: "" }
    ]);
  }, []);

  const addPostDoc = useCallback(() => {
    setPostDocs(prev => [
      ...prev,
      { specialization: "", under_the_proffessor: "", University: "", year: "" }
    ]);
  }, []);

  const handleSubmitSignUp = useCallback(
    (e) => {
      e.preventDefault();
      if (!validateSignUp()) return;
      console.log("Login Data:", loginData);
      setStep("personal");
    },
    [personalData, validateSignUp]
  );

  const validateEducation = useCallback(() => {
    const newErrors = {};

    Object.entries(education).forEach(([level, fields]) => {
      Object.entries(fields).forEach(([field, value]) => {
        if (field === "title" || field === "percentage") return; // skip title
        if (!value || value.toString().trim() === "") {
          newErrors[`${level}.${field}`] = `${fields.title} - ${field} is required`;
        }
      });
    });

    // Validate PhDs if user has PhDs
    if (havePhD) {
      PhDs.forEach((phd, index) => {
        Object.entries(phd).forEach(([field, value]) => {
          if (field != 'under_the_proffessor' && (!value || value.toString().trim() === "")) {
            newErrors[`phd.${index}.${field}`] = `PhD ${index + 1} - ${field} is required`;
          }
          if (field === "year" && (isNaN(value) || value < 1900 || value > new Date().getFullYear())) {
            newErrors[`phd.${index}.year`] = `year must be less than or equal to ${new Date().getFullYear()} and greater than 1900`;
          }
        });
      });
    }

    //validate PostDocs
    if (havePostDoc) {
      PostDocs.forEach((postdoc, index) => {
        Object.entries(postdoc).forEach(([field, value]) => {
          if (field != 'under_the_proffessor' && (!value || value.toString().trim() === "")) {
            newErrors[`postdoc.${index}.${field}`] = `PostDoc ${index + 1} - ${field} is required`;
          }
          if (field === "year" && (isNaN(value) || value < 1900 || value > new Date().getFullYear())) {
            newErrors[`postdoc.${index}.year`] = `year must be less than or equal to ${new Date().getFullYear()} and greater than 1900`;
          }
        });
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [education, havePhD, PhDs]);

  const handleSubmitEducation = useCallback(
    (e) => {
      e.preventDefault();
      if (!validateEducation()) return;

      // If user doesn't have PhDs, reset the state
      if (!havePhD) {
        setPhDs([]);
      }

      console.log("Education Data:", education);
      console.log("PhD Data:", PhDs);
      setStep("experience");
    },
    [education, havePhD, PhDs, validateEducation]
  );

  const renderEduFields = (levelKey) => {
    const fields = Object.keys(education[levelKey]).filter((f) => f !== "title");
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
              error={errors[`${levelKey}.${f}`]}
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
          label={f === "percentage" ? label + " (optional)" : label}
          name={`${levelKey}.${f}`}
          value={String(education[levelKey][f] ?? "")}
          onChange={handleEducationChange}
          // keep year as text + inputMode numeric to avoid number->string conversions
          type={f === "year" ? "text" : "text"}
          error={errors[`${levelKey}.${f}`]}
          inputMode={f === "year" ? "numeric" : f === "percentage" ? "numeric" : undefined}
          placeholder={f === "year" ? "Enter year" : `Enter ${label.toLowerCase()} ${f === "school" || f === "college" ? "name" : ""}`}
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

            <InputField label="Email" placeholder="enter mail addresss" name="email" type="email" value={loginData.email} onChange={handleLoginChange} required />

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

            <InputField
              label="Password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleLoginChange}
              error={errors.password}
              placeholder="choose password"
              required />
            <InputField
              label="Confirm Password"
              name="Cpassword"
              type="password"
              placeholder="re-enter password"
              value={Cpassword}
              onChange={(e) => { setCpassword(e.target.value); setErrors((prev) => ({ ...prev, Cpassword: "" })); }}
              error={errors.Cpassword}
              required
            />

            <p className="mt-3">Already have an Account ? <span onClick={() => (navigate("/"))} className="text-blue-800 cursor-pointer">Back to home</span></p>

            <button
              type="submit"
              className="mt-6 cursor-pointer bg-linear-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition"
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
            <div className="flex flex-col">
              <label className="text-left my-2">Profile Picture</label>
              <div className="flex gap-4 ">
                <input
                  className="p-2 border rounded-md border-gray-300"
                  name="profile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setpersonalData((prev) => ({ ...prev, profile: file }));

                    if (file) {
                      // Generate preview URL
                      const url = URL.createObjectURL(file);
                      setPreviewUrl(url);
                    } else {
                      setPreviewUrl(null);
                    }
                  }}
                />

                {previewUrl && (
                  <div className="mt-3">
                    <button
                      type="button"
                      className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => {
                        // Open in new tab or show modal — here we just log; you can enhance
                        window.open(previewUrl, '_blank');
                      }}>
                      View
                    </button>
                  </div>
                )}
              </div>
            </div>

            <InputField label="Full Name" name="name" placeholder="enter your name" value={personalData.name} onChange={handleChange} required />
            <InputField label="Father's Name" name="father" placeholder="enter your father name" value={personalData.father} onChange={handleChange} required />

            <div className="md:flex justify-between">
              <div className="flex flex-col text-left space-y-2 mt-4">
                <label>Gender:</label>
                <div className="flex space-x-6 mt-1">
                  {["Male", "Female"].map((g) => (
                    <label key={g} className="flex items-center space-x-2">
                      <input type="radio" name="gender" value={g} checked={personalData.gender === g} onChange={handleChange} required />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              <InputField
                label="Date of Birth"
                name="DOB"
                type="date"
                value={personalData.DOB}
                onChange={handleChange}
                required
                className="mr-18"
              />
            </div>

            <div className="flex flex-col text-left space-y-2 mt-4">
              <label>Marital Status:</label>
              <select
                name="marital"
                value={personalData.marital}
                onChange={handleChange}
                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500"
                required
              >
                <option value="">Select your option</option>
                <option value="unmarried">Unmarried</option>
                <option value="married">Married</option>
              </select>
            </div>

            <div className="flex flex-col text-left space-y-2 mt-4">
              <label>College</label>
              <select
                name="college"
                value={personalData.college}
                onChange={handleChange}
                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500"
                required
              >
                <option value="">Select your option</option>
                <option value="University College of Engineering">University College of Engineering</option>
                <option value="College of PharmaCeutical Sciences">College of PharmaCeutical Sciences</option>
              </select>
            </div>

            {
              /* Department Dropdown */
              personalData.college === "University College of Engineering" &&
              <div className="flex flex-col text-left space-y-2 mt-4">
                <label>Department</label>
                <select
                  name="department"
                  value={personalData.department}
                  onChange={handleChange}
                  className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500"
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
                  <option value="mech">Master's in Business Administration</option>
                </select>
              </div>
            }

            <div className="flex flex-col text-left space-y-2 mt-4">
              <label>Designation</label>
              <select
                name="designation"
                value={personalData.designation}
                onChange={handleChange}
                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500"
                required
              >
                <option value="">Select your option</option>
                <option value="Professor">Professor</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Assistant Professor(contract)">Assistant Professor(contract)</option>
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
                className="mt-6 cursor-pointer bg-linear-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition"
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

              {/* PhD Section */}
              <div className="mt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="havePhD"
                      checked={havePhD}
                      onChange={() => {
                        setHavePhD(true)
                        addPhD()
                      }
                      }
                    />
                    <span>Yes, I have PhD(s)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="havePhD"
                      checked={!havePhD}
                      onChange={() => {
                        setHavePhD(false)
                        setPhDs([]);
                      }}
                    />
                    <span>No, I don't have PhD</span>
                  </label>
                </div>

                {havePhD && (
                  <div className="mt-4 space-y-6">
                    <h2 className="text-lg font-semibold">PhD Details</h2>
                    {PhDs.map((phd, index) => (
                      <div key={index} className="border border-gray-300 p-4 rounded-lg relative">
                        <h3 className="font-medium mb-3">PhD {index + 1}</h3>

                        <InputField
                          label="Specialization"
                          name="specialization"
                          value={phd.specialization}
                          onChange={(e) => handlePhDChange(index, e)}
                          error={errors[`phd.${index}.specialization`]}
                          required
                        />

                        <InputField
                          label="Under the Professor"
                          name="under_the_proffessor"
                          value={phd.under_the_proffessor}
                          onChange={(e) => handlePhDChange(index, e)}
                          error={errors[`phd.${index}.under_the_proffessor`]}
                          required
                        />

                        <InputField
                          label="Department"
                          name="department"
                          value={phd.department}
                          onChange={(e) => handlePhDChange(index, e)}
                          error={errors[`phd.${index}.department`]}
                          required
                        />

                        <InputField
                          label="University"
                          name="University"
                          value={phd.University}
                          onChange={(e) => handlePhDChange(index, e)}
                          error={errors[`phd.${index}.University`]}
                          required
                        />

                        <InputField
                          label="Year of Completion"
                          name="year"
                          value={phd.year}
                          onChange={(e) => handlePhDChange(index, e)}
                          error={errors[`phd.${index}.year`]}
                          type="number"
                          inputMode="numeric"
                          required
                        />

                        {PhDs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePhD(index)}
                            className="absolute group top-2 right-2 text-slate-600"
                          >
                            <Trash2 size={18} />
                            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 
                            text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                              Remove
                            </span>
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addPhD}
                      className="flex items-center gap-2 mt-2 text-indigo-600 hover:text-indigo-800"
                    >
                      <span className="text-xl">+</span> Add Another PhD
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="havePostDoc"
                      checked={havePostDoc}
                      onChange={() => {
                        setHavePostDoc(true)
                        addPostDoc()
                      }}
                    />
                    <span>Yes, I have Post Doctoral(s)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="havePostDoc"
                      checked={!havePostDoc}
                      onChange={() => {
                        setHavePostDoc(false)
                        setPostDocs([]);
                      }}
                    />
                    <span>No, I don't have any PostDoc</span>
                  </label>
                </div>
                {havePostDoc && (
                  <div className="mt-4 space-y-6">
                    <h2 className="text-lg font-semibold">PostDoctoral Details</h2>
                    {PostDocs.map((postdoc, index) => (
                      <div key={index} className="border border-gray-300 p-4 rounded-lg relative">
                        <h3 className="font-medium mb-3">PostDoc {index + 1}</h3>

                        <InputField
                          label="Specialization"
                          name="specialization"
                          value={postdoc.specialization}
                          onChange={(e) => handlePostDocChange(index, e)}
                          error={errors[`postdoc.${index}.specialization`]}
                          required
                        />

                        <InputField
                          label="Under the Professor(optional)"
                          name="under_the_proffessor"
                          value={postdoc.under_the_proffessor}
                          onChange={(e) => handlePostDocChange(index, e)}
                          error={errors[`postdoc.${index}.under_the_proffessor`]}
                          required
                        />

                        <InputField
                          label="University"
                          name="University"
                          value={postdoc.University}
                          onChange={(e) => handlePostDocChange(index, e)}
                          error={errors[`postdoc.${index}.University`]}
                          required
                        />

                        <InputField
                          label="Year of Completion"
                          name="year"
                          value={postdoc.year}
                          onChange={(e) => handlePostDocChange(index, e)}
                          error={errors[`postdoc.${index}.year`]}
                          type="number"
                          inputMode="numeric"
                          required
                        />

                        {PostDocs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePostDoc(index)}
                            className="absolute group top-2 right-2 text-slate-600"
                          >
                            <Trash2 size={18} />
                            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 
                            text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                              Remove
                            </span>
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addPostDoc}
                      className="flex items-center gap-2 mt-2 text-indigo-600 hover:text-indigo-800"
                    >
                      <span className="text-xl">+</span> Add Another PostDoc
                    </button>
                  </div>
                )}
              </div>

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
                  className="mt-0 cursor-pointer bg-linear-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition"
                >
                  Next
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
            onSubmit={handleSubmitExperience}
            className="flex flex-col space-y-6"
          >
            {experience.map((exp, index) => (
              <div key={index} className=" mt-4 p-2 py-4 rounded-lg bg-white shadow-lg relative">
                <h2 className="text-lg font-semibold mb-3">Experience {index + 1}</h2>

                <InputField
                  label="Institute Name"
                  name="institute"
                  value={exp.institute}
                  onChange={(e) => handleExperienceChange(index, e)}
                  error={errors[`experience.${index}.institute`]}
                  required
                />

                <InputField
                  label="Designation"
                  name="designation"
                  value={exp.designation}
                  onChange={(e) => handleExperienceChange(index, e)}
                  error={errors[`experience.${index}.designation`]}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="From"
                    type="number"
                    name="from"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={exp.from}
                    onChange={(e) => handleExperienceChange(index, {
                      target: { name: e.target.name, value: parseInt(e.target.value, 10) || "" }
                    })}
                    error={errors[`experience.${index}.from`]}
                    required
                  />
                  <InputField
                    label="To"
                    type="number"
                    name="to"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={exp.to}
                    onChange={(e) => handleExperienceChange(index, {
                      target: { name: e.target.name, value: parseInt(e.target.value, 10) || "" }
                    })}
                    error={errors[`experience.${index}.to`]}
                    required
                  />
                </div>

                {experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="absolute group top-2 cursor-pointer right-2 text-slate-600  text-sm"
                  >
                    <Trash2 size={18} />
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                     bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 
                     group-hover:opacity-100 transition">
                      Remove
                    </span>
                  </button>
                )}
              </div>
            ))}

            <div className="flex justify-between">

              <div className="flex">
                <button
                  type="button"
                  onClick={addExperience}
                  className="flex items-center gap-2 mt-2 mx-5 text-indigo-600 hover:text-indigo-800"
                >
                  Add More
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setExperience([])
                    setStep('as')
                  }}
                  className="flex items-center gap-2 mt-2 cursor-pointer text-indigo-600 hover:text-indigo-800"
                >
                  skip
                </button>

              </div>
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
                  className="mt-0 cursor-pointer bg-linear-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition"
                >
                  Next
                </button>
              </div>

            </div>

          </form>
        </div>
      )}

      {
        step == "as" && (
          <div className=" flex flex-col justify-center items-center">
            <div className="w-full lg:min-w-2xl bg-white rounded-2xl shadow-xl p-8 text-center">
              <h1
                className="text-2xl font-semibold mb-6"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Administrative Service in this Institute
              </h1>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Administrative Service :", administrativeService);
                  setStep("oas");
                }}
                className="flex flex-col space-y-6"
              >
                {administrativeService.map((as, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg relative space-y-4 text-left"
                  >
                    <h2 className="text-lg text-center font-medium mb-3 pb-2">
                      Service {index + 1}
                    </h2>

                    {/* InputField is assumed to be a custom component that handles its own label and input styling */}
                    <InputField
                      label="Designation"
                      name="designation"
                      value={as.designation}
                      onChange={(e) => handleASChange(index, e)}
                      required
                    />

                    {/* Group for From and To years */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* FROM Field - Corrected to use a mapped array for year generation */}
                      <div className="flex flex-col space-y-2">
                        <label htmlFor={`as-from-${index}`} className="text-sm font-medium text-gray-700">
                          From
                        </label>
                        <select
                          name="from"
                          id={`as-from-${index}`}
                          value={String(as.from)} // Ensure value is a string for select element
                          onChange={(e) =>
                            // Pass the change event to the handler
                            handleASChange(index, {
                              target: {
                                name: e.target.name,
                                // Parse the value back to a number, or keep it empty/0
                                value: parseInt(e.target.value, 10) || 0
                              }
                            })
                          }
                          className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
                          required
                        >
                          <option value="0">Select Year</option>
                          {/* Generates years from current year down to 2007 */}
                          {Array.from({ length: new Date().getFullYear() - 2007 + 1 }, (_, i) => {
                            const year = new Date().getFullYear() - i;
                            return (
                              <option key={year} value={String(year)}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      {/* TO Field - Added for completeness and matching the previous component's grid layout */}
                      <div className="flex flex-col space-y-2">
                        <label htmlFor={`as-to-${index}`} className="text-sm font-medium text-gray-700">
                          To
                        </label>
                        <select
                          name="to"
                          id={`as-to-${index}`}
                          value={String(as.to)}
                          onChange={(e) =>
                            handleASChange(index, {
                              target: {
                                name: e.target.name,
                                  value: e.target.value === "" ? "" : e.target.value==="Present" ? "Present" : parseInt(e.target.value, 10),
                              },
                            })
                          }
                          className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
                          required
                        >
                          <option value="">Select Year</option>
                          <option value="Present">Present</option>
                          {Array.from({ length: new Date().getFullYear() - 2008 }, (_, i) => {
                            const year = new Date().getFullYear() - i - 1;
                            return (
                              <option key={year} value={String(year)}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    {administrativeService.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAS(index)}
                        className="absolute top-2 right-2 text-slate-600 group p-1 rounded hover:bg-red-50"
                        aria-label={`Remove Service ${index + 1}`}
                      >
                        <Trash2 size={18} />
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                          Remove
                        </span>
                      </button>
                    )}
                  </div>
                ))}

                {/* Action Buttons Section */}
                <div className="pt-4 space-y-4">
                  {/* Add More and Skip buttons */}
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={addAS}
                      className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      <span className="text-xl">+</span> Add More
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAdministrativeService([]);
                        setStep("oas");
                      }}
                      className="text-sm font-medium text-gray-500 hover:text-gray-700 p-2"
                    >
                      Skip
                    </button>
                  </div>

                  {/* Back and Next buttons */}
                  <div className="flex gap-3 justify-end border-t pt-6">
                    <button
                      type="button"
                      onClick={() => setStep("experience")}
                      className="py-2 px-4 rounded-lg border cursor-pointer hover:bg-gray-50 transition"
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      className="cursor-pointer bg-linear-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )
      }
      {
        step == "oas" && (
          <div className=" flex flex-col justify-center items-center">
            <div className="w-full lg:min-w-2xl max-w-xl bg-white rounded-2xl shadow-xl lg:p-8 p-4 text-center">
              <h1
                style={{ fontFamily: "Times New Roman, serif" }}
                className="text-2xl font-semibold mb-6"
              >
                Administrative Service in other Institute
              </h1>

              {/* The form container maintains the vertical spacing and centering */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Other Administrative Services :", otherAdministrativeService);
                  navigate("/");
                }}
                className="flex flex-col space-y-6"
              >

                {haveOAS && (
                  <div className="space-y-6">
                    {otherAdministrativeService.map((oas, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 rounded-lg relative space-y-4 text-left shadow-sm bg-gray-50"
                      >
                        <h2 className="text-lg font-medium text-center mb-3 pb-2 text-gray-800">
                          Service {index + 1}
                        </h2>

                        <InputField
                          label="Institute"
                          name="institute"
                          value={oas.institute}
                          onChange={(e) => handleOASChange(index, e)}
                          required
                        />

                        <InputField
                          label="Designation"
                          name="designation"
                          value={oas.designation}
                          onChange={(e) => handleOASChange(index, e)}
                          required
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <InputField
                            label="From"
                            type="number"
                            name="from"
                            min="1900"
                            max={new Date().getFullYear()}
                            value={oas.from}
                            onChange={(e) =>
                              handleOASChange(index, {
                                target: {
                                  name: e.target.name,
                                  value: parseInt(e.target.value, 10) || "",
                                },
                              })
                            }
                            required
                          />
                          <InputField
                            label="To"
                            type="number"
                            name="to"
                            min="1900"
                            max={new Date().getFullYear()}
                            value={oas.to}
                            onChange={(e) =>
                              handleOASChange(index, {
                                target: {
                                  name: e.target.name,
                                  value: e.target.value === "" ? "" : e.target.value === "Present" ? "Present" : parseInt(e.target.value, 10),
                                },
                              })
                            }
                            required
                          />
                        </div>

                        {otherAdministrativeService.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeOAS(index)}
                            className="absolute top-2 right-2 text-slate-600 group p-1 rounded hover:bg-red-50"
                            aria-label={`Remove Service ${index + 1}`}
                          >
                            <Trash2 size={18} />
                            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                              Remove
                            </span>
                          </button>
                        )}
                      </div>
                    ))}

                    {/* Add More Button */}
                    <div className="flex justify-start">
                      <button
                        type="button"
                        onClick={addOAS}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        <span className="text-xl">+</span> Add More
                      </button>
                    </div>
                  </div>
                )}
                {/* Checkbox for No Service */}
                <div className="flex items-center space-x-2 text-left text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={!haveOAS}
                    onChange={() => {
                      if (!haveOAS) {
                        // If checking 'No Service', clear data and set flag
                        setOtherAdministrativeService([{ institute: "", from: "", to: "", designation: "" }]);
                      } else {
                        // If unchecking 'No Service', add a blank row if list is empty
                        if (otherAdministrativeService.length === 0) {
                          addOAS();
                        }
                      }
                      setHaveOAS((prev) => !prev);
                    }}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label className="text-gray-700">
                    I do not have any Administrative Service in other Institutes
                  </label>
                </div>


                {/* Navigation Buttons */}
                <div className="flex gap-3 justify-end border-t pt-6">
                  <button
                    type="button"
                    onClick={() => setStep("as")}
                    className="py-2 px-4 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer bg-linear-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition"
                  >
                    Finish Registration
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }

    </div>
  )
}