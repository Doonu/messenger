import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIMessage, IMessage } from '../../../models/IMessage';
import { IConfigAsyncThunk } from '../../../models/errors';
import API from '../../interceptors';
import { messageConverting } from '../../converteitions';

const getNewMessagesByDialog = createAsyncThunk<IMessage[], number, IConfigAsyncThunk>(
  'message/getById',
  (dialogId, { rejectWithValue }) => {
    return API<APIMessage[]>({
      url: `api/messages/newMessages`,
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

export default getNewMessagesByDialog;
