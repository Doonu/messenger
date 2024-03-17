import { useSocket } from '../../shared/api/socket/useSocket';
import { useFriendRequest } from '../../shared/api/socket/friendRequest/useFriendRequest';

const SocketProviders = () => {
  useSocket();
  useFriendRequest({});
  return null;
};

export default SocketProviders;
