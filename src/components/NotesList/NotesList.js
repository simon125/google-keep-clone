import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { store } from "../../redux/storeConfig";

export const NoteListContainer = styled.div`
  margin: 10px;
  max-width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
// TO CHECK https://codesandbox.io/s/9z7qwmmr7r
function NoteList({ notes }) {
  //set initialStateOfColumns according to screen width
  const [columns, setColumns] = useState({});
  const [columnOrder, setColumnOrder] = useState([
    "column-1",
    "column-2",
    "column-3",
    "column-4",
    "column-5",
    "column-6"
  ]);

  const initialData = {
    columns: {
      "column-1": {
        id: "column-1",
        notesIds: []
      },
      "column-2": {
        id: "column-2",
        notesIds: []
      },
      "column-3": {
        id: "column-3",
        notesIds: []
      },
      "column-4": {
        id: "column-4",
        notesIds: []
      },
      "column-5": {
        id: "column-5",
        notesIds: []
      },
      "column-6": {
        id: "column-6",
        notesIds: []
      }
    }
  };

  const [dndState, setDndState] = useState(initialData);

  useEffect(() => {
    const subscription = store.subscribe(() => {
      setDndState({
        ...dndState,
        notes: store.getState().notes.notes,
        columns: {
          ...dndState.columns,
          "column-1": {
            id: "column-1",
            notesIds: Object.keys(store.getState().notes.notes)
          }
        }
      });
    });
    return () => {
      subscription();
    };
  }, []);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    const start = dndState.columns[source.droppableId];
    const finish = dndState.columns[destination.droppableId];
    if (start === finish) {
      const newNotesIds = Array.from(start.notesIds);
      newNotesIds.splice(source.index, 1);
      newNotesIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        tasksIds: newNotesIds
      };

      const newState = {
        ...dndState,
        columns: {
          ...dndState.columns,
          [newColumn.id]: newColumn
        }
      };

      setDndState(newState);
      return;
    }
    const startNotesIds = Array.from(start.notesIds);
    startNotesIds.splice(source.index, 1);
    const newStart = {
      ...start,
      notesIds: startNotesIds
    };
    const finishNotesIds = Array.from(finish.notesIds);
    finishNotesIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      notesIds: finishNotesIds
    };
    const newState = {
      ...dndState,
      notes: {
        ...dndState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    setDndState(newState);
  };

  return (
    <NoteListContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        {columnOrder.map(columnId => {
          const column = dndState.columns[columnId];
          const notes = column.notesIds.map(noteId => dndState.notes[noteId]);
          return <Column key={column.id} column={column} notes={notes} />;
        })}
      </DragDropContext>
    </NoteListContainer>
  );
}

const mapStateToProps = state => {
  return {
    notes: state.notes.notes
  };
};

export default connect(
  mapStateToProps,
  {}
)(NoteList);
