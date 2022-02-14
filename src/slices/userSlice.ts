/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

interface UserInterface {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture?: string;
}

interface UserInitialState {
  currentUser: UserInterface | null;
  userList: UserInterface[];
  isLoading: boolean;
  error: Record<string, unknown> | null;
}

const userInitialState: UserInitialState = {
  currentUser: null,
  userList: [],
  isLoading: false,
  error: null
};

function startLoading(state: UserInitialState): void {
  state.isLoading = true;
}

function loadingFailed(
  state: UserInitialState,
  action: { payload: Record<string, unknown> | null }
): void {
  state.isLoading = false;
  state.error = action.payload;
}

const users = createSlice({
  name: 'users',
  initialState: userInitialState,
  reducers: {
    getUserStart: startLoading,
    getUserSuccess: (state: UserInitialState, { payload }): void => {
      state.currentUser = payload;
      state.isLoading = false;
      state.error = null;
    },
    getUserFailure: loadingFailed,
    getUsersStart: startLoading,
    getUsersSuccess: (state, { payload }): void => {
      state.userList = payload;
      state.isLoading = false;
      state.error = null;
    },
    getUsersFailure: loadingFailed,
    addUserStart: startLoading,
    addUserSuccess: (state: UserInitialState, { payload }): void => {
      state.currentUser = payload;
      state.isLoading = false;
      state.error = null;
    },
    addUserFailure: loadingFailed,
    updateUserStart: startLoading,
    updateUserSuccess: (state: UserInitialState, { payload }): void => {
      state.currentUser = payload;
      state.isLoading = false;
      state.error = null;
    },
    updateUserFailure: loadingFailed
  }
});

export const {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure
} = users.actions;

export default users.reducer;
