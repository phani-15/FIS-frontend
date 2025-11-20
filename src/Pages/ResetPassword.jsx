import React from 'react'
import { User, Lock, RotateCcwKey, LogIn, KeyRound } from "lucide-react";
import InputField from "../components/inputField";
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {

    const [data,setData] = React.useState({
        email: "",
        pass: "",
        newPass: "",
        Cpass: ""
    });

    const [errors, setErrors] = React.useState({});
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if(data.newPass.length < 8) newErrors.newPass = "Password must be at least 8 characters";
        if(data.newPass !== data.Cpass) newErrors.Cpass = "Passwords do not match";
        setErrors(newErrors);
        if(Object.keys(newErrors).length > 0) return;
        console.log(data)
        navigate('/');
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
                        <InputField
                            label="Email"
                            type="text"
                            value={data.email}
                            id="email"
                            placeholder="Enter registered email address"
                            onChange={handleChange}
                            error={errors.email}
                        />
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
                            value={data.Cpass}
                            id="Cpass"
                            error={errors.Cpass}
                            placeholder="Re-Enter the new password"
                            onChange={handleChange}
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition"
                    >
                        Reset
                    </button>
                    <p onClick={()=>navigate('/pc')} className='text-end text-blue-700 hover:underline'>forgot Password</p>
                </form>
            </div>
        </div>
    )
}
