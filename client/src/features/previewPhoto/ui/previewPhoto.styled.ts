import styled from 'styled-components';

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SContent = styled.div`
  display: flex;
`;

export const SLeft = styled.div`
  display: flex;
  align-items: center;
  height: 88vh;
  width: 60vw;
  padding: 0;
`;

export const SFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const SEdit = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  transition: 0.5s all;

  &:hover {
    color: ${({ theme }) => theme.colors.link};
  }
`;

export const SInfoPic = styled.div`
  display: flex;
  justify-content: center;

  padding: 10px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.active};
`;

export const SRight = styled.div`
  border-radius: 0 8px 0 0;
  width: 400px;
  background: ${({ theme }) => theme.colors.bg};
`;

export const SContainerProfile = styled.div`
  padding: 15px 0 15px 35px;
  border-radius: 0 8px 0 0;
`;

export const SContainerInfo = styled.div`
  padding: 15px 0 15px 35px;
  background: ${({ theme }) => theme.colors.secondaryBg};
`;

export const Descriptions = styled.div`
  font-size: 14px;
  background: ${({ theme }) => theme.colors.bg};
  padding: 15px 0 15px 35px;
  color: ${({ theme }) => theme.colors.active};
`;
