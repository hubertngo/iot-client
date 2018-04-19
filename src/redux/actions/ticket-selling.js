
/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-04-02 11:09:11
*------------------------------------------------------- */

import { SINGLE_API } from 'src/redux/actions/type';
// import AuthStorage from 'src/utils/AuthStorage';

import { applyURIFilter } from 'src/utils';
import api from 'src/constants/api';

const { BASE_URL } = api;

export const createTicketSelling = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'ticket-sellings',
			params: payload,
			opt: { method: 'POST' },
			successType: 'CREATE_TICKET_SELLING_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const updateTicketSelling = (payload, next, nextError) => {
	const { id, ...ticket } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'ticket-sellings/' + id,
			params: ticket,
			opt: { method: 'PATCH' },
			successType: 'UPDATE_TICKET_SELLING_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const createTicketSellingBid = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'ticket-selling-bids',
			params: payload,
			opt: { method: 'POST' },
			successType: 'CREATE_BID_TICKET_SELLING_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getTicketSellingData = (payload = {}, next, nextError) => {
	const { id, filter } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: `ticket-sellings/${id}${applyURIFilter(filter)}`,
			beforeCallType: 'GET_TICKET_SELLING_DATA_REQUEST',
			successType: 'GET_TICKET_SELLING_DATA_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getTicketSellingList = (payload = {}, next, nextError) => {
	const { filter, firstLoad } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: `ticket-sellings${applyURIFilter(filter)}`,
			beforeCallType: firstLoad ? 'GET_TICKET_SELLING_LIST_REQUEST' : '',
			successType: 'GET_TICKET_SELLING_LIST_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getUserTicketSellingList = (payload = {}, next, nextError) => {
	const { filter, firstLoad } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: `ticket-sellings${applyURIFilter(filter)}`,
			beforeCallType: firstLoad ? 'GET_USER_TICKET_SELLING_LIST_REQUEST' : '',
			successType: 'GET_USER_TICKET_SELLING_LIST_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const deleteTicketSelling = (payload, next) => {
	const { id } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'ticket-sellings/' + id,
			params: id,
			opt: { method: 'DELETE' },
			successType: 'DELETE_TICKET_SELLING_SUCCESS',
			afterSuccess: next,
		},
	};
};

let connected = false;

export const addTicketSellingListener = (dispatch) => {
	if (!connected) {
		if (typeof (EventSource) !== 'undefined') {
			const urlToChangeStream = BASE_URL + 'ticket-sellings/change-stream?_format=event-stream';
			const src = new EventSource(urlToChangeStream); // eslint-disable-line

			src.addEventListener('data', (msg) => {
				const data = JSON.parse(msg.data);
				// console.log('data', data);
				if (data.type === 'update') {
					dispatch({
						type: 'START_LOADING',
					});

					setTimeout(() => {
						dispatch({
							type: 'UPDATE_TICKET_BUYING_SUCCESS',
							payload: data.data,
						});
						dispatch({
							type: 'STOP_LOADING',
						});
					}, 1000);
				}
			});

			connected = true;
		} else {
			alert('Sorry, your browser does not support server-sent events...'); // eslint-disable-line
		}
	}
};
