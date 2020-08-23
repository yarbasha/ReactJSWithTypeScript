import { PostsActionTypes, Post, PostsState, FETCH_POSTS_FAILED, FETCH_POSTS_LOADING, FETCH_POSTS_SUCCESS } from './types';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

export function fetchPostsLoading(): PostsActionTypes {
  return {
    type: FETCH_POSTS_LOADING
  }
}

export function fetchPostsSuccess(posts: Post[]): PostsActionTypes {
  return {
    type: FETCH_POSTS_SUCCESS,
    posts
  }
}

export function fetchPostsFailed(error: Error): PostsActionTypes {
  return {
    type: FETCH_POSTS_FAILED,
    error
  }
}

export const fetchPosts = (): ThunkAction<void, PostsState, unknown, Action<string>> => dispatch => {
  dispatch(fetchPostsLoading());
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => dispatch(fetchPostsSuccess(data)))
    .catch(error => dispatch(fetchPostsSuccess(error)));
}