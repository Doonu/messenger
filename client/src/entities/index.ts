import authSlice from './auth/auth.slice';
import notificationSlice from './notification/notification.slice';
import userSlice from './user/user.slice';
import postSlice from './post/post.slice';
import {
  selectorEditedPost,
  selectorErrorPosts,
  selectorLoadingPosts,
  selectorWarningEdit,
  selectorDeletedPost,
  selectorPost,
} from './post/post.selectors';

export default { authSlice, notificationSlice, userSlice, postSlice };
export {
  selectorEditedPost,
  selectorErrorPosts,
  selectorLoadingPosts,
  selectorWarningEdit,
  selectorDeletedPost,
  selectorPost,
};
