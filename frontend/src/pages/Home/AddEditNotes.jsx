import React, { useState, useEffect } from 'react';
import TagInput from '../../components/Input/TagInput';
import { RiCloseLine } from 'react-icons/ri';
import axiosInstance from '../../utils/axiosInstance';

export default function AddEditNotes({ onClose, getAllNotes, noteData, type }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (type === 'edit' && noteData) {
            setTitle(noteData.title);
            setDescription(noteData.description);
            setTags(noteData.tags);
        }
    }, [type, noteData]);

    const addNote = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/add-note', { title, description, tags });

            if (response.data.error) {
                console.error('Error adding note:', response.data.error);
            } else {
                getAllNotes();
                onClose();
            }
        } catch (error) {
            console.error('Error adding note:', error);
        }
    }

    const editNote = async (e) => {
        e.preventDefault();
    
        const noteId = noteData._id;
    
        try {
            const response = await axiosInstance.put('/edit-note/' + noteId, { title, description, tags });
            console.log('Edit response:', response.data);
    
            if (response.data.error) {
                console.error('Error editing note:', response.data.error);
            } else {
                getAllNotes();
                onClose();
            }
        } catch (error) {
            console.error('Error editing note:', error);
        }
    }
    

    const handleSubmit = (e) => {
        if (type === 'edit') {
            editNote(e);
        } else {
            addNote(e);
        }
    }

    return (
        <div className='px-1 sm:px-2'>
            <div className='flex justify-end'>
                <button onClick={onClose} className='text-slate-500'><RiCloseLine size={30} /></button>
            </div>

            <h2 className='text-2xl font-bold text-slate-600'>{type === 'edit' ? 'Edit Note' : 'Add Note'}</h2>
            <form className='flex flex-col space-y-4 mt-4' onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    placeholder='Title' 
                    value={title} 
                    onChange={({ target }) => setTitle(target.value)} 
                    className='p-2 text-xl text-gray-800 rounded border-gray-300 outline-none' 
                />
                <textarea 
                    placeholder='Description' 
                    rows={8} 
                    value={description} 
                    onChange={({ target }) => setDescription(target.value)} 
                    className='p-2 rounded border-gray-300 outline-none'
                ></textarea>
                <TagInput tags={tags} setTags={setTags} />
                <button type='button' onClick={handleSubmit} className='bg-slate-600 text-white p-2 rounded'>
                    {type === 'edit' ? 'Save Changes' : 'Add Note'}
                </button>
            </form>
        </div>
    )
}