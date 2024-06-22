import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIDialog, IDialog } from 'shared/models/IDialog';
import { IConfigAsyncThunk } from 'shared/models/errors';
import API from '../../interceptors';
import { messageConverting, userArrayConverting } from '../../converteitions';

interface ICreateDialog {
  participantIds: number[];
  nameChat?: string;
}

const createDialog = createAsyncThunk<IDialog, ICreateDialog, IConfigAsyncThunk>(
  'dialogs/createDialog',
  ({ participantIds, nameChat }, { rejectWithValue }) => {
    return API<APIDialog>({
      url: `api/dialogs`,
      method: 'POST',
      data: { participantIds: participantIds, nameChat: nameChat },
    })
      .then(({ data }) => ({
        id: data.id,
        dialogName: data.dialogName,
        imgSubstitute: data.imgSubstitute,
        participants: userArrayConverting(data.participants),
        updatedAt: data.updatedAt,
        createdAt: data.createdAt,
        isGroup: data.isGroup,
        countNotReadMessages: data.countNotReadMessages,
        readStatusLastMessage: data.readStatusLastMessage,
        lastMessage: data.lastMessage && messageConverting(data.lastMessage),
      }))
      .catch(({ response }) => {
        return rejectWithValue(response?.data);
      });
  }
);

export default createDialog;
