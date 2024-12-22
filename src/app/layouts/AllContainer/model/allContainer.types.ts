import { ReactNode } from 'react';

export interface AllContainerProps {
  children: ReactNode;
  left?: boolean;
  right?: boolean;
  isFooter?: boolean;
  $isSticky?: boolean;
}
