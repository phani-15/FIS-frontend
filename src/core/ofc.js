import {API} from "../backend"
import {isAuthenticated} from "./auth"
export const ofclogin=async user=>{
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


export const ofcDashBoard = async (id) => {
  const {token } = isAuthenticated();
  try {
    const response = await fetch(`${API}/ofc/${id}`, {
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


//need to use useeffect in OfcDashboard.jsx in order to display the data FACULTYLIST