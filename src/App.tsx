import React, { useEffect, useRef, useState } from 'react';
import { Board } from './components/Board';
import {
  Keyboard,
  KeyboardPositionProps,
  KeyboardProps,
} from './components/Keyboard';
import { Modal } from './components/Modal';
import { WordProps } from './components/Word';

import { Container } from './styles';

export type ClickProps =
  | {
      letter: string;
      positionClick?: never;
      isTrusted?: never;
    }
  | {
      letter?: never;
      positionClick: number;
      isTrusted: boolean;
    };

function App() {
  const [todayWord, setTodayWord] = useState<string>('');
  const [words, setWords] = useState<WordProps[][]>(
    Array(5).fill(
      Array(5).fill({
        value: '',
        wrongPosition: false,
        rightPosition: false,
      })
    )
  );
  const [_, reRender] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [keys, setKeys] = useState<KeyboardProps[][]>([
    [
      {
        value: 'q',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'w',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'e',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'r',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 't',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'y',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'u',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'i',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'o',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'p',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
    ],
    [
      {
        value: 'a',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 's',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'd',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'f',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'g',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'h',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'j',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'k',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'l',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'back',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
    ],
    [
      {
        value: 'z',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'x',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'c',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'v',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'b',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'n',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'm',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
      {
        value: 'enter',
        losted: false,
        rightPosition: false,
        wrongPosition: false,
      },
    ],
  ]);

  const line = useRef<number>(0);
  const position = useRef<number>(0);
  const isTrusted = useRef<boolean>(false);

  // const wordsArray = process.env.REACT_APP_WORDS_FIVE!.split(',');
  const wordsArray = process.env
    .REACT_APP_VALORANT!.split(', ')
    .map((word) => word.toLowerCase());

  const literalValue = (key: string): string => {
    const a = ['à', 'á', 'â', 'ã'];
    const e = ['è', 'é', 'ê'];
    const i = ['ì', 'í', 'î'];
    const o = ['ò', 'ó', 'ô', 'õ'];
    const u = ['ù', 'ú', 'û'];

    if (a.includes(key)) {
      return 'a';
    }
    if (e.includes(key)) {
      return 'e';
    }
    if (i.includes(key)) {
      return 'i';
    }
    if (o.includes(key)) {
      return 'o';
    }
    if (u.includes(key)) {
      return 'u';
    }
    if (key === 'ç') {
      return 'c';
    }

    return key;
  };

  const handleClick = ({
    letter,
    positionClick,
    isTrusted: _isTrusted,
  }: ClickProps) => {
    isTrusted.current = _isTrusted || false;
    if (letter) {
      if (position.current < todayWord.length) {
        const _words = words.map((word, lineIndex) =>
          word.map((_letter, letterIndex) => {
            const _newLetter = { ..._letter };
            if (
              lineIndex === line.current &&
              letterIndex === position.current
            ) {
              _newLetter.value = letter;
            }
            return _newLetter;
          })
        );

        let lastPosition = position.current;
        const word = _words[line.current];
        while (
          position.current < todayWord.length &&
          word[position.current].value !== ''
        ) {
          position.current += 1;
        }

        if (position.current === todayWord.length) {
          let _position = 0;
          while (_position < lastPosition && word[_position].value !== '') {
            _position += 1;
          }
          if (word[_position].value === '') {
            position.current = _position;
          }
        }
        setWords(_words);
      }
    } else {
      position.current = positionClick || 0;
      reRender((oldState) => !oldState);
    }
  };

  const handleBack = () => {
    if (!finished && 0 <= position.current) {
      if (0 < position.current && !isTrusted.current) {
        position.current -= 1;
      }
      const _words = words.map((word, lineIndex) =>
        word.map((_letter, letterIndex) => {
          const _newLetter = { ..._letter };
          if (lineIndex === line.current && letterIndex === position.current) {
            _newLetter.value = '';
          }
          return _newLetter;
        })
      );
      isTrusted.current = false;
      setWords(_words);
    }
  };

  const handleEnter = (keysPressed: KeyboardPositionProps[]) => {
    if (!finished && position.current === todayWord.length) {
      const word = words[line.current];
      const check =
        wordsArray.filter((wordArray) => {
          const _word = wordArray
            .replace(/([áàâã])+/g, 'a')
            .replace(/([éèê])+/g, 'e')
            .replace(/([íìî])+/g, 'i')
            .replace(/([óòôõ])+/g, 'o')
            .replace(/([úùû])+/g, 'u')
            .replace(/([ç])+/g, 'c');
          return _word === word.map((letter) => letter.value).join('');
        }).length > 0;
      if (!check) {
        alert('inválida');
      } else {
        const today = todayWord.split('');
        const positions: number[] = [];
        const rightPositions: string[] = [];
        const wrongPositions: string[] = [];
        let i = 0;

        word.map((letter, index) => {
          do {
            if (
              letter.value === literalValue(today[i]) &&
              !positions.includes(i)
            ) {
              positions.push(i);
              if (index === i) {
                letter.rightPosition = true;
                rightPositions.push(letter.value);
              } else {
                letter.wrongPosition = true;
                wrongPositions.push(letter.value);
              }

              // if (letter.value !== today[i]) {
              //   letter.value = today[i];
              // }

              i = today.length;
            } else {
              i++;
            }
          } while (i < today.length);
          i = 0;
          return letter;
        });

        const _keys = [...keys];

        keysPressed.forEach((keyPosition) => {
          const key = _keys[keyPosition.row][keyPosition.column];
          if (rightPositions.includes(key.value)) {
            key['rightPosition'] = true;
          } else if (wrongPositions.includes(key.value)) {
            key['wrongPosition'] = true;
          } else {
            key['losted'] = true;
          }
        });

        setKeys(_keys);

        if (positions.length === todayWord.length) {
          // alert('ganhou');
          setFinished(true);
        } else {
          line.current += 1;
          position.current = 0;
          reRender((oldState) => !oldState);

          if (line.current === todayWord.length) {
            // alert('perdeu');
            setFinished(true);
          }
        }
      }
    }
  };

  // efeitos nas letras do board
  // digitar e preencher o board
  // adicionar acento no board
  // mensagem quando ganhar ou perder

  useEffect(() => {
    // const wordsFiltered = wordsArray.filter((_word) => {
    //   return 3 < _word.length && _word.length < 8;
    // });
    const wordsFiltered = wordsArray;
    const randomWord =
      wordsFiltered[
        Math.floor(Math.random() * wordsFiltered.length)
      ].toLocaleLowerCase();
    setTodayWord(randomWord);

    setWords(
      Array(5).fill(
        Array(randomWord.length).fill({
          value: '',
          wrongPosition: false,
          rightPosition: false,
        })
      )
    );
  }, []);

  return (
    <Container>
      <Modal words={words} visible={finished} />
      <Board
        words={words}
        finished={finished}
        line={line.current}
        position={position.current}
        onClick={(position: number) => {
          handleClick({ positionClick: position, isTrusted: true });
        }}
      />
      <Keyboard
        keys={keys}
        onClick={(letter: string) => handleClick({ letter })}
        onBack={handleBack}
        onEnter={handleEnter}
      />
    </Container>
  );
}

export default App;
