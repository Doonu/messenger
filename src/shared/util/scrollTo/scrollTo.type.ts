import { RefObject } from 'react';

export interface IScroll {
  left: number;
  top?: number;
  behavior?: ScrollBehavior;
}

export interface IScrollToRef {
  ref: RefObject<HTMLDivElement>;
  isScrollFast?: boolean;
}
