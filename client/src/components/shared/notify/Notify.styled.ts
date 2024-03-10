import styled from 'styled-components';

export const SContainer = styled.div`
  position: absolute;
  right: 3%;
  bottom: 3%;

  background: ${({ theme }) => theme.colors.active};
  height: 12px;
  width: 12px;
  border-radius: 99%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SNotify = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 99%;
  background: ${({ theme }) => theme.colors.success};
`;
