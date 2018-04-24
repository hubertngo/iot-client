/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * LastModified: 2018-02-10 09:52:14
 *-------------------------------------------------------*/

import { SINGLE_API } from 'src/redux/actions/type';

import { applyURIFilter } from 'src/utils';

export const getUserList = (payload, next, nextError) => {
	const { filter, firstLoad } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: `/users${applyURIFilter(filter)}`,
			beforeCallType: firstLoad ? 'GET_USER_LIST_REQUEST' : '',
			successType: 'GET_USER_LIST_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getUserData = (payload, next, nextError) => {
	const { id, filter } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: `/users/${id}${applyURIFilter(filter)}`,
			beforeCallType: 'GET_USER_DATA_REQUEST',
			successType: 'GET_USER_DATA_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const updateUser = (payload, next, nextError) => {
	const { id, ...user } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: '/users/' + id,
			params: user,
			opt: { method: 'PATCH' },
			successType: 'UPDATE_USER_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

