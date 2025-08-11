import React, { useState } from 'react';
import { useAuth } from "../Security/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(null);

    const authContext = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const success = await authContext.login(username, password);
        if (success) {
            setLoggedIn(true);
            navigate(`/welcome/${username}`);
        } else {
            setLoggedIn(false);
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen min-w-screen">
            <h2 className=''>Login to DSAverse</h2>

            {loggedIn === false && (
                <div className="flex flex-col gap-4 items-center justify-center min-h-screen min-w-screen">
                    Incorrect credentials. Please try again.
                </div>
            )}

            <div>
                <label htmlFor="username" className='block mb-2 text-sm font-medium text-gray-900'>Username</label>
                <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(evt) => setUsername(evt.target.value)}
                />
            </div>

            <div>
                <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900'>Password</label>
                <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                />
            </div>

            <div>
                <button type="button" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleSubmit}>
                    Login
                </button>
            </div>

            <div className='flex flex-col items-center justify-center gap-2'>
                <p className=' text-gray-500'>or</p>
                <button onClick={handleRegister} className='text-white bg-green-700 hover:bg-green-700/90 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
                    Register
                </button>
            </div>
        </div>
    );
};

export default Login;
