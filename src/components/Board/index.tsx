import React from 'react';
import { Word, WordProps } from '../Word';

import { Container } from './styles';

interface Props {
  words: WordProps[][];
  finished: boolean;
  line: number;
  position: number;
  onClick: (position: number) => void;
}

export const Board: React.FC<Props> = ({
  words,
  finished,
  line,
  position,
  onClick,
}) => (
  <Container>
    {words.map((word, index) => (
      <Word
        key={`board-word-${index}`}
        word={word}
        finished={finished}
        disabled={index < line || line < index}
        losted={index < line}
        position={position}
        onClick={onClick}
      />
    ))}
  </Container>
);
