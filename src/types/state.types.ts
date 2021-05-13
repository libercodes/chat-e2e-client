import { Message, Room } from './apiResponse.types';

export interface IChatState {
  messages: Message[],
  room?: Room
  myuser: string,
  systemName: string
  error: string
}
