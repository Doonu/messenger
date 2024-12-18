import { ReactNode } from 'react';

export interface IBaseContainerProps {
  children: ReactNode;
  isHeader?: boolean;
  isFooter?: boolean;
}
