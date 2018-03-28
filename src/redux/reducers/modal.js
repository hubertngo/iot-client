/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-13 10:56:54
*------------------------------------------------------- */

import { fromJS, Map } from 'immutable';

export const initialState = fromJS({
	login: {
		open: false,
		closable: false,
	},
	signUp: {
		open: false,
		closable: false,
	},
	flight: {
		open: false,
		closable: false,
		data: {},
	},
	ticketPoster: {
		open: false,
		closable: false,
	},
	userInfo: {
		open: false,
		closable: false,
	},
	editUserInfo: {
		open: false,
		closable: false,
	},
});

export default (state = initialState, action) => {
	switch (action.type) {
		case 'TOGGLE_LOGIN_MODAL':
			return state.update('login', () => {
				return {
					open: !!action.payload.open,
					closable: !!action.payload.closable,
				};
			});

		case 'TOGGLE_SIGNUP_MODAL':
			return state.update('signUp', () => {
				return {
					open: !!action.payload.open,
					closable: !!action.payload.closable,
				};
			});

		case 'TOGGLE_FLIGHT_MODAL':
			return state.update('flight', () => {
				return {
					open: !!action.payload.open,
					closable: !!action.payload.closable,
					data: action.payload.open ? action.payload.data : {},
				};
			});

		case 'TOGGLE_TICKET_POSTER_MODAL':
			return state.update('ticketPoster', () => {
				return {
					open: !!action.payload.open,
					closable: !!action.payload.closable,
				};
			});

		case 'TOGGLE_USER_INFO_MODAL':
			return state.update('userInfo', () => {
				return {
					open: !!action.payload.open,
					closable: !!action.payload.closable,
				};
			});

		case 'TOGGLE_EDIT_USER_INFO_MODAL':
			return state.update('editUserInfo', () => {
				return {
					open: !!action.payload.open,
					closable: !!action.payload.closable,
				};
			});

		default:
			return state;
	}
};
