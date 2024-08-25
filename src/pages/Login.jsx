// src/pages/Login.jsx
import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Particles from '../components/Particles';


// parunyoo julachai facebook


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
// parunyoo julachai facebook

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', {
                username: username,
                password: password
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);

            if (response.data.role === 'manager') {
                navigate('/dashboard');
            } else if (response.data.role === 'employee') {
                navigate('/transaction-history');
            }
        } catch (error) {
            console.error('Login failed', error);
            alert('Login failed, please check your credentials');
        }
    };
// parunyoo julachai facebook
    return (
        <div className="login-page">
            <Particles id="tsparticles" />
            <div className="wrapper">
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <div className="input-box">
                        <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <MdAccountCircle className="Icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <RiLockPasswordFill className="Icon" />
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox"/>Remember me</label>
                        <a href="#">Forgot password</a>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
// parunyoo julachai facebook
export default Login;
