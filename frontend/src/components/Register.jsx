import React, {useState} from 'react'
import {useAuth} from "../Security/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const authContext = useAuth()

    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [registration, setRegistration] = useState(null)

    const handleRegister = async () => {
        const success = await authContext.register(username, password, email, true)
        setRegistration(success)

        if (success) {
            navigate('/login')
        }
    }

    return (
        <div>
            {registration === false && <div>Registration Failed</div>}
            <div>
                <div className='m-4'>
                    <label className='mx-1'>Username: </label>
                    <input type={"text"} placeholder={"Username"} onChange={(evt) => {
                        setUsername(evt.target.value)
                    }}/>
                </div>
                <div className='m-4'>
                    <label className='mx-1'>Email: </label>
                    <input type={'email'} placeholder={"email"} onChange={(evt) => {
                        setEmail(evt.target.value)
                    }}/>
                </div>
                <div className='m-4'>
                    <label className='mx-1'>Password: </label>
                    <input type={"password"} placeholder={"Password"} onChange={(evt) => {
                        setPassword(evt.target.value)
                    }}/>
                </div>
                <div>
                    <button type='button' className='m-4' onClick={handleRegister} disabled={!username || !email || !password}>
                        Register
                    </button>
                </div>
            </div>

        </div>
    )
}
export default Register
