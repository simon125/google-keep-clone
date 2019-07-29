import React from "react";
import { NotesContainer } from "./notes-elements";
import NotesForm from "./NotesForm";
import NotesList from "./NotesList";

function Notes() {
  return (
    <NotesContainer>
      <NotesForm />
      <NotesList />
    </NotesContainer>
  );
}

export default Notes;
