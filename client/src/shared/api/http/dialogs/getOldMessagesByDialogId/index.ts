import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIMessage, IMessage, IConfigAsyncThunk } from '@shared/models';
import { messageConverting, API } from '@shared/api';

import { IGetAllMessagesByDialogId } from './getOldMessagesByDialogId.type';

export const getOldMessagesByDialogId = createAsyncThunk<
  IMessage[],
  IGetAllMessagesByDialogId,
  IConfigAsyncThunk
>('Message/getById', ({ dialogId, page, limit }, { rejectWithValue }) => {
  return API<APIMessage[]>({
    url: `api/messages`,
    method: 'GET',
    params: { dialogId, page, limit },
  })
    .then(({ data }) => {
      return data.map((el) => messageConverting(el));
    })
    .catch(({ response }) => {
      return rejectWithValue(response?.data);
    });
});
