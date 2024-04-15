import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConfigAsyncThunk } from '../../../models/errors';
import API from '../../interceptors';

interface ICreateFixedMessage {
  dialogId?: number;
  messageId?: number;
}

const createFixedMessage = createAsyncThunk<undefined, ICreateFixedMessage, IConfigAsyncThunk>(
  'dialogs/createFixed',
  ({ dialogId, messageId }, { rejectWithValue }) => {
    return API({
      url: `api/dialogs/createFixed`,
      method: 'POST',
      data: { dialogId: dialogId, messageId: messageId },
    })
      .then(() => undefined)
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);

export default createFixedMessage;
