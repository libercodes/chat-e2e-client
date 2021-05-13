import axios from 'axios';
import * as dotenv from 'dotenv';
import { io } from 'socket.io-client';
import { ApiResponse, Room } from '../types/apiResponse.types';

dotenv.config();

const apiUrl = process.env.API_URL || 'http://localhost:5000';
const socketUrl = process.env.SOCKET_URL || 'ws://localhost:5000';

export const createChatRoom = async (): Promise<Room> => {
  const res = await axios.post<ApiResponse<Room>>(`${apiUrl}/chat`);
  const { data } = res.data;

  return data;
};

export const joinChatRoom = async (code: string): Promise<Room> => {
  const res = await axios.get<ApiResponse<Room>>(`${apiUrl}/chat/${code}`);
  const { data } = res.data;

  return data;
};

export const closeChatRoom = async (code: string): Promise<void> => {
  await axios.patch(`${apiUrl}/chat/${code}`);
};

export const socket = io(socketUrl!, { forceNew: true });
