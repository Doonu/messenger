import styled from 'styled-components';
import BaseInput from '../../ui/inputs/baseInput';
import { FaPen } from 'react-icons/fa';

export const SEditable = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  height: 50px;
  color: ${({ theme }) => theme.colors.active};
`;

export const SName = styled.div`
  font-size: 16px;
  font-weight: 500;
  flex: 1;
  padding-left: 12px;
`;

export const SBaseInput = styled(BaseInput)`
  font-size: 16px;
`;

export const SEdit = styled(FaPen)`
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
