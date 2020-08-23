import { PostsState, PostsActionTypes, FETCH_POSTS_FAILED, FETCH_POSTS_SUCCESS, FETCH_POSTS_LOADING } from './types';

const initialState: PostsState = {
  loading: false,
  posts: [],
  error: null
}

export function PostsReducer(state = initialState, action: PostsActionTypes): PostsState {
  switch (action.type) {
    case FETCH_POSTS_LOADING:
      return { loading: true, posts: [], error: null };
    case FETCH_POSTS_SUCCESS:
      return { loading: false, posts: action.posts, error: null };
    case FETCH_POSTS_FAILED:
      return { loading: false, posts: [], error: action.error };
    default:
      return state;
  }
}