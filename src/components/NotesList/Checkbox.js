import React from 'react';
import styled from 'styled-components';

const CheckBoxContainer = styled.label`
  margin-right: 8px;
  cursor: pointer;
`;

export default function Checkbox({ handleCheck, listItem }) {
  return (
    <CheckBoxContainer>
      <i
        style={{ color: '#555' }}
        className={listItem.status ? 'far fa-check-square' : 'far fa-square'}
      />
      <input
        onClick={() => handleCheck(listItem)}
        style={{ display: 'none' }}
        type="checkbox"
      />
    </CheckBoxContainer>
  );
}
