import React, { useState } from 'react';
import { useAuth } from "../Security/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const authContext = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [registration, setRegistration] = useState(null);

    const handleRegister = async () => {
        const success = await authContext.register(username, password, email, true);
        setRegistration(success);

        if (success) {
            navigate('/login');
        }
    };

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen min-w-screen">
            <h2 className='text-3xl'>Register for DSAverse</h2>

            {registration === false && (
                <div>
                    Registration failed. Please try again.
                </div>
            )}

            <div>
                <label htmlFor="username" className='block mbv-2 text-sm font-medium text-gray-900'>Username</label>
                <input
                    className='shadow-xs text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-xs-light'
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(evt) => setUsername(evt.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>Email</label>
                <input
                    className='shadow-xs text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-xs-light'
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                />
            </div>

            <div>
                <label htmlFor="password" className='block mbv-2 text-sm font-medium text-gray-900'>Password</label>
                <input
                    className='shadow-xs text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-xs-light'
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                />
            </div>

            <div className="mt-4">
                <button
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    // className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-500/90 transition-colors hover:cursor-pointer'
                    type="button"
                    onClick={handleRegister}
                    disabled={!username || !email || !password}
                >
                    Register New Account
                </button>
            </div>
        </div>
    );
};

export default Register;
