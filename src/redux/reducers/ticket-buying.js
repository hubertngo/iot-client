/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2018-03-01 14:57:13
 *-------------------------------------------------------*/

import { spliceOne } from 'src/utils';
import { increaseRating } from 'src/utils/rating';

import { fromJS } from 'immutable';
import AuthStorage from 'src/utils/AuthStorage';

export const initialState = fromJS({
	list: {
		total: 0,
		skip: 0,
		limit: 12,
		data: [],
		loading: true,
	},
	userTicketList: {
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
		// case 'CREATE_TICKET_BUYING_SUCCESS':
		// 	return state.update('list', (list) => {
		// 		return {
		// 			data: [action.payload, ...list.data],
		// 			total: list.total + 1,
		// 			skip: list.skip + 1,
		// 		};
		// 	});

		case 'GET_TICKET_BUYING_LIST_REQUEST':
			return state.update('list', () => {
				return initialState.get('list').toJS();
			});

		case 'GET_TICKET_BUYING_LIST_SUCCESS': {
			return state.update('list', (list) => {
				return {
					...action.payload,
					data: [...list.data, ...action.payload.data],
					loading: false,
				};
			});
		}

		case 'GET_USER_TICKET_BUYING_LIST_REQUEST':
			return state.update('userTicketList', () => {
				return initialState.get('userTicketList').toJS();
			});

		case 'GET_USER_TICKET_BUYING_LIST_SUCCESS': {
			return state.update('userTicketList', (list) => {
				return {
					...action.payload,
					data: [...list.data, ...action.payload.data],
					loading: false,
				};
			});
		}

		case 'GET_TICKET_BUYING_DATA_REQUEST':
			return state.update('view', () => {
				return initialState.get('view').toJS();
			});

		case 'GET_TICKET_BUYING_DATA_SUCCESS':
			return state.update('view', () => {
				return {
					...action.payload,
					loading: false,
				};
			});

		case 'UPDATE_TICKET_BUYING_SUCCESS': {
			return state.update('list', (list) => {
				const { id, status } = action.payload;

				const index = list.data.findIndex((row) => {
					return row.id === id;
				});

				if (index >= 0) {
					if (status === 'open') {
						list.data[index] = { ...list.data[index], ...action.payload }; // eslint-disable-line
					} else {
						spliceOne(list.data, index);
						list.total = list.total - 1; // eslint-disable-line
						list.skip = list.skip - 1; // eslint-disable-line
					}
				}
				return { ...list, data: [...list.data] };
			});
		}

		case 'DELETE_TICKET_BUYING_SUCCESS': {
			return state.update('list', (list) => {
				const { id } = action.payload;

				const index = list.data.findIndex((row) => {
					return row.id === id;
				});

				spliceOne(list.data, index);
				list.total = list.total - 1; // eslint-disable-line
				list.skip = list.skip - 1; // eslint-disable-line

				return { ...list, data: [...list.data] };
			});
		}

		case 'CREATE_RATING_SUCCESS': {
			return state.update('list', (list) => {
				const { star, receiverId } = action.payload;

				const data = list.data.map(row => {
					if (row.creator && row.creator.id === receiverId) {
						row.creator = { ...row.creator, ...increaseRating(star, row.creator) }; // eslint-disable-line
					}
					return { ...row };
				});

				return { ...list, data };
			});
		}

		default:
			return state;
	}
};

