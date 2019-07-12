import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import initialData from "./initialData.js";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

export const NoteListContainer = styled.div`
  margin: 10px;
  max-width: 100vw;
  display: flex;
  justify-content: space-between;
`;

function NoteList({ notes }) {
  const [dndState, setDndState] = useState(initialData);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
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
      <DragDropContext onDragStart={prop1 => {}} onDragEnd={onDragEnd}>
        {dndState.columnOrder.map(columnId => {
          const column = dndState.columns[columnId];
          const tasks = column.tasksIds.map(taskId => dndState.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />;
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
