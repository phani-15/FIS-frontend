// Personal.js
import { API } from "../backend";
import { isAuthenticated } from "./auth";

export const Personal = async (id) => {
  const { user, token } = isAuthenticated();

  try {
    const response = await fetch(`${API}/personal/${id}`, {
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
