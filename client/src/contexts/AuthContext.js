import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');

        if (authToken) {
            setAuthToken(authToken);
            setUser(true);
        }
    }, []);

    const login = (token) => {
        setAuthToken(token);
        setUser(true);
        localStorage.setItem('authToken', token);
    };

    const logout = () => {
        setAuthToken(null);
        setUser(false);
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ authToken, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};