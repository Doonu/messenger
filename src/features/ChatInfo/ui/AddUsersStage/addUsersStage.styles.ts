import styled from 'styled-components';
import { BaseButton } from '@shared/components';

export const SList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  flex: 1;
  padding: 15px 15px 10px 15px;
  max-height: 400px;
  background: ${({ theme }) => theme.colors.bg};

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

export const SForm = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: flex-end;
  width: 100%;
`;

export const SBaseButton = styled(BaseButton)`
  width: max-content;
`;
