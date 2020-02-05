import styled from 'styled-components';

export const InputField = styled.input`
  margin: 4px 5px 8px 5px;
  outline: none;
  border: ${({ isInvalid }) =>
    isInvalid ? 'solid 1px red' : '1px solid #bbb'};
  border-radius: 5px;
  padding-left: 15px;
  width: 200px;
  height: 30px;
  @media (max-width: 500px) {
    width: 90vw;
    margin: 5px 0;
  }
`;
export const InputErrMsg = styled.p`
  position: relative;
  margin-top: -7px;
  margin-bottom: -4px;
  padding-left: 5px;
  color: red;
  font-size: 10px;
  display: ${({ isInvalid }) => (isInvalid ? 'block' : 'none')};
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
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s;
  &:hover {
    background: ${(props) => (props.disabled ? '' : '#ffa500')};
  }
  @media (max-width: 500px) {
    width: 90vw;
    margin: 5px 0;
  }
`;

export const SocialsContainer = styled.div`
  margin: 5px;
  width: 450px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 500px) {
    width: auto;
    flex-direction: column;
    margin: 5px 0;
  }
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
  @media (max-width: 500px) {
    width: 90vw;
    margin-top: 5px;
  }
`;

export const GoogleBtn = styled.button`
  letter-spacing: 0.3px;
  background: #db3236;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  width: 90%;
  margin: 0 auto;
  padding: 7px;
  border-radius: 5px;
  @media (max-width: 500px) {
    width: 90vw;
    margin-top: 5px;
  }
`;

export const AuthContainer = styled.div`
  width: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
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
  @media (max-width: 500px) {
    width: 100%;
  }
`;
export const Label = styled.label`
  letter-spacing: 0.3px;
  margin-top: 5px;
  color: #555;
`;
export const RememberMeLabel = styled(Label)`
  margin-top: 0;
`;
