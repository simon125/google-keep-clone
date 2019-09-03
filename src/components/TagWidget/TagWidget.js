import React, { useState } from "react";
import {
  TagWidgetContainer,
  TagFormContainer,
  Icon,
  IconButton, //change path
  WidgetTitle,
  TagInput,
  AddTagBtn
} from "./widget-elements";
import "./scrollbar.css";
import { connect } from "react-redux";
import { addTag } from "../../redux/notes";
import AvaiableTags from "./AvaiableTags";

function TagWidget({ chosenTags, setTags, tags = [], addTag }) {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const tag = newTagName.trim();
    if (tag !== "" && tags.every(tag => newTagName.trim() !== tag.name)) {
      addTag({ name: tag }); //Redux action creator
      setTags([...chosenTags, tag]); //Hook for note form // TODO: check if there is no better practise for that
      setNewTagName("");
    }
  };

  const checkDuplicates = () => {
    return tags.every(tag => newTagName.trim() !== tag.name);
  };

  return (
    <TagWidgetContainer>
      <IconButton onClick={() => setIsWidgetOpen(!isWidgetOpen)}>
        <Icon className="fas fa-tags" />
      </IconButton>
      {isWidgetOpen && (
        <TagFormContainer>
          <WidgetTitle>Etykieta notatki</WidgetTitle>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", alignItems: "center" }}
          >
            <TagInput
              value={newTagName}
              onChange={e => setNewTagName(e.target.value)}
              maxLength="15"
              placeholder="Wpisz nazwę etykiety"
              type="text"
            />
            <Icon
              style={{ fontSize: "13px", color: "#666", marginBottom: "2px" }}
              className="fas fa-search"
            />
          </form>

          <AvaiableTags tags={tags} chosenTags={chosenTags} setTags={setTags} />
          {newTagName && checkDuplicates() && (
            <AddTagBtn onClick={handleSubmit}>
              <span className="fas fa-plus fa-xs" style={{ margin: "0 4px" }} />{" "}
              Utwórz etykietę "{newTagName}"
            </AddTagBtn>
          )}
        </TagFormContainer>
      )}
    </TagWidgetContainer>
  );
}

const mapStateToProps = state => {
  return {
    tags: state.notes.tags
  };
};

const mapDispatchToProps = {
  addTag
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagWidget);
