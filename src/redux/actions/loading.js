/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2017-07-20 17:59:39
 *-------------------------------------------------------*/

export function toggleLoader() {
	return {
		type: 'TOGGLE_LOADING',
	};
}

export function startLoader() {
	return {
		type: 'START_LOADING',
	};
}

export function stopLoader() {
	return {
		type: 'STOP_LOADING',
	};
}
