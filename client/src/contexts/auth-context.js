import React, { createContext, useContext, useState } from 'react';
import axios from "axios";

export const AuthContext = createContext();

export const useAuthContext = () =>  {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const userKey = 'banter-user'
    const accessTokenKey = 'banter-accessToken'
    const refreshTokenKey = 'banter-refreshToken'

    const [user, setUser] = useState(JSON.parse(localStorage.getItem(userKey)))
    const [accessToken, setAccessToken] = useState(localStorage.getItem(accessTokenKey))
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem(refreshTokenKey))
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authView, setAuthView] = useState('login');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const setAuthentication = (data) => {
        const user  = data.user;
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;

        setUser(user);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken)

        localStorage.setItem(userKey, JSON.stringify(user));
        localStorage.setItem(accessTokenKey, accessToken);
        localStorage.setItem(refreshTokenKey, refreshToken);
    }

    const clearAuthentication = () => {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);

        localStorage.removeItem(userKey);
        localStorage.removeItem(accessTokenKey);
        localStorage.removeItem(refreshTokenKey);
    }
    
    const showLogin = () => {
        setAuthView('login');
        openModal();
    }

    const showRegister = () => {
        setAuthView('register');
        openModal();
    }

    const showResetPassword = () => {
        setAuthView('resetPassword');
        openModal();
    }

    return (
        <AuthContext.Provider value={{
            isModalOpen,
            openModal,
            closeModal,
            authView,
            showLogin,
            showRegister,
            showResetPassword,
            setAuthentication,
            logout: clearAuthentication,
            user,
            accessToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};