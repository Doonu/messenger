import styled from 'styled-components';

export const SContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  border: 1px solid ${({ theme }) => theme.colors.secondaryText};
  background: ${({ theme }) => theme.colors.secondaryBg};
  border-radius: ${({ theme }) => theme.radius.base};
  padding: 15px;
  margin: 0 auto 15px 0;
`;
