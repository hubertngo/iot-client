/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0978108807
*
* Created: 2018-05-28 10:16:00
*------------------------------------------------------- */

import { fromJS, Map } from 'immutable';

export const initialState = fromJS({
	sensorList: {
		data: [],
		total: 0,
		skip: 0,
		limit: 12,
		loading: true,
	},
	selectedSensors: [],
});

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_SENSORS_REQUEST':
			return state.update('sensorList', () => {
				return initialState.get('sensorList').toJS();
			});

		case 'GET_SENSORS_SUCCESS':
			return state.update('sensorList', () => {
				return {
					...action.payload,
					loading: false,
				};
			});

		case 'UPDATE_SELECTED_SENSOR':
			return state.update('selectedSensors', () => {
				return action.payload;
			});

		default:
			return state;
	}
};

