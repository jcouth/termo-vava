import React, { useEffect, useRef, useState } from 'react';

import { Button, Show } from './styles';

interface DefaultProps {
  value: string;
  onClick: () => void;
  losted: boolean;
  rightPosition: boolean;
  wrongPosition: boolean;
}

type Props = DefaultProps &
  (
    | {
        type: 'show';
        spaced?: never;
        // rightPosition: boolean;
        // wrongPosition: boolean;
        disabled: boolean;
        // losted: boolean;
        active: boolean;
      }
    | {
        type: 'button';
        spaced: boolean;
        // rightPosition?: never;
        // wrongPosition?: never;
        disabled?: never;
        // losted?: never;
        active?: never;
      }
  );

export const Letter: React.FC<Props> = ({
  value,
  rightPosition = false,
  wrongPosition = false,
  disabled = false,
  losted = false,
  active = false,
  type,
  onClick,
  spaced,
}) => {
  const [_, reRender] = useState<boolean>(false);
  const zoomAnimation = useRef<string>('');
  const rotateAnimation = useRef<string>('');

  useEffect(() => {
    if (value === '') {
      zoomAnimation.current = '';
    } else {
      zoomAnimation.current = 'zoom';
    }

    reRender((oldState) => !oldState);

    setTimeout(() => {
      zoomAnimation.current = '';

      reRender((oldState) => !oldState);
    }, 1000);
  }, [value]);

  useEffect(() => {
    if (value === '') {
      rotateAnimation.current = '';
    } else {
      rotateAnimation.current = 'rotate';
    }

    reRender((oldState) => !oldState);
  }, [losted]);

  return type === 'show' ? (
    <Show
      rightPosition={rightPosition}
      wrongPosition={wrongPosition}
      disabled={disabled}
      losted={losted}
      active={active}
      onClick={onClick}
      className={`${zoomAnimation.current} ${rotateAnimation.current}`}
    >
      {value.toUpperCase()}
    </Show>
  ) : (
    <Button
      spaced={spaced}
      onClick={onClick}
      losted={losted}
      rightPosition={rightPosition}
      wrongPosition={wrongPosition}
    >
      {spaced ? value : value.toUpperCase()}
    </Button>
  );
};
