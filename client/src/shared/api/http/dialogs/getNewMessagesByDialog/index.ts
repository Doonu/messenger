import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIMessage, IMessage, IConfigAsyncThunk } from '@shared/models';
import { messageConverting, API } from '@shared/api';

export const getNewMessagesByDialog = createAsyncThunk<IMessage[], number, IConfigAsyncThunk>(
  'Message/getById',
  (dialogId, { rejectWithValue }) => {
    return API<APIMessage[]>({
      url: `api/messages/newMessages`,
      method: 'GET',
      params: { dialogId },
    })
      .then(({ data }) => {
        return data.map((el) => messageConverting(el));
      })
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);
