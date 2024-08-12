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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='username'>Username</label>
                <input type='text' placeholder='Enter Username'
                onChange={e => setUsername(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='Enter Password'
                onChange={e => setPassword(e.target.value)}/>
            </div>
            <button>Login</button>
        </form>
    )
}

export default Login