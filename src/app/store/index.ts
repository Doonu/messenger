import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  PersistConfig,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import * as localforage from 'localforage';

import rootReducer from './rootReducer';

export type RootReducer = ReturnType<typeof rootReducer>;

const persistConfigLocalStorage: PersistConfig<RootReducer> = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['session'],
};

const persistConfigLocalForage = {
  key: 'root',
  storage: localforage,
  whitelist: [],
};

const persistedLocalStorageReducer = persistReducer(persistConfigLocalStorage, rootReducer);
const persistedLocalForageReducer = persistReducer(persistConfigLocalForage, rootReducer);

export const setupStore = () => {
  return configureStore({
    reducer: {
      ls: persistedLocalStorageReducer,
      lf: persistedLocalForageReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export const store = setupStore();

export const persistor = persistStore(store);

export type RootState = ReturnType<(typeof store)['getState']>;
export type AppDispatch = typeof store.dispatch;
