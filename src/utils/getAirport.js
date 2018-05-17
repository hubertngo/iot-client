/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-05-17 11:50:06
*------------------------------------------------------- */
import api from 'src/constants/api';

export default (query) => {
	return fetch(`${api.API_URL}/airport?search=${encodeURIComponent(query)}`)
		.then(res => {
			return res.json();
		});
};
