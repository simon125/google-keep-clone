import React from 'react';
import TagWidget from '../TagWidget/TagWidget';
import ColorPicker from '../ColorPicker/ColorPicker';
import {
  FormToolsGroup,
  CloseBtn,
  IconButton
} from '../NoteForm/notes-elements';

function NotesFormFooter({
  chosenTags,
  setTags,
  bgColor,
  setBgColor,
  handleToggleClick,
  handleCloseClick,
  noteEditorMode
}) {
  return (
    <FormToolsGroup>
      <IconButton
        className={noteEditorMode ? 'far fa-clipboard' : 'fas fa-list-ul'}
        onClick={handleToggleClick}
      />
      <TagWidget chosenTags={chosenTags} setTags={setTags} />
      <ColorPicker chosenColor={bgColor} setBgColor={setBgColor} />
      <CloseBtn onClick={handleCloseClick}>Zamknij</CloseBtn>
    </FormToolsGroup>
  );
}

export default NotesFormFooter;
