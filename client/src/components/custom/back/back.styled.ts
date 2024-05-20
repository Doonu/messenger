import styled from 'styled-components';

export const SBack = styled.div`
  display: flex;
  gap: 5px;
  font-size: 16px;
  align-items: center;
  cursor: pointer;
  transition: 0.5s;
  color: ${({ theme }) => theme.colors.text};
  width: max-content;

  &:hover {
    color: ${({ theme }) => theme.colors.active};
  }
`;
