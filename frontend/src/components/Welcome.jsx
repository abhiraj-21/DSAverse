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
        <div className='flex flex-col items-center justify-center gap-2 min-h-screen min-w-screen'>
            <h1 className='text-2xl font-bold text-gray-800'>Welcome, {username}!</h1>
            <p className='text-violet-500'>Redirecting you to the homepage...</p>
        </div>
    );
};

export default Welcome;
