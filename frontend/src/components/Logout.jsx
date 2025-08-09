import React, {useEffect} from 'react'
import {useAuth} from "../Security/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const Logout = () => {

    const authContext = useAuth()

    useEffect(() => {
        logout()
    }, []);

    const navigate = useNavigate()

    const logout = () => {
        setTimeout( () => {
            navigate('/')
        }, 2000)
        authContext.logout()
    }

    return (
        <div>
            <h1>Thank You For Visiting!!</h1>
        </div>
    )
}
export default Logout
