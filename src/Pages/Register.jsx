import React, { useState, useCallback, useEffect, useRef } from "react";
import InputField from "../components/inputField";
import { useNavigate } from "react-router-dom";
import { Trash2, Info } from "lucide-react"
import { ArrowLeft, ArrowRight } from "lucide-react";
import { register } from "../core/auth"
import { departments } from '../assets/Data.jsx';
import ProfilePictureCropper from "../components/ProfilePictureCropper";

export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState("personal"); // "signUp" | "personal" | "education" | "experience" | "as" | "oas"
  const [errors, setErrors] = useState({});
  const [haveOAS, setHaveOAS] = useState(true);

  // Profile picture states
  const [showCropper, setShowCropper] = useState(false);
  const [profileImageSrc, setProfileImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedPreview, setCroppedPreview] = useState(null);
  const fileInputRef = useRef(null);

  // const [personalData, setpersonalData] = useState({
  //   name: "",
  //   avatar: null,
  //   father: "",
  //   gender: "",
  //   DOB: "",
  //   marital: "",
  //   phone: "",
  //   area:"",
  //   city:"",
  //   designation: "",
  //   department: "",
  //   college: "",
  //   date_of_join: new Date().toISOString().slice(0, 7), // current year-month
  // });

  const obj = {
    "tenth": {
      "title": "Tenth",
      "school": "dkvnsd",
      "percentage": "",
      "year": "2009"
    },
    "twelth": {
      "title": "Intermediate/Diploma",
      "type": "Intermediate",
      "college": "hl.,h",
      "percentage": "",
      "year": "2011"
    },
    "degree": {
      "title": "Under Graduation",
      "degreeName": "vbnmvf",
      "specialization": "gjftrj",
      "percentage": "",
      "college": "klfgfdjnzs",
      "university": "mghcf",
      "year": "2013"
    },
    "pg": {
      "title": "Post Graduation",
      "course": "fbmrfxd",
      "specialization": "mgh,g",
      "percentage": "",
      "college": "gfjmxf",
      "university": "fgkmcd",
      "year": "2009"
    },
    "phd": [
      {
        "specialization": "cv nfgnfs",
        "under_the_proffessor": "",
        "department": "dsdfbga",
        "University": "dfbarb",
        "year": "2023"
      },
      {
        "specialization": "gmmx",
        "under_the_proffessor": "",
        "department": "sdgfsdh",
        "University": "fmsfghmsf",
        "year": "2023"
      },
      {
        "specialization": "fddns",
        "under_the_proffessor": "sfrnmfgns",
        "department": "fdhsdhfd",
        "University": "radhafdbz",
        "year": "2000"
      }
    ],
    "postdoc": [
      {
        "specialization": "AI/ML",
        "under_the_proffessor": "Sukumar",
        "University": "KL University",
        "year": "2020"
      },
      {
        "specialization": "Deep Learning",
        "under_the_proffessor": "Surya",
        "University": "AKNU",
        "year": "2022"
      }
    ]
  }

  const [personalData, setpersonalData] = useState({
    name: "Srinivas Rao polavarapu",
    avatar: null,
    father: "nothing",
    gender: "female",
    DOB: "",
    marital: "married",
    phone: "1234567896",
    area: "kukatpallyground",
    city: "hyderabadcity",
    designation: "professor",
    department: "Computer Science and Engineering",
    college: "JNTUGV-CEV",
    date_of_join: new Date().toISOString().slice(0, 7), // current year-month
  });

  const [loginData, setLoginData] = useState({
    password: "",
    email: "",
    phone: "",
    cPassword: ""
  })

  // const [education, setEducation] = useState(obj);
  const [education, setEducation] = useState({
    tenth: { title: "Tenth", school: "", percentage: "", year: "", },
    twelth: { title: "Intermediate/Diploma", type: "", college: "", percentage: "", year: "", },
    degree: { title: "Under Graduation", degreeName: "", specialization: "", percentage: "", college: "", university: "", year: "", },
    pg: { title: "Post Graduation", course: "", specialization: "", percentage: "", college: "", university: "", year: "" },
  });


  const [havePhD, setHavePhD] = useState(false);
  const [havePostDoc, setHavePostDoc] = useState(false);

  const [experience, setExperience] = useState([
    { institute: "", type: "", designation: "", from: "", to: "" }
  ])

  const [PhDs, setPhDs] = useState([]);
  // const [PhDs, setPhDs] = useState(obj.phd || []);
  const [PostDocs, setPostDocs] = useState([]);
  // const [PostDocs, setPostDocs] = useState(obj.postdoc || []);

  const [administrativeService, setAdministrativeService] = useState([
    { designation: "", level: "", from: "", to: "" }
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

  const validateOAS = () => {
    const newErrors = {};
    otherAdministrativeService.forEach((oas, index) => {
      if (!haveOAS) return; // skip if not applicable
      if (!oas.institute.trim()) newErrors[`otherAdministrativeService.${index}.institute`] = "Institute is required";
      if (!oas.designation.trim()) newErrors[`otherAdministrativeService.${index}.designation`] = "Designation is required";
      if (!oas.from || oas.from === "0") newErrors[`otherAdministrativeService.${index}.from`] = "From year is required";
      if (!oas.to) newErrors[`otherAdministrativeService.${index}.to`] = "To year is required";
      else if (parseInt(oas.from) > parseInt(oas.to)) {
        newErrors[`otherAdministrativeService.${index}.to`] = "'To' year cannot be earlier than 'From' year.";
      }
    });
    return newErrors;
  };

  const handleExperienceChange = useCallback((index, e) => {
    const { name, value } = e.target;
    setExperience((prev) => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  }, []);

  // Remove profile picture
  const handleRemoveProfilePicture = () => {
    setCroppedImage(null);
    setCroppedPreview(null);
    setProfileImageSrc(null);
    setpersonalData(prev => ({ ...prev, avatar: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Clean up URLs when component unmounts
  useEffect(() => {
    return () => {
      if (croppedPreview) {
        URL.revokeObjectURL(croppedPreview);
      }
    };
  }, [croppedPreview]);

  const validateAS = () => {
    const newErrors = {};
    administrativeService.forEach((as, index) => {
      if (!as.designation.trim()) {
        newErrors[`administrativeService.${index}.designation`] = "Designation is required";
      }
      if (!as.level.trim()) {
        newErrors[`administrativeService.${index}.level`] = "Level is required";
      }
      if (!as.from || as.from === "0") {
        newErrors[`administrativeService.${index}.from`] = "From year is required";
      }
      if (!as.to || as.to === "") {
        newErrors[`administrativeService.${index}.to`] = "To year is required";
      } else if (as.to !== "Present" && parseInt(as.from) > parseInt(as.to)) {
        newErrors[`administrativeService.${index}.to`] = "'To' year must be greater than or equal to 'From' year";
      }
    });
    return newErrors;
  };

  const test = async () => {
    const obj1 = {
      "loginData": {
        "email": "srinu477@gmail.com",
        "password": "1234567890",
      },
      "personalData": personalData,
      "education": {
        "tenth": {
          "percentage": "88%",
          "school": "St. John's High School",
          "year": "2001"
        },
        "twelth": {
          "college": "Narayana Junior College",
          "percentage": "92%",
          "type": "Intermediate",
          "year": "2003"
        },
        "degree": {
          "college": "ABC Degree College",
          "degreeName": "B.Tech",
          "percentage": "75%",
          "specialization": "Computer Science",
          "title": "Graduate in Computer Science",
          "university": "JNTU Hyderabad",
          "year": "2007"
        },
        "pg": {
          "college": "XYZ College of Engineering",
          "course": "M.Tech",
          "percentage": "82%",
          "specialization": "Software Engineering",
          "university": "Osmania University",
          "year": "2009"
        },
        "phd": [
          {
            "University": "IIT Bombay",
            "department": "Computer Science",
            "specialization": "Machine Learning",
            "under_the_proffessor": "Dr. S. Raman",
            "year": 2015
          },
          {
            "University": "IISC Bangalore",
            "department": "Artificial Intelligence",
            "specialization": "Deep Learning",
            "under_the_proffessor": "Dr. Anita Verma",
            "year": 2018
          }
        ],
        "postdoc": [
          {
            "University": "MIT",
            "specialization": "Neural Networks",
            "under_the_proffessor": "Dr. John Doe",
            "year": 2020
          }
        ]
      },
      "experience": [
        {
          "designation": "Assistant Professor",
          "institute": "XYZ Engineering College",
          "from": 2010,
          "to": 2015
        },
        {
          "designation": "Senior Assistant Professor",
          "institute": "ABC Institute of Technology",
          "from": 2015,
          "to": 2019
        },
        {
          "designation": "Associate Professor",
          "institute": "University College of Engineering",
          "from": 2019,
          "to": 2024
        }
      ],
      "administrativeService": [
        {
          "designation": "Department Coordinator",
          "level": "University level",
          "from": 2016,
          "to": 2018
        },
        {
          "designation": "Training & Placement Officer",
          "from": 2018,
          "to": 2020
        }
      ],
      "otheradministrativeervice": [
        {
          "designation": "Research Committee Member",
          "institute": "ABC Institute",
          "from": 2015,
          "to": "2017"
        },
        {
          "designation": "Library Committee Chair",
          "institute": "XYZ Engineering College",
          "from": 2017,
          "to": "2019"
        },
        {
          "designation": "Cultural Event Coordinator",
          "institute": "University College of Engineering",
          "from": 2020,
          "to": "2023"
        }
      ]
    }
    await register(obj1)
      .then(console.log("user saved succesfully !")
      )
    navigate("/");
  }


  // Add new experience row
  const addExperience = useCallback(() => {
    setExperience((prev) => [
      ...prev,
      { institute: "", type: "", designation: "", from: "", to: "" }
    ]);
  }, []);

  // Remove experience row
  const removeExperience = useCallback((index) => {
    setExperience((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // phone handler: keep only digits and limit to 10
  const handlePhoneChange = useCallback((e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setpersonalData((prev) => ({ ...prev, phone: digits }));
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
      setErrors({})
      return updated;
    });
  }, []);

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setProfileImageSrc(event.target.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  // Handle crop completion
  const handleCropComplete = async (croppedBlob) => {
    if (!croppedBlob) return;

    // Create a File object from the blob
    const croppedFile = new File([croppedBlob], 'profile-picture.jpg', {
      type: 'image/jpeg'
    });

    // Create preview URL
    const previewUrl = URL.createObjectURL(croppedBlob);

    setCroppedImage(croppedFile);
    setCroppedPreview(previewUrl);
    setShowCropper(false);

    // Also update personalData with the file
    setpersonalData(prev => ({ ...prev, avatar: croppedFile }));
  };

  // Handle crop cancel
  const handleCropCancel = () => {
    setShowCropper(false);
    setProfileImageSrc(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleOASChange = useCallback((index, e) => {
    const { name, value } = e.target;
    setOtherAdministrativeService(prev => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
    setErrors({})
  }, []);

  const addAS = useCallback(() => {
    setAdministrativeService(prev => [
      ...prev,
      { designation: "", level: "", from: "", to: "" }
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
    if (loginData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (loginData.password != loginData.cPassword) newErrors.Cpassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [loginData]);

  const handleSubmitPersonal = useCallback(
    (e) => {
      e.preventDefault();
      const newErrors = {};
      Object.entries(personalData).forEach(([field, val]) => {
        if (val === "" || val === null) {
          newErrors[field] = `${field} is required`
        }
      })
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        console.log(errors)
        return
      }
      setErrors({});
      console.log(personalData);

      test()
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
      if (parseInt(exp.from) > parseInt(exp.to)) {
        console.log("to-date should be less than or equal to from-date")
        newErrors[`experience.${index}.to`] = "to-date should be less than or equal to from-date"
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [experience]);

  const handleSubmitExperience = useCallback(
    (e) => {
      e.preventDefault();
      if (!validateExperience()) return;
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
    setErrors({})
  }, []);

  const handlePostDocChange = useCallback((index, e) => {
    const { name, value } = e.target;
    setErrors({})
    setPostDocs(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  }, [setPostDocs, setErrors]);


  const removePhD = useCallback((index) => {
    setPhDs(prev => prev.filter((_, i) => i !== index));
  }, []);

  const removePostDoc = useCallback((index) => {

    setErrors({})
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
      { specialization: "", under_the_proffessor: "", country: "", University: "", duration: "", year: "" }
    ]);
  }, []);

  const handleSubmitSignUp = useCallback(
    (e) => {
      e.preventDefault();
      console.log(loginData)
      if (!validateSignUp()) return;
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
        if (field === "year" && (isNaN(value) || value < 1900 || value > new Date().getFullYear())) {
          newErrors[`${level}.${field}`] = `year must be less than or equal to ${new Date().getFullYear()} and greater than 1900`;
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
          if (field === "year" && (value < 1900 || value > new Date().getFullYear())) {
            newErrors[`phd.${index}.year`] = `year must be less than or equal to ${new Date().getFullYear()} and greater than 1900`;
          }
        });
      });
    }

    //validate PostDocs
    if (havePostDoc) {
      PostDocs.forEach((postdoc, index) => {
        Object.entries(postdoc).forEach(([field, value]) => {
          if (field === "year" && (isNaN(value) || value < 1900 || value > new Date().getFullYear())) {
            newErrors[`postdoc.${index}.year`] = `year must be less than or equal to ${new Date().getFullYear()} and greater than 1900`;
          }
          if (field != 'under_the_proffessor' && (!value || value.toString().trim() === "")) {
            newErrors[`postdoc.${index}.${field}`] = `PostDoc ${index + 1} - ${field} is required`;
          }
        });
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [education, havePhD, PhDs, setErrors, havePostDoc, PostDocs]);

  const handleSubmitEducation = useCallback(
    (e) => {
      e.preventDefault();
      if (!validateEducation()) return;

      // Prepare clean updated education object
      const updatedEducation = {
        ...education,
        phd: havePhD ? [...PhDs] : [],
        postdoc: havePostDoc ? [...PostDocs] : []
      };

      // Log to verify
      console.log("Updated education:", updatedEducation);

      // Save it back to state so it can be used later
      setEducation(updatedEducation);

      setStep("experience");
    },
    [education, havePhD, havePostDoc, PhDs, PostDocs, validateEducation]
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
          type={f === "year" ? "number" : "text"}
          min={f === " year" ? 1900 : undefined}
          max={f === " year" ? new Date().getFullYear() : undefined}
          error={errors[`${levelKey}.${f}`]}
          inputMode={f === "year" ? "numeric" : f === "percentage" ? "numeric" : undefined}
          placeholder={f === "year" ? "Enter year of Completion" : `Enter ${label.toLowerCase()} ${f === "school" || f === "college" ? "name" : ""}`}
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
              name="cPassword"
              type="password"
              placeholder="re-enter password"
              value={loginData.cPassword}
              onChange={handleLoginChange}
              error={errors.Cpassword}
              required
            />

            <p className="mt-3 text-sm">Have an Account ? <span onClick={() => (navigate("/"))} className="text-blue-800 cursor-pointer mt-2">Login</span></p>

            <button
              type="submit"
              className="mt-6 cursor-pointer bg-linear-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition flex items-center gap-0.5 align-center justify-center"
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

            <div className="mb-6">
              <label className="block text-left mb-3 font-medium text-gray-700">
                Profile Picture <span className="text-red-500">*</span>
              </label>

              <div className="flex flex-col items-center space-y-4">
                {/* Preview */}
                {croppedPreview ? (
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={croppedPreview}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Hover overlay with actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveProfilePicture}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="text-center">
                      <div className="text-gray-400 mb-1">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-500">Click to upload</p>
                    </div>
                  </div>
                )}

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {/* Upload button (only shown when no image is selected) */}
                {!croppedPreview && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                  >
                    Choose File
                  </button>
                )}

                {/* Instructions */}
                <div className="text-left text-sm text-gray-600 space-y-1">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Maximum file size: 5MB
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Supported formats: JPG, PNG
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    You'll be able to crop and select the best part
                  </p>
                </div>
              </div>
              {errors.avatar && <small className="text-red-600 text-sm">{errors.avatar}</small>}
            </div>

            {/* Cropper Modal - Only show when needed */}
            {showCropper && profileImageSrc && (
              <ProfilePictureCropper
                image={profileImageSrc}
                onCropComplete={handleCropComplete}
                onCancel={handleCropCancel}
              />
            )}
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

              <div className="flex flex-col text-left space-y-2 mr-18 mt-4">
                <label htmlFor="DOB">Date of Birth:</label>
                <input type="date"
                  name="DOB"
                  id="DOB"
                  value={personalData.DOB}
                  onChange={handleChange}
                  className={`w-full pl-3 pr-3 py-2 focus:outline-none border border-gray-400 rounded-lg focus:ring-1  ${errors.DOB ? "border-red-500" : "border-gray-300 "
                    }`}
                  required
                />
                {errors.DOB && <small className="text-red-600 text-sm">{errors.DOB}</small>}

              </div>
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
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="enter your phone number"
                value={personalData.phone}
                onChange={handlePhoneChange}
                required
                className={`w-full pl-3 pr-3 py-2 focus:outline-none border border-gray-400 rounded-lg focus:ring-1  ${errors.phone ? "border-red-500" : "border-gray-300 "
                  }`}

              />
              {errors.phone && <small className="text-red-600 text-sm">{errors.phone}</small>}
            </div>
            <div className="flex flex-col text-left space-y-2 mt-4">
              <label>
                Address <span className="text-gray-600">(optional)</span>
              </label>


              <div className="flex gap-3">

                <input
                  type="text"
                  name="area"
                  placeholder="Area / Street"
                  value={personalData.area}
                  onChange={handleChange}
                  className={`w-1/2 pl-3 pr-3 py-2 border rounded-lg focus:ring-1 focus:outline-none ${errors.area ? "border-red-500" : "border-gray-300"
                    }`}
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={personalData.city}
                  onChange={handleChange}
                  className={`w-1/2 pl-3 pr-3 py-2 border rounded-lg focus:ring-1 focus:outline-none ${errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                />
              </div>

              {/* Error Messages */}
              {errors.area && (
                <small className="text-red-600 text-sm">{errors.area}</small>
              )}
              {errors.city && (
                <small className="text-red-600 text-sm">{errors.city}</small>
              )}
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
                  {departments.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
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
            <div className="flex flex-col text-left space-y-2 mt-4">
              <label htmlFor="date_of_join">Date of Join</label>
              <input
                type="month"
                id="date_of_join"
                name="date_of_join"
                value={personalData.date_of_join}
                onChange={handleChange}
                className={`w-full pl-3 pr-3 py-2 focus:outline-none border border-gray-400 rounded-lg focus:ring-1  ${errors.date_of_join ? "border-red-500" : "border-gray-300 "
                  }`}
                required
              />

              {errors.date_of_join && <small className="text-red-600 text-sm">{errors.date_of_join}</small>}
            </div>

            {/* Edit Window Notice */}
            <div className="mt-6 p-3 bg-blue-50 border border-blue-200 z-10 rounded-lg flex items-start space-x-2">
              <Info size={20} className="text-blue-600 mt-0.5 shrink-0" />
              <p className="text-sm text-blue-800">
                <strong className="mr-2">Note: </strong> You may edit your details within <strong>7 days</strong> of submission. <br /> After this period, changes will require admin approval.
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="submit"
                className="mt-6  cursor-pointer bg-linear-to-r from-purple-500 to-indigo-600 text-white p-2 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition flex items-center gap-0.5"
              >
                Next<ArrowRight size={22} strokeWidth={3} className="text-white-600" />
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
                          placeholder="enter the specialization"
                          value={phd.specialization}
                          onChange={(e) => handlePhDChange(index, e)}
                          error={errors[`phd.${index}.specialization`]}
                          required
                        />

                        <InputField
                          label="Under the Professor"
                          name="under_the_proffessor"
                          placeholder="enter your professor name"
                          value={phd.under_the_proffessor}
                          onChange={(e) => handlePhDChange(index, e)}
                          error={errors[`phd.${index}.under_the_proffessor`]}
                        />

                        <InputField
                          label="Department"
                          placeholder="enter the department"
                          name="department"
                          value={phd.department}
                          onChange={(e) => handlePhDChange(index, e)}
                          error={errors[`phd.${index}.department`]}
                        />

                        <InputField
                          label="University"
                          placeholder="enter the University"
                          name="University"
                          value={phd.University}
                          onChange={(e) => handlePhDChange(index, e)}
                          error={errors[`phd.${index}.University`]}
                          required
                        />

                        <InputField
                          label="Year of Awarded"
                          name="year"
                          placeholder="enter the year of award"
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
                          placeholder="enter the specialization"
                          value={postdoc.specialization}
                          onChange={(e) => handlePostDocChange(index, e)}
                          error={errors[`postdoc.${index}.specialization`]}
                          required
                        />

                        <InputField
                          label="Under the Professor(optional)"
                          name="under_the_proffessor"
                          placeholder="enter your professor name"
                          value={postdoc.under_the_proffessor}
                          onChange={(e) => handlePostDocChange(index, e)}
                          error={errors[`postdoc.${index}.under_the_proffessor`]}
                        />

                        <InputField
                          label="University"
                          name="University"
                          placeholder="enter the University"
                          value={postdoc.University}
                          onChange={(e) => handlePostDocChange(index, e)}
                          error={errors[`postdoc.${index}.University`]}
                          required
                        />

                        <InputField
                          label="Year"
                          name="year"
                          placeholder="enter the year"
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
              {Object.keys(errors).length > 0 && (
                <div className="text-red-500 text-sm text-left">
                  Please fix the above errors before proceeding.
                </div>
              )}
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setStep("personal")}
                  className="py-2 px-4  hover:bg-slate-200 bg-slate-100 rounded-lg border border-gray-400 cursor-pointer flex items-center gap-0.5"
                >
                  <ArrowLeft size={22} strokeWidth={3} className="text-blue-600" />Back
                </button>
                <button
                  type="submit"
                  className="mt-0 cursor-pointer bg-linear-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition flex items-center gap-0.5"
                >
                  Next<ArrowRight size={22} strokeWidth={3} className="text-white-600" />
                </button>
              </div>
            </form>

          </div>
        )
      }

      {step === "experience" && (
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 style={{ fontFamily: "Times New Roman, serif" }} className="text-2xl font-semibold mb-4">
            Professional/Research Experience
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
                {/* radio button for experience type as institute/university */}
                <div>
                  <label className="block text-md font-semibold ml-1 text-start text-gray-700 mt-2 mb-0.5">Type </label>
                  <div className="flex flex-wrap gap-4 mt-1 m-2">
                    <div>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name={`type-${index}`}
                          value="institute"
                          checked={exp.type === "institute"}
                          onChange={() =>
                            handleExperienceChange(index, {
                              target: { name: "type", value: "institute" }
                            })
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          required
                        />
                        <span className={`ml-2 ${exp.type === "institute" ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                          Institute
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name={`type-${index}`}
                          value="university"
                          checked={exp.type === "university"}
                          onChange={() =>
                            handleExperienceChange(index, {
                              target: { name: "type", value: "university" }
                            })
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          required
                        />
                        <span className={`ml-2 ${exp.type === "university" ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                          University
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* FROM Field - Corrected to use a mapped array for year generation */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor={`experience-from-${index}`} className="text-left m-2">
                      From
                    </label>
                    <select
                      name="from"
                      id={`experience-from-${index}`}
                      value={String(exp.from)} // Ensure value is a string for select element
                      onChange={(e) =>
                        // Pass the change event to the handler
                        handleExperienceChange(index, {
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
                      <option value="">Select Year</option>
                      {/* Generates years from current year down to 2007 */}
                      {Array.from({ length: 50 }, (_, i) => {
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
                    <label htmlFor={`experience-to-${index}`} className=" m-2 text-left">
                      To
                    </label>
                    <select
                      name="to"
                      id={`experience-to-${index}`}
                      value={String(exp.to)}
                      error={errors[`experience.${index}.to`]}
                      onChange={(e) =>
                        handleExperienceChange(index, {
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
                      <option value="2004">Select Year</option>
                      {Array.from({ length: 50 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <option key={year} value={String(year)}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {errors[`experience.${index}.to`] && (
                    <div className="text-red-500 text-sm col-span-2 text-left">
                      {errors[`experience.${index}.to`]}
                    </div>
                  )}
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

            <div className="w-full">

              {/* Top Row */}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={addExperience}
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
                >
                  <span className="text-xl ">+</span> Add {Object.keys(experience).length > 0 ? "More" : ""}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setExperience([]);
                    setStep("as");
                  }}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700 pl-15 -ml-[6]"
                >
                  Skip
                </button>
              </div>

              {/* Divider Line */}


              {/* Bottom Row */}
              <div className="flex gap-4 justify-end border-t pt-6">
                <button
                  type="button"
                  onClick={() => setStep("education")}
                  className="py-2 px-4 flex items-center gap-0.5 rounded-lg border border-gray-400 cursor-pointer hover:bg-gray-50 transition"
                >
                  <ArrowLeft size={22} strokeWidth={3} className="text-blue-600" />Back
                </button>

                <button
                  type="submit"
                  className="cursor-pointer flex items-center gap-0.5 bg-linear-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition"
                >
                  Next<ArrowRight size={22} strokeWidth={3} className="text-white-600 " />
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
                Administrative Service/Additional Duties in this Institute
              </h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const newErrors = validateAS();
                  setErrors(newErrors);
                  if (Object.keys(newErrors).length === 0) {
                    console.log("Administrative Service Data:", administrativeService);
                    setStep("oas");
                  }
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
                    <div className="flex flex-col text-left space-y-2 mt-4">
                      <label>Level of Service:</label>
                      <div className="flex space-x-6 mt-1">
                        {["Departmental", "College", "University"].map((level) => (
                          <label key={level} className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name={`level-${index}`}
                              value={level.toLowerCase()}
                              checked={as.level === level.toLowerCase()}
                              onChange={() =>
                                handleASChange(index, {
                                  target: { name: "level", value: level.toLowerCase() }
                                })
                              }
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                              required
                            />
                            <span className={`ml-2 ${as.level === level.toLowerCase() ? 'font-semibold text-gray-900' : 'text-gray-700'}`}> {level}</span>
                          </label>))}

                      </div>
                    </div>

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
                                value: e.target.value === "" ? "" : e.target.value === "Present" ? "Present" : parseInt(e.target.value, 10),
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
                      {errors[`administrativeService.${index}.to`] && (
                        <div className="text-red-500 text-sm col-span-2 text-left">
                          {errors[`administrativeService.${index}.to`]}
                        </div>
                      )}
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
                      <span className="text-xl ">+</span> Add More
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAdministrativeService([]);
                        setStep("oas");
                      }}
                      className="text-sm font-medium text-gray-500 hover:text-gray-700 pl-15 -ml-[6]"
                    >
                      Skip
                    </button>
                  </div>

                  {/* Back and Next buttons */}
                  <div className="flex gap-4 justify-end border-t pt-6">
                    <button
                      type="button"
                      onClick={() => setStep("experience")}
                      className="py-2 px-4 rounded-lg border border-gray-400 cursor-pointer  hover:bg-slate-200 bg-slate-100 transition flex items-center gap-0.5"
                    >
                      <ArrowLeft size={22} strokeWidth={3} className="text-blue-600" />Back
                    </button>

                    <button
                      type="submit"
                      className="cursor-pointer flex items-center gap-0.5 bg-linear-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition"
                    >
                      Next<ArrowRight size={22} strokeWidth={3} className="text-white-600 " />
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
                onSubmit={async (e) => {
                  e.preventDefault();
                  const newErrors = validateOAS();
                  setErrors(newErrors);
                  if (Object.keys(newErrors).length === 0) {
                    // Submit final data
                    const obj1 = {
                      personalData: personalData,
                      loginData: loginData,
                      education: education,
                      experience: experience,
                      administrativeService: administrativeService,
                      otherAdministrativeService: otherAdministrativeService,
                    };
                    console.log("final object is:", obj1);
                    await register(obj1).then(() => navigate("/"));
                  }
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
                          {/* FROM Field - Corrected to use a mapped array for year generation */}
                          <div className="flex flex-col space-y-2">
                            <label htmlFor={`oas-from-${index}`} className="text-sm font-medium text-gray-700">
                              From
                            </label>
                            <select
                              name="from"
                              id={`oas-from-${index}`}
                              value={String(oas.from)} // Ensure value is a string for select element
                              onChange={(e) =>
                                // Pass the change event to the handler
                                handleOASChange(index, {
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
                            <label htmlFor={`oas-to-${index}`} className="text-sm font-medium text-gray-700">
                              To
                            </label>
                            <select
                              name="to"
                              id={`as-to-${index}`}
                              value={String(oas.to)}
                              onChange={(e) =>
                                handleOASChange(index, {
                                  target: {
                                    name: e.target.name,
                                    value: e.target.value === "" ? "" : parseInt(e.target.value, 10),
                                  },
                                })
                              }
                              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
                              required
                            >
                              <option value="">Select Year</option>
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
                          {errors[`otherAdministrativeService.${index}.to`] && (
                            <div className="text-red-500 text-sm col-span-2 text-left">
                              {errors[`otherAdministrativeService.${index}.to`]}
                            </div>
                          )}
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
                    className="py-2 px-4 rounded-lg border border-gray-400 cursor-pointer  hover:bg-slate-200 bg-slate-100 transition flex items-center gap-0.5"
                  >
                    <ArrowLeft size={22} strokeWidth={3} className="text-blue-600 " />Back
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