import styled from 'styled-components';
import AutosizeInput from '../../../../../components/ui/inputs/autosizeInput';

export const SContainer = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.secondaryText};
`;

export const SForm = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 15px;
`;

export const SButton = styled.div`
  cursor: pointer;
  height: 40px;
  display: flex;
  align-items: center;
  &:hover {
    color: ${({ theme }) => theme.colors.active};
  }
`;

export const SAutosizeInput = styled(AutosizeInput)`
  border: 1px solid ${({ theme }) => theme.colors.secondaryText};
  border-radius: 5px;
`;
