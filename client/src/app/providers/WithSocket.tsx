import { useSocket, useFriendRequestHook } from '@shared/api';

const WithSocket = () => {
  useSocket();
  useFriendRequestHook({});
  return null;
};

export default WithSocket;
