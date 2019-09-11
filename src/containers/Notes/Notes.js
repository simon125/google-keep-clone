import React from 'react';
import { NotesContainer } from '../../components/NoteForm/NoteFormElements';
import NoteForm from '../../components/NoteForm/NoteForm';
// import NotesList from './NotesList';

function Notes() {
  return (
    <NotesContainer>
      <NoteForm />
      {/* <NotesList /> */}
    </NotesContainer>
  );
}

export default Notes;
