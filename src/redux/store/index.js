/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-10 22:17:54
*------------------------------------------------------- */

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import withRedux from 'next-redux-wrapper';
import nextReduxSaga from 'next-redux-saga';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import ENV from 'src/constants/env';
import rootReducer, { initialState } from 'src/redux/reducers';
import rootSaga from 'src/redux/sagas';

const sagaMiddleware = createSagaMiddleware();

export const configureStore = (state = initialState) => {
	const composeMiddleware = ENV === 'production' || !process.browser ?
		applyMiddleware(sagaMiddleware) :
		compose(
			applyMiddleware(sagaMiddleware),
			applyMiddleware(logger),
		);

	const store = createStore(
		combineReducers(rootReducer),
		state,
		composeMiddleware,
	);

	store.runSagaTask = () => {
		store.sagaTask = sagaMiddleware.run(rootSaga);
	};

	// run the rootSaga initially
	store.runSagaTask();

	return store;
};

export default (BaseComponent) => {
	return withRedux(configureStore)(nextReduxSaga({ async: true })(BaseComponent));
};
