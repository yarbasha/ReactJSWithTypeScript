import { createStore, applyMiddleware, combineReducers } from 'redux';
import { UsersReducer } from './users/reducer';
import { PostsReducer } from './posts/reducer';
import { CommentsReducer } from './comments/reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const rootReducer = combineReducers({ users: UsersReducer, posts: PostsReducer, comments: CommentsReducer });

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export type RootState = ReturnType<typeof rootReducer>;