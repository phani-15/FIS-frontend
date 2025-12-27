import React from 'react'
import { KeyRound } from "lucide-react";
import InputField from '../components/inputField';

export default function ForgotHODpassword() {

    const [data, setData] = React.useState({
        department: "",
        OTP: "",
        npassword: "",
        cpassword: ""
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }

    const [clicked, setClicked] = React.useState(false)
    const [otpVerified, setOtpVerified] = React.useState(false)
    const [error, setError] = React.useState({})
    const [college, setCollege] = React.useState("");

    const departments = {
        ucev: [
            { name: "Civil Engineering", code: "civil" },
            { name: "Computer Science & Engineering", code: "cse" },
            { name: "Electronics & Communication Engineering", code: "ece" },
            { name: "Electrical & Electronics Engineering", code: "eee" },
            { name: "Information Technology", code: "it" },
            { name: "Mechanical Engineering", code: "mech" },
            { name: "Metallurgical Engineering", code: "met" },
            { name: "BS & HSS", code: "bshss" },
            { name: "Master's in Business Administration", code: "mba" },
        ],
        pharma: [
            { name: "Pharmaceutical Sciences", code: "pharma" },
        ],
    }

    const handleSubmit = (e) => {
        console.log(data);

        e.preventDefault();
        const newErrors = {}
        if (data.npassword.length < 8) newErrors.npassword = "password must be at least 8 characters";
        if (data.npassword !== data.cpassword) newErrors.cpassword = "passwords do not match";
        setError(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        alert("password changed successfully!")
    }

    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">

                {/* Top Icon */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-purple-100 rounded-xl shadow-sm">
                        <KeyRound className="w-8 h-8 text-purple-600" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900">Forgot password</h2>

                {/* Form */}
                <form className="mt-8 space-y-5 text-left">
                    {/* Prompting email */}
                    <div>
                        <div className="relative">
                            <label className="block mb-1 text-sm font-medium text-gray-700">College</label>
                            <select
                                name="college"
                                id="college"
                                value={college}
                                onChange={(e) => setCollege(e.target.value)}
                                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500"
                                required
                            >
                                <option value="">Select College</option>
                                <option value="ucev">University College of Engineering</option>
                                <option value="pharma">College of Pharmaceutical Sciences</option>
                            </select>
                        </div>
                        <div id="emptyCollege"></div>
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Department</label>
                        <select
                            name="department"
                            id="department"
                            value={data.department}
                            onChange={handleChange}
                            className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500"
                            required
                        >
                            <option value="">Select Department</option>
                            {college && departments[college].map((dept) => (
                                <option key={dept.code} value={dept.code}>{dept.name}</option>
                            ))}
                        </select>
                    </div>
                    {/* Submit Button */}
                    {!clicked &&
                        <button
                            onClick={() => {
                                setClicked(true)
                                // send an Email containing OTP from backend or frontend
                            }}
                            className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition"
                        >
                            Generate OTP
                        </button>
                    }
                    {clicked &&
                        <div>
                            <div>
                                <InputField
                                    label="OTP"
                                    type="number"
                                    value={data.OTP}
                                    id="OTP"
                                    placeholder="Enter OTP"
                                    onChange={handleChange}
                                    error={error.OTP}
                                />
                            </div>
                            {!otpVerified &&
                                <button
                                    onClick={() => {
                                        setOtpVerified(true)
                                        // verify the otp in the backend
                                    }}
                                    className="w-full mt-6 flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition"
                                >
                                    Verify OTP
                                </button>
                            }
                            {otpVerified &&
                                <div>
                                    <InputField
                                        label="New Password"
                                        type="password"
                                        value={data.npassword}
                                        id="npassword"
                                        placeholder="Choose new password"
                                        onChange={handleChange}
                                        error={error.npassword}
                                    />
                                    <InputField
                                        label="Confirm New Password"
                                        type="password"
                                        value={data.cpassword}
                                        id="cpassword"
                                        placeholder="Re-Enter new password"
                                        onChange={handleChange}
                                        error={error.cpassword}
                                    />
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full mt-6 flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition"
                                    >
                                        Update password
                                    </button>
                                </div>
                            }
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}
