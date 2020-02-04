import React, { useState } from 'react';
import {
  IconButton,
  Icon,
  ListContainer,
  ListItem,
  ListItemForm,
  // Checkbox,
  ListItemFormInput
} from '../NoteForm/NoteFormElements';
import Checkbox from '../NotesList/Checkbox';
import uuid from 'uuid';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function FormNoteList({
  checkList,
  setCheckList,
  deleteListItem,
  editMode = false
}) {
  const [listItem, setListItem] = useState('');
  const handleSubmit = (e) => {
    const uid = uuid();
    const newCheckList = {
      ...checkList,
      [uid]: {
        listItem: e.target.value,
        status: false,
        uid
      }
    };
    setCheckList(newCheckList);
    setListItem('');
  };
  const handleChange = (e, item) => {
    setCheckList({
      ...checkList,
      [item.uid]: {
        ...checkList[item.uid],
        listItem: e.target.value
      }
    });
  };
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      document.getElementById('listItemFormInput').focus();
    }
  };
  //TODO: refactor result function
  const onDragEnd = (result) => {
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (!destinationIndex || destinationIndex === sourceIndex) {
      return;
    }
    let movedItemId;
    let newCheckList = Object.values(checkList)
      .filter((listItem, index) => {
        if (index !== sourceIndex) return true;
        movedItemId = listItem.uid;
        return false;
      })
      .reduce((newCheckList, listItem, index) => {
        if (index === destinationIndex) {
          newCheckList[movedItemId] = {
            uid: movedItemId,
            listItem: checkList[movedItemId].listItem
          };
        }
        newCheckList[listItem.uid] = {
          uid: listItem.uid,
          listItem: listItem.listItem
        };
        return newCheckList;
      }, {});
    if (Object.values(newCheckList).length !== destinationIndex + 1) {
      newCheckList[movedItemId] = {
        uid: movedItemId,
        listItem: checkList[movedItemId].listItem
      };
    }
    setCheckList(newCheckList);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
            {Object.values(checkList).map((item, i, arr) => (
              <Draggable
                isDragDisabled={editMode}
                key={item.uid}
                draggableId={item.uid}
                index={i}
              >
                {(provided, snapshot) => (
                  <ListItem
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <span>
                      <Icon
                        {...provided.dragHandleProps}
                        className="fas fa-grip-vertical"
                      />
                      <Checkbox
                        handleCheck={() => {
                          setCheckList({
                            ...checkList,
                            [item.uid]: {
                              ...checkList[item.uid],
                              status: !checkList[item.uid].status
                            }
                          });
                        }}
                        listItem={checkList[item.uid]}
                      />
                      <ListItemFormInput
                        autoFocus={i === arr.length - 1}
                        value={checkList[item.uid].listItem}
                        onChange={(e) => handleChange(e, item)}
                        onKeyUp={handleKeyUp}
                      />
                    </span>
                    <IconButton
                      name={item.uid}
                      className="fas fa-times"
                      onClick={deleteListItem}
                    />
                  </ListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <ListItemForm marginPlaceholder={snapshot.isDraggingOver}>
              <Icon className="fas fa-plus" />
              <ListItemFormInput
                id="listItemFormInput"
                value={listItem}
                onChange={handleSubmit}
                autoFocus
                placeholder="Element listy"
              />
            </ListItemForm>
          </ListContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default FormNoteList;
