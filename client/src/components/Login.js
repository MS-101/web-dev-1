import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/auth/login', {username, password})
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    return (
        <div className=' d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className=' p-3 bg-white w-25'>
                <form onSubmit={handleSubmit}>
                    <div className=' mb-3'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' placeholder='Enter Username' className=' form-control'
                        onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className=' mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Enter Password' className=' form-control'
                        onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button className='btn btn-success'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login