import { UsersActionTypes, User, UsersState, FETCH_USERS_FAILED, FETCH_USERS_LOADING, FETCH_USERS_SUCCESS } from './types';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

export function fetchUsersLoading(): UsersActionTypes {
  return {
    type: FETCH_USERS_LOADING
  }
}

export function fetchUsersSuccess(users: User[]): UsersActionTypes {
  return {
    type: FETCH_USERS_SUCCESS,
    users: users
  }
}

export function fetchUsersFailed(error: Error): UsersActionTypes {
  return {
    type: FETCH_USERS_FAILED,
    error: error
  }
}

export const fetchUsers = (): ThunkAction<void, UsersState, unknown, Action<string>> => dispatch => {
  dispatch(fetchUsersLoading());
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => dispatch(fetchUsersSuccess(data)))
    .catch(error => dispatch(fetchUsersSuccess(error)));
}