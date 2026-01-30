import React from 'react'
import { RotateCcwKey } from "lucide-react";
import InputField from "../components/inputField";
import { useNavigate } from 'react-router-dom';
import { departments } from "../assets/Data";
import { passwordchange } from '../core/forgotPassword';

export default function ResetHODPassword() {

    const [data, setData] = React.useState({
        department: "",
        pass: "",
        newPass: "",
    });
     const [message, setMessage] = React.useState({});
        const fields = [
            { id: 'department', label: 'dept', type: 'text', placeholder: 'Enter your department' },
            { id: 'pass', label: 'Old Password', type: 'password', placeholder: 'Enter your old password' },
            { id: 'newPass', label: 'New Password', type: 'password', placeholder: 'Enter new password' },
            { id: 'Cpass', label: 'Confirm New Password', type: 'password', placeholder: 'Re-enter new password' },
        ];
    const [cPass, setCPass] = React.useState("");
    const [errors, setErrors] = React.useState({});
    const [college, setCollege] = React.useState("");

    const depts = {
    ucev :departments,
    pharma  : [
      { name: "Pharmaceutical Sciences", code: "pharma" },
    ],
  }

    const navigate = useNavigate();
    const handleSubmit =async  (e) => {
        e.preventDefault();
        const newErrors = {};
        if (data.newPass.length < 8) newErrors.newPass = "Password must be at least 8 characters";
        if (data.newPass !== cPass) newErrors.Cpass = "Passwords do not match";
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
         try {
                    const response = await passwordchange(data.department, data.pass, data.newPass,"hod");
                    if (response?.error) {
                        setMessage((prev) => ({ ...prev, error: response.error }));
                        return;
                    }
                    setMessage((prev) => ({ ...prev, success: "Password reset successful" }));
                    navigate('/');
                } catch (err) {
                    setMessage((prev) => ({ ...prev, error: "Failed to change password" }));
                }
                setMessage({ success: "Password reset successful" });
                z
        navigate('/hod');
    }
    const handleChange = (e) => {
        const { id, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }
    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">

                {/* Top Icon */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-purple-100 rounded-xl shadow-sm">
                        <RotateCcwKey className="w-8 h-8 text-purple-600" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900"> Update Password</h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-5 text-left">
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
                    {/* Username */}
                    <div>
                        <div className="relative">
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
                                {college && depts[college].map((dept) => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                        <div id="emptydepartment"></div>
                    </div>

                    {/* Password */}
                    <div>
                        <InputField
                            label="Current Password"
                            type="password"
                            id="pass"
                            value={data.pass}
                            error={errors.pass}
                            placeholder="Enter your password"
                            onChange={handleChange}
                        />
                    </div>

                    <div>

                        <InputField
                            label="New Password"
                            type="password"
                            id="newPass"
                            value={data.newPass}
                            placeholder="Choose a new password"
                            onChange={handleChange}
                            error={errors.newPass}
                        />
                    </div>

                    <div>

                        <InputField
                            label="Confirm Password"
                            type="password"
                            value={cPass}
                            id="Cpass"
                            error={errors.Cpass}
                            placeholder="Re-Enter the new password"
                            onChange={(e) => setCPass(e.target.value)}
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition"
                    >
                        Update
                    </button>
                    <p onClick={() => navigate('/forgotHODpassword')} className="text-end text-blue-800 hover:underline cursor-pointer ">Forgot Password </p>

                </form>
            </div>
        </div>
    )
}
