import React from 'react';
import { RxMagnifyingGlass } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { RiTeamFill } from "react-icons/ri";

export default function SearchBar({ value, onChange, handleSearch, resetSearch }) {

    function EnterKey(e) {
        if (e.key === 'Enter') {
            console.log('Enter key pressed');
            handleSearch();
        }
    }

    return (
        <>
            <div className='flex flex-row-reverse items-center'>
                <div className='w-full flex px-4 items-center bg-slate-200'>
                    <input
                        type='text'
                        placeholder='Search Notes'
                        className='w-full p-2 rounded bg-slate-200 border-gray-300 outline-none'
                        value={value}
                        onChange={onChange}
                        onKeyDown={EnterKey}
                    />

                    <div className='flex space-x-2'>
                        {value.length > 0 && (
                            <RxCross2 
                                size={22} 
                                className='bg-slate-200 text-slate-400 cursor-pointer hover:text-black' 
                                onClick={resetSearch} 
                            />
                        )}
                        <RxMagnifyingGlass 
                            size={22} 
                            className='bg-slate-200 text-slate-400 cursor-pointer hover:text-black' 
                            onClick={handleSearch} 
                        />
                    </div>
                </div>

                <a href="https://qarithedev.netlify.app" target='_blank' rel='noopener noreferrer'>
                    <RiTeamFill size={22} className='bg-white text-slate-400 mr-2 cursor-pointer hover:text-black' />
                </a>
            </div>
        </>
    );
}
