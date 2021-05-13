// TYPES

import { v4 } from 'uuid';
import { Message, Room } from '../types/apiResponse.types';
import { DisconnectEvent, EnumSocketClientEvents } from '../types/types';

import * as chatService from '../services/chat.service';
import { IChatState } from '../types/state.types';

enum EnumChatActionTypes {
  JOIN_CHAT = 'JOIN_CHAT',
  CREATE_CHAT = 'CREATE_CHAT',
  DISCONNECT_CHAT = 'DISCONNECT_CHAT',
  SET_USER = 'SET_USER',

}

type ChatAction =
    | { type: EnumSocketClientEvents.ADD_MESSAGE, payload: Message }
    | { type: EnumSocketClientEvents.DISCONNECT, payload: DisconnectEvent }
    | { type: EnumChatActionTypes.JOIN_CHAT, payload: Room }
    | { type: EnumChatActionTypes.CREATE_CHAT, payload: Room }
    | { type: EnumChatActionTypes.DISCONNECT_CHAT, payload: null }
    | { type: EnumChatActionTypes.SET_USER, payload: string };

// ACTION CREATORS
export const joinChatAC = (payload: Room): ChatAction => ({
  type: EnumChatActionTypes.JOIN_CHAT,
  payload,
});

export const createChatAC = (payload: Room): ChatAction => ({
  type: EnumChatActionTypes.CREATE_CHAT,
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
export const joinChat = (id: string) => async (dispatch: any) => {
  const res = await chatService.joinChatRoom(id);
  dispatch(joinChatAC(res));
};

export const createChat = () => async (dispatch: any) => {
  const res = await chatService.createChatRoom();
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

    case EnumChatActionTypes.CREATE_CHAT:
    case EnumChatActionTypes.JOIN_CHAT:
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
        }],
      };
    case EnumChatActionTypes.SET_USER:
      return {
        ...state,
        myuser: action.payload,
      };
    default:
      return state;
  }
};
