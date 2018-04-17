/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * LastModified: 2018-01-10 23:15:32
 *-------------------------------------------------------*/

import AuthStorage from 'src/utils/AuthStorage';

import { SINGLE_API, REQUEST_ERROR } from 'src/redux/actions/type';

export const editProfile = (payload, next, nextError) => {
	const { id, ...user } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'users/' + id,
			params: user,
			opt: { method: 'PATCH' },
			successType: 'EDIT_PROFILE_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export function loginRequest(payload, next, nextErr) {
	return {
		type: 'LOGIN_REQUEST',
		payload,
		next,
		nextErr,
	};
}

export function loginGoogle(payload, next) {
	return {
		type: 'LOGIN_GOOGLE',
		payload,
		next,
	};
}

export function loginFacebook(payload, next) {
	return {
		type: 'LOGIN_FACEBOOK',
		payload,
		next,
	};
}

export function loginZalo(payload, next) {
	return {
		type: 'LOGIN_ZALO',
		payload,
		next,
	};
}

export function signUpRequest(payload, next, nextErr) {
	return {
		type: 'SIGN_UP_REQUEST',
		payload,
		next,
		nextErr,
	};
}

export function logoutRequest(next) {
	return {
		type: 'LOGOUT_REQUEST',
		next,
	};
}

export const getUserAuth = (payload = {}, next) => {
	const { filter = {} } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'users/' + AuthStorage.userId + `?filter=${JSON.stringify(filter)}`,
			successType: 'GET_USER_AUTH_SUCCESS',
			afterSuccess: next,
		},
	};
};

export const resetPassword = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'users/reset-password?access_token=' + payload.token,
			params: { newPassword: payload.password },
			opt: { method: 'POST' },
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const forgotPassword = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'users/reset',
			params: { email: payload.email },
			opt: { method: 'POST' },
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const changePassword = (payload, next, nextError) => {
	if (!AuthStorage.loggedIn) {
		if (typeof nextError === 'function') {
			nextError();
		}
		return {
			type: REQUEST_ERROR,
			payload: 'Bạn chưa login!',
		};
	}
	const { oldPassword, newPassword } = payload;
	return {
		type: SINGLE_API,
		payload: {
			uri: 'users/change-password',
			params: { oldPassword, newPassword },
			opt: { method: 'POST' },
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const checkUserExist = (payload = '', next) => {
	if (payload) {
		const where = {
			or: [
				{ email: payload },
				{ username: payload },
			],
			loginType: 'email',
		};
		return {
			type: SINGLE_API,
			payload: {
				uri: `users/count?where=${JSON.stringify(where)}`,
				afterSuccess: (res) => {
					next(res);
				},
			},
		};
	}
};
