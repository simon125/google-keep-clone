import React from "react";
import styled from "styled-components";
import Task from "./Note";
import { Droppable } from "react-beautiful-dnd";

const NoteList = styled.div`
  padding: 8px;
  margin-top: 10px;
  background: #eee;
  width: 250px;
  display: flex;
  flex-direction: column;
`;

function Column({ column, notes }) {
  return (
    <Droppable droppableId={column.id}>
      {provided => (
        <NoteList ref={provided.innerRef} {...provided.droppableProps}>
          {notes.map((note, index) => (
            <Task key={note.id} className={note.id} note={note} index={index} />
          ))}
          {provided.placeholder}
        </NoteList>
      )}
    </Droppable>
  );
}

export default Column;
