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
		// case 'CREATE_FLIGHT_SUCCESS': {
		// 	return state.update('flightList', (flightList) => {
		// 		console.log('flightList', flightList);
		// 		return {
		// 			data: [{ ...action.payload }, ...flightList.data],
		// 			total: state.getIn(['flightList', 'total']) + 1,
		// 			skip: state.getIn(['flightList', 'skip']) + 1,
		// 			loading: false,
		// 		};
		// 	});
		// }

		case 'GET_FLIGHT_LIST_REQUEST':
			return state.update('flightList', () => {
				return initialState.get('flightList').toJS();
			});

		case 'GET_FLIGHT_LIST_SUCCESS': {
			return state.update('flightList', (flightList) => {
				return {
					...action.payload,
					data: [...flightList.data, ...action.payload.data],
					loading: false,
				};
			});
		}

		case 'UPDATE_FLIGHT_SUCCESS': {
			const { id } = action.payload;
			return state.update('flightList', (flightList) => {
				const index = flightList.data.findIndex((row) => {
					return row.id === id;
				});

				flightList.data.splice(index, 1);

				return {
					...action.payload,
					data: flightList.data,
					loading: false,
				};
			});
		}

		default:
			return state;
	}
};

