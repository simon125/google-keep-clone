import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { IconButton } from '../NoteForm/NoteFormElements';
import NotesFormFooter from '../NoteForm/NotesFormFooter';
import { updateNote, addTagToDB } from '../../firebase/firebaseAPI';
import TagList from '../TagList/TagList';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 12px 0 10px 0px;
  margin-bottom: 15px;
  background-color: ${(props) => props.bgColor};
  transition: background-color 300ms;
  box-shadow: ${(props) =>
    props.isHovered ? '0px 0px 5px -2px rgba(0,0,0,0.75)' : ''};
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

  toggleStatus = (e) => {
    updateNote('checkList', this.props.checkList.map(), this.props.id);
  };

  render() {
    const {
      task: { title, note, bgColor, tags, checkList, isPinned, id }
    } = this.props;
    debugger;

    let content =
      Object.values(checkList).length === 0
        ? note.split('\n').map((phrase) => {
            if (phrase.length > 10) {
              return this.getSplitedPhrases(phrase);
            } else {
              return /*<p key={phrase + Math.random()}>{*/ phrase /*}</p>*/;
            }
          })
        : Object.values(checkList).reduce(
            (listsToDisplay, listItem) => {
              const itemToDisplay = (
                <li
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '5px'
                  }}
                  key={listItem.uuid}
                >
                  <label style={{ marginRight: '8px' }}>
                    {listItem.status ? (
                      <i
                        style={{ color: '#555' }}
                        className="far fa-check-square"
                      ></i>
                    ) : (
                      <i
                        style={{ color: '#555' }}
                        className="far fa-square"
                      ></i>
                    )}
                    <input
                      onClick={() => {
                        console.log(checkList);
                        console.log(listItem.uid);
                        const newCheckList = { ...checkList };
                        newCheckList[listItem.uid].status = !newCheckList[
                          listItem.uid
                        ].status;
                        updateNote('checkList', newCheckList, id);
                        // checkList[listItem.uid].status
                      }}
                      style={{ display: 'none' }}
                      type="checkbox"
                    />
                  </label>
                  <span
                    style={{
                      textDecoration: listItem.status ? 'line-through' : ''
                    }}
                  >
                    {listItem.listItem}
                  </span>
                </li>
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
          );

    if (content.length > 1 && content[0].length > 0 && content[1].length > 0) {
      content = [
        ...content[0],
        <p
          style={{
            margin: '5px 0',
            borderTop: '1px solid rgb(205,205,205)'
          }}
        />,
        ...content[1]
      ];
    }

    return (
      <Draggable draggableId={this.props.task.uuid} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            onMouseOver={this.handleMouseOver}
            onMouseLeave={this.handleMouseLeave}
            isHovered={this.state.isHovered}
            bgColor={this.props.task.bgColor}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <NoteContent {...provided.dragHandleProps}>
              {title !== '' && (
                <Title {...provided.dragHandleProps}>
                  {title}
                  <IconButton
                    style={{
                      float: 'right',
                      marginRight: '0',
                      opacity: this.state.isHovered ? 1 : 0
                    }}
                    className={isPinned ? 'icon-pin' : 'icon-pin-outline'}
                    onClick={() => updateNote('isPinned', !isPinned, id)}
                  />
                </Title>
              )}
              {title === '' && (
                <IconButton
                  style={{
                    float: 'right',
                    marginRight: '0',
                    opacity: this.state.isHovered ? 1 : 0
                  }}
                  className={isPinned ? 'icon-pin' : 'icon-pin-outline'}
                  onClick={() => updateNote('isPinned', !isPinned, id)}
                />
              )}
              {content}
            </NoteContent>
            <TagList
              size="small"
              tags={tags}
              setTags={(newTags) => updateNote('tags', [...newTags], id)}
            />

            <NotesFormFooter
              isHovered={this.state.isHovered}
              chosenTags={tags}
              setTags={(newTags) => {
                updateNote('tags', [...newTags], id);
                // addTagToDB(tag);
              }}
              bgColor={bgColor}
              setBgColor={(color) => {
                updateNote('bgColor', color, id);
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
