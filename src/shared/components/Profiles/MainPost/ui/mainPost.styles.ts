import styled from 'styled-components';

export const SContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 20px;
  font-size: 13px;
  min-width: 150px;
  height: max-content;
  border-radius: 10px;
  &:hover {
    background: ${({ theme }) => theme.colors.secondaryBg};
    cursor: pointer;
  }
`;

export const SContainerName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const SName = styled.div`
  font-size: 20px;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.colors.active};

  &:hover {
    text-decoration: underline;
  }
`;

export const STime = styled.div`
  font-size: 15px;
  width: max-content;
  color: ${({ theme }) => theme.colors.text};
`;
