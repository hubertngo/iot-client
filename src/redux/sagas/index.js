/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-09 18:48:54
*------------------------------------------------------- */

import { fork } from 'redux-saga/effects';
import 'isomorphic-fetch';

import auth from './auth';
import middleware from './middleware';

export default function* rootSaga() {
	yield fork(middleware);

	// combine your saga here
	yield fork(auth);
}
