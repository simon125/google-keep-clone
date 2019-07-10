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

function TagWidget({ chosenTags, setTags, tags = [], addTag }) {
  const [showWidget, toggleWidget] = useState(false);
  const [tagName, setTag] = useState("");
  const [tagsToDisplay, setTagsToDisplay] = useState([...tags]);
  const [noteTags, setNoteTags] = useState(chosenTags);

  const handleSubmit = e => {
    e.preventDefault();
    const tag = tagName.trim();
    if (tag !== "" && !tags.includes(tag)) {
      addTag({ name: tag });
      setNoteTags([...noteTags, tag]);
      setTag("");
    }
  };
  const handleChange = e => setTag(e.target.value);

  useEffect(() => {
    if (tagName.trim() !== "") {
      const filteredTags = tags.filter(tag => tag.name.includes(tagName));
      setTagsToDisplay(filteredTags);
    }
  }, [tagName]);
  useEffect(() => {
    if (noteTags) {
      setTags(noteTags);
      setTagsToDisplay(tags);
    }
  }, [noteTags]);

  store.subscribe(() => {
    setTagsToDisplay(store.getState().notes.tags);
  });

  const handleCheckboxChange = e => {
    const isChecked = e.target.checked;
    const tag = e.target.value;
    if (isChecked && !noteTags.includes(tag)) {
      setNoteTags([...noteTags, tag]);
    } else {
      setNoteTags(noteTags.filter(noteTag => noteTag !== tag));
    }
  };
  console.log("render");
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
              value={tagName}
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
                  checked={chosenTags.includes(tag.name)}
                  type="checkbox"
                />
                <Label>{tag.name}</Label>
              </Tag>
            ))}
          </TagList>

          {tagName !== "" && tags.every(tag => tagName.trim() !== tag.name) ? (
            <AddTagBtn onClick={handleSubmit}>
              <span className="fas fa-plus fa-xs" style={{ margin: "0 4px" }} />{" "}
              Utwórz etykietę "{tagName}"
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
