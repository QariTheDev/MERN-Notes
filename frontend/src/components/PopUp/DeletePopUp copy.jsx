import React from 'react'
import { GiCrossMark } from "react-icons/gi";

export default function DeletePopUp({ setDeleted }) {

    return (
        <>
            <div className='absolute top-28 right-0 transition-all duration-300 z-10'>
                <div className='bg-slate-300 border-l-4 border-red-600 px-2 py-3 flex justify-center rounded-md transition-all duration-300 z-10'>
                    <p>Note Deleted Successfully</p>
                    <GiCrossMark size={20} className='text-red-600 ml-2 cursor-pointer' onClick={() => setDeleted(false)} />
                </div>
            </div>
        </>
    )
}