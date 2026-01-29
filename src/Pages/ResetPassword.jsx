import React from 'react'
import { RotateCcwKey } from "lucide-react";
import InputField from "../components/inputField";
import { useNavigate } from 'react-router-dom';
import { passwordchange } from "../core/forgotPassword";

export default function ResetPassword() {

    const [data,setData] = React.useState({
        email: "",
        pass: "",
        newPass: "",
        Cpass: ""
    });

    const [message, setMessage] = React.useState({});
    const fields = [
        { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter your registered email' },
        { id: 'pass', label: 'Old Password', type: 'password', placeholder: 'Enter your old password' },
        { id: 'newPass', label: 'New Password', type: 'password', placeholder: 'Enter new password' },
        { id: 'Cpass', label: 'Confirm New Password', type: 'password', placeholder: 'Re-enter new password' },
    ];
    const [errors, setErrors] = React.useState({});
    const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};
  if (!data.newPass || data.newPass.length < 8)
    newErrors.newPass = "Password must be at least 8 characters";
  if (data.newPass !== data.Cpass)
    newErrors.Cpass = "Passwords do not match";

  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  setMessage({});

  try {
    const response = await passwordchange(
      data.email,
      data.pass,
      data.newPass,
      "faculty"
    );

    if (response?.error) {
      setMessage({ error: response.error });
      return;
    }

    setMessage({ success: "Password reset successful" });

    setTimeout(() => {
      navigate('/');
    }, 1500);

  } catch (err) {
    setMessage({ error: "Failed to change password" });
  }
};

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
        setMessage({});
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
                    {fields.map(field => (
                        <div key={field.id}>
                            <InputField
                                label={field.label}
                                type={field.type}
                                value={data[field.id]}
                                id={field.id}
                                placeholder={field.placeholder}
                                onChange={handleChange}
                                error={errors[field.id]}
                                required
                            />
                        </div>
                    ))} 
                    {/* Username */}
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition"
                       
                    >
                        Reset
                    </button>
                    
                    <p onClick={()=>navigate('/fp')} className='text-end text-blue-700 hover:underline cursor-pointer'>forgot Password</p>
                    {message && (
                        <div>
                            {message.error && <p className="text-sm text-red-500">{message.error}</p>}
                            {message.success && <p className="text-sm text-green-600">{message.success}</p>}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}
