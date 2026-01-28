import { API } from "../backend";
export const forgotPassword = async (identifier,type) => {
  try {
    const res = await fetch("http://localhost:5000/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({identifier,type}),
    });
    const data = await res.json(); 
    if (!res.ok) {
      throw new Error(data.error || data.message || "OTP request failed");
    }

    return data; 

  } catch (err) {
    console.error("Fetch error:", err);
    return { error: "Failed to fetch OTP" };
  }
};
export const verifyOtp = async (otpToken, otp) => {
  try {
    const res = await fetch(
      `${API}/verify-otp/${otpToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      }
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Verify OTP fetch error:", err);
    return { error: "Failed to verify OTP" };
  }
};
export const resetPassword = async (otpToken, password) => {
  try {
    const res = await fetch(
      `${API}/reset-password/${otpToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      }
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Reset password fetch error:", err);
    return { error: "Failed to reset password" };
  }
};

export const passwordchange = async (identifier, password, newpassword, type) => {
  try {
    const res = await fetch(`${API}/changepassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,   
        oldpassword: password,
        newpassword,
        type   
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || "Password change failed" };
    }

    return data;
  } catch (err) {
    console.error("Change password fetch error:", err);
    return { error: "Failed to change password" };
  }
};
