import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from '../store';

const WithStore: FC<PropsWithChildren> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default WithStore;
