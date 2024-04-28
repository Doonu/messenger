import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIMessage, IMessage } from 'shared/models/IMessage';
import { IConfigAsyncThunk } from 'shared/models/errors';
import API from '../../interceptors';
import { messageConverting } from 'shared/converteitions';

interface IGetAllMessagesByDialogId {
  dialogId: number;
  page: number;
  limit: number;
}

const getAllMessagesByDialogId = createAsyncThunk<
  IMessage[],
  IGetAllMessagesByDialogId,
  IConfigAsyncThunk
>('message/getById', ({ dialogId, page, limit }, { rejectWithValue }) => {
  return API<APIMessage[]>({
    url: `api/messages`,
    method: 'GET',
    params: { dialogId: dialogId, page: page, limit: limit },
  })
    .then(({ data }) => {
      return data.map((el) => messageConverting(el));
    })
    .catch(({ response }) => {
      return rejectWithValue(response?.data);
    });
});

export default getAllMessagesByDialogId;
