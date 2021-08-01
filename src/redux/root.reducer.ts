import { combineReducers } from 'redux';
import { ChatReducer } from './chat.reducer';
import { PublicRoomsReducer } from './rooms.reducer';

const rootReducer = combineReducers({
  chat: ChatReducer,
  publicRooms: PublicRoomsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
