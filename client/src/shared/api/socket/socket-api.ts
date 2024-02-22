import { io, Socket } from 'socket.io-client';

class SocketApi {
  static socket: null | Socket = null;

  static createConnection(userId: number) {
    this.socket = io('http://localhost:5000', {
      query: { user_id: userId },
    });

    this.socket.on('connect', () => {
      console.log('Connected');
    });

    this.socket.on('disconnect', (e) => {
      console.log('disconnected');
    });
  }
}

export default SocketApi;
