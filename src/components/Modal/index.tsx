import React from 'react';
import { Word, WordProps } from '../Word';

import { Background, Button, Container, Content, Title } from './styles';

interface Props {
  words: WordProps[][];
  visible: boolean;
}

export const Modal: React.FC<Props> = ({ words, visible }) => {
  return visible ? (
    <Background>
      <Container>
        <Title>Parabéns!</Title>
        <Content>
          {words.map((word, index) => (
            <Word
              key={`board-word-${index}`}
              word={word}
              finished={visible}
              disabled={true}
              losted={true}
              position={5}
              onClick={(index: number) => {}}
              hide={true}
            />
          ))}
        </Content>
        <Button>Novo Jogo</Button>
      </Container>
    </Background>
  ) : (
    <></>
  );
};
