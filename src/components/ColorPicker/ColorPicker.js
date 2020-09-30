import React, { useState } from 'react';
import {
  ColorPickerContainer,
  Button,
  Icon,
  Pallette,
  Color
} from './ColorPickerElements';

function ColorPicker({ setBgColor, chosenColor = 'rgba(255,255,255,0.8)' }) {
  const [isPalleteOpen, setIsPalleteOpen] = useState(false);
  const [hideTime, setHideTime] = useState(null);
  const colors = [
    'rgba(255,255,255,0.8)',
    '#f28b82',
    '#fbbc04',
    '#fff475',
    '#ccff90',
    '#a7ffeb',
    '#cbf0f8',
    '#aecbfa',
    '#d7aefb',
    '#fdcfe8',
    '#e6c9a8',
    '#e8eaed'
  ];
  return (
    <ColorPickerContainer>
      <Button>
        <Icon
          className="fas fa-paint-palette"
          onMouseOver={() => {
            const timeOut = setTimeout(() => {
              setIsPalleteOpen(false);
            }, 1000);
            setHideTime(timeOut);
            setIsPalleteOpen(true);
          }}
        />
      </Button>
      {isPalleteOpen && (
        <Pallette
          onMouseOver={() => clearTimeout(hideTime)}
          onMouseLeave={() => setIsPalleteOpen(false)}
        >
          {colors.map((color, index) => (
            <Color onClick={() => setBgColor(color)} key={index} color={color}>
              {chosenColor === color ? (
                <Icon color="#ccc" className="fas fa-check" />
              ) : (
                ''
              )}
            </Color>
          ))}
        </Pallette>
      )}
    </ColorPickerContainer>
  );
}

export default ColorPicker;
