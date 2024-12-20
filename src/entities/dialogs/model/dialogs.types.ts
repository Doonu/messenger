import { ApiProfile, IUser } from '@entities/friends';
import { UploadFile } from 'antd';

export interface DialogsState {
  list: IDialog[];
  page: number;
  isError: boolean;
  isHaseMore: boolean;
  isLoading: boolean;
  search: string;
}

export interface IDialog {
  id: number;
  dialogName: string;
  imgSubstitute: string;
  participants: IUser[];
  updatedAt: string;
  createdAt: string;
  isGroup: boolean;
  countNotReadMessages: number;
  readStatusLastMessage: boolean;
  lastMessage: IMessage | null;
}

export interface IDialogChat extends Omit<IDialog, 'lastMessage' | 'readStatusLastMessage'> {
  fixedMessage: IMessage | null;
}

export interface APIDialog {
  id: number;
  imgSubstitute: string;
  dialogName: string;
  participants: ApiProfile[];
  updatedAt: string;
  createdAt: string;
  isGroup: boolean;
  countNotReadMessages: number;
  readStatusLastMessage: boolean;
  lastMessage: APIMessage | null;
}

export interface APIDialogChat extends Omit<APIDialog, 'lastMessage' | 'readStatusLastMessage'> {
  fixedMessage: APIMessage | null;
}

export interface IMessageItem {
  id: number;
  content: string[];
  createdAt: string;
  updatedAt: string;
  userId: number;
  readStatus: boolean;
  status: 'main' | 'info';
}

export interface IChat {
  id: string;
  author: IUser | null;
  createdAt: string | null;
  dialogId: number;
  messages: IMessageItem[];
}

export interface IMessage {
  id: number;
  content: string[];
  dialogId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  author: IUser | null;
  readStatus: boolean;
  status: 'main' | 'info';
}

export interface APIMessage {
  id: number;
  content: string[];
  dialogId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  author: ApiProfile;
  readStatus: boolean;
  status: 'main' | 'info';
}

export type IPost = {
  isDisabledComments: boolean;
  content: string[];
  view: 'slider' | 'grid';
};

export interface IAllFiles {
  photos: UploadFile[];
  files: UploadFile[];
}

export interface IAllFilesBlob {
  photos: Blob[];
  files: Blob[];
}

export interface IToggleCommentsById {
  postId: number;
  isDisabledComments: boolean;
}

export interface ILikePost {
  isLike: boolean;
  postId: number;
}

export interface ILikeComments {
  commentId: number;
  isLike: boolean;
}
