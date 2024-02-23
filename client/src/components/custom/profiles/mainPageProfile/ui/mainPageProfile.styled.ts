import styled from 'styled-components';
import { BlockContainer } from '../../../../../shared/styles/containers';

export const SBlockContainer = styled(BlockContainer)`
  padding: 2px;
  position: relative;
`;

export const SHeader = styled.div`
  background: #4f5154;
  width: 100%;
  height: 150px;
  border-radius: 5px 5px 0 0;
  padding-top: 20px;
`;

export const SInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-left: 150px;
  padding-top: 20px;
`;

export const SNavigate = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SActions = styled.div`
  padding-right: 30px;
`;

export const SName = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 30px;
`;
