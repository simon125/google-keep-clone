import React from 'react';
import { NotesContainer } from '../../components/NoteForm/NoteFormElements';
import NoteForm from '../../components/NoteForm/NoteForm';
import NotesList from '../../components/NotesList/NotesList';
import EditNoteModal from '../../components/EditNoteModal/EditNoteModal';
// import { clearEditNote } from '../../redux/notes';

function Notes() {
  return (
    <NotesContainer>
      <NoteForm />
      <div
        style={{
          width: 'fit-content',
          height: '10px',
          fontSize: '13px',
          color: '#333',
          letterSpacing: '0.5px',
          marginLeft: '350px',
          marginTop: '20px'
        }}
      >
        <p>PRZYPIĘTE</p>
      </div>
      <NotesList isPinnedList={true} />
      <div
        style={{
          width: 'fit-content',
          height: '10px',
          fontSize: '13px',
          color: '#333',
          letterSpacing: '0.5px',
          marginLeft: '350px'
        }}
      >
        <p>INNE</p>
      </div>
      <NotesList isPinnedList={false} />
      <EditNoteModal />
    </NotesContainer>
  );
}

export default Notes;
