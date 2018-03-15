/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2018-02-13 10:53:53
 *-------------------------------------------------------*/

export function toggleLoginModal(payload) {
	return {
		type: 'TOGGLE_LOGIN_MODAL',
		payload,
	};
}

export function toggleSignUpModal(payload) {
	return {
		type: 'TOGGLE_SIGNUP_MODAL',
		payload,
	};
}
