import React, { useState } from 'react'
import { useAuthContext } from 'contexts/auth-context';

function Login() {
    const { closeModal, showLogin, register } = useAuthContext();
    const [ email, setEmail ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState(null)

    const onCloseClick = () => {
        closeModal();
    }

    const onShowLoginClick = () => {
        showLogin();
    }

    const onRegisterClick = () => {
        register(username, email, password)
        .then(() => {
            closeModal();
        })
        .catch((error) => {
            setErrorMessage(error);
        });
    }

    return (
        <>
            <div className='modal-header'>
                <h2 className='title'>Register</h2>
                <button className='close-btn' onClick={onCloseClick}>&times;</button>
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
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                <p>Already have an account? <button className='link-btn' onClick={onShowLoginClick}>Login</button></p> 
                <button className='submit-btn' type='submit' onClick={onRegisterClick}>Register</button>
            </div>
        </>
    )
}

export default Login;