/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-05-17 11:50:06
*------------------------------------------------------- */

export default (query) => {
	return fetch(`https://api.flynow.vn/api/Search/AutoSuggestAirport?aId=FLYNOW&Search=${encodeURIComponent(query)}`)
		.then(res => {
			return res.json();
		});
};
