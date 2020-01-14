import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

// SINGLE NOTE

export const TextNote = styled.p`
  word-break: break-word;
  white-space: pre-line;
`;

export const CheckListItem = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

// position: absolute;
// z-index: 999;
// top: 50%;
// left: 50%;
// transform: translate(-50%, -50%);
// height: 400px;
// width: 600px;

export const NoteContainer = styled.div`
  position: ${(props) => (props.editMode ? 'absolute' : '')};
  z-index: ${(props) => (props.editMode ? '999' : '')};
  top: ${(props) => (props.editMode ? '50%' : '')};
  left: ${(props) => (props.editMode ? '50%' : '')};
  transform: ${(props) => (props.editMode ? 'translate(-50%, -50%)' : '')};
  min-height: ${(props) => (props.editMode ? '400px' : '')};
  min-width: ${(props) => (props.editMode ? '600px' : '')};
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 12px 0 10px 0px;
  margin-bottom: 15px;
  background-color: ${(props) => props.bgColor};
  transition: all 1300ms;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isHovered ? '0px 0px 5px -2px rgba(0,0,0,0.75)' : ''};
  &:hover {
    cursor: default;
  }
`;

export const Title = styled.h4`
  margin-bottom: 5px;
  overflow: hidden;
  font-weight: 300;
  display: flex;
  justify-content: space-between;
`;

export const NoteContent = styled.div`
  padding-left: 15px;
  padding-right: 15px;
`;

/// COLUMN

export const ColumnContainer = styled.div`
  margin: 8px;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
export const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
`;
