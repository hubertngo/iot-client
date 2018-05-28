/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0978108807
*
* Created: 2018-05-28 10:23:48
*------------------------------------------------------- */

import { SINGLE_API } from 'src/redux/actions/type';
import config from 'src/constants/api';
import { applyURIFilter } from 'src/utils';

const { API_URL } = config;
export const getSensorList = (payload, next, nextError) => {
	const { filter, firstLoad } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: `/sensors${applyURIFilter(filter)}`,
			beforeCallType: firstLoad ? 'GET_SENSORS_REQUEST' : '',
			successType: 'GET_SENSORS_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const selectSensors = (payload) => {
	return {
		type: 'UPDATE_SELECTED_SENSOR',
		payload,
	};
};

export const addSensorValue = (payload) => {
	return {
		type: 'ADD_SENSOR_VALUE',
		payload,
	};
};
