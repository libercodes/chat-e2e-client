// TYPES

import { Room } from '../types/apiResponse.types';

import * as API from '../services/chat.service';
import { IPublicRoomsState } from '../types/state.types';

enum EnumPublicRoomsActionTypes {
  GET_PUBLIC_ROOMS = 'GET_PUBLIC_ROOMS',

}

type PublicRoomsAction =
    | { type: EnumPublicRoomsActionTypes.GET_PUBLIC_ROOMS, payload: Room[] };

// ACTION CREATORS
const getPublicRoomsAC = (payload: Room[]): PublicRoomsAction => ({
  type: EnumPublicRoomsActionTypes.GET_PUBLIC_ROOMS,
  payload,
});

// THUNKS
export const getPublicRooms = () => async (dispatch: any) => {
  const res = await API.getPublicChatRooms();
  dispatch(getPublicRoomsAC(res));
};

const initialState: IPublicRoomsState = {
  rooms: [],
};

export const PublicRoomsReducer = (
  state: IPublicRoomsState = initialState,
  action: PublicRoomsAction,
): IPublicRoomsState => {
  switch (action.type) {
    case EnumPublicRoomsActionTypes.GET_PUBLIC_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    default:
      return state;
  }
};
