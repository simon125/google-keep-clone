import React, { useState, useEffect } from "react";
import {
  TagWidgetContainer,
  TagFormContainer,
  Icon,
  Tool,
  WidgetTitle,
  TagInput,
  AddTagBtn,
  TagList,
  Tag,
  Checkbox,
  Label
} from "./widget-elements";
import "./scrollbar.css";
import { connect } from "react-redux";
import { addTag } from "../../redux/notes";
import { store } from "../../redux/storeConfig";

function TagWidget({
  chosenTagsForNote,
  setNewTagsForNote,
  fetchedTags = [],
  addTag
}) {
  const [showWidget, toggleWidget] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [tagsToDisplay, setNewTagsToDisplay] = useState([...fetchedTags]);
  const [noteTags, setNoteTags] = useState([...chosenTagsForNote]);

  const handleChange = e => setNewTagName(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    const tag = newTagName.trim();
    if (
      tag !== "" &&
      fetchedTags.every(tag => newTagName.trim() !== tag.name)
    ) {
      addTag({ name: tag });
      setNoteTags([...noteTags, tag]);
      setNewTagName("");
    }
  };

  useEffect(() => {
    const subscribe = store.subscribe(() => {
      setNewTagsToDisplay(store.getState().notes.tags);
    });
    if (newTagName.trim() !== "") {
      const filteredTags = fetchedTags.filter(tag =>
        tag.name.includes(newTagName)
      );
      setNewTagsToDisplay(filteredTags);
    } else {
      setNewTagsToDisplay(fetchedTags);
    }
    setNewTagsForNote(noteTags);

    return () => subscribe();
  }, [newTagName, noteTags]);

  // useEffect(() => {
  //   const subscribe = store.subscribe(() => {
  //     const actualTagsNote = store.getState().notes.tags;
  //     if (newTagName.trim() !== "") {
  //       const filteredTags = actualTagsNote.filter(tag =>
  //         tag.name.includes(newTagName)
  //       );
  //       setNewTagsToDisplay(filteredTags);
  //     } else {
  //       setNewTagsToDisplay(actualTagsNote);
  //     }
  //   });
  //   setNewTagsForNote(noteTags);
  //   return () => subscribe();
  // }, [newTagName, noteTags]);

  const handleCheckboxChange = e => {
    const isChecked = e.target.checked;
    const tag = e.target.value;
    if (isChecked && !noteTags.includes(tag)) {
      setNoteTags([...noteTags, tag]);
    } else {
      setNoteTags(noteTags.filter(noteTag => noteTag !== tag));
    }
  };

  return (
    <TagWidgetContainer>
      <Tool onClick={() => toggleWidget(!showWidget)}>
        <Icon className="fas fa-tags" />
      </Tool>
      {showWidget && (
        <TagFormContainer>
          <WidgetTitle>Etykieta notatki</WidgetTitle>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", alignItems: "center" }}
          >
            <TagInput
              value={newTagName}
              onChange={handleChange}
              maxLength="15"
              placeholder="Wpisz nazwę etykiety"
              type="text"
            />
            <Icon
              style={{ fontSize: "13px", color: "#666", marginBottom: "2px" }}
              className="fas fa-search"
            />
          </form>
          <TagList>
            {tagsToDisplay.map(tag => (
              <Tag key={tag.id}>
                <Checkbox
                  onChange={handleCheckboxChange}
                  value={tag.name}
                  checked={chosenTagsForNote.includes(tag.name)}
                  type="checkbox"
                />
                <Label>{tag.name}</Label>
              </Tag>
            ))}
          </TagList>

          {newTagName !== "" &&
          fetchedTags.every(tag => newTagName.trim() !== tag.name) ? (
            <AddTagBtn onClick={handleSubmit}>
              <span className="fas fa-plus fa-xs" style={{ margin: "0 4px" }} />{" "}
              Utwórz etykietę "{newTagName}"
            </AddTagBtn>
          ) : (
            ""
          )}
        </TagFormContainer>
      )}
    </TagWidgetContainer>
  );
}

const mapDispatchToProps = {
  addTag
};

export default connect(
  null,
  mapDispatchToProps
)(TagWidget);
