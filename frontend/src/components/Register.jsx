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
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-light">
            <div className="w-100" style={{ maxWidth: "450px" }}>
                <h2 className="text-center mb-4">Register for DSAverse</h2>

                {registration === false && (
                    <div className="alert alert-danger" role="alert">
                        Registration failed. Please try again.
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

                <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(evt) => setEmail(evt.target.value)}
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

                <div className="d-grid">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleRegister}
                        disabled={!username || !email || !password}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
