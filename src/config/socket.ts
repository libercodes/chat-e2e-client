import dotenv from 'dotenv';
import { io } from 'socket.io-client';
import { defaultUrl } from '../services/chat.service';

dotenv.config();

const socketUrl = process.env.SOCKET_URL || defaultUrl;

export const socket = io(socketUrl!, { forceNew: true });
