import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./scrollbar.css";

const TagWidgetContainer = styled.div`
  position: relative;
`;
const TagFormContainer = styled.div`
  position: absolute;
  top: 30px;
  left: -50px;
  z-index: 10;
  background: #fff;
  box-shadow: 0px 0px 2px 1px rgba(122, 122, 122, 0.5);
  width: fit-content;
  min-height: 160px;
  max-height: 260px;
  overflow: hidden;
  padding: 8px 0px 0px 0px;
  border-radius: 3px;
`;
const Icon = styled.span`
  margin-right: 13px;
`;
const Tool = styled.button`
  color: #666;
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`;
const WidgetTitle = styled.p`
  margin: 0 13px;
  font-size: 16px;
  color: #333;
`;
const TagInput = styled.input`
  margin: 15px 13px;
  outline: none;
  width: 180px;
  border: none;
  color: #666;
  font-size: 14px;
  line-height: 1.2;
  letter-spacing: 0.4px;
`;

const AddTagBtn = styled.button`
  width: 100%;
  background: #fff;
  font-size: 14px;
  color: #666;
  background: #fff;
  border: none;
  outline: none;
  border-top: 1px solid rgba(220, 220, 220, 1);
  position: sticky;
  bottom: 0;
  left: 0;
  text-align: left;
  padding: 5px 13px;
  cursor: pointer;
  &:hover {
    background: rgb(247, 247, 247);
  }
`;
const TagList = styled.ul`
  padding: 10px 0;
  overflow-y: scroll;
  height: 150px;
  list-style: none;
`;

const Tag = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 3px 13px;
  &:hover {
    background: rgb(247, 247, 247);
  }
`;
const Checkbox = styled.input`
  background: transparent;
`;
const Label = styled.label`
  margin-left: 7px;
  color: #666;
`;

function TagWidget({
  chosenTags,
  setTags,
  tags = ["test1", "test2", "test3", "test4", "test5", "test6"]
}) {
  const [showWidget, toggleWidget] = useState(true);
  const [tagName, setTag] = useState("");
  const [tagsToDisplay, setTagsToDisplay] = useState([...tags]);
  const [noteTags, setNoteTags] = useState(chosenTags);

  const handleSubmit = e => {
    e.preventDefault();
    const tag = tagName.trim();
    if (tag !== "" && !tags.includes(tag)) {
      alert("You have added new tag " + tagName);
      setNoteTags([...noteTags, tag]);
      setTag("");
    }
  };
  const handleChange = e => setTag(e.target.value);

  useEffect(() => {
    if (tagName.trim() !== "") {
      const filteredTags = tags.filter(tag => tag.includes(tagName));
      setTagsToDisplay(filteredTags);
    }
  }, [tagName]);
  useEffect(() => {
    if (noteTags) {
      setTags(noteTags);
      setTagsToDisplay(tags);
    }
  }, [noteTags]);

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
            {tagsToDisplay.map((tag, i) => (
              <Tag key={i}>
                <Checkbox
                  onChange={handleCheckboxChange}
                  value={tag}
                  checked={chosenTags.includes(tag)}
                  type="checkbox"
                />
                <Label>{tag}</Label>
              </Tag>
            ))}
          </TagList>

          {tagName !== "" && !tags.includes(tagName.trim()) ? (
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
export default TagWidget;
