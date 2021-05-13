import * as dotenv from 'dotenv';
import { io } from 'socket.io-client';

dotenv.config();

const socketUrl = process.env.SOCKET_URL || 'ws://localhost:5000';

export const socket = io(socketUrl!, { forceNew: true });
