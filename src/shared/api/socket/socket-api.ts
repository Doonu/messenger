import { io, Socket } from 'socket.io-client';

export class SocketApi {
  static socket: null | Socket = null;

  static createConnection(userId: number) {
    this.socket = io('http://localhost:5000', {
      query: { user_id: userId },
    });

    this.socket.connect();

    this.socket.on('connect', () => {
      console.log(`⚡: ${this.socket?.id} user just connected!`);
    });

    this.socket.on('disconnect', () => {
      console.log('disconnected');
    });
  }
}
