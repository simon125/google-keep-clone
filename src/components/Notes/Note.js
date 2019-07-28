import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import Handle from "./Handle";
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: #fff;
  box-shadow: ${props =>
    props.isDragging
      ? "0px 0px 16px 1px rgba(0,0,0,0.25)"
      : "0px 0px 0px 0px rgba(0,0,0,0)"};
`;

function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          isDragging={snapshot.draggingOver}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
