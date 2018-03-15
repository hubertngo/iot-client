/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-03-02 15:54:24
*------------------------------------------------------- */

import { SINGLE_API } from 'src/redux/actions/type';

export const uploadFiles = (payload, next, nextError) => {
	const { files } = payload;

	const newFile = files.filter(file => {
		return file.status !== 'done' && file.originFileObj;
	}).map((file) => {
		return file.originFileObj;
	});

	const oldFiles = files.filter(file => {
		return file.status === 'done' && file.url;
	}).map((file) => {
		return file.url;
	});

	if (newFile.length === 0) {
		next(oldFiles);
		return {
			type: 'NOT_UPLOAD',
		};
	}

	return {
		type: SINGLE_API,
		payload: {
			uri: 'containers/alfazi/upload',
			params: { files: newFile },
			opt: { method: 'POST' },
			uploadFile: true,
			afterSuccess: (res) => {
				const imagesReturn = [...res.result.files.files.map((img) => {
					return img.providerResponse.location;
				}), ...oldFiles];

				next(imagesReturn);
			},
			afterError: nextError,
		},
	};
};
