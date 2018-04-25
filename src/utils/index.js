/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-10 22:52:39
*------------------------------------------------------- */


const generateStar = (email) => {
	const [name, domain] = email.split('@');
	let str = '';
	for (let i = 0; i < name.length; i++) {
		str += '*';
	}
	return str + '@' + domain;
};

export const encodeEmail = (str) => {
	const regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
	let match;

	/* eslint-disable no-cond-assign */
	while ((match = regex.exec(str)) !== null) {
		// This is necessary to avoid infinite loops with zero-width matches
		if (match.index === regex.lastIndex) {
			regex.lastIndex++;
		}

		str = str.substr(0, match['index']) + generateStar(match[0]) + str.substr(match['index'] + match[0].length); // eslint-disable-line
	}

	return str;
};

const generateStarPhone = (phone) => {
	let str = '';
	for (let i = 0; i < phone.length; i++) {
		str += /[0-9]/ig.test(phone[i]) && i > 2 ? '*' : phone[i];
	}
	return str;
};

export const encodePhoneNumber = (message) => {
	const regex = /[0-9| |._|.(|.)|.-]{8,}/ig;

	let match;

	/* eslint-disable no-cond-assign */
	while ((match = regex.exec(message)) !== null) {
		// This is necessary to avoid infinite loops with zero-width matches
		if (match.index === regex.lastIndex) {
			regex.lastIndex++;
		}

		message = message.substr(0, match['index']) + generateStarPhone(match[0]) + message.substr(match['index'] + match[0].length); // eslint-disable-line
	}

	return message;
};

export const getLabel = (value, arr = []) => {
	if (!value) {
		return '';
	}

	if (arr.length === 0) {
		return value;
	}

	const index = arr.findIndex(el => {
		return el.value === value;
	});

	if (index === -1) {
		return value;
	}

	return arr[index];
};

export const formatNumber = (value, fixed = 2) => {
	if (!value || ~~value === 0) {
		return 0;
	}

	// return (~~value).toFixed(fixed).replace(/./g, (c, i, a) => {
	// 	return i && c !== '.' && ((a.length - i) % 3 === 0) ? ',' + c : c;
	// });

	return Number((+value).toFixed(fixed)).toLocaleString('vi');
};

export const getCountry = () => {
	return fetch('https://freegeoip.net/json/')
		.then((response) => (response.status === 204 || response.statusText === 'No Content' ? {} : response.json()));
};

export const validURL = (str) => {
	const pattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/; // eslint-disable-line
	return !!pattern.test(str);
};

export const validEmail = (str) => {
	const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
	return !!pattern.test(str);
};

export const checkBase64 = (str) => {
	const base64regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i; // eslint-disable-line

	return base64regex.test(str);
};

export const dataURItoBlob = (dataURI, fileName = (+new Date()) + '.png') => {
	const binary = atob(dataURI.split(',')[1]); // eslint-disable-line
	const array = [];
	for (let i = 0; i < binary.length; i++) {
		array.push(binary.charCodeAt(i));
	}
	const blob = new Blob([new Uint8Array(array)], { type: 'image/jpeg' }); // eslint-disable-line
	blob.name = fileName;

	return blob;
};

export const removeUnicode = (str) => {
	return str.toLowerCase()
		.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a') // eslint-disable-line
		.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e') // eslint-disable-line
		.replace(/ì|í|ị|ỉ|ĩ/g, 'i') // eslint-disable-line
		.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o') // eslint-disable-line
		.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
		.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y') // eslint-disable-line
		.replace(/đ/g, 'd') // eslint-disable-line
		.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, '-') // eslint-disable-line
		.replace(/-+-/g, '-') // eslint-disable-line
		.replace(/^\-+|\-+$/g, ''); // eslint-disable-line
};

export const isPlainObject = (obj) => {
	return Object.prototype.toString.call(obj) === '[object Object]';
};

export const isEmptyObject = (obj) => {
	for (const key in obj) { // eslint-disable-line
		return false;
	}
	return true;
};

// About 1.5x faster than the two-arg version of Array#splice().
export const spliceOne = (list, index) => {
	for (let i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
		list[i] = list[k]; // eslint-disable-line
	}
	list.pop();
};

export const applyURIFilter = (filter) => {
	const flag = isPlainObject(filter) && !isEmptyObject(filter);
	return flag ? `?filter=${JSON.stringify(filter)}` : '';
};

