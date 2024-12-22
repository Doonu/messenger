import { ReactNode } from 'react';

export interface ICollapse {
  header: ReactNode;
  body: ReactNode;
  isOpen: boolean;
}
