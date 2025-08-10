import React, { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();
    const { username } = useParams();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 2000);

        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-light">
            <div className="text-center">
                <h1 className="display-4">Welcome, {username}!</h1>
                <p className="lead mt-3">Redirecting you to the homepage...</p>
            </div>
        </div>
    );
};

export default Welcome;
