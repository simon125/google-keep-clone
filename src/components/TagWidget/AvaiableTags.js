import React from "react";
import PropTypes from "prop-types";
import { TagList, Tag, Checkbox, Label } from "./widget-elements";

function AvaiableTags({ tags, setTags, chosenTags }) {
  const handleCheckboxChange = e => {
    const isChecked = e.target.checked;
    const tag = e.target.value;
    if (isChecked) {
      setTags([...chosenTags, tag]);
    } else {
      setTags(chosenTags.filter(chosenTag => chosenTag !== tag));
    }
  };

  return (
    <TagList>
      {tags.length !== 0 &&
        tags.map(tag => (
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
  );
}

AvaiableTags.propTypes = {
  tags: PropTypes.array.isRequired,
  setTags: PropTypes.func.isRequired,
  chosenTags: PropTypes.array.isRequired
};

export default AvaiableTags;
