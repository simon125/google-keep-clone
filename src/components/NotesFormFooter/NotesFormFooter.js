import React from "react";
import TagWidget from "../TagWidget/TagWidget";
import ColorPicker from "../ColorPicker/ColorPicker";
import { FormToolsGroup, CloseBtn, Tool } from "../Notes/notes-elements";

function NotesFormFooter({
  noteState,
  setNoteState,
  handleToggleClick,
  handleCloseClick,
  availableTags
}) {
  return (
    <FormToolsGroup>
      {noteState.checkList ? (
        <Tool className="far fa-clipboard" onClick={handleToggleClick} />
      ) : (
        <Tool className="fas fa-list-ul" onClick={handleToggleClick} />
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
  );
}

export default NotesFormFooter;
