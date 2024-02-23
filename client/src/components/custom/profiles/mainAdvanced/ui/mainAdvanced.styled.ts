import styled from 'styled-components';

export const SHeader = styled.div`
  background: #4f5154;
  width: 100%;
  height: 70px;
  border-radius: 5px;
  padding-top: 20px;
`;

export const SProfileContainer = styled.div`
  position: relative;
`;

export const SInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  position: absolute;
  top: 2px;
  right: 20px;
`;

export const SName = styled.div`
  font-size: 15px;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.colors.active};
`;

export const SLocation = styled.div`
  font-size: 14px;
`;

export const SContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-top: 60px;
`;

export const SUserStatistic = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
`;

export const SCount = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.active};
`;
