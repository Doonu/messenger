import styled from 'styled-components';

export const SContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;

  padding: 10px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryText};
`;

export const SCansel = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 5px;
  transition: 0.2s all;

  &:hover {
    color: ${({ theme }) => theme.colors.active};
  }
`;

export const SFutures = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SIconsTop = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  transition: 0.2s all;

  & > *:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.active};
  }
`;

export const SProfile = styled.div`
  color: ${({ theme }) => theme.colors.active};
`;

export const SInfo = styled.div`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const SCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const SBack = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    color: ${({ theme }) => theme.colors.active};
  }
`;

export const SIcons = styled.div`
  display: grid;
`;
