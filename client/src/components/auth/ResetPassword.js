import React, { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext';

function ResetPassword() {
    const { closeModal, showLogin } = useAuthContext();
    const [ email, setEmail ] = useState(null);

    return (
        <>
            <div className='modal-header'>
                <button className='return-btn' onClick={showLogin}>&lt;</button>
                <h2 className='title'>Reset Password</h2>
                <button className='close-btn' onClick={closeModal}>&times;</button>
            </div>
            <div className='modal-body'>
                <div className='input-container'>
                    <label>Email:</label>
                    <input
                        type='email'
                        autoComplete='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className='modal-footer'>
                <button className='submit-btn' type='submit' onClick={closeModal}>Reset Password</button>
            </div>
        </>
    )
}

export default ResetPassword;
