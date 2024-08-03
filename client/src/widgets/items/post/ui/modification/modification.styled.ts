import styled from 'styled-components';
import { AutosizeInput } from '@shared/components';

export const SContainer = styled.div`
  display: grid;
  gap: 10px;
  position: relative;
`;

export const SHead = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
`;

export const SAutosizeInput = styled(AutosizeInput)`
  border: 1px solid ${({ theme }) => theme.colors.secondaryText};
  border-radius: 5px;
  margin: 0;
`;

export const SBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SButtons = styled.div`
  display: flex;
  justify-self: flex-end;
`;
