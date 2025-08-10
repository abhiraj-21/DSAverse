import React, { useEffect } from 'react';
import { useAuth } from "../Security/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
    }, []);

    const logout = () => {
        authContext.logout();
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-light">
            <div className="text-center">
                <h1 className="display-5 mb-3">Thank You for Visiting!</h1>
                <p className="lead">You are being logged out...</p>
                <div className="spinner-border text-light mt-3" role="status">
                    <span className="visually-hidden">Logging out...</span>
                </div>
            </div>
        </div>
    );
};

export default Logout;
