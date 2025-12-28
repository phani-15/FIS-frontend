import {API} from "../backend"
import {isAuthenticated} from "../core/auth"
export const iqaclogin=async user=>{
    return await fetch(`${API}/ofc`,{
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
    const response = await fetch(`${API}/ofc/${id}`, {
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


//need to use useeffect in OfcDashboard.jsx in order to display the data FACULTYLIST