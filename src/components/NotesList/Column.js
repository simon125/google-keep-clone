import React from 'react';
import Task from './NoteDraggable';
import { Droppable } from 'react-beautiful-dnd';
import { ColumnContainer, TaskList } from './notes-list-elements';

export default class Column extends React.Component {
  render() {
    const { column, tasks } = this.props;
    return (
      <ColumnContainer>
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {tasks
                .sort((a, b) => a.row - b.row)
                .map((task, index) => {
                  return (
                    <Task
                      column={column.id}
                      key={task.uuid}
                      task={task}
                      index={index}
                    />
                  );
                })}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </ColumnContainer>
    );
  }
}
