export const increaseRating = (newStar, { ratingsCount = 0, ratingsStats = {} }) => {
	const { star = 0, starDetail = {
		'1': 0,
		'2': 0,
		'3': 0,
		'4': 0,
		'5': 0,
	} } = ratingsStats;

	const newRating = {
		ratingsCount: ratingsCount + 1,
		ratingsStats: {
			star: ((star * ratingsCount) + newStar) / (ratingsCount + 1),
			starDetail: { ...starDetail, [newStar]: starDetail[newStar] + 1 }
		},
	};

	return newRating;
};

export const decreaseRating = (newStar, { ratingsCount = 0, ratingsStats = {} }) => {
	const { star = 0, starDetail = {
		'1': 0,
		'2': 0,
		'3': 0,
		'4': 0,
		'5': 0,
	} } = ratingsStats;

	const newRating = {
		ratingsCount: ratingsCount === 0 ? 0 : ratingsCount - 1,
		ratingsStats: {
			star: ratingsCount === 0 ? 0 : ((star * ratingsCount) - newStar) / (ratingsCount - 1),
			starDetail: { ...starDetail, [newStar]: starDetail[newStar] === 0 ? 0 : starDetail[newStar] - 1 },
		},
	};

	return newRating;
};
