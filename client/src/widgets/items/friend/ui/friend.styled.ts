import styled, { css } from 'styled-components';

export const SInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: start;
  margin-top: 5px;
`;

export const SName = styled.div`
  color: ${({ theme }) => theme.colors.active};
  font-size: 18px;
  font-weight: 700;
  line-height: 15px;

  &:hover {
    text-decoration: underline;
  }

  & > span {
    color: ${({ theme }) => theme.colors.text};
  }
`;

interface ISContainer {
  $isBorderFirst: boolean;
}

export const SContainer = styled.div<ISContainer>`
  padding: 10px 0 0 0;

  display: flex;
  gap: 20px;
  cursor: pointer;
  border-top: 1px solid ${({ theme }) => theme.colors.secondaryText};

  ${({ $isBorderFirst }) =>
    !$isBorderFirst &&
    css`
      &:first-child {
        border-top: 0;
      }
    `}
`;

export const SServices = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;
