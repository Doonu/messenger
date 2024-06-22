import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIDialogChat, IDialogChat } from 'shared/models/IDialog';
import API from '../../interceptors';
import { messageConverting, userArrayConverting } from 'shared/api/converteitions';
import { IConfigAsyncThunk } from 'shared/models/errors';

const getDialogById = createAsyncThunk<IDialogChat, number, IConfigAsyncThunk>(
  'dialog/getById',
  (id, { rejectWithValue }) => {
    return API<APIDialogChat>({
      url: `api/dialogs/${id}`,
      method: 'GET',
    })
      .then(({ data }) => {
        return {
          id: data.id,
          dialogName: data.dialogName,
          imgSubstitute: data.imgSubstitute,
          participants: userArrayConverting(data.participants),
          updatedAt: data.updatedAt,
          createdAt: data.createdAt,
          isGroup: data.isGroup,
          fixedMessage: data.fixedMessage && messageConverting(data.fixedMessage),
          countNotReadMessages: data.countNotReadMessages,
        };
      })
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);

export default getDialogById;
