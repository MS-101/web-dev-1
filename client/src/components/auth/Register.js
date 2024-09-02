import React, { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext';

function Login() {
    const { closeModal, showLogin } = useAuthContext();
    const [ email, setEmail ] = useState(null);
    const [ username, setUsername ] = useState(null);
    const [ password, setPassword ] = useState(null);

    return (
        <>
            <div className='modal-header'>
                <h2 className='title'>Register</h2>
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
            </div>
            <div className='modal-footer'>
                <p>Already have an account? <button className='link-btn' onClick={showLogin}>Login</button></p> 
                <button className='submit-btn' type='submit' onClick={closeModal}>Register</button>
            </div>
        </>
    )
}

export default Login;
