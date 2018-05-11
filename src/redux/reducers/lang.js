/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-13 10:56:54
*------------------------------------------------------- */

export const initialState = 'vi';

export default (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_LANGUAGE':
			return action.payload.lang;
		case 'LOGIN_SUCCESS':
			return action.payload.lang;
		case 'EDIT_PROFILE_SUCCESS':
			return action.payload.lang;
		default:
			return state;
	}
};
