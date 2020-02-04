import React, { useState, useEffect, useRef } from 'react';
import uuid from 'uuid';
import {
  FormContainer,
  FormGroup,
  TitleField,
  NoteField,
  IconButton
} from './NoteFormElements';
import FormNoteList from '../FormNoteList/FormNoteList';
import TagList from '../TagList/TagList';
import NotesFormFooter from './NotesFormFooter';
import TextareaAutosize from 'react-autosize-textarea';
import { connect } from 'react-redux';
import {
  addNote,
  updateStructureLocally,
  clearEditNote
} from '../../redux/notes';
import { updateNote, updateStructure } from '../../firebase/firebaseAPI';
import {
  getListBasedOnLineTextBreak,
  getSingleNoteBasedOnList,
  checkIfTargetIsForm
} from '../../utils';

const hasCheckListItems = (checkList) => {
  if (checkList) {
    return Object.keys(checkList).length > 0;
  }
  return false;
};

function NoteForm({
  addNote,
  structure,
  editMode = false,
  editedNote,
  clearEditNote,
  updateStructureLocally
}) {
  const [editedNoteCopy] = useState({ ...editedNote });
  const [title, setTitle] = useState(editedNote.title ? editedNote.title : '');
  const [note, setNote] = useState(editedNote.note ? editedNote.note : '');
  const [checkList, setCheckList] = useState(
    editedNote.checkList ? editedNote.checkList : {}
  );
  const [isPinned, setIsPinned] = useState(
    editedNote.isPinned ? editedNote.isPinned : false
  );
  const [tags, setTags] = useState(editedNote.tags ? editedNote.tags : []);
  const [bgColor, setBgColor] = useState(
    editedNote.bgColor ? editedNote.bgColor : 'rgba(255,255,255,0.8)'
  );
  const [isInputOpen, setInputOpen] = useState(editMode);
  // here has a problem with converting undefined or null to object keys
  const [noteEditorMode, setNoteEditorMode] = useState(
    editMode && hasCheckListItems(editedNote.checkList) ? true : false
  );

  const titleInput = useRef();

  const toggleNoteEditorMode = () => {
    let newNote = '';
    let newNoteCheckList = {};

    if (noteEditorMode) {
      newNote = getSingleNoteBasedOnList(checkList);
    } else {
      newNoteCheckList = getListBasedOnLineTextBreak(note);
    }
    setNote(newNote);
    setCheckList(newNoteCheckList);
    setNoteEditorMode(!noteEditorMode);
  };

  const resetForm = () => {
    setTitle('');
    setNote('');
    setTags([]);
    setCheckList({});
    setIsPinned(false);
    setBgColor('rgba(255,255,255,0.8)');
    setNoteEditorMode(false);
    setInputOpen(false);
    if (editMode && clearEditNote) {
      clearEditNote();
    }
  };

  const validateFields = () => {
    return (note + title).trim() !== '' || Object.values(checkList).length > 0;
  };
  const checkIfNoteHasChanged = (changedFields) => {
    for (let prop in changedFields) {
      if (editedNoteCopy[prop] !== changedFields[prop]) {
        return true;
      }
    }
    return false;
  };
  const getChangedFields = (fields) => {
    const changedFields = {};

    for (let prop in fields) {
      if (editedNoteCopy[prop] !== fields[prop]) {
        changedFields[prop] = fields[prop];
      }
    }
    return changedFields;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleBodyClick = (e) => {
    const targetIsForm = checkIfTargetIsForm(e.target);

    if (targetIsForm) {
      return;
    } else if (!targetIsForm && validateFields()) {
      if (editMode) {
        const fields = {
          title,
          note,
          checkList,
          isPinned,
          tags,
          bgColor
        };
        if (checkIfNoteHasChanged(fields)) {
          const changedFields = getChangedFields(fields);
          updateNote(changedFields, editedNote.id).then(() => {
            if (changedFields.hasOwnProperty('isPinned')) {
              let noteStructure;
              if (!changedFields.isPinned) {
                noteStructure = { ...structure };
                for (let prop in noteStructure) {
                  noteStructure[prop].tasksIds = noteStructure[
                    prop
                  ].tasksIds.filter((taskId) => taskId !== editedNote.uuid);
                }
                noteStructure['column-1'].tasksIds.push(editedNote.uuid);
              } else {
                noteStructure = { ...structure };

                for (let prop in noteStructure) {
                  noteStructure[prop].tasksIds = noteStructure[
                    prop
                  ].tasksIds.filter((taskId) => taskId !== editedNote.uuid);
                }
                noteStructure['column-5'].tasksIds.push(editedNote.uuid);
              }
              updateStructure(noteStructure);
              updateStructureLocally(noteStructure);
            }
          });
        }
      } else {
        const newUuid = uuid();
        const newNote = {
          title,
          note,
          checkList,
          isPinned,
          tags,
          bgColor,
          column: isPinned ? 5 : 1, // These numbers are starting indexes of columns in note lists
          uuid: newUuid
        };
        addNote(newNote);
      }
    }
    setInputOpen(false);
    resetForm();
  };

  const deleteListItem = (e) => {
    const newCheckListItems = {
      ...checkList
    };
    delete newCheckListItems[e.target.name];
    setCheckList(newCheckListItems);
  };

  useEffect(() => {
    document.body.addEventListener('mousedown', handleBodyClick);

    return () => {
      document.body.removeEventListener('mousedown', handleBodyClick);
    };
  }, [editMode, handleBodyClick, isInputOpen, tags]);

  return (
    <FormContainer bgColor={bgColor} className="note-form">
      {' '}
      {(isInputOpen || editMode) && (
        <FormGroup>
          <TitleField
            ref={titleInput}
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tytuł"
          />
          <IconButton
            className={isPinned ? 'icon-pin' : 'icon-pin-outline'}
            onClick={() => setIsPinned(!isPinned)}
          />{' '}
        </FormGroup>
      )}{' '}
      <FormGroup>
        {' '}
        {noteEditorMode ? (
          <FormNoteList
            editMode={editMode}
            checkList={checkList}
            setCheckList={setCheckList}
            deleteListItem={deleteListItem}
          />
        ) : (
          <TextareaAutosize
            style={{
              ...NoteField,
              resize: 'none'
            }}
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onClick={() => setInputOpen(true)}
            placeholder="Utwórz notatkę..."
          />
        )}{' '}
        {!isInputOpen && !editMode && (
          <IconButton
            className="far fa-check-square fa-lg"
            onClick={() => {
              setNoteEditorMode(true);
              setInputOpen(true);
            }}
          />
        )}{' '}
      </FormGroup>{' '}
      <TagList tags={tags} setTags={setTags} />
      {(isInputOpen || editMode) && (
        <NotesFormFooter
          chosenTags={tags}
          setTags={setTags}
          bgColor={bgColor}
          setBgColor={setBgColor}
          handleCloseClick={resetForm}
          noteEditorMode={noteEditorMode}
          handleToggleClick={toggleNoteEditorMode}
        />
      )}{' '}
    </FormContainer>
  );
}
const mapStateToProps = (state) => {
  return {
    structure: {
      ...state.notes.noteStructure
    },
    editedNote: { ...state.notes.editedNote }
  };
};

const mapDispatchToProps = {
  addNote,
  updateStructureLocally,
  clearEditNote
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);
