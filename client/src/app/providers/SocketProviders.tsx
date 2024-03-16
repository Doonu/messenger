import React from 'react';
import { useSocket } from '../../shared/api/socket/useSocket';
import { useFriendRequest } from '../../shared/api/socket/friendRequest/useFriendRequest';
import { FC, PropsWithChildren } from 'react';

const SocketProviders: FC<PropsWithChildren> = ({ children }) => {
  useSocket();
  useFriendRequest({});
  return <>{children}</>;
};

export default SocketProviders;
