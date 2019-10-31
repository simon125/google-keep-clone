import React from 'react';
import TagWidget from '../TagWidget/TagWidget';
import ColorPicker from '../ColorPicker/ColorPicker';
import { FormToolsGroup, CloseBtn, IconButton } from './NoteFormElements';

function NotesFormFooter({
  chosenTags,
  setTags,
  bgColor,
  setBgColor,
  handleToggleClick,
  handleCloseClick,
  noteEditorMode,
  closeOption = true,
  isHovered = true,
  children
}) {
  return (
    <FormToolsGroup isHovered={isHovered}>
      <IconButton
        className={noteEditorMode ? 'far fa-clipboard' : 'fas fa-list-ul'}
        onClick={handleToggleClick}
      />
      <TagWidget chosenTags={chosenTags} setTags={setTags} />
      <ColorPicker chosenColor={bgColor} setBgColor={setBgColor} />
      {closeOption && <CloseBtn onClick={handleCloseClick}>Zamknij</CloseBtn>}
      {children}
    </FormToolsGroup>
  );
}

export default NotesFormFooter;
