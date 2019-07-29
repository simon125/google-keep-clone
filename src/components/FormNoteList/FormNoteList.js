import React, { useState } from "react";
import {
  Tool,
  Icon,
  ListContainer,
  ListItem,
  ListItemForm,
  Checkbox,
  ListItemFormInput
} from "../Notes/notes-elements";
import uuid from "uuid";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function FormNoteList({ noteState, setNoteState, handleDeleteListItem }) {
  const [listItemName, setListItemName] = useState("");

  const handleSubmit = e => {
    const uid = uuid();
    const newNoteState = {
      ...noteState,
      checkListItems: {
        ...noteState.checkListItems,
        [uid]: {
          listItemName: e.target.value,
          uid
        }
      }
    };
    setNoteState(newNoteState);
    setListItemName("");
  };
  const handleChange = (e, item) => {
    setNoteState({
      ...noteState,
      checkListItems: {
        ...noteState.checkListItems,
        [item.uid]: {
          ...noteState.checkListItems[item.uid],
          listItemName: e.target.value
        }
      }
    });
  };
  const handleKeyUp = e => {
    if (e.key === "Enter") {
      document.getElementById("listItemFormInput").focus();
    }
  };
  return (
    <DragDropContext
      onDragEnd={result => {
        if (
          !result.destination ||
          result.destination.index === result.source.index
        ) {
          return;
        }

        console.log(result);
        let newCheckListItems = {};
        const draggableId = result.draggableId;
        const destinationIndex = result.destination.index;
        let index = 0;
        // debugger;
        for (let prop in noteState.checkListItems) {
          if (index === destinationIndex) {
            newCheckListItems = {
              ...newCheckListItems,
              [draggableId]: {
                ...noteState.checkListItems[draggableId]
              }
            };
          }
          if (prop === draggableId) continue;
          newCheckListItems = {
            ...newCheckListItems,
            [prop]: {
              ...noteState.checkListItems[prop]
            }
          };
          index++;
        }
        setNoteState({ ...noteState, checkListItems: newCheckListItems });
        debugger;
      }}
    >
      <Droppable droppableId="droppable">
        {(droppableProvided, droppableSnapshot) => (
          <ListContainer
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
          >
            {Object.values(noteState.checkListItems).map((item, i, arr) => (
              <Draggable key={item.uid} draggableId={item.uid} index={i}>
                {(provided, draggableSnapshot) => (
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
                        value={noteState.checkListItems[item.uid].listItemName}
                        onChange={e => handleChange(e, item)}
                        onKeyUp={handleKeyUp}
                      />
                    </span>
                    <Tool
                      name={item.uid}
                      className="fas fa-times"
                      onClick={handleDeleteListItem}
                    />
                  </ListItem>
                )}
              </Draggable>
            ))}

            <ListItemForm
              marginPlaceholder={droppableSnapshot.draggingFromThisWith}
            >
              <Icon className="fas fa-plus" />
              <ListItemFormInput
                id="listItemFormInput"
                value={listItemName}
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
