import React from "react";

export default function TagList({ tags, setTags }) {
  return (
    <>
      <ul
        style={{
          margin: "0 15px 0 15px",
          display: "flex",
          listStyle: "none",
          flexWrap: "wrap"
        }}
      >
        {tags.map(tag => (
          <li
            style={{
              color: "#666",
              background: "rgba(129, 126, 121, 0.188)",
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
                const newTags = tags.filter(el => el !== tag);
                setTags(newTags);
              }}
            >
              <span className="fa fa-times fa-sm" />
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
