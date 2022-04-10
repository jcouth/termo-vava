import React, { useRef } from 'react';
import { Letter } from '../Letter';

import { Container, Line } from './styles';

export type KeyboardPositionProps = {
  row: number;
  column: number;
};

export type KeyboardProps = {
  value: string;
  rightPosition: boolean;
  wrongPosition: boolean;
  losted: boolean;
};

interface Props {
  keys: KeyboardProps[][];
  onClick: (key: string) => void;
  onBack: () => void;
  onEnter: (keysPressed: KeyboardPositionProps[]) => void;
}

export const Keyboard: React.FC<Props> = ({
  keys,
  onClick,
  onBack,
  onEnter,
}) => {
  const keysPressed = useRef<KeyboardPositionProps[]>([]);

  const handleClick = (key: string, rowIndex: number, columnIndex: number) => {
    if (key === 'back') {
      onBack && onBack();
    } else if (key === 'enter') {
      onEnter && onEnter(keysPressed.current);
    } else {
      keysPressed.current.push({ row: rowIndex, column: columnIndex });
      onClick && onClick(key);
    }
  };

  return (
    <Container>
      {keys.map((line, rowIndex) => (
        <Line key={`keyboard-line-${rowIndex}`}>
          {line.map((key, columnIndex) => (
            <Letter
              key={`keyboard-letter-${columnIndex}`}
              value={key.value}
              type='button'
              spaced={key.value === 'back' || key.value === 'enter'}
              onClick={() => handleClick(key.value, rowIndex, columnIndex)}
              losted={key.losted}
              rightPosition={key.rightPosition}
              wrongPosition={key.wrongPosition}
            />
          ))}
        </Line>
      ))}
    </Container>
  );
};
