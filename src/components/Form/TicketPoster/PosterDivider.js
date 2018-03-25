/* --------------------------------------------------------
* Author Lê Quang Thịnh
* Email lqthinh93@gmail.com
* Phone 0937341717
*
* Created: 2018-03-25 17:32:30
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'src/theme/jss/withStyles';

const styleSheet = (theme) => ({
	root: {
		marginBottom: 10,
	},
	title: {
		display: 'inline-block',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		color: '#95A2AB',
	},
	line: {
		display: 'inline-block',
		borderBottom: '1px dashed #E5E8EA',
	},
});

const PosterDivider = ({ title, classes, titleWidth = 0 }) => {
	return (
		<div className={classes.root}>
			<div className={classes.title} style={{ width: `${titleWidth}%` }} >
				{title || ''}
			</div>
			<div className={classes.line} style={{ width: `${100 - titleWidth}%` }} />
		</div>
	);
};

PosterDivider.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string,
	titleWidth: PropTypes.number,
};

export default withStyles(styleSheet)(PosterDivider);
