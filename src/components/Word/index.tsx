import React from 'react';
import { Letter } from '../Letter';

import { Container } from './styles';

export type WordProps = {
  value: string;
  wrongPosition: boolean;
  rightPosition: boolean;
};

interface Props {
  word: WordProps[];
  finished: boolean;
  disabled: boolean;
  losted: boolean;
  position: number;
  onClick: (index: number) => void;
  hide?: boolean;
}

export const Word: React.FC<Props> = ({
  word,
  finished,
  disabled,
  losted,
  position,
  onClick,
  hide,
}) => {
  const wordArray: WordProps[] = Array.from(word);

  return (
    <Container rotate={1}>
      {wordArray.map((letter, index) => (
        <Letter
          key={`word-letter-${index}}`}
          value={hide ? '' : letter.value}
          rightPosition={letter.rightPosition}
          wrongPosition={letter.wrongPosition}
          type='show'
          disabled={disabled || finished}
          losted={losted}
          active={!disabled && !losted && position === index}
          onClick={() => onClick(index)}
        />
      ))}
    </Container>
  );
};
