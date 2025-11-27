import React from 'react'
import { User, Lock, RotateCcwKey, LogIn, KeyRound, CircleHelpIcon } from "lucide-react";
import InputField from "../components/inputField";
import { useNavigate } from 'react-router-dom';
import { div } from 'framer-motion/client';

export default function ResetPassword() {

    const [data,setData] = React.useState({
        email: "",
        pass: "",
        newPass: "",
        Cpass: ""
    });
    const [admin,setadmin] = React.useState({
        currentpassKey: "",
        newPassKey: "",
        CpassKey: ""
    });
    const [hod,sethod] = React.useState({
        department: "",
        passKey: "",
        newPassKey: "",
        CpassKey: ""
    });
    const userdetails=["Email","Old Password","New Password ","confirm new  password"]
    const admindetails=["Present pass Code","new Passcode","Confirm new passCode"]
    const hoddetails=["department","present passKey ","newPasskey ","Confirm new passKey"]
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
                    {userdetails.map(child=>
                        <div>
                            <InputField
                            label={child}
                            type="text"
                            value={data.email}
                            id={child}
                            placeholder={`Enter  ${child}`}
                            onChange={handleChange}
                            error={errors.email}>
                            </InputField>
                        </div>
                    )}
                    {/* Username */}
                    
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

// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function ResetPassword() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [p1, setP1] = useState("");
//   const [p2, setP2] = useState("");
//   const [err, setErr] = useState("");

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     if (p1 !== p2) return setErr("Passwords do not match");

//     await axios.post("http://localhost:5000/api/auth/reset-password", {
//       email: state.email,
//       newPassword: p1
//     });

//     navigate("/login");
//   };

//   return (
//     <div className="flex justify-center items-center p-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
//         <h2 className="text-xl font-bold mb-4">Reset Password</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="password"
//             placeholder="New Password"
//             className="w-full border p-2 rounded mb-2"
//             onChange={(e) => setP1(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Confirm Password"
//             className="w-full border p-2 rounded"
//             onChange={(e) => setP2(e.target.value)}
//           />

//           {err && <p className="text-red-500 text-sm">{err}</p>}

//           <button className="w-full bg-green-600 text-white p-2 rounded mt-4">
//             Update Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
