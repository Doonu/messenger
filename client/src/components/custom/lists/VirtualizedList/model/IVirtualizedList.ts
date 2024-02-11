import { VirtuosoProps } from 'react-virtuoso';
import { FunctionComponent } from 'react';

export interface IVirtualizedList<D, C> extends VirtuosoProps<D, C> {
  fetchNextPage: () => void;
  isPending: boolean;
  isFetching: boolean;
  isNotFound: boolean;
  Skeleton: FunctionComponent;
}
