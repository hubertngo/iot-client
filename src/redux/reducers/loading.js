/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-13 18:13:59
*------------------------------------------------------- */
import { REQUEST_ERROR } from 'src/redux/actions/type';

import { notification } from 'antd';

export const initialState = false;

export default function (state = initialState, action) {
	switch (action.type) {
		case 'TOGGLE_LOADING':
			return !state;
		case 'START_LOADING':
			return true;
		case 'STOP_LOADING':
			return false;
		case REQUEST_ERROR: {
			if (process.browser) {
				notification.error({
					message: 'Error Message',
					description: action.payload.message || action.payload,
				});
			}
			return false;
		}
		default:
			return state;
	}
}
