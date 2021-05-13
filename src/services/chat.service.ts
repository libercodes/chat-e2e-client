import axios from 'axios';
import dotenv from 'dotenv';
import { ApiResponse, Room } from '../types/apiResponse.types';

dotenv.config();

export const defaultUrl = 'http://localhost:5000';
const apiUrl = process.env.API_URL || defaultUrl;

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
