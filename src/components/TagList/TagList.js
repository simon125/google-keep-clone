import React, { useState } from 'react';
import styled from 'styled-components';

const DeleteIcon = styled.span`
  opacity: ${(props) => (props.isHovered ? 1 : 0)};
  transition: all 0.2s;
  margin-left: 2px;
  cursor: pointer;
`;

export default function TagList({ tags, setTags, size = 'medium' }) {
  return (
    <>
      <ul
        style={{
          margin: size === 'small' ? '0 10px' : '0 15px',
          display: 'flex',
          listStyle: 'none',
          flexWrap: 'wrap',
          cursor: 'default'
        }}
      >
        {tags.map((tag) => (
          <Tag key={tag} setTags={setTags} tags={tags} tag={tag} size={size} />
        ))}
      </ul>
    </>
  );
}

const Tag = ({ tag, setTags, tags, size }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        color: '#666',
        background: 'rgba(129, 126, 121, 0.188)',
        borderRadius: '20px',
        padding: '3px 7px',
        margin: size === 'small' ? '3px 1px' : '5px 2px',
        fontSize: size === 'small' ? '12px' : ''
      }}
      key={tag}
    >
      {tag}
      <DeleteIcon
        isHovered={isHovered}
        onClick={() => {
          const newTags = tags.filter((el) => el !== tag);
          setTags(newTags);
        }}
      >
        <span className="fa fa-times fa-sm" />
      </DeleteIcon>
    </li>
  );
};
