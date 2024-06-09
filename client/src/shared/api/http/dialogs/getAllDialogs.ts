import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIDialog, IDialog } from 'shared/models/IDialog';
import { IConfigAsyncThunk } from 'shared/models/errors';
import API from '../../interceptors';
import { messageConverting, userArrayConverting } from 'shared/converteitions';

interface IGetAllDialogs {
  page: number;
  search: string;
}

const getAllDialogs = createAsyncThunk<IDialog[], IGetAllDialogs, IConfigAsyncThunk>(
  'dialogs/getAll',
  ({ search, page }, { rejectWithValue }) => {
    return API<APIDialog[]>({
      url: `api/dialogs`,
      method: 'GET',
      params: { page, search },
    })
      .then(({ data }) => {
        return data.map((dialog) => ({
          id: dialog.id,
          dialogName: dialog.dialogName,
          imgSubstitute: dialog.imgSubstitute,
          participants: userArrayConverting(dialog.participants),
          updatedAt: dialog.updatedAt,
          isGroup: dialog.isGroup,
          countNotReadMessages: dialog.countNotReadMessages,
          readStatusLastMessage: dialog.readStatusLastMessage,
          lastMessage: dialog.lastMessage && messageConverting(dialog.lastMessage),
        }));
      })
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);

export default getAllDialogs;
