import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIChat, IChat } from 'shared/models/IDialog';
import API from '../../interceptors';
import { messageConverting, userArrayConverting } from 'shared/converteitions';
import { IConfigAsyncThunk } from 'shared/models/errors';

const getDialogById = createAsyncThunk<IChat, number, IConfigAsyncThunk>(
  'dialog/getById',
  (id, { rejectWithValue }) => {
    return API<APIChat>({
      url: `api/dialogs/${id}`,
      method: 'GET',
    })
      .then(({ data }) => ({
        id: data.id,
        dialogName: data.dialogName,
        imgSubstitute: data.imgSubstitute,
        participants: userArrayConverting(data.participants),
        updatedAt: data.updatedAt,
        isGroup: data.isGroup,
        fixedMessage: data.fixedMessage && messageConverting(data.fixedMessage),
      }))
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);

export default getDialogById;
