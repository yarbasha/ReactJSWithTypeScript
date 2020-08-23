import { CommentsActionTypes, Comment, CommentsState } from "./types";
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

function fetchCommentsLoading(): CommentsActionTypes {
  return {
    type: "FETCH_COMMENTS_LOADING"
  }
}

function fetchCommentsSuccess(comments: Comment[]): CommentsActionTypes {
  return {
    type: "FETCH_COMMENTS_SUCCESS",
    comments
  }
}

function fetchCommentsFailed(error: Error): CommentsActionTypes {
  return {
    type: "FETCH_COMMENTS_FAILED",
    error
  }
}

export const fetchComments = (): ThunkAction<void, CommentsState, unknown, Action<string>> => dispatch => {
  dispatch(fetchCommentsLoading());
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then(response => response.json())
    .then(data => dispatch(fetchCommentsSuccess(data)))
    .catch(error => dispatch(fetchCommentsFailed(error)));
}