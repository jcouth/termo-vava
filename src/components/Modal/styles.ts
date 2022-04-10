import styled from 'styled-components';

export const Background = styled.div`
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 100vw;
  min-height: 100vh;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  position: fixed;

  display: flex;
  flex-direction: column;

  padding: 16px 32px;

  border-radius: 8px;

  background-color: firebrick;
`;

export const Content = styled.div`
  padding: 20px;
`;

export const Title = styled.p`
  margin: 0;

  color: white;

  font-size: 1.125rem;
  font-weight: 500;

  text-align: center;
`;

export const Button = styled.button`
  border: none;
  border-radius: 8px;

  padding: 8px 24px;

  background-color: forestgreen;
  color: white;

  font-size: 1.125rem;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
`;
