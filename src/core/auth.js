import {API} from "../backend"

export const register=async user=>{
    return await fetch(`${API}/register`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

export const login=async user=>{
    return await fetch(`${API}/login`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(data=>{ console.log("in rest :",data);
    })
    .catch(err=>console.log("error is ",err)
    )
}

export const authenticate=(data,next)=>{
    if(typeof window!=="undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
        next()
    }
    
}

export const signout=next=>{
    if(localStorage.getItem("jwt")){
        localStorage.removeItem("jwt");
        next();
    }
}
export const isAuthenticated=()=>{
    if(typeof window=="undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false;
    }
}