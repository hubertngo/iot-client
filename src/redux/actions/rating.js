import { SINGLE_API } from 'src/redux/actions/type';
// import AuthStorage from 'src/utils/AuthStorage';

export const createRating = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'ratings',
			params: payload,
			opt: { method: 'POST' },
			successType: 'CREATE_RATING_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};
