import React, { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext';

function Login() {
    const { closeModal, showRegister, showResetPassword } = useAuthContext();
    const [ username, setUsername ] = useState(null);
    const [ password, setPassword ] = useState(null);

    

    return (
        <>
            <div className='modal-header'>
                <h2 className='title'>Login</h2>
                <button className='close-btn' onClick={closeModal}>&times;</button>
            </div>
            <div className='modal-body'>
                <div className='input-container'>
                    <label>Username:</label>
                    <input
                        type='text'
                        autoComplete='username'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className='input-container'>
                    <label>Password:</label>
                    <input
                        type='password'
                        autoComplete='current-password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className='spacer'></div>
            </div>
            <div className='modal-footer'>
                <button className='link-btn' onClick={showResetPassword}>Forgot your password?</button>
                <p>Don't have an account? <button className='link-btn' onClick={showRegister}>Register</button></p> 
                <button className='submit-btn' type='submit' onClick={closeModal}>Login</button>
            </div>
        </>
    )
}

export default Login;