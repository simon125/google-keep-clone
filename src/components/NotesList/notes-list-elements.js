import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;
// position: relative;

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

export const NoteContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 12px 0 10px 0px;
  margin-bottom: 15px;
  background-color: ${(props) => props.bgColor};
  cursor: pointer;
  min-width: ${(props) => (props.isDraggable ? 'fit-content' : '80%')};
  max-width: 200px;
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
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
`;
