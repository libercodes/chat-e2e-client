import { combineReducers } from 'redux';
import { ChatReducer } from './chat.reducer';

const rootReducer = combineReducers({
  chat: ChatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
