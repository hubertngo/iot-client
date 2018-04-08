/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2018-03-01 14:57:13
 *-------------------------------------------------------*/

import { spliceOne } from 'src/utils';

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
		// case 'CREATE_TICKET_SELLING_SUCCESS':
		// 	return state.update('list', (list) => {
		// 		return {
		// 			data: [action.payload, ...list.data],
		// 			total: list.total + 1,
		// 			skip: list.skip + 1,
		// 		};
		// 	});

		case 'GET_TICKET_SELLING_LIST_REQUEST':
			return state.update('list', () => {
				return initialState.get('list').toJS();
			});

		case 'GET_TICKET_SELLING_LIST_SUCCESS': {
			return state.update('list', (list) => {
				return {
					...action.payload,
					data: [...list.data, ...action.payload.data],
					loading: false,
				};
			});
		}

		case 'GET_TICKET_SELLING_DATA_REQUEST':
			return state.update('view', () => {
				return initialState.get('view').toJS();
			});

		case 'GET_TICKET_SELLING_DATA_SUCCESS':
			return state.update('view', () => {
				return {
					...action.payload,
					loading: false,
				};
			});

		case 'UPDATE_TICKET_SELLING_SUCCESS': {
			return state.update('list', (list) => {
				const { id, status } = action.payload;

				const index = list.data.findIndex((row) => {
					return row.id === id;
				});

				if (status === 'open') {
					list.data[index] = { ...list.data[index], ...action.payload }; // eslint-disable-line
				} else {
					spliceOne(list.data, index);
					list.total = list.total - 1; // eslint-disable-line
					list.skip = list.skip - 1; // eslint-disable-line
				}
				return list;
			});
		}

		case 'DELETE_TICKET_SELLING_SUCCESS': {
			return state.update('list', (list) => {
				const { id } = action.payload;

				const index = list.data.findIndex((row) => {
					return row.id === id;
				});

				spliceOne(list.data, index);
				list.total = list.total - 1; // eslint-disable-line
				list.skip = list.skip - 1; // eslint-disable-line

				return list;
			});
		}

		case 'CREATE_BID_TICKET_SELLING_SUCCESS': {
			return state.update('list', (list) => {
				const { isUpdatePrice, ticketSellingId, price } = action.payload;

				if (isUpdatePrice) {
					const index = list.data.findIndex((row) => {
						return row.id === ticketSellingId;
					});

					list.data[index] = { ...list.data[index], price }; // eslint-disable-line
				}

				return list;
			});
		}

		default:
			return state;
	}
};

