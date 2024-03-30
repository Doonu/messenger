import styled, { css } from 'styled-components';
import AutosizeInput from '../../../../../components/ui/inputs/autosizeInput';

interface SDragFieldProps {
  isFocus: boolean;
}

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

export const DragInput = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150px;
  cursor: pointer;
  z-index: 3;
`;

export const SDragField = styled.div<SDragFieldProps>`
  width: 100%;
  height: 150px;

  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.active};

  border: 2px ${({ theme }) => theme.colors.active} dashed;

  ${({ theme, isFocus }) =>
    !isFocus &&
    css`
      color: ${theme.colors.text};
      border: 2px ${theme.colors.text} dashed;
      opacity: 0.7;
    `}

  border-radius: 10px;
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
