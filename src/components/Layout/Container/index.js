/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-11 15:15:46
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'src/theme/jss/withStyles';

const styleSheet = (theme) => ({
	root: {
		width: '100%',
		marginRight: 'auto',
		marginLeft: 'auto',
		[theme.breakpoints.up.sm]: {
			width: 540,
		},
		[theme.breakpoints.up.md]: {
			width: 720,
		},
		[theme.breakpoints.up.lg]: {
			width: 960,
		},
		[theme.breakpoints.up.xl]: {
			width: 1140,
		},
	},
});

const Container = (props) => {
	const { classes, children, className, ...rest } = props;
	return (
		<div className={`${classes.root} ${className}`} {...rest}>
			{children}
		</div>
	);
};

Container.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

Container.defaultProps = {
	className: '',
};

export default withStyles(styleSheet)(Container);
