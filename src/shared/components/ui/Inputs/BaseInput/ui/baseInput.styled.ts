import styled from 'styled-components';
import { Input } from 'antd';

import { SInputProps } from '../model/IBaseInput.style';

export const SLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  position: relative;

  & > div {
    position: absolute;
    right: 15px;
    top: calc(50% - 7px);
  }
`;

export const SPlaceholder = styled.span`
  position: absolute;
  left: 15px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  caret-color: transparent !important;
`;

export const SPrevIcon = styled.span`
  display: block;
`;

export const SInput = styled(Input)<SInputProps>`
  border-color: transparent;
  outline: none !important;
  border-radius: ${({ $border }) => $border};
  padding-right: 45px;
  background: ${({ theme, $isBgTransparent }) =>
    $isBgTransparent ? 'transparent' : theme.colors.secondary};
  color: ${({ theme }) => theme.colors.active};
  width: 100%;
  height: ${({ $height }) => $height};
  flex: 1;
  min-width: ${({ $minWidth }) => $minWidth};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
  }

  &:focus {
    border-color: ${({ theme, $isBgTransparent }) =>
      $isBgTransparent ? 'transparent' : theme.colors.active};
  }

  &:hover {
    border-color: ${({ theme, $isBgTransparent }) =>
      $isBgTransparent ? 'transparent' : theme.colors.text};
  }
`;

export const SIcon = styled.div`
  position: absolute;
  top: 0;
  right: 15px;
  cursor: pointer;
  z-index: 2;

  svg {
    color: ${({ theme }) => theme.colors.active};
  }
`;
