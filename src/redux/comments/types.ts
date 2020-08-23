export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentsState {
  loading: boolean;
  comments: Comment[];
  error: Error | null;
}

export const FETCH_COMMENTS_LOADING = "FETCH_COMMENTS_LOADING";
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_FAILED = "FETCH_COMMENTS_FAILED";

interface FetchCommentsLoadingAction {
  type: typeof FETCH_COMMENTS_LOADING;
}

interface FetchCommentsSuccessAction {
  type: typeof FETCH_COMMENTS_SUCCESS;
  comments: Comment[];
}

interface FetchCommentsFailedAction {
  type: typeof FETCH_COMMENTS_FAILED;
  error: Error;
}

export type CommentsActionTypes = FetchCommentsLoadingAction | FetchCommentsSuccessAction | FetchCommentsFailedAction;