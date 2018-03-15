/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2018-02-10 23:45:35
 *-------------------------------------------------------*/

export const initialState = {
	list: {
		total: 0,
		skip: 0,
		limit: 12,
		data: [],
		loading: true,
	},
	topList: {
		total: 0,
		skip: 0,
		limit: 12,
		data: [],
		loading: true,
	},
	view: {
		loading: true,
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'RECEIVE_NOTI': {
			if (action.payload.type === 'relationshipCreated' && state.view.id && state.view.id === action.payload.creatorId) {
				const { data: { creator = {}, relationship = {} } } = action.payload;
				const relation = { ...relationship, creator };

				return {
					...state,
					view: {
						...state.view,
						friendsReceived: [relation],
					},
				};
			}
			return state;
		}

		case 'GET_USER_LIST_REQUEST':
			return { ...state, list: { ...initialState.list } };

		case 'GET_USER_LIST_SUCCESS': {
			const data = [...state.list.data, ...action.payload.data];
			return {
				...state,
				list: {
					...action.payload,
					data,
					loading: false,
				},
			};
		}

		case 'GET_TOP_USER_LIST_REQUEST':
			return { ...state, topList: { ...initialState.topList, loading: true } };

		case 'GET_TOP_USER_LIST_SUCCESS': {
			return { ...state, topList: { ...action.payload, loading: false } };
		}

		case 'GET_USER_DATA_REQUEST':
			return { ...state, view: { ...initialState.view } };

		case 'GET_USER_DATA_SUCCESS':
			return { ...state, view: { ...action.payload, loading: false } };

		default:
			return state;
	}
};

