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
        <div>
            <div>
                <h1>Thank You for Visiting!</h1>
                <p>You are being logged out...</p>
                <div>
                    <span>Logging out...</span>
                </div>
            </div>
        </div>
    );
};

export default Logout;
