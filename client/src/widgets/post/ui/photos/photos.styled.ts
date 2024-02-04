import styled from 'styled-components';

export const SContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  gap: 20px;

  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    background: ${({ theme }) => theme.colors.secondaryBg};
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.secondaryText};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-start;
  }
`;
