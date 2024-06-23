import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import axiosInstance from '../../utils/axiosInstance';
import Navbar from '../../components/Navbar/Navbar';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            alert('Please fill all the fields');
            return;
        }
        if (!email.includes('@') || !email.includes('.com') || email.length < 5) {
            setError('Invalid email format');
            return;
        }

        try {
            const response = await axiosInstance.post('/login', { email, password });
            if (response.data.error) {
                setError(response.data.error);
            } else {
                localStorage.setItem('token', response.data.accessToken);
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <>
            <Navbar />

            <div className='flex justify-center items-center' style={{ height: 'calc(100vh - 88px)' }}>
                <form onSubmit={handleClick} className='w-full max-w-sm'>
                    <h4 className='text-2xl font-bold mb-2 text-center'>Login</h4>

                    <input
                        type='email'
                        placeholder='Email'
                        className='w-full p-2.5 border border-gray-300 rounded mb-2'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {error && <p className='text-red-600 text-sm'>{error}</p>}

                    <div className='w-full p-1 border border-gray-300 rounded mt-2 flex items-center'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            className='w-full p-1 outline-none'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {showPassword ?
                            <FaRegEyeSlash size={22} className='text-gray-600 cursor-pointer ml-2' onClick={() => setShowPassword(!showPassword)} /> :
                            <FaRegEye size={22} className='text-gray-600 cursor-pointer ml-2' onClick={() => setShowPassword(!showPassword)} />
                        }
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-blue-500 text-white p-2 rounded mt-2'
                    >
                        Login
                    </button>

                    <p className='text-center mt-2'>
                        Don't Have an Account? <Link to='/signup' className='text-blue-400 underline'>Create One</Link>
                    </p>
                </form>
            </div>
        </>
    );
}