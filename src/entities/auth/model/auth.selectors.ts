import { RootState } from '@app/store';

export const isAuthSelector = (state: RootState) => state.session.isAuth;
export const accessTokenSelector = (state: RootState) => state.session.accessToken;
