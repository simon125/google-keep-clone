import React from 'react';
import { connect } from 'react-redux';
import { NotesContainer } from '../../components/NoteForm/NoteFormElements';
import NoteForm from '../../components/NoteForm/NoteForm';
import NotesList from '../../components/NotesList/NotesList';
import EditNoteModal from '../../components/EditNoteModal/EditNoteModal';
// import { clearEditNote } from '../../redux/notes';

function Notes({ notes }) {
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
        {notes.find((note) => note.isPinned === true) && <p>PRZYPIĘTE</p>}
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
        {notes.find((note) => note.isPinned === false) && <p>INNE</p>}
      </div>
      <NotesList isPinnedList={false} />
      <EditNoteModal />
    </NotesContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    notes: [...Object.values(state.notes.notes)]
  };
};

export default connect(mapStateToProps, {})(Notes);
