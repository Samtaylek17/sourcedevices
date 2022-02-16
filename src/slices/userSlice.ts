import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { createUser, getAllUsersWithFilters, getUser } from '../api/endpoints';

export interface UserInterface {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture?: string;
  email?: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  location?: Record<string, any>;
  registerDate?: string;
  updatedDate?: string;
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

interface IAction {
  type: string;
  payload?: Record<string, unknown> | null;
}

export const addUser =
  ({ firstName, lastName, email, title, file }) =>
  async (dispatch: (arg: IAction) => void) => {
    try {
      dispatch(addUserStart());
      const user = await createUser({ firstName, lastName, email, title, file });
      dispatch(addUserSuccess(user));
    } catch (err: any) {
      dispatch(addUserFailure(err.toString()));
    }
  };

export const fetchUsers =
  (limit?: number, page?: number) => async (dispatch: (arg: IAction) => void) => {
    try {
      dispatch(getUsersStart());
      const users = await getAllUsersWithFilters({ limit, page });
      dispatch(getUsersSuccess(users.data.data));
    } catch (err: any) {
      dispatch(getUsersFailure(err.toString()));
    }
  };

export const fetchUser = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(getUserStart());
    const user = await getUser(id);
    dispatch(getUserSuccess(user.data));
  } catch (err: any) {
    dispatch(getUserFailure(err.toString()));
  }
};
