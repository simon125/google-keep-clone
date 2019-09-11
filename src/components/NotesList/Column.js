import React from 'react';
import styled from 'styled-components';
import Task from './Note';
import { Droppable } from 'react-beautiful-dnd';

const TaskList = styled.div`
  padding: 8px;
  margin-top: 10px;
  background: #eee;
  width: 250px;
  display: flex;
  flex-direction: column;
`;

function Column({ column, tasks }) {
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <TaskList ref={provided.innerRef} {...provided.droppableProps}>
          {tasks.map((task, index) => (
            <Task key={task.id} className={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </TaskList>
      )}
    </Droppable>
  );
}

export default Column;
