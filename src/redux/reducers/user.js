/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2018-02-10 23:45:35
 *-------------------------------------------------------*/
import { fromJS } from 'immutable';

export const initialState = fromJS({
	list: {
		total: 0,
		skip: 0,
		limit: 12,
		data: [],
		loading: true,
	},
	view: {
		loading: true,
	},
});

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_USER_LIST_REQUEST':
			return state.update('list', () => {
				return initialState.get('list').toJS();
			});

		case 'GET_USER_LIST_SUCCESS': {
			return state.update('list', (list) => {
				return {
					...action.payload,
					data: [...list.data, ...action.payload.data],
					loading: false,
				};
			});
		}

		case 'GET_USER_DATA_REQUEST':
			return state.update('view', () => {
				return initialState.get('view').toJS();
			});

		case 'GET_USER_DATA_SUCCESS':
			return state.update('view', () => {
				return {
					...action.payload,
					loading: false,
				};
			});

		default:
			return state;
	}
};

