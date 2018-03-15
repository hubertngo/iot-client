/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-12 17:31:15
*------------------------------------------------------- */

import cookie from 'react-cookies';

const mandatory = () => {
	throw new Error('Storage Missing parameter!');
};

export default class Storage {
	constructor(name = mandatory()) {
		this.name = name;
	}

	set value(value) {
		const expires = new Date();
		expires.setDate((new Date()).getDate() + 14);

		cookie.save(
			this.name,
			value,
			{
				path: '/',
				expires,
			},
		);
	}

	get value() {
		return cookie.load(this.name);
	}

	destroy = (next) => {
		cookie.remove(this.name, { path: '/' });
		if (typeof next === 'function') {
			next();
		}
	}
}
