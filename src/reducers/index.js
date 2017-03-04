import { combineReducers } from 'redux'
import {
  // SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  // REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

// Import Reducers
import * as UserReducer from './UserReducer';
import * as ChatReducer from './ChatReducer';
import * as CalendarReducer from './CalendarReducer';
import * as NoteEditorReducer from './NoteEditorReducer';
import * as WhiteBoardReducer from './WhiteBoardReducer.js';
import * as TodosReducer from './TodosReducer.js';
import * as FileUploadReducer from './FileUploadReducer'

const rootReducer = combineReducers(
	Object.assign(
		{}, 
		UserReducer,
		TodosReducer,
		NoteEditorReducer,
		CalendarReducer,
		ChatReducer,
		WhiteBoardReducer,
		FileUploadReducer
	))

export default rootReducer;

