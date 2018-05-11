export function updateLanguage(lang) {
	return {
		type: 'UPDATE_LANGUAGE',
		payload: {
			lang,
		},
	};
}

