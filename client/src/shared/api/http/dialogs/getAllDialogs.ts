import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIDialog, IDialog } from 'shared/models/IDialog';
import { IConfigAsyncThunk } from 'shared/models/errors';
import API from '../../interceptors';
import { userArrayConverting } from 'shared/converteitions';

const getAllDialogs = createAsyncThunk<IDialog[], number, IConfigAsyncThunk>(
  'dialogs/getAll',
  (page, { rejectWithValue }) => {
    return API<APIDialog[]>({
      url: `api/dialogs`,
      method: 'GET',
      params: { page },
    })
      .then(({ data }) => {
        return data.map((dialog) => ({
          id: dialog.id,
          dialogName: dialog.dialogName,
          imgSubstitute: dialog.imgSubstitute,
          participants: userArrayConverting(dialog.participants),
          updatedAt: dialog.updatedAt,
          isGroup: dialog.isGroup,
        }));
      })
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);

export default getAllDialogs;
