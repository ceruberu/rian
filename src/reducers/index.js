import { combineReducers } from 'redux'
import {
  // SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  // REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

// Import Reducers
import * as UserReducer from './UserReducer';
import * as CalendarReducer from './CalendarReducer';
import * as TodosReducer from './TodosReducer.js';
import * as FileManagementReducer from './FileManagementReducer.js';
import * as ProjectReducer from './ProjectReducer';
import * as NoteEditorReducer from './NoteEditorReducer';
import * as WhiteBoardReducer from './WhiteBoardReducer';
import * as ChatReducer from './ChatReducer';	
import { firebaseStateReducer } from 'react-redux-firebase';
import * as NoteTimelineReducer from './NoteTimelineReducer';


const rootReducer = combineReducers(
	Object.assign(
		{}, 
		UserReducer,
		TodosReducer,
		ProjectReducer,
		CalendarReducer,
		NoteEditorReducer,
		ChatReducer,
		WhiteBoardReducer,
		FileManagementReducer,
    	{firebase: firebaseStateReducer},
    	NoteTimelineReducer
	))

export default rootReducer;

