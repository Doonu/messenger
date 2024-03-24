import styled from 'styled-components';

export const SName = styled.div`
  color: ${({ theme }) => theme.colors.active};
  font-size: 18px;
  font-weight: 700;
  line-height: 15px;

  &:hover {
    text-decoration: underline;
  }
`;

export const SService = styled.div`
  display: flex;
  margin-left: -15px;
`;

export const SContainer = styled.div`
  display: flex;
  gap: 20px;
  cursor: pointer;
`;

export const SInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
