import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

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
  // debugger;
  const [columns, setColumns] = useState({
    'column-1': {
      id: 'column-1',
      notesIds: []
    },
    'column-2': {
      id: 'column-2',
      notesIds: []
    },
    'column-3': {
      id: 'column-3',
      notesIds: []
    },
    'column-4': {
      id: 'column-4',
      notesIds: []
    },
    'column-5': {
      id: 'column-5',
      notesIds: []
    },
    'column-6': {
      id: 'column-6',
      notesIds: []
    }
  });
  const [columnOrder, setColumnOrder] = useState([
    'column-1',
    'column-2',
    'column-3',
    'column-4',
    'column-5',
    'column-6'
  ]);
  useEffect(() => {
    // debugger;

    if (Object.values(notes).length) {
      const columnsToSet = Object.values(notes).reduce(
        (newColumns, note, index) => {
          let columns1;
          // debugger;
          if (newColumns.hasOwnProperty(`column-${note.column}`)) {
            columns1 = {
              ...newColumns,
              ['column-' + note.column]: {
                notesIds: [
                  ...newColumns[`column-${note.column}`].notesIds,
                  note.id
                ]
              }
            };
          } else {
            columns1 = {
              ...newColumns,
              ['column-' + note.column]: {
                notesIds: [note.id]
              }
            };
          }
          // debugger;
          return columns1;
        },
        {}
      );
      debugger;
      //fill gaps
      const keys = Object.keys(columnsToSet);
      const gaps = columnOrder.filter((key) => !keys.includes(key));
      gaps.forEach((key) => {
        columnsToSet[key] = {
          notesIds: [],
          id: key
        };
      });
      setColumns(columnsToSet);
    }
  }, [notes]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];
    if (start === finish) {
      const newNotesIds = Array.from(start.notesIds);
      newNotesIds.splice(source.index, 1);
      newNotesIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        tasksIds: newNotesIds
      };

      const newColumns = {
        ...columns,
        [newColumn.id]: newColumn
      };
      setColumns(newColumns);
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
      notes: {
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    setColumns(newState);
  };

  return (
    <NoteListContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        {columnOrder.map((columnId) => {
          const column = columns[columnId];
          const notesToDisplay = column.notesIds.map((noteId) => notes[noteId]);
          return (
            <Column key={column.id} column={column} notes={notesToDisplay} />
          );
        })}
      </DragDropContext>
    </NoteListContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes
  };
};

export default connect(
  mapStateToProps,
  {}
)(NoteList);
