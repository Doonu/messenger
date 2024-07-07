import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
