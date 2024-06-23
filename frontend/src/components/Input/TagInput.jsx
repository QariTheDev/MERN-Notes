import React, { useState } from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { MdClose } from "react-icons/md";

export default function TagInput({ tags, setTags }) {
    const [inputValue, setInputValue] = useState('');
    const [sameValue, setSameValue] = useState(false);

    const handleInputValue = (e) => {
        setInputValue(e.target.value);
    }

    const addTag = () => {
        if (inputValue === '') return;
        
        for (let i=0;i<tags.length;i++){
            if (tags[i] === inputValue){
                setSameValue(true);
                return;
            }
        }
        setTags([...tags, inputValue]);
        setInputValue('');
        setSameValue(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addTag();
        }
    }

    const removeTag = (index) => {
        setTags(tags.filter((tag) => tag !== index));
    }

    return (
        <>
            {
                tags?.length > 0 && (
                    <div className='flex flex-wrap gap-2 mt-2'>
                        {tags.map((tag, index) => (
                            <span key={index} className='inline-flex items-center flex-wrap gap-2 mt-2 bg-slate-200 px-3 py-1 rounded-md'>#{tag}
                                <button onClick={() => removeTag(tag)}>
                                    <MdClose />
                                </button>
                            </span>
                        ))}
                    </div>
                )
            }

            <div className='flex items-center'>
                <input 
                type='text' 
                placeholder='Add Tags' 
                value={inputValue}
                className='p-2 w-1/5 text-gray-800 rounded border-gray-300 outline-slate-500' 
                onChange={handleInputValue}
                onKeyDown={handleKeyDown}
                />
                <CiSquarePlus size={24} className='text-gray-600 cursor-pointer' onClick={addTag} />

                {sameValue ? <p className='text-red-600 text-sm'>Tag already exists</p> : null}
            </div>
        </>
    )
}
