import SocketApi from './socket/socket-api';

import postLogin from './http/auth/postLogin';
import postRegistration from './http/auth/postRegistration';

import postCreate from './http/post/postCreate';
import getAllPost from './http/post/getAllPost';
import deletePostById from './http/post/deletePostById';
import restorePostById from './http/post/restorePostById';
import toggleCommentsById from './http/post/toggleCommentsById';
import likePost from './http/post/likePost';

import getAllCommentsInPost from './http/comments/getAllCommentsInPost';
import createComment from './http/comments/createComment';
import deleteComments from './http/comments/deleteComments';
import likeComments from './http/comments/likeComments';
import updateComment from './http/comments/updateComment';
import updatePost from './http/post/updatePost';

import clearTrash from './http/files/clearTrash';
import replace from './http/files/replace';

import getProfile from './http/user/getProfile';
import getUser from './http/user/getUser';
import getAllFriends from './http/user/getAllFriends';
import getFriendRequest from './http/user/getFriendRequest';
import deleteFriend from './http/user/deleteFriend';
import getAllFriendRequests from './http/user/getAllFriendRequests';
import getFriends from './http/user/getAllFriends';
import getUsersExceptFriends from './http/user/getUsersExceptFriends';

import deleteNotification from './http/notification/deleteNotification';
import deleteAllNotifications from './http/notification/deleteAllNotification';
import getAllNotification from './http/notification/getAllNotification';

export {
  SocketApi,
  getFriends,
  deleteNotification,
  deleteAllNotifications,
  getAllNotification,
  getAllFriends,
  replace,
  postLogin,
  postRegistration,
  getProfile,
  postCreate,
  getAllPost,
  deletePostById,
  restorePostById,
  toggleCommentsById,
  likePost,
  getAllCommentsInPost,
  createComment,
  deleteComments,
  likeComments,
  updateComment,
  updatePost,
  clearTrash,
  getUser,
  getFriendRequest,
  deleteFriend,
  getAllFriendRequests,
  getUsersExceptFriends,
};
