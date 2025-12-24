import React, { useState } from "react";
import { User, Lock, LogIn, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {login,authenticate,isAuthenticated} from "../core/auth"
import { error, values } from "pdf-lib";

export default function Login() {

	const [formData, setFormData] = useState({
		username: "vi2@gmail.com",
		password: "1234567890",
	});

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));

		document.getElementById("empty"+id).innerHTML = "";
	};

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.username) {
			document.getElementById("emptyusername").innerHTML = "<p class='text-red-600 text-sm'>Username is required</p>";
			return;
		}
		if(!formData.password){
			document.getElementById("emptypassword").innerHTML = "<p class='text-red-600 text-sm'>Password is required</p>";
			return;
		}
		//console the type of formData.username whether mail or a string of 10 digits
		if (/^\d{10}$/.test(formData.username)) {
			console.log("Phone number");
		} else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.username)) {
			console.log("Email");
		}
		else{
			document.getElementById("emptyusername").innerHTML = "<p class='text-red-600 text-sm'>Enter a valid email or phone number</p>";
			return;
		}
		// 🚀 You can send formData to your backend API here
		await login({
			email:formData.username,
			password:formData.password
		})
		.then(data=>{
			authenticate(data,()=>{
			setFormData({
				...formData
			})
		})
		navigate(`/profile/${data.user.id}`)
		}	)
		// console.log("login returned data:",data);
		
	};

	return (
		<div className="flex justify-center items-center p-4">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">

				{/* Top Icon */}
				<div className="flex justify-center mb-6">
					<div className="p-4 bg-purple~-100 rounded-xl shadow-sm">
						<Lock className="w-8 h-8 text-purple-600" />
					</div>
				</div>

				{/* Title */}
				<h2 className="text-2xl font-bold text-gray-900"> Login</h2>
				<p className="text-gray-600 text-sm mt-1">
					Faculty Information System
				</p>

				{/* Form */}
				<form onSubmit={handleSubmit} className="mt-8 space-y-5 text-left">
					{/* Username */}
					<div>
						<label
							htmlFor="username"
							className="block mb-1 text-sm font-medium text-gray-700"
						>
							Email / Phone number
						</label>
						<div className="relative">
							<span className="absolute left-3 top-2.5 text-gray-400">
								<User className="w-5 h-5" />
							</span>
							<input
								type="text"
								id="username"
								onChange={handleChange}
								placeholder="Enter your username"
								className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 "
							/>
							<div id="emptyusername"></div>
						</div>
					</div>

					{/* Password */}
					<div>
						<div className="flex justify-between">
							<label
							htmlFor="password"
							className="block mb-1 text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<p onClick={()=>navigate('/fp')} className="cursor-pointer hover:underline text-violet-800 font-normal">Forgot Password?</p>
						</div>
						<div className="relative">
							<span className="absolute left-3 top-2.5 text-gray-400">
								<KeyRound className="w-5 h-5" />
							</span>
							<input
								type="password"
								id="password"
								onChange={handleChange}
								placeholder="Enter your password"
								className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1"
							/>
							<div id="emptypassword"></div>
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
					<p className="text-center">New user ? <span className="text-blue-800 cursor-pointer hover:underline" onClick={() => navigate('/register')}>Register</span></p>
					<p className="mt-2 hover:underline cursor-pointer text-center text-violet-700" onClick={()=>navigate('/rp')}>Reset Password</p>
				</form>
			</div>
		</div>
	);
}