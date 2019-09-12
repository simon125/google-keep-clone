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

function NoteList({ notes }) {
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
      }
    },
    columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-5"]
  };

  const [dndState, setDndState] = useState(initialData);

  useEffect(() => {
    const subscription = store.subscribe(() => {
      setDndState({
        ...dndState,
        tasks: store.getState().notes.notes,
        columns: {
          ...dndState.columns,
          "column-1": {
            id: "column-1",
            tasksIds: Object.keys(store.getState().notes.notes)
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
      const newTaskIds = Array.from(start.tasksIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        tasksIds: newTaskIds
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
    const startTaskIds = Array.from(start.tasksIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      tasksIds: startTaskIds
    };
    const finishTaskIds = Array.from(finish.tasksIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      tasksIds: finishTaskIds
    };
    const newState = {
      ...dndState,
      columns: {
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
        {dndState.columnOrder.map(columnId => {
          const column = dndState.columns[columnId];
          const notes = column.tasksIds.map(taskId => dndState.tasks[taskId]);
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
