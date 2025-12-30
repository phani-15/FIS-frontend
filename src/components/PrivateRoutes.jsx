import React from 'react'
import {Navigate,useLocation} from "react-router-dom"
import {isAuthenticated} from "../core/auth"
const PrivateRoutes = ({children}) => {
    const location=useLocation()
    return isAuthenticated () ?
    (children):(
        <Navigate to={"/"} replace state={{from : location}}/>
    )
}

export default PrivateRoutes