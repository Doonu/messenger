import styled from 'styled-components';
import { BlockContainer } from 'shared/styles/containers';

export const SContainer = styled(BlockContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  max-height: calc(100vh - 115px);
  padding: 0;
`;

export const SChat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: start;
  overflow-y: scroll;
  flex: 1;
  padding: 20px 0 40px 10px;

  &::-webkit-scrollbar {
    width: 10px;
    margin: 5px !important;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 15px;
  }
`;
