import React from "react";

export default function TagList({ noteState, setNoteState }) {
  return (
    <>
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
    </>
  );
}
