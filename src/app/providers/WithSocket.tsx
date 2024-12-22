import { useFriendRequest } from '@entities/friends';
import { useSocket } from '@shared/hooks';

const WithSocket = () => {
  useSocket();
  useFriendRequest({});
  return null;
};

export default WithSocket;
