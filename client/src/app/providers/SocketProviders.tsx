import { useSocket } from 'shared/api/socket/useSocket';
import { friendRequestHook } from 'shared/api';

const SocketProviders = () => {
  useSocket();
  friendRequestHook({});
  return null;
};

export default SocketProviders;
