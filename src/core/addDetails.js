import {API} from "../backend"
import {credConverter} from "../utils/formDataConverter"
import {isAuthenticated} from "../core/auth"

export const addDetails=async (data,userId,credId)=>{
    const {token}=isAuthenticated()
    const Newdata = credConverter(data);
    return await fetch(`${API}/ac/${userId}/${credId}`,{
        method:"PUT",
        headers:{
            Authorization:`Bearer ${token}`
        },
        body:Newdata
    })    
}

export const getDetails=async (userId,credId)=>{
    const {token}=isAuthenticated()
    const response=await fetch(`${API}/vc/${userId}/${credId}`,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`
        }
    })    
    return response.json()
}
