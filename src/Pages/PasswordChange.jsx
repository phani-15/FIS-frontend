import React from 'react'
import { User, Lock, LogIn, KeyRound } from "lucide-react";
import { div } from 'framer-motion/client';

export default function PasswordChange() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Password changed successfully!")
    }

    const handleChange = (e) => {
        document.getElementById("empty" + e.target.id).innerHTML = ""
    }

    const [clicked, setClicked] = React.useState(false)
    const [mail, setMail] = React.useState("")
    const [otpVerified, setOtpVerified] = React.useState(false)

    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">

                {/* Top Icon */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-purple-100 rounded-xl shadow-sm">
                        <Lock className="w-8 h-8 text-purple-600" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-5 text-left">
                    {/* Prompting email */}
                    <div>
                        <label
                            htmlFor="mail"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            e-mail Address
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-400">
                                <User className="w-5 h-5" />
                            </span>
                            <input
                                type='email'
                                id="mail"
                                onChange={handleChange}
                                placeholder="Enter your registered email"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 "
                            />
                        </div>
                        <div id="emptyusername"></div>
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
                                <label
                                    htmlFor="OTP"
                                    className="block mb-1 text-sm font-medium text-gray-700"
                                >
                                    OTP
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-gray-400">
                                        <User className="w-5 h-5" />
                                    </span>
                                    <input
                                        type='email'
                                        id="mail"
                                        onChange={handleChange}
                                        placeholder="enter OTP"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 "
                                    />
                                </div>
                                <div id="emptyOTP"></div>
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
                                    <label
                                        htmlFor="password"
                                        className="block mb-1 mt-4 text-sm font-medium text-gray-700"
                                    >
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-gray-400">
                                            <User className="w-5 h-5" />
                                        </span>
                                        <input
                                            type='text'
                                            onChange={handleChange}
                                            placeholder="Choose new password"
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 "
                                        />
                                    </div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block mt-4 mb-1 text-sm font-medium text-gray-700"
                                    >
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-gray-400">
                                            <User className="w-5 h-5" />
                                        </span>
                                        <input
                                            type='text'
                                            onChange={handleChange}
                                            placeholder="Re-Enter new password"
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 "
                                        />
                                    </div>
                                    <button
                                    onClick={() => {
                                        setOtpVerified(true)
                                        // verify the otp in the backend
                                    }}
                                    className="w-full mt-6 flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition"
                                >
                                    Update Password
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
