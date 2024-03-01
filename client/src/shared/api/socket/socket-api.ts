import { io, Socket } from 'socket.io-client';

class SocketApi {
  static socket: null | Socket = null;

  static createConnection(userId: number) {
    this.socket = io('http://localhost:5000', {
      query: { user_id: userId },
      ackTimeout: 10000,
    });

    this.socket.connect();

    this.socket.once('connect', () => {
      console.log(`⚡: ${this.socket?.id} user just connected!`);
    });

    this.socket.on('disconnect', () => {
      console.log('disconnected');
    });
  }
}

export default SocketApi;
