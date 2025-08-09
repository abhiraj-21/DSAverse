import React, {useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";

const Welcome = () => {

    const navigate = useNavigate();

    useEffect(() => {
        welcome()
    }, []);

    const welcome = () => {
        setTimeout(() => {
            navigate('/')
        }, 2000)
    }

    const {username} = useParams()

    return (
        <div>Welcome {username}</div>
    )
}
export default Welcome
