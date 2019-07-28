import React, { useState, useEffect } from "react";
import {
  FormContainer,
  FormGroup,
  TitleField,
  NoteField,
  Tool
} from "./notes-elements";
import FormNoteList from "../FormNoteList/FormNoteList";
import TagList from "../TagList/TagList";
import NotesFormFooter from "../NotesFormFooter/NotesFormFooter";
import uuid from "uuid";
import TextareaAutosize from "react-autosize-textarea";
import { connect } from "react-redux";
import { addNote } from "../../redux/notes";

function NotesForm({ addNote, availableTags }) {
  const initialNoteState = {
    title: "",
    checkList: false,
    checkListItems: {},
    note: "",
    pinned: "",
    tags: [],
    bgColor: "transparent"
  };

  const [isInputOpen, toggleInput] = useState(false);
  const [noteState, setNoteState] = useState({ ...initialNoteState });

  const getListBasedOnLineTextBreak = text => {
    return text.split(/\r?\n/).reduce((newCheckList, nameOfListItem) => {
      const uid = uuid();
      return nameOfListItem.trim() === ""
        ? { ...newCheckList }
        : {
            ...newCheckList,
            [uid]: {
              listItemName: nameOfListItem,
              uid
            }
          };
    }, {});
  };

  const handleToggleClick = () => {
    const newNoteState = { ...noteState, checkList: !noteState.checkList };
    let newNote = "",
      newNoteCheckListItems = {};

    if (noteState.checkList) {
      newNote = Object.values(noteState.checkListItems)
        .map(el => el.listItemName)
        .join("\r\n");
    } else {
      newNoteCheckListItems = getListBasedOnLineTextBreak(noteState.note);
    }
    setNoteState({
      ...newNoteState,
      note: newNote,
      checkListItems: newNoteCheckListItems
    });
  };

  const handleCloseClick = () => {
    setNoteState({ ...initialNoteState });
    toggleInput(false);
  };

  const handleChange = e => {
    setNoteState({ ...noteState, [e.target.name]: e.target.value });
  };

  const checkIfTargetIsForm = target => {
    if (!target) return false;
    const className = target.className;
    if (className && className.includes("note-form")) {
      return true;
    }
    return checkIfTargetIsForm(target.parentElement);
  };

  const handleBodyClick = e => {
    const targetIsForm = checkIfTargetIsForm(e.target);
    if (!targetIsForm) {
      toggleInput(false);
    }
  };
  const handlePinClick = () =>
    setNoteState({ ...noteState, pinned: !noteState.pinned });

  const handleDeleteListItem = e => {
    const newCheckListItems = {};
    const currentCheckListItems = { ...noteState.checkListItems };
    debugger;
    for (let prop in currentCheckListItems) {
      if (prop !== e.target.name) {
        newCheckListItems[prop] = { ...currentCheckListItems[prop] };
      }
    }
    setNoteState({
      ...noteState,
      checkListItems: newCheckListItems
    });
  };

  useEffect(() => {
    document.body.addEventListener("mousedown", handleBodyClick);
    if (
      (!isInputOpen && noteState.note.trim() + noteState.title.trim() !== "") ||
      (!isInputOpen && Object.values(noteState.checkListItems).length > 0)
    ) {
      addNote(noteState);
    }
    if (!isInputOpen) {
      setNoteState({ ...initialNoteState });
    }
    return () => {
      document.body.removeEventListener("mousedown", handleBodyClick);
    };
  });

  return (
    <FormContainer bgColor={noteState.bgColor} className="note-form">
      {isInputOpen && (
        <FormGroup>
          <TitleField
            name="title"
            value={noteState.title}
            onChange={handleChange}
            placeholder="Tytuł"
          />
          <Tool
            className={noteState.pinned ? "icon-pin" : "icon-pin-outline"}
            onClick={handlePinClick}
          />
        </FormGroup>
      )}
      <FormGroup>
        {noteState.checkList ? (
          <FormNoteList
            noteState={noteState}
            setNoteState={setNoteState}
            handleDeleteListItem={handleDeleteListItem}
          />
        ) : (
          <TextareaAutosize
            style={{ ...NoteField, resize: "none" }}
            name="note"
            value={noteState.note}
            onChange={handleChange}
            onClick={() => toggleInput(true)}
            placeholder="Utwórz notatkę..."
          />
        )}
        {!isInputOpen && (
          <Tool
            className="far fa-check-square fa-lg"
            onClick={() => {
              setNoteState({ ...noteState, checkList: true });
              toggleInput(true);
            }}
          />
        )}
      </FormGroup>
      <TagList noteState={noteState} setNoteState={setNoteState} />

      {isInputOpen && (
        <NotesFormFooter
          noteState={noteState}
          setNoteState={setNoteState}
          handleCloseClick={handleCloseClick}
          handleToggleClick={handleToggleClick}
          availableTags={availableTags}
        />
      )}
    </FormContainer>
  );
}

const mapStateToProps = state => {
  return {
    availableTags: state.notes.tags
  };
};

const mapDispatchToProps = {
  addNote
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesForm);
