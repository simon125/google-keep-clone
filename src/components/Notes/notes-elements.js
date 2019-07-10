import styled from "styled-components";

export const NotesContainer = styled.section`
  height: 75vh;
`;
export const Form = styled.div`
  margin: 0 auto;
  width: 60%;
  min-height: 60px;
  background: #fefefe;
  border-radius: 5px;
  box-shadow: 1px 1px 8px 1px rgba(89, 89, 89, 0.53);
  padding: 20px 20px 6px 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const FormToolsGroup = styled(FormGroup)`
  margin-top: 20px;
  align-items: center;
`;
export const Icon = styled.span`
  width: 27px;
`;
export const Tool = styled.button`
  color: #666;
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`;
export const TitleField = styled.input`
  background: transparent;
  border: none;
  color: #666;
  outline: none;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 18px;
  width: 100%;
`;
export const NoteField = styled.input`
  background: transparent;
  border: none;
  color: #666;
  outline: none;
  letter-spacing: 0.7px;
  font-size: 15px;
  width: 100%;
`;
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
