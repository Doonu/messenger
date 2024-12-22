import styled from 'styled-components';

export const SContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px 10px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.link};
  cursor: pointer;

  &:last-child {
    border-bottom: 0;
  }
`;

export const SName = styled.div`
  display: flex;
  align-items: center;
  gap: 0 20px;
`;
