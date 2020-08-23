
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  },
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

export interface UsersState {
  loading: boolean;
  users: User[];
  error: Error | null;
}

export const FETCH_USERS_LOADING = "FETCH_USERS_LOADING";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

interface FetchUsersLoadingAction {
  type: typeof FETCH_USERS_LOADING;
}

interface FetchUsersSuccessAction {
  type: typeof FETCH_USERS_SUCCESS;
  users: User[]
}

interface FetchUsersFailedAction {
  type: typeof FETCH_USERS_FAILED;
  error: Error
}

export type UsersActionTypes = FetchUsersLoadingAction | FetchUsersSuccessAction | FetchUsersFailedAction;