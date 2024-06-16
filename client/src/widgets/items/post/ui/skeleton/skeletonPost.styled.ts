import { SContainer } from '../post.styled';
import styled from 'styled-components';

export const SContainerSkeleton = styled(SContainer)`
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.colors.secondaryText};
  border-radius: 8px;
`;

export const STop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
