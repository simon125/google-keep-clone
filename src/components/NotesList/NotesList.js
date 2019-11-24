import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import { updateStructureLocally } from '../../redux/notes';
import { connect } from 'react-redux';
import {
  updateStructure,
  getStructureFromDB
} from '../../firebase/firebaseAPI';
import equal from 'deep-equal';
import { Container } from './notes-list-elements';

const NOT_PINNED_COLUMNS = ['column-1', 'column-2', 'column-3', 'column-4'];
const PINNED_COLUMNS = ['column-5', 'column-6', 'column-7', 'column-8'];

class NotesList extends React.Component {
  componentDidMount() {
    getStructureFromDB();
  }

  componentDidUpdate(prevProps) {
    if (!equal(prevProps.structure, this.props.structure)) {
      updateStructure(this.props.structure);
    }
  }

  onDragEndRedux = (result) => {
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
    const start = this.props.structure[source.droppableId];
    const finish = this.props.structure[destination.droppableId];

    if (start === finish) {
      const newTasksIds = Array.from(start.tasksIds);
      newTasksIds.splice(source.index, 1);
      newTasksIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        tasksIds: newTasksIds
      };

      const newStructure = {
        ...this.props.structure,
        [newColumn.id]: newColumn
      };
      this.props.updateStructureLocally(newStructure);
      return;
    }
    // Moving from one list to another
    const startTasksIds = Array.from(start.tasksIds);
    startTasksIds.splice(source.index, 1);
    const newStart = {
      ...start,
      tasksIds: startTasksIds
    };

    const finishTasksIds = Array.from(finish.tasksIds);
    finishTasksIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      tasksIds: finishTasksIds
    };

    const newStructure = {
      ...this.props.structure,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish
    };

    this.props.updateStructureLocally(newStructure);
  };

  render() {
    const { notes, structure, isPinnedList = false } = this.props;
    const columns = isPinnedList ? PINNED_COLUMNS : NOT_PINNED_COLUMNS;
    if (
      Object.keys(notes).length === 0 ||
      Object.keys(structure).length === 0
    ) {
      return <h1>Loading</h1>;
    }
    return (
      <DragDropContext onDragEnd={this.onDragEndRedux}>
        <Container>
          {columns.map((columnId) => {
            const column = structure[columnId];
            const tasks = column.tasksIds.map(
              (taskId) =>
                Object.values(notes).filter((note) => note.uuid === taskId)[0]
            );
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

export default connect(mapStateToProps, { updateStructureLocally })(NotesList);
