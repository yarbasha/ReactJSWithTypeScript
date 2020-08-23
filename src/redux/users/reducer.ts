import { UsersState, UsersActionTypes, FETCH_USERS_FAILED, FETCH_USERS_SUCCESS, FETCH_USERS_LOADING } from './types';

const initialState: UsersState = {
  loading: false,
  users: [],
  error: null
}

export function UsersReducer(state = initialState, action: UsersActionTypes): UsersState {
  switch (action.type) {
    case FETCH_USERS_LOADING:
      return { loading: true, users: [], error: null };
    case FETCH_USERS_SUCCESS:
      return { loading: false, users: action.users, error: null };
    case FETCH_USERS_FAILED:
      return { loading: false, users: [], error: action.error };
    default:
      return state;
  }
}