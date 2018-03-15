/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-12 17:32:15
*------------------------------------------------------- */

// import { toggleLoginDialog } from '../actions/dialog';
import Storage from './Storage';

class AuthStorage extends Storage {
	get loggedIn() {
		return !!this.value && !!this.value.token;
	}

	get token() {
		return this.value && this.value.token;
	}

	get userId() {
		return this.value && this.value.userId;
	}

	get role() {
		return this.value && this.value.role;
	}
}

export default new AuthStorage('AUTH');
