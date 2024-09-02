import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () =>  {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authView, setAuthView] = useState('login');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    const showLogin = () => {
        console.log('test');
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
        <AuthContext.Provider value={{ isModalOpen, openModal, closeModal, authView, showLogin, showRegister, showResetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};