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


//need to use useeffect in hodDashboard.jsx in order to display the data FACULTYLIST