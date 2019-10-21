import React from 'react';
import { NotesContainer } from '../../components/NoteForm/NoteFormElements';
import NoteForm from '../../components/NoteForm/NoteForm';
import NotesListClass from '../../components/NotesListClass/NotesListClass';

function Notes() {
  return (
    <NotesContainer>
      <NoteForm />
      <NotesListClass />
    </NotesContainer>
  );
}

export default Notes;
