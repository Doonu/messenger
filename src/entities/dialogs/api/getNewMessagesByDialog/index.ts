import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from '@shared/models';
import { messageConverting, API } from '@shared/api';
import { APIMessage, IMessage } from '@entities/dialogs';

export const getNewMessagesByDialog = createAsyncThunk<IMessage[], number, IConfigAsyncThunk>(
  'message/getById',
  async (dialogId, { rejectWithValue }) => {
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
