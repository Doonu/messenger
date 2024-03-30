import styled from 'styled-components';

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.secondaryBg};
  border: 1px solid ${({ theme }) => theme.colors.secondaryText};
  border-radius: 10px;
  padding: 15px;
`;
