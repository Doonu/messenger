import styled, { css } from 'styled-components';

interface ISFuture {
  $isFirstElement: boolean;
}

interface ISContainer extends ISFuture {
  $isChoice: boolean;
  $status: 'main' | 'info';
}

export const SContainer = styled.div<ISContainer>`
  position: relative;
  z-index: ${({ $isChoice }) => ($isChoice ? 0 : 1)};
  padding: ${({ $isFirstElement, $status }) =>
    ($isFirstElement && '5px 95px 5px 85px') ||
    ($status === 'info' && '0px') ||
    ($status !== 'info' && '30px 95px 5px 85px')};
  width: 100%;
  height: 150%;
  background: ${({ $isChoice, theme }) => $isChoice && theme.colors.secondaryText};
  text-align: ${({ $status }) => $status === 'info' && 'center'};
`;

export const SChoiceMessage = styled.div<ISFuture>`
  position: absolute;
  height: 100%;
  top: ${({ $isFirstElement }) => (!$isFirstElement ? '15px' : '5px')};
  left: 3px;
`;

export const SContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SP = styled.div<Pick<ISContainer, '$status'>>`
  word-wrap: break-word;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;

  ${({ $status }) =>
    $status === 'info' &&
    css`
      color: ${({ theme }) => theme.colors.text};
    `}
`;

export const SFutures = styled.div<ISFuture>`
  position: absolute;
  top: ${({ $isFirstElement }) => (!$isFirstElement ? '15px' : '5px')};
  right: 5px;

  display: flex;
  gap: 15px;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.5s;

  & svg:hover {
    color: ${({ theme }) => theme.colors.active};
    transition: all 0.5s;
  }
`;

export const SInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;
