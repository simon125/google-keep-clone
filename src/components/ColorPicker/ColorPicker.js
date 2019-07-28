import React, { useState } from "react";
import styled from "styled-components";

const Pallette = styled.div`
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
const Icon = styled.span`
  color: ${props => (props.color ? props.color : "auto")};
`;
const Tool = styled.button`
  color: #666;
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`;
const Color = styled.button`
  box-shadow: 0px 0px 2px 1px rgba(122, 122, 122, 0.5);
  opacity: 0.8;
  margin: 5px;
  outline: none;
  background: ${props => props.color};
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  &:hover {
    border: 2px solid #333;
    box-shadow: none;
  }
`;
const ColorPickerContainer = styled.div`
  position: relative;
`;

function ColorPicker({ setColor, chosenColor = "transparent" }) {
  const [showPallette, togglePallette] = useState(false);
  const [hideTime, setHideTime] = useState(null);
  const colors = [
    "transparent",
    "#f28b82",
    "#fbbc04",
    "#fff475",
    "#ccff90",
    "#a7ffeb",
    "#cbf0f8",
    "#aecbfa",
    "#d7aefb",
    "#fdcfe8",
    "#e6c9a8",
    "#e8eaed"
  ];
  return (
    <ColorPickerContainer>
      <Tool>
        <Icon
          className="fas fa-paint-brush"
          onMouseOver={() => {
            const timeOut = setTimeout(() => {
              togglePallette(false);
            }, 1000);
            setHideTime(timeOut);
            togglePallette(true);
          }}
        />
      </Tool>
      {showPallette ? (
        <Pallette
          onMouseOver={() => clearTimeout(hideTime)}
          onMouseLeave={() => togglePallette(false)}
        >
          {colors.map((color, index) => (
            <Color onClick={() => setColor(color)} key={index} color={color}>
              {chosenColor === color ? (
                <Icon color="#ccc" className="fas fa-check" />
              ) : (
                ""
              )}
            </Color>
          ))}
        </Pallette>
      ) : (
        ""
      )}
    </ColorPickerContainer>
  );
}

export default ColorPicker;
