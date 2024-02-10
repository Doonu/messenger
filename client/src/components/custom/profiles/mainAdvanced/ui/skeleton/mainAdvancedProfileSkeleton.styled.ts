import styled from 'styled-components';
import { Skeleton } from 'antd';

export const SContainer = styled.div`
  position: relative;
`;

export const SInputSkeleton = styled(Skeleton.Input).attrs({ active: true, size: 'large' })``;

export const SAvatarSkeleton = styled(Skeleton.Avatar).attrs({
  active: true,
  shape: 'circle',
  size: 'large',
})`
  position: absolute;
  left: 10px;
  top: 30px;
`;

export const SInputAbsoluteSkeleton = styled(Skeleton.Input).attrs({
  active: true,
  size: 'small',
})`
  position: absolute;
  top: 23px;
  right: 17px;
`;
