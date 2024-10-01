import React, { createContext, useContext, useState } from 'react';
import axios from "axios";

export const AuthContext = createContext();

export const useAuthContext = () =>  {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const baseUrl = 'http://localhost:8081'
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

    const login = (usernameOrEmail, password) => {
        return axios.post(new URL('/auth/login', baseUrl).href, {
            'usernameOrEmail': usernameOrEmail,
            'password': password,
        })
        .then((response) => {
            setAuthentication(response.data);

            return {
                success: true,
                message: 'Login successful!'
            }
        })
        .catch((error) => {
            console.log(error);

            return {
                success: false,
                message: 'Login failed!'
            }
        });
    }

    const register = (username, email, password) => {
        return axios.post(new URL('/auth/register', baseUrl).href, {
            'username': username,
            'email': email,
            'password': password,
        })
        .then((response) => {
            setAuthentication(response.data);

            return {
                success: true,
                message: 'Registration successful!'
            }
        })
        .catch((error) => {
            console.log(error);

            return {
                success: false,
                message: 'Registration failed!'
            }
        });
    }

    const refresh = () => {
        return axios.post(new URL('/auth/refresh', baseUrl).href, {
            'refreshToken': refreshToken
        })
        .then((response) => {
            setAuthentication(response.data);

            return {
                success: true,
                message: 'Refresh successful!'
            }
        })
        .catch((error) => {
            console.log(error);

            return {
                success: false,
                message: 'Refresh failed!'
            }
        });
    }

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

    const logout = () => {
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
            login,
            register,
            refresh,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};