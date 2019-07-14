import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  FormToolsGroup,
  CloseBtn,
  TitleField,
  NoteField,
  Tool,
  Icon
} from "./notes-elements";
import "../../images/fontello.css";

import { connect } from "react-redux";
import { addNote } from "../../redux/notes";
import ColorPicker from "../ColorPicker/ColorPicker";
import TagWidget from "../TagWidget/TagWidget";

function NotesForm({ addNote, availableTags }) {
  const [isInputOpen, toggleInput] = useState(false);
  const [noteState, setNoteState] = useState({
    title: "",
    checkList: false,
    checkListItems: [],
    note: "",
    pinned: "",
    tags: [],
    bgColor: "transparent"
  });
  const handlePinClick = () => {
    setNoteState({ ...noteState, pinned: !noteState.pinned });
  };
  const switchNoteType = () => {
    setNoteState({ ...noteState, checkList: !noteState.checkList });
  };
  const resetNoteState = () => {
    setNoteState({
      title: "",
      checkList: false,
      checkListItems: [],
      note: "",
      pinned: "",
      tags: [],
      bgColor: "transparent"
    });
  };
  const handleCloseClick = () => {
    resetNoteState();
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
  useEffect(() => {
    if (noteState.note.trim() + noteState.title.trim() !== "") {
      addNote(noteState);
    }
    if (!isInputOpen) {
      resetNoteState();
    }
  }, [isInputOpen]);

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClick);
    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  });

  return (
    <Form className="note-form">
      {isInputOpen ? (
        <FormGroup>
          <TitleField
            name="title"
            value={noteState.title}
            onChange={handleChange}
            onClick={e => toggleInput(true)}
            placeholder="Tytuł"
            type="text"
          />
          {noteState.pinned ? (
            <Tool onClick={handlePinClick}>
              <Icon className="icon-pin" />
            </Tool>
          ) : (
            <Tool onClick={handlePinClick}>
              <Icon className="icon-pin-outline" />
            </Tool>
          )}
        </FormGroup>
      ) : (
        ""
      )}
      <FormGroup>
        <NoteField
          name="note"
          value={noteState.note}
          onChange={handleChange}
          onClick={e => toggleInput(true)}
          placeholder="Utwórz notatkę..."
          type="text"
        />
        {isInputOpen ? (
          ""
        ) : (
          <Tool
            onClick={() => {
              setNoteState({ ...noteState, checkList: true });
              toggleInput(true);
            }}
          >
            <Icon className="far fa-check-square fa-lg" />
          </Tool>
        )}
      </FormGroup>
      <div>
        <ul style={{ display: "flex", listStyle: "none", flexWrap: "wrap" }}>
          {noteState.tags.map(tag => (
            <li
              style={{
                color: "#666",
                background: "rgb(240,240,240)",
                borderRadius: "20px",
                padding: "3px 7px",
                margin: "5px 2px"
              }}
              key={tag}
            >
              {tag}
              <span
                style={{ marginLeft: "2px", cursor: "pointer" }}
                onClick={() => {
                  const newTags = noteState.tags.filter(el => el !== tag);
                  setNoteState({ ...noteState, tags: newTags });
                }}
              >
                &times;
              </span>
            </li>
          ))}
        </ul>
      </div>
      {isInputOpen ? (
        <FormToolsGroup>
          {noteState.checkList ? (
            <Tool onClick={switchNoteType}>
              <Icon className="far fa-clipboard" />
            </Tool>
          ) : (
            <Tool onClick={switchNoteType}>
              <Icon className="fas fa-list-ul" />
            </Tool>
          )}
          <TagWidget
            fetchedTags={availableTags}
            chosenTagsForNote={noteState.tags}
            setNewTagsForNote={tags => setNoteState({ ...noteState, tags })}
          />
          <ColorPicker
            chosenColor={noteState.bgColor}
            setColor={bgColor => setNoteState({ ...noteState, bgColor })}
          />
          <CloseBtn onClick={handleCloseClick}>Zamknij</CloseBtn>
        </FormToolsGroup>
      ) : (
        ""
      )}
    </Form>
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
