import { combineReducers } from '@reduxjs/toolkit';

import userReducer from 'slices/userSlice';
import postReducer from 'slices/postSlice';

const rootReducer = combineReducers({
  users: userReducer,
  posts: postReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
