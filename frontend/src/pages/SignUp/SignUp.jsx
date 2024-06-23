import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash, FaSmile } from 'react-icons/fa';
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axiosInstance from '../../utils/axiosInstance';

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        handleClick();
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if (email === '' || password === '' || name === '') {
            alert('Please fill all the fields');
            return;
        }
        if (!email.includes('@') || !email.includes('.com') || email.length < 5) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 2000);
            return;
        }

        try {
            const response = await axiosInstance.post('/create-account', { fullName: name, email: email, password: password });
            if (response.data.error) {
                setErrorText(response.data.error);
            } else {
                setErrorText('Account Created Successfully');
                setTimeout(() => {
                    setErrorText('');
                }, 2000);

                useNavigate('/dashboard');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };


    return (
        <>
            <Navbar />

            <div className='flex justify-center items-center' style={{ height: 'calc(100vh - 88px)' }}>
                <form onSubmit={() => { handleSignUp }} className='w-full max-w-sm'>
                    <h4 className='text-2xl font-bold mb-2 text-center'>SignUp</h4>

                    <input
                        type='text'
                        placeholder='Name'
                        className='w-full p-2.5 border border-gray-300 rounded mb-2'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type='email'
                        placeholder='Email'
                        className='w-full p-2.5 border border-gray-300 rounded mb-2'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {error ? <p className='text-red-600 text-sm'>{errorText}</p> : null}

                    <div className='w-full p-1 border border-gray-300 rounded flex items-center'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            className='w-full p-1 outline-none'
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
                        onClick={handleClick}
                    >
                        Create Account
                    </button>

                    <p className='text-center mt-2'>
                        Already Have an Account? <Link to='/' className='text-blue-400 underline'>Let's Login </Link>
                    </p>
                </form>
            </div>
        </>
    )
}
