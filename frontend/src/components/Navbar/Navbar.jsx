import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from '../Cards/ProfileInfo';
import SearchBar from '../SearchBar/SearchBar';
import DeletePopUp from '../PopUp/DeletePopUp copy';

export default function Navbar({ userInfo, deleted, setDeleted, SearchNotes, getAllNotes }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery) {
      SearchNotes(searchQuery);
    }
  };

  const resetSearch = () => {
    setSearchQuery('');
    getAllNotes();
  };

  const onLogOut = () => {
    localStorage.clear();
    navigate('/');
  };

  const showSearchBar = location.pathname !== '/' && location.pathname !== '/signup' && location.pathname !== '/login';

  return (
    <>
      <div className='bg-white flex justify-between items-center py-3 px-6 drop-shadow'>
        <h2 className='font-bold text-xl sm:text-2xl pr-1 sm:p-0 text-slate-600 '>Notes</h2>
        { showSearchBar && <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} handleSearch={handleSearch} resetSearch={resetSearch} /> }
        <div className='flex items-center'>
          <ProfileInfo onLogOut={onLogOut} userInfo={userInfo} />
        </div>
      </div>

      {
        deleted && <DeletePopUp setDeleted={setDeleted} />
      }
    </>
  );
}