import styled from 'styled-components';
import { AutosizeInput } from '@shared/components';
import { IoSend } from 'react-icons/io5';

export const SContainer = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SForm = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
`;

export const SButton = styled.div`
  cursor: pointer;
  height: 40px;
  display: flex;
  align-items: center;
  &:hover {
    color: ${({ theme }) => theme.colors.active};
  }
`;

export const SAutosizeInput = styled(AutosizeInput)`
  border: 1px solid ${({ theme }) => theme.colors.secondaryText};
  border-radius: 5px;
`;

export const Send = styled(IoSend)`
  color: ${({ theme }) => theme.colors.active};
`;
