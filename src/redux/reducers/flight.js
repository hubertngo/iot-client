import { fromJS } from 'immutable';

export const initialState = fromJS({
	flightList: {
		total: 0,
		skip: 0,
		limit: 4,
		data: [],
		loading: true,
	},
});

export default (state = initialState, action) => {
	switch (action.type) {
		case 'CREATE_FLIGHT_SUCCESS': {
			return state.update('flightList', (flightList) => {
				return {
					data: [{ ...action.payload }, ...flightList.data],
					total: state.getIn(['flightList', 'total']) + 1,
					skip: state.getIn(['flightList', 'skip']) + 1,
					loading: false,
				};
			});
		}

		case 'GET_FLIGHT_LIST_REQUEST':
			return state.update('flightList', () => {
				return initialState.get('flightList');
			});

		case 'GET_FLIGHT_LIST_SUCCESS': {
			const data = state.getIn(['flightList', 'data']).concat(action.payload.data);

			return state.update('flightList', () => {
				return {
					...action.payload,
					data: data.toArray(),
					loading: false,
				};
			});
		}
		default:
			return state;
	}
};

