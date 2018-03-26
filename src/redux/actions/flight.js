import { SINGLE_API } from 'src/redux/actions/type';
// import AuthStorage from 'src/utils/AuthStorage';

export const createFlight = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'flights',
			params: payload,
			opt: { method: 'POST' },
			successType: 'CREATE_FLIGHT_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getFlightList = (payload = {}, next, nextError) => {
	const { filter, firstLoad } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'flights' + (filter ? `?filter=${JSON.stringify(filter)}` : ''),
			beforeCallType: firstLoad ? 'GET_FLIGHT_LIST_REQUEST' : '',
			successType: 'GET_FLIGHT_LIST_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};
