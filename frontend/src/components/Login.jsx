import React, {useState} from 'react'
import {useAuth} from "../Security/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(null)

    const authContext = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async () => {
        const success = await authContext.login(username, password)
        if(success) {
            setLoggedIn(true)
            navigate(`/welcome/${username}`)
        }else{
            setLoggedIn(false)
        }
    }

    const handleRegister = async () => {
        navigate('/register')
    }

    return (
        <div>
            {loggedIn === false && <div>Enter the correct credentials!!</div>}
            <div>
                <div className="m-4">
                    <label className='mx-1'>Username: </label>
                    <input type='text' placeholder='Username' onChange={(evt) => {
                        setUsername(evt.target.value)
                    }} />
                </div>
                <div className='m-3'>
                    <label className='mx-1'>Password: </label>
                    <input type='password' placeholder='Password' onChange={(evt) => {
                        setPassword(evt.target.value)
                    }} />
                </div>
                <div>
                    <button type='submit' onClick={handleSubmit}>Login</button>
                </div>
                <div className='my-4'>
                    <p className='text-black-50'>Not a member yet? Sign Up first: </p>
                    <button className='btn btn-primary' onClick={handleRegister}>Register</button>
                </div>
            </div>
        </div>
    )
}
export default Login
