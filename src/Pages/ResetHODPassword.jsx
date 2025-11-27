import React from 'react'
import { RotateCcwKey } from "lucide-react";
import InputField from "../components/inputField";
import { useNavigate } from 'react-router-dom';

export default function ResetHODPassword() {

    const [data, setData] = React.useState({
        department: "",
        pass: "",
        newPass: "",
    });

    const [cPass,setCPass] = React.useState("");
    const [errors, setErrors] = React.useState({});
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (data.newPass.length < 8) newErrors.newPass = "Password must be at least 8 characters";
        if (data.newPass !== cPass) newErrors.Cpass = "Passwords do not match";
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        console.log(data)
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
                <h2 className="text-2xl font-bold text-gray-900"> Reset Password</h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-5 text-left">
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
                                <option value="bshss">BS & HSS</option>
                                <option value="cse">Computer Science & Engineering</option>
                                <option value="ece">Electronics & Communication Engineering</option>
                                <option value="eee">Electrical & Electronics Engineering</option>
                                <option value="civil">Civil Engineering</option>
                                <option value="it">Inforamtion Technology</option>
                                <option value="met">Metallurgical Engineering</option>
                                <option value="mech">Mechanical Engineering</option>
                                <option value="mech">Master's in Business Administration</option>
                                <option value="pharma">Pharmaceutical Sciences</option>
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
                            onChange={(e)=>setCPass(e.target.value)}
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition"
                    >
                        Reset
                    </button>
                </form>
            </div>
        </div>
    )
}
