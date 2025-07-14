import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function AuthCheck({children}) {
    let navigate=useNavigate();
    
    useEffect(()=>{
        if(localStorage.getItem("token")==null) navigate("/login");
    },[]);

    return(
        children
    )
}
