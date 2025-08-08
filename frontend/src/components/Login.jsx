import React, {useState} from 'react'
import {useAuth} from "../Security/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const authContext = useAuth()

    const navigate = useNavigate()

    const handleUsernameChange = (evt) => {
        setUsername(evt.target.value)
    }
    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleSubmit = async () => {
        const success = await authContext.login(username, password)
        if(success) {
            navigate(`/welcome/${username}`)
        }
    }

    return (
        <div>
            <div>
                <div className="m-4">
                    <label className='mx-1'>Username: </label>
                    <input type='text' placeholder='Username' onChange={handleUsernameChange} />
                </div>
                <div className='m-3'>
                    <label className='mx-1'>Password: </label>
                    <input type='password' placeholder='Password' onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type='submit' onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}
export default Login
