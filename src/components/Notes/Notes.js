import React from "react";
import { NotesContainer } from "./notes-elements";
import NotesForm from "./NotesForm";
import NoteList from "./NoteList";

function Notes() {
  return (
    <NotesContainer>
      <NotesForm />
      <NoteList />
    </NotesContainer>
  );
}

export default Notes;
