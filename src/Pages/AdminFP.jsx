import React from 'react'
import { KeyRound } from "lucide-react";
import InputField from '../components/inputField';
import { forgotPassword,verifyOtp,resetPassword } from '../core/forgotPassword';
import { useNavigate } from 'react-router-dom';

export default function PasswordChange() {

	const [data, setData] = React.useState({
		role:"admin",
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
	  const [otpToken, setOtpToken] = React.useState(false);
  const [message, setMessage] = React.useState({});
  const navigate = useNavigate();



const [isgenerating, setIsgenerating] = React.useState(false);
  const handleSubmit = (e) => {
	e.preventDefault();
	const newErrors = {};

	if (data.password.length < 8) {
	  newErrors.password = "Password must be atleast 8 characters";
	}

	if (data.password !== data.confirmPassword) {
	  newErrors.confirmPassword = "Passwords do not match";
	}

	setError(newErrors);

	if (Object.keys(newErrors).length > 0) return;

	alert("Password Updated Successfully");
	navigate("/admin");
  };
  const handleGenerateOTP = async () => {
	  setIsgenerating(true);
	  const response = await forgotPassword(data.role,"admin");
	  if (response?.error) {
		  setMessage({})
		setMessage((prev) => ({
		  ...prev,
		  error: response.error,
		}));
		return;
	  }
  
	  if (!response.otpToken) {
		  setMessage({})
		setMessage(prev =>({
		...prev,
		error : "Address not found"
	  }))
		return;
	  }
  
	  setOtpToken(response.otpToken);
	  setClicked(true);
		  setMessage({})
	  setMessage((prev) => ({
		...prev,
		success: "OTP sent successfully",
	  }));
	};
	const handleVerifyOTP = async () => {
	  const response = await verifyOtp(otpToken, data.OTP);
  
	  if (response.error) {
		  setMessage({})
		setMessage((prev) => ({
		  ...prev,
		  error: response.error,
		}));
		return;
	  }
		  setMessage({})
  
	  setMessage((prev) => ({
		...prev,
		success: "OTP verified successfully",
	  }));
	  setOtpVerified(true);
	};
	const passwordreset = async () => {
	  if (!otpVerified) {
		  setMessage({})
		setMessage((prev) => ({
		  ...prev,
		  error: "OTP not verrified",
		}));
		return;
	  }
  
	  if (data.password.length < 8) {
		  setMessage({})
		setMessage((prev) => ({
		  ...prev,
		  error: "Password must be atleast 8 characters",
		}));
		return;
	  }
  
	  if (data.password !== data.confirmPassword) {
		  setMessage({})
		setMessage((prev) => ({
		  ...prev,
		  error: "Confirm Password must be same as new Password",
		}));
		return;
	  }
  
	  try {
		const response = await resetPassword(otpToken, data.password);
  
		if (response.error) {
		  setMessage({})
		  setMessage((prev) => ({
			...prev,
			error: response.error,
		  }));
		  // navigate("/");
		  return;
		}
  
		
		alert("Password reset successful");
		navigate('/admin');
	  } catch (err) {
		  console.log(err)
		  setMessage({})
		setMessage((prev) => ({
		  ...prev,
		  error:err.msg
		}));
	  
	  }
	};
   
  
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
				<form onSubmit={(e) => { e.preventDefault(); passwordreset(); }} className="mt-8 space-y-5 text-left">

					{/* Submit Button */}
					{!clicked &&
						<button
							onClick={handleGenerateOTP}
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
									onClick={handleVerifyOTP}
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
										type="submit"
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
