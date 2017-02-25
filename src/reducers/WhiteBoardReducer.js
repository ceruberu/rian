import { changeContentState } from '../actions/WhiteBoardActions.js';

const contentInitState = {
	currentStateRaw : {}
}

export const content = ( state = contentInitState, action) => {

	switch(action.type){
		case 'CHANGE_CONTENT_STATE':
			return Object.assign({}, state, {
				currentStateRaw : action.currentStateRaw
			});
		default:
			return state;
	}

}