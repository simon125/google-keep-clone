import styled from 'styled-components';

export const NotesContainer = styled.section`
  box-sizing: border-box;
  padding-top: 50px;
  min-height: 84vh;
`;
export const FormContainer = styled.div`
  margin: 0 auto;
  width: 600px;
  min-height: 60px;
  transition: background 0.2s;
  background: ${(props) =>
    props.bgColor === 'transparent' ? '#fefefe' : props.bgColor};
  border-radius: 5px;
  box-shadow: 1px 1px 8px 1px rgba(89, 89, 89, 0.53);
  padding: 20px 0px 6px 0px;
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const FormToolsGroup = styled(FormGroup)`
  margin: 20px 20px 0 20px;
  align-items: center;
  transition: opacity 200ms;
  opacity: ${(props) => (props.isHovered ? 1 : 0)};
`;
// export const Icon = styled.span`
//   width: 27px;
// `;
export const Icon = styled.span`
  margin-right: 15px;
  color: #999;
  cursor: pointer;
`;
export const IconButton = styled.button`
  opacity: ${(props) => (props.opacity ? props.opacity : '1')}
  color: #666;
  border: none;
  margin-right: ${(props) => (props.margin ? props.margin : '15px')};
  background: transparent;
  outline: none;
  cursor: pointer;
  &:hover {
    color: #333;
    cursor: pointer;
  }
`;
export const TitleField = styled.input`
  background: transparent;
  border: none;
  color: #666;
  outline: none;
  font-size: 16px;
  font-weight: 400;
  margin: 0 20px 18px 20px;
  width: 100%;
`;
// export const NoteField = styled.textarea`
//   background: transparent;
//   border: none;
//   color: #666;
//   outline: none;
//   letter-spacing: 0.7px;
//   font-size: 15px;
//   width: 100%;
//   margin: 0 20px 0 20px;
//   height: auto;
// `;
export const NoteField = {
  background: 'transparent',
  border: 'none',
  color: '#666',
  outline: 'none',
  letterSpacing: '0.7px',
  fontSize: '15px',
  width: '100%',
  margin: ' 0 20px 0 20px',
  height: 'auto'
};
export const CloseBtn = styled.button`
  background: transparent;
  border: none;
  color: #444;
  outline: none;
  height: 35px;
  padding: 0 20px;
  cursor: pointer;
  margin-left: 40px;
  &:hover {
    background: rgba(240, 240, 240, 0.5);
  }
`;

export const ListContainer = styled.ul`
  width: 100%;
  list-style: none;
  max-height: 500px;
  overflow-y: auto;
`;
export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  background: inherit;
  ${Icon} {
    transition: opacity 0.1s;
    opacity: 0;
  }
  &:hover ${Icon} {
    opacity: 1;
  }
  ${IconButton} {
    transition: opacity 0.1s;
    opacity: 0;
  }
  &:hover ${IconButton} {
    opacity: 1;
  }
`;
export const ListItemForm = styled.li`
  border-top: 1px solid rgba(200, 200, 200, 0.9);
  border-bottom: 1px solid rgba(200, 200, 200, 0.9);
  padding: 10px 35px;
  width: 100%;
  display: flex;
  background: transparent;
  margin-top: ${(props) => (props.marginPlaceholder ? '38px' : 0)};
`;
export const Checkbox = styled.input`
  margin-right: 10px;
`;
export const ListItemFormInput = styled.input`
  border: none;
  outline: none;
  flex-grow: 1;
  background: transparent;
`;
