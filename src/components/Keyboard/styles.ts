import styled, { css } from 'styled-components';

interface LetterProps {
  large: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 4rem;
`;

export const Line = styled.div`
  display: flex;

  font-size: 0.75rem;
`;
