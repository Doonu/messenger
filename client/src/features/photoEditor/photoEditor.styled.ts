import styled from 'styled-components';

export const SContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;

  & canvas {
    border-radius: 10px 0 0 0;
  }
`;

export const SActions = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 15px;
`;

export const SActionChange = styled.div`
  flex: 1;
`;

export const SaveImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 10px;
  gap: 10px;
`;
