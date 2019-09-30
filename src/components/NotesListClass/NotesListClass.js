import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import initialData from './initialData';
import Column from './Column';
import { setLastIndex } from '../../redux/notes';
import { connect } from 'react-redux';
import {
  updatePositionOnNoteList,
  getNotesDB,
  updateStructure
  //   getCurrentStructure
} from '../../firebase/firebaseAPI';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

class NotesListClass extends React.Component {
  state = {
    notes: {},
    columns: {},
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4']
  };

  componentDidUpdate(prevProps) {}

  static getDerivedStateFromProps(props, state) {}

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    debugger;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.props.structure[source.droppableId];
    const finish = this.props.structure[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.tasksIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        tasksIds: newTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.props.structure,
          [newColumn.id]: newColumn
        }
      };
      debugger;
      updateStructure(newState.columns);
      this.setState(newState);
      return;
    }

    // Moving from one list to another
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
      ...this.state,
      columns: {
        ...this.props.structure,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    debugger;
    updateStructure(newState.columns);
    this.setState(newState);
  };

  render() {
    console.log(this.props);
    const { structure, notes } = this.props;
    if (
      Object.values(structure).reduce((sum, el) => {
        return sum + el.tasksIds.length;
      }, 0) === 0 ||
      Object.keys(notes).length === 0
    ) {
      return <h1>Loading...</h1>;
    }
    // debugger;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {this.state.columnOrder.map((columnId) => {
            const column = structure[columnId];
            const tasks = column.tasksIds.map(
              (taskId) =>
                Object.values(notes).filter((note) => note.uuid === taskId)[0]
            );
            // debugger;
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Container>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: { ...state.notes.notes },
    structure: { ...state.notes.noteStructure }
  };
};

export default connect(
  mapStateToProps,
  { setLastIndex }
)(NotesListClass);
