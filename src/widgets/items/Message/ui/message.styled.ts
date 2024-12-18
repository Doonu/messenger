import styled from 'styled-components';

export const SContainer = styled.div`
  position: relative;
  display: flex;
  gap: 15px;
  cursor: pointer;
`;

export const SMessagesUser = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
`;

export const STitle = styled.div`
  position: absolute;
  left: 85px;
  top: 5px;
  z-index: 1;

  display: flex;
  align-items: center;
  gap: 15px;
`;

export const SName = styled.div`
  color: ${({ theme }) => theme.colors.link};
`;

export const SMessageBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SContainerPhotoProfile = styled.div`
  position: absolute;
  left: 30px;
  top: 5px;
  z-index: 1;
`;
