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
	analysis: {
		result: [],
		loading: false,
	},
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
		case 'ADD_SENSOR_VALUE':
			return state.update('sensorList', (sensorList) => {
				return {
					...sensorList,
					data: sensorList.data.map(sensor => sensor.name === action.payload.sensorName
						? {
							...sensor, SensorValues: [...sensor.SensorValues, action.payload]
						}
						: sensor
					)
				};
			});
		case 'ANALYSIS_REQUEST':
			return state.update('analysis', () => {
				return {
					result: [],
					loading: true,
				}
			});
		case 'ANALYSIS_SUCCESS':
			return state.update('analysis', () => {
				return {
					result: action.payload.sensor,
					loading: false,
				};
			});
		default:
			return state;
	}
};

