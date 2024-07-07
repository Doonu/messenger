import { PostSlice } from '@entities/post';
import { AuthSlice } from '@entities/auth';
import { ProfileSlice } from '@entities/profile';
import { FriendsSlice } from '@entities/friends';
import { NotificationSlice } from '@entities/notification';
import { DialogsSlice } from '@entities/dialogs';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  post: PostSlice,
  profile: ProfileSlice,
  session: AuthSlice,
  dialogs: DialogsSlice,
  notification: NotificationSlice,
  friends: FriendsSlice,
});

export default rootReducer;
