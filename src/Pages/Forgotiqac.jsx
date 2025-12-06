import React from 'react'
import { KeyRound } from "lucide-react";
import InputField from '../components/inputField';
import { useNavigate } from 'react-router-dom';

export default function Forgotiqac() {

    const [data, setData] = React.useState({
        department: "",
        OTP: "",
        npassword: "",
        cpassword: ""
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }

    const navigate = useNavigate();

    const [clicked, setClicked] = React.useState(false)
    const [otpVerified, setOtpVerified] = React.useState(false)
    const [error, setError] = React.useState({})

    const handleSubmit = (e) => {
        console.log(data);

        e.preventDefault();
        const newErrors = {}
        if (data.npassword.length < 8) newErrors.npassword = "password must be at least 8 characters";
        if (data.npassword !== data.cpassword) newErrors.cpassword = "passwords do not match";
        setError(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        navigate("/ofc");
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
                <h2 className="text-2xl font-bold text-gray-900">Forgot password</h2>

                {/* Form */}
                <form className="mt-8 space-y-5 text-left">
                    <div>
                        {!otpVerified ?
                            <>
                                <div>
                                    <InputField
                                        label="OTP"
                                        type="number"
                                        value={data.OTP}
                                        id="OTP"
                                        placeholder="Enter OTP"
                                        onChange={handleChange}
                                        error={error.OTP}
                                    />
                                    <p className='text-sm text-end mt-2 hover:underline cursor-pointer text-blue-600'>Resend OTP</p>

                                </div>
                                <div>
                                    <p className='text-xs text-start text-red-500 mt-6 mb-2'>OTP has been sent to IQAC mail</p>
                                    <button
                                        onClick={() => {
                                            setOtpVerified(true)
                                            // verify the otp in the backend
                                        }}
                                        className="w-full cursor-pointer mt-2 flex items-center justify-center gap-2 bg-linear-to-r from-indigo-500 to-purple-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 transition"
                                    >
                                        Verify OTP
                                    </button>
                                </div>
                            </>
                            :
                            <div>
                                <InputField
                                    label="New Password"
                                    type="password"
                                    value={data.npassword}
                                    id="npassword"
                                    placeholder="Choose new password"
                                    onChange={handleChange}
                                    error={error.npassword}
                                />
                                <InputField
                                    label="Confirm New Password"
                                    type="password"
                                    value={data.cpassword}
                                    id="cpassword"
                                    placeholder="Re-Enter new password"
                                    onChange={handleChange}
                                    error={error.cpassword}
                                />
                                <button
                                    onClick={handleSubmit}
                                    className="w-full mt-6 flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition"
                                >
                                    Update password
                                </button>
                            </div>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}
