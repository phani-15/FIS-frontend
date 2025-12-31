import React from 'react'
import { KeyRound } from "lucide-react";
import InputField from '../components/inputField';

export default function PasswordChange() {

	const [data, setData] = React.useState({
		OTP: "",
		password: "",
		confirmPassword: ""
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

	const handleSubmit = (e) => {
		e.preventDefault();
		const newErrors = {}
		if (data.password.length < 10) newErrors.password = "Password must be at least 10 characters";
		if (data.password !== data.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
		setError(newErrors);
		if (Object.keys(newErrors).length > 0) return;
		alert("Password changed successfully!")
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
				<h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>

				{/* Form */}
				<form className="mt-8 space-y-5 text-left">

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
									onWheel={(e) => e.target.blur()}
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
										value={data.password}
										id="password"
										placeholder="Choose new password"
										onChange={handleChange}
										error={error.password}
									/>
									<InputField
										label="Confirm New Password"
										type="password"
										value={data.confirmPassword}
										id="confirmPassword"
										placeholder="Re-Enter new password"
										onChange={handleChange}
										error={error.confirmPassword}
									/>
									<button
										onClick={handleSubmit}
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
