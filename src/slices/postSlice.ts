import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { getAllPosts, getPost } from 'api/endpoints';
import { UserInterface } from './userSlice';

export interface PostInterface {
  id: string;
  image: string;
  likes: number;
  link: string;
  tags: string[];
  text: string;
  publishDate: string;
  owner: Partial<UserInterface>;
}

interface PostInitialState {
  currentPost: PostInterface | null;
  postList: PostInterface[];
  isLoading: boolean;
  error: Record<string, unknown> | null;
}

const postInitialState: PostInitialState = {
  currentPost: null,
  postList: [],
  isLoading: false,
  error: null
};

function startLoading(state: PostInitialState): void {
  state.isLoading = true;
}

function loadingFailed(
  state: PostInitialState,
  action: { payload: Record<string, unknown> | null }
): void {
  state.isLoading = false;
  state.error = action.payload;
}

const posts = createSlice({
  name: 'posts',
  initialState: postInitialState,
  reducers: {
    getPostStart: startLoading,
    getPostSuccess: (state: PostInitialState, { payload }): void => {
      state.currentPost = payload;
      state.isLoading = false;
      state.error = null;
    },
    getPostFailure: loadingFailed,
    getPostsStart: startLoading,
    getPostsSuccess: (state: PostInitialState, { payload }): void => {
      state.postList = payload;
      state.isLoading = false;
      state.error = null;
    },
    getPostsFailure: loadingFailed
  }
});

export const {
  getPostStart,
  getPostSuccess,
  getPostFailure,
  getPostsStart,
  getPostsSuccess,
  getPostsFailure
} = posts.actions;

export default posts.reducer;

export const fetchPosts = () => async (dispatch: Dispatch) => {
  try {
    dispatch(getPostsStart);
    const posts = await getAllPosts();
    dispatch(getPostsSuccess(posts.data.data));
  } catch (err: any) {
    dispatch(getPostsFailure(err.toString()));
  }
};

export const fetchPost = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(getPostStart());
    const post = await getPost(id);
    dispatch(getPostSuccess(post.data));
  } catch (err: any) {
    dispatch(getPostFailure(err.toString()));
  }
};
