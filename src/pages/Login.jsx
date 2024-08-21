import React, { useState } from 'react';
import './Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Particles from '../components/Particles';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            localStorage.setItem('token', response.data.token);
            const role = response.data.role;
            if (role === 'manager') {
                navigate('/dashboard');
            } else {
                navigate('/transaction-history');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div>
             <Particles id="tsparticles" />
           
            <div className='wrapper'>

            

           
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
                <label><input type = "checkbox"/>Remember me</label>
                <a href ="#">Forgot password</a>
                </div>



                <button type="submit">Login</button>
            </form>
        </div>
        </div>
    );
}

export default Login;
