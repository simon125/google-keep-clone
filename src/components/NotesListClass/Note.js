import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { IconButton } from '../NoteForm/NoteFormElements';
import NotesFormFooter from '../NoteForm/NotesFormFooter';
import { updateNote } from '../../firebase/firebaseAPI';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 12px 0 10px 0px;
  margin-bottom: 15px;
  background-color: ${(props) => props.bgColor};
  transition: background-color 300ms;
`;

const Title = styled.h4`
  margin-bottom: 5px;
  overflow: hidden;
  font-weight: 300;
  display: flex;
  justify-content: space-between;
`;

const NoteList = styled.ul`
  list-style: none;
`;
const ListItem = styled.li`
  margin-bottom: 4px;
`;
const NoteContent = styled.div`
  padding-left: 15px;
  padding-right: 15px;
`;

export default class Task extends React.Component {
  state = {
    isHovered: false,
    stage: Math.random()
  };

  getSplitedPhrases = (str) => {
    return str.match(/[\s\S]{1,10}/g).map((phrase, idx) => {
      return <p key={phrase + idx}>{phrase} </p>;
    });
  };

  handleMouseOver = (e) => {
    e.target.style.cursor = 'default';
    this.setState({ isHovered: true });
  };

  handleMouseLeave = (e) => {
    this.setState({ isHovered: false });
  };

  render() {
    const {
      task: { title, note, bgColor, tags, checkList, isPinned, id }
    } = this.props;
    debugger;

    const content =
      Object.values(checkList).length === 0
        ? note.split('\n').map((phrase) => {
            if (phrase.length > 10) {
              return this.getSplitedPhrases(phrase);
            } else {
              return /*<p key={phrase + Math.random()}>{*/ phrase /*}</p>*/;
            }
          })
        : Object.values(checkList).map((listItem) => {
            return <li key={listItem.listItem}>{listItem.listItem}</li>;
          });

    return (
      <Draggable draggableId={this.props.task.uuid} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            onMouseOver={this.handleMouseOver}
            onMouseLeave={this.handleMouseLeave}
            bgColor={this.props.task.bgColor}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <NoteContent {...provided.dragHandleProps}>
              {title !== '' && (
                <Title {...provided.dragHandleProps}>{title}</Title>
              )}

              {content}
            </NoteContent>
            <NotesFormFooter
              isHovered={this.state.isHovered}
              chosenTags={tags}
              setTags={() => {
                console.log(123);
              }}
              bgColor={bgColor}
              setBgColor={(color) => {
                updateNote(color, id);
                console.log(this.state.stage);
              }}
              noteEditorMode={note.trim() !== ''}
              handleToggleClick={() => {}}
              closeOption={false}
            >
              <IconButton
                style={{ marginLeft: '12px' }}
                className={'fas fa-ellipsis-v'}
                onClick={() => console.log(123)}
              />
            </NotesFormFooter>
          </Container>
        )}
      </Draggable>
    );
  }
}
