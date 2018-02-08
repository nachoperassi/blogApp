import _ from 'lodash';

import { FETCH_POSTS } from '../actions/index';
import { FETCH_POST } from '../actions/index';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_POST:
			const post = action.payload.data;
			const newState = { ...state };
			newState[post.id] = post;
			return newState;

		case FETCH_POSTS:
			// action.payload = [{'id':1, 'text':'post1'}]
			// _.mapKeys(action.payload, 'id') =>
			// { 1: {'id':1, 'text':'post1'}, 45: { ... }}
			return _.mapKeys(action.payload.data, 'id');

		default:
			return state;
	}
}