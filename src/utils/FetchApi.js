/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-10 23:11:06
*------------------------------------------------------- */
import merge from 'lodash/merge';
import { put, call } from 'redux-saga/effects';

import Router from 'next/router';

import API from 'src/constants/api';
import ENV from 'src/constants/env';

import AuthStorage from 'src/utils/AuthStorage';
import { REQUEST_ERROR } from 'src/redux/actions/type';

const { BASE_URL } = API;

const fetching = (url, options) => fetch(BASE_URL + url, options)
	.then(response => {
		return response.status === 204 || response.statusText === 'No Content' ? {} : response.json();
	})
	.then(json => {
		if (json.error) {
			throw json.error;
		} else {
			return json;
		}
	})
	.catch(err => {
		throw err;
	});

/* The example data is structured as follows:

Params: {
	uri: ,
	params: ,
	opt: ,
	loading: ,
	uploadFile: ,
}
*/


export default function* ({ uri, params = {}, opt = {}, loading = true, uploadFile = false }) {
	const defaultOptions = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	};

	if (!uri) {
		return;
	}

	const options = merge(defaultOptions, opt);

	if (uploadFile && params.files) {
		options.headers = {};
	}

	// set token
	if (AuthStorage.loggedIn) {
		options.headers.Authorization = AuthStorage.token;
	}

	let url = uri;

	if (params && Object.keys(params).length > 0) {
		if (options && options.method === 'GET') {
			url += '?' + Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
		} else if (uploadFile && params.files) {
			const formData = new FormData();
			params.files.forEach((img) => {
				formData.append('files', img, img.renameFilename || img.name);
			});

			options.body = formData;
		} else {
			options.body = JSON.stringify(params);
		}
	}

	if (loading) {
		yield put({ type: 'TOGGLE_LOADING' });
	}

	let response;
	try {
		if (ENV !== 'production') {
			console.info('====> Call /api/v1/' + url, ', options=', options);
		}

		response = yield call(fetching, url, options);

		if (loading) {
			yield put({ type: 'TOGGLE_LOADING' });
		}
	} catch (error) {
		response = { error };

		if (error.statusCode === 401 && (error.code === 'INVALID_TOKEN' || error.code === 'AUTHORIZATION_REQUIRED')) {
			// Access token has expired
			if (AuthStorage.loggedIn) {
				yield put({ type: 'LOGOUT_SUCCESS' });
			}

			yield put({ type: REQUEST_ERROR, payload: 'Access token has expired' });
			Router.push('/login');
		} else if (error.statusCode === 401 && error.code === 'ACCOUNT_DISABLED') {
			// Access token has expired
			if (AuthStorage.loggedIn) {
				yield put({ type: 'LOGOUT_SUCCESS' });
			}

			yield put({ type: REQUEST_ERROR, payload: 'Account has been disabled' });
			Router.push('/login');
		} else if (error.statusCode === 422) {
			yield put({ type: REQUEST_ERROR, payload: 'Email đã tồn tại trên hệ thống, Vui lòng nhập lại' });
		} else {
			yield put({ type: REQUEST_ERROR, payload: error.message || error });
		}
	}

	return response;
}
