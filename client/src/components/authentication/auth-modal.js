import React from 'react';
import Modal from 'react-modal';
import { useAuthContext } from 'contexts/auth-context';
import Login from 'components/authentication/login'
import Register from 'components/authentication/register'
import ResetPassword from 'components/authentication/reset-password'
import 'styles/auth-modal.css'

const AuthModal = () => {
    const { isModalOpen, closeModal, authView } = useAuthContext();

    const renderContent = () => {
        switch (authView) {
            case 'login':
                return <Login />;
            case 'register':
                return <Register />;
            case 'resetPassword':
                return <ResetPassword />;
            default:
                return null;
        }
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            {renderContent()}
        </Modal>
    );
};

export default AuthModal;