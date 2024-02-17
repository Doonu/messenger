import styled from 'styled-components';

export const SContainer = styled.div`
  display: flex;

  & canvas {
    flex: 1;
    border-radius: 10px 0 0 0;
  }
`;

export const SPicture = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;

  width: 50vw;
  height: 88vh;
`;

export const SActions = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
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
