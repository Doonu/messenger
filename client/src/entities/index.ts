import authSlice from './auth/auth.slice';
import notificationSlice from './notification/notification.slice';
import userSlice from './profile/profile.slice';
import postSlice from './post/post.slice';
import { selectorProfileLoader, selectorProfile } from './profile/profile.selectors';
import {
  selectorEditedPost,
  selectorErrorPosts,
  selectorLoadingPosts,
  selectorWarningEdit,
  selectorDeletedPost,
  selectorPost,
  selectorPagePost,
  selectorHaseMore,
} from './post/post.selectors';

export default { authSlice, notificationSlice, userSlice, postSlice };
export {
  selectorEditedPost,
  selectorErrorPosts,
  selectorLoadingPosts,
  selectorWarningEdit,
  selectorDeletedPost,
  selectorPost,
  selectorProfile,
  selectorProfileLoader,
  selectorHaseMore,
  selectorPagePost,
};
