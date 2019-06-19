import styled from "styled-components";

export const InputField = styled.input`
  margin: 10px 5px;
  border: 1px solid #bbb;
  border-radius: 5px;
  outline: none;
  padding-left: 15px;
  width: 200px;
  height: 30px;
`;

export const SubmitButton = styled.button`
  letter-spacing: 0.3px;
  margin: 5px;
  outline: none;
  width: 200px;
  height: 35px;
  border: none;
  background: #f6d622;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: #ffa500;
  }
`;

export const SocialsContainer = styled.div`
  margin: 5px;
  width: 450px;
  display: flex;
  justify-content: space-between;
`;

export const FacebookBtn = styled.button`
  letter-spacing: 0.3px;
  background: #3b5998;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  width: 48%;
  padding: 7px;
  border-radius: 5px;
`;

export const GoogleBtn = styled.button`
  letter-spacing: 0.3px;
  background: #db3236;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  width: 48%;
  padding: 7px;
  border-radius: 5px;
`;

export const AuthContainer = styled.div`
  width: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

export const FormHeader = styled.h3`
  letter-spacing: 0.3px;
  text-align: center;
  margin: 3px 0 8px 0;
  color: #555;
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Label = styled.label`
  letter-spacing: 0.3px;
  margin-top: 5px;
  color: #555;
`;
export const RememberMeLabel = styled(Label)`
  margin-top: 0;
`;
