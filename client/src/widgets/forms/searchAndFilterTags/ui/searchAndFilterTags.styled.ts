import styled from 'styled-components';
import { Close } from '@shared/assets';

export const SFormSearch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px 15px 10px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryText};
`;

export const STags = styled.div`
  display: grid;
  gap: 10px;
`;

export const STag = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  gap: 10px;
  color: ${({ theme }) => theme.colors.active};
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 5px;
`;

// TODO: доделать

export const SClose = styled(Close).attrs({
  size: 5,
})<any>`
  font-size: 20px;
  align-self: flex-end;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
