import styled from 'styled-components';

export const Pallette = styled.div`
  position: absolute;
  top: -115px;
  left: -50px;
  z-index: 10;
  background: #fff;
  box-shadow: 0px 0px 2px 1px rgba(122, 122, 122, 0.5);
  width: 125px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
export const Icon = styled.span`
  color: ${(props) => (props.color ? props.color : 'auto')};
`;
export const Button = styled.button`
  color: #666;
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`;
export const Color = styled.button`
  box-shadow: 0px 0px 2px 1px rgba(122, 122, 122, 0.5);
  opacity: 0.8;
  margin: 5px;
  outline: none;
  background: ${(props) => props.color};
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  &:hover {
    border: 2px solid #333;
    box-shadow: none;
  }
`;
export const ColorPickerContainer = styled.div`
  position: relative;
`;
