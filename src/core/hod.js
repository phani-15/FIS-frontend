import {API} from "../backend"
import {isAuthenticated} from "../core/auth"
export const hodlogin=async user=>{
    return await fetch(`${API}/hod`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        //  credentials: "include",
        body:JSON.stringify(user)
    })
    .then(res=>{return res.json()})
    .catch(err=>console.log("error is ",err)
    )
}


export const HodDashBoard = async (id) => {
  const { user, token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/hod/${id}`, {
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


export const getHodReports = async (payload, hodId) => {
  const { token } = isAuthenticated();

  try {
    const response = await fetch(`${API}/hodreport/${hodId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    return await response.json();
  } catch (err) {
    console.error("HOD report fetch error:", err);
    return { error: "Failed to fetch reports" };
  }
};


//need to use useeffect in OfcDashboard.jsx in order to display the data FACULTYLIST