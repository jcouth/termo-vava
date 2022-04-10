import styled, { css } from 'styled-components';

interface ButtonProps {
  rightPosition?: boolean;
  wrongPosition?: boolean;
  spaced?: boolean;
  disabled?: boolean;
  losted?: boolean;
  active?: boolean;
}

const AnimatedButton = styled.button<ButtonProps>`
  &.zoom {
    animation: zoom 1s linear;
  }

  @keyframes zoom {
    0% {
      transform: scale(1);
    }
    5% {
      transform: scale(1.1);
    }
    20% {
      transform: scale(1);
    }
  }

  /* &.rotate {
    animation: rotate 1.5s linear;
  }

  @keyframes rotate {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  } */
`;

export const Show = styled(AnimatedButton)`
  --borderSize: 0.3rem;
  --size: 4rem;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0.1rem;

  min-width: var(--size);
  min-height: var(--size);

  border: var(--borderSize) solid rgba(0, 0, 0, 0.75);
  border-radius: 0.5rem;

  font-size: 2.5em;
  font-weight: bold;

  background-color: transparent;
  color: white;

  ${({ rightPosition, wrongPosition, disabled, losted }) => {
    if (rightPosition) {
      return css`
        border-color: black;
        background-color: rgba(0, 255, 0, 0.8);
      `;
    }
    if (wrongPosition) {
      return css`
        border-color: black;
        background-color: rgba(255, 255, 0, 0.8);
      `;
    }
    if (losted) {
      return css`
        border-color: transparent;
        background-color: rgba(0, 0, 0, 0.8);
      `;
    }
    if (disabled) {
      return css`
        border-color: transparent;
        background-color: rgba(0, 0, 0, 0.5);
      `;
    } else {
      return css`
        &:hover {
          cursor: pointer;
        }
      `;
    }
  }}

  ${({ active }) => {
    if (active) {
      return css`
        --newBorderSize: 0.6rem;

        position: relative;

        &::before {
          content: '';
          position: absolute;
          top: -0.3rem;
          left: -0.3rem;

          min-width: calc(var(--size) - (var(--borderSize) * 2));
          min-height: calc(
            var(--size) - (var(--borderSize) * 2) - (var(--newBorderSize) / 2)
          );

          border: inherit;
          border-radius: inherit;
          border-color: transparent;
          border-bottom-color: rgba(0, 0, 0, 1);
          border-bottom-width: var(--newBorderSize);
        }
      `;
    }
  }}
`;

export const Button = styled(Show)`
  min-width: 4rem;
  min-height: 4rem;

  border: none;
  background-color: rgba(0, 0, 0, 0.5);

  &:hover {
    cursor: pointer;
  }

  ${({ spaced }) => {
    if (spaced) {
      return css`
        margin-left: 1rem;
        padding: 0 0.75rem;
      `;
    }
  }}

  ${({ rightPosition, wrongPosition, losted }) => {
    if (rightPosition) {
      return css`
        border-color: black;
        background-color: rgba(0, 255, 0, 0.8);
      `;
    }
    if (wrongPosition) {
      return css`
        border-color: black;
        background-color: rgba(255, 255, 0, 0.8);
      `;
    }
    if (losted) {
      return css`
        border-color: transparent;
        background-color: rgba(0, 0, 0, 0.8);
      `;
    }
  }}
`;
