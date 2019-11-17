import React from 'react';

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
          <li
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
            <span
              style={{ marginLeft: '2px', cursor: 'pointer' }}
              onClick={() => {
                const newTags = tags.filter((el) => el !== tag);
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
