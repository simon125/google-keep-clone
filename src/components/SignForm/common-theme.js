import styled from "styled-components";

export const InputField = styled.input`
  margin: 5px;
  outline: none;
  padding-left: 15px;
  width: 200px;
  height: 30px;
`;

export const SubmitButton = styled.button`
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

export const Socials = styled.div`
  margin: 5px;
  width: 200px;
  display: flex;
  justify-content: space-between;
`;

export const FacebookBtn = styled.button`
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
  background: #db3236;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  width: 48%;
  padding: 7px;
  border-radius: 5px;
`;
