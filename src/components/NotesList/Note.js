import React from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { IconButton } from '../NoteForm/NoteFormElements';
import NotesFormFooter from '../NoteForm/NotesFormFooter';
import { updateNote, removeNoteFromDB } from '../../firebase/firebaseAPI';
import { updateStructureLocally, deleteNote } from '../../redux/notes';
import TagList from '../TagList/TagList';
import cloneDeep from 'clone-deep';
import Checkbox from './Checkbox';
import {
  NoteContainer,
  Title,
  NoteContent,
  TextNote,
  CheckListItem
} from './notes-list-elements';
import uuid from 'uuid';

class Task extends React.Component {
  state = {
    isHovered: false,
    isContextMenuOpen: false
  };

  handleMouseOver = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  handleDeleteClick = () => {
    const {
      noteStructure,
      column,
      task,
      deleteNote,
      updateStructureLocally
    } = this.props;
    const newStructure = cloneDeep(noteStructure);
    newStructure[column].tasksIds = newStructure[column].tasksIds.filter(
      (taskId) => taskId !== task.uuid
    );

    deleteNote(task);
    updateStructureLocally(newStructure);
    removeNoteFromDB(task, column);
  };

  handleCheck = (listItem) => {
    const {
      task: { checkList, id }
    } = this.props;
    const newCheckList = { ...checkList };
    newCheckList[listItem.uid].status = !newCheckList[listItem.uid].status;
    updateNote({ checkList: newCheckList }, id);
  };

  handleToggleClick = () => {
    const { task } = this.props;
    if (Object.values(task.checkList).length === 0) {
      const newCheckList = {};
      task.note.split(/\n/).forEach((phrase) => {
        const newUid = uuid();
        newCheckList[newUid] = {
          uid: newUid,
          status: false,
          listItem: phrase
        };
      });
      updateNote({ checkList: newCheckList, note: '' }, task.id);
    } else {
      const newNote = Object.values(task.checkList)
        .map((note) => note.listItem)
        .join('\n');
      updateNote({ checkList: {}, note: newNote }, task.id);
    }
  };

  render() {
    const {
      task: { title, note, bgColor, tags, checkList, isPinned, id },
      index
    } = this.props;

    const { isHovered } = this.state;

    let content =
      Object.values(checkList).length === 0 ? (
        <TextNote>{note}</TextNote>
      ) : (
        Object.values(checkList).reduce(
          (listsToDisplay, listItem) => {
            const itemToDisplay = (
              <CheckListItem key={listItem.uid}>
                <Checkbox handleCheck={this.handleCheck} listItem={listItem} />
                <span
                  style={{
                    textDecoration: listItem.status ? 'line-through' : ''
                  }}
                >
                  {listItem.listItem}
                </span>
              </CheckListItem>
            );

            if (!listItem.status) {
              return [
                [...listsToDisplay[0], itemToDisplay],
                [...listsToDisplay[1]]
              ];
            } else {
              return [
                [...listsToDisplay[0]],
                [...listsToDisplay[1], itemToDisplay]
              ];
            }
          },
          [[], []]
        )
      );

    if (content.length > 1 && content[0].length > 0 && content[1].length > 0) {
      content = [
        ...content[0],
        <p
          key={Math.random()}
          style={{
            margin: '5px 0',
            borderTop: '1px solid rgb(205,205,205)'
          }}
        />,
        ...content[1]
      ];
    }

    return (
      <Draggable draggableId={this.props.task.uuid} index={index}>
        {(provided, snapshot) => (
          <NoteContainer
            onMouseOver={this.handleMouseOver}
            onMouseLeave={this.handleMouseLeave}
            isHovered={this.state.isHovered}
            bgColor={this.props.task.bgColor}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <NoteContent>
              {title !== '' && (
                <Title>
                  {title}
                  <IconButton
                    style={{
                      float: 'right',
                      marginRight: '0',
                      opacity: isHovered ? 1 : 0
                    }}
                    className={isPinned ? 'icon-pin' : 'icon-pin-outline'}
                    onClick={() => updateNote({ isPinned: !isPinned }, id)}
                  />
                </Title>
              )}
              {title === '' && (
                <IconButton
                  style={{
                    float: 'right',
                    marginRight: '0',
                    opacity: isHovered ? 1 : 0
                  }}
                  className={isPinned ? 'icon-pin' : 'icon-pin-outline'}
                  onClick={() => updateNote({ isPinned: !isPinned }, id)}
                />
              )}
              {content}
            </NoteContent>
            <TagList
              size="small"
              tags={tags}
              setTags={(newTags) => updateNote({ tags: [...newTags] }, id)}
            />

            <NotesFormFooter
              isHovered={isHovered}
              chosenTags={tags}
              setTags={(newTags) => {
                updateNote({ tags: [...newTags] }, id);
              }}
              bgColor={bgColor}
              setBgColor={(color) => {
                updateNote({ bgColor: color }, id);
              }}
              noteEditorMode={note.trim() === ''}
              handleToggleClick={this.handleToggleClick}
              closeOption={false}
            >
              <IconButton
                style={{
                  marginLeft: '12px'
                }}
                className={'fas fa-trash-alt'}
                onClick={this.handleDeleteClick}
              />
            </NotesFormFooter>
          </NoteContainer>
        )}
      </Draggable>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    noteStructure: state.notes.noteStructure
  };
};

export default connect(mapStateToProps, { updateStructureLocally, deleteNote })(
  Task
);
