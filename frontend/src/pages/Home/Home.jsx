import { useEffect, useState } from 'react';
import React from 'react';
import NoteCard from '../../components/Cards/NoteCard';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Navbar from '../../components/Navbar/Navbar';
import EmptyCard from '../../components/EmptyCard/EmptyCard';

function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const getApiCall = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      console.log(response.data);

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);

      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  }

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-notes");

      if (response.data && response.data.notes) {
        setNotes(response.data.notes);
      }
    }
    catch (error) {
      console.error('Error fetching notes:', error);
    }
  }

  const deleteNote = async (noteId) => {
    try {
      const response = await axiosInstance.delete('/delete-note/' + noteId);
      if (response.data.error) {
        setError('Error deleting note:', response.data.error);
        setDeleted(false);
      } else {
        getAllNotes();
        setDeleted(true);
      }
    } catch (error) {
      setError('Error deleting note:', error);
      setDeleted(false);
    }

    setTimeout(() => {
      setError('');
      setDeleted(false);
    }, 3000);
  }

  const editNote = (note) => {
    console.log(note);
    setOpenAddEditModal({ isShown: true, type: 'edit', data: note });
  }

  const SearchNotes = async (query) => {
    setSearch(query);

    try {
      const response = await axiosInstance.get('/search-notes', { params: { query } });
      console.log(response.data.notes);

      if (response.data.error) {
        setError('Error fetching notes:', response.data.error);
      } else {
        setIsSearch(true);
        setNotes(response.data.notes);
      }
    }
    catch (error) {
      alert('Error fetching notes:', error);
    }
  }

  const updatePin = async (noteData) => {
    const noteId = noteData._id;
    const newPinStatus = !noteData.isPinned;

    try {
      const response = await axiosInstance.put(`/update-note-pinned/${noteId}`, { isPinned: newPinStatus });

      if (response.data.error) {
        alert('Error updating pin:', response.data.error);
      } else {
        const updatedNotes = notes.map(note => {
          if (note._id === noteData._id) {
            return { ...note, isPinned: newPinStatus };
          }
          return note;
        });

        setNotes(updatedNotes);
      }
    } catch (error) {
      alert('Error updating pin');
    }
  };



  useEffect(() => {
    getApiCall();
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} deleted={deleted} setDeleted={setDeleted} SearchNotes={SearchNotes} getAllNotes={getAllNotes} />

      <div className='container mx-auto px-4'>
        {notes.length > 0 ?
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8'>
            {notes.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
              .map((note, index) => (
                <NoteCard
                  key={note._id}
                  title={note.title}
                  content={note.description}
                  date={note.CreatedOn}
                  tags={note.tags}
                  isPinned={note.isPinned}
                  onEdit={() => editNote(note)}
                  onDelete={() => deleteNote(note._id)}
                  onPinNote={() => updatePin(note)}
                />
              ))}
          </div>
          : <EmptyCard />}

        <button
          className='rounded-xl bg-blue-500 text-4xl text-white px-5 py-3 font-bold fixed bottom-4 right-4'
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: 'add', data: null });
          }}>
          +
        </button>

        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false })}
          shouldCloseOnOverlayClick={true}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000
            },
            content: {
              width: '50%',
              height: '67%',
              margin: 'auto',
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '20px',
              border: 'none'
            }
          }}
          contentLabel=''
        >

          <AddEditNotes
            onClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false })}
            getAllNotes={getAllNotes}
            noteData={openAddEditModal.data}
            type={openAddEditModal.type}
          />
        </Modal>
      </div>
    </>
  );
}

export default Home;