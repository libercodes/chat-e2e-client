// TYPES

import { v4 } from 'uuid';
import { isDoStatement } from 'typescript';
import { Message, Room } from '../types/apiResponse.types';
import { CreateRoomDto, DisconnectEvent, EnumSocketClientEvents } from '../types/types';

import * as chatService from '../services/chat.service';
import { IChatState } from '../types/state.types';

enum EnumChatActionTypes {
  JOIN_CHAT = 'JOIN_CHAT',
  CREATE_CHAT = 'CREATE_CHAT',
  DISCONNECT_CHAT = 'DISCONNECT_CHAT',
  SET_USER = 'SET_USER',
  SET_CURRENT_ROOM = 'SET_CURRENT_ROOM',
  LEAVE_ROOM = 'LEAVE_ROOM',

}

type ChatAction =
    | { type: EnumSocketClientEvents.ADD_MESSAGE, payload: Message }
    | { type: EnumSocketClientEvents.DISCONNECT, payload: DisconnectEvent }
    | { type: EnumChatActionTypes.DISCONNECT_CHAT, payload: null }
    | { type: EnumChatActionTypes.SET_USER, payload: string }
    | { type: EnumChatActionTypes.SET_CURRENT_ROOM, payload: Room }
    | { type: EnumChatActionTypes.LEAVE_ROOM, payload: undefined };

// ACTION CREATORS
export const setCurrentRoomAC = (payload: Room): ChatAction => ({
  type: EnumChatActionTypes.SET_CURRENT_ROOM,
  payload,
});

export const leaveRoomAC = (): ChatAction => ({
  type: EnumChatActionTypes.LEAVE_ROOM,
  payload: undefined,
});

export const createChatAC = (payload: Room): ChatAction => ({
  type: EnumChatActionTypes.SET_CURRENT_ROOM,
  payload,
});

export const disconnectChatAC = (): ChatAction => ({
  type: EnumChatActionTypes.DISCONNECT_CHAT,
  payload: null,
});

export const addMessageAC = (payload: Message): ChatAction => ({
  type: EnumSocketClientEvents.ADD_MESSAGE,
  payload,
});
export const disconnectFromRoomAC = (payload: DisconnectEvent): ChatAction => ({
  type: EnumSocketClientEvents.DISCONNECT,
  payload,
});

export const setUserAC = (payload: string): ChatAction => ({
  type: EnumChatActionTypes.SET_USER,
  payload,
});

// THUNKS
export const getChatRoom = (id: string) => async (dispatch: any) => {
  const res = await chatService.joinChatRoom(id);
  dispatch(setCurrentRoomAC(res));
};

export const setCurrentRoom = (room: Room) => (dispatch: any) => {
  dispatch(setCurrentRoomAC(room));
};

export const leaveRoom = () => (dispatch: any) => {
  dispatch(leaveRoomAC());
};

export const createChat = (dto: CreateRoomDto) => async (dispatch: any) => {
  const res = await chatService.createChatRoom(dto);
  dispatch(createChatAC(res));
};

export const disconnectChat = (id: string) => async (dispatch: any) => {
  try {
    await chatService.closeChatRoom(id);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  dispatch(disconnectChatAC());
};

export const addMessage = (value: Message) => (dispatch: any) => {
  dispatch(addMessageAC(value));
};

export const disconnectFromRoom = (value: DisconnectEvent) => (dispatch: any) => {
  dispatch(disconnectFromRoomAC(value));
};

export const setUser = (value: string) => (dispatch: any) => {
  dispatch(setUserAC(value));
};

export const initialState: IChatState = {
  messages: [],
  myuser: '',
  room: undefined,
  systemName: v4(),
  error: '',
};

export const ChatReducer = (
  state: IChatState = initialState,
  action: ChatAction,
): IChatState => {
  switch (action.type) {
    case EnumSocketClientEvents.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case EnumChatActionTypes.DISCONNECT_CHAT:
      return initialState;

    case EnumChatActionTypes.SET_CURRENT_ROOM:
      return {
        ...state,
        room: action.payload,
      };
    case EnumSocketClientEvents.DISCONNECT:
      return {
        ...state,
        messages: [...state.messages, {
          date: new Date(),
          text: `User ${action.payload.user} left the chat.`,
          user: state.systemName,
          id: v4(),
        }],
      };
    case EnumChatActionTypes.SET_USER:
      return {
        ...state,
        myuser: action.payload,
      };
    case EnumChatActionTypes.LEAVE_ROOM:
      return initialState;
    default:
      return state;
  }
};
