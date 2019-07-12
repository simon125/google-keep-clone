import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import initialData from "./initialData.js";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

export const NoteListContainer = styled.div`
  margin: 10px;
  max-width: 100vw;
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
    const column = dndState.columns[source.droppableId];
    const newTaskIds = Array.from(column.tasksIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
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
  };

  return (
    <NoteListContainer>
      <DragDropContext onDragEnd={onDragEnd}>
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
