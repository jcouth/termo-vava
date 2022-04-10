import styled from 'styled-components';

interface ContainerProps {
  rotate: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
`;
