import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRedirect = ({ children}) => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("token");

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return <>{children}</>;
};

export default AuthRedirect;
