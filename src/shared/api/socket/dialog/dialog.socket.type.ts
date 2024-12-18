import {
  IAddNewUsers,
  ICreateFixedMessage,
  ICreateMessage,
  IDeleteFixedMessage,
  IDeleteMessage,
  IOutUserOfChat,
  IReadMessage,
  IUpdateMessage,
  IUpdateNameChat,
  SocketApi,
} from '@shared/api';

export interface SocketCreateMessage extends SocketApi {
  emit(event: 'create_message', data: ICreateMessage): void;
}

export interface SocketDeleteMessage extends SocketApi {
  emit(event: 'delete_messages', data: IDeleteMessage): void;
}

export interface SocketUpdateMessage extends SocketApi {
  emit(event: 'update_message', data: IUpdateMessage): void;
}

export interface SocketCreateFixedMessage extends SocketApi {
  emit(event: 'create_fixed_message', data: ICreateFixedMessage): void;
}

export interface SocketDeleteFixedMessage extends SocketApi {
  emit(event: 'delete_fixed_message', data: IDeleteFixedMessage): void;
}

export interface SocketReadMessage extends SocketApi {
  emit(event: 'read_message', data: IReadMessage): void;
}

export interface SocketOutUserOfChat extends SocketApi {
  emit(event: 'read_message', data: IOutUserOfChat): void;
}

export interface SocketUpdateNameChat extends SocketApi {
  emit(event: 'update_dialogName', data: IUpdateNameChat): void;
}

export interface SocketAddNewUsers extends SocketApi {
  emit(event: 'user_add_chat', data: IAddNewUsers): void;
}
