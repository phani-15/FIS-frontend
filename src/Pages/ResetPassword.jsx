import React from 'react'
import { User, Lock, RotateCcwKey, LogIn, KeyRound } from "lucide-react";

export default function ResetPassword() {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Password is reset successfully")
    }
    const handleChange = (e) => {
        console.log("this function handles the change")
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
                        <label
                            htmlFor="username"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-400">
                                <User className="w-5 h-5" />
                            </span>
                            <input
                                type="text"
                                id="username"
                                onChange={handleChange}
                                placeholder="Enter registered email address"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 "
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex justify-between">
                            <label
                                htmlFor="password"
                                className="block mb-1 text-sm font-medium text-gray-700"
                            >
                                Current	Password
                            </label>
                        </div>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-400">
                                <KeyRound className="w-5 h-5" />
                            </span>
                            <input
                                type="password"
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <div className="flex justify-between">
                            <label
                                htmlFor="newPassword"
                                className="block mb-1 text-sm font-medium text-gray-700"
                            >
                                New	Password
                            </label>
                        </div>
                        <div className="relative"> 
                            <input
                                type="password"
                                onChange={handleChange}
                                placeholder="Choose a new password"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between">
                            <label
                                htmlFor="password"
                                className="block mb-1 text-sm font-medium text-gray-700"
                            >
                                Confirm	Password
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                onChange={handleChange}
                                placeholder="Re-Enter the new password"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1"
                            />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition"
                    >
                        Login
                        <LogIn className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    )
}
