import { useSocket, useFriendRequestHook } from '@shared/api';

const SocketProviders = () => {
  useSocket();
  useFriendRequestHook({});
  return null;
};

export default SocketProviders;
