import { CommentsState, CommentsActionTypes, FETCH_COMMENTS_LOADING, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILED } from "./types";


const initialState: CommentsState = {
  loading: false,
  comments: [],
  error: null
}

export function CommentsReducer(state = initialState, action: CommentsActionTypes): CommentsState {
  switch (action.type) {
    case FETCH_COMMENTS_LOADING:
      return { loading: true, comments: [], error: null };
    case FETCH_COMMENTS_SUCCESS:
      return { loading: false, comments: action.comments, error: null };
    case FETCH_COMMENTS_FAILED:
      return { loading: false, comments: [], error: action.error };
    default:
      return state
  }
}