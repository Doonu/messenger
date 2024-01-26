import styled from 'styled-components';

export const SHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
`;

export const SP = styled.div`
  word-wrap: break-word;
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
`;
