import styled from 'styled-components';

export const SContainer = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0 15px 15px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryText};
`;

export const STitle = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.active};
`;
