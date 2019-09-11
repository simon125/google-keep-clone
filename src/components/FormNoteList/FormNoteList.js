import React, { useState } from 'react';
import {
  IconButton,
  Icon,
  ListContainer,
  ListItem,
  ListItemForm,
  Checkbox,
  ListItemFormInput
} from '../NoteForm/notes-elements';
import uuid from 'uuid';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function FormNoteList({ checkList, setCheckList, deleteListItem }) {
  const [listItem, setListItem] = useState('');
  const handleSubmit = (e) => {
    const uid = uuid();
    const newCheckList = {
      ...checkList,
      [uid]: {
        listItem: e.target.value,
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
  return (
    <DragDropContext
      onDragEnd={(result) => {
        if (
          !result.destination ||
          result.destination.index === result.source.index
        ) {
          return;
        }

        console.log(result);
        let newCheckList = {};
        const draggableId = result.draggableId;
        const destinationIndex = result.destination.index;
        let index = 0;
        // debugger;
        for (let prop in checkList) {
          if (prop === draggableId) continue;
          if (index === destinationIndex) {
            newCheckList = {
              ...newCheckList,
              [draggableId]: {
                ...checkList[draggableId]
              }
            };
          }
          newCheckList = {
            ...newCheckList,
            [prop]: {
              ...checkList[prop]
            }
          };
          index++;
        }
        setCheckList(newCheckList);
        debugger;
      }}
    >
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
            {Object.values(checkList).map((item, i, arr) => (
              <Draggable key={item.uid} draggableId={item.uid} index={i}>
                {(provided, snapshot) => (
                  <ListItem
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    // key={item.uid}
                  >
                    <span>
                      <Icon
                        {...provided.dragHandleProps}
                        className="fas fa-grip-vertical"
                      />
                      <Checkbox type="checkbox" />
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
