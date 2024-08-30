import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Protected({ children }) {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/signUp"); // Redirect to sign-up if token is not found
        }
    }, [token, navigate]);

    // If token exists, render the protected content
    return token ? children : null;
}

export default Protected;
