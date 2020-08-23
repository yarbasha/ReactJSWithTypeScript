export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface PostsState {
  loading: boolean;
  posts: Post[];
  error: Error | null;
}

export const FETCH_POSTS_LOADING = "FETCH_POSTS_LOADING";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILED = "FETCH_POSTS_FAILED";

interface FetchPostsLoadingAction {
  type: typeof FETCH_POSTS_LOADING;
}

interface FetchPostsSuccessAction {
  type: typeof FETCH_POSTS_SUCCESS;
  posts: Post[]
}

interface FetchPostsFailedAction {
  type: typeof FETCH_POSTS_FAILED;
  error: Error
}

export type PostsActionTypes = FetchPostsLoadingAction | FetchPostsSuccessAction | FetchPostsFailedAction;