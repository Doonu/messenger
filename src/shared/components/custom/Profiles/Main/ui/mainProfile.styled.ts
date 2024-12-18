import styled from 'styled-components';
import { ArrowDown } from '@shared/assets';

export const SProfileContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-left: 20px;
  min-width: 150px;
`;

export const SContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  padding: 5px;
  font-size: 13px;
  height: max-content;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.active};
  &:hover {
    background: ${({ theme }) => theme.colors.secondaryBg};
    cursor: pointer;
  }
`;

export const SName = styled.div`
  font-size: 15px;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.colors.active};
`;

interface SArrowDownProps {
  $isActive: boolean;
}

export const SArrowDown = styled(ArrowDown)<SArrowDownProps>`
  transform: rotate(${({ $isActive }) => ($isActive ? '0deg' : '180deg')});
  transition: 0.5s all;
`;
