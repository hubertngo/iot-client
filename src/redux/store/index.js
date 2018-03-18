/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-10 22:17:54
*------------------------------------------------------- */

import { fromJS, Iterable } from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutablejs';
import withRedux from 'next-redux-wrapper';
import nextReduxSaga from 'next-redux-saga';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import ENV from 'src/constants/env';
import rootReducer, { initialState } from 'src/redux/reducers';
import rootSaga from 'src/redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const stateTransformer = (state) => {
	if (Iterable.isIterable(state)) return state.toJS();
	return state;
};

const logger = createLogger({
	stateTransformer,
	collapsed: (getState, action, logEntry) => !logEntry.error,
	predicate: (getState, action) => !['@@redux-form/CHANGE', '@@redux-form/REGISTER_FIELD'].includes(action.type),
});

export const configureStore = (state = initialState) => {
	const composeMiddleware = ENV === 'production' || !process.browser ?
		applyMiddleware(sagaMiddleware) :
		compose(
			applyMiddleware(sagaMiddleware),
			applyMiddleware(logger),
		);

	const store = createStore(
		combineReducers(rootReducer),
		fromJS(state),
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
