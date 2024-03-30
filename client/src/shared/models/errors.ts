import { RootState } from 'app/store';

export interface IError {
  ErrorID: string;
  message?: string;
}

export interface IConfigAsyncThunk {
  rejectValue?: IError;
  state: RootState;
}
