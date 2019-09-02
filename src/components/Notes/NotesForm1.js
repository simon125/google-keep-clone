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
import NotesFormMenu from "../NotesFormFooter/NotesFormFooter";
import TextareaAutosize from "react-autosize-textarea";
import { connect } from "react-redux";
import { addNote } from "../../redux/notes";
import {
  getListBasedOnLineTextBreak,
  getSingleNoteBasedOnList,
  checkIfTargetIsForm
} from "../../utils";

function NotesForm({ addNote, availableTags }) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [checkList, setCheklist] = useState({});
  const [isPinned, setIsPinned] = useState(false);
  const [tags, setTags] = useState([]);
  const [bgColor, setBgColor] = useState("transparent");
  const [isInputOpen, toggleInput] = useState(false); //TODO: change name of it
  const [noteEditorMode, setNoteEditorMode] = useState[false];

  const toggleNoteEditorMode = () => {
    let newNote = "";
    let newNoteCheckList = {};

    if (noteEditorMode) {
      newNote = getSingleNoteBasedOnList(checkList);
    } else {
      newNoteCheckList = getListBasedOnLineTextBreak(note);
    }
    setNote(newNote);
    setCheklist(newNoteCheckList);
  };

  const resetForm = () => {
    setTitle("");
    setNote("");
    setTags([]);
    setCheklist({});
    setIsPinned(false);
    setBgColor("transparent");
    setNoteEditorMode(false);
    toggleInput(false);
  };

  const validateFields = () => {
    return (
      !isInputOpen &&
      ((note + title).trim() !== "" || Object.values(checkList).length > 0)
    );
  };

  const handleBodyClick = e => {
    const targetIsForm = checkIfTargetIsForm(e.target);
    if (!targetIsForm) {
      toggleInput(false);
    } else if (validateFields()) {
      const newNote = {
        title,
        note,
        checkList,
        isPinned,
        tags,
        bgColor,
        column: 1,
        row: 1
      };
      addNote(newNote);
    }
  };

  const handleDeleteListItem = e => {
    const newCheckListItems = { ...checkList };
    delete newCheckListItems[e.target.name];
    setCheklist(newCheckListItems);
  };

  useEffect(() => {
    document.body.addEventListener("mousedown", handleBodyClick);

    if (!isInputOpen) {
      resetForm();
    }
    return () => {
      document.body.removeEventListener("mousedown", handleBodyClick);
    };
  });

  return (
    <FormContainer bgColor={bgColor} className="note-form">
      {isInputOpen && (
        <FormGroup>
          <TitleField
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Tytuł"
          />
          <Tool
            className={isPinned ? "icon-pin" : "icon-pin-outline"}
            onClick={() => setIsPinned(!isPinned)}
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
            value={note}
            onChange={e => setNote(e.target.value)}
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
        <NotesFormMenu
          noteState={noteState}
          setNoteState={setNoteState}
          handleCloseClick={resetForm}
          handleToggleClick={toggleNoteEditorMode}
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
