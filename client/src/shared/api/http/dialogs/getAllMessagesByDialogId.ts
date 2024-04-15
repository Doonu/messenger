import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIMessage, IMessage } from 'shared/models/IMessage';
import { IConfigAsyncThunk } from 'shared/models/errors';
import API from '../../interceptors';
import { messageConverting } from 'shared/converteitions';

const getAllMessagesByDialogId = createAsyncThunk<IMessage[], number, IConfigAsyncThunk>(
  'message/getById',
  (dialogId, { rejectWithValue }) => {
    return API<APIMessage[]>({
      url: `api/messages`,
      method: 'GET',
      params: { dialogId: dialogId },
    })
      .then(({ data }) => {
        return data.map((el) => messageConverting(el));
      })
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);

export default getAllMessagesByDialogId;
