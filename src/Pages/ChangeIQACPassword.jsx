import React from 'react'
import { RotateCcwKey } from "lucide-react";
import InputField from "../components/inputField";
import { useNavigate } from 'react-router-dom';

export default function ChangeIQACPassword() {

    const [data, setData] = React.useState({
        pass: "",
        newPass: "",
    });

    const [cPass, setCPass] = React.useState("");
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
                <h2 className="text-2xl font-bold text-gray-900"> Update Password</h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-5 text-left">
                   
                    {/* Password */}
                    <div>
                        <InputField
                            label="Current Passcode"
                            type="password"
                            id="pass"
                            value={data.pass}
                            error={errors.pass}
                            placeholder="Enter your Passcode"
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
                    <p onClick={() => navigate('/forgotpass')} className="text-end mb-3 text-blue-800 hover:underline cursor-pointer ">Forgot Password </p>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    )
}
