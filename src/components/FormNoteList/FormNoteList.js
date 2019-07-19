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
        if (!result.destination) {
          return;
        }

        console.log(result);
        let newNoteState = {};
        const uidOfDestination = Object.values(noteState.checkListItems)[
          result.destination.index
        ];
        const uidOfSource = result.draggableId;
        for (let prop in noteState.checkListItems) {
          if (prop === uidOfDestination) {
            newNoteState = {
              ...newNoteState,
              [uidOfSource]: noteState.checkListItems[uidOfSource],
              ...noteState
            };
            break;
          }
          if (prop === uidOfDestination) {
            continue;
          }
          newNoteState = {
            ...newNoteState,
            [prop]: noteState.checkListItems[prop]
          };
        }
        setNoteState({ ...noteState, checkListItems: newNoteState });
        debugger;
      }}
    >
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
            {Object.values(noteState.checkListItems).map((item, i, arr) => (
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

            <ListItemForm>
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
