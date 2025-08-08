import React from 'react'
import {useAuth} from "../Security/AuthContext.jsx";
import {useParams} from "react-router-dom";

const Welcome = () => {

    const authContext = useAuth()

    const {username} = useParams()

    return (
        <div>Welcome {username}</div>
    )
}
export default Welcome
