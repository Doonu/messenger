import { RootState } from '@app/store';

export const accessTokenSelector = (state: RootState) => state.ls.session.accessToken;
