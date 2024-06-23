import React from 'react'

export default function EmptyCard() {
    return (
        <>
            <div className='flex flex-col items-center justify-center h-full'>
                <br />
                <h2 className='text-2xl font-bold text-slate-600'>No Notes Found</h2>
                <p className='text-slate-400'>Create a new note to get started</p>
            </div>
        </>
    )
}