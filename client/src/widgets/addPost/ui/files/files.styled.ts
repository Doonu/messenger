import styled from 'styled-components';

export const SFiles = styled.div`
  display: flex;
  gap: 20px;

  height: 100%;
  width: 100%;
  flex-wrap: nowrap;

  &::-webkit-scrollbar {
    background: ${({ theme }) => theme.colors.secondaryBg};
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.secondaryText};
  }
`;
