import React from 'react';
import { RiEdit2Line, RiDeleteBinLine, RiPushpinLine, RiPushpin2Fill } from 'react-icons/ri';

export default function NoteCard({ title, content, date, tags, isPinned, onEdit, onDelete, onPinNote }) {
    let dateObj = new Date(date);
    date = dateObj.toDateString();

    function getSliceContent(content) {
        if (window.innerWidth < 320) { // xs screen
            return content.length > 20 ? content.slice(0, 8) + '...' : content;
        } else if (window.innerWidth < 480) { // sm screen
            return content.length > 30 ? content.slice(0, 15) + '...' : content;
        } else if (window.innerWidth < 640) { // md screen
            return content.length > 40 ? content.slice(0, 30) + '...' : content;
        } else if (window.innerWidth < 768) { // lg screen
            return content.length > 50 ? content.slice(0, 40) + '...' : content;
        } else if (window.innerWidth < 1024) { // xl screen
            return content.length > 60 ? content.slice(0, 50) + '...' : content;
        } else { // xxl screen
            return content.length > 80 ? content.slice(0, 60) + '...' : content;
        }
    }

    function getSliceValAccToScreenSize(content) {
        if (window.innerWidth < 320) { // xs screen
            return 'max-w-xs';
        } else if (window.innerWidth < 480) { // sm screen
            return 'max-w-sm';
        } else if (window.innerWidth < 640) { // md screen
            return 'max-w-md';
        } else if (window.innerWidth < 768) { // lg screen
            return 'max-w-lg';
        } else if (window.innerWidth < 1024) { // xl screen
            return 'max-w-xl';
        } else { // xxl screen
            return 'max-w-2xl';
        }
    }

    function getSliceTitleAccToScreenSize(title) {
        if (window.innerWidth < 320) { // xs screen
            return title.length > 10 ? title.slice(0, 8) + '...' : title;
        } else if (window.innerWidth < 480) { // sm screen
            return title.length > 15 ? title.slice(0, 12) + '...' : title;
        } else if (window.innerWidth < 640) { // md screen
            return title.length > 20 ? title.slice(0, 18) + '...' : title;
        } else if (window.innerWidth < 768) { // lg screen
            return title.length > 25 ? title.slice(0, 22) + '...' : title;
        } else if (window.innerWidth < 1024) { // xl screen
            return title.length > 30 ? title.slice(0, 28) + '...' : title;
        } else { // xxl screen
            return title.length > 35 ? title.slice(0, 32) + '...' : title;
        }
    }

    return (
        <div className='p-3 flex shadow hover:shadow-xl duration-150 transition flex-shrink'>
            <div className='flex-grow'>
                <h5 className={`text-sm font-medium pr-1 ${getSliceValAccToScreenSize(title)}`}>{getSliceTitleAccToScreenSize(title)}</h5>
                <span className='text-xs text-slate-500'>{date}</span>
            </div>

            <div className='flex flex-col space-y-2'>
                <p className={`text-sm overflow-hidden ${getSliceValAccToScreenSize(content)}`}>{getSliceContent(content)}</p>
                <div className='flex space-x-2'>
                    {tags.map((tag, index) => (
                        <span key={index} className='text-xs bg-slate-200 px-2 py-1 rounded'>{tag}</span>
                    ))}
                </div>
            </div>

            <div className='flex items-center ml-4 max-w-xs'>
                <button onClick={onEdit} className='text-slate-500 hover:text-black'><RiEdit2Line size={20} /></button>
                <button onClick={onDelete} className='text-slate-500 hover:text-black'><RiDeleteBinLine size={20} /></button>
                <button onClick={onPinNote} className='text-slate-500 hover:text-black'>{isPinned ? <RiPushpin2Fill size={20} /> : <RiPushpinLine size={20} />}</button>
            </div>
        </div>
    );
}