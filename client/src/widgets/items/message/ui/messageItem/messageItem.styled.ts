import styled from 'styled-components';

interface ISFuture {
  $isFirstElement: boolean;
}

interface ISContainer extends ISFuture {
  $isChoice: boolean;
}

export const SContainer = styled.div<ISContainer>`
  position: relative;
  z-index: ${({ $isChoice }) => ($isChoice ? 0 : 1)};
  padding: ${({ $isFirstElement }) =>
    $isFirstElement ? '5px 95px 5px 85px' : '30px 95px 5px 85px'};
  width: 100%;
  height: 150%;
  background: ${({ $isChoice, theme }) => $isChoice && theme.colors.secondaryText};
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

export const SP = styled.div`
  word-wrap: break-word;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
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
