import dotenv from 'dotenv';
import { io, Socket } from 'socket.io-client';
import { defaultUrl } from '../services/chat.service';

dotenv.config();

const socketUrl = process.env.REACT_APP_SOCKET_URL || defaultUrl;

// eslint-disable-next-line import/no-mutable-exports
export let socket: Socket;

export const createSocketConnection = () => {
  socket = io(socketUrl!, { forceNew: true });
};
