import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after successful login

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Using react-router for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7199/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const result = await response.json();
                localStorage.setItem('userId', result.user.id);
                localStorage.setItem('username', result.user.username);
                navigate('/');                
            } else {
                const result = await response.json();
                setError(result.message || 'Login failed');
            }
        } catch (err) {
            setError('Something went wrong, please try again.');
        }
    };

    return (
        <div className='flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-blue-100' >
            <div className='bg-white shadow-lg rounded-lg p-8 w-96'>
                <h2 className='text-3xl font-bold mb-6 text-center text-gray-700'>Welcome Back!</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Email</label>
                        <input
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Password</label>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out'
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out'
                    >
                        Login
                    </button>
                </form>
                {error && <p className='text-red-500 text-sm mb-4 mt-5'>{error}</p>}
            </div>
        </div>
    );
}

export default Login;
