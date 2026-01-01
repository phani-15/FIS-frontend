import {API} from "../backend"
import {isAuthenticated} from "../core/auth"
export const adminlogin = async user => {
  console.log("SENDING TO BACKEND:", user); // 👈 ADD THIS

  return await fetch(`${API}/admin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  .then(res => res.json())
  .catch(err => console.log("error is ", err));
};


export const AdminDashboard = async (id) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/admin/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (err) {
    console.log("error is ", err);
  }
};

