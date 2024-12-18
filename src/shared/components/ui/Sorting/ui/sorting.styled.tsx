import React from 'react';
import styled from 'styled-components';
import { Button, Select, Tabs } from 'antd';
import { SortedArrow } from '@shared/assets';

import { SortingOrderProps } from '../model/ISorting.style';

export const SOrderBy = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;

  padding-left: 15px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    gap: 4px;
  }
`;

const SIconArrowDownWideShort = styled(SortedArrow)`
  color: ${({ theme }) => theme.colors.active};
`;

export const SButtonOrder = styled(Button).attrs({
  type: 'text',
  shape: 'circle',
  icon: <SIconArrowDownWideShort />,
})<SortingOrderProps>`
  transform: scaleY(${({ direction }) => (direction ? 1 : -1)});
`;

export const STabs = styled(Tabs)`
  & .ant-tabs-ink-bar-animated {
    background: ${({ theme }) => theme.colors.active} !important;
  }

  &.ant-tabs {
    & .ant-tabs-nav {
      margin: 0;

      &::before {
        border-bottom: none;
      }
    }
    & .ant-tabs-tab {
      padding: 0;
      color: ${({ theme }) => theme.colors.text};
      &:not(:first-child) {
        margin-left: 14px;
      }
    }
    & .ant-tabs-tab-active .ant-tabs-tab-btn {
      color: ${({ theme }) => theme.colors.active};
    }
  }
`;

export const SSelect = styled(Select).attrs({
  bordered: false,
  size: 'small',
})`
  & .ant-select-selection-item {
    font-weight: 600;
    margin-right: 10px;
  }
`;
