import React from 'react'
import { IoLogOut } from "react-icons/io5";

export default function ProfileInfo({ onLogOut, userInfo }) {
    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((n) => n[0]).join('');
    }

    const getFirstName = (name) => {
        let names = name.split(' ');
        names = names[0][0].toUpperCase() + names[0].slice(1);
        return names;
    }

    return (
        <> {userInfo && (
            <div className='flex items-center space-x-6'>
                <div className='hidden sm:flex w-10 h-10 font-bold items-center justify-center rounded-full bg-slate-200 hover:bg-slate-400 transition duration-300'>
                    {getInitials(userInfo.user.fullName).toUpperCase()}
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <p className='text-black font-bold sm:bg-white sm:p-0 bg-gray-200 rounded-full px-2 py-1'>
                        {getFirstName(userInfo.user.fullName)}
                    </p>
                    <button onClick={onLogOut} className='text-black p-2 rounded underline'>
                        <span className='sm:hidden'><IoLogOut size={22} /></span>
                        <span className='hidden sm:block'>Log Out</span>
                    </button>
                </div>
            </div>
        )
        }
        </>
    )
}