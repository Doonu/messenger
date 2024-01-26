import styled from 'styled-components';

export const SContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    & > div:first-child,
    & > div:nth-child(2) {
      display: none;
    }
  }
`;

export const SDivider = styled.div`
  width: 1px;
  height: 10px;
  display: block;
  background: ${({ theme }) => theme.colors.secondaryText};
  margin: 0 -5px;
`;
