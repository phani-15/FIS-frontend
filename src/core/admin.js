import { API } from "../backend"
import { isAuthenticated } from "../core/auth"
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
  const { token } = isAuthenticated();
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


export const getRequests = async (userId) => {
  try {
    const { token } = isAuthenticated()
    const response = await fetch(`${API}/request/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const acceptRequest = async (userId, token, rid) => {
  try {
    const { token } = isAuthenticated()
    const response = await fetch(`${API}/requestac/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ rid })
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export const rejectRequest = async (userId, token, rid) => {
  try {
    const { token } = isAuthenticated()
    const response = await fetch(`${API}/requestrej/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ rid })
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}


export const addfaculty=async (obj)=>{
  const {token}=isAuthenticated();
  const response=await fetch(`${API}/dummyreg`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      // Authorization:`Bearer ${token}`
    },
    body:JSON.stringify(obj)
  })
  return response.json()
}