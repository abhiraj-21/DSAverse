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
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-light">
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <h2 className="text-center mb-4">Login to DSAverse</h2>

                {loggedIn === false && (
                    <div className="alert alert-danger" role="alert">
                        Incorrect credentials. Please try again.
                    </div>
                )}

                <div className="form-group mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        id="username"
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                        value={username}
                        onChange={(evt) => setUsername(evt.target.value)}
                    />
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(evt) => setPassword(evt.target.value)}
                    />
                </div>

                <div className="d-grid gap-2">
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                        Login
                    </button>
                </div>

                <div className="text-center mt-4">
                    <p className="text-muted mb-2">Not a member yet?</p>
                    <button className="btn btn-outline-light" onClick={handleRegister}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
