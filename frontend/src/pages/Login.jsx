import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        if (!email || !password) {
            setMessage('All fields are required.');
            return;
        }

        if (!email.match(/^\S+@\S+\.\S+$/)) {
            setMessage('Please enter a valid email address.');
            return;
        }

        setMessage('');

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage('Login successful!');
                sessionStorage.setItem('authToken', data.token); // Persist token
                navigate('/'); // Redirect to Dashboard
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Login failed.');
            }
        } catch (error) {
            console.log(error);
            setMessage(error.message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
            <h2>Login</h2>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="on"
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="on"
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                </div>
                <button type="submit" style={{ padding: '0.5rem 1rem' }}>
                    Login
                </button>
                <hr />
                <span>Don't have an account? <Link to="/register">Register</Link></span>
            </form>
        </div>
    );
};

export default Login;
