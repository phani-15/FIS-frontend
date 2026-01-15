// Personal.js
import { API } from "../backend";
import { isAuthenticated } from "./auth";

export const Personal = async (id) => {
  const { token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/personal/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.log("error is ", err);
  }
};

export const updatePersonalProfile = async (userId, payload) => {
  const { token } = isAuthenticated(); 
  try {
    const response = await fetch(`${API}/personal/update/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (err) {
    console.log("Error updating profile:", err);
    throw err;
  }
};

export const addUpdateRequest = async (userId, payload) => {
  const { token } = isAuthenticated(); 
  try {
    const response = await fetch(`${API}/addreq/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (err) {
    console.log("Error adding request:", err);
    throw err;
  }
};
