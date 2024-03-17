import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 5px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryText};
`;
